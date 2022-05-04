import express from 'express';
import * as path from "path";
import {fileURLToPath} from 'url';


const app = express()
const file = fileURLToPath(import.meta.url)
const directory = path.dirname(file)

app.use(express.static("../client/dist"))
app.use(express.static(path.resolve(directory, "..", "client", "dist")))

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server launched on http://localhost:${server.address().port}`)
})