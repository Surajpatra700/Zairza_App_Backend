// const express = require("express");
// const router = express.Router();
// const multer = require("multer");


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Where to save the uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Rename the file
//     }
// });





//   const upload = multer({ storage });

//   // let url;
// //   router.post('/upload', upload.single('image'), async (req, res) => {
//   export const imgsave = async (req, res) => {
//     upload.single('image');
//     if (req.file) {
//       const imageUrl = '/uploads/' + req.file.filename; // This is the URL to save in the database

//       const newImage = new Image({
//         imageUrl: imageUrl
//       });


//       await newImage.save();
//     //   res.status(200).json({ imageUrl: imageUrl });
//     req.body.photoUrl = imageUrl;
//       // url = newImage.imageUrl;

//     } else {
//       res.status(400).json({ error: 'No file uploaded' });
//     }
//   };





// const upload = multer({ storage }).single('image'); // 'image' should be the name attribute in your form

// // Set up static folder to serve uploaded files
// //   app.use(express.static('uploads'));

// // Handle POST requests to '/upload'
// router.post('/upload', async(req, res) => {
//     upload(req, res, async(err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Server Error');
//         } else {
//             // Check if file is present in the request
//             if (req.file){
//                 // Construct URL for the uploaded image
//                 const imageUrl = '/uploads/' + `http://localhost:4600/${req.file.filename}`;
//                 const newImage = new Image({
//                     imageUrl: imageUrl
//                 });


//                 await newImage.save();
//                 //res.send(`Image uploaded successfully. URL: ${imageUrl}`);
//                 req.body.photoUrl = imageUrl;
//             } else {
//                 res.status(400).send('Bad Request: No file uploaded');
//             }
//         }
//     });
// });

// multerMiddleware.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer
const upload = multer({
  storage: storage
}).single('image'); // 'image' should be the name attribute in your form

// Middleware function to handle file uploads
const multerMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
        console.log(req.file);
      // Check if file is present in the request
      if (req.file && req.file.filename) {
        // Add the imageUrl to the request object
        req.imageUrl = `http://localhost:4600/${req.file.filename}`;
        console.log('Image URL:', req.imageUrl);     
      }
      // Continue to the next middleware or route handler
      next();
    }
  });
};

module.exports = {multerMiddleware};