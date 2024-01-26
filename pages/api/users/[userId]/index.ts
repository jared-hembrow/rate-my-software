// Import required functions and types from the modules and files
import clientPromise from "@/DB/mongo";
import { getUserById, getUserCollection, updateUser } from "@/DB/users";
import { NextApiRequest, NextApiResponse } from "next";

// Exported default asynchronous function (Next.js API route)
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Log the URL and HTTP method for debugging purposes
  console.log("URL:", req.url, " - ", req.method);

  // Log query parameters and request body for debugging purposes
  console.log(req.query);
  console.log(req.body);

  // Retrieve the MongoDB client from the promise
  const client = await clientPromise;

  // Get the 'users' collection from the MongoDB client
  const col = getUserCollection(client);

  // Extract user ID from the request query parameters
  const userId = req.query.userId;

  // Handle GET method
  if (req.method === "GET") {
    // Check if user ID is missing
    if (!userId) return res.status(400);

    // Retrieve user by ID from the database
    const user = await getUserById(col, userId.toString());

    // Respond based on the result of the retrieval
    if (!user) {
      res.status(404).end();
      return;
    }
    res.status(200).json(user);
    return;
  }

  // Handle PUT method
  if (req.method === "PUT") {
    // Extract form data from the request body
    const form = req.body;

    // Update user information in the database
    const result = await updateUser(col, form);

    // Log the result of the user update for debugging
    console.log("User update result: ", result);

    // Respond with the appropriate status code
    res.status(result ? 200 : 400).end();
    return;
  }

  // Respond with a 405 Method Not Allowed status for unsupported methods
  res.status(405).end();
  return;
};
