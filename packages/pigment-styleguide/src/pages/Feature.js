import React from "react";
import StoriesContext from "../StoriesContext";
import layout from "./_minimalLayout";
// import Link from "pigment-app/src/Link";
import { DisplayOptionsProvider } from "../modules/DisplayOptions";
import "./_globalStyles";
import Measure from "../ui/Measure";

const makeStyle = ({ width, height, zoom }, measure) => {
  const style = {
    display: "block",
    border: "none"
  };
  style.width = width === "auto" ? "100%" : width;
  style.height =
    height === "auto"
      ? measure
        ? `calc(100vh - ${measure.top}px)`
        : null
      : height;

  if (zoom !== "100") {
    style.transform = `scale(${zoom / 100})`;
    style.transformOrigin = "top left";
  }
  return style;
};

const Feature = ({ params }) => {
  return (
    <StoriesContext.Consumer>
      {stories => {
        const story = stories.get(params.story);
        const feature = story.features.get(params.feature);
        return (
          <DisplayOptionsProvider>
            {displayOptions => (
              <Measure>
                {({ setRef, measure }) => (
                  <>
                    <iframe
                      ref={setRef}
                      style={makeStyle(displayOptions, measure)}
                      title={`Preview of "${story.name} - ${feature.name}"`}
                      src={feature.iframePath}
                    />
                  </>
                )}
              </Measure>
            )}
          </DisplayOptionsProvider>
        );
      }}
    </StoriesContext.Consumer>
  );
};

Feature.layout = layout;

export default Feature;
