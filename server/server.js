<<<<<<< Updated upstream
<<<<<<< Updated upstream
import express from 'express';
import * as path from "path";
import {fileURLToPath} from 'url';
import {NewsApi} from "./api/newsApi.js";
import dotenv from "dotenv";
import {LoginApi} from "./api/loginApi.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config()


const app = express()
const file = fileURLToPath(import.meta.url)
const directory = path.dirname(file)
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static("../client/dist"))
app.use(express.static(path.resolve(directory, "..", "client", "dist")))

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
})

app.use("/api/news", NewsApi())
app.use("/api/login", LoginApi())

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server launched on http://localhost:${server.address().port}`)
    console.log(process.env.GOOGLE_CLIENT_ID)
=======
=======
>>>>>>> Stashed changes
import express from 'express';
import * as path from "path";
import {fileURLToPath} from 'url';
import {NewsApi} from "./api/newsApi";
import dotenv from "dotenv";
import {LoginApi} from "./api/loginApi";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config()


const app = express()
//const file = fileURLToPath(path.join("http://", __dirname, __filename))
//const directory = path.dirname(file)
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static("../client/dist"))
//app.use(express.static(path.resolve(__dirname, "..", "client", "dist")))

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
})

app.use("/api/news", NewsApi())
app.use("/api/login", LoginApi())

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server launched on http://localhost:${server.address().port}`)
    console.log(process.env.GOOGLE_CLIENT_ID)
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
})