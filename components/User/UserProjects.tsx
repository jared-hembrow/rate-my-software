"use client";
import React, { FC, useState } from "react";
import NewProject, { ProjectForm } from "./NewProject";
import { guid } from "@/util";
import axios from "axios";
import style from "./UserProfile.module.css";
type Props = {
  projects: Project[];
  user: User;
};

const UserProjects: FC<Props> = ({ projects, user }) => {
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [createNew, setCreateNew] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<string>("");
  const [deleteProject, setDeleteProject] = useState<string>("");
  const refreshProjectList = async () => {
    const res = await axios.get(`/api/users/${user.id}/projects`);
    if (res.status === 200) {
      setProjectList(res.data);
    }
  };
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

  // POST Request API to create new project
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
  return (
    <>
      {" "}
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
                      <NewProject
                        values={project}
                        onSubmit={(formValues) =>
                          handleProjectUpdate({ ...project, ...formValues })
                        }
                        onCancel={() => setEditProject("")}
                      />
                    </>
                  ) : (
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
                          <i
                            className="bi bi-pencil"
                            onClick={() => setEditProject(project.id)}
                          ></i>
                        </div>

                        {deleteProject === project.id ? (
                          <div className={style["delete-prompt-icons"]}>
                            <div className={style["delete-icon-confirm"]}>
                              <i
                                className="bi bi-check"
                                onClick={() => handleDeleteProject(project.id)}
                              ></i>
                            </div>
                            <div className={style["delete-icon-cancel"]}>
                              <i
                                className="bi bi-x"
                                onClick={() => setDeleteProject("")}
                              ></i>
                            </div>
                          </div>
                        ) : (
                          <div className={style["x-icon-delete"]}>
                            {" "}
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

export default UserProjects;
