import React from "react";
import storiesOf from "pigment-styleguide/src/addStory";
import CallToAction from "./CallToAction";

storiesOf(module, "ui/CallToAction").add("default", () => (
  <CallToAction>Content</CallToAction>
));
