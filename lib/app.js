const express = require('express');
const app = express();
const tvNote = require('./models/tvNote');

app.use(require('cors')());
app.use(express.json());

app.get('tvNote', (req, res) => {
  tvNote.create(req.body)
    .then(tvNote => res.send(tvNote));
});

module.exports = app;
