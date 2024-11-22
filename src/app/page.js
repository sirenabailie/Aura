'use client';

// Ensure the component works as a client component
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import getPosts from '../api/postData';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]); // State to store posts
  const { user } = useAuth(); // Fetch user data from the auth context

  // Function to fetch posts for the logged-in user
  const getAllPosts = () => {
    if (user?.uid) {
      getPosts(user.uid).then(setPosts);
    }
  };

  // Fetch posts when the component mounts or when the user changes
  useEffect(() => {
    getAllPosts();
  }, [user]);

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-center">
        {posts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
