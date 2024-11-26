import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostsByTag } from '../api/postData';
import PostCard from './PostCard';

function PostsByTag({ tagId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state -- fixes bug

  useEffect(() => {
    if (tagId) {
      setLoading(true); // Set loading to true before fetching
      getPostsByTag(tagId).then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setLoading(false); // Set loading to false after fetching
      });
    }
  }, [tagId]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return <div className="d-flex flex-wrap justify-content-center">{posts.length > 0 ? posts.map((post) => <PostCard key={post.firebaseKey} postObj={post} />) : <p>No posts found for {tagId}.</p>}</div>;
}

PostsByTag.propTypes = {
  tagId: PropTypes.string.isRequired,
};

export default PostsByTag;
