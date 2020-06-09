const express = require('express');
const app = express();
const TvNote = require('./models/TvNote');

app.use(require('cors')());
app.use(express.json());

app.post('/tvNote', (req, res) => {
  TvNote
    .create(req.body)
    .then(tvNote => res.send(tvNote));
});

app.get('/tvNote', (req, res) => {
  TvNote
    .find()
    .then(tvNote => res.send(tvNote));
});

app.get('/tvNote/:id', (req, res) => {
  TvNote
    .findById(req.params.id)
    .then(tvNote => res.send(tvNote));
});

app.post('/tvNote/:id', (req, res) => {
  TvNote
    .findByIdAndUpdate(req.params.id, { thoughts: req.body.thoughts }, { new: true })
    .then(tvNote => res.send(tvNote));
});

app.delete('/tvNote/:id', (req, res) => {
  TvNote
    .findByIdAndDelete(req.params.id)
    .then(tvNote => res.send(tvNote));
});

module.exports = app;
