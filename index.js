require('dotenv').config();
const express = require("express")
const bodyparser = require("body-parser")
const PORT = process.env.PORT || 4600
const event = require("./routes/router_event")
const auth = require("./routes/authentication")
const profiles = require("./routes/profiles")
const fileUpload = require("./routes/fileUpload")

const app = express();
require("./mongoDB/mongo_conn");

// app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());

app.use("/zairza",event);
app.use("/zairza",auth);
app.use("/zairza",profiles);
app.use("/zairza",fileUpload);


app.listen(PORT, (req,res)=>{
    console.log("Server Running on: "+PORT);
})

app.get("/", (req,res)=>{
    res.send("Welcome to Zairza!")
})