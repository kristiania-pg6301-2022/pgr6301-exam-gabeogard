<<<<<<< Updated upstream
<<<<<<< Updated upstream
import {MongoClient} from "mongodb";
import dotenv from "dotenv"

dotenv.config();

export const mongoClient = new MongoClient(process.env.MONGODB_URL)

mongoClient.connect().then(() => {
    console.log("Connected to Mongo DB");
});

=======
=======
>>>>>>> Stashed changes
import {MongoClient} from "mongodb";
import dotenv from "dotenv"

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URL || "mongodb+srv://dbUser:pass123@cluster0.wuvjr.mongodb.net/article-database?retryWrites=true&w=majority")

mongoClient.connect().then(() => {
    console.log("Connected to Mongo DB");
});

<<<<<<< Updated upstream
export {mongoClient};
>>>>>>> Stashed changes
=======
export {mongoClient};
>>>>>>> Stashed changes