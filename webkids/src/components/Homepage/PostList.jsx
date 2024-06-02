import React from 'react';
import postlist from './postlist.module.css'

function PostList({ posts, onDeletePost  }) {
  return (
    <div>
      {posts.map((post) => (
        <div className={postlist.container} key={post._id}>
          <p className={postlist.content} >{post.text}</p>
          {/* {post.filePath && <img src={`http://localhost:5000/${post.filePath}`} alt="uploaded" />} */}
          <button onClick={() => onDeletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;