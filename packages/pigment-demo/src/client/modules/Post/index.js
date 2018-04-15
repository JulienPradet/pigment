import React from "react";
import ProgressiveQuery from "@pigment/app/src/ProgressiveQuery";
import SmallPostQuery from "./SmallPostQuery.gql";
import PostQuery from "./PostQuery.gql";

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
            <p>{loading ? "Loading..." : data.blog.post.content}</p>
          </>
        );
      }}
    </ProgressiveQuery>
  );
};

export default Post;
