const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    date_and_time: {
        type: String,
        required: false
    },
    event_img: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    senior_incharge: {
        type: String,
        required: false,
    }
},{
    timestamps: true,
}
);

module.exports = mongoose.model("event", eventSchema);

