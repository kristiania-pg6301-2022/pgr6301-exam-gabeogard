jest.mock("./mongo-db/database", () => ({
  __esModule: true,
  getClient: () => mongoClient,
}));

process.env.GOOGLE_CLIENT_ID = "client_id";
process.env.COOKIE_SECRET = "cookieSecret";

import { MongoClient } from "mongodb";

let mongoClient: MongoClient;
beforeAll(async () => {
  mongoClient = await MongoClient.connect(global.__MONGO_URI__);
});

afterAll(async () => {
  await mongoClient.close();
});

const collectionsForCleanUp = ["news-articles"];

beforeEach(async () => {
  if (global.__MONGO_URI__) {
    await Promise.all(
      collectionsForCleanUp.map((collection) =>
        mongoClient.db().collection(collection).deleteMany({}),
      ),
    );
  }
});
