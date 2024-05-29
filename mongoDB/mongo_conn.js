const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://surajpatra2908:12345@cluster0.v43fdee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    // useNewUrlParser: true,
    // UseUnifiedTopology: true
}).then(()=>console.log("MongoDB Connected!")).catch((err)=>console.log("Error: "+err));