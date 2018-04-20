import React from "react";
import ProgressiveQuery from "@pigment/app/src/ProgressiveQuery";
import SmallPostQuery from "./SmallPostQuery.gql";
import PostQuery from "./PostQuery.gql";
import htmlToReact from "@pigment/app/src/htmlToReact";
import loadable from "loadable-components";

const RenderHtml = htmlToReact({
  counter: loadable(() => import("./Counter"), {
    LoadingComponent: () => <div>Loading...</div>
  })
});

const Post = ({ id }) => {
  return (
    <ProgressiveQuery
      smallQuery={SmallPostQuery}
      query={PostQuery}
      variables={{ id: id }}
    >
      {({ initialLoading, loading, error, data }) => {
        if (initialLoading) return <div>Loading...</div>;
        if (error) return <div>Error...</div>;

        return (
          <>
            <h1>{data.blog.post.title}</h1>
            {loading ? (
              <p>"Loading..."</p>
            ) : (
              <RenderHtml content={data.blog.post.content} />
            )}
          </>
        );
      }}
    </ProgressiveQuery>
  );
};

export default Post;
