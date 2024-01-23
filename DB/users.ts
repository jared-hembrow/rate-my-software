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
    if (!user) {
      await createUser(col, email);
      return getUser(col, email);
    }
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    } as User;
  } catch (e) {
    console.log("Error:", e);
    return null;
  }
}
export async function getUserById(col: Collection<Document>, id: string) {
  try {
    const user = await col.findOne({ _id: new ObjectId(id) });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    console.log("Error:", e);
    return null;
  }
}
export async function updateUser(
  col: Collection<Document>,
  update: { [key: string]: any }
): Promise<boolean> {
  try {
    const filter = { _id: new ObjectId(update.id) };
    if (update.id) {
      delete update.id;
    }
    console.log(filter, { $set: update });
    const result = await col.updateOne(filter, { $set: update });
    return result.acknowledged;
  } catch (e) {
    console.error("Error: ", e);
    return false;
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
