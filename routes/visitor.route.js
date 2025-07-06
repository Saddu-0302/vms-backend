const router = require("express").Router()

const visitorController = require("../controllers/visitor.controller")

router
    .get("/", visitorController.getAllVisitors)
    .post("/add-visitor", visitorController.addVisitor)
    .put("/status/:id", visitorController.updateStatus)

module.exports = router