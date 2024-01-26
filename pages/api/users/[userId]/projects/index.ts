// Import required functions and types from the modules and files
import clientPromise from "@/DB/mongo";
import { getAllProjects, getProjectCollection } from "@/DB/projects";
import { NextApiRequest, NextApiResponse } from "next";

// Exported default asynchronous function (Next.js API route)
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract user ID from the request query parameters
  const userId = req.query.userId;

  // Check if user ID is missing
  if (!userId) {
    res.status(400).end();
    return;
  }

  // Retrieve the MongoDB client from the promise
  const client = await clientPromise;

  // Get the 'projects' collection from the MongoDB client
  const col = getProjectCollection(client);

  // Handle GET method
  if (req.method === "GET") {
    // Retrieve all projects for a specific user
    const get = await getAllProjects(col, userId.toString());

    // Respond based on the result of the retrieval
    if (!get) {
      res.status(404).end();
      return;
    }
    res.status(200).json(get);
    return;
  }

  // Respond with a 405 Method Not Allowed status for unsupported methods
  res.status(405).end();
  return;
};
