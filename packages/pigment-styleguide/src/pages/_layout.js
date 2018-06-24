import React from "react";
import { css } from "react-emotion";
import * as colors from "../ui/colors";
import Link from "../ui/Link";
import Navigation from "../modules/Navigation";
import { RouterContext } from "pigment-app/src/Router";
import "./_globalStyles";

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
    padding: 1.5em 0.5em 0;
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
