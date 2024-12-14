'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faEye, faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import getTags from '../api/tagData';
import { deletePost, toggleFavorite } from '../api/postData';
import { useAuth } from '../utils/context/authContext';

function PostCard({ postObj, onUpdate, isUserProfile, customClass }) {
  const { user } = useAuth();
  const [tags, setTags] = useState([]); // Store tag names
  const [isFavorite, setIsFavorite] = useState(postObj.favorite); // Initialize favorite state
  const router = useRouter();

  // Sync `isFavorite` state with `postObj.favorite` prop
  useEffect(() => {
    setIsFavorite(postObj.favorite);
  }, [postObj.favorite]);

  const handleFavoriteClick = () => {
    toggleFavorite(user.uid, postObj.firebaseKey, !isFavorite).then(() => {
      setIsFavorite(!isFavorite); // Update UI state
      if (onUpdate) onUpdate(); // Trigger parent update if needed
    });
  };

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  const handleEdit = (firebaseKey) => {
    router.push(`/Posts/${firebaseKey}/Edit`);
  };

  const handleView = (firebaseKey) => {
    router.push(`/Posts/${firebaseKey}/View`);
  };

  useEffect(() => {
    if (postObj.tagId?.length > 0) {
      getTags().then((allTags) => {
        const matchingTags = postObj.tagId.map((id) => {
          const foundTag = allTags.find((tagItem) => tagItem.firebaseKey === id);
          return foundTag ? { name: foundTag.name, id } : null;
        });
        setTags(matchingTags.filter((tagObj) => tagObj !== null)); // Filter out null values
      });
    }
  }, [postObj.tagId]);

  return (
    <Card
      className={`card ${customClass}`} // Apply the custom class
      style={{
        width: '16rem', // Reduce width
        margin: '10px',
        backgroundColor: '#343a40',
        color: 'white',
        borderRadius: '10px', // Rounded corners
        overflow: 'hidden', // Ensure content respects rounded corners
      }}
    >
      {/* Image Carousel */}
      {postObj.images?.length > 0 ? (
        <Carousel interval={null} style={{ height: '200px' }}>
          {postObj.images.map((image) => (
            <Carousel.Item key={image}>
              <img
                className="d-block w-100"
                src={typeof image === 'string' ? image : image.url}
                alt="Slide"
                style={{
                  height: '200px', // Adjust image height for smaller cards
                  objectFit: 'cover',
                  borderRadius: '10px 10px 0 0', // Match top rounded corners
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Card.Img
          variant="top"
          src="/fallback-image.jpg" // Replace with a default image
          alt={postObj.title}
          style={{
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px 10px 0 0', // Match top rounded corners
          }}
        />
      )}

      <Card.Body
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '15px', // Adjust padding for smaller cards
        }}
      >
        {/* Card Content */}
        <div className="text-center">
          <Card.Title style={{ fontSize: '1rem' }}>{postObj.title}</Card.Title> {/* Adjust title size */}
        </div>

        {/* Tags and Buttons */}
        <div>
          {tags.length > 0 && (
            <div className="mt-3 text-center">
              {tags.map((tagObj) => (
                <Button
                  key={tagObj.id}
                  variant="outline-light"
                  href={`/Posts/Tags/${tagObj.name}`}
                  className="badge mx-1 tag-btn"
                  style={{ fontSize: '0.7rem' }} // Adjust tag font size for smaller cards
                >
                  {tagObj.name}
                </Button>
              ))}
            </div>
          )}
          <div className="mt-3 d-flex justify-content-between align-items-center">
            {/* View Button */}
            <Button
              className="view-btn"
              variant="outline-light"
              onClick={() => handleView(postObj.firebaseKey)}
              style={{ fontSize: '0.7rem' }} // Smaller button size
            >
              <FontAwesomeIcon icon={faEye} className="me-2" />
              View
            </Button>

            {/* Favorite Button */}
            <FontAwesomeIcon
              icon={isFavorite ? solidStar : regularStar}
              onClick={handleFavoriteClick}
              style={{
                cursor: 'pointer',
                color: isFavorite ? 'rgb(238, 187, 226)' : 'white',
                fontSize: '1.2rem', // Adjust size for smaller cards
              }}
            />

            {/* Edit/Delete Dropdown */}
            {isUserProfile && (
              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                  variant="dark"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    padding: '0',
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisH} style={{ fontSize: '20px' }} />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    backgroundColor: 'rgba(52, 58, 64, 0.9)',
                    border: 'none',
                    textAlign: 'left',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Dropdown.Item
                    as="button"
                    className="d-flex align-items-center"
                    style={{
                      padding: '0.5rem',
                      color: 'white',
                      backgroundColor: 'transparent',
                      border: 'none',
                    }}
                    onClick={() => handleEdit(postObj.firebaseKey)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    className="d-flex align-items-center"
                    style={{
                      padding: '0.5rem',
                      color: 'white',
                      backgroundColor: 'transparent',
                      border: 'none',
                    }}
                    onClick={deleteThisPost}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    content: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string.isRequired,
    tagId: PropTypes.arrayOf(PropTypes.string), // Multiple tags
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func,
  isUserProfile: PropTypes.bool, // Prop to indicate if this is on the user profile page
  customClass: PropTypes.string, // Custom class for styling
};

PostCard.defaultProps = {
  onUpdate: null,
  isUserProfile: false, // Default is false
  customClass: '', // Default empty class
};

export default PostCard;
