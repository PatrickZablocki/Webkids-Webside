import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import home from "./home.module.css";
import post from "../../../Backend/models/post";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "components/ExampleCarouselImage";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:5000/api/posts");
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
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <>
      <Carousel slide={false}>
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Second slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Third slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className={home.body}>
        <div className={home.main}>
          <PostForm onNewPost={handleNewPost} />
          <PostList posts={posts} onDeletePost={handleDeletePost} />
        </div>
      </div>

      <Carousel slide={false}>
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Second slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Third slide" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
