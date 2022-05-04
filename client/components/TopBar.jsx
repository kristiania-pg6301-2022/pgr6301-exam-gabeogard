import {Link} from "react-router-dom";

export const NavBar = () => {
  return (
      <ul id={"nav-bar"}>
        <li className={"nav-links"}><Link to={"/"}>Home</Link></li>
        <li className={"nav-links"}><Link to={"/news"}>News</Link></li>
        <li className={"nav-links"}><Link to={"/login"}>Log in</Link></li>
        <li className={"nav-links-profile"}><Link to={"/profile"}>Profile</Link></li>
      </ul>
  );
}