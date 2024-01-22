import clientPromise from "@/DB/mongo";
import { getUserById, getUserCollection } from "@/DB/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  console.log(req.body);
  const client = await clientPromise;
  const userId = req.query.userId;
  if (req.method === "GET") {
    if (!userId) return res.status(400);
    const user = await getUserById(
      getUserCollection(client),
      userId.toString()
    );
    if (!user) {
      res.status(404).end();
      return;
    }
    res.status(200).json(user);
    return;
  }
  // const clanId: string = req.url.p
  res.status(405).end();
  return;
};
