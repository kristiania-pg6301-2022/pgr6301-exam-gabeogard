import express from "express";

import {createArticle, getArticles, deleteArticle} from "../controllers/articleController.js";

export const NewsApi = () =>{
    const router = new express.Router()
    router.get("/", getArticles);

    router.post("/", createArticle);

    router.post("/delete", deleteArticle);

    return router
}