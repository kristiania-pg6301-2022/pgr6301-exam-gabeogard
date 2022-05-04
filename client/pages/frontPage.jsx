import {NavBar, NavBarLogged} from "../components/TopBar";

export function FrontPage({user}) {
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