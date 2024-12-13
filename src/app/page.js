'use client';

import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../utils/context/SearchContext';
import { getPosts } from '../api/postData';
import PostCard from '../components/PostCard';
import '../styles/globals.css';

function Home() {
  const { searchQuery } = useContext(SearchContext); // Access the global search query
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = () => {
    getPosts().then((allPosts) => {
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="home-background">
      <div className="container mt-4">
        <div className="d-flex flex-wrap justify-content-center">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.firebaseKey}
              postObj={post}
              onUpdate={fetchPosts}
              customClass="home-card" // Add a custom class for home page cards
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
