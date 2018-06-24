import React from "react";
import CardContainer from "../ui/Card/CardContainer";
import layout from "./_layout";

const StoryNotFound = () => {
  return (
    <CardContainer>
      Oops, the story you requested does not seem to exist.
    </CardContainer>
  );
};

StoryNotFound.layout = layout;

export default StoryNotFound;
