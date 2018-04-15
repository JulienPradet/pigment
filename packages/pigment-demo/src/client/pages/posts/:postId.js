import React from "react";
import PostLayout from "../../layouts/PostLayout";
import Post from "../../modules/Post";

const PostPage = props => {
  return <Post id={props.params.postId} />;
};

PostPage.layout = PostLayout;

export default PostPage;
