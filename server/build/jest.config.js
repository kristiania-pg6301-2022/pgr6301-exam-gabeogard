"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const presets_1 = require("ts-jest/presets");
exports.default = {
    preset: "@shelf/jest-mongodb",
    transform: presets_1.defaults.transform,
    setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
};
