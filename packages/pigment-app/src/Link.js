import React from "react";
import { RouterContext } from "./Router";

const Link = ({ to, children }) => {
  return (
    <RouterContext.Consumer>
      {({ push }) => (
        <a
          href={to}
          onClick={event => {
            event.preventDefault();
            push(to);
          }}
        >
          {children}
        </a>
      )}
    </RouterContext.Consumer>
  );
};

export default Link;
