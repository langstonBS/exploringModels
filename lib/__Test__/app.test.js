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
  
    
  it('creates a new review', () => {
    return request(app)
      .post('/tvNote')
      .send({
        tvShowName: 'the show',
        tvShowEpisode: 214,
        thoughts: 'hat id heard'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          tvShowName: 'the show',
          tvShowEpisode: 214,
          thoughts: 'hat id heard',
          __v: 0
        });
      });
  });
  
  
  it('it displays a new tv show thoughts', async() => {
    await TvNote.create({
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id heard'
    });
        
    return request(app)
      .get('/tvNote')
      .then(res => {
        expect(res.body).toEqual(
          [{
            _id: expect.anything(),
            tvShowName: 'the show',
            tvShowEpisode: 214,
            thoughts: 'hat id heard',
            __v: 0
          }]
        );
      });
  });

  it('displays one on the tv app', async() => {
    const note = await TvNote.create({
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id heard'
    });
    

    return request(app)
      .get(`/tvNote/${note._id}`)
      .then(res => {
        expect(res.body).toEqual(
          {
            _id: note.id,
            tvShowName: 'the show',
            tvShowEpisode: 214,
            thoughts: 'hat id heard',
            __v: 0
          }
        );
      });
  });

  it('dispays one on the tv app', async() => {
    const note = await TvNote.create({
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id heard'
    });
    

    return request(app)
      .get(`/tvNote/${note._id}`)
      .then(res => {
        expect(res.body).toEqual(
          {
            _id: note.id,
            tvShowName: 'the show',
            tvShowEpisode: 214,
            thoughts: 'hat id heard',
            __v: 0
          }
        );
      });
  });

  it(' it changes one on the tv app', async() => {
    const note = await TvNote.create({
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id heard'
    });
    
    await note.update({
      tvShowName: 'my show',
      tvShowEpisode: 214,
      thoughts: 'hat id heard'
    });
    
    return request(app)
      .get(`/tvNote/${note._id}`)
      .then(res => {
        expect(res.body).toEqual(
          {
            _id: note.id,
            tvShowName: 'my show',
            tvShowEpisode: 214,
            thoughts: 'hat id heard',
            __v: 0
          }
        );
      });
  });

  it(' it changes one on the tv app', async() => {
    const note = await TvNote.create({
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id heard'
    });

    
    return request(app)
      .delete(`/tvNote/${note._id}`)
      .then(res => {
        expect(res.body).toEqual(
          {
            _id: note.id,
            tvShowName: 'the show',
            tvShowEpisode: 214,
            thoughts: 'hat id heard',
            __v: 0
          }
        );
      });
  });
    
});

  
