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

  if (questions.length === 0) return (
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center'>
      <p className='text-zinc-500 text-xs tracking-widest uppercase animate-pulse'>
        Loading questions...
      </p>
    </div>
  )

  if (currentIndex >= questions.length) return (
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center'>
      <p className='text-zinc-500 text-xs tracking-widest uppercase animate-pulse'>
        Submitting your answers...
      </p>
    </div>
  )

  const currentQuestion = questions[currentIndex];

  return (
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center px-4'>
      <div className='w-full max-w-xl'>

        {/* Progress Bar */}
        <div className='mb-10'>
          <div className='flex justify-between items-center mb-2'>
            <p className='text-zinc-500 text-xs tracking-widest uppercase'>
              Question {currentIndex + 1} of {questions.length}
            </p>
            <p className='text-zinc-600 text-xs'>
              {Math.round(((currentIndex) / questions.length) * 100)}%
            </p>
          </div>
          <div className='w-full bg-zinc-800 h-px'>
            <div
              className='bg-yellow-400 h-px transition-all duration-500'
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className='mb-10'>
          <p className='text-zinc-500 text-xs tracking-widest uppercase mb-4'>
            Personality Quiz
          </p>
          <h2 className='text-2xl font-light leading-relaxed'>
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className='flex flex-col gap-3'>
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(currentQuestion.id, option)}
              className='border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-yellow-400 hover:text-white px-6 py-4 text-left text-sm tracking-wide transition-all duration-200 active:scale-95'
            >
              <span className='text-yellow-400 text-xs tracking-widest uppercase mr-4'>
                {String.fromCharCode(65 + i)}
              </span>
              {option.text}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Quiz

//    in useEffect:- try/catch must always be INSIDE the async function
//    because async errors only occur when the function runs (after await),
//    putting try/catch outside won't catch them