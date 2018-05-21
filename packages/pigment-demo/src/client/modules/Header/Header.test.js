import React from "react";
import ReactDOM from "react-dom/server";
import Header from "./";

describe("Header", () => {
  it('should render "Pigment.js"', () => {
    expect(ReactDOM.renderToString(<Header />)).toContain("Pigment.js");
  });
});
