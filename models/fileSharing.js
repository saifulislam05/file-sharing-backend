const mongoose = require("mongoose");

const fileSchema =new mongoose.Schema({
    filename: {
        type: String,
        required:true
    },path: {
        type: String,
        required:true
    },size: {
        type: Number,
        required:true
    },sender: {
        type: String,
        required: false,
        default:""
    },reveiver: {
        type: String,
        required:false,
        default:""
    },
})

const fileSharingModel = mongoose.model("files", fileSchema);
module.exports = fileSharingModel;