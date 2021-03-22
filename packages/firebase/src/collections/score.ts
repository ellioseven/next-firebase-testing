import { db } from "@services/firebase";

export type Score = {
  id: string;
  name: string;
  score: number;
};

const collection = db.collection("scores");

export const createScore = async (score: Omit<Score, "id">) => {
  const result = await collection.add(score);
  return result.id;
};

export const getScores = async () => {
  const ref = await collection.get();
  return ref.docs.map((doc) => doc.data()) as Score[];
};
