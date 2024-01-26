// Import required functions and types from the modules and files
import clientPromise from "@/DB/mongo";
import {
  createProject,
  deleteProject,
  getProject,
  getProjectCollection,
  updateProject,
} from "@/DB/projects";
import { NextApiRequest, NextApiResponse } from "next";

// Function to check the validity of the project body
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

// Exported default asynchronous function (Next.js API route)
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Log the URL and HTTP method of the incoming request
  console.log(req.url, " - ", req.method);

  // Extract user ID and project ID from the request query parameters
  const userId = req.query.userId;
  const projectId = req.query.projectId;

  // Check if user ID or project ID is missing
  if (!userId || !projectId) {
    console.log(req.url, " - User id or Project id missing");
    res.status(400).end();
    return;
  }

  // Retrieve the MongoDB client from the promise
  const client = await clientPromise;

  // Get the 'projects' collection from the MongoDB client
  const col = getProjectCollection(client);

  // Handle different HTTP methods
  if (req.method === "POST") {
    // Handle POST method - create a new project
    const form = req.body;

    // Validate the request body and IDs
    if (form.authorId !== userId || form.id !== projectId || !checkBody(form)) {
      console.log(req.url, " - Body of req and/or URL ids are invalid");
      res.status(400).end();
      return;
    }

    // Insert the project into the collection
    const insert = await createProject(col, form);

    // Respond based on the result of the insertion
    if (!insert) {
      res.status(400).end();
      return;
    }
    res.status(200).end();
    return;
  } else if (req.method === "GET") {
    // Handle GET method - retrieve a project by ID
    const get = await getProject(col, projectId.toString());

    // Respond based on the result of the retrieval
    if (!get) {
      res.status(404).end();
      return;
    }
    res.status(200).json(get);
    return;
  } else if (req.method === "PUT") {
    // Handle PUT method - update an existing project
    const form = req.body;

    // Validate the request body and IDs
    if (form.authorId !== userId || form.id !== projectId || !checkBody(form)) {
      res.status(400).end();
      return;
    }

    // Update the project in the collection
    const update = await updateProject(col, form);

    // Respond based on the result of the update
    res.status(update ? 200 : 400).end();
    return;
  } else if (req.method === "DELETE") {
    // Handle DELETE method - delete an existing project
    const del = await deleteProject(col, projectId.toString());

    // Respond based on the result of the deletion
    res.status(del ? 200 : 400).end();
    return;
  }

  // Respond with a 405 Method Not Allowed status for unsupported methods
  res.status(405).end();
  return;
};
