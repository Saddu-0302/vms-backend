const asyncHandler = require("express-async-handler")
const visitor = require("../models/visitor")

exports.addVisitor = asyncHandler(async (req, res) => {
    const result = await visitor.create(req.body)
    res.status(200).json({ message: "Visitor Added Successfully", result })
})
exports.getAllVisitors = asyncHandler(async (req, res) => {
    const result = await visitor.find()
    res.status(200).json({ message: "All Visitor Fetch Successfull", result })
})
exports.updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
        return res.status(400).json({ message: "status is required" })
    }

    const result = await visitor.findByIdAndUpdate(id, { status }, { new: true })
    res.status(200).json({ message: "Status Update Successfull", result })
})