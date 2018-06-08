import React from "react";
import { RouterContext } from "./Router";

const Link = ({ className, to, as, children }) => {
  const isExternal =
    !/^#|^\.?\.?\//.test(to) && !to.startsWith(process.env.PUBLIC_URL);

  if (isExternal) {
    return (
      <a className={className} href={to}>
        {children}
      </a>
    );
  } else {
    return (
      <RouterContext.Consumer>
        {({ push, preload }) => (
          <a
            className={className}
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
  }
};

export default Link;
