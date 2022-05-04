import {fetchJSON} from "../misc/jsonHandler.js";
import dotenv from "dotenv";
import fetch from "node-fetch";




dotenv.config()

async function googleConfig(){
    const discovery_endpoint = "https://accounts.google.com/.well-known/openid-configuration"
    const client_id = "444571335000-kijl3jilasqv00c17cbg682m1cmtedo4.apps.googleusercontent.com"
    const {userinfo_endpoint, authorization_endpoint} = await fetchJSON(discovery_endpoint)
    return {
        response_type: "token",
        authorization_endpoint,
        scope: "profile email",
        userinfo_endpoint,
        client_id
    }
}

async function googleConfigCall(){
    const discovery_endpoint = process.env.GOOGLE_ENDPOINT
    const client_id = process.env.GOOGLE_CLIENT_ID
    const {userinfo_endpoint, authorization_endpoint} = await fetchJSON(discovery_endpoint)
    return {
        response_type: "token",
        authorization_endpoint,
        scope: "profile email",
        userinfo_endpoint,
        client_id
    };
}

async function setupGoogle(req, res){
    const config = {
        google: await googleConfig(),
    };
    const response = { config, user: {} };
    const { google_access_token } = req.signedCookies;
    if (google_access_token) {
        response.user.google = await fetchUser(
            google_access_token,
            config.google
        );
    }
    await res.json(response);
}

async function fetchUser(access_token, config){
    const userinfo = await fetch(config.userinfo_endpoint, {
        headers: {
            Authorization: `Bearer ${access_token}`
        },
    })

    if(userinfo.ok){
        return await userinfo.json()
    } else {
        console.log(`Failed to fetch token: ${userinfo.status}`)
        return undefined
    }
}

async function signIn(req, res) {
    const {provider} = req.params
    const {access_token} = req.body
    if(res.ok){
        res.cookie(`${provider}_access_token`, access_token, {signed: true})
        console.log(access_token)
        res.sendStatus(200)
    }else{
        res.sendStatus(res.status)
    }
}

async function logIn(req, res){
    const { access_token } = req.signedCookies;
    if (access_token) {
        const { userinfo_endpoint } = await fetchJSON(
            "https://accounts.google.com/.well-known/openid-configuration"
        );

        const userinfo = await fetchJSON(userinfo_endpoint, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        res.json(userinfo);
    } else {
        res.sendStatus(401);
    }
}

export {googleConfig, signIn, logIn, setupGoogle, fetchUser}