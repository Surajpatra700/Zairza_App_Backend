const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // UseUnifiedTopology: true
}).then(()=>console.log("MongoDB Connected!")).catch((err)=>console.log("Error: "+err));