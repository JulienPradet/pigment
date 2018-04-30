import React, { Component, createContext } from "react";
import Page from "./Page";
import FirstRouteQuery from "./FirstRouteQuery.gql";

export const toRoute = route => {
  if (typeof route === "string") {
    const searchParams = new URLSearchParams(route.replace(/^[^?]+/, ""));
    let params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return {
      pathname: route.replace(/\?.+/, ""),
      params: params
    };
  } else {
    return route;
  }
};

const getFirstRoute = (baseRoute, apolloClient) => {
  if (apolloClient) {
    return apolloClient
      .query({
        query: FirstRouteQuery,
        variables: { path: baseRoute.pathname }
      })
      .then(({ data }) => {
        const route = data.matchUrl
          ? { ...baseRoute, pathname: data.matchUrl.pagePath }
          : baseRoute;
        return route;
      });
  } else {
    return Promise.resolve(baseRoute);
  }
};

export const loadFirstRoute = (url, pages, apolloClient) => {
  return getFirstRoute(toRoute(url), apolloClient).then(route => {
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
    route.params
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
    const pathname = this.props.initialRoute.pathname;
    const search = new URLSearchParams(
      this.props.initialRoute.params
    ).toString();
    const url = search.length > 0 ? `${pathname}?${search}` : pathname;

    this.props.history.replaceState(
      {
        as: url
      },
      null,
      url
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
