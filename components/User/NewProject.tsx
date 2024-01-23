"use client";
import React, { FC, useState } from "react";
import style from "./UserProfile.module.css";
type Props = {
  onCancel: () => void;
  onSubmit: (formValues: ProjectForm) => void;
  values?: Project;
};
export type ProjectForm = {
  name: string;
  description: string;
  links: ProjectLink[];
};
const NewProject: FC<Props> = ({ onCancel, onSubmit, values }) => {
  const [projectName, setProjectName] = useState<string>(
    values ? values.name : ""
  );
  const [description, setDescription] = useState<string>(
    values ? values.description : ""
  );
  const [githubUrl, setGithubUrl] = useState<string>(
    values
      ? values.links[values.links.findIndex((i) => i.type === "github")].url ||
          ""
      : ""
  );
  const [repoUrl, setRepoUrl] = useState<string>(
    values
      ? values.links[values.links.findIndex((i) => i.type === "repo")].url || ""
      : ""
  );
  const [liveUrl, setLiveUrl] = useState<string>(
    values
      ? values.links[values.links.findIndex((i) => i.type === "live")].url || ""
      : ""
  );
  const handleSubmit = () => {
    if (!projectName || !description) return;
    const formValues: ProjectForm = {
      name: projectName,
      description,
      links: [],
    };
    if (githubUrl) formValues.links.push({ type: "github", url: githubUrl });
    if (repoUrl) formValues.links.push({ type: "repo", url: repoUrl });
    if (liveUrl) formValues.links.push({ type: "live", url: liveUrl });
    onSubmit(formValues);
  };
  return (
    <div className={style["new-project-form"]}>
      <div className={style["x-icon"]}>
        <i onClick={onCancel} className="bi bi-x-square"></i>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputtext"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label" htmlFor="exampleCheck1">
            Github Repository URL
          </label>
          <input
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="Optional"
            type="text"
            className="form-control"
            id="exampleCheck1"
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label" htmlFor="exampleCheck1">
            Repository URL
          </label>
          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Optional"
            type="text"
            className="form-control"
            id="exampleCheck1"
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label" htmlFor="exampleCheck1">
            Live URL
          </label>
          <input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="Optional"
            type="text"
            className="form-control"
            id="exampleCheck1"
          />
        </div>
        <div className={style["new-project-submit-button"]}>
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProject;
