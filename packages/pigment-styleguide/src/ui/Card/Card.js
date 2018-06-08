import React from "react";
import { css } from "react-emotion";
import * as colors from "../colors";

const classes = {
  container: css`
    background: ${colors.white};
    padding: 0;

    & + & {
      margin-top: 2rem;
    }
  `,
  title: css`
    padding: 1rem;
    > * {
      margin: 0;
    }
  `,
  content: css`
    padding: 1rem;
    border-top: 1px solid ${colors.lightBackground};

    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  `
};

const Card = ({ title, children }) => {
  return (
    <div className={classes.container}>
      {title && <div className={classes.title}>{title}</div>}

      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Card;
