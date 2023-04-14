import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";
import type { Code, RelationInfo, Relation } from "../../types";
import { ErrorCode } from "../../constants";

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
        .collection<Code>("codes")
        .find({ code })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      if (codeInfo.length === 0) {
        res.status(400).json({ error: ErrorCode.InvalidCode });

        return;
      }

      const data: Relation = {
        inviteeId: userId,
        inviterId: codeInfo[0].userId,
        inviterName: codeInfo[0].displayName,
        inviterCode: code,
      };

      await db.collection<Relation>("relations").insertOne(data);

      const invitees = await db
        .collection<Relation>("relations")
        .find({
          inviterId: userId,
        })
        .toArray();

      const body: RelationInfo = {
        inviterInfo: {
          id: codeInfo[0].userId,
          name: codeInfo[0].displayName,
          code: code,
        },
        inviteeCount: invitees.length || 0,
      };

      res.json(body);

      break;
    }
    case "GET": {
      const inviter = await db
        .collection<Relation>("relations")
        .find({
          inviteeId: req.query.userId,
        })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      const invitees = await db
        .collection<Relation>("relations")
        .find({
          inviterId: req.query.userId,
        })
        .toArray();

      const body: RelationInfo = {
        inviterInfo:
          inviter.length !== 0
            ? {
                id: inviter[0].inviterId,
                name: inviter[0].inviterName,
                code: inviter[0].inviterCode,
              }
            : undefined,
        inviteeCount: invitees.length || 0,
      };

      res.json(body);

      break;
    }
  }
}
