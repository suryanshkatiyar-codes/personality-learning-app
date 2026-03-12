const mongoose = require('mongoose');

const roadmapSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  skill: {
    type: String,
    required: true,
  },
  personalityType: {
    type: String,
    enum: ['VISUAL', 'READER', 'KINESTHETIC', 'SOCIAL'],
    required: true,
  },
  roadmap: [
    {
      day: { type: Number },
      topic: { type: String },
      completed: { type: Boolean, default: true },
      subtasks: [
        {
          task: { type: String },
          completed: { type: Boolean, default: false }
        }
      ]
    }
  ],
  completed: {
    type: Boolean,
    required: true,
  },
  completedAt: {
    type: Date,
  },
  quizHistory:[
    {
    attemptDate:{type:Date,default:Date.now},
    totalQuestions:{type:Number},
    score:{type:number},
    percentage:{type:number},
    }
  ],
}, { timestamps: true });

const roadmapModel = mongoose.model("roadmaps", roadmapSchema);

module.exports = roadmapModel;