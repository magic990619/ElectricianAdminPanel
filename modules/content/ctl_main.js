var ContentsSchema = require('../schemas/contents_schema.js');

module.exports.getContentsByCategoryId = async function (req, res) {
    try {
        var contents = await ContentsSchema.findOne({"category_id": req.body.id});
        if (contents == null) {
            var content = {
                category_id: req.body.id,
                item_count: 1,
                items: [{
                    item_type   : "Text",
                    title       : "New Text",
                    content     : "New Text",
                    answers     : [],
                    item_id     : 1,
                }],
            };
            content = await ContentsSchema.create(content);
        }
        console.log(contents);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.addContent = async function (req, res) {
    try {
        var newContent = req.body.content;
        var _id = req.body._id;
        var content = await ContentsSchema.findOne({_id: _id});
        content.item_count ++;
        content.items.push(newContent);
        var contents = await ContentsSchema.update({_id: _id}, content);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.saveTextContent = async function (req, res) {
    try {
        var newContent = req.body.content;
        var category_id = req.body._id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        content.items.forEach(element => {
            if (element.item_id === newContent._id ) {
                element.title = newContent.title;
                element.content = newContent.textcontent;
            }
        });
        var contents = await ContentsSchema.update({category_id: category_id}, content);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.saveImageContent = async function (req, res) {
    try {
        var newContent = req.body.content;
        var category_id = req.body._id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        content.items.forEach(element => {
            if (element.item_id === newContent._id ) {
                element.title = newContent.title;
                element.content = req.body.path;
            }
        });
        console.log(content);
        var contents = await ContentsSchema.update({category_id: category_id}, content);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.saveQuestionContent = async function (req, res) {
    try {
        var newContent = req.body.content;
        var category_id = req.body._id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        content.items.forEach(element => {
            if (element.item_id === newContent._id ) {
                element.title = newContent.question;
                element.answers = newContent.answers;
            }
        });
        var contents = await ContentsSchema.update({category_id: category_id}, content);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.removeContent = async function (req, res) {
    try {
        var category_id = req.body._id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        var itemsdata= [];
        content.items.forEach(element => {
            if (element.item_id !== req.body.content._id) {
                itemsdata.push(element);
            }
        });
        var newContent = {
            _id: content._id,
            item_count: content.item_count,
            category_id: category_id,
            itmes: []
        };
        newContent.items = itemsdata;
        var contents = await ContentsSchema.update({category_id: category_id}, newContent);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}