import React, { Component } from "react";
import Router from "./Router";
import Page from "./Page";

class App extends Component {
  render() {
    return (
      <Router initialRoute={this.props.initialRoute} pages={this.props.pages}>
        {({ params, page }) => {
          return <Page page={page} params={params} />;
        }}
      </Router>
    );
  }
}

export default App;
