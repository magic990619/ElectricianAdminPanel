var CategorySchema = require('../schemas/category_schema.js');

module.exports.getAllCategories = async function (req, res) {
    try {
        var categories = await CategorySchema.find({"code": { "$exists": true },
        "$expr": { "$eq": [ { "$strLenCP": "$code" }, 2 ] }, "in_use": true },{}, {sort: {order: 1}});
        // console.log(categories);
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
        "$expr": { "$eq": [ { "$strLenCP": "$code" }, req.body.code.length+2 ] }, "in_use": true},{}, {sort: {order: 1}});
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
    category.in_use = true;
    var order = category.order;
    console.log(order);
    try {
        if (req.body.category.code == "all") {
            var curCategories = await CategorySchema.find({"code": { "$exists": true },
            "$expr": { "$eq": [ { "$strLenCP": "$code" }, 2 ] }},{}, {sort: {order: 1}});
            // console.log(curCategories);
            var newCode = 1;
            await Promise.all(curCategories.map( async(elementCategory) => {
                newCode ++;
                if (elementCategory.order >= order) {
                    elementCategory.order ++;
                    await CategorySchema.update({_id: elementCategory._id}, elementCategory);
                    // console.log(elementCategory);
                }
            } ));
            // console.log(newCode);
            if (newCode < 10)
                category.code = '0' + newCode.toString();
            else
                category.code = newCode.toString();
        } else {
            var newCategories = await CategorySchema.find({"code": { "$exists": true },
            "$expr": { "$eq": [ { "$strLenCP": "$code" }, req.body.category.code.length+2 ] }},{}, {sort: {order: 1}});
            var newCode = 1;
            await Promise.all(newCategories.map( async(newCategory) => {
                {
                    if (newCategory.code.slice(0, req.body.category.code.length) == req.body.category.code) {
                        newCode ++;
                        if (newCategory.order >= order) {
                            newCategory.order ++;
                            await CategorySchema.update({_id: newCategory._id}, newCategory);
                            // console.log(newCategory);
                        }
                    }
                }
            }));
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
        var selCategory = await CategorySchema.findOne({_id: req.body.categoryId});
        // var category = await CategorySchema.remove({_id: req.body.categoryId});
        
        // console.log(selCategory);
        var curCategories = [];
        if (selCategory.code.length == 2) {
            curCategories = await CategorySchema.find({"code": { "$exists": true },
            "$expr": { "$eq": [ { "$strLenCP": "$code" }, 2 ] } },{}, {sort: {order: 1}});
            await Promise.all(curCategories.map( async(newCategory) => {
                {
                    if (newCategory.order > selCategory.order) {
                        newCategory.order --;
                        await CategorySchema.update({_id: newCategory._id}, newCategory);
                        // console.log(newCategory);
                    }
                }
            }));
        } else {
            curCategories = await CategorySchema.find({"code": { "$exists": true },
            "$expr": { "$eq": [ { "$strLenCP": "$code" }, selCategory.code.length ] }},{}, {sort: {order: 1}});
            await Promise.all(curCategories.map( async(newCategory) => {
                {
                    if (newCategory.code.slice(0, newCategory.code.length - 2) == selCategory.code.slice(0, selCategory.code.length - 2)) {
                        if (newCategory.order > selCategory.order) {
                            newCategory.order --;
                            await CategorySchema.update({_id: newCategory._id}, newCategory);
                            // console.log(newCategory);
                        }    
                    }
                }
            }));
        }        
        // console.log(curCategories);
        
        selCategory.in_use = false;
        var category = await CategorySchema.update({_id: selCategory._id}, selCategory);
        // console.log(curCategories);
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