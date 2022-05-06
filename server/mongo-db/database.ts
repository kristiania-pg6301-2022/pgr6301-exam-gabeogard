import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URL!);

mongoClient.connect().then(() => {
  console.log("Connected to Mongo DB");
});

export const getClient = () => mongoClient;
