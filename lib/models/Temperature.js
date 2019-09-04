const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
  temperature: {
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
