import React from 'react';
import { Question } from '../questions';
import { BookOpen, Check, HelpCircle, User, Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuestionCardProps {
  question: Question;
  revealed: boolean;
  onReveal?: () => void;
  onNext?: () => void;
  isAdmin?: boolean;
}

export function QuestionCard({ question, revealed, onReveal, onNext, isAdmin = false }: QuestionCardProps) {
  const letters = ['A', 'B', 'C', 'D'];

  const getCategoryLabel = (type: Question['type']) => {
    switch (type) {
      case 'multiple_choice':
        return { text: 'Multiple Choice', color: 'bg-indigo-150 text-indigo-700 border-indigo-200' };
      case 'true_false':
        return { text: 'True or False', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'who_said_this':
        return { text: 'Who Said This?', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'finish_the_verse':
        return { text: 'Finish the Verse', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'character_trivia':
        return { text: 'Character Trivia', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
  };

  const currentCategory = getCategoryLabel(question.type);

  return (
    <div className="bg-white border-8 border-yellow-400 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden text-center flex flex-col items-center" id={`question-card-${question.id}`}>
      {/* Visual background pattern to feel like papyrus or a manuscript */}
      <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />

      {/* Card Header */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 border-b-4 border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-yellow-600" />
          <span className="font-mono text-xs font-black text-yellow-600 tracking-wider uppercase">
            Genesis trivia (Gen 1-44)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-xl border-2 ${currentCategory.color}`}>
            {currentCategory.text}
          </span>
          <span className="bg-slate-900 font-extrabold text-white text-xs px-3 py-1 rounded-sm shadow-md">
            QUESTION {question.id}
          </span>
        </div>
      </div>

      {/* Question Text (Projector-Sized) */}
      <div className="mb-8 w-full">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-slate-800 font-black tracking-tight leading-tight select-all">
          "{question.question}"
        </h2>
      </div>

      {/* Options Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctOptionIndex;
          
          let cardStyle = "border-4 border-slate-100 rounded-xl text-center font-bold text-slate-650 hover:bg-slate-50 cursor-pointer bg-white transition-all";
          let badgeStyle = "bg-slate-100 text-slate-600 border-2 border-slate-200";

          // If answer is revealed
          if (revealed) {
            if (isCorrect) {
              cardStyle = "border-4 border-emerald-500 bg-emerald-50 rounded-xl text-center font-bold text-emerald-800 shadow-[0_4px_0_rgba(16,185,129,0.3)]";
              badgeStyle = "bg-emerald-500 text-white border-none";
            } else {
              cardStyle = "border-4 border-slate-100 bg-slate-50 text-slate-400 opacity-60 rounded-xl text-center";
              badgeStyle = "bg-slate-200 text-slate-400 border-none";
            }
          }

          return (
            <motion.div
              key={index}
              className={`rounded-xl p-4 flex flex-row items-center gap-4 transition-all duration-300 text-left ${cardStyle}`}
              whileHover={!revealed ? { scale: 1.02, y: -2 } : {}}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${badgeStyle}`}>
                {revealed && isCorrect ? <Check className="w-4 h-4" /> : letters[index]}
              </span>
              <span className="text-base md:text-lg font-black select-all">{option}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Scripture Reference Metadata tag */}
      <div className="mt-2 mb-6 bg-slate-100 px-4 py-2 rounded-full text-slate-500 text-xs font-mono uppercase tracking-tighter">
        Reference: {question.reference}
      </div>

      {/* Revealing Area */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full bg-emerald-500/10 border-4 border-emerald-500/30 rounded-2xl p-5 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold tracking-wide text-xs uppercase mb-1">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Scripture Reference & Comment</span>
              </div>
              <h4 className="text-xl font-black text-emerald-900 leading-snug">
                {question.reference}
              </h4>
              {question.explanation && (
                <p className="text-sm text-slate-700 font-bold mt-1">
                  {question.explanation}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Row */}
      <div className="flex justify-center gap-4 mt-2 w-full">
        {!revealed && onReveal && (
          <button
            onClick={onReveal}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_#4338ca] hover:translate-y-[2px] hover:shadow-[0_4px_0_#4338ca] active:translate-y-[6px] active:shadow-none transition-all cursor-pointer"
            id="reveal-btn"
          >
            REVEAL ANSWER
          </button>
        )}
        
        {revealed && onNext && (
          <button
            onClick={onNext}
            className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_#059669] hover:translate-y-[2px] hover:shadow-[0_4px_0_#059669] active:translate-y-[6px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            id="next-question-btn"
          >
            <span>NEXT QUESTION</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
