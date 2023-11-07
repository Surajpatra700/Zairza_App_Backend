const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date_and_time: {
        type: String,
        required: true
    },
    wing: {
        type: String,
        enum: ['Hardware', 'Software', 'Design'],
        required: true
    },
    event_img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    senior_incharge: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("event", eventSchema);

