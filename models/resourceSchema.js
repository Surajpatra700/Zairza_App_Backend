const mongoose = require("mongoose")

const resourceSchema = new mongoose.Schema({
    roadmaps: {
        googleDriveLinks: [String],
    },
    videos: {
        youtubeLinks: [String],
    },
    session_presentations: {
        type: String,
    },
    domain: {
        type: String,
        enum: ['Web Development', 'App Development', 'Design', 'Machine Learning'],
        required: true
    }
});

module.exports = mongoose.model("resources", resourceSchema);
