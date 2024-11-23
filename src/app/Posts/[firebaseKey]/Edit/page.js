'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostForm from '../../../../components/Forms/PostForm';
import { getSinglePost } from '../../../../api/postData';

export default function UpdatePost({ params }) {
  const [editItem, setEditItem] = useState(null);
  const { firebaseKey } = params; // Access the dynamic route parameter from `params`

  useEffect(() => {
    if (firebaseKey) {
      getSinglePost(firebaseKey).then(setEditItem);
    }
  }, [firebaseKey]);

  if (!editItem) {
    return <div>Loading...</div>; // Show a loading state until the data is fetched
  }

  return (
    <div>
      <PostForm postObj={editItem} />
    </div>
  );
}

UpdatePost.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
