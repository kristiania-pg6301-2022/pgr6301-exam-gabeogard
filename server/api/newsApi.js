import express from "express";
import {createArticle, getArticles} from "../controllers/articleController.js";

export const NewsApi = () =>{
    const router = new express.Router()
    router.get("/", getArticles);

    router.post("/", createArticle);

    return router
}