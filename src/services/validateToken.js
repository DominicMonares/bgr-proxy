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
    .catch(err => {
      console.log('Failed to get token. Error: ', err);
      // throw err;
    });
}

const validateToken = async () => {
  const url = 'https://id.twitch.tv/oauth2/validate';
  const token = await getToken();
  axios.get(url, { 'Authorization': `OAuth ${token}` })
    .then(res => { console.log('Hourly token validation successful!') })
    .catch(err => {
      console.log('Hourly token validation failed. Error: ', err);
      // throw err;
    })
}

module.exports = {
  getToken: getToken,
  validateToken: validateToken
}
