"use client";

import React from 'react';
import {
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

const TestReport = () => {
  // Mock data for the report (same as used in Performance.tsx)
  const selectedReport = {
    title: 'Quadratic Equations - Quiz 1',
    date: '30 May, 2025',
    score: '92%',
    accuracy: '94%',
    status: 'Excellent',
    rank: 'Top 2%'
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F4F6FB] overflow-x-hidden font-sans text-slate-800">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E8E2FF] to-[#D4CAFF] blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F0F5FF] to-[#E2EBFF] blur-[80px] opacity-60 pointer-events-none" />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-8 py-12 min-h-screen flex flex-col">
        <div className="px-4 pt-4">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Back Button */}
              <button 
                onClick={() => window.close()}
                className="mb-8 flex items-center gap-3 text-slate-500 hover:text-[#5138EE] transition-all group"
              >
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#5138EE] group-hover:bg-[#5138EE] group-hover:text-white transition-all shadow-sm">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </div>
                <span className="font-bold text-sm">Return to Dashboard</span>
              </button>

              <div className="mb-10">
                <h1 className="text-[40px] font-black text-[#140E40] tracking-tight leading-tight">Test Report</h1>
                <p className="text-slate-500 mt-2 font-medium text-lg">Detailed performance breakdown for <span className="text-[#5138EE] font-bold">{selectedReport.title}</span></p>
              </div>

              {/* Report Content */}
                <div className="space-y-6 mb-8">
                  {/* Status Banner */}
                  <div className="bg-[#F0FDF4] border border-emerald-100 rounded-[32px] p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 text-white">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-800">Well done! You did well on this assessment.</h2>
                        <p className="text-slate-500 text-sm font-medium">Submitted on {selectedReport?.date || '22 May 2026'}, 11:15 AM</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 text-[13px] font-bold underline underline-offset-4">
                      Request Re-evaluation
                    </button>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'SCORE', value: '3/5', score: 60, color: 'text-orange-500' },
                      { label: 'ACCURACY', value: '61%', score: 61, color: 'text-orange-500' },
                      { label: 'TIME TAKEN', value: '12/20 m', score: 60, color: 'text-orange-500' },
                      { label: 'ATTEMPTED', value: '5/5', score: 100, color: 'text-blue-500' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-50" />
                            <circle 
                              cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" 
                              strokeDasharray={2 * Math.PI * 54} 
                              strokeDashoffset={(2 * Math.PI * 54) * (1 - stat.score / 100)} 
                              strokeLinecap="round" 
                              className={`${stat.color} transition-all duration-1000`}
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</span>
                            <span className="text-xl font-black text-slate-800 tracking-tight">{stat.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Questions Section */}
                  <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10">
                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-8 mb-8">Your Responses</h3>
                    
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <span className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Question 1 of 5</span>
                          <span className="px-3 py-1 bg-red-50 text-red-500 text-[11px] font-black rounded-lg">0/1</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-800">Which organelle is known as the 'Powerhouse of the Cell'?</h4>
                        <div className="space-y-3">
                          {[
                            { label: 'Nucleus', selected: false, correct: false },
                            { label: 'Ribosome', selected: true, correct: false },
                            { label: 'Mitochondria', selected: false, correct: true },
                            { label: 'Golgi Apparatus', selected: false, correct: false },
                          ].map((opt, i) => (
                            <div 
                              key={i} 
                              className={`p-5 rounded-2xl border flex items-center gap-4 ${opt.selected && !opt.correct ? 'bg-red-50 border-red-100' : opt.correct ? 'bg-emerald-50 border-emerald-100' : 'border-slate-100'}`}
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${opt.selected ? 'border-[#5138EE]' : 'border-slate-200'}`}>
                                {opt.selected && <div className="w-2.5 h-2.5 rounded-full bg-[#5138EE]"></div>}
                              </div>
                              <span className={`text-sm font-bold ${opt.selected && !opt.correct ? 'text-red-600' : opt.correct ? 'text-emerald-700' : 'text-slate-600'}`}>
                                {opt.label}
                                {opt.correct && <span className="ml-3 text-[10px] bg-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-widest">Correct Answer</span>}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </main>
    </div>
  );
};

export default TestReport;
