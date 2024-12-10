'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getUserPosts } from '../../../api/postData';
import PostCard from '../../../components/PostCard';

function UserProfilePage() {
  const { user } = useAuth(); // Retrieve logged-in user from auth context
  const [userPosts, setUserPosts] = useState([]);

  // Fetch user's posts on initial load
  useEffect(() => {
    if (user?.uid) {
      getUserPosts(user.uid).then(setUserPosts);
    }
  }, [user?.uid]);

  return (
    <div className="container my-4">
      {/* User's Posts Section */}
      <div className="user-posts">
        <h2 className="text-center mb-3">Your Posts</h2>
        <div className="d-flex flex-wrap justify-content-center">{userPosts.length > 0 ? userPosts.map((post) => <PostCard key={post.firebaseKey} postObj={post} onUpdate={() => getUserPosts(user.uid).then(setUserPosts)} />) : <p className="text-center">You have not submitted any posts yet.</p>}</div>
      </div>
    </div>
  );
}

export default UserProfilePage;
