// Import the required module from the 'mongodb' package
import { MongoClient } from "mongodb";

// Check if the MONGODB_URI environment variable is missing or invalid
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

// Retrieve the MongoDB URI from the environment variable
const uri = process.env.MONGODB_URI;

// Define options for the MongoDB client (currently an empty object)
const options = {};

// Declare variables for the MongoDB client and a promise that resolves to the connected client
let client;
let clientPromise: Promise<MongoClient>;

// Create a new instance of the MongoClient using the URI and options
client = new MongoClient(uri, options);

// Establish a connection to the MongoDB database and assign the promise to clientPromise
clientPromise = client.connect();

// Export the promise representing the connected MongoDB client for use in other parts of the application
export default clientPromise;
