import React, { Component } from "react";
import stripIndent from "common-tags/es/stripIndent";
import Router from "./Router";

const makeApp = pages => {
  class App extends Component {
    render() {
      return (
        <Router initialRoute={this.props.initialRoute} pages={pages}>
          {({ params, page }) => {
            const Page = page.Component;
            let decorateWithLayout = Page.layout;

            if (typeof decorateWithLayout === "function") {
              if (
                process.env.NODE_ENV === "development" &&
                typeof decorateWithLayout.prototype.render === "function"
              ) {
                const currentFilePath = page.filePath;

                console.warn(stripIndent`
                  ${currentFilePath}
                  It seems that your page's layout is a React Component class.
                  A layout must be a function in order not to unmount the whole page when you navigate in your app.
                `);
                const Layout = decorateWithLayout;
                return (
                  <Layout>
                    <Page params={params} />
                  </Layout>
                );
              } else {
                return decorateWithLayout({
                  children: <Page params={params} />
                });
              }
            } else {
              return <Page params={params} />;
            }
          }}
        </Router>
      );
    }
  }

  return App;
};

export default makeApp;
