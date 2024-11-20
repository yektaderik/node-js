const productController = require("./product.controller");

module.exports = function (fastify, opts, done) {
    fastify.post("/add",productController.addProduct);
    fastify.get("/:categoryName", productController.getProductsByCategory);
    fastify.put("/change-name", productController.editProductName);
    fastify.put("/change-price", productController.editProductPrice);
    fastify.put("/change-category", productController.editProductCategory);
    fastify.delete("/remove", productController.removeProduct);
    done();
};
