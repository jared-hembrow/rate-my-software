import React, { FC } from "react";

// Import the MongoDB client promise and project/user-related functions
import clientPromise from "@/DB/mongo";
import { getAllProjects, getProjectCollection } from "@/DB/projects";
import { getUser, getUserCollection } from "@/DB/users";

// Import the UserProfile component for rendering user information
import UserProfile from "@/components/User/UserProfile";

// Import Next.js utility functions and React for creating components
import { getServerSession } from "next-auth";

// Define the page component as an asynchronous function
const page: FC = async () => {
  // Retrieve the user session using NextAuth's getServerSession function
  const session = await getServerSession();

  // If no session exists or if the session lacks a "user" property, return null
  if (!session || !session.hasOwnProperty("user")) return null;

  // Establish a connection to the MongoDB client using the clientPromise
  const dbClient = await clientPromise;

  // Retrieve user and project collections from the MongoDB client
  const col = getUserCollection(dbClient);
  const projectsCol = getProjectCollection(dbClient);

  // Retrieve user information based on the session user's email
  const user = await getUser(col, session.user?.email || "");

  // If no user is found, display a message and return null
  if (!user) return <div>i lost i dont have a user</div>;

  // Retrieve all projects associated with the user's ID
  const projects = await getAllProjects(projectsCol, user.id);

  // Return the rendered UserProfile component with user and project information
  return (
    <div className="container p-3">
      <UserProfile user={user} projects={projects || []} />
    </div>
  );
};

// Export the page component as the default export
export default page;
