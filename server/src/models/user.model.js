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
      ref:'roadmaps'
    }
  ],
  currentStreak:{
    type:Number,
    default:0,
  },
  longestStreak:{
    type:Number,
    default:0,
  },
  lastActivityDate:{
    type:Date,
  },
},{timestamps:true})

const userModel=mongoose.model("users",userSchema);
module.exports=userModel;

// line 28 Automatically adds two fields to every document — createdAt and updatedAt — which Mongoose manages for you. 