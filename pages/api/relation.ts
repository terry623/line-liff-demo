import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";
import { Codes } from "./code";

type Relations = {
  inviteeId: string;
  inviterId: string;
  inviterName: string;
  code: string;
};

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
      const codeInfo = await db
        .collection<Codes>("codes")
        .find({ code })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      if (codeInfo.length === 0) {
        res.status(400).json({ message: "Invalid invitation code" });

        return;
      }

      const data = {
        inviteeId: userId,
        inviterId: codeInfo[0].userId,
        inviterName: codeInfo[0].displayName,
        code,
      };

      await db.collection<Relations>("relations").insertOne(data);

      const invitees = await db
        .collection<Relations>("relations")
        .find({
          inviterId: userId,
        })
        .toArray();

      res.json({
        inviterId: codeInfo[0].userId,
        inviterName: codeInfo[0].displayName,
        inviterCode: codeInfo[0].code,
        inviteeCount: invitees.length || 0,
      });

      break;
    }
    case "GET": {
      const inviter = await db
        .collection<Relations>("relations")
        .find({
          inviteeId: req.query.userId,
        })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      const invitees = await db
        .collection<Relations>("relations")
        .find({
          inviterId: req.query.userId,
        })
        .toArray();

      res.json({
        inviterId: inviter[0]?.inviterId,
        inviterName: inviter[0]?.inviterName,
        inviterCode: inviter[0]?.code,
        inviteeCount: invitees.length || 0,
      });

      break;
    }
  }
}
