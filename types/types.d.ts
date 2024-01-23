type User = {
  id: string;
  name: string;
  email: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  author: string;
  authorId: string;
  rating: number | null;
  numberOfReviews: number;
  links: ProjectLink[];
  reviews: ProjectReviews[];
};

type ProjectLink = {
  type: "github" | "repo" | "live";
  url: string;
};

type ProjectReviews = {
  author: string;
  authorId: string;
  text: string;
  rating: number;
};
