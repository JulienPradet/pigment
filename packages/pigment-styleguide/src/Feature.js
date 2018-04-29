import React from "react";

const Feature = ({ feature }) => {
  return (
    <div>
      {feature.name}
      {feature.render()}
    </div>
  );
};

export default Feature;
