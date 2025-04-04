import "./header.css";
const Header = () => {
  return (
    <ul>
      <li>
        <a className="active" href="/">
          Home
        </a>
      </li>
      <li>
        <a href="/users">Users</a>
      </li>
      <li>
        <a href="/products">Product</a>
      </li>
      <li>
        <a href="/">About</a>
      </li>
    </ul>
  );
};

export default Header;
