import React, { Component } from "react";
import stripIndent from "common-tags/lib/stripIndent";

class Page extends Component {
  constructor(props) {
    super();
    this.state = {
      page: props.page,
      Component: props.page.getComponent(),
      params: props.params,
      loadingNextPage: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.page !== nextProps.page ||
      this.props.params !== nextProps.params
    ) {
      const Component = nextProps.page.getComponent();
      if (Component) {
        this.setState({
          page: nextProps.page,
          Component,
          params: nextProps.params,
          loadingNextPage: false
        });
      } else {
        this.setState({
          loadingNextPage: true
        });
        nextProps.page.loadComponent().then(Component => {
          this.setState({
            page: nextProps.page,
            Component,
            params: nextProps.params,
            loadingNextPage: false
          });
        });
      }
    }
  }

  render() {
    const page = this.state.page;
    const params = this.state.params;
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
