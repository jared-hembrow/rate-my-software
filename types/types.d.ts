type User = {
  _id: string;
  name?: string;
  email?: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  author: string;
  rating: number | null;
  numberOfReviews: number;
};
