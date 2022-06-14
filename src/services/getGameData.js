require('dotenv').config();
const axios = require('axios');

const { IGDB_URL } = require('../config/constants.js');

const headers = {
  'Accept': 'application/json',
  'Client-ID': process.env.CLIENT_ID,
  'Authorization': `Bearer ${process.env.CLIENT_TOKEN}`
}

const getGameData = (page) => {
  if (!page) { page = 1 }

  return axios({
    method: 'POST',
    url: `${IGDB_URL}/games`,
    headers: headers,
    data: `fields
      genres,
      name,
      rating,
      url;
      sort rating asc;
      limit 5;
      offset ${(page - 1) * 5};
    `
  })
    .then(async games => {
      const fullGames = await Promise.all(games.data.map(async game => {
        const coverURL = await getCover(game.id);
        const genres = await getGenres(game.genres);
        game.cover_url = coverURL;
        game.genres = genres;
        return game;
      }));

      return fullGames;
    })
    .catch(err => { throw `Error fetching game data: ${err}` });
}

const getCover = (id) => {
  return axios({
    method: 'POST',
    url: `${IGDB_URL}/covers`,
    headers: headers,
    data: `fields url; where game = ${id};`
  })
    .then(res => {
      let link;
      if (res.data.length === 0) {
        link = 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png';
      } else {
        const url = res['data'][0]['url'];
        link = url.replace('thumb', 'cover_big');
      }
      return `https:${link}`;
    })
    .catch(err => { throw `Error fetching game cover: ${err}` });
}

const getGenres = async (genres) => {
  if (!genres) { return ['N/A'] }

  const fullGenres = await Promise.all(genres.map(async genre => {
    return await axios({
      method: 'POST',
      url: `${IGDB_URL}/genres`,
      headers: headers,
      data: `fields name; where id = ${genre};`
    })
      .then(res => {
        return  res['data'][0]['name'];
      })
      .catch(err => { throw `Error fetching game genre: ${err}` });
  }))

  return fullGenres;
}

module.exports = {
  getGameData: getGameData,
  getCover: getCover,
  getGenres: getGenres
}
