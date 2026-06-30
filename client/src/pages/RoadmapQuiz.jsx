import React, { useEffect, useState } from 'react'
import API from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const RoadmapQuiz = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/api/roadmap/${id}/quiz`);
        setQuestions(response.data.quiz);
      } catch (err) {
        console.log("Failed to fetch the questions");
      }
    }
    fetchQuestions();
  }, [])

  const answerHandler = (newAnswer, index) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[index] = newAnswer;
      return updated;
    });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }

  const submit = async () => {
    try {
      if (questions.length !== answers.length || answers.some(a => a === undefined)) {
        setIsError(true);
        return;
      }
      setSubmitting(true);
      await API.post(`/api/roadmap/${id}/quiz/submit`, { questions, answers });
      navigate("/roadmaps");
    } catch (err) {
      console.log("Failed to submit quiz", err);
      setSubmitting(false);
    }
  }

  if (questions.length === 0) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide'>
      <p>Generating your quiz...</p>
    </div>
  )

  if (submitting) return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-wide'>
      <p>Submitting your answers...</p>
    </div>
  )

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter(a => a !== undefined).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className='h-screen w-full max-w-full flex flex-col px-2 py-4 overflow-x-hidden mt-20'>

      <div className='w-full h-full flex justify-center items-center bg-[#505081] rounded-2xl px-4 py-8'>

        {/* Card */}
        <div className='w-full max-w-xl rounded-2xl overflow-hidden bg-[#272757] border border-[#3a3a7a]'>

          {/* Card header pill */}
          <div className='px-6 py-4 border-b border-[#3a3a7a]'>
            <p className='font-bold tracking-wider px-3 py-2 bg-[#505081] rounded-2xl inline-block'>
              Roadmap Quiz
            </p>
          </div>

          {/* Progress */}
          <div className='px-6 py-4 border-b border-[#3a3a7a]'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-[14px] font-semibold tracking-[0.09em] uppercase text-[#7070a8]'>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className='text-[14px] font-semibold tracking-[0.09em] uppercase text-yellow-400'>
                {answeredCount} answered · {progress}%
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
          <div className='flex flex-col px-6 py-4 gap-3 border-b border-[#3a3a7a]'>
            {currentQuestion.options.map((option, i) => {
              const isSelected = answers[currentIndex] === option;
              return (
                <button
                  key={i}
                  onClick={() => answerHandler(option, currentIndex)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium tracking-wide transition-all duration-200 active:scale-[0.98] cursor-pointer border
                    ${isSelected
                      ? 'bg-yellow-400/10 border-yellow-400/40 text-[#f0f0ff]'
                      : 'bg-[#505081] border-[rgba(134,134,172,0.2)] text-[#a0a0c8] hover:bg-[#5c5c94] hover:border-yellow-400/40 hover:text-[#f0f0ff]'
                    }`}
                >
                  <span className='text-yellow-400 text-[15px] font-bold tracking-[0.09em] uppercase mr-4'>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className='flex justify-between items-center px-6 py-4'>
            <button
              onClick={() => setCurrentIndex(prev => prev - 1)}
              disabled={currentIndex === 0}
              className='text-sm font-semibold tracking-wide uppercase text-black transition-all duration-300 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 bg-yellow-400 hover:bg-yellow-300 px-6 py-2 rounded-2xl'
            >
              ← Prev
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className='text-sm font-semibold tracking-wide uppercase text-black transition-all duration-300 cursor-pointer bg-yellow-400 hover:bg-yellow-300 px-6 py-2 ease-in-out rounded-2xl active:scale-90'
              >
                Next →
              </button>
            ) : (
              <button
                onClick={submit}
                className='font-bold tracking-wider px-5 py-2 bg-[#505081] rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-yellow-400/30 text-yellow-400'
              >
                Submit Quiz →
              </button>
            )}
          </div>

          {/* Error */}
          {isError && (
            <div className='px-6 pb-4'>
              <p className='text-[12px] font-medium tracking-wide text-center text-[#f09595]'>
                Please answer all questions before submitting
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default RoadmapQuiz
