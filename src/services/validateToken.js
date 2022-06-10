require('dotenv').config();
const axios = require('axios');

const getToken = () => {
  const id = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const grant = 'client_credentials';
  const params = `client_id=${id}&client_secret=${secret}&grant_type=${grant}`;
  const url = `https://id.twitch.tv/oauth2/token?${params}`;

  return axios({ method: 'POST', url: url })
    .then(res => res.data.access_token)
    .catch(err => { throw `Failed to get token. Error: ${err}` });
}

const validateToken = async () => {
  const url = 'https://id.twitch.tv/oauth2/validate';
  const token = await getToken();
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
  getToken: getToken,
  validateToken: validateToken
}
