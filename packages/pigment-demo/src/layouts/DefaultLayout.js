import React from "react";
import Header from "../modules/Header";
import Footer from "../modules/Footer";

const DefaultLayout = ({ children }) => (
  <div>
    <Header />
    <hr />
    {this.props.children}
    <hr />
    <Footer />
  </div>
);

export default DefaultLayout;
