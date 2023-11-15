const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            UseUnifiedTopology: true
    })
    } catch (err) {
        console.error(err);
    }
}

