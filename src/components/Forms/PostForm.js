'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router
import { Form, Button, Container } from 'react-bootstrap';
import getTags from '../../api/tagData';
import { createPost } from '../../api/postData';

function PostForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tagId: '',
    image: '',
  });
  const [tags, setTags] = useState([]);

  // Fetch tags when the form loads
  useEffect(() => {
    getTags().then(setTags);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.content && formData.tagId && formData.image) {
      createPost(formData).then(() => {
        setFormData({ title: '', content: '', tagId: '', image: '' }); // Reset form
        router.push('/'); // Navigate to the home page
      });
    } else {
      alert('Please fill out all fields before submitting.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center text-white mb-4">Add a Post/Request</h2>
      <Form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#343a40', // Dark mode background
          color: 'white', // Text color for dark mode
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        {/* Image URL Input */}
        <Form.Group className="mb-3" controlId="postImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="image"
            placeholder="Enter an image URL"
            value={formData.image}
            onChange={handleChange}
            style={{
              backgroundColor: '#495057',
              color: 'white',
            }}
            required
          />
        </Form.Group>

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

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" variant="light">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default PostForm;
