import React, { Component } from "react";
import Router from "./Router";

class App extends Component {
  render() {
    return (
      <Router initialRoute={this.props.initialRoute} pages={this.props.pages} />
    );
  }
}

export default App;
