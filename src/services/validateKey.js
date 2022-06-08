require('dotenv').config();

const validateKey = () => {
  const id = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  // must send validation request to Twitch every hour
}

module.exports = {
  validateKey: validateKey
}
