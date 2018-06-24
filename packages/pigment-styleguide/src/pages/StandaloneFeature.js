import React from "react";
import StoriesContext from "../StoriesContext";
import layout from "./_minimalLayout";

const StandaloneFeature = ({ params }) => {
  return (
    <StoriesContext.Consumer>
      {stories => {
        const story = stories.get(params.story);
        const feature = story.features.get(params.feature);
        return feature.render();
      }}
    </StoriesContext.Consumer>
  );
};

StandaloneFeature.layout = layout;

export default StandaloneFeature;
