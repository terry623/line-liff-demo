import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";

export type Codes = {
  userId: string;
  displayName: string;
  code: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("invitationCodes");

  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      const code = await db.collection<Codes>("codes").insertOne(bodyObject);
      res.json(code);

      break;
    case "GET":
      const result = await db
        .collection<Codes>("codes")
        .find({
          userId: req.query.userId,
        })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();
      res.json(result[0]?.code);

      break;
  }
}
