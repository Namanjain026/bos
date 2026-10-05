import "dotenv/config";
import db from "../src/lib/db";

const GENRES = [
  { name: "Fantasy", slug: "fantasy" },
  { name: "Sci-Fi", slug: "sci-fi" },
  { name: "Action & Adventure", slug: "action-adventure" },
  { name: "Romance", slug: "romance" },
  { name: "Manga & Comics", slug: "manga-comics" },
  { name: "Mystery & Detective", slug: "mystery-detective" },
  { name: "Horror & Supernatural", slug: "horror-supernatural" },
  { name: "Slice of Life", slug: "slice-of-life" },
  { name: "Light Novels", slug: "light-novels" },
  { name: "Short Stories", slug: "short-stories" },
  { name: "Poetry", slug: "poetry" },
  { name: "Non-Fiction & Essays", slug: "non-fiction" },
];

const TAGS = [
  { name: "Original", slug: "original" },
  { name: "Webtoon", slug: "webtoon" },
  { name: "Magic System", slug: "magic-system" },
  { name: "Progression", slug: "progression" },
  { name: "Reincarnation", slug: "reincarnation" },
  { name: "Cyberpunk", slug: "cyberpunk" },
  { name: "Dark Fantasy", slug: "dark-fantasy" },
  { name: "Wholesome", slug: "wholesome" },
  { name: "Psychological", slug: "psychological" },
  { name: "Members First", slug: "members-first" },
];

async function main() {
  console.log("Seeding genres and tags to Supabase...");

  for (const genre of GENRES) {
    await db.genre.upsert({
      where: { slug: genre.slug },
      update: {},
      create: genre,
    });
  }

  for (const tag of TAGS) {
    await db.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
