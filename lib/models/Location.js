const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

locationSchema.statics.getTemperaturesByLocation = function(id){
  return this.aggregate([{
    '$match': {
      '_id': ObjectId(id) }
  }, {
    '$lookup': {
      'from': 'temps', 
      'localField': '_id', 
      'foreignField': 'location', 
      'as': 'temps' }
  }, {
    '$addFields': {
      'temps': {
        '$map': {
          'input': '$temps', 
          'as': 'el', 
          'in': '$$el.temperature' } } }
  }]);
};

module.exports = mongoose.model('Location', locationSchema);
