import { collectionScore, Score } from "@collections/score";

/**
 * Populate emulated Firestore with initial data.
 */
export const seed = async () => {
  const scores: Score[] = [
    { name: "Alice", score: 50 },
    { name: "Tori", score: 55 },
    { name: "Courtney", score: 65 },
    { name: "Ray", score: 70 },
    { name: "Austin", score: 75 },
    { name: "Chloe", score: 80 },
    { name: "Tim", score: 85 },
    { name: "Sarah", score: 90 },
    { name: "Jane", score: 95 },
    { name: "Elliot", score: 99 },
  ];

  for (const score of scores) {
    // Firebase functions will be triggered to populate top score table.
    await collectionScore.add(score);
  }
};
