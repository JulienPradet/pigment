import React from "react";
import { css } from "emotion";

const Root = ({ children }) => {
  return (
    <ul
      className={css`
        padding-left: 1rem;
      `}
    >
      {children}
    </ul>
  );
};

export default Root;
