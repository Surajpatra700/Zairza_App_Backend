const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

//generate random name
const randomImageName = () => crypto.randomBytes(16).toString('hex')

const imageFile = new mongoose.Schema({
  iname : {
    type : String,
    required : true
  },
  url : {
    type : String,
    default : ""
  } 
});

const Image = mongoose.model('Image', imageFile);


//cloud config
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucket_name = process.env.BUCKET_NAME
const bucket_region = process.env.BUCKET_REGION
const access_key = process.env.ACCESS_KEY
const secret_access_key = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
  region: bucket_region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_access_key
  }
})

// // Configuring multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Where to save the uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`); // Rename the file
//   }
// });

const m_storage = multer.memoryStorage()

const upload = multer({ storage: m_storage });

// let url;
router.post('/upload', upload.single('image'), async (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  })

  if (req.file) {
    const imageName = randomImageName()
    const params = {
      Bucket: bucket_name,
      Key: imageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    const newImage = new Image({
      iname: imageName,
      url : ""
    });
    await newImage.save();

    res.send({ image: newImage })
  }
});


router.get('/getImages', async (req, res) => {
  const images = await Image.find()

  for(const image of images){
    const getObjectParams = {
      Bucket : bucket_name,
      Key : image.iname
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    image.url = url
  } 

  res.json({images})
})


module.exports = router;
// module.exports = { url }