import React, { useState } from 'react';
import { Modal, Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
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
      // Handle any potential errors silently or display a user-friendly message if needed
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
      // Handle any potential errors silently or display a user-friendly message if needed
    }
  };

  const handleCancelEdit = () => {
    setEditComment(null); // Cancel edit mode
    setEditedContent('');
  };

  return (
    <div>
      <Button variant="outline-secondary" onClick={() => setShowModal(true)}>
        Show Recommendations
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recommendations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.firebaseKey || comment.timestamp} className="d-flex justify-content-between align-items-center">
                {editComment && editComment.firebaseKey === comment.firebaseKey ? (
                  // Render edit mode for the comment being edited
                  <div className="w-100">
                    <InputGroup>
                      <FormControl value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                      <Button variant="success" onClick={handleSaveEdit}>
                        Save
                      </Button>
                      <Button variant="secondary" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </InputGroup>
                  </div>
                ) : (
                  // Render regular comment view
                  <>
                    <div>
                      <span role="img" aria-label="user-icon">
                        🌟
                      </span>{' '}
                      {comment.content || 'No content provided'}
                    </div>
                    <div>
                      <Button variant="link" className="p-0 mx-2" onClick={() => handleEdit(comment)}>
                        ✏️
                      </Button>
                      <Button variant="link" className="p-0 text-danger" onClick={() => onDeleteComment(comment)}>
                        🗑️
                      </Button>
                    </div>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <InputGroup className="mt-3">
            <FormControl placeholder="Add your recommendation..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <Button variant="dark" onClick={handleCreateComment} disabled={!newComment.trim()}>
              Submit
            </Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
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
      user: PropTypes.string,
    }),
  ).isRequired,
  onCreateComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentBox;
