import React from "react";
import StoriesContext from "../StoriesContext";
import layout from "./_layout";
import Link from "pigment-app/src/Link";

const Feature = ({ params }) => {
  return (
    <StoriesContext.Consumer>
      {stories => {
        const story = stories.get(params.story);
        const feature = story.features.get(params.feature);
        return (
          <div>
            <Link to={story.path}>Back to "{story.name}"</Link>
            {feature.render()}
          </div>
        );
      }}
    </StoriesContext.Consumer>
  );
};

Feature.layout = layout;

export default Feature;
