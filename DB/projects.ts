import { Collection, Document, FindCursor, MongoClient, WithId } from "mongodb";

export function getProjectCollection(
  client: MongoClient
): Collection<Document> {
  const database = client.db(process.env.DATABASE);
  const col = database.collection("projects");
  return col;
}

export async function getProject(
  col: Collection<Document>,
  projectId: string
): Promise<Project | null> {
  if (!projectId) return null;
  try {
    const project = await col.findOne({ id: projectId });
    if (!project) return project;
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      author: project.author,
      authorId: project.authorId,
      rating: project.rating || 0,
      numberOfReviews: project.numberOfReviews || 0,
      links: project.links,
      reviews: project.reviews,
    } as Project;
  } catch (e) {
    console.log("Error: ", e);
    return null;
  }
}

export async function getAllProjects(
  col: Collection<Document>,
  userId?: string
): Promise<Project[] | null> {
  try {
    // Perform the find operation
    let cursor: FindCursor<WithId<Document>>;
    if (!userId) {
      cursor = col.find();
    } else {
      cursor = col.find({ authorId: userId });
    }
    // Convert the cursor to an array of documents
    const projects = await cursor.toArray();
    console.log("projects query: ", projects);
    if (!projects) return projects;
    const builtProjectsList: Project[] = [];
    projects.forEach((project) => {
      builtProjectsList.push({
        id: project.id,
        name: project.name,
        description: project.description,
        author: project.author,
        authorId: project.authorId,
        rating: project.rating || 0,
        numberOfReviews: project.numberOfReviews || 0,
        links: project.links,
        reviews: project.reviews,
      } as Project);
    });
    return builtProjectsList;
  } catch (e) {
    console.log("Error: ", e);
    return null;
  }
}
export async function createProject(
  col: Collection<Document>,
  project: Project
): Promise<boolean> {
  try {
    const result = await col.insertOne(project);
    console.log("Insert project result: ", result.acknowledged);
    return result.acknowledged;
  } catch (e) {
    console.log("Error: ", e);
    return false;
  }
}
export async function updateProject(
  col: Collection<Document>,
  project: Project
): Promise<boolean> {
  try {
    const filter = { id: project.id };
    const update = {
      $set: project,
    };
    const result = await col.updateOne(filter, update);
    console.log("Update project result: ", result.acknowledged);
    return result.acknowledged;
  } catch (e) {
    console.log("Error: ", e);
    return false;
  }
}
export async function deleteProject(
  col: Collection<Document>,
  projectId: string
): Promise<boolean> {
  try {
    const filter = { id: projectId };

    const result = await col.deleteOne(filter);
    console.log("Update project result: ", result.acknowledged);
    return result.acknowledged;
  } catch (e) {
    console.log("Error: ", e);
    return false;
  }
}
