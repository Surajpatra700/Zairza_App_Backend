const express = require("express");
const router = express.Router();
const resourceSchema = require("../models/resourceSchema");

// ******************** POST request for uploading data ******************

try{
    router.post("/uploadResources", async(req,res)=>{
        const newResource = new resourceSchema({
            roadmaps: {
                googleDriveLinks: req.body.roadmaps.googleDriveLinks,
            },
            videos: {
                youtubeLinks: req.body.videos.youtubeLinks,
            },
            session_presentations: req.body.session_presentations,
            domain: req.body.domain,
        });    

        const savedEvent = await newResource.save();

        console.log(savedEvent);
        
        res.json(savedEvent);
    });
}catch(error){
    res.send(`${error}`);
}

// ************************** Retrieving data ************************

try{
    router.get("/retrieveResources", async(req,res)=>{
        const data = await resourceSchema.find();
        res.json(data);
    });
}catch(error){
    res.send(`${error}`);
}

// ****************************** Updating data *********************

try {
    router.put('/updateResources/:id', async (req, res) => {
        // Remove the unnecessary new eventSchema instance
        // You should create the newEvent object directly
        const newEvent = {
            roadmaps: {
                googleDriveLinks: req.body.roadmaps.googleDriveLinks,
            },
            videos: {
                youtubeLinks: req.body.videos.youtubeLinks,
            },
            session_presentations: req.body.session_presentations,
            domain: req.body.domain,
        };

        // Assuming 'JWT_TOKEN' should be replaced with the actual ID you want to update
        const idToUpdate = req.params.id; // Replace with the actual ID

        // Use findByIdAndUpdate with the correct parameters
        const data = await resourceSchema.findByIdAndUpdate(idToUpdate, newEvent, { new: true });

        if (!data) {
            // Handle the case where the event with the provided ID is not found
            res.status(404).json({ message: 'Event not found' });
        } else {
            res.status(200).json(data);
        }
    });
} catch (error) {
    console.log(error);
}

module.exports = router;