import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../api/postData'; // Fetch all posts and filter them by tag
import PostCard from './PostCard';

function PostsByTag({ tagId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (tagId) {
      setLoading(true); // Start loading state
      getPosts().then((allPosts) => {
        // Filter posts to include those that have the tagId in their tagId array
        const filteredPosts = allPosts.filter((post) => post.tagId?.includes(tagId));
        setPosts(filteredPosts);
        setLoading(false); // Stop loading state
      });
    }
  }, [tagId]);

  if (loading) {
    return <p> </p>;
  }

  return <div className="d-flex flex-wrap justify-content-center">{posts.length > 0 ? posts.map((post) => <PostCard key={post.firebaseKey} postObj={post} />) : <p>No posts found for the selected tag.</p>}</div>;
}

PostsByTag.propTypes = {
  tagId: PropTypes.string.isRequired,
};

export default PostsByTag;
