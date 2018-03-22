import React from "react";

const Document = ({ scripts, children }) => {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts}
      </body>
    </html>
  );
};

export default Document;
