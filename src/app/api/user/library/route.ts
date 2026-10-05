import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's real works from database
    const myWorks = await db.work.findMany({
      where: { creatorId: session.userId },
      include: {
        chapters: {
          select: { id: true, chapterNumber: true, title: true, wordCount: true, status: true, isMembersOnly: true, createdAt: true },
          orderBy: { chapterNumber: "asc" },
        },
        genres: { include: { genre: true } },
        _count: { select: { chapters: true, ratings: true, bookmarks: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    // Fetch user's real bookmarks
    const myBookmarks = await db.bookmark.findMany({
      where: { userId: session.userId },
      include: {
        work: {
          include: {
            creator: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
            genres: { include: { genre: true } },
            _count: { select: { chapters: true, ratings: true } },
          },
        },
        chapter: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Fetch user's real reading progress
    const readingHistory = await db.readingProgress.findMany({
      where: { userId: session.userId },
      include: {
        work: {
          include: {
            creator: { select: { id: true, username: true, displayName: true } },
          },
        },
        chapter: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({
      works: myWorks,
      bookmarks: myBookmarks,
      readingHistory,
    });
  } catch (error) {
    console.error("Failed to fetch user library:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
