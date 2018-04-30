import React from "react";

const Document = ({ style, scripts, children }) => {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </head>
      <body>
        <div id="root">{children}</div>
        {scripts}
      </body>
    </html>
  );
};

export default Document;
