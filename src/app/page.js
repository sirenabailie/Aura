'use client';

import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../utils/context/SearchContext';
import { getPosts } from '../api/postData';
import PostCard from '../components/PostCard';

function Home() {
  const { searchQuery } = useContext(SearchContext); // Access the global search query
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Function to fetch posts and update state
  const fetchPosts = () => {
    getPosts().then((allPosts) => {
      setPosts(allPosts);
      setFilteredPosts(allPosts); // Initialize filtered posts
    });
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  useEffect(() => {
    // Dynamically filter posts based on search query
    const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-center">
        {filteredPosts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} onUpdate={fetchPosts} />
        ))}
      </div>
    </div>
  );
}

export default Home;
