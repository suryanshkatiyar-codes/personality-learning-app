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
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide'>
      <p>Loading questions...</p>
    </div>
  )

  if (currentIndex >= questions.length) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide'>
      <p>Submitting your answers...</p>
    </div>
  )

  const currentQuestion = questions[currentIndex];
  const progress = Math.round((currentIndex / questions.length) * 100);

  return (
    <div className='h-screen w-full max-w-full flex flex-col px-2 py-4 overflow-x-hidden mt-20'>

      <div className='h-screen w-full flex flex-col justify-center items-center bg-[#505081] rounded-2xl px-4 py-8 md:px-10 md:py-10'>

        {/* Header pill */}
        <div className='w-full max-w-xl mb-6 -mt-5'>
          <p className='font-bold tracking-wider px-3 py-2 bg-[#272757] rounded-2xl inline-block'>
            Personality Quiz
          </p>
        </div>

        {/* Card */}
        <div className='w-full max-w-xl rounded-2xl overflow-hidden bg-[#272757] border border-[#3a3a7a]'>

          {/* Progress section */}
          <div className='px-6 py-4 border-b border-[#3a3a7a]'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-[14px] font-semibold tracking-[0.09em] uppercase text-[#7070a8]'>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className='text-[14px] font-semibold tracking-[0.09em] uppercase text-yellow-400'>
                {progress}%
              </span>
            </div>
            <div className='w-full h-1.5 rounded-full overflow-hidden bg-[#3a3a7a]'>
              <div
                className='h-full rounded-full bg-yellow-400 transition-all duration-500'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className='px-6 py-6 border-b border-[#3a3a7a]'>
            <h2 className='text-xl font-medium tracking-wide text-[#f0f0ff] leading-relaxed'>
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className='flex flex-col px-6 py-4 gap-3'>
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(currentQuestion.id, option)}
                className='w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium tracking-wide text-[#a0a0c8] hover:text-[#f0f0ff] hover:scale-[1.02] hover:bg-[#5c5c94] hover:border-yellow-400/40 transition-all duration-200 active:scale-[0.98] cursor-pointer bg-[#505081] border border-[rgba(134,134,172,0.2)]'
              >
                <span className='text-yellow-400 text-[15px] font-bold tracking-[0.09em] uppercase mr-4'>
                  {String.fromCharCode(65 + i)}
                </span>
                {option.text}
              </button>
            ))}
          </div>

          {/* Back button */}
          {currentIndex > 0 && (
            <div className='px-6 pb-5'>
              <button
                onClick={goToPrev}
                className='text-sm font-semibold tracking-wide uppercase text-black transition-all duration-300 cursor-pointer bg-yellow-400 hover:bg-yellow-300 px-6 py-2 ease-in-out rounded-2xl active:scale-90'
              >
                ← Back
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Quiz

//    in useEffect:- try/catch must always be INSIDE the async function
//    because async errors only occur when the function runs (after await),
//    putting try/catch outside won't catch them
