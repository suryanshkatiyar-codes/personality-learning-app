const express=require('express');
const quizController=require('../controllers/quiz.controller');
const {protect}=require('../middlewares/auth.middleware');

const router=express.Router();

router.get('/questions',protect,quizController.getQuestions);
router.get('/results',protect,quizController.getResults);
router.post('/submit',protect,quizController.submitQuiz);

module.exports=router;