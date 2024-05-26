import React, { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error('There was an error fetching the posts!', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.text}</p>
          {post.filePath && <img src={`http://localhost:5000/${post.filePath}`} alt="uploaded" />}
        </div>
      ))}
    </div>
  );
}

export default PostList;