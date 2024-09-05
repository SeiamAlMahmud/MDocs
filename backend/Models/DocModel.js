const mongoose = require("mongoose")

const docSchema = mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    uploadBy: { type: String },
    content: { type: String, },
    isPublish: { type: String,default: "unpublish" },

}, { timestamps: true })

const Doc = mongoose.model("Doc", docSchema)

module.exports = Doc 