import React, { Component } from "react";

const makeApp = pages => {
  class App extends Component {
    render() {
      const path = this.props.history.location;
      const currentPage = pages.find(({ route }) => route === path);
      const Page = currentPage.Component;
      return <Page />;
    }
  }

  return App;
};

export default makeApp;
