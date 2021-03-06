import React, { Component } from "react";
import Router from "./Router";
import { Provider as IsServerSideProvider } from "./IsServerSide";

class App extends Component {
  render() {
    return (
      <IsServerSideProvider>
        <Router
          initialRoute={this.props.initialRoute}
          pages={this.props.pages}
          getLocation={this.props.getLocation}
          history={this.props.history}
        />
      </IsServerSideProvider>
    );
  }
}

export default App;
