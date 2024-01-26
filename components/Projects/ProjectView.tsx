"use client";
import React, { FC } from "react";
import style from "./Project.module.css";
import Link from "next/link";
import ProjectWriteReview from "./ProjectWriteReview";
type Props = {
  project: Project;
  usersOwnProject: boolean;
};

const ProjectView: FC<Props> = ({ project, usersOwnProject }) => {
  const renderLinks = () => {
    if (!project.links) return null;
    return project.links.map((link) => {
      return (
        <Link className={style["link"]} href={link.url}>
          {handleLinkTypes(link.type)}
        </Link>
      );
    });
  };
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

  const renderReviews = () => {
    return project.reviews.map((rev) => {
      return (
        <div className={style["review-card"]}>
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
  const onSubmit = (formValues: { rating: number; comment: string }) => {
    console.log("Submision ", formValues);
    // TODO submit form to API
  };
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

export default ProjectView;
