import React from "react";
import Link from "pigment-app/src/Link";
import Query from "pigment-app/src/Query";
import PostListQuery from "./PostListQuery.gql";

const PostList = () => {
  return (
    <div>
      <Query query={PostListQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <ul>
              {data.blog.posts.map(post => {
                return (
                  <li key={post.path}>
                    <Link to={post.path} as={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        }}
      </Query>
    </div>
  );
};

export default PostList;
