const express=require('express');
const roadmapController=require('../controllers/roadmap.controller');
const {protect}=require('../middlewares/auth.middleware');
const router=express.Router();

router.post('/generate',protect,roadmapController.generateRoadmap);
router.get('/view',protect,roadmapController.viewRoadmaps)
router.get('/recommendations',protect,roadmapController.viewRecommendations);
router.patch('/progress/:id',protect,roadmapController.completedTask);
router.post('/recommendations/:skill',protect,roadmapController.generateRecommendedRoadmap);
router.patch('/completed/:id', protect, roadmapController.markComplete);
router.get('/:id',protect,roadmapController.getRoadmap);
router.delete('/:id',protect,roadmapController.deleteRoadmap);


module.exports=router;