const groupController = require("./group.controller");

module.exports = function (fastify, opts, done) {
    fastify.post("/add",groupController.addGroup);
    fastify.get("/", groupController.getGroups);
    fastify.get("/:groupName/:query", groupController.searchProducts);
    fastify.put("/change-name", groupController.editGroup);
    fastify.delete("/remove", groupController.removeGroup);
    done();
};
