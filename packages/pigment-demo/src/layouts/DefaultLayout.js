import React from "react";
import Header from "../modules/Header";
import Footer from "../modules/Footer";

const DefaultLayout = props => {
  return (
    <div>
      <Header />
      <hr />
      {props.children}
      <hr />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
