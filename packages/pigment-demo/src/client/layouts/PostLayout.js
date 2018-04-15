import React from "react";
import DefaultLayout from "./DefaultLayout";
import PostList from "../modules/Posts/PostList";

const PostLayout = ({ children, loadingNextPage }) =>
  DefaultLayout({
    loadingNextPage: false,
    children: (
      <>
        <PostList />
        {loadingNextPage ? <div>Loading...</div> : children}
      </>
    )
  });

export default PostLayout;
