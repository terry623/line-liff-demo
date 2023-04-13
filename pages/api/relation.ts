import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("invitationCodes");

  switch (req.method) {
    case "POST": {
      let bodyObject = JSON.parse(req.body);
      const { userId, code } = bodyObject;
      const inviter = await db
        .collection("codes")
        .find({ code })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      if (inviter.length === 0) {
        res.status(400).json({ message: "Invalid code" });

        return;
      }

      const data = {
        inviteeId: userId,
        inviterId: inviter[0].userId,
        inviterName: inviter[0].displayName,
        code,
      };

      await db.collection("relations").insertOne(data);

      const invitees = await db
        .collection("relations")
        .find({
          inviterId: userId,
        })
        .toArray();

      res.json({
        inviterId: inviter[0].userId,
        inviterName: inviter[0].displayName,
        inviterCode: inviter[0].code,
        inviteeCount: invitees.length,
      });

      break;
    }
    case "GET": {
      const inviter = await db
        .collection("relations")
        .find({
          inviteeId: req.query.userId,
        })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      const invitees = await db
        .collection("relations")
        .find({
          inviterId: req.query.userId,
        })
        .toArray();

      res.json({
        inviterId: inviter[0]?.userId,
        inviterName: inviter[0]?.displayName,
        inviterCode: inviter[0]?.code,
        inviteeCount: invitees.length,
      });

      break;
    }
  }
}
