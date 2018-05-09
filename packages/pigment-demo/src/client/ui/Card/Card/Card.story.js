import React from "react";
import storiesOf from "@pigment/styleguide/src/addStory";
import Card from "./Card";

storiesOf(module, "ui/Card/Card").add("default", () => <Card>Content</Card>);
