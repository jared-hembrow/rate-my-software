import clientPromise from "@/DB/mongo";
import { getProject, getProjectCollection } from "@/DB/projects";
import { getUser, getUserCollection } from "@/DB/users";
import ProjectView from "@/components/Projects/ProjectView";
import { getServerSession } from "next-auth";
import React, { FC } from "react";
type Props = {
  params: { projectId: string };
};
const page: FC<Props> = async ({ params }) => {
  const projectId = params.projectId;
  const session = await getServerSession();
  if (!session) return null;
  if (!session.hasOwnProperty("user")) return null;

  const dbClient = await clientPromise;
  const col = getUserCollection(dbClient);
  const projectCol = getProjectCollection(dbClient);
  const user = await getUser(col, session.user?.email || "");
  const project = await getProject(projectCol, projectId);
  console.log("retrived user", user);
  if (!user) return <div>i lost i dont have a user</div>;
  if (!project) return null;
  return (
    <div className="container">
      <ProjectView
        usersOwnProject={project.authorId === user.id}
        project={project}
      />
    </div>
  );
};

export default page;
