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

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();
  const [tagName, setTagName] = useState(null);
  const [isFavorite, setIsFavorite] = useState(postObj.favorite); // Initialize favorite state
  const router = useRouter();

  // Synchronize `isFavorite` state with `postObj.favorite` prop
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
    getTags().then((tags) => {
      const matchingTag = tags.find((tag) => tag.firebaseKey === postObj.tagId);
      if (matchingTag) {
        setTagName(matchingTag.name);
      }
    });
  }, [postObj.tagId]);

  return (
    <Card
      className="card"
      style={{
        width: '18rem',
        margin: '10px',
        backgroundColor: '#343a40',
        color: 'white',
      }}
    >
      {/* Image Carousel */}
      {postObj.images?.length > 0 ? (
        <Carousel interval={null} style={{ height: '400px' }}>
          {postObj.images.map((image) => (
            <Carousel.Item key={crypto.randomUUID()}>
              <img
                className="d-block w-100"
                src={typeof image === 'string' ? image : image.url}
                alt="Slide"
                style={{
                  height: '400px',
                  objectFit: 'cover',
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
            height: '400px',
            objectFit: 'cover',
          }}
        />
      )}

      <Card.Body style={{ position: 'relative', paddingBottom: '50px' }}>
        <Card.Title>
          {postObj.title}
          <FontAwesomeIcon
            icon={isFavorite ? solidStar : regularStar} // Toggle between filled and empty star
            onClick={handleFavoriteClick}
            style={{
              cursor: 'pointer',
              marginLeft: '10px',
              color: isFavorite ? 'gold' : 'white', // Highlight gold if favorited
            }}
          />
        </Card.Title>
        <hr style={{ backgroundColor: 'white', height: '1px' }} />
        <h6>{postObj.content}</h6>

        {tagName && (
          <div className="mt-3 text-center">
            <Button variant="outline-light" href={`/tagStories/${postObj.tagId}`} className="badge" style={{ fontSize: '0.8rem' }}>
              {tagName}
            </Button>
          </div>
        )}

        <div className="mt-3 d-flex justify-content-between">
          {/* View Button */}
          <Button variant="outline-light" onClick={() => handleView(postObj.firebaseKey)} style={{ fontSize: '0.8rem' }}>
            <FontAwesomeIcon icon={faEye} className="me-2" />
            View
          </Button>

          {user?.uid === postObj.uid && (
            <Dropdown
              as={ButtonGroup}
              className="dropdown-menu-right"
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
              }}
            >
              <Dropdown.Toggle
                variant="dark"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  padding: '0',
                }}
              >
                <FontAwesomeIcon icon={faEllipsisH} style={{ fontSize: '24px' }} />
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
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    content: PropTypes.string,
    favorite: PropTypes.bool, // Add favorite to PropTypes
    firebaseKey: PropTypes.string.isRequired,
    tagId: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
