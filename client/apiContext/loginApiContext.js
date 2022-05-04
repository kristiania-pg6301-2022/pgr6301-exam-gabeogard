import * as React from 'react'
import {fetchJSON, postJSON} from "../misc/jsonHandler";

export const LoginApiContext = React.createContext({
    async fetchLogin(){
        return await fetchJSON("/api/login")
    },
    async registerLogin(provider, login) {
        return await postJSON(`/api/login/${provider}`, login)
    },
})