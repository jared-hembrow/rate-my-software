import clientPromise from "@/DB/mongo";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getProjectCollection,
  updateProject,
} from "@/DB/projects";
import { getUserCollection } from "@/DB/users";
import { NextApiRequest, NextApiResponse } from "next";
const checkBody = (project: { [key: string]: any }): project is Project => {
  if (!project.id && typeof project.id !== "string") return false;
  if (!project.name && typeof project.name !== "string") return false;
  if (!project.description && typeof project.description !== "string")
    return false;
  if (!project.authorId && typeof project.authorId !== "string") return false;
  if (!project.author && typeof project.author !== "string") return false;
  if (!project.links && !Array.isArray(project.links)) return false;
  if (!project.reviews && !Array.isArray(project.reviews)) return false;
  return true;
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId;

  if (!userId) {
    res.status(400).end();
    return;
  }

  const client = await clientPromise;
  const col = getProjectCollection(client);

  if (req.method === "GET") {
    const get = await getAllProjects(col, userId.toString());
    if (!get) {
      res.status(404).end();
      return;
    }
    res.status(200).json(get);
    return;
  }
  res.status(405).end();
  return;
};
