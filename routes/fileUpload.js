const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const multer  = require('multer');

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
router.post('/upload', upload.single('image'), async (req, res) => {
  if (req.file) {
    const imageUrl = '/uploads/' + req.file.filename; // This is the URL to save in the database

    const newImage = new Image({
      imageUrl: imageUrl
    });


    await newImage.save();
    res.status(200).json({ imageUrl: imageUrl });
    // url = newImage.imageUrl;

  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

module.exports = router; 
// module.exports = { url }