import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTags = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}Tags.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export default getTags;
