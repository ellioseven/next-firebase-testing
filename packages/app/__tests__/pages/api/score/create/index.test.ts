import * as functions from "firebase-functions-test";
import { config, seed } from "@ellioseven/next-firebase-firebase";
import http from "node-mocks-http";
import { getScores } from "@ellioseven/next-firebase-firebase";
import endpoint from "@pages/api/score/create";

const test = functions.default();

afterEach(async () => {
  await test.firestore.clearFirestoreData({
    projectId: config.projectId,
  });
});

it("creates score", async () => {
  await seed();

  const response: any = http.createResponse();
  // @todo Fix any.
  const request: any = http.createRequest({
    method: "POST",
    body: JSON.stringify({
      name: "John",
      score: 10,
    }) as any,
  });

  await endpoint(request, response);

  const scores = await getScores();
  const last = scores.pop();
  const result = { name: last?.name, score: last?.score };

  expect(result).toEqual({
    name: "John",
    score: 10,
  });
});
