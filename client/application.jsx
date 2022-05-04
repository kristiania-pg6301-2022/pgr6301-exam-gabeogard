import * as React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {FrontPage} from "./pages/frontPage";
import {ProfilePage} from "./pages/profilePage";
import {LoginPage} from "./pages/loginPage";
import {NewsArticles} from "./pages/newsArticles";

export const Application = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />}/>
                <Route path={"/news"} element={<NewsArticles/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/profile"} element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}