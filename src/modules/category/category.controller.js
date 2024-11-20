const CategoryService = require("./category.service");

class CategoryController {
    async addCategory(req, res) {
        const { categoryName , groupName} = req.body;
        const result = await CategoryService.addCategory(categoryName,groupName);
        if (result) {
            res.status(201);
            res.send("category created successfully");
        } else {
            throw new Error()
        }
    }

    async getCategories(req,res){
        const result = await CategoryService.getCategories();
        if(result){
            res.status(200);
            res.send(result);
        } else{
            throw new Error();
        }
    }

    async searchProducts(req,res){
        const {categoryName , query} = req.params;
        const result = await CategoryService.searchProducts(categoryName,query);
        if(result){
            res.status(200);
            res.send(result)
        }
        else{
            throw new Error();
        }
    }

    async getCategoryByName(req,res){    
        const {categoryName} = req.params;
        const result = await CategoryService.getCategoryByName(categoryName);
        if(result){
            res.status(200);
            res.send(result);
        }
        else{
            throw new Error();
        }
    }
    
    async editCategoryName(req, res) {
        const { categoryNewName, categoryOldName } = req.body;
        const result = await CategoryService.editCategoryName(categoryNewName,categoryOldName);
        if (result) {
            res.status(201);
            res.send("category edited successfully");
        } else {            
            throw new Error()
        }
    }

    async removeCategory(req,res){
        const { categoryName } = req.body;
        const result = await CategoryService.removeCategory(categoryName);
        if (result) {
            res.status(200);
            res.send("category deleted successfully");
        } else {
            throw new Error();
        }
    }
}

module.exports = new CategoryController();
