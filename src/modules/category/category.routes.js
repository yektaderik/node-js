const categoryController = require("./category.controller");

module.exports = function (fastify, opts, done) {
    fastify.post("/add",categoryController.addCategory);
    fastify.get("/", categoryController.getCategories);
    fastify.get("/:categoryName/:query", categoryController.searchProducts);
    fastify.get("/:categoryName", categoryController.getCategoryByName);
    fastify.put("/change-name", categoryController.editCategoryName);
    fastify.delete("/remove", categoryController.removeCategory);
    done();
};
