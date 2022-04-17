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
exports.fetchUser = exports.setupGoogle = exports.logIn = exports.signIn = exports.googleConfig = void 0;
const jsonHandler_1 = require("../misc/jsonHandler");
const dotenv_1 = __importDefault(require("dotenv"));
const node_fetch_1 = __importDefault(require("node-fetch"));
dotenv_1.default.config();
function googleConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const discovery_endpoint = process.env.GOOGLE_ENDPOINT;
        const client_id = process.env.GOOGLE_CLIENT_ID;
        console.log("Discovery endpoint is", discovery_endpoint);
        const { userinfo_endpoint, authorization_endpoint } = yield (0, jsonHandler_1.fetchJSON)(discovery_endpoint);
        return {
            response_type: "token",
            authorization_endpoint,
            scope: "profile email",
            userinfo_endpoint,
            client_id
        };
    });
}
exports.googleConfig = googleConfig;
function setupGoogle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            google: yield googleConfig(),
        };
        const { google_access_token } = req.signedCookies;
        if (google_access_token) {
            console.log("Config is", config);
            const user = yield fetchUser(google_access_token, config.google);
            return yield res.json(user);
        }
    });
}
exports.setupGoogle = setupGoogle;
const fetchUser = (access_token, config) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching user from", config.userinfo_endpoint);
    const userinfo = yield (0, node_fetch_1.default)(config.userinfo_endpoint, {
        headers: {
            Authorization: `Bearer ${access_token}`
        },
    });
    if (userinfo.ok) {
        return yield userinfo.json();
    }
    else {
        console.log(`Failed to fetch token: ${userinfo.status}`);
        throw new Error;
    }
});
exports.fetchUser = fetchUser;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { provider } = req.params;
        const { access_token } = req.body;
        if (res.ok) {
            res.cookie(`${provider}_access_token`, access_token, { signed: true });
            console.log(access_token);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(res.status);
        }
    });
}
exports.signIn = signIn;
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { access_token } = req.signedCookies;
        if (access_token) {
            /*
            const { userinfo_endpoint } = await fetchUser()
            //});
    
            res.json(userinfo);
            */
        }
        else {
            res.sendStatus(401);
        }
    });
}
exports.logIn = logIn;
