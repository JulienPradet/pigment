import React from "react";
import stripIndent from "common-tags/es/stripIndent";

const Page = ({ page, params }) => {
  const Component = page.Component;
  let decorateWithLayout = Component.layout;

  if (typeof decorateWithLayout === "function") {
    if (
      process.env.NODE_ENV === "development" &&
      typeof decorateWithLayout.prototype.render === "function"
    ) {
      const currentFilePath = page.filePath;

      console.warn(stripIndent`
        ${currentFilePath}
        It seems that your page's layout is a React Component class.
        A layout must be a function in order not to unmount the whole page when you navigate in your app.
      `);
      const Layout = decorateWithLayout;
      return (
        <Layout>
          <Component params={params} />
        </Layout>
      );
    } else {
      return decorateWithLayout({
        children: <Component params={params} />
      });
    }
  } else {
    return <Component params={params} />;
  }
};

export default Page;
