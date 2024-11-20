module.exports = function(error, request, res){

    const statusCode = error.statusCode || 500;

    request.log.error(error);
    
    res.status(statusCode).send({
        error: {
            message: error.message || "internal server error",
            statusCode: statusCode,
        },
    });
}
