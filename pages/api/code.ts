import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import clientPromise from "../../lib/mongodb";
import type { Code } from "../../types";
import { ErrorCode } from "../../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("invitationCodes");

  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      const code = uuidv4();
      await db.collection<Code>("codes").insertOne({ ...bodyObject, code });
      res.json({ code });

      break;
    case "GET":
      const result = await db
        .collection<Code>("codes")
        .find({
          userId: req.query.userId,
        })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      if (result.length === 0) {
        res.status(404).json({ error: ErrorCode.CodeNotFound });

        return;
      }

      res.json({ code: result[0].code });

      break;
  }
}
