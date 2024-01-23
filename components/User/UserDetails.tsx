import React, { FC, useState } from "react";
// STYLE
import style from "./UserProfile.module.css";
type Props = {
  name: string;
  email: string;
  onSubmit: (formValues: { [key: string]: string }) => void;
};
type SubmissionTypes = "emailEditSubmit" | "nameEditSubmit";
type IconTypes =
  | SubmissionTypes
  | "nameEdit"
  | "emailEdit"
  | "nameEditCancel"
  | "emailEditCancel";
const UserDetails: FC<Props> = ({ name, email, onSubmit }) => {
  const [userName, setUserName] = useState<string>(name);
  const [userEmail, setUserEmail] = useState<string>(email);
  const [editUserName, setEditUserName] = useState<boolean>(false);
  const [editUserEmail, setEditUserEmail] = useState<boolean>(false);

  const onNameEditIconClick = () => {
    console.log("edit name icon click ");
    setEditUserName(!editUserName);
  };
  const handleSubmit = async (submitType: SubmissionTypes) => {
    if (submitType === "nameEditSubmit") {
      onSubmit({ name: userName });
      return;
    }
    if (submitType === "emailEditSubmit") {
      onSubmit({ email: userEmail });
      return;
    }

    console.log("user name submit");
  };
  const onIconClick = (iconType: IconTypes) => {
    if (iconType.includes("Submit"))
      return handleSubmit(iconType as SubmissionTypes);
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
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
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

          {/* <div className={"row"}>
            <div className="col">
              <div className={"row"}>
                <div className="col">
                  <span className={style["text-label"]}>Email:</span>
                </div>
                <div className="col">
                  {!editUserEmail ? (
                    userEmail || ""
                  ) : (
                    <>
                      <input
                        type="text"
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                        className="form-control"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") onIconClick("emailEditSubmit");
                        }}
                      />
                    </>
                  )}
                </div>
                <div className="col">
                  {!editUserEmail ? (
                    <i
                      onClick={() => setEditUserEmail(!editUserEmail)}
                      style={{ color: "white", fontSize: "1.5rem" }}
                      className={`bi bi-pencil-square ${style["action-hover"]}`}
                    ></i>
                  ) : (
                    <div>
                      <i
                        onClick={() => onIconClick("emailEditSubmit")}
                        style={{
                          color: "greenyellow",
                          marginRight: "20px",
                          fontSize: "1.5rem",
                        }}
                        className={`bi bi-check-square ${style["action-hover"]}`}
                      ></i>
                      <i
                        onClick={() => onIconClick("emailEditCancel")}
                        style={{ color: "red", fontSize: "1.5rem" }}
                        className={`bi bi-x-square ${style["action-hover"]}`}
                      ></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
