import React from "react";
import Feature from "./Feature";

const Features = ({ story }) => {
  const features = [];
  for (let feature of story.features.values()) {
    features.push(feature);
  }

  return (
    <div>
      {features.map(feature => (
        <Feature key={feature.name} feature={feature} />
      ))}
    </div>
  );
};

export default Features;
