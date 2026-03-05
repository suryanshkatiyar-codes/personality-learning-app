const express=require('express');
const roadmapController=require('../controllers/roadmap.controller');
const {protect}=require('../middlewares/auth.middleware');
const router=express.Router();

router.post('/generate',protect,roadmapController.generateRoadmap);
router.get('/view',protect,roadmapController.viewRoadmaps)
router.get('/:id',protect,roadmapController.getRoadmap);
router.delete('/:id',protect,roadmapController.deleteRoadmap);

module.exports=router;