import React from "react";
import { css } from "react-emotion";

const classes = {
  container: css`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background: #fff;
    padding: 0.5em;
    height: 6em;
    box-sizing: border-box;
    border-bottom: 2px solid #eee;
  `,
  group: css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #ece7f0;
    &:first-child {
      border-left: 0;
    }
  `
};

export const Container = ({ children }) => (
  <div className={classes.container}>{children}</div>
);
Container.displayName = "HorizontalMenu.Container";

export const Group = ({ children }) => (
  <div className={classes.group}>{children}</div>
);
Group.displayName = "HorizontalMenu.Group";
