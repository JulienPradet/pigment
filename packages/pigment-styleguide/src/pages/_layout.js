import React from "react";
import Link from "../ui/Link";
import { css, injectGlobal } from "emotion";
import Navigation from "../modules/Navigation";
import * as colors from "../ui/colors";
import { RouterContext } from "pigment-app/src/Router";

injectGlobal`
  body {
    margin: 0;
    color: ${colors.dark};
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    line-height: 1.5;
  }
  * {
    color: inherit;
  }
  input, button, textarea {
    font-family: inherit;
    font-size: inherit;
  }
`;

const classes = {
  layout: css`
    display: flex;
    min-height: 100vh;
  `,
  nav: css`
    padding: 0;
    min-width: 30ch;
  `,
  content: css`
    width: 100%;
    background: ${colors.lightBackground};
    padding: 2rem;
  `,
  title: css`
    background: ${colors.primary};
    color: ${colors.dark};
    font-size: 2em;
    margin: 0;
    font-weight: 100;
    padding: 1em 0.5em 0;
    line-height: 2em;
  `
};

const StyleguideLayout = ({ children, ...rest }) => {
  return (
    <RouterContext.Consumer>
      {({ route }) => {
        const TitleComponent =
          route.pathname === "/_pigment/styleguide/" ? "h1" : "h2";

        return (
          <div className={classes.layout}>
            <div className={classes.nav}>
              <TitleComponent className={classes.title}>
                <Link type="ghost" to="/_pigment/styleguide/">
                  Pigment Store
                </Link>
              </TitleComponent>
              <Navigation />
            </div>
            <div className={classes.content}>{children}</div>
          </div>
        );
      }}
    </RouterContext.Consumer>
  );
};

export default StyleguideLayout;
