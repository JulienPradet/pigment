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
    align-items: center;
  `,
  titleText: css`
    flex: 1;
  `,
  titleButton: css`
    margin-right: 0;

    button {
      cursor: pointer;
      background: none;
      border: 1px solid transparent;
      color: ${colors.shade04};

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
    <span className={classes.titleButton}>
      <button onClick={props.onClick}>{props.toggleLabel}</button>
    </span>
    <span className={classes.titleText}>{props.children}</span>
  </span>
);

export default Togglable;
