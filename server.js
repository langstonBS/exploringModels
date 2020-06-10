const mongoose = require('mongoose');
const app = require('./lib/app');

mongoose.connect('mongodb://localhost:27017/tv-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(7890, () => {
  console.log('Started on 7890');
});
