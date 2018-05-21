import React from "react";
import Link from "pigment-app/src/Link";
import { css } from "emotion";

const headerContainer = css`
  background: #f0f0f0;
  padding: 1em;
`;

const Header = () => {
  return (
    <div className={headerContainer}>
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
