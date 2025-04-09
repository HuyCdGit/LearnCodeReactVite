import { NavLink } from "react-router-dom";
import "./header.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
const Header = () => {
  const { user } = useContext(AuthContext);
  console.log(">>>> check data", { user });
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/users">Users</NavLink>
      </li>
      <li>
        <NavLink to="/books">Books</NavLink>
      </li>
    </ul>
  );
};

export default Header;
