import React from 'react';
import postlist from './postlist.module.css'

function PostList({ posts, onDeletePost}) {
  return (

    <div className="post-list">
    {posts.map((post) => (
      <div key={post._id} className={postlist.container} >
        <p className={postlist.content} >{post.text}</p>
        {post.filePath && (
          <img src={`http://localhost:5000/${post.filePath}`} alt="uploaded" className="post-image" />
        )}
        <button onClick={() => onDeletePost(post._id)}>Delete</button>
      </div>
    ))}
  </div>
  );
}

export default PostList;