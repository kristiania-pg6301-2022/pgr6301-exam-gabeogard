"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoClient = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoClient = new mongodb_1.MongoClient(process.env.MONGODB_URL || "mongodb+srv://dbUser:pass123@cluster0.wuvjr.mongodb.net/article-database?retryWrites=true&w=majority");
exports.mongoClient = mongoClient;
mongoClient.connect().then(() => {
    console.log("Connected to Mongo DB");
});
