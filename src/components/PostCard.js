'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function PostCard({ postObj }) {
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
  }).isRequired,
};

export default PostCard;
