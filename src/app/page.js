'use client';

// Ensure the component works as a client component
import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/postData';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]); // State to store posts

  // Fetch all posts
  const getAllPosts = () => {
    getPosts().then(setPosts); // Fetch all posts without filtering by uid
  };

  useEffect(() => {
    getAllPosts(); // Fetch posts on component mount
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-center">
        {posts.map((Posts) => (
          <PostCard key={Posts.firebaseKey} postObj={Posts} onUpdate={getAllPosts} />
        ))}
      </div>
    </div>
  );
}

export default Home;
