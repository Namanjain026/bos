/**
 * Book of Shades - Deterministic Discovery & Trending Ranking Algorithm
 * Implements weighted engagement metrics with exponential time decay.
 */

export interface WorkRankingSignals {
  recentViews: number;
  recentReadsCompleted: number;
  followsGained: number;
  ratingsVelocity: number; // e.g., sum of ratings in window or avg * count
  commentsCount: number;
  bookmarksCount: number;
  completionRate: number; // between 0.0 and 1.0 (converted to score * 100)
  reportsPenalty: number; // penalty points deducted for verified/open reports
  hoursSinceRelease?: number; // for time decay
}

export const RANKING_WEIGHTS = {
  recentViews: 0.25,
  recentReadsCompleted: 0.25,
  follows: 0.15,
  ratingsVelocity: 0.10,
  comments: 0.05,
  bookmarks: 0.10,
  completionRate: 0.10,
};

/**
 * Calculates raw deterministic trending score based on signals
 */
export function calculateRawTrendingScore(signals: WorkRankingSignals): number {
  const normalizedCompletion = Math.min(Math.max(signals.completionRate, 0), 1) * 100;

  const score =
    signals.recentViews * RANKING_WEIGHTS.recentViews +
    signals.recentReadsCompleted * RANKING_WEIGHTS.recentReadsCompleted +
    signals.followsGained * RANKING_WEIGHTS.follows +
    signals.ratingsVelocity * RANKING_WEIGHTS.ratingsVelocity +
    signals.commentsCount * RANKING_WEIGHTS.comments +
    signals.bookmarksCount * RANKING_WEIGHTS.bookmarks +
    normalizedCompletion * RANKING_WEIGHTS.completionRate -
    signals.reportsPenalty;

  return Math.max(0, score);
}

/**
 * Applies time-decay using gravity factor
 * Score = RawScore / (hours + 2)^gravity
 */
export function calculateDecayedTrendingScore(
  signals: WorkRankingSignals,
  gravity: number = 1.5
): number {
  const rawScore = calculateRawTrendingScore(signals);
  const hours = Math.max(0, signals.hoursSinceRelease ?? 0);
  const decayFactor = Math.pow(hours + 2, gravity);
  return rawScore / decayFactor;
}

/**
 * Bayesian average rating calculation for Top Rated surface
 * Prevents 1 vote of 5.0 outranking 1,000 votes of 4.8
 */
export function calculateBayesianRating(
  averageRating: number,
  voteCount: number,
  priorMean: number = 3.8,
  minVotesConfidence: number = 10
): number {
  return (minVotesConfidence * priorMean + voteCount * averageRating) / (minVotesConfidence + voteCount);
}
