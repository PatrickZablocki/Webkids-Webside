import React from "react";
import postlist from "./postlist.module.css";

function PostList({ posts, onDeletePost }) {
  return (
    <div className={postlist.postList}>
      {posts.map((post) => (
        <div key={post._id} className={postlist.container}>
          <p className={postlist.content}>{post.text}</p>
          {post.filePath && (
            <img
              src={`http://localhost:5000/${post.filePath}`}
              alt="uploaded"
              className={postlist.image}
            />
          )}
          <button onClick={() => onDeletePost(post._id)}>Löschen</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;
