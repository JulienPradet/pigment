import React from "react";
import storiesOf from "@pigment/styleguide/src/addStory";
import TitledCard from "./TitledCard";

storiesOf(module, "ui/Card/TitledCard").add("default", () => (
  <TitledCard title="Title">Content</TitledCard>
));
