import React, { Component } from "react";
import stripIndent from "common-tags/es/stripIndent";

const makeApp = pages => {
  class App extends Component {
    render() {
      const path = this.props.history.location;
      const currentPage =
        pages.find(({ route }) => route === path) ||
        pages.find(({ route }) => route === "/404");

      const Page = currentPage.Component;
      let decorateWithLayout = Page.layout;

      if (typeof decorateWithLayout === "function") {
        if (
          process.env.NODE_ENV === "development" &&
          typeof decorateWithLayout.prototype.render === "function"
        ) {
          const currentFilePath = currentPage.filePath;

          console.warn(stripIndent`
            ${currentFilePath}
            It seems that your page's layout is a React Component class.
            A layout must be a function in order not to unmount the whole page when you navigate in your app.
          `);
          const Layout = decorateWithLayout;
          return (
            <Layout>
              <Page />
            </Layout>
          );
        } else {
          return decorateWithLayout({ children: <Page /> });
        }
      } else {
        return <Page />;
      }
    }
  }

  return App;
};

export default makeApp;
