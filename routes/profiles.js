const express = require("express")
const router = express.Router();
const profiles = require("../models/userSchema")
const jwt = require('jsonwebtoken');

router.post("/uploadProfile", async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify and decode the JWT token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      // You can now access user data from the decoded payload
      const userId = decoded.userId;

      if (userId !== req.body.userId) {
        return res.status(403).json({ message: 'Forbidden: You can only upload your own profile data' });
      }

      const newProfile = new profiles({
        name: req.body.name,
        registration_number: req.body.registration_number,
        branch: req.body.branch,
        phone_number: req.body.phone_number,
        email: req.body.email,
        skills: req.body.skills,
        projects: {
          name: req.body.projects.name,
          github: req.body.projects.github,
          tech_stack: req.body.projects.tech_stack,
          description: req.body.projects.description,
        },
        batch: req.body.batch,
        blogs: {
          description: req.body.blogs.description,
          title: req.body.blogs.title,
          link: req.body.blogs.link,
        },
        social_handles: {
          name: req.body.social_handles.name,
          link: req.body.social_handles.link
        }
      });

      // Save the profile data to the database
      await newProfile.save();
      res.json(newProfile);

    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});


//  Retrieving data from Server

router.get("/getProfile", async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify and decode the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      
      // You can now access user data from the decoded payload
      const userId = decoded.userId;

      // Assuming you have a profiles collection and you want to find the profile for the user
      profiles.findOne({ userId: userId }, (err, profile) => {
        if (err) {
          return res.status(500).json({ message: 'Error finding profile' });
        }
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }

        // Return the profile data to the authenticated user
        res.json(profile);
      });
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;