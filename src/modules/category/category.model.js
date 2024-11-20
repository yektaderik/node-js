const {Schema, model} = require('mongoose')

const categorySchema = new Schema(
    {
        Name: { type: String, required: true, trim: true ,minLength : 2,unique : true},
        GroupName: { type: String, required: true, trim: true ,minLength : 2},
    },
    { timestamps: true }
);

const categoryModel = model("categories",categorySchema);
module.exports = categoryModel;