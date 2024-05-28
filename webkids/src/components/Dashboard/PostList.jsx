

import React from 'react';

function PostList({ posts, onDeletePost  }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.text}</p>
          {post.filePath && <img src={`http://localhost:5000/${post.filePath}`} alt="uploaded" />}
          <button onClick={() => onDeletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;