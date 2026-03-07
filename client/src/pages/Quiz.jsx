import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Quiz = () => {

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (answers.length === questions.length && questions.length > 0) {
      submitQuiz();
    }
  }, [answers])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get('/api/quiz/questions');
        setQuestions(response.data.questions);
      }
      catch (err) {
        console.log("Failed to fetch questions", err);
      }
    }
    fetchQuestions();
  }, [])

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers(prev => [...prev, { questionId: questionId, selectedType: selectedOption.type }]);
    goToNext();
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev + 1);
  }

  const goToPrev = () => {
    setCurrentIndex(prev => prev - 1);
  }

  const submitQuiz = async () => {
    try {
      await API.post('/api/quiz/submit', { answers });
      navigate('/dashboard');
    } catch (err) {
      console.log("Submition failed");
    }
  }

  if (questions.length === 0) return <div>Loading questions...</div>
  if (currentIndex >= questions.length) return <div>Submitting...</div>

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <div>
        <div>Question number {currentIndex + 1}</div>
        <div>{currentQuestion.question}</div>
        {currentQuestion.options.map((option, i) => (
          <button key={i} onClick={() => {
            handleAnswer(currentQuestion.id, option);
          }}>{option.text}</button>
        ))}
      </div>
    </div>
  )
}

export default Quiz

//    in useEffect:- try/catch must always be INSIDE the async function
//    because async errors only occur when the function runs (after await),
//    putting try/catch outside won't catch them
