<<<<<<< Updated upstream
<<<<<<< Updated upstream
import {mongoClient} from "../mongo-db/database.js";

async function getArticles(req, res, mongoDb){
    const articles = await mongoClient
        .db(process.env.MONGO_DATABASE)
        .collection("news-articles")
        .find()
        .map(({title, category, content, author}) =>
            ({title, category, content, author}))
        .limit(100)
        .toArray()
    return res.json(articles);
}

async function createArticle(req, res, mongoDb){
    const {title, category, content, author} = req.body
    await mongoClient
        .db(process.env.MONGO_DATABASE)
        .collection("news-articles")
        .insertOne({title, category, content, author});
    res.sendStatus(200);
    }

    async function deleteArticle(req, res, mongoDb){
    const {title} = req.body
        const result = await mongoClient
            .db(process.env.MONGO_DATABASE)
            .collection("news-articles")
            .deleteOne({title: title})
        if(result.deletedCount === 1){
            console.log("Successfully deleted one article.")
            res.sendStatus(200)
        }else{
            console.log("Could not find an article with matching title.")
            res.sendStatus(res.status)
        }
    }

export {getArticles, createArticle, deleteArticle}
=======
=======
>>>>>>> Stashed changes
import {mongoClient} from "../mongo-db/database";

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

<<<<<<< Updated upstream
export {getArticles, createArticle}
>>>>>>> Stashed changes
=======
export {getArticles, createArticle}
>>>>>>> Stashed changes