const { default: mongoose } = require("mongoose");

module.exports = async (collectionName) => {
    try {
        const collection = mongoose.connection.db.collection(collectionName);
        const count = await collection.countDocuments();
        return count > 0 ? true : false;
    } catch (err) {
        return false;
    }
};
