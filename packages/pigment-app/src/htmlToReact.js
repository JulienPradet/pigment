import React from "react";
import PropTypes from "prop-types";

const domToReact = require("html-react-parser/lib/dom-to-react");
const htmlToDOM = process.env.SERVER
  ? require("html-dom-parser/lib/html-to-dom-server")
  : require("html-dom-parser/lib/html-to-dom-client");
const domParserOptions = { decodeEntities: true };

const htmlToReact = components => {
  const loadableComponents = Object.keys(components).reduce(
    (loadableComponents, name) => ({
      ...loadableComponents,
      [name]: components[name]
    }),
    {}
  );

  const replace = domNode => {
    const componentName = Object.keys(loadableComponents).find(
      name => domNode.name === name
    );

    if (componentName) {
      const Component = loadableComponents[componentName];

      return (
        <Component
          {...domNode.attribs}
          children={domToReact(domNode.children, { replace })}
        />
      );
    } else {
      return null;
    }
  };

  const RenderHtml = ({ content }) =>
    domToReact(htmlToDOM(content, domParserOptions), { replace });

  RenderHtml.propTypes = {
    content: PropTypes.node.isRequired
  };

  return RenderHtml;
};

export default htmlToReact;
