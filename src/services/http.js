const baseURL = 'https://api.football-data.org/v2'
const headers = {
  'X-Auth-Token': process.env.VUE_APP_API_KEY
}
const options = {
  method: 'GET',
  headers
}

const serializeQuery = query => {
  const search = []
  if (query && Object.keys(query).length) {
    for (const key in query) {
      search.push(`${key}=${query[key]}`)
    }
    return '?' + search.join('&')
  }
  return ''
}

export default {
  async send (url, query) {
    if (query === null && typeof query !== 'object') {
      throw new Error('Invalid query (not object)')
    }
    return fetch(`${baseURL}${url}${serializeQuery(query)}`, options)
      .then(response => response.json())
  }
}
