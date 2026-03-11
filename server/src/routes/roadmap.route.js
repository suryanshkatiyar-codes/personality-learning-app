const express=require('express');
const roadmapController=require('../controllers/roadmap.controller');
const {protect}=require('../middlewares/auth.middleware');
const router=express.Router();

router.post('/generate',protect,roadmapController.generateRoadmap);
router.get('/view',protect,roadmapController.viewRoadmaps)
router.get('/recommendations',protect,roadmapController.viewRecommendations);
router.get('/:id',protect,roadmapController.getRoadmap);
router.delete('/:id',protect,roadmapController.deleteRoadmap);
router.post('/recommendations/:skill',protect,roadmapController.generateRecommendedRoadmap);
router.patch('/complete/:id', protect, roadmapController.markComplete);


module.exports=router;