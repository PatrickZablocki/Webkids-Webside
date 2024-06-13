import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import home from './home.module.css'

export default function Dashboard() {
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };



    return (
        <>
           <div className={home.body}>
           <div className={home.main} >
                <PostForm onNewPost={handleNewPost} />
                <PostList posts={posts} onDeletePost={handleDeletePost} />
            </div>
           </div>
        </>
    )
}
