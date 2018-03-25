import React from "react";
import DefaultLayout from "./DefaultLayout";
import PostList from "../modules/Posts/PostList";

const PostLayout = ({ children }) =>
  DefaultLayout({
    children: (
      <>
        <PostList />
        {children}
      </>
    )
  });

export default PostLayout;
