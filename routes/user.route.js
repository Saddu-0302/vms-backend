const router = require("express").Router()
const userController = require("../controllers/user.controller")
router
    .get("/fetch", userController.fetchAllUser)
    .post("/login", userController.login)
    .post("/logout", userController.logout)
    .post("/create", userController.addUser)

module.exports = router