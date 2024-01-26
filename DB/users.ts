// Import necessary types and modules from the 'mongodb' package
import { Collection, Document, MongoClient, ObjectId } from "mongodb";

// Function to get the user collection from the MongoDB client
export function getUserCollection(client: MongoClient): Collection<Document> {
  // Retrieve the database name from the environment variable
  const database = client.db(process.env.DATABASE);

  // Get the 'users' collection from the database
  const col = database.collection("users");

  // Return the collection
  return col;
}

// Async function to retrieve a user by email from the collection
export async function getUser(col: Collection<Document>, email: string) {
  // Check if email is missing
  if (!email) return null;

  try {
    // Find a user in the collection with the specified email
    const user = await col.findOne({ email });

    // If the user does not exist, create a new user and retrieve it
    if (!user) {
      await createUser(col, email);
      return getUser(col, email);
    }

    // Transform the MongoDB document to a User object
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    } as User;
  } catch (e) {
    // Handle errors and return null
    console.log("Error:", e);
    return null;
  }
}

// Async function to retrieve a user by ID from the collection
export async function getUserById(col: Collection<Document>, id: string) {
  try {
    // Find a user in the collection with the specified ID
    const user = await col.findOne({ _id: new ObjectId(id) });

    // If the user does not exist, return null
    if (!user) {
      return null;
    }

    // Return the user document
    return user;
  } catch (e) {
    // Handle errors and return null
    console.log("Error:", e);
    return null;
  }
}

// Async function to update an existing user in the collection
export async function updateUser(
  col: Collection<Document>,
  update: { [key: string]: any }
): Promise<boolean> {
  try {
    // Define the filter based on the user's ID
    const filter = { _id: new ObjectId(update.id) };

    // If 'id' is present in the update, remove it to avoid unnecessary update
    if (update.id) {
      delete update.id;
    }

    // Perform the update operation
    const result = await col.updateOne(filter, { $set: update });

    // Return whether the operation was acknowledged
    return result.acknowledged;
  } catch (e) {
    // Handle errors and return false
    console.error("Error: ", e);
    return false;
  }
}

// Async function to create a new user in the collection
export async function createUser(col: Collection<Document>, email: string) {
  // Check if email is missing
  if (!email) {
    console.log("Email not present to create a new user!!");
    throw new Error("Email not provided to create a new user");
  }

  try {
    // Define the structure for a new user
    const newUser = {
      email,
      clans: [],
    };

    // Insert the new user into the collection
    const result = await col.insertOne(newUser);
    console.log(`DB insert for email: ${email} result:`, result);

    // If the insertion is successful, return true
    if (result.acknowledged) return true;

    // Throw an error if the insertion fails
    throw new Error("Failed to insert new user");
  } catch (e) {
    // Handle errors and throw an error
    console.log("Error: ", e);
    throw new Error("Unable to create a new user");
  }
}
