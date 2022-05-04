import * as React from 'react'
import {fetchJSON} from "../misc/jsonHandler";

export const ArticleApiContext = React.createContext({
    async listArticles(){
        return await fetchJSON("/api/news")
    }
})