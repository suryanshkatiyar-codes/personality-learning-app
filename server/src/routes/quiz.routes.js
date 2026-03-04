const express=require('express');
const quizController=require('../controllers/quiz.controller');
const {protect}=require('../middlewares/protect.quiz');

const router=express.Router();

router.get('/questions',quizController.getQuestions);
router.get('/results',protect,quizController.getResults);
router.post('/submit',protect,quizController.submitQuiz);

module.exports=router;