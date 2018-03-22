import React from "react";
import Header from "../modules/Header";
import Footer from "../modules/Footer";
import PostList from "../modules/Posts/PostList";

const DefaultLayout = ({ children }) => (
  <div>
    <Header />
    <hr />
    <PostList />
    {this.props.children}
    <hr />
    <Footer />
  </div>
);

export default DefaultLayout;
