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
exports.fetchJSON = exports.postJSON = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function postJSON(url, object) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Posting to URL", url);
        const res = yield (0, node_fetch_1.default)(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(object)
        });
        if (!res.ok) {
            throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
        }
    });
}
exports.postJSON = postJSON;
const fetchJSON = (url) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching from URL", url);
    const res = yield (0, node_fetch_1.default)(url);
    if (!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return res.json();
});
exports.fetchJSON = fetchJSON;
