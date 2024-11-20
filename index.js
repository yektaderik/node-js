const fastify = require("fastify")();
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");
const swaggerConfig = require('./src/config/swagger/swagger.config.json')

const PORT = 3000;

const errorHandler = require("./src/utils/errorHandler");
require("./src/config/mongoose/mongoose.config");



fastify.register(require("./src/modules/router/routes"));

fastify.register(swagger, {
    swagger: swaggerConfig,
});

fastify.register(swaggerUI, {
    routePrefix: "/documentation",
    uiConfig: {
        title: "category management",
        docExpansion: "none",
        deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
});

fastify.setErrorHandler(errorHandler);

const startServer = async () => {
    try {
        await fastify.listen({ port: PORT });
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

startServer();
