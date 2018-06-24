import { css } from "react-emotion";
import React from "react";
import { lightBackground } from "../colors";
const inputClass = css`
  width: 5em;
  text-align: right;
  padding: 0.5em 0 0.5em 0.5em;
  margin: 0 0.5em;
  background: none;
  border: 0;
  font-size: inherit;
  font-family: inherit;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: ${lightBackground};
  }
  &[disabled] {
    background: ${lightBackground};
  }
`;

const Input = props => {
  return <input {...props} className={inputClass} />;
};

export default Input;
