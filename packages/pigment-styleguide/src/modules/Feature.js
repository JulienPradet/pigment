import React from "react";
import Link from "@pigment/app/src/Link";

const Feature = ({ feature }) => {
  return (
    <div>
      <Link to={feature.path}>{feature.name}</Link>
      {feature.render()}
    </div>
  );
};

export default Feature;
