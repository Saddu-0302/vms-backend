const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

// routes
app.use("/api", require("./routes/user.route"))
app.use("/api", require("./routes/visitor.route"))


app.use((req, res) => {
    res.status(404).json({ message: "Resource Not Found" });
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong", error: err.message })
})

// connection
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(
        process.env.PORT,
        console.log("SERVER RUNNING")
    )
})