import React from "react";
import { stories } from "./addStory";
import Nav from "./Nav";

const StyleguideLayout = ({ children }) => {
  return (
    <div>
      <Nav stories={stories} />
      {children}
    </div>
  );
};

export default StyleguideLayout;
