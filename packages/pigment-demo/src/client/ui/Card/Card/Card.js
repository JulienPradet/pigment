import React from "react";
import { css } from "emotion";

const cardClass = css`
  box-shadow: 1px 3px 10px rgba(100, 100, 100, 0.3);
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;

  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
`;

const Card = ({ children }) => {
  return <div className={cardClass}>{children}</div>;
};

export default Card;
