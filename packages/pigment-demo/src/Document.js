import React from "react";

const Document = ({ scripts, children }) => {
  return (
    <html>
      <body>
        <div id="root">{children}</div>
        {scripts}
      </body>
    </html>
  );
};

export default Document;
