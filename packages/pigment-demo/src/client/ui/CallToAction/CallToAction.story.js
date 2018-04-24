import React from "react";
import storiesOf from "@pigment/styleguide/src/addStory";
import CallToAction from "./CallToAction";

storiesOf(module, "ui/CallToAction").addStory("default", () => (
  <CallToAction>Content</CallToAction>
));
