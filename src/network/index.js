const {default: Axios} = require('axios');

const apiEndpoint = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

const apiAcess = Axios.create({
  baseURL: apiEndpoint,
  timeout: 3000,
});

export const getItunesTopAlbums = async () => {
  const {data} = await apiAcess();
  return data;
};
