import express from 'express';
import {signOut, setupGoogle, signIn} from "../controllers/loginController.js";

export function LoginApi(){

    const router = new express.Router();

    router.get("/", async (req, res) => {setupGoogle(req,res)})


    router.delete("/", (req, res) => {signOut(req,res)});

    router.post("/:provider", (req, res) => {signIn(req, res)});
    return router;
}