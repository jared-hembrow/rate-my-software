import clientPromise from "@/DB/mongo";
import { getAllProjects, getProjectCollection } from "@/DB/projects";
import ProjectCardList from "@/components/Projects/ProjectCardList";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const dbClient = await clientPromise;
  const projectCol = getProjectCollection(dbClient);
  // console.log("CLient",dbClient)
  const projects = await getAllProjects(projectCol);

  return (
    <div
      className="container p-5"
      style={{
        // backgroundColor: "var(--midnight-blue)",
        borderRadius: "5px",
        marginTop: "25px",
        minHeight: "87vh",
      }}
    >
      <ProjectCardList list={projects || []} />
    </div>
  );
};

export default page;
