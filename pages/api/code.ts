import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("invitationCodes");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let codes = await db.collection("codes").insertOne(bodyObject);
      res.json(codes);

      break;
    case "GET":
      const response = await db.collection("codes").find({}).toArray();
      res.json({ status: 200, data: response });
      break;
  }
}
