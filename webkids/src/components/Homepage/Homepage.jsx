import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import home from "./home.module.css";
import Carousel from "react-bootstrap/Carousel";
import Friends from "../Homepage/img/friend.jpg";
import Social from "../Homepage/img/social.jpg";
import Media from "../Homepage/img/media.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div className={home.body}>
      <div className={home.carousel}>
        <div className={home.first}>
          <Carousel>
            <Carousel.Item>
              <img src={Friends} alt="pic of Friends" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={Social} alt="pic of Social" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={Media} alt="pic of Media" />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className={home.main}>
          <PostForm onNewPost={handleNewPost} />
          <PostList posts={posts} onDeletePost={handleDeletePost} />
        </div>

        <div className={home.first}>
          <Carousel>
            <Carousel.Item interval={2000}>
              <img src={Friends} alt="pic of Friends" />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img src={Social} alt="pic of Social" />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img src={Media} alt="pic of Media" />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
