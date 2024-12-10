'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getPosts } from '../../../api/postData';
import getUserFavorites from '../../../api/userData';
import PostCard from '../../../components/PostCard';

function UserProfilePage() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [favoritePosts, setFavoritePosts] = useState([]);

  // Fetch all posts and user favorites on initial load
  useEffect(() => {
    if (user?.uid) {
      Promise.all([getPosts(), getUserFavorites(user.uid)]).then(([posts, favorites]) => {
        setUserPosts(posts.filter((post) => post.uid === user.uid)); // Filter user's posts
        const favoritePostIds = Object.keys(favorites).filter((key) => favorites[key]); // Get favorited post IDs
        setFavoritePosts(posts.filter((post) => favoritePostIds.includes(post.firebaseKey))); // Match posts with favorited IDs
      });
    }
  }, [user?.uid]);

  const refreshPosts = () => {
    if (user?.uid) {
      Promise.all([getPosts(), getUserFavorites(user.uid)]).then(([posts, favorites]) => {
        setUserPosts(posts.filter((post) => post.uid === user.uid));
        const favoritePostIds = Object.keys(favorites).filter((key) => favorites[key]);
        setFavoritePosts(posts.filter((post) => favoritePostIds.includes(post.firebaseKey)));
      });
    }
  };

  return (
    <div className="container my-4">
      {/* Favorites Section */}
      <div className="favorite-posts">
        <h2 className="text-center mb-3">Favorites</h2>
        <div className="d-flex flex-wrap justify-content-center">{favoritePosts.length > 0 ? favoritePosts.map((post) => <PostCard key={post.firebaseKey} postObj={post} onUpdate={refreshPosts} />) : <p className="text-center">You have not favorited any posts yet.</p>}</div>
      </div>

      <hr className="my-5" />

      {/* User's Posts Section */}
      <div className="user-posts">
        <h2 className="text-center mb-3">Your Posts</h2>
        <div className="d-flex flex-wrap justify-content-center">{userPosts.length > 0 ? userPosts.map((post) => <PostCard key={post.firebaseKey} postObj={post} onUpdate={refreshPosts} />) : <p className="text-center">You have not submitted any posts yet.</p>}</div>
      </div>
    </div>
  );
}

export default UserProfilePage;
