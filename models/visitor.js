const mongoose = require("mongoose")

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    idProof: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true })

module.exports = mongoose.model("visitor", visitorSchema)