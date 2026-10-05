import db from "@/lib/db";
import { MOCK_WORKS } from "@/lib/mock-data";
import { WorkCardData } from "@/types";

interface QueryOptions {
  search?: string;
  genre?: string;
  type?: string;
  sort?: "latest" | "trending" | "top_rated";
  limit?: number;
}

export async function getPublishedWorks(options: QueryOptions = {}): Promise<WorkCardData[]> {
  const { search, genre, type, limit = 20 } = options;

  let dbWorks: WorkCardData[] = [];

  try {
    const rawDbWorks = await db.work.findMany({
      where: {
        status: "PUBLISHED",
        ...(type && { type: type as any }),
        ...(genre && {
          genres: {
            some: {
              genre: {
                name: { contains: genre, mode: "insensitive" },
              },
            },
          },
        }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { creator: { displayName: { contains: search, mode: "insensitive" } } },
            { creator: { username: { contains: search, mode: "insensitive" } } },
          ],
        }),
      },
      include: {
        creator: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
        genres: { include: { genre: true } },
        _count: { select: { chapters: true, ratings: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    dbWorks = rawDbWorks.map((w) => ({
      id: w.id,
      title: w.title,
      slug: w.slug,
      description: w.description,
      coverUrl: w.coverUrl || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
      type: w.type,
      creator: w.creator,
      genres: w.genres.map((g) => g.genre.name),
      averageRating: 5.0,
      ratingCount: 1,
      chapterCount: w._count.chapters,
      updatedAt: "Just now",
    }));
  } catch (err) {
    console.error("Failed to query live works from DB:", err);
  }

  // Filter mock works matching criteria
  let filteredMocks = [...MOCK_WORKS];
  if (type) {
    filteredMocks = filteredMocks.filter((w) => w.type === type);
  }
  if (genre) {
    filteredMocks = filteredMocks.filter((w) =>
      w.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
    );
  }
  if (search) {
    const q = search.toLowerCase();
    filteredMocks = filteredMocks.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.creator.displayName.toLowerCase().includes(q)
    );
  }

  // Combine: Live DB works (especially newly uploaded) first, followed by mock catalogue
  const existingIds = new Set(dbWorks.map((w) => w.id));
  const combined = [...dbWorks, ...filteredMocks.filter((m) => !existingIds.has(m.id))];

  return combined.slice(0, limit);
}
