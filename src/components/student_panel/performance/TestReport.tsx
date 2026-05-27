"use client";

import React from 'react';
import StudentLayout from '../StudentLayout';
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
    <StudentLayout>
        <div className="max-w-4xl mx-auto w-full px-1 pt-4 pb-12">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Back Button */}
              <button 
                onClick={() => window.history.back()}
                className="mb-8 flex items-center gap-3 text-[#0D245B] hover:text-blue-600 transition-all group px-1"
              >
                <div className="w-8 h-8 rounded-xl border border-slate-100 flex items-center justify-center group-hover:bg-[#0D245B] group-hover:text-white transition-all shadow-sm">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
                <span className="font-black text-[11px] uppercase tracking-widest">Dashboard</span>
              </button>

              <div className="mb-10 px-1 mt-2">
                <h1 className="text-xl md:text-2xl font-black text-[#0D245B] tracking-tight uppercase">Test Performance Report</h1>
                <p className="text-[#5B779E] text-[11px] font-black uppercase tracking-widest mt-1">Detailed Analysis: <span className="text-blue-600">{selectedReport.title}</span></p>
              </div>

              {/* Report Content */}
                <div className="space-y-6 mb-10">
                  {/* Status Banner */}
                  <div className="bg-white border border-slate-100 rounded-[24px] p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left w-full group">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-[15px] font-black text-[#0D245B] uppercase tracking-tight leading-tight mb-1">Excellent Performance!</h2>
                        <p className="text-[#5B779E] text-[10px] font-black uppercase tracking-widest">Submitted on {selectedReport?.date || '30 MAY 2025'}, 11:15 AM</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-[10px] font-black uppercase tracking-widest whitespace-nowrap hover:underline underline-offset-4 w-full md:w-auto py-2 md:py-0">
                      Request evaluation
                    </button>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'SCORE', value: '3/5', score: 60, color: 'text-blue-500' },
                      { label: 'ACCURACY', value: '61%', score: 61, color: 'text-blue-500' },
                      { label: 'TIME', value: '12/20 M', score: 60, color: 'text-blue-500' },
                      { label: 'ATTEMPTED', value: '5/5', score: 100, color: 'text-blue-500' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-50" />
                            <circle 
                              cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="5" fill="transparent" 
                              strokeDasharray="251.2" 
                              strokeDashoffset={251.2 * (1 - stat.score / 100)} 
                              strokeLinecap="round" 
                              className={`${stat.color} transition-all duration-1000`}
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</span>
                            <span className="text-[15px] font-black text-[#0D245B] tracking-tight">{stat.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Questions Section */}
                  <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm p-6 md:p-10">
                    <h3 className="text-[16px] font-black text-[#0D245B] border-b border-slate-50 pb-6 mb-8 uppercase tracking-tight">Response Review</h3>
                    
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question 1 of 5</span>
                          <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-lg border border-red-100">0/1 PTS</span>
                        </div>
                        <h4 className="text-[14px] font-black text-[#0D245B] leading-snug uppercase tracking-tight">Which organelle is known as the 'Powerhouse of the Cell'?</h4>
                        
                        <div className="space-y-3">
                          {[
                            { label: 'Nucleus', selected: false, correct: false },
                            { label: 'Ribosome', selected: true, correct: false },
                            { label: 'Mitochondria', selected: false, correct: true },
                            { label: 'Golgi Apparatus', selected: false, correct: false },
                          ].map((opt, i) => (
                            <div 
                              key={i} 
                              className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                                opt.selected && !opt.correct ? 'bg-red-50/50 border-red-100' : 
                                opt.correct ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50/50 border-slate-50'
                              }`}
                            >
                               <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                                  opt.selected ? 'bg-[#0D245B] border-[#0D245B] text-white' : 'border-slate-200'
                               }`}>
                                  {opt.selected && <CheckCircle className="w-3.5 h-3.5" />}
                               </div>
                               <div className="flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                     <span className={`text-[13px] font-black uppercase tracking-tight ${
                                        opt.selected && !opt.correct ? 'text-red-700' : 
                                        opt.correct ? 'text-emerald-700' : 'text-[#0D245B]'
                                     }`}>
                                        {opt.label}
                                     </span>
                                     {opt.correct && (
                                        <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md uppercase tracking-widest">Correct Answer</span>
                                     )}
                                  </div>
                               </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Explanation block */}
                        <div className="p-5 bg-blue-50/30 rounded-2xl border border-blue-50 mt-6">
                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Mentix Insight</p>
                           <p className="text-[12px] font-black text-[#0D245B] uppercase leading-relaxed tracking-tight">Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell's biochemical reactions.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
    </StudentLayout>
  );
};

export default TestReport;
