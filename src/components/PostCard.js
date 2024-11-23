'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import getTags from '../api/tagData';
import { deletePost } from '../api/postData';

function PostCard({ postObj, onUpdate }) {
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  const [tagName, setTagName] = useState(null);

  useEffect(() => {
    // Fetch tags and find the matching tag name
    getTags().then((tags) => {
      const matchingTag = tags.find((tag) => tag.firebaseKey === postObj.tagId);
      if (matchingTag) {
        setTagName(matchingTag.name); // Set the tag name for the post
      }
    });
  }, [postObj.tagId]);

  return (
    <Card
      className="card"
      style={{
        width: '18rem',
        margin: '10px',
        backgroundColor: '#343a40', // Dark mode background
        color: 'white', // Text color for dark mode
      }}
    >
      <Card.Img
        variant="top"
        src={postObj.image}
        alt={postObj.title}
        style={{
          height: '400px',
          objectFit: 'cover', // Ensures the image fits well
        }}
      />
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <hr style={{ backgroundColor: 'white', height: '1px' }} /> {/* Styled break line */}
        <h6>{postObj.content}</h6>
        {/* Render Tag Button */}
        {tagName && (
          <div className="mt-3">
            <Button
              variant="outline-light"
              href={`/tagStories/${postObj.tagId}`} // Link to tag-specific stories
              className="badge"
              style={{ fontSize: '0.8rem' }}
            >
              {tagName}
            </Button>

            <Button variant="dark" onClick={deleteThisPost} className="m-2" title="Delete Post">
              <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Link href={`/Posts/${postObj.firebaseKey}/Edit`} passHref>
              <Button variant="dark" className="m-2" title="Edit Post">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </Link>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    timestamp: PropTypes.string,
    firebaseKey: PropTypes.string,
    tagId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired, // Validate onUpdate
};

export default PostCard;
