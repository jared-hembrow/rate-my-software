/**
 * React component for rendering user details, including name and email, with the ability to edit them.
 * @param {Props} name - The user's name.
 * @param {Props} email - The user's email.
 * @param {Props} onSubmit - Callback function to handle form submission.
 * @returns {JSX.Element} - Returns the JSX representation of the UserDetails component.
 */

import React, { FC, useState } from "react";
// STYLE
import style from "./UserProfile.module.css";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  name: string;
  email: string;
  onSubmit: (formValues: { [key: string]: string }) => void;
};

// Define the type for submission types and icon types
type SubmissionTypes = "emailEditSubmit" | "nameEditSubmit";
type IconTypes =
  | SubmissionTypes
  | "nameEdit"
  | "emailEdit"
  | "nameEditCancel"
  | "emailEditCancel";

// Define the UserDetails Function Component (FC)
const UserDetails: FC<Props> = ({ name, email, onSubmit }) => {
  // State variables to manage user details and edit modes
  const [userName, setUserName] = useState<string>(name);
  const [userEmail, setUserEmail] = useState<string>(email);
  const [editUserName, setEditUserName] = useState<boolean>(false);
  const [editUserEmail, setEditUserEmail] = useState<boolean>(false);

  // Function to handle the click event for the name edit icon
  const onNameEditIconClick = () => {
    setEditUserName(!editUserName);
  };

  // Function to handle form submission based on submission type
  const handleSubmit = async (submitType: SubmissionTypes) => {
    if (submitType === "nameEditSubmit") {
      onSubmit({ name: userName });
    } else if (submitType === "emailEditSubmit") {
      onSubmit({ email: userEmail });
    }
  };

  // Function to handle click events for icons
  const onIconClick = (iconType: IconTypes) => {
    if (iconType.includes("Submit")) {
      return handleSubmit(iconType as SubmissionTypes);
    }

    switch (iconType) {
      case "nameEdit":
        setEditUserName(!editUserName);
        return;
      case "emailEdit":
        setEditUserEmail(!editUserEmail);
        return;
      case "nameEditCancel":
        setEditUserName(false);
        setUserName(name);
        return;
      case "emailEditCancel":
        setEditUserEmail(false);
        setUserEmail(email);
        return;
      default:
        return;
    }
  };

  // Return the JSX representation of the UserDetails component
  return (
    <>
      {/* Main Details */}
      <div className={"row"}>
        <div className="col">
          <div className={"row"}>
            <div className="col">
              <span className={style["text-label"]}>Name:</span>
            </div>
            <div className="col">
              {!editUserName ? (
                userName || ""
              ) : (
                <>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onIconClick("nameEditSubmit");
                    }}
                  />
                </>
              )}
            </div>
            <div className="col">
              {!editUserName ? (
                <i
                  onClick={onNameEditIconClick}
                  style={{ color: "white", fontSize: "1.5rem" }}
                  className={`bi bi-pencil-square ${style["action-hover"]}`}
                ></i>
              ) : (
                <div>
                  <i
                    onClick={() => onIconClick("nameEditSubmit")}
                    style={{
                      color: "greenyellow",
                      marginRight: "20px",
                      fontSize: "1.5rem",
                    }}
                    className={`bi bi-check-square ${style["action-hover"]}`}
                  ></i>
                  <i
                    onClick={() => onIconClick("nameEditCancel")}
                    style={{ color: "red", fontSize: "1.5rem" }}
                    className={`bi bi-x-square ${style["action-hover"]}`}
                  ></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the UserDetails Function Component (FC) as the default export
export default UserDetails;
