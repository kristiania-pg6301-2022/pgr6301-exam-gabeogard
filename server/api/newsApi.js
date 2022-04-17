<<<<<<< Updated upstream
import express from "express";

import {createArticle, getArticles, deleteArticle} from "../controllers/articleController.js";

export const NewsApi = () =>{
    const router = new express.Router()
    router.get("/", getArticles);

    router.post("/", createArticle);

    router.post("/delete", deleteArticle);

    return router
=======
import express from "express";
import {createArticle, getArticles} from "../controllers/articleController";

export const NewsApi = () =>{
    const router = new express.Router()
    router.get("/", getArticles);

    router.post("/", createArticle);

    return router
>>>>>>> Stashed changes
}