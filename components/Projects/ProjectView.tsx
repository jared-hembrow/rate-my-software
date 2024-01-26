/**
 * React component for rendering the details view of a project, including description, reviews, and links.
 * @param {Props} project - The project object containing details like name, description, author, links, and reviews.
 * @param {boolean} usersOwnProject - A boolean indicating whether the current user owns the project.
 * @returns {JSX.Element} - Returns the JSX representation of the project details view.
 */

"use client";
import React, { FC } from "react";
import style from "./Project.module.css";
import Link from "next/link";
import ProjectWriteReview from "./ProjectWriteReview";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  project: Project;
  usersOwnProject: boolean;
};

// Define the ProjectView Function Component (FC)
const ProjectView: FC<Props> = ({ project, usersOwnProject }) => {
  // Function to render project links based on link types
  const renderLinks = () => {
    if (!project.links) return null;
    return project.links.map((link) => {
      return (
        <Link className={style["link"]} href={link.url} key={link.url}>
          {handleLinkTypes(link.type)}
        </Link>
      );
    });
  };

  // Function to handle different link types and display corresponding icons
  const handleLinkTypes = (link: string) => {
    switch (link) {
      case "github":
        return <i className={`bi bi-github ${style["link-icon"]}`}></i>;
      case "repo":
        return <i className={`bi bi-git ${style["link-icon"]}`}></i>;
      case "live":
        return <i className={`bi bi-globe ${style["link-icon"]}`}></i>;
      default:
        return <i className={`bi bi-box ${style["link-icon"]}`}></i>;
    }
  };

  // Function to render project reviews
  const renderReviews = () => {
    return project.reviews.map((rev, index) => {
      return (
        <div className={style["review-card"]} key={index}>
          <div className={style["review-card-header"]}>
            <div className={style["review-card-header-author"]}>
              {rev.author}
            </div>
            <div>Rating: {rev.rating}</div>
          </div>
          <div className={style["review-card-body"]}>{rev.text}</div>
        </div>
      );
    });
  };

  // Function to handle form submission for writing a project review
  const onSubmit = (formValues: { rating: number; comment: string }) => {
    console.log("Submission: ", formValues);
    // TODO: Submit form to API
  };

  // Return the JSX representation of the project details view
  return (
    <div className={style["project-container"]}>
      <div className={style["header"]}>
        <div>
          <Link className={style["header-nav-back"]} href="/projects">
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Link>
        </div>
        <div className={style["header-name"]}>{project.name}</div>
        <div className={style["header-author"]}>By {project.author}</div>
      </div>
      <div className={style["body"]}>
        <div className={style["body-description"]}>{project.description}</div>
        <hr />
        <h3>Reviews</h3>
        <div>
          {usersOwnProject ? null : <ProjectWriteReview onSubmit={onSubmit} />}
        </div>
        <div>{renderReviews()}</div>
      </div>

      <div className={style["footer"]}>
        <div>{renderLinks()}</div>
      </div>
    </div>
  );
};

// Export the ProjectView Function Component (FC) as the default export
export default ProjectView;
