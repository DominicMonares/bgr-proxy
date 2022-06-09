require('dotenv').config();
const axios = require('axios');

const getToken = () => {
  const id = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  axios.post(`https://id.twitch.tv/oauth2/token?
    client_id=${id}&
    client_secret=${secret}&
    grant_type=client_credentials
  `, {})
  .then(res => { console.log('RESULT ', res) })
  .catch(err => { console.log('ERROR ', err) });
}

const validateToken = () => {
  const id = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  // must send validation request to Twitch every hour
  // start in same file as server listen
}

module.exports = {
  getToken: getToken,
  validateToken: validateToken
}
