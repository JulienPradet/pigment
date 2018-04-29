import React from "react";
import Nav from "../modules/Nav";

const StyleguideLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default StyleguideLayout;
