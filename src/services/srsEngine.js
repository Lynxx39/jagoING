/**
 * SuperMemo SM-2 Spaced Repetition Algorithm
 * 
 * Quality ratings:
 * 0: Again (Complete blackout / wrong)
 * 3: Hard (Correct response with significant difficulty)
 * 4: Good (Correct response after a hesitation)
 * 5: Easy (Perfect response without hesitation)
 */

export function calculateSM2(quality, card) {
  let { repetitions = 0, interval = 1, easeFactor = 2.5 } = card;

  // Validate quality (0 - 5)
  if (quality < 3) {
    // Failed: reset repetitions, review again tomorrow / immediately
    repetitions = 0;
    interval = 1;
  } else {
    // Successful recall
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update Ease Factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const now = new Date();
  const nextReviewDate = new Date();
  nextReviewDate.setDate(now.getDate() + interval);

  return {
    ...card,
    repetitions,
    interval,
    easeFactor: Number(easeFactor.toFixed(2)),
    lastReviewed: now.toISOString(),
    nextReviewDate: nextReviewDate.toISOString(),
    state: quality < 3 ? 'learning' : interval > 21 ? 'mastered' : 'review'
  };
}

export function isCardDue(card) {
  if (!card.nextReviewDate) return true;
  return new Date(card.nextReviewDate) <= new Date();
}
