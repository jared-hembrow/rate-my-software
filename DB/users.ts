import { Collection, Document, MongoClient, ObjectId } from "mongodb";

export function getUserCollection(client: MongoClient): Collection<Document> {
  const database = client.db(process.env.DATABASE);
  const col = database.collection("users");
  return col;
}

export async function getUser(col: Collection<Document>, email: string) {
  if (!email) return null;
  try {
    const user = await col.findOne({ email });
    console.log("user", user);
    if (!user) {
      await createUser(col, email);
      return getUser(col, email);
    }
    console.log("returning user", user);
    return user;
  } catch (e) {
    console.log("Error:", e);
    return null;
  }
}
export async function getUserById(col: Collection<Document>, id: string) {
  try {
    const user = await col.findOne({ _id: new ObjectId(id) });
    console.log("user", user);
    if (!user) {
      return null;
    }
    console.log("returning user", user);
    return user;
  } catch (e) {
    console.log("Error:", e);
    return null;
  }
}

export async function createUser(col: Collection<Document>, email: string) {
  if (!email) {
    console.log("Email not present to create new user!!");
    throw new Error("Email not provided to create new user");
  }
  try {
    const newUser = {
      email,
      clans: [],
    };
    const result = await col.insertOne(newUser);
    console.log(`DB insert for email: ${email} result:`, result);
    if (result.acknowledged) return true;
    throw new Error("Failed to insert new error");
  } catch (e) {
    console.log("Error: ", e);
    throw new Error("Unable to create new user");
  }
}
