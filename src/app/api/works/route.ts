import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  const rand = Math.random().toString(36).substring(2, 6);
  return `${base || "work"}-${rand}`;
}

const createWorkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description/Synopsis is required"),
  type: z.enum(["NOVEL", "NOVELLA", "SHORT_STORY", "POETRY", "MANGA", "COMIC", "LIGHT_NOVEL", "NON_FICTION"]).default("NOVEL"),
  ageRating: z.string().default("TEEN"),
  language: z.string().default("English"),
  genre: z.string().optional(),
  coverUrl: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]).default("PUBLISHED"),
  // Optional first chapter
  chapterTitle: z.string().optional(),
  chapterBody: z.string().optional(),
  isMembersOnly: z.boolean().default(false),
  publicDelayDays: z.number().optional().default(7),
  price: z.number().optional().nullable(),
});

// POST /api/works - Create real Work in Supabase
export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { error: "You must be signed in to publish a work." },
        { status: 401 }
      );
    }

    const json = await request.json();
    const data = createWorkSchema.parse(json);

    const slug = generateSlug(data.title);

    // Calculate public release date if members first
    const publicAt = data.isMembersOnly && data.publicDelayDays
      ? new Date(Date.now() + data.publicDelayDays * 24 * 60 * 60 * 1000)
      : null;

    const wordCount = data.chapterBody?.trim()
      ? data.chapterBody.trim().split(/\s+/).length
      : 0;

    // Create Work and optional Chapter in database transaction
    const createdWork = await db.$transaction(async (tx) => {
      // Find or create genre if provided
      let genreRecord = null;
      if (data.genre) {
        const genreSlug = data.genre.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        genreRecord = await tx.genre.upsert({
          where: { slug: genreSlug },
          update: {},
          create: { name: data.genre, slug: genreSlug },
        });
      }

      // Create work
      const work = await tx.work.create({
        data: {
          creatorId: session.userId,
          title: data.title,
          slug,
          description: data.description,
          type: data.type,
          ageRating: data.ageRating,
          language: data.language,
          coverUrl: data.coverUrl || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
          status: data.status,
          publishedAt: data.status === "PUBLISHED" ? new Date() : null,
          ...(genreRecord && {
            genres: {
              create: { genreId: genreRecord.id },
            },
          }),
        },
      });

      // Create initial chapter if chapterTitle or chapterBody was provided
      if (data.chapterTitle || data.chapterBody) {
        await tx.chapter.create({
          data: {
            workId: work.id,
            chapterNumber: 1,
            title: data.chapterTitle || "Chapter 1",
            body: data.chapterBody || "",
            wordCount,
            status: data.isMembersOnly ? "MEMBERS_FIRST" : (data.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"),
            isMembersOnly: data.isMembersOnly,
            publicAt,
            price: data.price,
          },
        });
      }

      return work;
    });

    return NextResponse.json({
      success: true,
      work: createdWork,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }
    console.error("Failed to create work:", error);
    return NextResponse.json(
      { error: "Failed to publish work to database." },
      { status: 500 }
    );
  }
}

// GET /api/works - List works with pagination & filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const creatorId = searchParams.get("creatorId");

    const works = await db.work.findMany({
      where: {
        ...(type && { type: type as any }),
        ...(creatorId && { creatorId }),
        status: "PUBLISHED",
      },
      include: {
        creator: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
        genres: { include: { genre: true } },
        _count: { select: { chapters: true, ratings: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({ works });
  } catch (error) {
    console.error("Failed to list works:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
