import { Component } from "react";

const getPage = (route, pages) => {
  const page = pages.find(page => page.pathname === route.pathname);
  if (page) {
    return page;
  } else {
    return pages.find(page => page.pathname === "/404");
  }
};

class Router extends Component {
  constructor(props) {
    super();
    this.state = {
      page: getPage(props.initialRoute, props.pages)
    };
  }

  render() {
    const page = this.state.page;
    return this.props.children(page);
  }
}

export default Router;
