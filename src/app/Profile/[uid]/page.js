'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { SearchContext } from '@/utils/context/SearchContext';
import { getPosts } from '../../../api/postData';
import getUserFavorites from '../../../api/userData';
import PostCard from '../../../components/PostCard';

function UserProfilePage() {
  const { user } = useAuth();
  const { searchQuery } = useContext(SearchContext); // Access the global search query
  const [userPosts, setUserPosts] = useState([]); // All user posts
  const [favoritePosts, setFavoritePosts] = useState([]); // All favorite posts
  const [filteredUserPosts, setFilteredUserPosts] = useState([]); // Filtered user posts
  const [filteredFavoritePosts, setFilteredFavoritePosts] = useState([]); // Filtered favorite posts

  // Fetch all posts and user favorites on initial load
  useEffect(() => {
    if (user?.uid) {
      Promise.all([getPosts(), getUserFavorites(user.uid)]).then(([posts, favorites]) => {
        const userSpecificPosts = posts.filter((post) => post.uid === user.uid);
        const favoritePostIds = Object.keys(favorites).filter((key) => favorites[key]);
        const userSpecificFavorites = posts.filter((post) => favoritePostIds.includes(post.firebaseKey));

        setUserPosts(userSpecificPosts);
        setFavoritePosts(userSpecificFavorites);

        // Initialize filtered posts with all posts
        setFilteredUserPosts(userSpecificPosts);
        setFilteredFavoritePosts(userSpecificFavorites);
      });
    }
  }, [user?.uid]);

  // Filter posts dynamically as the search query changes
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    setFilteredUserPosts(userPosts.filter((post) => post.title.toLowerCase().includes(lowerCaseQuery) || post.content.toLowerCase().includes(lowerCaseQuery)));

    setFilteredFavoritePosts(favoritePosts.filter((post) => post.title.toLowerCase().includes(lowerCaseQuery) || post.content.toLowerCase().includes(lowerCaseQuery)));
  }, [searchQuery, userPosts, favoritePosts]);

  const refreshPosts = () => {
    if (user?.uid) {
      Promise.all([getPosts(), getUserFavorites(user.uid)]).then(([posts, favorites]) => {
        const userSpecificPosts = posts.filter((post) => post.uid === user.uid);
        const favoritePostIds = Object.keys(favorites).filter((key) => favorites[key]);
        const userSpecificFavorites = posts.filter((post) => favoritePostIds.includes(post.firebaseKey));

        setUserPosts(userSpecificPosts);
        setFavoritePosts(userSpecificFavorites);

        // Reset filtered posts
        setFilteredUserPosts(userSpecificPosts);
        setFilteredFavoritePosts(userSpecificFavorites);
      });
    }
  };

  return (
    <div className="container my-4">
      {/* Favorites Section */}
      <div className="favorite-posts">
        <h2 className="text-center mb-3">Favorites</h2>
        <div className="d-flex flex-wrap justify-content-center">{filteredFavoritePosts.length > 0 ? filteredFavoritePosts.map((post) => <PostCard key={post.firebaseKey} postObj={post} onUpdate={refreshPosts} />) : <p className="text-center">{searchQuery.trim() ? `No favorite posts found for "${searchQuery}".` : 'You have not favorited any posts yet.'}</p>}</div>
      </div>

      <hr className="my-5" />

      {/* User's Posts Section */}
      <div className="user-posts">
        <h2 className="text-center mb-3">Your Posts</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {filteredUserPosts.length > 0 ? (
            filteredUserPosts.map((post) => (
              <PostCard
                key={post.firebaseKey}
                postObj={post}
                onUpdate={refreshPosts}
                isUserProfile // Pass this prop to enable edit/delete buttons
              />
            ))
          ) : (
            <p className="text-center">{searchQuery.trim() ? `No posts found for "${searchQuery}".` : 'You have not submitted any posts yet.'}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
