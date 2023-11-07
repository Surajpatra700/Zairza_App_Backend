const express = require("express");
const router = express.Router();
const eventSchema = require("../models/eventSchema");

// ******************** POST request for uploading data ******************

try{
    router.post("/uploadEvent", async(req,res)=>{
        const newEvent = new eventSchema({
            title: req.body.title,
            date_and_time: req.body.date_and_time,
            wing: req.body.wing,
            event_img: req.body.event_img,
            description: req.body.description,
            senior_incharge: req.body.senior_incharge,
        });    

        const savedEvent = await newEvent.save();

        console.log(savedEvent);
        
        res.json(savedEvent);
    });
}catch(error){
    res.send(`${error}`);
}

// ************************** Retrieving data ************************

try{
    router.get("/retrieveEvent", async(req,res)=>{
        const data = await eventSchema.find();
        res.json(data);
    });
}catch(error){
    res.send(`${error}`);
}

// ****************************** Updating data *********************

try {
    router.put('/updateEvent', async (req, res) => {
        // Remove the unnecessary new eventSchema instance
        // You should create the newEvent object directly
        const newEvent = {
            title: req.body.title,
            date_and_time: req.body.date_and_time,
            event_img: req.body.event_img,
            description: req.body.description,
            senior_incharge: req.body.senior_incharge,
        };

        // Assuming 'JWT_TOKEN' should be replaced with the actual ID you want to update
        const idToUpdate = 'JWT_TOKEN'; // Replace with the actual ID

        // Use findByIdAndUpdate with the correct parameters
        const data = await eventSchema.findByIdAndUpdate(idToUpdate, newEvent, { new: true });

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