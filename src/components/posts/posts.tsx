import React from "react";
import Button from 'react-bootstrap/Button';
import { PostItem } from "../postItem/postItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts, Post } from "../../features/postSlice";

export const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const { loading, error } = useAppSelector(state => state.posts);

  return (
    <>
      <Button 
        className="mb-3" 
        variant="warning"
        onClick={() => dispatch(getPosts())}
      >Get Posts</Button>
      {(loading && !posts) && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      {posts.map((post: Post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </>
  );
};