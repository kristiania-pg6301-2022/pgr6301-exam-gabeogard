import express, { Request, Response } from "express";

import {
  createArticle,
  getArticles,
  deleteArticle,
} from "../controllers/articleController";

export const newsApi = () => {
  const router = express.Router();
  router.get("/", async (req: Request, res: Response) => {
    const articles = await getArticles();
    console.log("articles", articles);
    return res.json(articles);
  });

  router.post(
    "/",
    async (req: Request, res: Response) =>
      await createArticle({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        author: req.body.author,
      }),
  );

  router.post(
    "/delete",
    async (req: Request, res: Response) =>
      await deleteArticle({ title: req.body.title }),
  );

  return router;
};
