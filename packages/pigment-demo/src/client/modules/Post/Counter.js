import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      counter: parseInt(props.start, 10)
    };
  }

  render() {
    return (
      <button
        onClick={() => this.setState(state => ({ counter: state.counter + 1 }))}
      >
        {this.state.counter}
      </button>
    );
  }
}

export default Counter;
