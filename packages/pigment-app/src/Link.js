import React from "react";

const Link = ({ to, children }) => {
  return <a href={to}>{children}</a>;
};

export default Link;
