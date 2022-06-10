require('dotenv').config();
const axios = require('axios');

const { IGDB_URL } = require('../../constants.js');

const headers = {
  'Accept': 'application/json',
  'Client-ID': process.env.CLIENT_ID,
  'Authorization': `Bearer ${process.env.CLIENT_TOKEN}`
}

const getGameData = () => {
  return axios({
    method: 'POST',
    url: `${IGDB_URL}/games`,
    headers: headers,
    data: 'fields cover, genres, name, platforms, rating, url; sort rating asc;'
  })
    .then(res => res)
    .catch(err => { throw `Error fetching from IGDB: ${err}` });
}

module.exports = {
  getGameData: getGameData
}
