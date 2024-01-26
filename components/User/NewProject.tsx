/**
 * React component for rendering a form to create a new project.
 * @param {Props} onCancel - Callback function to handle cancellation of the form.
 * @param {Props} onSubmit - Callback function to handle form submission.
 * @param {Props} values - Initial values for the form fields (optional).
 * @returns {JSX.Element} - Returns the JSX representation of the new project form.
 */

"use client";
import React, { FC, useState } from "react";
import style from "./UserProfile.module.css";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  onCancel: () => void;
  onSubmit: (formValues: ProjectForm) => void;
  values?: Project;
};

// Define the type for the form values
export type ProjectForm = {
  name: string;
  description: string;
  links: ProjectLink[];
};

// Define the NewProject Function Component (FC)
const NewProject: FC<Props> = ({ onCancel, onSubmit, values }) => {
  // State variables to manage form inputs
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

  // Function to handle form submission
  const handleSubmit = () => {
    if (!projectName || !description) return;

    // Create form values object
    const formValues: ProjectForm = {
      name: projectName,
      description,
      links: [],
    };

    // Add links to the form values if provided
    if (githubUrl) formValues.links.push({ type: "github", url: githubUrl });
    if (repoUrl) formValues.links.push({ type: "repo", url: repoUrl });
    if (liveUrl) formValues.links.push({ type: "live", url: liveUrl });

    // Call the onSubmit callback with the form values
    onSubmit(formValues);
  };

  // Return the JSX representation of the new project form
  return (
    <div className={style["new-project-form"]}>
      <div className={style["x-icon"]}>
        <i onClick={onCancel} className="bi bi-x-square"></i>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputtext" className="form-label">
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
          <label className="form-check-label" htmlFor="githubUrl">
            Github Repository URL
          </label>
          <input
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="Optional"
            type="text"
            className="form-control"
            id="githubUrl"
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label" htmlFor="repoUrl">
            Repository URL
          </label>
          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Optional"
            type="text"
            className="form-control"
            id="repoUrl"
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label" htmlFor="liveUrl">
            Live URL
          </label>
          <input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="Optional"
            type="text"
            className="form-control"
            id="liveUrl"
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

// Export the NewProject Function Component (FC) as the default export
export default NewProject;
