import { db } from "@services/firebase";

export type Score = {
  name: string;
  score: number;
};

export const collectionScore = db.collection("scores");

export const createScore = async (score: Score) => {
  const result = await collectionScore.add(score);
  return result.id;
};

export const getScores = async () => {
  const ref = await collectionScore.get();
  return ref.docs.map((doc) => doc.data()) as Score[];
};
