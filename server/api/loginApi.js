import express from 'express';
import dotenv from 'dotenv';
import {fetchJSON} from "../misc/jsonHandler.js";
import {signIn, fetchUser, logIn, setupGoogle} from "../controllers/loginController.js";

dotenv.config()
console.log(process.env.GOOGLE_CLIENT_ID)

async function googleConfig(){
    const discovery_endpoint = "https://accounts.google.com/.well-known/openid-configuration"
    const client_id = "444571335000-kijl3jilasqv00c17cbg682m1cmtedo4.apps.googleusercontent.com"
    const {userinfo_endpoint, authorization_endpoint} = await fetchJSON(discovery_endpoint)
    return {
        response_type: "token",
        authorization_endpoint,
        scope: "profile email",
        userinfo_endpoint,
        client_id,
    }
}

async function realGoogleConfig(){
    const discovery_endpoint = (process.env.GOOGLE_ENDPOINT).toString()
    const client_id = (process.env.GOOGLE_CLIENT_ID).toString()
    const {userinfo_endpoint, authorization_endpoint} = await fetchJSON(discovery_endpoint)
    return {
        response_type: "token",
        authorization_endpoint,
        scope: "profile email",
        userinfo_endpoint,
        client_id,
    }
}

export function LoginApi(){

    const router = new express.Router();

    router.get("/", async (req, res) => {
        const config = {
            google: await realGoogleConfig(),
        };
        const response = { config, user: {} };

        const { google_access_token } = req.signedCookies;
        console.log({ google_access_token});
        console.log(config.google.client_id)
        if (google_access_token) {
            response.user.google = await fetchUser(
                google_access_token,
                config.google
            );
        }

        res.json(response);
    })


    router.delete("/", (req, res) => {
        res.clearCookie("google_access_token");
        res.sendStatus(200);
    });

    router.post("/:provider", (req, res) => {
        const { provider } = req.params;
        const { access_token } = req.body;
        res.cookie(`${provider}_access_token`, access_token, { signed: true });
        res.sendStatus(200);
    });
    return router;
}