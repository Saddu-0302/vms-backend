const router = require("express").Router()

const visitorController = require("../controllers/visitor.controller")

router
    .get("/", visitorController.getAllVisitors)
    .post("/add-visitor", visitorController.addVisitor)

module.exports = router