const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
  },
  password:{
    type:String,
    required:true,
  },
  personalityType:{
    type:String,
    default:null
  },
  savedRoadmaps:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Roadmap'
    }
  ]
},{timestamps:true})

const userModel=mongoose.model("users",userSchema);
module.exports=userModel;

// line 28 Automatically adds two fields to every document — createdAt and updatedAt — which Mongoose manages for you. 