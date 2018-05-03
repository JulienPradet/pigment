import React from "react";
import Header from "../modules/Header";
import loadable from "loadable-components";
import { injectGlobal } from "emotion";

injectGlobal`
  body {
    margin: 0;
  }
`;

const LoadableFooter = loadable(() => import("../modules/Footer"), {
  LoadingComponent: () => <div>Loading...</div>
});

const DefaultLayout = props => {
  return (
    <div>
      <Header />
      <hr />
      {props.loadingNextPage ? "Loading..." : props.children}
      <hr />
      <LoadableFooter />
    </div>
  );
};

export default DefaultLayout;
