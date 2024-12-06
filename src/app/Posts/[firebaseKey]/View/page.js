'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPostByFirebaseKey } from '@/api/postData';
import { getCommentsByPostId, createComment, updateComment, deleteComment } from '../../../../api/commentData';
import CommentBox from '../../../../components/CommentBox';

function ViewPostPage() {
  const { firebaseKey } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (firebaseKey) {
      getPostByFirebaseKey(firebaseKey).then(setPost);
      getCommentsByPostId(firebaseKey).then(setComments);
    }
  }, [firebaseKey]);

  const handleCreateComment = (newComment) => {
    createComment(newComment).then((createdComment) => {
      setComments((prevComments) => [...prevComments, createdComment]); // Update comments with the new comment
    });
  };

  const handleEditComment = (updatedComment) => {
    updateComment(updatedComment).then(() => {
      getCommentsByPostId(firebaseKey).then(setComments);
    });
  };

  const handleDeleteComment = (comment) => {
    deleteComment(comment.firebaseKey).then(() => {
      setComments((prevComments) => prevComments.filter((c) => c.firebaseKey !== comment.firebaseKey));
    });
  };

  return (
    <div className="view-post-page container">
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} className="img-fluid mb-3" />
          <p>{post.content}</p>
          <hr />
          <CommentBox postId={firebaseKey} comments={comments} onCreateComment={handleCreateComment} onEditComment={handleEditComment} onDeleteComment={handleDeleteComment} />
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default ViewPostPage;
