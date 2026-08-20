import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Flame, Clock } from 'lucide-react';
import { QUIZZES } from '../data/quizzes';
import { PageHeaderNav } from '../components/common/PageHeaderNav';
import { Quiz } from '../types';

export const QuizzesPage: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !selectedQuiz) return;
    const currentQ = selectedQuiz.questions[currentQIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;
    if (currentQIndex < selectedQuiz.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      // Trigger celebratory confetti if score is high
      if (score >= selectedQuiz.questions.length / 2) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-8">
      {/* Back & Close Navigation */}
      <PageHeaderNav 
        title={selectedQuiz ? selectedQuiz.title : "Trivia Arena"} 
        parentLabel={selectedQuiz ? "ALL QUIZZES" : "DISCOVER ARENA"} 
        parentRoute={selectedQuiz ? undefined : "/"} 
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
          <Trophy className="w-4 h-4" /> DHH KNOWLEDGE ARENA
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight">
          HIP-HOP TRIVIA QUIZZES
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
          Test your memory on lyrics, underground lore, producer tags, and regional scene origins.
        </p>
      </div>

      {!selectedQuiz ? (
        /* Quiz Selection Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUIZZES.map((quiz) => (
            <div
              key={quiz.id}
              className="p-6 rounded-3xl bg-[#111116] border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                    {quiz.difficulty}
                  </span>
                  <span className="text-zinc-400">{quiz.questions.length} QUESTIONS</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white">{quiz.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{quiz.description}</p>
              </div>

              <button
                onClick={() => startQuiz(quiz)}
                className="w-full py-2.5 rounded-xl bg-[#ff334b] hover:bg-rose-600 text-white text-xs font-bold font-mono tracking-wider uppercase transition-colors"
              >
                Start Challenge
              </button>
            </div>
          ))}
        </div>
      ) : !quizFinished ? (
        /* Active Question Card */
        <div className="p-6 sm:p-10 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl space-y-6">
          {/* Progress & Header */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-zinc-800">
            <span>{selectedQuiz.title.toUpperCase()}</span>
            <span className="text-rose-400 font-bold">
              QUESTION {currentQIndex + 1} OF {selectedQuiz.questions.length}
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
            {selectedQuiz.questions[currentQIndex].question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {selectedQuiz.questions[currentQIndex].options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === selectedQuiz.questions[currentQIndex].correctAnswer;
              let btnStyle = 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700';

              if (isSelected) {
                btnStyle = 'bg-rose-950/30 border-rose-500 text-white';
              }
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/50 border-rose-600 text-rose-300';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Submit */}
          {isAnswerSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 space-y-1 font-mono"
            >
              <div className="font-bold text-amber-400">EXPLANATION:</div>
              <p>{selectedQuiz.questions[currentQIndex].explanation}</p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="text-xs font-mono text-zinc-500 hover:text-white"
            >
              Quit Quiz
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-[#ff334b] disabled:opacity-40 text-white font-bold text-xs uppercase font-mono"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase font-mono"
              >
                {currentQIndex < selectedQuiz.questions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score Card */
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111116] border border-zinc-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              QUIZ COMPLETED!
            </h2>
            <p className="text-sm font-mono text-zinc-400 mt-1">
              You scored <strong className="text-rose-400 text-xl">{score}</strong> out of {selectedQuiz.questions.length}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 max-w-sm mx-auto text-xs font-mono text-zinc-300">
            {score === selectedQuiz.questions.length
              ? '👑 DHH ENCYCLOPEDIA LEVEL! You know your bars inside out.'
              : score >= selectedQuiz.questions.length / 2
              ? '🔥 Certified Gully Head! Solid hip-hop knowledge.'
              : 'Keep studying the Flow Lab and explore the 6 Eras Timeline!'}
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => startQuiz(selectedQuiz)}
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold font-mono uppercase flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={() => setSelectedQuiz(null)}
              className="px-6 py-3 rounded-xl bg-[#ff334b] hover:bg-rose-600 text-white text-xs font-bold font-mono uppercase"
            >
              Pick Another Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

