import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPosts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Posts.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data))) // Return all posts
      .catch(reject);
  });

const createPost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Posts.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updatePost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Posts/${payload.firebaseKey}.json`, {
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

export { getPosts, createPost, updatePost };
