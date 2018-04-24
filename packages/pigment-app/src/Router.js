import React, { Component, createContext } from "react";
import Page from "./Page";
import FirstRouteQuery from "./FirstRouteQuery.gql";

export const toRoute = route => {
  if (typeof route === "string") {
    return { pathname: route };
  } else {
    return route;
  }
};

const getFirstRoute = (pathname, apolloClient) => {
  if (apolloClient) {
    return apolloClient
      .query({ query: FirstRouteQuery, variables: { path: pathname } })
      .then(({ data }) => {
        const route = toRoute(
          data.matchUrl ? data.matchUrl.pagePath : pathname
        );
        return route;
      });
  } else {
    return Promise.resolve(toRoute(pathname));
  }
};

export const loadFirstRoute = (pathname, pages, apolloClient) => {
  return getFirstRoute(pathname, apolloClient).then(route => {
    const page = getPage(route, pages);
    return page.loadComponent().then(() => route);
  });
};

const getPage = (route, pages) => {
  const page = pages.find(page => page.test.test(route.pathname));
  if (page) {
    return page;
  } else {
    return pages.find(page => page.test.test("/404"));
  }
};

const getParams = (route, page) => {
  const match = page.test.exec(route.pathname);
  return page.pathKeys.reduce(
    (params, { name }, key) => ({
      ...params,
      [name]: match[key + 1]
    }),
    {}
  );
};

export const RouterContext = createContext("router");

class Router extends Component {
  constructor(props) {
    super();
    this.state = {
      route: props.initialRoute
    };
    this.handlePopState = this.handlePopState.bind(this);
    this.push = this.push.bind(this);
    this.preload = this.preload.bind(this);
  }

  componentDidMount() {
    this.props.history.replaceState(
      { as: this.props.initialRoute.pathname },
      null,
      this.props.getLocation().pathname
    );

    window.addEventListener("popstate", this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePopState);
  }

  setRoute(route) {
    this.setState({
      route: route
    });
  }

  handlePopState(event) {
    if (event.isTrusted) {
      const pathname = event.state.as || this.props.getLocation().pathname;
      const route = toRoute(pathname);
      this.setRoute(route);
    }
  }

  push(to, as) {
    const route = toRoute(as);
    this.setRoute(route);
    this.props.history.pushState({ as }, null, to);
  }

  preload(route) {
    route = toRoute(route);
    const page = getPage(this.state.route, this.props.pages);
    Page.preload(page);
  }

  render() {
    const page = getPage(this.state.route, this.props.pages);
    const params = getParams(this.state.route, page);

    return (
      <RouterContext.Provider
        value={{ push: this.push, preload: this.preload }}
      >
        <Page params={params} page={page} />
      </RouterContext.Provider>
    );
  }
}

export default Router;
