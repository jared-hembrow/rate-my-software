// Import the MongoDB client promise, project-related functions, and ProjectCardList component
import clientPromise from "@/DB/mongo";
import { getAllProjects, getProjectCollection } from "@/DB/projects";
import ProjectCardList from "@/components/Projects/ProjectCardList";

// Import React and the Function Component (FC) type
import React, { FC } from "react";

// Define the Function Component (FC) as an asynchronous function
const page: FC = async () => {
  // Establish a connection to the MongoDB client using the clientPromise
  const dbClient = await clientPromise;

  // Retrieve the project collection from the MongoDB client
  const projectCol = getProjectCollection(dbClient);

  // Retrieve all projects from the project collection
  const projects = await getAllProjects(projectCol);

  // Return the rendered ProjectCardList component with the list of projects
  return (
    <div
      className="container p-5"
      style={{
        borderRadius: "5px",
        marginTop: "25px",
        minHeight: "87vh",
      }}
    >
      <ProjectCardList list={projects || []} />
    </div>
  );
};

// Export the Function Component (FC) as the default export
export default page;
