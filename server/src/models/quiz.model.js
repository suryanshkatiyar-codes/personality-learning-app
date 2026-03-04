const mongoose=require('mongoose');

const quizSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true,
  },
  answers:[
    {
      questionId:Number,
      selectedType:String,
    }
  ],
  personalityType:{
    type:String,
    enum:['VISUAL','READER','KINESTHETIC','SOCIAL'],
    required:true,
  },
  scores:{
    VISUAL:{type:Number,default:0},
    READER:{type:Number,default:0},
    KINESTHETIC:{type:Number,default:0},
    SOCIAL:{type:Number,default:0},
  }
},{timestamps:true});

const quizModel=mongoose.model("Quiz",quizSchema);