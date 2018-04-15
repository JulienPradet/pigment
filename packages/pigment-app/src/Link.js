import React from "react";
import { RouterContext } from "./Router";

const Link = ({ to, as, children }) => {
  return (
    <RouterContext.Consumer>
      {({ push, preload }) => (
        <a
          href={to}
          onMouseEnter={() => preload(as)}
          onClick={event => {
            event.preventDefault();
            push(to, as || to);
          }}
        >
          {children}
        </a>
      )}
    </RouterContext.Consumer>
  );
};

export default Link;
