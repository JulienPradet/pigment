import React from "react";

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

export default Togglable;
