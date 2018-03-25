import React, { Component } from "react";
import Router from "./Router";
import Page from "./Page";

const makeApp = pages => {
  class App extends Component {
    render() {
      return (
        <Router initialRoute={this.props.initialRoute} pages={pages}>
          {({ params, page }) => {
            return <Page page={page} params={params} />;
          }}
        </Router>
      );
    }
  }

  return App;
};

export default makeApp;
