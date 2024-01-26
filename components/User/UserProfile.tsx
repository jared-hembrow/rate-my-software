/**
 * React component for rendering user profile details, including user details and associated projects.
 * @param {Props} user - The user object containing user details.
 * @param {Props} projects - An array of projects associated with the user.
 * @returns {JSX.Element} - Returns the JSX representation of the UserProfile component.
 */
"use client";
import axios from "axios";
import React, { FC, useState } from "react";
// STYLE
import style from "./UserProfile.module.css";
import UserDetails from "./UserDetails";
import UserProjects from "./UserProjects";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  user: User;
  projects: Project[];
};

// Define the UserProfile Function Component (FC)
const UserProfile: FC<Props> = ({ user, projects }) => {
  // State variable to manage user data
  const [userData, setUserData] = useState<User>(user);

  // Function to handle form submission for user details update
  const onSubmit = async (formValues: object) => {
    // Log form values with user ID
    console.log({
      ...formValues,
      id: userData.id,
    });

    // Make a PUT request to update user details
    const res = await axios.put(`/api/users/${userData.id}`, {
      ...formValues,
      id: userData.id,
    });

    // Log the response status
    console.log(res.status);
  };

  // Return the JSX representation of the UserProfile component
  return (
    <div className={style["profile-container"]}>
      {/* Render user details section */}
      <UserDetails
        name={userData.name || ""}
        email={userData.email || ""}
        onSubmit={onSubmit}
      />
      <hr />

      {/* Render projects section */}
      <h2>Projects</h2>
      <UserProjects projects={projects} user={user} />
    </div>
  );
};

// Export the UserProfile Function Component (FC) as the default export
export default UserProfile;
