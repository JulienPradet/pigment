import React from "react";
import Query from "@pigment/app/src/Query";
import PostQuery from "./PostQuery.gql";

const Post = ({ id }) => {
  return (
    <Query query={PostQuery} variables={{ id: id }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error...</div>;

        return (
          <>
            <h1>{data.blog.post.title}</h1>
            <p>{data.blog.post.content}</p>
          </>
        );
      }}
    </Query>
  );
};

export default Post;
