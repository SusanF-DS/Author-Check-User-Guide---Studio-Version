import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/guideData';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export const MicrolearningQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];
  const isAnswered = selectedAnswers[currentIdx] !== undefined;
  const currentSelectedOption = isAnswered ? currentQ.options[selectedAnswers[currentIdx]] : null;

  const totalQuestions = QUIZ_QUESTIONS.length;
  const totalCorrect = Object.entries(selectedAnswers).filter(
    ([idx, ansIdx]) => QUIZ_QUESTIONS[Number(idx)].options[ansIdx].isCorrect
  ).length;

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return; // Prevent changing after answer
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [currentIdx]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <GraduationCap className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white">
              Author Check Knowledge Checks & Scenarios
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Reinforce key triage rules, threshold nuances, and false-positive protections through scenario questions.
          </p>
        </div>

        {/* Progress & Score */}
        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs shrink-0">
          <div>
            <div className="text-[10px] text-slate-400 font-mono">Progress</div>
            <div className="text-white font-bold font-mono">
              Question {currentIdx + 1} of {totalQuestions}
            </div>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <div className="text-[10px] text-slate-400 font-mono">Score</div>
            <div className="text-cyan-400 font-bold font-mono">
              {totalCorrect} / {Object.keys(selectedAnswers).length} correct
            </div>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
        {/* Step indicator */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <span className="font-mono text-cyan-400 text-xs font-semibold">
            {currentQ.context}
          </span>
          <div className="flex items-center gap-1">
            {QUIZ_QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIdx
                    ? 'bg-cyan-400 ring-2 ring-cyan-400/30'
                    : selectedAnswers[i] !== undefined
                      ? QUIZ_QUESTIONS[i].options[selectedAnswers[i]].isCorrect
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                      : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Statement */}
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
            {currentQ.question}
          </h4>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswers[currentIdx] === idx;
            let buttonStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';

            if (isAnswered) {
              if (opt.isCorrect) {
                buttonStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 shadow-sm';
              } else if (isSelected && !opt.isCorrect) {
                buttonStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200 shadow-sm';
              } else {
                buttonStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-3 ${buttonStyle}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </div>

                {isAnswered && (
                  <div className="shrink-0 mt-0.5">
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Pedagogical Note */}
        {isAnswered && currentSelectedOption && (
          <div className={`p-4 rounded-xl border animate-in fade-in duration-200 space-y-2 ${
            currentSelectedOption.isCorrect
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
              : 'bg-rose-950/20 border-rose-500/30 text-rose-100'
          }`}>
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              {currentSelectedOption.isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Spot on!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-300">Not quite right</span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentSelectedOption.explanation}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-cyan-300">
              <Lightbulb className="w-3.5 h-3.5" />
              <span className="font-semibold">Golden Job Aid Rule: </span>
              <span className="text-slate-200">{currentQ.jobAidRule}</span>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Quiz</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={currentIdx === totalQuestions - 1}
              onClick={() => setCurrentIdx(prev => prev + 1)}
              className="px-3 py-1.5 text-xs rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
