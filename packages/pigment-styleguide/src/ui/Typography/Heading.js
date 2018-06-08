import React from "react";
import { css } from "react-emotion";

const classes = {
  h1: css`
    font-size: 1.5rem;
  `,
  h2: css`
    font-size: 1.2rem;
  `
};

export const H1 = ({ children }) => {
  return <h1 className={classes.h1}>{children}</h1>;
};

export const H2 = ({ children }) => {
  return <h2 className={classes.h2}>{children}</h2>;
};
