import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createComment = (payload) =>
  new Promise((resolve, reject) => {
    // Step 1: Create the comment
    fetch(`${endpoint}/Comments.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        const firebaseKey = data.name; // Retrieve the generated key
        const updatedComment = { ...payload, firebaseKey }; // Add firebaseKey to the comment payload

        // Step 2: Update the comment with the firebaseKey
        return fetch(`${endpoint}/Comments/${firebaseKey}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firebaseKey }),
        }).then(() => resolve(updatedComment)); // Resolve the updated comment
      })
      .catch(reject);
  });

const updateComment = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Comments/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteComment = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Comments/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json)
      .then((data) => resolve(data))
      .catch(reject);
  });

const getCommentsByPostId = (postId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Comments.json?orderBy="postId"&equalTo="${postId}"`)
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getCommentsByPostId, createComment, updateComment, deleteComment };
