import React, { Component, createContext } from "react";

const toRoute = route => {
  if (typeof route === "string") {
    return { pathname: route };
  } else {
    return route;
  }
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
  }

  componentDidMount() {
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
      const pathname = window.location.pathname;
      const route = toRoute(pathname);
      this.setRoute(route);
    }
  }

  push(route) {
    route = toRoute(route);
    this.setRoute(route);
    window.history.pushState({}, null, route.pathname);
  }

  render() {
    const page = getPage(this.state.route, this.props.pages);
    const params = getParams(this.state.route, page);

    return (
      <RouterContext.Provider value={{ push: this.push }}>
        {this.props.children({ params, page })}
      </RouterContext.Provider>
    );
  }
}

export default Router;
