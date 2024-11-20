const {Schema, model} = require('mongoose')

const groupSchema = new Schema(
    {
        Name: { type: String, required: true, trim: true ,minLength : 2,unique : true},
    },
    { timestamps: true }
);

const groupModel = model("groups",groupSchema);
module.exports = groupModel;