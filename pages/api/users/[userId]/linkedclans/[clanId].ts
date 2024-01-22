import clientPromise from "@/DB/mongo";
import {
  getUserCollection,
  linkClanToUser,
  unlinkClanToUser,
} from "@/DB/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  console.log(req.body);
  const client = await clientPromise;
  const clanId = req.query.clanId;
  const userId = req.query.userId;
  if (req.method === "POST") {
    if (!clanId || !req.body.email) return res.status(400);
    const { email } = req.body;
    const result = await linkClanToUser(
      getUserCollection(client),
      email,
      clanId.toString()
    );
    console.log("Got user col");

    res.status(result ? 200 : 400).end();
    return;
  }
  if (req.method === "DELETE") {
    if (!userId || !clanId) {
      res.status(400).end();
      return;
    }
    const unlinkResult = await unlinkClanToUser(
      getUserCollection(client),
      userId.toString(),
      clanId.toString()
    );
    res.status(unlinkResult ? 200 : 400).end();
    return;
  }
  // const clanId: string = req.url.p
  res.status(405).end();
  return;
};
