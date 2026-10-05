import { NextResponse } from "next/server";
import db from "@/lib/db";
import { z } from "zod";

const updateWorkSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  coverUrl: z.string().optional().nullable(),
  type: z.enum(["NOVEL", "NOVELLA", "SHORT_STORY", "POETRY", "MANGA", "COMIC", "LIGHT_NOVEL", "NON_FICTION"]).optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "COMPLETED", "ARCHIVED", "FLAGGED", "UNDER_REVIEW", "RESTRICTED", "REMOVED"]).optional(),
  visibility: z.string().optional(),
  language: z.string().optional(),
  ageRating: z.string().optional(),
  isExclusive: z.boolean().optional(),
  price: z.number().optional().nullable(),
  genreIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/works/[id] - Fetch single work details with chapters
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const work = await db.work.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        creator: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
        chapters: {
          orderBy: { chapterNumber: "asc" },
          include: { mangaPages: { orderBy: { pageNumber: "asc" } } },
        },
        genres: { include: { genre: true } },
        tags: { include: { tag: true } },
      },
    });

    if (!work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }

    return NextResponse.json({ work });
  } catch (error) {
    console.error("Failed to fetch work:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/works/[id] - Edit title, description, genres, age rating, cover, status
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateWorkSchema.parse(body);

    const { genreIds, tagIds, ...updateFields } = validatedData;

    // Update work
    const updatedWork = await db.work.update({
      where: { id },
      data: {
        ...updateFields,
        ...(genreIds && {
          genres: {
            deleteMany: {},
            create: genreIds.map((gId) => ({ genreId: gId })),
          },
        }),
        ...(tagIds && {
          tags: {
            deleteMany: {},
            create: tagIds.map((tId) => ({ tagId: tId })),
          },
        }),
      },
      include: {
        genres: { include: { genre: true } },
        tags: { include: { tag: true } },
        chapters: { orderBy: { chapterNumber: "asc" } },
      },
    });

    return NextResponse.json({ success: true, work: updatedWork });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Failed to update work:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/works/[id] - Archive / soft-delete work
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const archivedWork = await db.work.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });

    return NextResponse.json({ success: true, work: archivedWork });
  } catch (error) {
    console.error("Failed to delete work:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
