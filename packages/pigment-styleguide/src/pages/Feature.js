import React from "react";
import { css } from "react-emotion";
import StoriesContext from "../StoriesContext";
import layout from "./_minimalLayout";
import { DisplayOptionsProvider } from "../modules/DisplayOptions";
import "./_globalStyles";
import Measure from "../ui/Measure";
import { lightBackground, white } from "../ui/colors";

const iframe = ({ width, height, zoom }, containerMeasure, iframeMeasure) => {
  let cssHeight;
  if (height === "auto") {
    cssHeight = `${100 * 100 / zoom}%`;
  } else if (
    containerMeasure &&
    containerMeasure.height < height * zoom / 100
  ) {
    cssHeight = `${containerMeasure.height * 100 / zoom}px`;
  } else {
    cssHeight = `${height}px`;
  }

  let cssWidth;
  if (width === "auto") {
    cssWidth = `${100 * 100 / zoom}%`;
  } else if (containerMeasure && containerMeasure.width < width * zoom / 100) {
    cssWidth = `${containerMeasure.width * 100 / zoom}px`;
  } else {
    cssWidth = `${width}px`;
  }

  return css`
    position: absolute;
    display: block;
    border: none;
    background: ${white};
    width: ${cssWidth};
    height: ${cssHeight};
    transform: scale(${zoom / 100});
    transform-origin: top left;
  `;
};

const container = measure => css`
  position: relative;
  background: ${lightBackground};
  height: ${measure ? `calc(100vh - ${measure.top}px)` : "auto"};
  overflow: auto;
`;

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
                {({ setRef: setContainerRef, measure: containerMeasure }) => (
                  <Measure>
                    {({ setRef: setIframeRef, measure: iframeMeasure }) => (
                      <div
                        ref={setContainerRef}
                        className={container(containerMeasure)}
                      >
                        <iframe
                          ref={setIframeRef}
                          className={iframe(
                            displayOptions,
                            containerMeasure,
                            iframeMeasure
                          )}
                          title={`Preview of "${story.name} - ${feature.name}"`}
                          src={feature.iframePath}
                        />
                      </div>
                    )}
                  </Measure>
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
