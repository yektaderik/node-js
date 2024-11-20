const categoryRoutes = require('../category/category.routes');
const groupRouter = require('../group/group.routes');
const productRoutes = require('../product/product.routes');

function routes(fastify, options, done) {
    fastify.register(groupRouter, { prefix: "/group" });
    fastify.register(categoryRoutes, { prefix: "/category" });
    fastify.register(productRoutes, { prefix: "/product" });
    done();
}

module.exports = routes;
