const baseURL = 'https://api.football-data.org/v2';
const headers = {
  'X-Auth-Token': process.env.VUE_APP_API_KEY
};
const options = {
  method: 'GET',
  headers
};

const serializeQuery = query => {
  const search = [];
  if (query && typeof query === 'object' && Object.keys(query).length) {
    for (const [ key, value ] of Object.entries(query)) {
      search.push(`${key}=${value}`);
    }
    return '?' + search.join('&');
  }
  return '';
};

export default {
  async send (url, query) {
    return fetch(`${baseURL}${url}${serializeQuery(query)}`, options)
      .then(response => response.json());
  }
};
