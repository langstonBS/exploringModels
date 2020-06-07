/* eslint-disable eol-last */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tvShowName: {
    type: String,
    required: true
  },
  tvShowEpesode: {
    type: Number,
    require: true
  },
  thoughts: {
    type: String,
    require: true
  }

});



module.exports = mongoose.model ('tvNote', schema);