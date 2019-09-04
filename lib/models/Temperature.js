const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
  temp: {
    type: String,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  }
});

module.exports = mongoose.model('Temp', tempSchema);
