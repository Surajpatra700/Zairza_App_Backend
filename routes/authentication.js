const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');

// Registering a new user
router.post('/register', async (req, res) => {
    const { name, registration_number, branch, phone_number, email, password, batch } = req.body;
    try {

        if (!password || password.trim().length === 0) {
            return res.status(400).json({ message: 'Please Enter your password' });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate Zairza ID
        const userCount = await User.countDocuments({ batch });
        const randomDigits = Math.floor(Math.random() * 1000);
        const zairzaID = `ZA${batch.toString().slice(-2)}I${(userCount + 1).toString().padStart(3, '0')}${randomDigits.toString().padStart(3, '0')}`;

        // Create a new user
        let newUser = new User({
            name,
            registration_number,
            branch,
            phone_number,
            email,
            password: hashedPassword,
            zairza_id: zairzaID,
            batch
        });

        console.log(newUser);

        // Save the new user to the database
        await newUser.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user with the given email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and sign a token
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
