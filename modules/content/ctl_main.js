var ContentsSchema = require('../schemas/contents_schema.js');

module.exports.getContentsByCategoryId = async function (req, res) {
    try {
        var contents = await ContentsSchema.findOne({"category_id": req.body.id});
        if (contents == null) {
            var content = {
                category_id: req.body.id,
                problem_count: 1,
                problems: [{
                    problem_id      : 1,
                    item_count      : 1,
                    items: [{
                        item_type   : "Text",
                        title       : "New Text",
                        content     : "New Text",
                        answers     : [],
                        item_id     : 1,
                    }],
                }]
            };
            content = await ContentsSchema.create(content);
        }
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.addContent = async function (req, res) {
    try {
        var newContent = req.body.content;
        var _id = req.body._id;
        var category_id = req.body.category_id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        content.problems.forEach(problem => {
            if (problem.problem_id == _id) {
                problem.item_count ++;
                problem.items.push(newContent);
            }
        })
        var contents = await ContentsSchema.update({category_id: category_id}, content);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.saveTextContent = async function (req, res) {
    try {
        var newContent = req.body.content;
        var category_id = req.body._id;
        var problem_id = req.body.content.problem_id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        content.problems.forEach(problem => {
            if (problem.problem_id == problem_id) {
                problem.items.forEach(element => {
                    if (element.item_id === newContent._id ) {
                        element.title = newContent.title;
                        element.content = newContent.textcontent;
                    }
                });
            }            
        })
        var contents = await ContentsSchema.update({category_id: category_id}, content);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.saveVideoContent = async function (req, res) {
    try {
        var newContent = req.body.content;
        var category_id = req.body._id;
        var problem_id = req.body.content.problem_id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        content.problems.forEach(problem => {
            if (problem.problem_id == problem_id) {
                problem.items.forEach(element => {
                    if (element.item_id === newContent._id ) {
                        element.title = newContent.title;
                        element.content = newContent.videoUrl;
                    }
                });
            }            
        })
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
        var problem_id = req.body.content.problem_id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        content.problems.forEach(problem => {
            if (problem.problem_id == problem_id) {
                problem.items.forEach(element => {
                    if (element.item_id === newContent._id ) {
                        element.title = newContent.title;
                        element.content = req.body.path;
                    }
                })
            }
        })
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
        var problem_id = req.body.content.problem_id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        content.problems.forEach(problem => {
            if (problem.problem_id == problem_id) {
                problem.items.forEach(element => {
                    if (element.item_id === newContent._id ) {
                        element.title = newContent.question;
                        element.answers = newContent.answers;
                    }
                });
            }
        })
        var contents = await ContentsSchema.update({category_id: category_id}, content);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.removeContent = async function (req, res) {
    try {
        var category_id = req.body._id;
        var problem_id = req.body.content.problem_id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        var itemsdata= [];
        content.problems.forEach(problem => {
            if (problem.problem_id == problem_id) {
                problem.items.forEach(element => {
                    if (element.item_id !== req.body.content._id) {
                        itemsdata.push(element);
                    }
                });
                problem.items = itemsdata;
                // problem.item_count --;
            }
        })
        await ContentsSchema.update({category_id: category_id}, content);
//        var contents = await ContentsSchema.findOne({category_id: category_id});
        // console.log(contents.problems[0].items);
        res.status(201).json({success: true, doc: content});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.addProblem = async function (req, res) {
    try {
        var category_id = req.body.category_id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        if (content) {
            content.problem_count ++;
            var newProblem = {
                problem_id: content.problem_count,
                item_count: 0,
                items: [],
            };
            content.problems.push(newProblem);
            // console.log(content);
            var contents = await ContentsSchema.update({category_id: category_id}, content);
            res.status(201).json({success: true, doc: contents});    
        }
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.removeProblem = async function (req, res) {
    try {
        var category_id = req.body.category_id;
        var problem_id = req.body.problem_id;
        var content = await ContentsSchema.findOne({category_id: category_id});
        var problems = [];
        content.problems.forEach(problem => {
            if (problem.problem_id != problem_id) {
                problems.push(problem);
            }
        });
        content.problems = problems;
        // content.problem_count -- ;
        var contents = await ContentsSchema.update({category_id: category_id}, content);
        res.status(201).json({success: true, doc: contents});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}