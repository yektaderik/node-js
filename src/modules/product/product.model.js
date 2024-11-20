const {Schema, model} = require('mongoose')

const productSchema = new Schema(
    {
        Name: { type: String, required: true, trim: true ,minLength : 2,unique : true},
        CategoryName: { type: String, required: true, trim: true ,minLength : 2,},
        GroupName: { type: String, required: true, trim: true ,minLength : 2,},
        Price: { type: String, required: true, trim: true ,minLength : 2,},
    },
    { timestamps: true }
);

const productModel = model("products",productSchema);
module.exports = productModel;