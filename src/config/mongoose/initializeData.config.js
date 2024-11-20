const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const groupModel = require("../../modules/group/group.model");
const isExistCollection = require("../../utils/isExistCollection");
const categoryModel = require("../../modules/category/category.model");
const productModel = require("../../modules/product/product.model");

const importData = async (collectionName) => {
    try {
        const isHaveCollection = await isExistCollection(collectionName);
        if(!isHaveCollection){
            const data = await JSON.parse(
                fs.readFileSync(
                    path.join(__dirname, `/database/${collectionName}.json`),
                    "utf-8"
                )
            );
            await pushToCollection(collectionName,data)
            console.log(chalk.blue(`${collectionName} imported successfully\n`));
        }
    } catch (err) {
        console.error("Error importing data", err);
    }
};

const pushToCollection = async (collectionName,data)=>{
    let pushFunction;
    switch(collectionName){
        case 'groups':
            pushFunction = groupModel;
            break;
        case 'categories':
            pushFunction = categoryModel;
            break;
        case 'products':
            pushFunction = productModel
            break;
        default:
            throw new Error('bug in initializeData');s
    }
    await pushFunction.insertMany(data)
}

module.exports = importData;
