/**
 * React component for rendering a project card.
 * @param {Props} project - The project object containing details like name, description, author, rating, and number of reviews.
 * @returns {JSX.Element} - Returns the JSX representation of the project card.
 */

"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import style from "./Project.module.css";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  project: Project;
};

// Define the ProjectCard Function Component (FC)
const ProjectCard: FC<Props> = ({ project }) => {
  // State to manage whether to show full project description
  const [showLargeText, setShowLargeText] = useState<boolean>(false);

  // Function to render project description with "more" and "less" options
  const renderDescription = (description: string) => {
    if (description.length > 150) {
      if (showLargeText) {
        // Show full description with "less" option
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
      } else {
        // Show truncated description with "more" option
        return (
          <>
            <p className={style["card-body-text"]}>
              {description.substring(0, 150)}...
              <span
                onClick={() => setShowLargeText(true)}
                style={{ color: "blue" }}
              >
                more
              </span>
            </p>
          </>
        );
      }
    } else {
      // Show full description if it is within 150 characters
      return <p className={style["card-body-text"]}>{description}</p>;
    }
  };

  // Return the JSX representation of the project card
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
            Author: <cite title="Source Title">{project.author}</cite>
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

// Export the ProjectCard Function Component (FC) as the default export
export default ProjectCard;
