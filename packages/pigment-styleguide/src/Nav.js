import React from "react";
import Link from "@pigment/app/src/Link";

const Nav = ({ stories }) => {
  let storiesArray = [];
  for (let story of stories.values()) {
    storiesArray.push(story);
  }

  return (
    <ul>
      {storiesArray.map(story => {
        return (
          <li key={story.id}>
            <Link to={story.id}>{story.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
