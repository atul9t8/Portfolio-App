const express = require("express");
const mongoose = require("mongoose")
const app = express();
app.use(express.json())

require('dotenv').config()
const userRoute = require("./routes/userRoutes");
mongoose.connect(process.env.DB)

app.use("/user", userRoute)

app.listen(process.env.PORT, ()=>{
    console.log("Listening..")
})                                                                                  