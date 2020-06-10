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
    return mongoose.connection.close().
      then(mongo.stop());
  });
  
    
  it('creates a new review using post', async() => {
    const res = await request(app)
      .post('/tvNote')
      .send({
        tvShowName: 'the show',
        tvShowEpisode: 214,
        thoughts: 'hat id heard'
      });
    expect(res.body).toEqual({
      _id: expect.anything(),
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id heard',
      __v: 0
    });
  });
  
  
  it('it displays all tv Shows using get', async() => {
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

  it('displays one tv show using get', async() => {
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

  it(' It patches one app by id using patch', async () => {
    const note = await TvNote.create({
      tvShowName: 'the show',
      tvShowEpisode: 214,
      thoughts: 'hat id heard'
    });

    const newNote = {
      thoughts: 'the new thought'
    };

    return request(app)
      .patch(`/tvNote/${note._id}`)
      .send(newNote)
      .then(res => {
        expect(res.body).toEqual({
          _id: note.id,
          tvShowName: 'the show',
          tvShowEpisode: 214,
          thoughts: 'the new thought',
          __v: 0
        });
      });
  });




  it(' It deletes one tv app by id using delete', async() => {
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

  
