import {NavBar, NavBarLogged} from "../components/TopBar";

function Profile({name, email, picture, reload}) {
    return (
      <div className={"profile"}>
          <img src={picture} alt={"profile pic"} width={150}/>
          <h1>{name}'s Profile</h1>
          <h3>Contact me: {email}</h3>
      </div>
    );
}

export function ProfilePage({user, reload}) {

    async function handleSignOut() {
        const res = await fetch("/api/login", {method: "DELETE"});
        if (!res.ok) {
            throw new Error(`Failed to POST ${res.status}: ${res.statusText}`);
        }
        window.location.href="/"
        console.log(name)
    }
    const {name, email, picture} = user?.google

    if (user?.google !== undefined){
        return (
            <div>
                <NavBarLogged/>
                <div>
                    <Profile name={name}
                             email={email}
                             picture={picture}
                             reload={reload}/>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            </div>);
    }else {
        return (
            <div>
                <NavBar/>
                <div>
                    <Profile name={name}
                             email={email}
                             picture={picture}
                             reload={reload}/>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            </div>
        );
    }
}