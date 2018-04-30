import React from "react";
import storiesOf from "@pigment/styleguide/src/addStory";
import Button from "./Button";

storiesOf(module, "ui/Button").add("default", () => {
  return <Button>Normal button</Button>;
});
