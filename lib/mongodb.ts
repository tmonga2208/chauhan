import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(global as any).mongoClientPromise) {
    client = new MongoClient(uri, options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).mongoClientPromise = client.connect();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clientPromise = (global as any).mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise; 