import React from "react";
import PropTypes from "prop-types";
import AppLink from "pigment-app/src/Link";
import { css } from "react-emotion";
import * as colors from "../colors";

const classes = {
  default: css`
    color: ${colors.secondary};
    font-weight: bold;
  `,
  ghost: css`
    color: inherit;
    text-decoration: inherit;
  `
};

const Link = props => {
  const className = classes[props.type];
  return <AppLink {...props} className={className} />;
};

Link.propTypes = {
  ...AppLink.propTypes,
  type: PropTypes.oneOf(["default", "ghost"])
};
delete Link.propTypes.className;

Link.defaultProps = {
  type: "default"
};

export default Link;
