/**
 * React component for rendering user projects, allowing users to create, edit, and delete projects.
 * @param {Props} projects - An array of projects associated with the user.
 * @param {Props} user - The user object containing user details.
 * @returns {JSX.Element} - Returns the JSX representation of the UserProjects component.
 */

import React, { FC, useState } from "react";
import NewProject, { ProjectForm } from "./NewProject";
import { guid } from "@/util";
import axios from "axios";
import style from "./UserProfile.module.css";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  projects: Project[];
  user: User;
};

// Define the UserProjects Function Component (FC)
const UserProjects: FC<Props> = ({ projects, user }) => {
  // State variables for managing project list and various UI states
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [createNew, setCreateNew] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<string>("");
  const [deleteProject, setDeleteProject] = useState<string>("");

  // Function to refresh the project list by making a GET request
  const refreshProjectList = async () => {
    const res = await axios.get(`/api/users/${user.id}/projects`);
    if (res.status === 200) {
      setProjectList(res.data);
    }
  };

  // Function to handle project deletion
  const handleDeleteProject = async (projectId: string) => {
    try {
      const res = await axios.delete(
        `/api/users/${user.id}/projects/${projectId}`
      );
      console.log(res.status);
      setDeleteProject("");
      await refreshProjectList();
    } catch (e) {
      console.error(e);
    }
  };

  // Function to handle project update
  const handleProjectUpdate = async (formValues: Project) => {
    try {
      const res = await axios.put(
        `/api/users/${user.id}/projects/${editProject}`,
        formValues
      );
      console.log(res.status);
      setEditProject("");
      await refreshProjectList();
    } catch (e) {
      console.error(e);
    }
  };

  // Function to handle form submission for creating a new project
  const onSubmit = async (formValues: ProjectForm) => {
    console.log(formValues);
    const newId = guid();
    const newProject: Project = {
      id: newId,
      ...formValues,
      author: user.name || user.id,
      authorId: user.id,
      rating: 0,
      numberOfReviews: 0,
      reviews: [],
      links: [],
    };
    try {
      const res = await axios.post(
        `/api/users/${user.id}/projects/${newId}`,
        newProject
      );
      console.log(res.status);
      setCreateNew(false);
      await refreshProjectList();
    } catch (e) {
      console.error(e);
    }
  };

  // Return the JSX representation of the UserProjects component
  return (
    <>
      <div className={`${createNew ? "" : style["new-project-button"]}`}>
        {createNew ? (
          <NewProject
            onCancel={() => setCreateNew(false)}
            onSubmit={onSubmit}
          />
        ) : (
          <button
            onClick={() => setCreateNew(true)}
            className={`btn btn-primary `}
          >
            New
          </button>
        )}
      </div>
      <div>
        <div style={{ marginTop: "10px" }}>
          <ul className="list-group">
            {projectList.map((project) => {
              return (
                <li
                  key={`user-project-${project.id}`}
                  className="list-group-item"
                >
                  {editProject === project.id ? (
                    <>
                      {/* Render form for editing existing project */}
                      <NewProject
                        values={project}
                        onSubmit={(formValues) =>
                          handleProjectUpdate({ ...project, ...formValues })
                        }
                        onCancel={() => setEditProject("")}
                      />
                    </>
                  ) : (
                    /* Render existing projects in list format */
                    <div className={style["user-project-list-item"]}>
                      <div className={style["user-project-list-item-col"]}>
                        {project.name}
                      </div>
                      <div className={style["user-project-list-item-col"]}>
                        Rating: {project.rating}
                      </div>
                      <div className={style["user-project-list-item-col"]}>
                        {project.reviews.length} Reviews
                      </div>
                      <div className={style["x-icon"]}>
                        <div className={style["x-icon-edit"]}>
                          {/* Edit icon */}
                          <i
                            className="bi bi-pencil"
                            onClick={() => setEditProject(project.id)}
                          ></i>
                        </div>

                        {deleteProject === project.id ? (
                          /* If delete confirmation is active, show confirmation icons */
                          <div className={style["delete-prompt-icons"]}>
                            <div className={style["delete-icon-confirm"]}>
                              {/* Confirm delete icon */}
                              <i
                                className="bi bi-check"
                                onClick={() => handleDeleteProject(project.id)}
                              ></i>
                            </div>
                            <div className={style["delete-icon-cancel"]}>
                              {/* Cancel delete icon */}
                              <i
                                className="bi bi-x"
                                onClick={() => setDeleteProject("")}
                              ></i>
                            </div>
                          </div>
                        ) : (
                          /* If delete confirmation is not active, show delete icon */
                          <div className={style["x-icon-delete"]}>
                            {" "}
                            {/* Delete icon */}
                            <i
                              className="bi bi-trash"
                              onClick={() => setDeleteProject(project.id)}
                            ></i>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

// Export the UserProjects Function Component (FC) as the default export
export default UserProjects;
