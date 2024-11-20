const categoryModel = require("../category/category.model");
const productModel = require("./product.model");

class ProductService {
    async addProduct(productName, productPrice, CategoryName) {
        const category = await categoryModel.findOne({ Name: CategoryName });
        if (category) {
            const result = await productModel.create({
                Name: productName,
                Price: productPrice,
                CategoryName: CategoryName,
                GroupName : category.GroupName,
            });
            if (result.Name) {
                return result;
            } else {
                throw new Error();
            }
        } else {
            throw { statusCode: 400, message: "category not valid" };
        }
    }
    
    async getProductsByCategory(categoryName){
        const result = await productModel.find({CategoryName : categoryName}).select("-__v -createdAt -updatedAt");
        if(result){
            return result;
        }
        else{
            throw new Error();
        }
    }

    async editProductName(productNewName, productOldName) {
        const result = await productModel.updateOne(
            { Name: productOldName },
            { $set: { Name: productNewName } }
        );
        if (result.modifiedCount !== 1) {
            throw { message: "product name not changed", statusCode: 400 };
        }
        return result;
    }

    async editProductPrice(productName, productNewPrice) {
        const result = await productModel.updateOne(
            { Name: productName },
            { $set: { Price: productNewPrice } }
        );
        if (result.modifiedCount !== 1) {
            throw { message: "product price not changed", statusCode: 400 };
        }
        return result;
    }

    async editProductCategory(productName, productNewCategory) {
        const category = await categoryModel.findOne({ Name: productNewCategory });
            if (category) {
            const result = await productModel.updateOne(
                { Name: productName },
                { $set: { CategoryName: productNewCategory ,GroupName : category.GroupName} }
            );
            if (result.modifiedCount !== 1) {
                throw { message: "product category not changed", statusCode: 400 };
            }
            return result;
        }
        else{
            throw { statusCode: 400, message: "category not valid" };
        }
    }

    async removeProduct(productName) {
        const result = await productModel.deleteOne({ Name: productName });
        if (result.deletedCount !== 1) {
            throw new Error();
        }
        return result;
    }
}

module.exports = new ProductService();