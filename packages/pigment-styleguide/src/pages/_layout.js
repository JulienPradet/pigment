import React from "react";
import { css, injectGlobal } from "emotion";
import Navigation from "../modules/Navigation";

injectGlobal`
  body {
    margin: 0;
  }
`;

const layoutClass = css`
  display: flex;
  min-height: 100vh;
`;
const navClass = css`
  background: #e6edd2;
  padding: 1em;
`;
const contentClass = css`
  margin: 1em;
`;

const StyleguideLayout = ({ children }) => {
  return (
    <div className={layoutClass}>
      <div className={navClass}>
        <h1>Pigment Store</h1>
        <Navigation />
      </div>
      <div className={contentClass}>{children}</div>
    </div>
  );
};

export default StyleguideLayout;
