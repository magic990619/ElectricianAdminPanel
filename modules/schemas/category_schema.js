var mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

var categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  type: {
    type: Boolean,
  },
  free: {
    type: Boolean,
  },
  subcount: {
    type: Number,
  },
  created_at:{
    type: Date,
    default: Date.now
  }
},{
  usePushEach : true
});

categorySchema.plugin(autoIncrement.plugin, 'categories');

module.exports = mongoose.model('categories', categorySchema);