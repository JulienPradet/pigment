import React from "react";
import StyleguideLayout from "./StyleguideLayout";

const StoryRoute = ({ story }) => {
  return <div>{story.name}</div>;
};

StoryRoute.layout = StyleguideLayout;

export default StoryRoute;
