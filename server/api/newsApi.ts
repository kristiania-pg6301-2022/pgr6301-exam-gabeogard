import express from "express";

import {
  createArticle,
  getArticles,
  deleteArticle,
} from "../controllers/articleController";

export const newsApi = () => {
  const router = express.Router();
  router.get("/", (_req, res) => res.json(getArticles));

  router.post("/", createArticle);

  router.post("/delete", deleteArticle);

  return router;
};
