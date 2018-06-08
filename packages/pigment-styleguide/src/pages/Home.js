import React from "react";
import layout from "./_layout";
import Card from "../ui/Card";
import { H1 } from "../ui/Typography/Heading";

const Home = () => {
  return (
    <Card title={<H1>Welcome to your Styleguide</H1>}>
      <>
        <p>
          It will help you document, demo and develop your components for your
          Pigment App.
        </p>
        <p>
          Feel free to discover your components through the navigation menu on
          the left.
        </p>
      </>
    </Card>
  );
};

Home.layout = layout;

export default Home;
