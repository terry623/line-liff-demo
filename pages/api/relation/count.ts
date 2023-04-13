import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("invitationCodes");

  switch (req.method) {
    case "GET":
      const result = await db
        .collection("relations")
        .find({
          inviterId: req.query.userId,
        })
        .toArray();
      res.json(result);

      break;
  }
}
