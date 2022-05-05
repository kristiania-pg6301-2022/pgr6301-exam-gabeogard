import request from "supertest";
import express from "express";
import { createArticle } from "../controllers/articleController";
import { mongoClient } from "../mongo-db/database";

describe("Article API", () => {
  it("should be able to add article", async () => {
    mongoClient.db("test-database").collection("articles");
    createArticle();
  });
});
