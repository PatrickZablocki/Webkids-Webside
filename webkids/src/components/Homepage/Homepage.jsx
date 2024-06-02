import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import home from './home.module.css'
import Navbar from '../Navbar'


export default function Dashboard() {
    const [posts, setPosts] = useState([]);


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


    useEffect(() => {
        fetchPosts();
    }, []);


    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };


    const deletePost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('There was an error deleting the post!', error);
        }
    };


    return (
        <>
           <div className={home.body}>
           <div className={home.main} >
                <PostForm onNewPost={addNewPost} />
                <PostList posts={posts} onDeletePost={deletePost} />
                {/* <InputGroup className={dash.main} >
                    <Button variant="primary">Add Photo/Video</Button>
                    <Form.Control
                        placeholder="What's on your mind?"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />


                    
                    <Button variant="outline-secondary" id="button-addon2">
                        Post
                    </Button>
                </InputGroup> */}
            </div>
           </div>
        </>
    )
}
