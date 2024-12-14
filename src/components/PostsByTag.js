'use client';

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../api/postData';
import { SearchContext } from '../utils/context/SearchContext';
import PostCard from './PostCard';

function PostsByTag({ tagId }) {
  const { searchQuery } = useContext(SearchContext); // Access the global search query
  const [posts, setPosts] = useState([]); // All posts for the tag
  const [filteredPosts, setFilteredPosts] = useState([]); // Posts filtered by search query
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch posts by tag
  const getPostsByTag = () => {
    setLoading(true);
    getPosts().then((allPosts) => {
      const tagPosts = allPosts.filter((post) => post.tagId?.includes(tagId)); // Filter posts that match the current tag
      setPosts(tagPosts);
      setFilteredPosts(tagPosts); // Initially, display all posts for the tag
      setLoading(false);
    });
  };

  // Dynamically filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // Reset to all tag posts if search query is empty
    }
  }, [searchQuery, posts]);

  // Fetch posts when the component mounts
  useEffect(() => {
    getPostsByTag();
  }, [tagId]);

  // Determine the CSS class for the tag page
  const getTagPageClass = () => {
    switch (tagId) {
      case 'Movies':
        return 'tag-page-movies';
      case 'Shows':
        return 'tag-page-shows';
      case 'Books':
        return 'tag-page-books';
      case 'Music':
        return 'tag-page-music';
      case 'Podcasts':
        return 'tag-page-podcasts';
      default:
        return 'tag-page-default'; // Fallback class
    }
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className={getTagPageClass()}>
      <div className="d-flex flex-wrap justify-content-center">{filteredPosts.length > 0 ? filteredPosts.map((post) => <PostCard key={post.firebaseKey} postObj={post} />) : <p>No posts found for the selected tag.</p>}</div>
    </div>
  );
}

PostsByTag.propTypes = {
  tagId: PropTypes.string.isRequired,
};

export default PostsByTag;
