const roadmapModel = require('../models/roadmap.model');
const userModel=require('../models/user.model')
const { generateRoadmap:generateRoadmapAI } = require('../services/gemini.service');

async function generateRoadmap(req, res) {
  try {
    const userId = req.user.id;
    const user=await userModel.findById(userId);
    const personalityType=user.personalityType;
    const { skill } = req.body;
    const roadmap = await generateRoadmapAI(personalityType, skill);

    const newRoadmap = await roadmapModel.create({
      userId,
      skill,
      personalityType,
      roadmap,
    })

    res.status(201).json({ message: "New roadmap created", roadmap });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", err });
  }

}

async function viewRoadmaps(req, res) {
  try {
    const userId=req.user.id;
    const roadmap=await roadmapModel.find({userId});
    res.status(200).json({message:"Your recent roadmap is",roadmap});
  } catch (err) {
    return res.status(500).json({ message: "Server error" ,err});
  }
}

module.exports = { generateRoadmap, viewRoadmaps };