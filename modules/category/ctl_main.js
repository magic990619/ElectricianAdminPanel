var CategorySchema = require('../schemas/category_schema.js');

module.exports.getAllCategories = async function (req, res) {
    try {
        var categories = await CategorySchema.find({"code": { "$exists": true },
        "$expr": { "$eq": [ { "$strLenCP": "$code" }, 2 ] } },{}, {sort: {code: 1}});
        console.log(categories);
        res.status(201).json({success: true, doc: categories});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.getCategoryNameByCode = async function (req, res) {
    try {
        var previousName = await CategorySchema.findOne({"code" : req.body.code}, {}, {});
        res.status(201).json({success: true, name: previousName.name});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.getCategoriesByCode = async function (req, res) {
    // console.log(req.body.code);
    var tcode = '/^'+req.body.code+'/i';
    //console.log(tcode);
    try {
        var categories = await CategorySchema.find({"code": { "$exists": true },
        "$expr": { "$eq": [ { "$strLenCP": "$code" }, req.body.code.length+2 ] }},{}, {sort: {code: 1}});
        var findcategories = [];
        var index;
        var names = [];
        categories.forEach(category => {
            if (category.code.slice(0, req.body.code.length) == req.body.code)
                findcategories.push(category);
        });
        for (index = 0; index < req.body.code.length; index += 2)
        {
            var subcode = req.body.code.slice(0, index + 2);
            var name = await CategorySchema.findOne({"code" : subcode}, {}, {});
            names.push(name);
        }
        var previousName = await CategorySchema.findOne({"code" : req.body.code}, {}, {});
        console.log(req.body.code);
        console.log(previousName.name);
        // console.log(names);
        res.status(201).json({success: true, doc: findcategories, names: names, previousName: previousName.name});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.addNewCategory = async function (req, res) {
    // console.log(req.body.category);
    var category = req.body.category;
    category.free = false;
    try {
        if (req.body.category.code == "all") {
            var newCode = await CategorySchema.find({"code": { "$exists": true },
            "$expr": { "$eq": [ { "$strLenCP": "$code" }, 2 ] } },{}, {sort: {code: 1}}).count() + 1;
            console.log(newCode);
            if (newCode < 10)
                category.code = '0' + newCode.toString();
            else
                category.code = newCode.toString();
        } else {
            var newCategories = await CategorySchema.find({"code": { "$exists": true },
            "$expr": { "$eq": [ { "$strLenCP": "$code" }, req.body.category.code.length+2 ] }},{}, {sort: {code: 1}});
            var newCode = 1;
            newCategories.forEach(newcategory => {
                if (newcategory.code.slice(0, req.body.category.code.length) == req.body.category.code)
                    newCode ++;
            });
            if (newCode < 10)
                category.code += '0' + newCode.toString();
            else
                category.code += newCode.toString();
            var prevcategory = await CategorySchema.findOne({code: category.code.slice(0, category.code.length - 2)});
            prevcategory.subcount ++;
            await CategorySchema.update({_id: prevcategory._id}, prevcategory);
        }
        var categories = await CategorySchema.findOne({code: category.code});
        if (categories == null) {
            var category = await CategorySchema.create(category);
            console.log("Category is added");
            res.status(201).json({success: true, doc: category});
        } else {
            res.status(401).json({ message: 'Code is already exist!'});
        }
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.updateCategory = async function (req, res) {
    // console.log(req.body.category);
    try {
    	var category = await CategorySchema.update({_id: req.body.category._id}, req.body.category);
        res.status(201).json({success: true, doc: category});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.removeCategory = async function (req, res) {
    // console.log(req.body.categoryId);
    try {
        var category = await CategorySchema.remove({_id: req.body.categoryId});
        res.status(201).json({success: true, doc: category});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.changeFreeStatus = async function (req, res) {
    try {
        var newCategory= await CategorySchema.findOne({_id: req.body.key});
        newCategory.free = req.body.value;
        var category = await CategorySchema.update({_id: req.body.key}, newCategory);
        res.status(201).json({success: true, doc: category});
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}