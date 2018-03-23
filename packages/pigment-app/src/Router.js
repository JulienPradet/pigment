import React, { Component, createContext } from "react";

const toRoute = route => {
  if (typeof route === "string") {
    return { pathname: route };
  } else {
    return route;
  }
};

const getPage = (route, pages) => {
  const page = pages.find(page => page.pathname === route.pathname);
  if (page) {
    return page;
  } else {
    return pages.find(page => page.pathname === "/404");
  }
};

export const RouterContext = createContext("router");

class Router extends Component {
  constructor(props) {
    super();
    this.state = {
      page: getPage(props.initialRoute, props.pages)
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

  handlePopState(event) {
    if (event.isTrusted) {
      const pathname = window.location.pathname;
      this.setState({
        page: getPage(toRoute(pathname), this.props.pages)
      });
    }
  }

  push(route) {
    route = toRoute(route);
    window.history.pushState({}, null, route.pathname);
    this.setState({
      page: getPage(route, this.props.pages)
    });
  }

  render() {
    const page = this.state.page;
    return (
      <RouterContext.Provider value={{ push: this.push }}>
        {this.props.children(page)}
      </RouterContext.Provider>
    );
  }
}

export default Router;
