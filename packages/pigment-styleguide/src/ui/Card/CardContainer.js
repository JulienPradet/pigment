import React from "react";
import { css } from "react-emotion";

const classes = {
  container: css`
    padding: 1em;
  `
};

const CardContainer = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default CardContainer;
