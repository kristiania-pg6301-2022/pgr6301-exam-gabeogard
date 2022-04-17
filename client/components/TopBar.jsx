import {Link} from "react-router-dom";

export const NavBar = () => {
  return (
      <ul id={"nav-bar"}>
        <li className={"nav-links"} key={"home"}><Link to={"/"}>Home</Link></li>
        <li className={"nav-links"} key={"news"}><Link to={"/news"}>News</Link></li>
        <li className={"nav-links-profile"  } key={"log in"}><Link to={"/login"}>Log in</Link></li>
      </ul>
  );
}

export const NavBarLogged = () => {
    return (
        <ul id={"nav-bar"}>
            <li className={"nav-links"} key={"home"}><Link to={"/"}>Home</Link></li>
            <li className={"nav-links"} key={"news"}><Link to={"/news"}>News</Link></li>
            <li className={"nav-links"} key={"write-article"}><Link to={"/news/publish"}>Write article</Link></li>
            <li className={"nav-links-profile"} key={"profile"}><Link to={"/profile"}>Profile</Link></li>
        </ul>
    );
}