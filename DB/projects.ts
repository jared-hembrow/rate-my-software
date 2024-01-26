// Import necessary types and modules from the 'mongodb' package
import { Collection, Document, FindCursor, MongoClient, WithId } from "mongodb";

// Function to get the project collection from the MongoDB client
export function getProjectCollection(
  client: MongoClient
): Collection<Document> {
  // Retrieve the database name from the environment variable
  const database = client.db(process.env.DATABASE);

  // Get the 'projects' collection from the database
  const col = database.collection("projects");

  // Return the collection
  return col;
}

// Async function to retrieve a project by its ID from the collection
export async function getProject(
  col: Collection<Document>,
  projectId: string
): Promise<Project | null> {
  // Check if projectId is missing
  if (!projectId) return null;

  try {
    // Find a project in the collection with the specified ID
    const project = await col.findOne({ id: projectId });

    // If the project does not exist, return null
    if (!project) return project;

    // Transform the MongoDB document to a Project object
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
    // Handle errors and return null
    console.log("Error: ", e);
    return null;
  }
}

// Async function to retrieve all projects from the collection, optionally filtered by userId
export async function getAllProjects(
  col: Collection<Document>,
  userId?: string
): Promise<Project[] | null> {
  try {
    // Perform the find operation, optionally filtering by userId
    let cursor: FindCursor<WithId<Document>>;
    if (!userId) {
      cursor = col.find();
    } else {
      cursor = col.find({ authorId: userId });
    }

    // Convert the cursor to an array of documents
    const projects = await cursor.toArray();
    console.log("projects query: ", projects);

    // If no projects found, return null
    if (!projects) return projects;

    // Transform MongoDB documents to an array of Project objects
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

    // Return the array of projects
    return builtProjectsList;
  } catch (e) {
    // Handle errors and return null
    console.log("Error: ", e);
    return null;
  }
}

// Async function to create a new project in the collection
export async function createProject(
  col: Collection<Document>,
  project: Project
): Promise<boolean> {
  try {
    // Insert the new project into the collection
    const result = await col.insertOne(project);
    console.log("Insert project result: ", result.acknowledged);

    // Return whether the operation was acknowledged
    return result.acknowledged;
  } catch (e) {
    // Handle errors and return false
    console.log("Error: ", e);
    return false;
  }
}

// Async function to update an existing project in the collection
export async function updateProject(
  col: Collection<Document>,
  project: Project
): Promise<boolean> {
  try {
    // Define the filter based on the project's ID
    const filter = { id: project.id };

    // Define the update operation
    const update = {
      $set: project,
    };

    // Update the project in the collection
    const result = await col.updateOne(filter, update);
    console.log("Update project result: ", result.acknowledged);

    // Return whether the operation was acknowledged
    return result.acknowledged;
  } catch (e) {
    // Handle errors and return false
    console.log("Error: ", e);
    return false;
  }
}

// Async function to delete a project from the collection
export async function deleteProject(
  col: Collection<Document>,
  projectId: string
): Promise<boolean> {
  try {
    // Define the filter based on the project's ID
    const filter = { id: projectId };

    // Delete the project from the collection
    const result = await col.deleteOne(filter);
    console.log("Update project result: ", result.acknowledged);

    // Return whether the operation was acknowledged
    return result.acknowledged;
  } catch (e) {
    // Handle errors and return false
    console.log("Error: ", e);
    return false;
  }
}
