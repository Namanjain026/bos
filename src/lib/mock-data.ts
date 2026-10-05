import { WorkCardData, ChapterDetails } from "@/types";

export const MOCK_WORKS: (WorkCardData & {
  chaptersList: {
    id: string;
    chapterNumber: number;
    title: string;
    wordCount: number;
    isMembersOnly: boolean;
    publicAt?: string;
    price?: number;
    releasedAt: string;
  }[];
  synopsisLong: string;
  ageRating: string;
  language: string;
  status: string;
})[] = [
  {
    id: "work-1",
    title: "Shadow Sovereign: Veil of the Eclipse",
    slug: "shadow-sovereign-veil-of-the-eclipse",
    description: "In a world where shadows hold ancestral memories, an exiled cartographer discovers an ancient grimoire that can rewrite mortal destiny.",
    synopsisLong: "When the sky fractured during the Grand Eclipse of the 4th Age, the shadow-lines across the empire vanished. Kaelen, an exiled cartographer from the High Citadel, survives in the subterranean under-city by mapping forbidden ley lines. When a dying envoy delivers a living grimoire bound in obsidian silk, Kaelen finds himself hunted by the Inquisitors and chosen by the Shadow Sovereign.",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    type: "NOVEL",
    creator: {
      id: "user-1",
      username: "elena_vance",
      displayName: "Elena Vance",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    genres: ["Fantasy", "Action & Adventure", "Dark Fantasy"],
    averageRating: 4.92,
    ratingCount: 1420,
    chapterCount: 42,
    isExclusive: true,
    price: null,
    updatedAt: "2 hours ago",
    ageRating: "TEEN",
    language: "English",
    status: "PUBLISHED",
    chaptersList: [
      { id: "ch-1", chapterNumber: 1, title: "The Obsidian Map", wordCount: 3400, isMembersOnly: false, releasedAt: "2026-09-01" },
      { id: "ch-2", chapterNumber: 2, title: "Whispers in the Crypt", wordCount: 4100, isMembersOnly: false, releasedAt: "2026-09-08" },
      { id: "ch-3", chapterNumber: 3, title: "Threads of Umbra", wordCount: 3800, isMembersOnly: false, releasedAt: "2026-09-15" },
      { id: "ch-4", chapterNumber: 4, title: "The Inquisitor's Hound", wordCount: 4500, isMembersOnly: false, releasedAt: "2026-09-22" },
      { id: "ch-5", chapterNumber: 5, title: "The Sovereign's Oath", wordCount: 4900, isMembersOnly: true, publicAt: "In 3 days", releasedAt: "2026-10-01" },
      { id: "ch-6", chapterNumber: 6, title: "Fractured Horizons", wordCount: 5200, isMembersOnly: true, publicAt: "In 7 days", releasedAt: "2026-10-05" },
    ],
  },
  {
    id: "work-2",
    title: "Neon Valkyrie 2099",
    slug: "neon-valkyrie-2099",
    description: "Full-color cyberpunk webtoon manga following a cyber-enhanced bounty hunter across New Neo-Tokyo.",
    synopsisLong: "Neo-Tokyo, 2099. Mega-corporations have replaced governments, and synthetic consciousness is the ultimate black-market commodity. Ren Takahashi is a Valkyrie-class retrieval specialist who never leaves a contract unfinished. But when her latest bounty turns out to be an experimental AI harboring her murdered sister's memories, she turns against her corporate masters.",
    coverUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    type: "MANGA",
    creator: {
      id: "user-2",
      username: "kenji_studio",
      displayName: "Kenji & Studio K",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
    genres: ["Manga & Comics", "Sci-Fi", "Cyberpunk"],
    averageRating: 4.88,
    ratingCount: 3210,
    chapterCount: 28,
    isExclusive: true,
    price: null,
    updatedAt: "35 mins ago",
    ageRating: "MATURE",
    language: "English",
    status: "PUBLISHED",
    chaptersList: [
      { id: "ch-m-1", chapterNumber: 1, title: "Episode 1: Neon Chrome Rain", wordCount: 0, isMembersOnly: false, releasedAt: "2026-09-10" },
      { id: "ch-m-2", chapterNumber: 2, title: "Episode 2: The Glitch Protocol", wordCount: 0, isMembersOnly: false, releasedAt: "2026-09-17" },
      { id: "ch-m-3", chapterNumber: 3, title: "Episode 3: Overclocked Heart", wordCount: 0, isMembersOnly: false, releasedAt: "2026-09-24" },
      { id: "ch-m-4", chapterNumber: 4, title: "Episode 4: Valkyrie Awoken", wordCount: 0, isMembersOnly: true, publicAt: "In 4 days", releasedAt: "2026-10-04" },
    ],
  },
  {
    id: "work-3",
    title: "The Alchemist of Solitude",
    slug: "the-alchemist-of-solitude",
    description: "A cozy, philosophical light novel about a quiet potion master living in the misty valley of Whispering Pines.",
    synopsisLong: "After twenty years of serving as Chief Alchemist for the Royal War Council, Master Arthur hangs up his cloak and opens a secluded apothecary on the misty borderlands. Between brewing remedies for traveling beast-tamers and teaching curious forest spirits the art of distillation, Arthur finds the quiet life he always yearned for.",
    coverUrl: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=600&auto=format&fit=crop&q=80",
    type: "LIGHT_NOVEL",
    creator: {
      id: "user-3",
      username: "charlotte_b",
      displayName: "Charlotte Bell",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    },
    genres: ["Slice of Life", "Fantasy", "Light Novels"],
    averageRating: 4.95,
    ratingCount: 890,
    chapterCount: 64,
    isExclusive: false,
    price: null,
    updatedAt: "1 day ago",
    ageRating: "EVERYONE",
    language: "English",
    status: "PUBLISHED",
    chaptersList: [
      { id: "ch-3-1", chapterNumber: 1, title: "A Tea of Dried Moon-Petals", wordCount: 2800, isMembersOnly: false, releasedAt: "2026-08-01" },
      { id: "ch-3-2", chapterNumber: 2, title: "The Silver Fox's Cough", wordCount: 3100, isMembersOnly: false, releasedAt: "2026-08-08" },
      { id: "ch-3-3", chapterNumber: 3, title: "Brewing Under Rainstorms", wordCount: 2950, isMembersOnly: false, releasedAt: "2026-08-15" },
    ],
  },
  {
    id: "work-4",
    title: "Echoes of the Void: Short Horrors",
    slug: "echoes-of-the-void-short-horrors",
    description: "An anthology of dread-inducing cosmic horror stories that explore what lurks in the silence between radio frequencies.",
    synopsisLong: "Twelve spine-chilling cosmic horror stories written by award-winning author Marcus Rivera. From a deep-sea drilling rig that taps into a subterranean heartbeat to a radio astronomer who decodes a voice speaking his childhood secrets.",
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    type: "SHORT_STORY",
    creator: {
      id: "user-4",
      username: "m_rivera",
      displayName: "Marcus Rivera",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    },
    genres: ["Horror & Supernatural", "Mystery & Detective", "Short Stories"],
    averageRating: 4.81,
    ratingCount: 540,
    chapterCount: 12,
    isExclusive: false,
    price: null,
    updatedAt: "4 days ago",
    ageRating: "MATURE",
    language: "English",
    status: "PUBLISHED",
    chaptersList: [
      { id: "ch-4-1", chapterNumber: 1, title: "Frequency 107.9 FM", wordCount: 5600, isMembersOnly: false, releasedAt: "2026-07-12" },
      { id: "ch-4-2", chapterNumber: 2, title: "The Rig That Sang", wordCount: 6200, isMembersOnly: false, releasedAt: "2026-07-19" },
    ],
  },
];

export const MOCK_TEXT_CHAPTER: ChapterDetails = {
  id: "ch-1",
  workId: "work-1",
  chapterNumber: 1,
  title: "Chapter 1: The Obsidian Map",
  wordCount: 3400,
  isMembersOnly: false,
  body: `The ink smelled of scorched copper and rain.

Kaelen dipped his glass-tipped stylus into the vial, letting the luminescent charcoal liquid pool upon the parchment of sheepskin. Outside the high arched windows of the cartographer's garret, the towers of High Oakhaven bled into twilight, their obsidian spires catching the dying amethyst rays of the twin suns.

"You're drawing it wrong," a voice muttered from the lintel.

Kaelen did not flinch. He had learned long ago that in the upper quarter of the Spire, assassins arrived with the silence of falling snow, but his friend Mara always brought the distinct scent of dried cardamom and black powder.

"If the cartographer is wrong," Kaelen replied without looking up, "the empire sails off the edge of the world. And so far, our galleons still return with silver."

"Not this time," Mara stepped onto the timber floorboards, her boots clicking softly against the knotted cedar. She dropped a wrapped cylinder onto the draft table. It landed with a dull, heavy thud that made the ink vials rattle.

"What is that?"

"A courier died outside the lower sewer grates twenty minutes ago," she said, her amber eyes scanning the shadows along the eaves. "He wore the insignia of the Silent Wardens. He had six crossbow bolts in his spine and his fingertips were blackened to the bone."

Kaelen set his stylus down upon the marble rest. He reached forward and untied the hemp cord holding the wrapping together. As the oily cloth peeled away, a scroll fashioned not from parchment, but from polished, ultra-thin slate shimmered under the lantern light.

The glyphs upon its surface were not etched. They moved.

"A living ley-map," Kaelen whispered, his pulse quickening. "These were outlawed three centuries before the founding of the dynasty."

"Can you read the coordinates?" Mara asked, leaning over the table, her hand resting on the pommel of her dagger.

Kaelen pressed his index finger to the center meridian. A sharp shock traveled up his forearm, cold as glacial water. In the dark recesses of his mind, a voice spoke—not with words, but with the sudden memory of a city submerged beneath an ocean of shadow.

"It's not a map of the mortal realm," Kaelen breathed, gazing at the pulsating lines. "It's the floorplan of the Shadow Sovereign's prison. And the lock has just begun to turn."`,
};

export const MOCK_MANGA_CHAPTER: ChapterDetails = {
  id: "ch-m-1",
  workId: "work-2",
  chapterNumber: 1,
  title: "Episode 1: Neon Chrome Rain",
  wordCount: 0,
  isMembersOnly: false,
  mangaPages: [
    {
      id: "page-1",
      pageNumber: 1,
      assetUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "page-2",
      pageNumber: 2,
      assetUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "page-3",
      pageNumber: 3,
      assetUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1000&auto=format&fit=crop&q=80",
    },
    {
      id: "page-4",
      pageNumber: 4,
      assetUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80",
    },
  ],
};
