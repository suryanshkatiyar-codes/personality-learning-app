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
      const response = await API.post(`/api/roadmap/${id}/quiz/submit`, { questions, answers });
      navigate("/roadmaps");
    } catch (err) {
      console.log("Failed to submit quiz", err);
      setSubmitting(false);
    }
  }

  if (questions.length === 0) return (
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center'>
      <p className='text-zinc-500 text-xs tracking-widest uppercase animate-pulse'>
        Generating your quiz...
      </p>
    </div>
  )

  if (submitting) return (
    <div className='min-h-screen bg-zinc-950 text-white flex justify-center items-center'>
      <p className='text-zinc-500 text-xs tracking-widest uppercase animate-pulse'>
        Submitting your answers...
      </p>
    </div>
  )

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter(a => a !== undefined).length;

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
              {answeredCount} answered
            </p>
          </div>
          <div className='w-full bg-zinc-800 h-px'>
            <div
              className='bg-yellow-400 h-px transition-all duration-500'
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className='mb-10'>
          <p className='text-zinc-500 text-xs tracking-widest uppercase mb-4'>
            Roadmap Quiz
          </p>
          <h2 className='text-2xl font-light leading-relaxed'>
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className='flex flex-col gap-3 mb-10'>
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => answerHandler(option, currentIndex)}
              className={`border px-6 py-4 text-left text-sm tracking-wide transition-all duration-200 active:scale-95
                ${answers[currentIndex] === option
                  ? 'border-yellow-400 bg-yellow-400/10 text-white'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-yellow-400 hover:text-white'
                }`}
            >
              <span className='text-yellow-400 text-xs tracking-widest uppercase mr-4'>
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className='flex justify-between items-center'>
          <button
            onClick={() => setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
            className='text-zinc-500 hover:text-yellow-400 text-xs tracking-widest uppercase transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed'
          >
            ← Prev
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className='text-zinc-500 hover:text-yellow-400 text-xs tracking-widest uppercase transition-colors duration-200'
            >
              Next →
            </button>
          ) : (
            <button
              onClick={submit}
              className='bg-yellow-400 text-zinc-950 text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-yellow-300 transition-colors duration-200 active:scale-95'
            >
              Submit Quiz
            </button>
          )}
        </div>

        {/* Error */}
        {isError && (
          <p className='text-red-400 text-xs tracking-widest uppercase text-center mt-6'>
            Please answer all questions before submitting
          </p>
        )}

      </div>
    </div>
  )
}

export default RoadmapQuiz