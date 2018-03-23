import React from "react";
import Link from "@pigment/app/src/Link";

const Header = () => {
  return (
    <div>
      Pigment.js
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
