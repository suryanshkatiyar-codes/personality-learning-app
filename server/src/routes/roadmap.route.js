const express=require('express');
const roadmapController=require('../controllers/roadmap.controller');
const {protect}=require('../middlewares/auth.middleware');
const router=express.Router();

router.post('/generate', protect, roadmapController.generateRoadmap);
router.get('/view', protect, roadmapController.viewRoadmaps);
router.get('/recommendations', protect, roadmapController.viewRecommendations);
router.patch('/progress/:id', protect, roadmapController.completedTask);
router.post('/recommendations/:skill', protect, roadmapController.generateRecommendedRoadmap);
router.patch('/completed/:id', protect, roadmapController.markRoadmapComplete);
router.get('/:id/quiz', protect, roadmapController.quizOnRoadmap);          // ← moved up
router.post('/:id/quiz/submit', protect, roadmapController.submitRoadmapQuiz); // ← moved up
router.get('/:id', protect, roadmapController.getRoadmap);                  // ← now below
router.delete('/:id', protect, roadmapController.deleteRoadmap);
// these types of routes (last 2) should always be at the bottom


module.exports=router;