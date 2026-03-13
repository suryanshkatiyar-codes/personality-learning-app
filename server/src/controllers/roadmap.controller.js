const roadmapModel = require('../models/roadmap.model');
const userModel = require('../models/user.model')
const { generateRoadmap: generateRoadmapAI, recommendedRoadmap, roadmapQuiz } = require('../services/groq.service');

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
      completed: false,
    })

    res.status(201).json({ message: "New roadmap created", newRoadmap });
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

    if (!roadmap) {
      return res.status(404).json({ message: "The given roadmap doesn't exist" });
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

    if (!roadmap) {
      return res.status(404).json({ message: "The given roadmap doesn't exist" });
    }

    return res.status(200).json({
      message: "The roadmap is deleted successfully",
      roadmap,
    })
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
}

async function markRoadmapComplete(req, res) {
  try {
    const userId = req.user.id;
    const roadmapId = req.params.id;
    let roadmap = await roadmapModel.findOne({ _id: roadmapId, userId });
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap does not exist" })
    }
    const allDaysCompleted = roadmap.roadmap.every(
      (day) => day.completed === true
    );
    if (allDaysCompleted) {
      roadmap = await roadmapModel.findOneAndUpdate({ _id: roadmapId, userId }, { $set: { completed: true, completedAt: Date.now() } }, { returnDocument: 'after' });
    }
    else {
      return res.status(400).json({ message: "Finish all the daily tasks in order to mark it completed" });
    }
    return res.status(200).json({ message: "This roadmap is completed by the user", roadmap })

  } catch (err) {
    return res.status(500).json({ message: "Server Error", err })
  }
}

// revise
async function viewRecommendations(req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    const personalityType = user.personalityType;
    const completedRoadmaps = await roadmapModel.find({ userId, completed: true });
    if (!completedRoadmaps) {
      return res.status(404).json({ message: "No completed roadmaps yet", err })
    }
    const completedSkills = completedRoadmaps.map(r => r.skill).join(",");
    const recommendations = await recommendedRoadmap(personalityType, completedSkills);
    return res.status(201).json({ message: "Recommendations fetched successfully", recommendations });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
}

async function generateRecommendedRoadmap(req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    const { personalityType } = user;
    const skill = req.params.skill;
    const roadmap = await generateRoadmapAI(personalityType, skill);
    const newRoadmap = await roadmapModel.create({
      userId,
      skill,
      personalityType,
      roadmap,
      completed: false,
    })
    return res.status(201).json({ message: "New roadmap generated", newRoadmap });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
}
// revise
async function completedTask(req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    const roadmapId = req.params.id;
    const { dayIndex, subtaskIndex, completed } = req.body;
    let roadmap = await roadmapModel.findOneAndUpdate(
      { _id: roadmapId, userId },
      {
        $set: {
          [`roadmap.${dayIndex}.subtasks.${subtaskIndex}.completed`]: completed,
        }
      },
      { returnDocument: "after" }
    );

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap does not exist" });
    }

    // Check if all subtasks in that day are completed
    const allSubtasksCompleted = roadmap.roadmap[dayIndex].subtasks.every(
      (subtask) => subtask.completed === true
    );

    if (allSubtasksCompleted) {
      roadmap = await roadmapModel.findOneAndUpdate(
        { _id: roadmapId, userId },
        {
          $set: {
            [`roadmap.${dayIndex}.completed`]: true
          }
        },
        { returnDocument: "after" }
      );
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const lastActivityDate = new Date(user.lastActivityDate);
      const isYesterday = (lastActivityDate.getDate() === yesterday.getDate() && (lastActivityDate.getMonth() === yesterday.getMonth() && lastActivityDate.getFullYear() === yesterday.getFullYear()));
      const isToday = (lastActivityDate.getDate() === today.getDate() && (lastActivityDate.getMonth() === today.getMonth() && lastActivityDate.getFullYear() === today.getFullYear()));
      if (isToday) {
        // nothing because today is the lastActivityDate
      }
      else if (isYesterday) {
        user.currentStreak++;
        user.longestStreak = Math.max(user.currentStreak, user.longestStreak);
        user.lastActivityDate = Date.now();
        await user.save();
      }
      else {
        user.currentStreak = 1;
        user.lastActivityDate = today;
        await user.save();
      }
    }


    return res.status(200).json({ message: "Task marked completed", roadmap });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
}

async function quizOnRoadmap(req, res) {
  try {
    const userId = req.user.id;
    const roadmapId = req.params.id;
    const roadmap = await roadmapModel.findOne({ _id: roadmapId, userId });
    if (!roadmap) {
      return res.status(400).json({ message: "Roadmap does not exist" });
    }
    const { skill } = roadmap;
    const completedDays = roadmap.roadmap.filter(day => day.completed === true);
    let completedTopics = completedDays.map((day) => (day.topic));
    const quiz = await roadmapQuiz(skill, completedTopics);
    return res.status(200).json({ message: "Quiz generated successfully", quiz });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
}

async function submitRoadmapQuiz(req, res) {
  try {
    const userId = req.user.id;
    const roadmapId = req.params.id;
    const roadmap = await roadmapModel.findOne({ _id: roadmapId, userId });
    if (!roadmap) {
      return res.status(400).json({ message: "Roadmap does not exist" });
    }
    const { answers } = req.body;
    const { questions } = req.body;

    let score = answers.filter((ans, index) => ans === questions[index].answer).length;
    const percentage = Math.round((score / questions.length) * 100);

    roadmap.quizHistory.push({
      attemptDate: Date.now(),
      totalQuestions: questions.length,
      score,
      percentage,
    })

    await roadmap.save();

    return res.status(201).json({ message: "Quiz attempted successfully", roadmap });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err })
  }
}

module.exports = { generateRoadmap, viewRoadmaps, getRoadmap, deleteRoadmap, markRoadmapComplete, viewRecommendations, generateRecommendedRoadmap, completedTask, quizOnRoadmap, submitRoadmapQuiz };