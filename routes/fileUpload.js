const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const multer  = require('multer');
const UserSchema = require('../models/userSchema');

const imageFile = new mongoose.Schema({
    imageUrl: String
});

const Image = mongoose.model('Image', imageFile);

// Configuring multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Where to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file
  }
});

const upload = multer({ storage });


// let url;
// router.post('/upload', upload.single('image'), async (req, res) => {
//   if (req.file) {
//     const imageUrl = '/uploads/' + req.file.filename; // This is the URL to save in the database

//     const newImage = new Image({
//       imageUrl: imageUrl
//     });


//     await newImage.save();
//     res.status(200).json({ imageUrl: imageUrl });
//     // url = newImage.imageUrl;

//   } else {
//     res.status(400).json({ error: 'No file uploaded' });
//   }
// });

// Function to upload an image
const uploadImage = async (req, res) => {
  if (req.file) {
    const imageUrl = '/uploads/' + req.file.filename;

    const newImage = new Image({
      imageUrl: imageUrl
    });

    await newImage.save();
    return newImage;
  } else {
    throw new Error('No file uploaded');
  }
};

// Function to associate an image with a user
const uploadProfileImage = async (userId, image) => {
  try {
    const user = await UserSchema.findByIdAndUpdate(
      userId,
      { profileImage: image._id },
      { new: true }
    );

    return { user, image };
  } catch (error) {
    console.error(error);
    throw new Error('Error associating image with user');
  }
};

// Route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const uploadedImage = await uploadImage(req);
    const result = await uploadProfileImage(req.params.userId, uploadedImage);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router; 
// module.exports = { url }