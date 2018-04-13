import React, { Component } from "react";
import stripIndent from "common-tags/lib/stripIndent";

class Page extends Component {
  constructor(props) {
    super();
    this.state = {
      Component: props.page.getComponent(),
      loadingNextPage: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      const Component = nextProps.page.getComponent();
      if (Component) {
        this.setState({ Component, loadingNextPage: false });
      } else {
        this.setState({
          loadingNextPage: true
        });
        nextProps.page.loadComponent().then(Component => {
          this.setState({ Component, loadingNextPage: false });
        });
      }
    }
  }

  render() {
    const { page, params } = this.props;
    const Component = this.state.Component;
    const loadingNextPage = this.state.loadingNextPage;
    let decorateWithLayout = Component.layout;

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
          <Layout loadingNextPage={loadingNextPage}>
            <Component loadingNextPage={loadingNextPage} params={params} />
          </Layout>
        );
      } else {
        return decorateWithLayout({
          loadingNextPage: loadingNextPage,
          children: (
            <Component loadingNextPage={loadingNextPage} params={params} />
          )
        });
      }
    } else {
      return <Component loadingNextPage={loadingNextPage} params={params} />;
    }
  }
}

Page.preload = page => {
  page.loadComponent();
};

export default Page;
