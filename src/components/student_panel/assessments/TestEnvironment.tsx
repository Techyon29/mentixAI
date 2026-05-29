"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  AlertCircle, 
  LogOut,
  CheckCircle,
  HelpCircle,
  Video,
  Award,
  ArrowRight,
  Zap
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface TestEnvironmentProps {
  testName: string;
  questions: Question[];
  onFinish: (score: number) => void;
}

const TestEnvironment: React.FC<TestEnvironmentProps> = ({ testName, questions, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flags, setFlags] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const stopMediaStreams = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
  };

  useEffect(() => {
    // Start mini proctoring camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(console.error);

    // Prompt for screen sharing - typical for proctored tests
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          screenStreamRef.current = stream;
        })
        .catch(console.error);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Handle escaping fullscreen
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !isFinished) {
        setShowFullscreenWarning(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      stopMediaStreams();
    };
  }, [isFinished]);

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen()
      .then(() => setShowFullscreenWarning(false))
      .catch(err => {
        console.error("Failed to enter fullscreen:", err);
        alert("Please enable fullscreen to continue the test.");
      });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (qId: number, optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleFlag = (qId: number) => {
    setFlags(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmit = () => {
    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    // Stop all proctoring streams
    stopMediaStreams();
    
    // Calculate dummy score
    const calculatedScore = Math.floor(Math.random() * 40) + 60; // Random score for now
    setScore(calculatedScore);
    setIsFinished(true);
    setIsSubmitModalOpen(false);
  };

  const handleBackToDashboard = () => {
    onFinish(score);
  };

  const currentQuestion = questions[currentIdx];

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-[120] bg-white flex flex-col font-sans overflow-y-auto">
        {!showResults ? (
          <div className="min-h-screen bg-[#140E40] flex items-center justify-center p-4 md:p-6 text-white">
            <div className="max-w-3xl w-full text-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500 rounded-[30px] md:rounded-[40px] flex items-center justify-center mx-auto mb-6 md:mb-10 shadow-[0_20px_50px_rgba(16,185,129,0.4)]">
                <Award className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight">Assessment Complete!</h1>
              <p className="text-md md:text-xl text-slate-400 font-medium mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
                You've successfully completed the <span className="text-white font-bold">{testName}</span> assessment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <button 
                  onClick={() => setShowResults(true)}
                  className="flex-1 py-4 md:py-5 bg-white/10 text-white rounded-[20px] md:rounded-[24px] font-bold text-base md:text-lg hover:bg-white/20 transition-all border border-white/10"
                >
                  View Results
                </button>
                <button 
                  onClick={handleBackToDashboard}
                  className="flex-1 py-4 md:py-5 bg-white text-[#140E40] rounded-[20px] md:rounded-[24px] font-black text-base md:text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-2xl active:scale-95"
                >
                  Back to Dashboard <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-[#F9FBFA] animate-in slide-in-from-bottom-4 duration-500">
            {/* Image-style Header */}
            <div className="bg-[#E9F2E6] px-4 md:px-20 py-8 md:py-12">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 md:mb-12">
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-8 h-8 bg-[#8BA870] rounded-sm flex items-center justify-center mt-1 shrink-0">
                      <div className="w-4 h-2 border-l-2 border-b-2 border-white -rotate-45 mb-1" />
                    </div>
                    <div>
                      <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">Well done! You did well on this assessment.</h1>
                      <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">Submitted on 22 May 2026, 11:15 AM</p>
                    </div>
                  </div>
                  <button className="text-left md:text-right text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors">Request Re-evaluation</button>
                </div>

                {/* Circular Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
                  {[
                    { label: 'Score', value: `${Math.floor((score/100) * questions.length)}/${questions.length}`, percent: score },
                    { label: 'Accuracy', value: `${score}%`, percent: score },
                    { label: 'Time Taken', value: '12/20 m', percent: 60 },
                    { label: 'Attempted', value: `${Object.keys(answers).length}/${questions.length}`, percent: (Object.keys(answers).length / questions.length) * 100 },
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 md:gap-3">
                      <div className="relative w-28 h-28 md:w-36 md:h-36">
                        {/* Circle Background */}
                        <svg className="w-full h-full transform -rotate-10">
                          <circle
                            cx="56" cy="56" r="48"
                            stroke="#E2E8F0"
                            strokeWidth="8"
                            fill="transparent"
                            className="md:cx-[72] md:cy-[72] md:r-[60] md:stroke-width-[10]"
                          />
                          <circle
                            cx="56" cy="56" r="48"
                            stroke="#F5B54F"
                            strokeWidth="8"
                            strokeDasharray={300}
                            strokeDashoffset={300 - (300 * stat.percent) / 100}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-1000 ease-out md:cx-[72] md:cy-[72] md:r-[60] md:stroke-width-[10] md:stroke-dasharray-[377] md:stroke-dashoffset-[calc(377-(377*var(--percent))/100)]"
                            style={{ 
                              strokeDasharray: typeof window !== 'undefined' && window.innerWidth >= 768 ? 377 : 300,
                              strokeDashoffset: (typeof window !== 'undefined' && window.innerWidth >= 768 ? 377 : 300) - ((typeof window !== 'undefined' && window.innerWidth >= 768 ? 377 : 300) * stat.percent) / 100
                            } as any}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                          <span className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">{stat.label}</span>
                          <span className="text-sm md:text-base font-black text-slate-800">{stat.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-[#D6E6D1]" />

            {/* Custom Response Body */}
            <div className="max-w-6xl mx-auto px-6 md:px-20 py-10 md:py-16">
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <h2 className="text-base md:text-lg font-bold text-slate-700">Your Responses</h2>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="space-y-12 md:space-y-20">
                {questions.map((q, qIdx) => {
                  const userAnswer = answers[q.id];
                  const isActuallyCorrect = 2; // Mock logic
                  const isCorrect = userAnswer === isActuallyCorrect; 
                  
                  return (
                    <div key={q.id} className="animate-in fade-in slide-in-from-bottom-4 transition-all">
                      <div className="flex items-center justify-between mb-4 md:mb-8">
                        <span className="text-xs md:text-sm font-bold text-slate-600">Question {qIdx + 1} of {questions.length}</span>
                        <div className={`px-2 md:px-3 py-1 rounded text-[10px] md:text-xs font-black ${isCorrect ? 'bg-[#E6F4E6] text-[#4A7D4A]' : 'bg-red-50 text-red-600'}`}>
                          {isCorrect ? '1/1' : '0/1'}
                        </div>
                      </div>

                      <h3 className="text-base md:text-lg font-medium text-slate-800 leading-relaxed mb-6 md:mb-10">{q.text}</h3>
                      
                      <div className="grid gap-3 md:gap-4 max-w-2xl">
                        {q.options.map((option, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          const isCorrectOpt = optIdx === isActuallyCorrect;

                          let bulletColor = "border-slate-300";
                          let textColor = "text-slate-600";
                          
                          if (isSelected) {
                            bulletColor = isCorrectOpt ? "bg-emerald-500 border-emerald-500" : "bg-red-500 border-red-500";
                            textColor = isCorrectOpt ? "text-emerald-700 font-bold" : "text-red-700 font-bold";
                          } else if (isCorrectOpt) {
                            textColor = "text-emerald-600 font-bold";
                          }

                          return (
                            <div key={optIdx} className="flex items-center gap-3 md:gap-4 group cursor-default">
                              <div className={`w-3 h-3 rounded-full border-2 shrink-0 transition-all ${bulletColor}`} />
                              <span className={`text-sm tracking-tight transition-all ${textColor}`}>{option}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-8 md:mt-12 h-px bg-slate-100 w-full" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 md:mt-20 flex justify-center">
                <button 
                  onClick={handleBackToDashboard}
                  className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
                >
                  Return to Dashboard <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] bg-[#F4F6FB] flex flex-col font-sans overflow-hidden">
      {/* Fullscreen Warning Overlay */}
      {showFullscreenWarning && (
        <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#140E40] mb-3">Fullscreen Required</h2>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              To ensure test integrity, you must remain in fullscreen mode. Please click below to resume your assessment.
            </p>
            <button
              onClick={enterFullscreen}
              className="w-full py-4 bg-[#5138EE] text-white rounded-2xl font-bold text-lg hover:bg-[#432ec4] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Re-enter Fullscreen
            </button>
          </div>
        </div>
      )}

      {/* Test Header */}
      <header className="h-auto md:h-20 bg-white border-b border-slate-200 px-4 md:px-8 py-3 md:py-0 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-lg md:text-xl shrink-0">
            {testName.charAt(0)}
          </div>
          <div className="min-w-0">
            <h1 className="text-base md:text-xl font-bold text-[#140E40] truncate">{testName}</h1>
            <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest">Ongoing Assessment</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 md:gap-8 w-full md:w-auto">
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 bg-red-50 text-red-600 rounded-xl md:rounded-2xl border border-red-100 shadow-sm animate-pulse">
            <Clock className="w-4 h-4 md:w-5 h-5" />
            <span className="text-base md:text-lg font-black font-mono">{formatTime(timeLeft)}</span>
          </div>
          
          <button 
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 md:px-8 py-2.5 md:py-3.5 bg-[#5138EE] text-white text-sm md:text-base font-bold rounded-xl md:rounded-2xl hover:bg-[#432ec4] transition-all shadow-lg active:scale-95"
          >
            Submit <span className="hidden sm:inline">Test</span>
          </button>
        </div>
      </header>

      {/* Main Test Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Navigation Sidebar - Hidden on mobile, can be toggled if needed but keeping it simple for now */}
        <aside className="hidden lg:flex w-80 bg-white border-r border-slate-200 flex-col p-6 shadow-sm z-10">
          <div className="mb-8">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Question Overview</h3>
            <div className="grid grid-cols-5 gap-3">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flags[q.id];
                const isActive = currentIdx === idx;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-10 rounded-xl font-bold text-sm transition-all border-2 flex items-center justify-center relative ${
                      isActive ? 'border-[#5138EE] bg-[#5138EE] text-white' : 
                      isAnswered ? 'border-emerald-100 bg-emerald-50 text-emerald-600' : 
                      'border-slate-100 bg-slate-50 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto p-4 bg-slate-50 rounded-[28px] border border-slate-100 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-3">
              <Video className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Proctoring</span>
            </div>
            <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-white shadow-md relative">
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover mirror" />
              <div className="absolute bottom-2 right-2 flex gap-1">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Question Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-12 bg-[#F4F6FB]">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
              <span className="w-fit px-4 py-1.5 bg-blue-100 text-[#5138EE] text-[10px] md:text-[11px] font-black rounded-full uppercase tracking-wider">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <button 
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`flex items-center gap-2 text-xs md:text-sm font-bold transition-colors ${flags[currentQuestion.id] ? 'text-orange-500' : 'text-slate-400 hover:text-orange-500'}`}
              >
                <Flag className="w-4 h-4" />
                {flags[currentQuestion.id] ? 'Flagged for Review' : 'Flag Question'}
              </button>
            </div>

            <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-6 md:p-10 mb-6 md:mb-8 transition-all hover:shadow-xl">
              <h2 className="text-lg md:text-2xl font-bold text-[#140E40] leading-snug mb-6 md:mb-10">
                {currentQuestion.text}
              </h2>

              <div className="space-y-3 md:space-y-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(currentQuestion.id, idx)}
                      className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left flex items-center justify-between transition-all group ${
                        isSelected 
                          ? 'border-[#5138EE] bg-blue-50/50 shadow-md ring-4 ring-[#5138EE]/5' 
                          : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center font-bold border-2 transition-all ${
                          isSelected ? 'bg-[#5138EE] border-[#5138EE] text-white' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-blue-300'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={`text-sm md:text-base font-bold ${isSelected ? 'text-[#140E40]' : 'text-slate-600'}`}>{option}</span>
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#5138EE]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="flex items-center gap-2 px-4 md:px-8 py-3 md:py-4 text-slate-500 text-sm md:text-base font-bold rounded-xl md:rounded-2xl hover:bg-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 h-5" /> Previous
              </button>
              <button
                disabled={currentIdx === questions.length - 1}
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="flex items-center gap-2 px-6 md:px-10 py-3 md:py-4 bg-white text-[#140E40] border border-slate-200 text-sm md:text-base font-bold rounded-xl md:rounded-2xl hover:border-blue-300 transition-all hover:shadow-lg disabled:opacity-30 active:scale-95"
              >
                Next <span className="hidden sm:inline">Question</span> <ChevronRight className="w-4 h-4 md:w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-[120] bg-[#140E40]/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl max-w-lg w-full p-6 md:p-10 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 text-[#5138EE] rounded-[28px] md:rounded-[32px] flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-inner">
               <HelpCircle className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-[#140E40] mb-3 md:mb-4">Submit Assessment?</h3>
            <p className="text-slate-500 font-medium mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
              You have answered <span className="text-[#5138EE] font-bold">{Object.keys(answers).length} out of {questions.length}</span> questions.
              Are you sure you want to finish the test?
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <button 
                onClick={() => setIsSubmitModalOpen(false)}
                className="py-3 md:py-4 rounded-xl md:rounded-2xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="py-3 md:py-4 rounded-xl md:rounded-2xl font-bold bg-[#5138EE] text-white shadow-xl shadow-blue-500/20 hover:bg-[#432ec4] transition-all transform hover:-translate-y-1"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestEnvironment;
