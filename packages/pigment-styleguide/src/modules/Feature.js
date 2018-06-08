import React from "react";
import Link from "../ui/Link";
import Card from "../ui/Card";
import { H2 } from "../ui/Typography/Heading";

const Feature = ({ feature }) => {
  return (
    <Card
      title={
        <H2>
          <Link to={feature.path}>{feature.name}</Link>
        </H2>
      }
    >
      {feature.render()}
    </Card>
  );
};

export default Feature;
