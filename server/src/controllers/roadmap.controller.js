const roadmapModel = require('../models/roadmap.model');
const userModel = require('../models/user.model')
const { generateRoadmap: generateRoadmapAI, recommendedRoadmap } = require('../services/groq.service');

async function generateRoadmap(req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    const personalityType = user.personalityType;
    const { skill } = req.body;
    const roadmap = await generateRoadmapAI(personalityType, skill);

    const newRoadmap = await roadmapModel.create({
      userId,
      skill,
      personalityType,
      roadmap,
      completed:false,
    })

    res.status(201).json({ message: "New roadmap created", roadmap });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", err });
  }

}

async function viewRoadmaps(req, res) {
  try {
    const userId = req.user.id;
    const roadmap = await roadmapModel.find({ userId });
    res.status(200).json({ message: "Your recent roadmaps is", roadmap });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
}

async function getRoadmap(req, res) {

  try {
    const roadmapId = req.params.id;
    const userId = req.user.id;
    const roadmap = await roadmapModel.findOne({ _id: roadmapId, userId });

    if(!roadmap){
      return res.status(404).json({message:"The given roadmap doesn't exist"});
    }

    res.status(200).json({
      message: "Roadmap fetched successfully",
      roadmap,
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", err })
  }
}

async function deleteRoadmap(req, res) {
  try {
    const roadmapId = req.params.id;
    const userId = req.user.id;
    const roadmap = await roadmapModel.findOneAndDelete({ _id: roadmapId, userId });

    if(!roadmap){
      return res.status(404).json({message:"The given roadmap doesn't exist"});
    }

    return res.status(200).json({
      message: "The roadmap is deleted successfully",
      roadmap,
    })
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
}

async function markComplete(req,res){
  try{
    const userId=req.user.id;
    const roadmapId=req.params.id;
    const roadmap=await roadmapModel.findOneAndUpdate({_id:roadmapId,userId},{ $set: {completed :true, completedAt:Date.now()}},{new : true});
    if(!roadmap){
      return res.status(404).json({message:"Roadmap does not exist"})
    }
    return res.status(200).json({message:"This roadmap is completed by the user",roadmap})

    }catch(err){
      return res.status(500).json({message: "Server Error",err})
    }
  }

async function viewRecommendations(req,res){
  try{
    const userId=req.user.id;
    const user=await userModel.findById(userId);
    const personalityType=user.personalityType;
    const completedRoadmaps=await roadmapModel.find({userId,completed:true});
    if(!completedRoadmaps){
      return res.status(404).json({message:"No completed roadmaps yet",err})
    }
    const completedSkills=completedRoadmaps.map(r=>r.skill).join(",");
    const recommendations=await recommendedRoadmap(personalityType,completedSkills);
    return res.status(201).json({message:"Recommendations fetched successfully",recommendations});
  }catch(err){
    return res.status(500).json({message:"Server Error",err});
  }
}

async function generateRecommendedRoadmap(req,res){
  try{
    const userId=req.user.id;
    const user=await userModel.findById(userId);
    const {personalityType}=user;
    const skill=req.params.skill;
    const roadmap=await generateRoadmapAI(personalityType,skill);
    const newRoadmap=await roadmapModel.create({
      userId,
      skill,
      personalityType,
      roadmap,
      completed:false,
    })
    return res.status(201).json({message:"New roadmap generated",newRoadmap});
  }catch(err){
    return res.status(500).json({message:"Server Error",err});
  }
}

module.exports = { generateRoadmap, viewRoadmaps, getRoadmap, deleteRoadmap, markComplete, viewRecommendations, generateRecommendedRoadmap };