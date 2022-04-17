"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginApi = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonHandler_1 = require("../misc/jsonHandler");
const loginController_1 = require("../controllers/loginController");
dotenv_1.default.config();
console.log(process.env.GOOGLE_CLIENT_ID);
function googleConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const discovery_endpoint = "https://accounts.google.com/.well-known/openid-configuration";
        const client_id = "444571335000-kijl3jilasqv00c17cbg682m1cmtedo4.apps.googleusercontent.com";
        const { userinfo_endpoint, authorization_endpoint } = yield (0, jsonHandler_1.fetchJSON)(discovery_endpoint);
        return {
            response_type: "token",
            authorization_endpoint,
            scope: "profile email",
            userinfo_endpoint,
            client_id,
        };
    });
}
function realGoogleConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const discovery_endpoint = process.env.GOOGLE_ENDPOINT;
        const client_id = process.env.GOOGLE_CLIENT_ID;
        const { userinfo_endpoint, authorization_endpoint } = yield (0, jsonHandler_1.fetchJSON)(discovery_endpoint);
        return {
            response_type: "token",
            authorization_endpoint,
            scope: "profile email",
            userinfo_endpoint,
            client_id,
        };
    });
}
function LoginApi() {
    const router = new express_1.default.Router();
    router.get("/", loginController_1.fetchUser);
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
exports.LoginApi = LoginApi;
