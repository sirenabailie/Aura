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

const deletePost = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Posts/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json)
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSinglePost = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Posts/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getPostsByTag = (tagId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Posts.json?orderBy="tagId"&equalTo="${tagId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getPostByFirebaseKey = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Posts/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getPosts, createPost, updatePost, deletePost, getSinglePost, getPostByFirebaseKey, getPostsByTag };
