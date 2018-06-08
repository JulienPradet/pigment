import React from "react";
import Link from "../ui/Link";
import { css, injectGlobal } from "emotion";
import Navigation from "../modules/Navigation";
import * as colors from "../ui/colors";

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

const StyleguideLayout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.nav}>
        <h1 className={classes.title}>
          <Link type="ghost" to="/_pigment/styleguide/">
            Pigment Store
          </Link>
        </h1>
        <Navigation />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default StyleguideLayout;
