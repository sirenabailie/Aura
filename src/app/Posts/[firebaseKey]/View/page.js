'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Carousel from 'react-bootstrap/Carousel';
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
    <div className="view-page">
      <div className="container d-flex flex-column align-items-center" style={{ textAlign: 'center', minHeight: 'calc(100vh - 20px)', paddingBottom: '20px' }}>
        {post ? (
          <div className="move-content">
            <h1 style={{ marginBottom: '20px' }}>{post.title}</h1>
            {/* Carousel for multiple images */}
            {post.images && post.images.length > 0 ? (
              <Carousel interval={null} className="mb-3">
                {post.images.map((url) => (
                  <Carousel.Item key={url}>
                    <img
                      src={url}
                      alt="Slide"
                      className="d-block mx-auto"
                      style={{
                        width: '100%',
                        maxWidth: '300px',
                        height: '400px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available.</p>
            )}

            {/* Wrapping the elements below the carousel */}
            <div className="post-details" style={{ width: '100%', maxWidth: '600px', margin: '10px auto' }}>
              <p className="view-content" style={{ marginBottom: '20px', maxWidth: '700px' }}>
                {post.content}
              </p>
              <hr style={{ width: '100%', maxWidth: '600px', margin: '0px' }} />

              {/* Centering the CommentBox */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  marginTop: '10px',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CommentBox postId={firebaseKey} comments={comments} onCreateComment={handleCreateComment} onEditComment={handleEditComment} onDeleteComment={handleDeleteComment} />
              </div>
            </div>
          </div>
        ) : (
          <p>Loading post...</p>
        )}
      </div>
    </div>
  );
}

export default ViewPostPage;
