import {NavBar, NavBarLogged} from "../components/TopBar";
import {useContext} from "react";
import {LoginApiContext} from "../apiContext/loginApiContext";
import {useLoading} from "../misc/useLoading";

export function FrontPage({user, reload}) {
    if (user?.google !== undefined){
        return (
            <div>
                <NavBarLogged/>
                <div>
                    <h1>Welcome</h1>
                </div>
            </div>
        );
    }else{
        return (
            <div>
                <NavBar/>
                <div>
                    <h1>Welcome</h1>
                </div>
            </div>
        );
    }
}