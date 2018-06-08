import React from "react";
import { css } from "react-emotion";
import * as colors from "../colors";

class Togglable extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpened: true
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    this.setState(({ isOpened }) => ({ isOpened: !isOpened }));
  }

  render() {
    return this.props.children(this.state.isOpened, this.onToggle);
  }
}

const classes = {
  title: css`
    display: flex;
  `,
  titleText: css`
    flex: 1;
  `,
  titleButton: css`
    margin-right: 1rem;
    margin-left: 1rem;

    button {
      background: none;
      border: none;
      color: ${colors.shade04};
      font-size: 1.5rem;
      vertical-align: middle;
      line-height: 1.6rem;
      height: 1.6rem;
      width: 2rem;
      text-align: center;

      &:hover,
      &:focus {
        color: ${colors.dark};
      }
      &:focus {
        border: 1px solid ${colors.dark};
        outline: none;
      }
    }
  `
};

Togglable.Title = props => (
  <span className={classes.title}>
    <span className={classes.titleText}>{props.children}</span>
    <span className={classes.titleButton}>
      <button onClick={props.onClick}>{props.toggleLabel}</button>
    </span>
  </span>
);

export default Togglable;
