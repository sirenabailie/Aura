'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import getTags from '../../api/tagData';
import { createPost, updatePost } from '../../api/postData';

function PostForm({ postObj = {} }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tagId: '',
    images: [], // To store image URLs
  });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags()
      .then(setTags)
      .catch((error) => console.error('Error fetching tags:', error));
  }, []);

  useEffect(() => {
    if (postObj.firebaseKey) {
      setFormData(postObj);
    }
  }, [postObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddImageUrl = () => {
    const url = formData.newImageUrl?.trim();
    if (url) {
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, url],
        newImageUrl: '',
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      uid: user.uid,
    };

    if (postObj.firebaseKey) {
      updatePost(payload).then(() => router.push('/'));
    } else {
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => router.push('/'));
      });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center text-white mb-4">Add a Post/Request</h2>
      <Form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#343a40',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        {/* Title Input */}
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter the post title"
            value={formData.title}
            onChange={handleChange}
            style={{
              backgroundColor: '#495057',
              color: 'white',
            }}
            required
          />
        </Form.Group>

        {/* Content Input */}
        <Form.Group className="mb-3" controlId="postContent">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            placeholder="Enter the post description"
            rows={4}
            value={formData.content}
            onChange={handleChange}
            style={{
              backgroundColor: '#495057',
              color: 'white',
            }}
            required
          />
        </Form.Group>

        {/* Tag Dropdown */}
        <Form.Group className="mb-3" controlId="postTag">
          <Form.Label>Tag</Form.Label>
          <Form.Select
            name="tagId"
            value={formData.tagId}
            onChange={handleChange}
            style={{
              backgroundColor: '#495057',
              color: 'white',
            }}
            required
          >
            <option value="">Select a tag</option>
            {tags.map((tag) => (
              <option key={tag.firebaseKey} value={tag.firebaseKey}>
                {tag.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Add Image URLs */}
        <Form.Group className="mb-3" controlId="imageUrls">
          <Form.Label>Image URLs</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              name="newImageUrl"
              placeholder="Enter image URL"
              value={formData.newImageUrl || ''}
              onChange={handleChange}
              style={{
                backgroundColor: '#495057',
                color: 'white',
              }}
            />
            <Button variant="outline-light" onClick={handleAddImageUrl} style={{ marginLeft: '8px' }}>
              Add
            </Button>
          </div>
          <div className="mt-3">
            {formData.images.map((url, index) => (
              <div key={url} className="d-flex align-items-center mb-2">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: '60px',
                    height: '60px',
                    marginRight: '8px',
                    objectFit: 'cover',
                  }}
                />
                <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Form.Group>

        <div className="text-center">
          <Button variant="dark" type="submit">
            {postObj.firebaseKey ? 'Update' : 'Create'} Post
          </Button>
        </div>
      </Form>
    </Container>
  );
}

PostForm.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    tagId: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    firebaseKey: PropTypes.string,
  }),
};

export default PostForm;
