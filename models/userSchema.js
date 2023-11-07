const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registration_number: {
        type: String,
        required: true
    },
    branch: {
        type: String
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        // lowercase: true,
        // match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        // required: true,
        minlength: 6
    },
    skills: [{
        type: String
    }],
    projects: [{
        name: {
            type: String
        },
        github: {
            type: String
        },
        tech_stack: [{
            type: String
        }],
        description: {
            type: String
        }
    }], 
    zairza_id: {
        type: String
    },
    batch: {
        type: String
    },
    blogs: [{
        description: {
            type: String
        },
        title: {
            type: String
        },
        link: {
            type: String
        }
    }],
    social_handles: [{
        name: {
            type: String
        },
        link: {
            type: String
        }
    }]
});

const User = mongoose.model('Profiles', userSchema);

module.exports = User;