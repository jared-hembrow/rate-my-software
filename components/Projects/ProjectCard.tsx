"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import style from "./Project.module.css";
type Props = {
  project: Project;
};

const ProjectCard: FC<Props> = ({ project }) => {
  const [showLargeText, setShowLargeText] = useState<boolean>(false);
  const renderDescription = (description: string) => {
    if (description.length > 150) {
      if (showLargeText) {
        return (
          <p className={style["card-body-text"]}>
            {description}{" "}
            <span
              onClick={() => setShowLargeText(false)}
              style={{ color: "blue" }}
            >
              less
            </span>
          </p>
        );
      }
      return (
        <>
          <p className={style["card-body-text"]}>
            {description.substring(0, 150)}...
            <span
              onClick={() => {
                console.log("click");
                setShowLargeText(true);
              }}
              style={{ color: "blue" }}
            >
              more
            </span>
          </p>
        </>
      );
    } else {
      return <p className={style["card-body-text"]}>{description}</p>;
    }
  };

  return (
    <div
      className={`card`}
      style={{
        minWidth: "200px",
        // margin: "5px"
      }}
    >
      <Link href={`/projects/${project.id}`} className={style["card-header"]}>
        <div className="card-header">{project.name}</div>
      </Link>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          {renderDescription(project.description)}
          <footer className="blockquote-footer">
            Author: <cite title="Source Title">Jared Adam Hembrow</cite>
          </footer>
        </blockquote>
      </div>
      <div className="card-footer">
        Rating: {!project.rating ? "NA reviews" : project.rating}{" "}
        {`(${project.numberOfReviews} reviews)`}
        {/* <small className="text-body-secondary">Last updated 3 mins ago</small> */}
      </div>
    </div>
  );
};

export default ProjectCard;
