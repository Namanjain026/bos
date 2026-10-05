import { notFound } from "next/navigation";
import { MOCK_WORKS, MOCK_TEXT_CHAPTER, MOCK_MANGA_CHAPTER } from "@/lib/mock-data";
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

  const work = MOCK_WORKS.find((w) => w.id === workId) || MOCK_WORKS[0];
  if (!work) notFound();

  const isManga = work.type === "MANGA" || work.type === "COMIC";

  // Select appropriate chapter data
  const chapterData = isManga ? MOCK_MANGA_CHAPTER : MOCK_TEXT_CHAPTER;

  // Determine prev / next chapter IDs
  const currentIndex = work.chaptersList.findIndex((ch) => ch.id === chapterId);
  const prevChapter = currentIndex > 0 ? work.chaptersList[currentIndex - 1] : undefined;
  const nextChapter =
    currentIndex >= 0 && currentIndex < work.chaptersList.length - 1
      ? work.chaptersList[currentIndex + 1]
      : undefined;

  if (isManga) {
    return (
      <MangaReader
        work={work}
        chapter={chapterData}
        prevChapterId={prevChapter?.id}
        nextChapterId={nextChapter?.id}
      />
    );
  }

  return (
    <TextReader
      work={work}
      chapter={chapterData}
      prevChapterId={prevChapter?.id}
      nextChapterId={nextChapter?.id}
    />
  );
}
