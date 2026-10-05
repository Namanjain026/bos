export type WorkType =
  | "NOVEL"
  | "NOVELLA"
  | "SHORT_STORY"
  | "POETRY"
  | "MANGA"
  | "COMIC"
  | "LIGHT_NOVEL"
  | "NON_FICTION";

export type WorkStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "PUBLISHED"
  | "COMPLETED"
  | "ARCHIVED"
  | "FLAGGED"
  | "UNDER_REVIEW"
  | "RESTRICTED"
  | "REMOVED";

export type ChapterStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "PUBLISHED"
  | "MEMBERS_FIRST"
  | "ARCHIVED";

export interface UserSummary {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  isCreator: boolean;
}

export interface WorkCardData {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverUrl?: string | null;
  type: WorkType;
  creator: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string | null;
  };
  genres: string[];
  averageRating: number;
  ratingCount: number;
  chapterCount: number;
  isExclusive?: boolean;
  price?: number | null;
  updatedAt: string;
}

export interface ChapterDetails {
  id: string;
  workId: string;
  chapterNumber: number;
  title: string;
  body?: string | null;
  wordCount: number;
  isMembersOnly: boolean;
  isLocked?: boolean;
  publicAt?: string | null;
  mangaPages?: {
    id: string;
    pageNumber: number;
    assetUrl: string;
    width?: number | null;
    height?: number | null;
  }[];
}
