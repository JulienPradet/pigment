import React from "react";
import Button from "../Button";

export default ({ children }) => (
  <Button>
    {">>"} {children} {"<<"}
  </Button>
);
