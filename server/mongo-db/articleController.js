import {mongoClient} from "./database.js";

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

export {getArticles}