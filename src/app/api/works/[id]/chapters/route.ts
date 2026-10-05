import { NextResponse } from "next/server";
import db from "@/lib/db";
import { z } from "zod";

const createChapterSchema = z.object({
  title: z.string().min(1),
  chapterNumber: z.number().positive(),
  body: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "MEMBERS_FIRST", "ARCHIVED"]).default("DRAFT"),
  releaseAt: z.string().datetime().optional().nullable(),
  publicAt: z.string().datetime().optional().nullable(),
  wordCount: z.number().int().nonnegative().default(0),
  isMembersOnly: z.boolean().default(false),
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
    id: string; // workId
  }>;
}

// POST /api/works/[id]/chapters - Add new chapter to work
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: workId } = await params;
    const json = await request.json();
    const data = createChapterSchema.parse(json);

    const chapter = await db.chapter.create({
      data: {
        workId,
        title: data.title,
        chapterNumber: data.chapterNumber,
        body: data.body,
        status: data.status,
        releaseAt: data.releaseAt ? new Date(data.releaseAt) : null,
        publicAt: data.publicAt ? new Date(data.publicAt) : null,
        wordCount: data.wordCount,
        isMembersOnly: data.isMembersOnly,
        price: data.price,
        ...(data.mangaPages && {
          mangaPages: {
            create: data.mangaPages.map((p) => ({
              pageNumber: p.pageNumber,
              assetUrl: p.assetUrl,
              width: p.width,
              height: p.height,
            })),
          },
        }),
      },
      include: { mangaPages: { orderBy: { pageNumber: "asc" } } },
    });

    // Update work timestamp
    await db.work.update({
      where: { id: workId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, chapter });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to create chapter:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/works/[id]/chapters - List chapters for work
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id: workId } = await params;
    const chapters = await db.chapter.findMany({
      where: { workId },
      orderBy: { chapterNumber: "asc" },
      include: { mangaPages: { orderBy: { pageNumber: "asc" } } },
    });

    return NextResponse.json({ chapters });
  } catch (error) {
    console.error("Failed to fetch chapters:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
