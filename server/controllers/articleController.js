import {mongoClient} from "../mongo-db/database.js";

async function getArticles(req, res){
    const movies = await mongoClient
        .db(process.env.MONGO_DATABASE)
        .collection("news-articles")
        .find()
        .map(({title, category, content, author}) =>
            ({title, category, content, author}))
        .limit(100)
        .toArray()
    return res.json(movies);
}

async function createArticle(req, res){
    const {title, category, content, author} = req.body
    await mongoClient
        .db(process.env.MONGO_DATABASE)
        .collection("news-articles")
        .insertOne({title, category, content, author});
    res.sendStatus(200);
    }

export {getArticles, createArticle}