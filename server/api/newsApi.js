import express from "express";
import {getArticles} from "../mongo-db/articleController.js";

export const NewsApi = () =>{
    const router = new express.Router()
    router.get("/", getArticles);

    return router
}