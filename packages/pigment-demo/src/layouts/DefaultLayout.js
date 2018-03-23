import React from "react";
import Header from "../modules/Header";
import Footer from "../modules/Footer";

class DefaultLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <hr />
        {this.props.children}
        <hr />
        <Footer />
      </div>
    );
  }
}

export default DefaultLayout;
