import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Fetch user's favorite posts
const getUserFavorites = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Favorites/${uid}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data || {}))
      .catch(reject);
  });

export default getUserFavorites;
