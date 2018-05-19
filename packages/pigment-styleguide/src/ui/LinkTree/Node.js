import React from "react";
import { css } from "emotion";

class Node extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <li
        className={css`
          display: block;
          color: #999;
        `}
      >
        {children}
      </li>
    );
  }
}

export default Node;
