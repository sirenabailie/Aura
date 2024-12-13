'use client';

import React, { useState } from 'react';
import { Modal, Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../utils/context/authContext';

function CommentBox({ postId, comments, onCreateComment, onEditComment, onDeleteComment }) {
  const [newComment, setNewComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const [editComment, setEditComment] = useState(null); // State to track the comment being edited
  const [editedContent, setEditedContent] = useState(''); // State for the updated content

  const handleCreateComment = async () => {
    const commentPayload = {
      postId,
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      uid: user?.uid,
    };

    try {
      await onCreateComment(commentPayload);
      setNewComment('');
    } catch {
      // Handle any potential errors silently
    }
  };

  const handleEdit = (comment) => {
    setEditComment(comment); // Set the comment being edited
    setEditedContent(comment.content); // Pre-fill with the current content
  };

  const handleSaveEdit = async () => {
    const updatedComment = { ...editComment, content: editedContent }; // Update the content
    try {
      await onEditComment(updatedComment); // Save the updated comment
      setEditComment(null); // Clear edit state
      setEditedContent(''); // Clear input field
    } catch {
      // Handle any potential errors silently
    }
  };

  const handleCancelEdit = () => {
    setEditComment(null); // Cancel edit mode
    setEditedContent('');
  };

  return (
    <div className="d-flex flex-column align-items-center comment-box">
      <div className="rec-btn-container" style={{ textAlign: 'center', marginTop: '0px' }}>
        <Button className="rec-btn" variant="outline-secondary" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faComment} size="lg" />
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">Recommendations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.firebaseKey || comment.timestamp} className="d-flex justify-content-between align-items-center">
                {editComment && editComment.firebaseKey === comment.firebaseKey ? (
                  <div className="w-100">
                    <InputGroup>
                      <FormControl value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                      <Button className="save-btn" onClick={handleSaveEdit}>
                        Save
                      </Button>
                      <Button className="cancel-btn" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </InputGroup>
                  </div>
                ) : (
                  <>
                    <div>
                      <span role="img" aria-label="user-icon">
                        <FontAwesomeIcon icon={faComment} size="sm" />
                      </span>{' '}
                      {comment.content || 'No content provided'}
                    </div>
                    <div>
                      {user?.uid === comment.uid && (
                        <>
                          <Button className="comment-btn" onClick={() => handleEdit(comment)}>
                            <FontAwesomeIcon icon={faEdit} size="sm" />
                          </Button>
                          <Button className="comment-btn" onClick={() => onDeleteComment(comment)}>
                            <FontAwesomeIcon icon={faTrashCan} size="sm" />
                          </Button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <InputGroup className="mt-3">
            <FormControl placeholder="Add your recommendation..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <Button
              className={`submit-btn ${!newComment.trim() ? 'placeholder' : ''}`} // Add 'placeholder' class if input is empty
              onClick={handleCreateComment}
              disabled={!newComment.trim()} // Disable button if input is empty
            >
              Submit
            </Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

CommentBox.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string,
      postId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      uid: PropTypes.string,
    }),
  ).isRequired,
  onCreateComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentBox;
