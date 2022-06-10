require('dotenv').config();
const axios = require('axios');

const validateToken = async () => {
  const url = 'https://id.twitch.tv/oauth2/validate';
  const token = process.env.CLIENT_TOKEN;
  const config = {
    headers: {
      Authorization: `OAuth ${token}`
    }
  }

  axios.get(url, config)
    .then(res => { console.log('Hourly token validation successful!') })
    .catch(err => { throw `Hourly token validation failed. Error: ${err}` });
}

module.exports = {
  validateToken: validateToken
}
