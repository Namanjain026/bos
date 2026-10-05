import { NextResponse } from "next/server";
import db from "@/lib/db";
import { z } from "zod";

const updateChapterSchema = z.object({
  title: z.string().min(1).optional(),
  chapterNumber: z.number().positive().optional(),
  body: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "MEMBERS_FIRST", "ARCHIVED"]).optional(),
  releaseAt: z.string().datetime().optional().nullable(),
  publicAt: z.string().datetime().optional().nullable(),
  wordCount: z.number().int().nonnegative().optional(),
  isMembersOnly: z.boolean().optional(),
  price: z.number().optional().nullable(),
  mangaPages: z.array(z.object({
    pageNumber: z.number().int().positive(),
    assetUrl: z.string().url(),
    width: z.number().int().optional().nullable(),
    height: z.number().int().optional().nullable(),
  })).optional(),
});

interface RouteParams {
  params: Promise<{
    id: string; // chapterId
  }>;
}

// GET /api/chapters/[id] - Fetch chapter details
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const chapter = await db.chapter.findUnique({
      where: { id },
      include: {
        work: {
          select: { id: true, title: true, slug: true, creatorId: true, type: true },
        },
        mangaPages: { orderBy: { pageNumber: "asc" } },
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    return NextResponse.json({ chapter });
  } catch (error) {
    console.error("Failed to fetch chapter:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/chapters/[id] - Edit chapter content, title, release rules
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const json = await request.json();
    const data = updateChapterSchema.parse(json);

    const { mangaPages, releaseAt, publicAt, ...fields } = data;

    const updatedChapter = await db.chapter.update({
      where: { id },
      data: {
        ...fields,
        ...(releaseAt !== undefined && {
          releaseAt: releaseAt ? new Date(releaseAt) : null,
        }),
        ...(publicAt !== undefined && {
          publicAt: publicAt ? new Date(publicAt) : null,
        }),
        ...(mangaPages && {
          mangaPages: {
            deleteMany: {},
            create: mangaPages.map((p) => ({
              pageNumber: p.pageNumber,
              assetUrl: p.assetUrl,
              width: p.width,
              height: p.height,
            })),
          },
        }),
      },
      include: {
        mangaPages: { orderBy: { pageNumber: "asc" } },
        work: { select: { id: true, title: true, slug: true } },
      },
    });

    return NextResponse.json({ success: true, chapter: updatedChapter });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to update chapter:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/chapters/[id] - Archive / delete chapter
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const deletedChapter = await db.chapter.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, chapter: deletedChapter });
  } catch (error) {
    console.error("Failed to delete chapter:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
