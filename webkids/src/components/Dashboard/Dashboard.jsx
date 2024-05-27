import dash from './dash.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from '../Navbar'


import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';



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


    return (
        <>
            <Navbar />
            <div className={dash.main} >
                <PostForm onNewPost={addNewPost} />
                <PostList posts={posts} />
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
        </>
    )
}
