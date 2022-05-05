import {MongoClient} from "mongodb";
import dotenv from "dotenv"

dotenv.config();

export const mongoClient = new MongoClient(process.env.MONGODB_URL)

mongoClient.connect().then(() => {
    console.log("Connected to Mongo DB");
});

