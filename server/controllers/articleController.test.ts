import request from "supertest";
import express from "express";
import { getClient } from "../mongo-db/database";
import { createArticle, deleteArticle, getArticles } from "./articleController";

console.warn("getClientInsideTest", getClient());

describe("Article Controller", () => {
  it("should be able to add and retrieve all articles", async () => {
    const request = {
      title: "title",
      author: "author",
      category: "category",
      content: "content",
    };
    //console.log(getClient());
    createArticle(request);
    const list = await getArticles();
    expect(list).toContainEqual(request);
  });

  it("should be able to delete articles", async () => {
    const request = {
      title: "title",
      author: "author",
      category: "category",
      content: "content",
    };
    createArticle(request);
    const title = "title";
    deleteArticle({ title });
    const list = await getArticles();
    expect(list).toHaveLength(0);
  });
});
