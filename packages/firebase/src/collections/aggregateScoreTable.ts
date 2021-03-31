import { db } from "@services/firebase";
import { Score } from "./score";

const TABLE_ROW_LIMIT = 10;

export type AggregateScoreTableRow = {
  name: string;
  score: number;
};

export const collectionAggregateScoreTable = db.collection(
  "aggregateScoreTable"
);

/**
 * Maybe add score to top score table.
 *
 * If score beats any top score on the table, it will be pushed to the top
 * score table, which will be recalculated and re-written.
 */
export const commitScoreToTable = async (score: Score) => {
  const table = await getScoreTable();

  // Check if score beats any top score.
  const isTopScore = table.some((topScore) => score.score > topScore.score);

  // Exit early if score isn't a winner.
  if (table.length != 0 && !isTopScore) return;

  table.push(score);

  // Re-sort updated table.
  const tableUpdated = [...table];
  tableUpdated.sort((a, b) => {
    return b.score - a.score;
  });

  // Re-write updated table.
  for (const index in tableUpdated.slice(0, TABLE_ROW_LIMIT)) {
    const row = tableUpdated[index];
    await collectionAggregateScoreTable.doc(index.toString()).set(row);
  }
};

/**
 * Get ordered score table.
 */
export const getScoreTable = async () => {
  const snapshot = await collectionAggregateScoreTable
    .orderBy("score", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    return doc.data() as Score;
  });
};
