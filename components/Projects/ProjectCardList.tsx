/**
 * React component for rendering a list of project cards.
 * @param {Props} list - The list of projects to be displayed.
 * @returns {JSX.Element} - Returns the JSX representation of the list of project cards.
 */

import React, { FC } from "react";
import ProjectCard from "./ProjectCard";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  list: Project[];
};

// Define the ProjectCardList Function Component (FC)
const ProjectCardList: FC<Props> = ({ list }) => {
  return (
    <div className="card-group">
      {/* Map through the list of projects and render a ProjectCard for each */}
      {list.map((item) => (
        <ProjectCard project={item} key={item.id} />
      ))}
    </div>
  );
};

// Export the ProjectCardList Function Component (FC) as the default export
export default ProjectCardList;
