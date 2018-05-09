import React from "react";
import layout from "./_layout";

const Home = () => {
  return (
    <>
      <h1>Welcome to your Styleguide</h1>
      <p>
        It will help you document, demo and develop your components for your
        Pigment App.
      </p>
      <p>
        Feel free to discover your components through the navigation menu on the
        left.
      </p>
    </>
  );
};

Home.layout = layout;

export default Home;
