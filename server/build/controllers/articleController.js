"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticle = exports.getArticles = void 0;
const database_1 = require("../mongo-db/database");
function getArticles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const movies = yield database_1.mongoClient
            .db(process.env.MONGO_DATABASE)
            .collection("news-articles")
            .find()
            .map(({ title, category, content, author }) => ({ title, category, content, author }))
            .limit(100)
            .toArray();
        return res.json(movies);
    });
}
exports.getArticles = getArticles;
function createArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, category, content, author } = req.body;
        yield database_1.mongoClient
            .db(process.env.MONGO_DATABASE)
            .collection("news-articles")
            .insertOne({ title, category, content, author });
        res.sendStatus(200);
    });
}
exports.createArticle = createArticle;
