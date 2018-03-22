import React from "react";
import Link from "@pigment/app/src/Link";

const PostList = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/posts/toto">Toto</Link>
        </li>
        <li>
          <Link to="/posts/tata">Tata</Link>
        </li>
      </ul>
    </div>
  );
};

export default PostList;
