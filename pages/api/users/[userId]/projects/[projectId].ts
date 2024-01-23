import clientPromise from "@/DB/mongo";
import {
  createProject,
  deleteProject,
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
  if (!project.hasOwnProperty("author") && typeof project.author !== "string")
    return false;
  if (!project.links && !Array.isArray(project.links)) return false;
  if (!project.reviews && !Array.isArray(project.reviews)) return false;
  return true;
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.url, " - ", req.method);
  const userId = req.query.userId;
  const projectId = req.query.projectId;
  if (!userId || !projectId) {
    console.log(req.url, " - User id or Project id don't match");
    res.status(400).end();
    return;
  }

  const client = await clientPromise;
  const col = getProjectCollection(client);
  if (req.method === "POST") {
    const form = req.body;
    console.log("Body: ", form);
    if (form.authorId !== userId || form.id !== projectId || !checkBody(form)) {
      console.log(req.url, " -  Body of req and or URL ids are invalid");
      res.status(400).end();
      return;
    }
    const insert = await createProject(col, form);
    if (!insert) {
      res.status(400).end();
      return;
    }
    res.status(200).end();
    return;
  } else if (req.method === "GET") {
    const get = await getProject(col, projectId.toString());
    if (!get) {
      res.status(404).end();
      return;
    }
    res.status(200).json(get);
    return;
  } else if (req.method === "PUT") {
    const form = req.body;
    if (form.authorId !== userId || form.id !== projectId || !checkBody(form)) {
      res.status(400).end();
      return;
    }
    const update = await updateProject(col, form);
    res.status(update ? 200 : 400).end();
    return;
  } else if (req.method === "DELETE") {
    const del = await deleteProject(col, projectId.toString());
    res.status(del ? 200 : 400).end();
    return;
  }
  res.status(405).end();
  return;
};
