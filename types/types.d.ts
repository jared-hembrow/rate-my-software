// Define the 'User' type representing user information
type User = {
  id: string; // Unique identifier for the user
  name: string; // User's name
  email: string; // User's email address
};

// Define the 'Project' type representing project information
type Project = {
  id: string; // Unique identifier for the project
  name: string; // Project name
  description: string; // Project description
  author: string; // Name of the project author
  authorId: string; // Unique identifier of the project author
  rating: number | null; // Project rating (can be null)
  numberOfReviews: number; // Number of reviews for the project
  links: ProjectLink[]; // Array of project links
  reviews: ProjectReviews[]; // Array of project reviews
};

// Define the 'ProjectLink' type representing a link associated with a project
type ProjectLink = {
  type: "github" | "repo" | "live"; // Type of the link (GitHub, Repository, Live)
  url: string; // URL associated with the link
};

// Define the 'ProjectReviews' type representing a review for a project
type ProjectReviews = {
  author: string; // Name of the review author
  authorId: string; // Unique identifier of the review author
  text: string; // Review text
  rating: number; // Rating given in the review
};
