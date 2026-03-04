const questions = require('../data/questions');
const quizModel = require('../models/quiz.model');
const userModel = require('../models/user.model');

async function getQuestions(req, res) {
  try {
    res.status(200).json({
      message: "message retrieved succefully",
      questions
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
}

function computePersonality(answers) {
  let scores = {
    VISUAL: 0,
    READER: 0,
    KINESTHETIC: 0,
    SOCIAL: 0,
  }
  answers.forEach(element => {
    scores[element.selectedType]++;
  });

  // Find highest
  const dominant = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b);

  return {
    scores,
    dominantType: dominant[0],  // e.g. "VISUAL"
    // dominantScore: dominant[1]  // e.g. 5
  };
}

async function submitQuiz(req, res) {
  try {
    const { answers } = req.body;
    const userId = req.user._id;

    if (answers.length !== questions.length) {
      return res.status(400).json({
        message: "Please answer all the questions",
      })
    }

    const { dominantType, scores } = computePersonality(answers);

    const ans = await quizModel.create({
      userId,
      answers,
      personalityType: dominantType,
      scores
    })

    const user = await userModel.findByIdAndUpdate(userId, { personalityType: dominantType });

    res.status(200).json({
      message: "Quiz submitted successfully",
      personalityType: dominantType,
      scores,
      quizId: ans._id
    })
  } catch (err) {
    return res.status(400).json({ message: "An error occured", err });
  }
}

async function getResults(req, res) {
  try {
    const userId = req.user._id;
    const quiz = await quizModel.findOne({ userId }).sort({ createdAt: -1 }); // find by userId field + sort by latest
    if (!quiz) {
      return res.status(404).json({ message: "No quiz result found" });
    }
    res.status(200).json({
      message: "result fetched successfully",
      quiz
    })
  } catch (err) {
    return res.status(500).json({ message: "server error", err })
  }
}

module.exports={getQuestions,getResults,submitQuiz};
