import React from "react";
import Link from "@pigment/app/src/Link";
import StoriesContext from "../StoriesContext";

const Nav = ({ stories }) => {
  return (
    <StoriesContext.Consumer>
      {stories => {
        let storiesArray = [];
        for (let story of stories.values()) {
          storiesArray.push(story);
        }

        return (
          <ul>
            {storiesArray.map(story => {
              return (
                <li key={story.id}>
                  <Link to={story.path}>{story.name}</Link>
                </li>
              );
            })}
          </ul>
        );
      }}
    </StoriesContext.Consumer>
  );
};

export default Nav;
