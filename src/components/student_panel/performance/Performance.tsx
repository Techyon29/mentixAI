"use client";

import React, { useState } from 'react';
import StudentLayout from '../StudentLayout';
import {
  FileText,
  Target,
  Clock,
  ArrowUpRight,
  FlaskConical,
  BookOpen,
  Globe,
  Search,
  Sparkles,
  Activity,
  AlertTriangle
} from 'lucide-react';

const Performance = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [timeRange, setTimeRange] = useState('This Month');

  const handleTestClick = () => {
    window.open('/student-dashboard/performance/report', '_blank');
  };

  const allTests = [
    { title: 'Quadratic Equations - Quiz 1', subject: 'Mathematics', date: '30 May, 2025', score: '92%', accuracy: '94%', status: 'Excellent', statusColor: 'text-green-600 bg-green-50', time: '42m', rank: 'Top 2%' },
    { title: 'Cell Structure & Functions', subject: 'Biology', date: '25 May, 2025', score: '78%', accuracy: '82%', status: 'Good', statusColor: 'text-blue-600 bg-blue-50', time: '35m', rank: 'Top 15%' },
    { title: 'Chemical Bonding Basics', subject: 'Chemistry', date: '20 May, 2025', score: '85%', accuracy: '88%', status: 'Very Good', statusColor: 'text-green-600 bg-green-50', time: '40m', rank: 'Top 8%' },
    { title: 'Trigonometry Basics', subject: 'Mathematics', date: '15 May, 2025', score: '65%', accuracy: '70%', status: 'Average', statusColor: 'text-orange-600 bg-orange-50', time: '30m', rank: 'Top 35%' },
    { title: 'Photosynthesis Process', subject: 'Biology', date: '10 May, 2025', score: '88%', accuracy: '90%', status: 'Excellent', statusColor: 'text-green-600 bg-green-50', time: '38m', rank: 'Top 5%' },
    { title: 'Linear Equations Test', subject: 'Mathematics', date: '05 May, 2025', score: '76%', accuracy: '80%', status: 'Good', statusColor: 'text-blue-600 bg-blue-50', time: '38m', rank: 'Top 18%' },
    { title: 'Coordinate Geometry Quiz', subject: 'Mathematics', date: '01 May, 2025', score: '50%', accuracy: '55%', status: 'N.I.', statusColor: 'text-orange-600 bg-orange-50', time: '30m', rank: 'Top 45%' },
    { title: 'Algebra Basics Test', subject: 'Mathematics', date: '28 Apr, 2025', score: '70%', accuracy: '75%', status: 'Good', statusColor: 'text-blue-600 bg-blue-50', time: '32m', rank: 'Top 21%' },
  ];

  const filteredTests = allTests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || test.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const recentResults = allTests.slice(0, 5);

  const subjects = [
    { name: 'Mathematics', score: '88%', rank: 'Top 8%', color: 'text-blue-600', bg: 'bg-blue-50', icon: Activity },
    { name: 'Science', score: '82%', rank: 'Top 15%', color: 'text-green-600', bg: 'bg-green-50', icon: FlaskConical },
    { name: 'English', score: '76%', rank: 'Top 20%', color: 'text-purple-600', bg: 'bg-purple-50', icon: BookOpen },
    { name: 'Social Science', score: '74%', rank: 'Top 25%', color: 'text-orange-600', bg: 'bg-orange-50', icon: Globe },
  ];



  const improveTopics = [
    { name: 'Trigonometry', score: 45 },
    { name: 'Coordinate Geometry', score: 50 },
    { name: 'Organic Chemistry', score: 55 },
    { name: 'Human Physiology', score: 60 },
    { name: 'Probability', score: 65 },
  ];

  return (
    <StudentLayout>
          <div className="max-w-5xl mx-auto w-full pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5 md:mb-8 gap-4 md:gap-6 px-1 mt-2">
              <div className="w-full">
                <h1 className="text-[15px] md:text-2xl font-black text-[#0D245B] tracking-tight uppercase">Performance</h1>
                <p className="text-[#5B779E] text-[9px] md:text-[11px] font-black uppercase tracking-widest mt-1">Proof your skills in real-time</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full md:w-auto">
                <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar w-full md:w-auto">
                  {['Overview', 'Test Progress', 'Weak Topics', 'Subject Performance'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 md:pb-2.5 px-2 md:px-3 mr-3 md:mr-4 font-black text-[9px] md:text-[11px] transition-all relative whitespace-nowrap uppercase tracking-widest ${activeTab === tab ? 'text-blue-600' : 'text-slate-400'}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-white border border-slate-100 rounded-xl px-3 md:px-4 py-1.5 md:py-2 font-black text-[10px] md:text-[11px] text-[#0D245B] uppercase tracking-widest shadow-sm outline-none w-full sm:w-auto mt-1 sm:mt-0"
                >
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                  <option value="Last 3 Months">Last 3 Months</option>
                  <option value="All Time">All Time</option>
                </select>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <div className="px-1">
                <div className="grid grid-cols-12 gap-5 mb-8">
                  {/* Latest Result Hero */}
                  <div className="col-span-12 bg-white border border-slate-100 p-4 md:p-8 rounded-[20px] md:rounded-[28px] shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 pointer-events-none transition-all duration-700"></div>

                      <div className="relative z-10 flex flex-col gap-5 md:gap-8">
                      <div className="w-full">
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                          <span className="px-2 md:px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[9px] md:text-[10px] font-black uppercase tracking-widest">LATEST TEST RESULT</span>
                          <span className="text-slate-400 text-[9px] md:text-[10px] font-black flex items-center gap-1.5 uppercase tracking-widest">
                            <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" /> 2H AGO
                          </span>
                        </div>
                        <h2 className="text-[16px] md:text-2xl font-black text-[#0D245B] mb-1 md:mb-2 uppercase tracking-tight">Quadratic Equations</h2>
                        <p className="text-[#5B779E] text-[9px] md:text-[11px] font-black uppercase tracking-widest mb-4 md:mb-6">Final Course Assessment</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 mb-5 md:mb-8 max-w-2xl">
                          {[
                            { label: 'Score', value: '92%', color: 'text-blue-600' },
                            { label: 'Status', value: 'PASS', color: 'text-emerald-600' },
                            { label: 'Accuracy', value: '94%', color: 'text-[#0D245B]' },
                            { label: 'Rank', value: '#2 / 45', color: 'text-blue-600' },
                          ].map((stat, i) => (
                            <div key={i} className="p-2 md:p-3 bg-slate-50/50 rounded-xl md:rounded-2xl border border-slate-50">
                               <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">{stat.label}</p>
                               <p className={`text-[11px] md:text-[13px] font-black uppercase ${stat.color}`}>{stat.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                          <button
                            onClick={() => handleTestClick()}
                            className="px-4 md:px-6 py-2.5 md:py-3 bg-[#0D245B] text-white font-black rounded-xl hover:bg-[#0D3694] transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-widest text-[10px] md:text-[11px]"
                          >
                            Detailed Report
                            <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          </button>
                          <button className="px-4 md:px-6 py-2.5 md:py-3 bg-white border border-slate-100 text-[#0D245B] font-black rounded-xl hover:bg-slate-50 transition-all text-[10px] md:text-[11px] uppercase tracking-widest shadow-sm">
                            Share Result
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity List */}
                  <div className="col-span-12 bg-white border border-slate-100 px-4 py-5 md:p-8 rounded-[20px] md:rounded-[28px] shadow-sm">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                      <div>
                        <h3 className="text-[13px] md:text-[16px] font-black text-[#0D245B] uppercase tracking-tight">Recent Test Progress</h3>
                        <p className="text-[#5B779E] text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-0.5">Your latest appearances</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('Test Progress')}
                        className="text-[9px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline underline-offset-4"
                      >
                        See All
                      </button>
                    </div>
                    
                    <div className="space-y-2 md:space-y-3">
                      {recentResults.map((result, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleTestClick()}
                          className="flex flex-col sm:flex-row items-center justify-between p-3 md:p-4 bg-white hover:bg-slate-50 border border-slate-50 hover:border-slate-100 rounded-xl md:rounded-2xl transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-[#0D245B] group-hover:text-white transition-all shrink-0">
                              <FileText className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <div>
                               <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-tight group-hover:text-blue-600 transition-colors">{result.title}</h4>
                               <div className="flex items-center gap-2 md:gap-3 mt-0.5 md:mt-1">
                                  <span className="text-[9px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest">{result.subject}</span>
                                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                  <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{result.date}</span>
                               </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-5 md:gap-8 w-full sm:w-auto mt-3 sm:mt-0 justify-between sm:justify-end border-t sm:border-t-0 border-slate-50 pt-2 sm:pt-0">
                             <div className="text-left sm:text-right">
                                <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Score & Acc</p>
                                <p className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase">{result.score} &bull; {result.accuracy}</p>
                             </div>
                             <span className={`px-2 md:px-3 py-1 rounded-md text-[8px] md:text-[9px] font-black uppercase tracking-widest border ${
                                result.status === 'Excellent' || result.status === 'Very Good' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                result.status === 'Good' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                             }`}>
                                {result.status}
                             </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-5">
                   {/* Subject Pulse */}
                   <div className="col-span-12 bg-white border border-slate-100 p-5 md:p-8 rounded-[20px] md:rounded-[28px] shadow-sm">
                      <div className="flex justify-between items-center mb-4 md:mb-6">
                        <h3 className="text-[13px] md:text-[16px] font-black text-[#0D245B] uppercase tracking-tight">Subject Pulse</h3>
                        <Activity className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {subjects.map((subj, i) => (
                           <div key={i} className="flex items-center justify-between gap-3 p-3 md:p-4 bg-slate-50/50 rounded-xl md:rounded-2xl border border-slate-50 hover:border-slate-100 transition-all cursor-pointer group">
                              <div className="flex items-center gap-3 min-w-0">
                                 <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl ${subj.bg} ${subj.color} flex items-center justify-center border border-current/10 shadow-sm group-hover:scale-105 transition-transform shrink-0`}>
                                    <subj.icon className="w-4 h-4 md:w-5 md:h-5" />
                                 </div>
                                 <div className="min-w-0">
                                   <h4 className="font-bold text-[#140E40] text-[11px] md:text-[13px] truncate">{subj.name}</h4>
                                   <p className="text-[8px] md:text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-0.5">{subj.rank}</p>
                                 </div>
                              </div>
                              <p className="text-[14px] md:text-[18px] font-black text-[#140E40] shrink-0">{subj.score}</p>
                          </div>
                        ))}
                      </div>
                   </div>


                  {/* Growth Areas */}
                  <div className="col-span-12 bg-white border border-slate-100 p-5 md:p-8 rounded-[20px] md:rounded-[28px] shadow-sm">
                    <div className="flex justify-between items-center mb-6 md:mb-10">
                       <div>
                          <h3 className="text-[13px] md:text-[16px] font-black text-[#0D245B] uppercase tracking-tight">Growth Areas</h3>
                          <p className="text-[#5B779E] text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-0.5">Focus for improvement</p>
                       </div>
                       <span className="px-2 md:px-3 py-1 bg-amber-50 text-amber-600 text-[8px] md:text-[9px] font-black rounded-md uppercase tracking-widest border border-amber-100">ACTION NEEDED</span>
                    </div>

                    <div className="space-y-5 md:space-y-8">
                       {improveTopics.map((topic, i) => (
                         <div key={i} className="group cursor-pointer">
                            <div className="flex justify-between items-center mb-2 md:mb-3">
                               <span className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-tight group-hover:text-blue-600 transition-all">{topic.name}</span>
                               <span className="text-[11px] md:text-[13px] font-black text-[#0D245B]">{topic.score}%</span>
                            </div>
                            <div className="w-full bg-slate-50 rounded-full h-2 p-0.5 border border-slate-50 overflow-hidden">
                                <div className="bg-amber-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${topic.score}%` }}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Test Progress' && (
              <div className="px-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                     <h3 className="text-[16px] font-black text-[#0D245B] uppercase tracking-tight">Test history</h3>
                     <p className="text-[#5B779E] text-[10px] font-black uppercase tracking-widest mt-0.5">Comprehensive list of performances</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:flex-1 md:w-64">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="SEARCH TESTS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[12px] font-black uppercase tracking-tight focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                      />
                    </div>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[11px] font-black text-[#0D245B] uppercase tracking-widest shadow-sm outline-none"
                    >
                      <option value="All">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTests.map((result, i) => (
                    <div key={i} className="bg-white border border-slate-100 p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#0D245B] group-hover:text-white transition-all">
                             <FileText className="w-5 h-5" />
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                             result.status === 'Excellent' || result.status === 'Very Good' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                             result.status === 'Good' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                             {result.status}
                          </span>
                       </div>
                       
                       <h4 className="text-[13px] font-black text-[#0D245B] uppercase tracking-tight group-hover:text-blue-600 cursor-pointer" onClick={() => handleTestClick()}>{result.title}</h4>
                       <p className="text-[10px] font-black text-[#5B779E] uppercase tracking-widest mb-4 mt-1">{result.subject} &bull; {result.date}</p>
                       
                       <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                          <div>
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Score & Acc</p>
                             <p className="text-[12px] font-black text-[#0D245B] uppercase">{result.score} &bull; {result.accuracy}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Time & Rank</p>
                             <p className="text-[12px] font-black text-blue-600 uppercase">{result.time} &bull; {result.rank}</p>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>

                {filteredTests.length === 0 && (
                  <div className="py-20 text-center bg-white border border-slate-100 rounded-[32px]">
                    <Search className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                    <p className="text-[#0D245B] font-black text-[14px] uppercase tracking-tight">No results found</p>
                    <p className="text-[#5B779E] text-[11px] font-black uppercase tracking-widest mt-1">Try adjusting your filters</p>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-3 mt-10">
                   <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0D245B] text-white font-black text-[12px]">1</button>
                   <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-[#0D245B] font-black text-[12px] hover:bg-slate-50 transition-all">2</button>
                   <button className="flex items-center justify-center px-4 h-10 rounded-xl bg-white border border-slate-100 text-[#0D245B] font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">Next</button>
                </div>
              </div>
            )}

            {activeTab === 'Weak Topics' && (
              <div className="px-1">
                 <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                       <h3 className="text-[18px] font-black text-[#0D245B] uppercase tracking-tight">Weak Topics Analysis</h3>
                       <button className="flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2">
                          Refresh <Sparkles className="w-3.5 h-3.5" />
                       </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { name: 'Trigonometry Identities', priority: 'CRITICAL', color: 'red' },
                        { name: 'Organic Chemistry Basics', priority: 'CRITICAL', color: 'red' },
                        { name: 'Quadratic Equations', priority: 'MEDIUM', color: 'amber' },
                        { name: 'Chemical Bonding', priority: 'MEDIUM', color: 'amber' },
                        { name: 'Coordinate Geometry', priority: 'MEDIUM', color: 'amber' },
                        { name: 'Linear Equations', priority: 'NORMAL', color: 'blue' },
                      ].map((item, i) => (
                        <div key={i} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all cursor-pointer group">
                           <div className="flex items-center gap-4 mb-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                 item.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                              } border border-current/10`}>
                                 <AlertTriangle className="w-5 h-5" />
                              </div>
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                 item.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                              }`}>{item.priority}</span>
                           </div>
                           <h4 className="text-[14px] font-black text-[#0D245B] uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{item.name}</h4>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 bg-[#0D245B] p-8 md:p-10 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                       <div className="flex items-center gap-6 relative z-10 w-full md:w-auto text-center md:text-left flex-col md:flex-row">
                          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                             <Target className="w-8 h-8 text-blue-200" />
                          </div>
                          <div>
                             <h4 className="text-[18px] font-black text-white uppercase tracking-tight">Ready to improve?</h4>
                             <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mt-1">Get personalized walkthrough with Mentix AI</p>
                          </div>
                       </div>
                       <button className="px-8 py-4 bg-white text-[#0D245B] font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95 relative z-10 w-full md:w-auto">
                          Ask Mentix AI
                       </button>
                    </div>
                 </div>
              </div>
            )}

          {activeTab === 'Subject Performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-1">
               <div className="lg:col-span-2 bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm">
                  <h3 className="text-[18px] font-black text-[#0D245B] uppercase tracking-tight mb-8">Subject performance</h3>
                  <div className="space-y-4">
                     {subjects.map((subj, i) => (
                       <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-[24px] border border-slate-50 hover:border-slate-100 transition-all cursor-pointer group">
                          <div className="flex items-center gap-4">
                             <div className={`w-12 h-12 rounded-2xl ${subj.bg} ${subj.color} flex items-center justify-center border border-current/10 shadow-sm group-hover:scale-105 transition-transform`}>
                                <subj.icon className="w-6 h-6" />
                             </div>
                             <div>
                                <h4 className="text-[13px] font-black text-[#0D245B] uppercase tracking-tight">{subj.name}</h4>
                                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">{subj.rank}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Avg Score</p>
                             <p className="text-[20px] font-black text-[#0D245B]">{subj.score}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm">
                  <h3 className="text-[18px] font-black text-[#0D245B] uppercase tracking-tight mb-8">Subject Insights</h3>
                  <div className="space-y-6">
                     {[
                       { name: 'Mathematics', desc: 'GREAT JOB! YOU ARE PERFORMING ABOVE 88% OF STUDENTS.', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
                       { name: 'Science', desc: 'KEEP PRACTICING TO MOVE UP TO THE TOP 10%.', icon: FlaskConical, color: 'text-green-500', bg: 'bg-green-50' },
                       { name: 'English', desc: 'FOCUS ON READING COMPREHENSION AND GRAMMAR.', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
                     ].map((insight, i) => (
                       <div key={i} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white transition-colors">
                          <div className="flex items-center gap-3 mb-3">
                             <insight.icon className={`w-4 h-4 ${insight.color}`} />
                             <h4 className="text-[12px] font-black text-[#0D245B] uppercase tracking-tight">{insight.name}</h4>
                          </div>
                          <p className="text-[11px] font-black text-[#5B779E] uppercase leading-relaxed tracking-widest">
                             {insight.desc}
                          </p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}
      </div>
    </StudentLayout>
  );
};

export default Performance;