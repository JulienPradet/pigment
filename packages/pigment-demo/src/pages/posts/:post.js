import React from "react";
import PostLayout from "../../layouts/PostLayout";

const Post = props => {
  return <div>{props.params.post}</div>;
};

Post.layout = PostLayout;
export default Post;
