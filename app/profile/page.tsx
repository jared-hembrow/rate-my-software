import clientPromise from "@/DB/mongo";
import { getAllProjects, getProjectCollection } from "@/DB/projects";
import { getUser, getUserCollection } from "@/DB/users";
import UserProfile from "@/components/User/UserProfile";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session = await getServerSession();
  if (!session) return null;
  if (!session.hasOwnProperty("user")) return null;

  const dbClient = await clientPromise;
  const col = getUserCollection(dbClient);
  const projectsCol = getProjectCollection(dbClient);
  // console.log("CLient",dbClient)
  const user = await getUser(col, session.user?.email || "");
  console.log("User: ", user);
  if (!user) return <div>i lost i dont have a user</div>;
  const projects = await getAllProjects(projectsCol, user.id);
  console.log("user ID: ", user.id);
  console.log("Projects:  ", projects);
  return (
    <div className="container p-3">
      <UserProfile user={user} projects={projects || []} />
    </div>
  );
};
export default page;
