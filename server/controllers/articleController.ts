import { getClient } from "../mongo-db/database";

export const getArticles = async () =>
  await getClient()
    .db(process.env.MONGO_DATABASE)
    .collection("news-articles")
    .find()
    .map(({ title, category, content, author }) => ({
      title,
      category,
      content,
      author,
    }))
    .limit(100)
    .toArray();

interface CreateArticleRequest {
  title: string;
  category: string;
  content: string;
  author: string;
}

export const createArticle = async ({
  title,
  category,
  content,
  author,
}: CreateArticleRequest) =>
  await getClient()
    .db(process.env.MONGO_DATABASE)
    .collection("news-articles")
    .insertOne({ title, category, content, author });

export const deleteArticle = async ({ title }: { title: string }) => {
  const result = await getClient()
    .db(process.env.MONGO_DATABASE)
    .collection("news-articles")
    .deleteOne({ title: title });

  if (result.deletedCount === 1) {
    console.log("Successfully deleted one article.");
    return;
  } else {
    throw new Error("Could not find an article with matching title.");
  }
};
