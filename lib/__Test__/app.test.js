const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../app');
const TvNote = require('../models/TvNote');

describe('app routes', () => {
  const mongo = new MongoMemoryServer();
  beforeAll(() => {
    return mongo.getUri()
      .then(uri => mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }));
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });
  
    
  it('creats a new review', () => {
    return request(app)
      .post('/tvNote')
      .send({
        tvShowName: 'the show',
        tvShowEpisode: 214,
        thoughts: 'hat id hered'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          tvShowName: 'the show',
          tvShowEpisode: 214,
          thoughts: 'hat id hered',
          __v: 0
        });
      });
  });
  
  
  it('it displays a new tv show thouhts', async () => {
    await TvNote.create({
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id hered'
    });
        
    return request(app)
      .get('/tvNote')
      .then(res => {
        expect(res.body).toEqual(
          [{
            _id: expect.anything(),
            tvShowName: 'the show',
            tvShowEpisode: 214,
            thoughts: 'hat id hered',
            __v: 0
          }]
        );
      });
  });

  it('dispays one on the tv app', async() => {
    const note = await TvNote.create({
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id hered'
    });
    
    console.log(note);
    console.log(note.id , "im thei id");

    return request(app)
      .get(`/tvNote /${note.id}`)
      .then(res => {
        expect(res.body).toEqual(
          [{
            _id: note.id,
            tvShowName: 'the show',
            tvShowEpisode: 214,
            thoughts: 'hat id hered',
            __v: 0
          }]
        );
      });
  });
});

