"use client";
import axios from "axios";
import React, { FC, useState } from "react";
// STYLE
import style from "./UserProfile.module.css";
import UserDetails from "./UserDetails";
import UserProjects from "./UserProjects";
type Props = {
  user: User;
  projects: Project[];
};

const UserProfile: FC<Props> = ({ user, projects }) => {
  const [userData, setUserData] = useState<User>(user);
  const onSubmit = async (formValues: object) => {
    console.log({
      ...formValues,
      id: userData.id,
    });
    const res = await axios.put(`/api/users/${userData.id}`, {
      ...formValues,
      id: userData.id,
    });
    console.log(res.status);
  };
  return (
    <div className={style["profile-container"]}>
      <UserDetails
        name={userData.name || ""}
        email={userData.email || ""}
        onSubmit={onSubmit}
      />
      <hr />
      <h2>Projects</h2>
      <UserProjects projects={projects} user={user} />
    </div>
  );
};

export default UserProfile;
