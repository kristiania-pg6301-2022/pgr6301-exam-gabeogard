import * as React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {FrontPage} from "./pages/frontPage";
import {ProfilePage} from "./pages/profilePage";
import {LoginPage} from "./pages/loginPage";
import {NewsArticles} from "./pages/newsArticles";
import {useContext} from "react";
import {useLoading} from "./misc/useLoading";
import {LoginApiContext} from "./apiContext/loginApiContext";

export const Application = () => {
    const {fetchLogin, endSession, registerLogin} = useContext(LoginApiContext)
    const {data, error, loading, reload} = useLoading(fetchLogin);

    if(error){
        return <div>Error: {error.toString()}</div>
    }
    if (loading) {
        return <div>Please wait...</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage user={data?.user} reload={reload} />}/>
                <Route path={"/news"} element={<NewsArticles user={data?.user}/>}/>
                <Route path={"/login/*"} element={<LoginPage config={data?.config} reload={reload}/>}/>
                <Route path={"/profile"} element={<ProfilePage user={data?.user} />}/>
            </Routes>
        </BrowserRouter>
    );

}