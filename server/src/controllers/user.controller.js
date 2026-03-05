const userModel=require('../models/user.model');

async function profile(req,res){
  try{
  const userId=req.user.id;
  const user=await userModel.findById(userId).select('-password');
  
  if(!user){
    return res.status(404).json({message:"User doesn't exist"});
  }

  res.status(200).json({
    message:"User fetched successfully",
    user
  })

  }catch(err){
    return res.status(500).json({message:"Internal server error",err})
  }
}

module.exports={profile};