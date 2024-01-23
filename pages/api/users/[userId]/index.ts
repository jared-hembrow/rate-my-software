import clientPromise from "@/DB/mongo";
import { getUserById, getUserCollection, updateUser } from "@/DB/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("URL:", req.url, " - ", req.method);
  console.log(req.query);
  console.log(req.body);
  const client = await clientPromise;
  const col = getUserCollection(client);
  const userId = req.query.userId;
  if (req.method === "GET") {
    if (!userId) return res.status(400);
    const user = await getUserById(col, userId.toString());
    if (!user) {
      res.status(404).end();
      return;
    }
    res.status(200).json(user);
    return;
  }
  if (req.method === "PUT") {
    const form = req.body;
    const result = await updateUser(col, form);
    console.log("User update result: ", result);
    res.status(result ? 200 : 400).end();
    return;
  }
  // const clanId: string = req.url.p
  res.status(405).end();
  return;
};
