var mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

var contentsSchema = new Schema({
    category_id: Number,
    item_count: Number,
    items: [
        {
            item_id: Number,
            item_type: String,
            title: String,
            content: String,
            answers: [{
                answer_id: Number,
                answer_string: String,
                answer: String,
                result: Boolean,
            }]
        }
    ]
},{
    usePushEach : true
});

contentsSchema.plugin(autoIncrement.plugin, 'contents');

module.exports = mongoose.model('contents', contentsSchema);