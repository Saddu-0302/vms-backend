const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const user = require("../models/user")
exports.fetchAllUser = asyncHandler(async (req, res) => {
    const result = await user.find()
    res.status(200).json({ message: "User Fetch Successfull ✅", result })
})
exports.addUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const found = await user.findOne({ email })
    if (found) {
        return res.status(400).json({ message: "User Already Added" })
    }
    const result = await user.create({ ...req.body, password: hash })
    res.status(200).json({ message: "User Create Successfull ✅", result })
})
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d';
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const found = await user.findOne({ email })
    if (!found) {
        return res.status(400).json({ message: "Email Not Found" })
    }
    const verify = await bcrypt.compare(password, found.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Not Match" })
    }
    const token = jwt.sign({ id: found._id, email: found.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production (HTTPS)
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.status(200).json({ message: "User Login Successfull", token })
})
exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });
    res.status(200).json({ message: "User Logged Out Successfully" });
})