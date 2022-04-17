<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import * as React from 'react'
import {fetchJSON, postJSON} from "../misc/jsonHandler";

export const ArticleApiContext = React.createContext({
    async listArticles(){
        return await fetchJSON("/api/news")
    },
    async createArticle(article){
        return await postJSON("/api/news", article)
    },
    async deleteArticle(title){
        return await postJSON("/api/news/delete", title)
    }
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import * as React from 'react'
import {fetchJSON, postJSON} from "../misc/jsonHandler";

export const ArticleApiContext = React.createContext({
    async listArticles(){
        return await fetchJSON("/api/news")
    },
    async createArticle(article){
        return await postJSON("/api/news", article)
    }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
})