const request = require('supertest');

const createServer = require('../src/server.js');

describe('BGR Proxy Server', () => {

  const app = createServer();

  test('POST /games without page parameter', async () => {
    const res = await request(app)
      .post('/games')
      .send({})
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);

    const body = res.body;
    const firstRes = body[0];
    expect(firstRes.id).toBe(3046);
    expect(firstRes.genres).toStrictEqual(['Shooter', 'Adventure', 'Indie']);
    expect(firstRes.name).toBe('Day One: Garry\'s Incident');
    expect(firstRes.rating).toBe(10.0019659983726);
    expect(firstRes.url).toBe('https://www.igdb.com/games/day-one-garry-s-incident');
    expect(firstRes.cover_url).toBe('https://images.igdb.com/igdb/image/upload/t_cover_big/oxeeg8wve9gog5bnndrr.jpg');
  });

  test('POST /games with page parameter', () => {
    setTimeout(async () => { // 2 seconds between tests to account for rate limit
      const res = await request(app)
        .post('/games/3')
        .send({})
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);

      const body = res.body;
      const firstRes = body[0];
      expect(firstRes.id).toBe(13457);
      expect(firstRes.genres).toStrictEqual(['Turn-based strategy (TBS)']);
      expect(firstRes.name).toBe('Might & Magic Heroes VI: Pirates of the Savage Sea');
      expect(firstRes.rating).toBe(11.6140108675296);
      expect(firstRes.url).toBe('https://www.igdb.com/games/might-and-magic-heroes-vi-pirates-of-the-savage-sea');
      expect(firstRes.cover_url).toBe('https://images.igdb.com/igdb/image/upload/t_cover_big/hjrkgjc0iish6loewqt6.jpg');
    }, 2000)
  });

})
