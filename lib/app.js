const express = require('express');
const app = express();
const tvNote = require('./models/TvNote');

app.use(require('cors')());
app.use(express.json());

app.post('/tvNote', (req, res) => {
  tvNote
    .create(req.body)
    .then(shareable => res.send(shareable));
});

app.get('tvNote', (req, res) => {
  tvNote.create(req.body)
    .then(tvNote => res.send(tvNote));
});

module.exports = app;
