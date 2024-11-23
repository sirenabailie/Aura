import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router
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
    image: '',
  });
  const [tags, setTags] = useState([]);

  // Fetch tags when the form loads
  useEffect(() => {
    getTags().then(setTags);
  }, []);

  // Set form data if editing
  useEffect(() => {
    if (postObj.firebaseKey) {
      setFormData(postObj);
    }
  }, [postObj]);

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
    if (postObj.firebaseKey) {
      updatePost(formData).then(() => router.push(`/`));
    } else {
      const payload = { ...formData, uid: user.uid };
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => {
          router.push('/');
        });
      });
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
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default PostForm;
