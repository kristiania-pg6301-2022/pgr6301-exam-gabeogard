import {fetchJSON} from "../misc/jsonHandler";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { stringify } from "ts-jest";

dotenv.config()

async function googleConfig(){
    const discovery_endpoint = process.env.GOOGLE_ENDPOINT!;
    const client_id = process.env.GOOGLE_CLIENT_ID!;
    
    console.log("Discovery endpoint is", discovery_endpoint);
    const {userinfo_endpoint, authorization_endpoint} = await fetchJSON<{
        userinfo_endpoint: string,
        authorization_endpoint: string,
    }>(discovery_endpoint);

    return {
        response_type: "token",
        authorization_endpoint,
        scope: "profile email",
        userinfo_endpoint,
        client_id
    }
}

async function setupGoogle(req, res){
    const config = {
        google: await googleConfig(),
    };
    const { google_access_token } = req.signedCookies;
    if (google_access_token) {
         console.log("Config is", config);
         const user = await fetchUser(
            google_access_token,
            config.google
        );
        return await res.json(user);
    }
}

interface User {
    google: {}
}

const fetchUser = async (access_token, config): Promise<User> => {
    console.log("Fetching user from", config.userinfo_endpoint);
    const userinfo = await fetch(config.userinfo_endpoint, {
        headers: {
            Authorization: `Bearer ${access_token}`
        },
    })

    if(userinfo.ok){
        return await userinfo.json() as Promise<User>
    } else {
        console.log(`Failed to fetch token: ${userinfo.status}`)
        throw new Error
    }
}

async function signIn(req, res) {
    const {provider} = req.params
    const {access_token} = req.body
    console.log("signIn", req, res);
    if(res.ok){
        res.cookie(`google_access_token`, access_token, {signed: true})
        console.log(access_token)
        res.sendStatus(200)
    }else{
        res.sendStatus(res.status)
    }
}

async function logIn(req, res){
    const { access_token } = req.signedCookies;
    const config = {google : await googleConfig()}
    if (access_token) {
        const { google } = await fetchUser(access_token, googleConfig)
        res.json(google);
    } else {
        res.sendStatus(401);
    }
}

export {googleConfig, signIn, logIn, setupGoogle, fetchUser}