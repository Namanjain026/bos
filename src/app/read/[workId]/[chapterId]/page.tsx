import { notFound } from "next/navigation";
import { MOCK_WORKS, MOCK_TEXT_CHAPTER, MOCK_MANGA_CHAPTER } from "@/lib/mock-data";
import db from "@/lib/db";
import TextReader from "@/components/TextReader";
import MangaReader from "@/components/MangaReader";

interface ReaderPageProps {
  params: Promise<{
    workId: string;
    chapterId: string;
  }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { workId, chapterId } = await params;

  // Try fetching work and chapter from live database
  let dbWork = null;
  let dbChapter = null;

  try {
    dbWork = await db.work.findFirst({
      where: { OR: [{ id: workId }, { slug: workId }] },
      include: {
        creator: { select: { id: true, username: true, displayName: true, avatarUrl: true } },
        chapters: {
          orderBy: { chapterNumber: "asc" },
          select: { id: true, chapterNumber: true, title: true, wordCount: true, status: true, isMembersOnly: true },
        },
        genres: { include: { genre: true } },
      },
    });

    if (dbWork) {
      dbChapter = await db.chapter.findFirst({
        where: {
          OR: [
            { id: chapterId },
            { workId: dbWork.id, chapterNumber: parseInt(chapterId) || 1 },
          ],
        },
        include: { mangaPages: { orderBy: { pageNumber: "asc" } } },
      });
    }
  } catch (err) {
    console.error("Failed to query reader data:", err);
  }

  const mockWork = MOCK_WORKS.find((w) => w.id === workId || w.slug === workId);

  if (!dbWork && !mockWork) {
    notFound();
  }

  const work = dbWork
    ? {
        id: dbWork.id,
        title: dbWork.title,
        slug: dbWork.slug,
        description: dbWork.description,
        coverUrl: dbWork.coverUrl,
        type: dbWork.type,
        creator: dbWork.creator,
        genres: dbWork.genres.map((g) => g.genre.name),
        averageRating: 5.0,
        ratingCount: 1,
        chapterCount: dbWork.chapters.length,
        updatedAt: "Today",
        chaptersList: dbWork.chapters,
      }
    : mockWork!;

  const isManga = work.type === "MANGA" || work.type === "COMIC";

  // Select appropriate chapter data
  const chapterData = dbChapter
    ? {
        id: dbChapter.id,
        workId: dbChapter.workId,
        chapterNumber: dbChapter.chapterNumber,
        title: dbChapter.title,
        body: dbChapter.body || "",
        wordCount: dbChapter.wordCount,
        isMembersOnly: dbChapter.isMembersOnly,
        mangaPages: dbChapter.mangaPages,
      }
    : isManga
    ? MOCK_MANGA_CHAPTER
    : MOCK_TEXT_CHAPTER;

  // Determine prev / next chapter IDs
  const chaptersList = dbWork ? dbWork.chapters : mockWork?.chaptersList || [];
  const currentIndex = chaptersList.findIndex((ch) => ch.id === chapterData.id || ch.id === chapterId);
  const prevChapter = currentIndex > 0 ? chaptersList[currentIndex - 1] : undefined;
  const nextChapter =
    currentIndex >= 0 && currentIndex < chaptersList.length - 1
      ? chaptersList[currentIndex + 1]
      : undefined;

  if (isManga) {
    return (
      <MangaReader
        work={work as any}
        chapter={chapterData}
        prevChapterId={prevChapter?.id}
        nextChapterId={nextChapter?.id}
      />
    );
  }

  return (
    <TextReader
      work={work as any}
      chapter={chapterData}
      prevChapterId={prevChapter?.id}
      nextChapterId={nextChapter?.id}
    />
  );
}
