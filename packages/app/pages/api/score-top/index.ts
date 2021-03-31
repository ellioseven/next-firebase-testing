import { NextApiRequest, NextApiResponse } from "next";
import { getScoreTable } from "@ellioseven/next-firebase-firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    if (method !== "GET") {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Method not found" });
    }

    const data = await getScoreTable();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
