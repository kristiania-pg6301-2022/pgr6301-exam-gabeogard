import * as React from 'react'
import {fetchJSON, postJSON} from "../misc/jsonHandler";

export const ArticleApiContext = React.createContext({
    async listArticles(){
        return await fetchJSON("/api/news")
    },
    async createArticle(article){
        return await postJSON("/api/news", article)
    }
})