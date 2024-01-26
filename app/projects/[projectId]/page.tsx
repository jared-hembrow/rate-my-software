// Import the MongoDB client promise, project/user-related functions, and ProjectView component
import clientPromise from "@/DB/mongo";
import { getProject, getProjectCollection } from "@/DB/projects";
import { getUser, getUserCollection } from "@/DB/users";
import ProjectView from "@/components/Projects/ProjectView";

// Import Next.js utility functions, React, and the Function Component (FC) type
import { getServerSession } from "next-auth";
import React, { FC } from "react";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  params: { projectId: string };
};

// Define the Function Component (FC) as an asynchronous function
const page: FC<Props> = async ({ params }) => {
  // Extract the projectId from the params
  const projectId = params.projectId;

  // Retrieve the user session using NextAuth's getServerSession function
  const session = await getServerSession();

  // If no session exists or if the session lacks a "user" property, return null
  if (!session || !session.hasOwnProperty("user")) return null;

  // Establish a connection to the MongoDB client using the clientPromise
  const dbClient = await clientPromise;

  // Retrieve user and project collections from the MongoDB client
  const col = getUserCollection(dbClient);
  const projectCol = getProjectCollection(dbClient);

  // Retrieve user information based on the session user's email
  const user = await getUser(col, session.user?.email || "");

  // Retrieve project information based on the projectId
  const project = await getProject(projectCol, projectId);

  // Log user information to the console
  console.log("retrieved user", user);

  // If no user is found or if the project doesn't exist, return null
  if (!user) return <div>i lost i dont have a user</div>;
  if (!project) return null;

  // Return the rendered ProjectView component with user and project information
  return (
    <div className="container">
      <ProjectView
        usersOwnProject={project.authorId === user.id}
        project={project}
      />
    </div>
  );
};

// Export the Function Component (FC) as the default export
export default page;
