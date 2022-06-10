require('dotenv').config();
const axios = require('axios');

const { IGDB_URL } = require('../../constants.js');

const getGameData = () => {
  const headers = {
    'Accept': 'application/json',
    'Client-ID': process.env.CLIENT_ID,
    'Authorization': process.env.CLIENT_TOKEN
  }

  return axios({
    method: 'POST',
    url: `${IGDB_URL}/games/`,
    headers: headers,
    data: 'fields *'
  })
}

module.exports = {
  getGameData: getGameData
}
