import { NextApiRequest, NextApiResponse } from "next";
import { createScore } from "@ellioseven/next-firebase-firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      method,
      body: { name, score },
    } = req;

    if (method !== "POST") {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Method not found" });
    }

    if (!name || !score) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid data",
      });
    }

    await createScore({ name, score });
    res.status(200).json(true);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
