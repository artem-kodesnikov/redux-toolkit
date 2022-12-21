import React, { useState } from "react";
import { deletePost, setLoader } from "../../features/postSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import classNames from "classnames";

type Props = {
  post: {
    body: string,
    id: number,
    title: string,
    userId: number,
  };
};


export const PostItem: React.FC<Props> = ({ post }) => {
  const { title, id } = post;
  const dispatch = useAppDispatch();
  const postIds = useAppSelector(state => state.posts.deletedPostIds);
  const handleClick = (id: number) => {
    dispatch(setLoader(id));
    dispatch(deletePost(id));
  };

  const [hover, setHover] = useState(false);
  console.log(postIds);

  return (
    <div 
      onClick={() => handleClick(id)}
      role='button'
      className={classNames('d-flex align-items-center justify-content-between p-2 m-2 h-15 bg-secondary bg-opacity-50',{'bg-opacity-100': hover})}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {title}
      {postIds.includes(id) && <h2  style={{fontSize: 12, color: 'red'}}>DELETING...</h2>}
    </div>
  );
};