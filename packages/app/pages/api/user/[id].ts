import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@ellioseven/next-firebase-firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { id },
      method,
    } = req;

    if (method !== "GET") {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Method not found" });
    }

    const collection = db.collection("example");
    const doc = await collection.doc(id as string).get();
    const data = doc.data();

    res.status(200).json(data || null);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
