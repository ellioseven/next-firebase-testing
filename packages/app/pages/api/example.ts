import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@services/firebase"

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const collection = db.collection("example");
    const doc = await collection.doc("10").get()
    const data = doc.data()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
