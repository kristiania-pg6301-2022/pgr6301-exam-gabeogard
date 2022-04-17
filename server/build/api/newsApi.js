"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsApi = void 0;
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controllers/articleController");
const NewsApi = () => {
    const router = new express_1.default.Router();
    router.get("/", articleController_1.getArticles);
    router.post("/", articleController_1.createArticle);
    return router;
};
exports.NewsApi = NewsApi;
