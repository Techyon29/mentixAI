"use client";

import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import {
  TrendingUp,
  CheckCircle,
  FileText,
  ChevronRight,
  Target,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  FlaskConical,
  BookOpen,
  Globe,
  Languages,
  Search,
  Filter,
  Sparkles,
  Info,
  Activity,
  AlertCircle,
  Award,
  AlertTriangle
} from 'lucide-react';

const Performance = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [timeRange, setTimeRange] = useState('This Month');

  const handleTopicClick = (topicName: string) => {
    setSearchTerm(topicName);
    setActiveTab('Test Progress');
  };

  const handleTestClick = (test: any) => {
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

  const ScoreCircle = ({ score, size = "md" }: { score: number, size?: "sm" | "md" | "lg" }) => {
    const radius = size === "lg" ? 45 : 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    const sizePx = size === "lg" ? "120" : "90";

    return (
      <div className="relative flex items-center justify-center">
        <svg width={sizePx} height={sizePx} className="transform -rotate-90">
          <circle
            cx={size === "lg" ? "60" : "45"}
            cy={size === "lg" ? "60" : "45"}
            r={radius}
            stroke="currentColor"
            strokeWidth={size === "lg" ? "8" : "6"}
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx={size === "lg" ? "60" : "45"}
            cy={size === "lg" ? "60" : "45"}
            r={radius}
            stroke="currentColor"
            strokeWidth={size === "lg" ? "8" : "6"}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-blue-600 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`${size === "lg" ? "text-2xl" : "text-xl"} font-bold text-slate-900`}>{score}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F4F6FB] overflow-hidden font-sans text-slate-800">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E8E2FF] to-[#D4CAFF] blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F0F5FF] to-[#E2EBFF] blur-[80px] opacity-60 pointer-events-none" />

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen p-3 gap-6">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-3 pb-8 custom-scrollbar">
          <Navbar />

          <div className="px-4">
            {/* Header Section */}
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="text-[32px] font-bold text-[#140E40] tracking-tight">Performance</h1>
                <p className="text-slate-500 mt-1 font-medium">Detailed analysis of your assessments and progress</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-white/60 backdrop-blur-md p-1 rounded-2xl border border-white shadow-sm">
                  {['Overview', 'Test Progress', 'Weak Topics', 'Subject Performance'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 text-[14px] font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-[#5138EE] text-white shadow-[0_4px_12px_rgba(81,56,238,0.3)]' : 'text-slate-500 hover:bg-white/80'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
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
              <>
                <div className="grid grid-cols-12 gap-6 mb-6">
                  {/* Latest Result Hero - Full Width Highlight */}
                  <div className="col-span-12 bg-gradient-to-br from-[#5138EE] to-[#140E40] p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none group-hover:bg-white/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/20">LATEST TEST RESULT</span>
                          <span className="text-blue-300 text-[12px] font-semibold flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> 2 hours ago
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 leading-tight tracking-tight">Quadratic Equations <br /><span className="text-blue-200">Final Assessment</span></h2>
                        <div className="flex flex-wrap gap-8 mt-8">
                          <div className="flex flex-col">
                            <span className="text-blue-200/60 text-[11px] font-bold uppercase tracking-wider mb-2">Status</span>
                            <span className="flex items-center gap-2 font-bold text-lg uppercase tracking-wider">
                              <CheckCircle className="w-5 h-5 text-emerald-400" /> PASS
                            </span>
                          </div>
                          <div className="w-px h-12 bg-white/10 self-center hidden sm:block"></div>
                          <div className="flex flex-col">
                            <span className="text-blue-200/60 text-[11px] font-bold uppercase tracking-wider mb-2">Duration</span>
                            <span className="font-bold text-lg">42m 15s</span>
                          </div>
                          <div className="w-px h-12 bg-white/10 self-center hidden sm:block"></div>
                          <div className="flex flex-col">
                            <span className="text-blue-200/60 text-[11px] font-bold uppercase tracking-wider mb-2">Global Rank</span>
                            <span className="font-bold text-lg">#2 <span className="text-sm font-medium text-blue-200/60 ml-1">/ 45 Students</span></span>
                          </div>
                        </div>
                        <div className="mt-10 flex gap-4">
                          <button
                            onClick={() => handleTestClick(allTests[0])}
                            className="px-8 py-3.5 bg-white text-[#5138EE] font-black rounded-2xl hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 uppercase tracking-widest text-[12px]"
                          >
                            View Detailed Report
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                          <button className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2 text-[12px] uppercase tracking-widest">
                            Share Result
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-[48px] shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
                          <ScoreCircle score={92} size="lg" />
                        </div>
                        <div className="mt-6 text-center">
                          <span className="text-4xl font-bold block group-hover:animate-pulse transition-all">A+</span>
                          <span className="text-blue-200/40 text-[11px] font-bold uppercase tracking-wider mt-2 block">PERFORMANCE LEVEL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Grid - Full Width */}
                  <div className="col-span-12 bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 mt-2">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-[#140E40]">Recent Test Progress</h3>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Detailed breakdown of your last 5 appearances</p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('Test Progress');
                          setSearchTerm('');
                          setSelectedSubject('All');
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-black text-[#5138EE] bg-blue-50/50 hover:bg-[#5138EE] hover:text-white rounded-2xl border border-blue-100/50 transition-all uppercase tracking-widest shadow-sm"
                      >
                        View All Tests
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentResults.map((result, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleTestClick(result)}
                          className="flex items-center justify-between p-5 bg-white hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 border border-slate-50 hover:border-blue-100 rounded-[28px] transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-slate-50 rounded-[22px] flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-[#5138EE] group-hover:text-white transition-all duration-500">
                              <FileText className="w-7 h-7" />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#140E40] text-lg leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{result.title}</h4>
                              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-2">
                                <span className="text-blue-500">{result.subject}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                {result.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-12">
                            <div className="text-center hidden sm:block w-24">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Accuracy</span>
                              <span className="font-bold text-[#140E40] text-base">{result.accuracy}</span>
                            </div>
                            <div className="text-right w-44">
                              <div className="flex items-center gap-4 justify-end">
                                <span className="text-xl font-bold text-[#140E40]">{result.score}</span>
                                <span className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider ${result.statusColor} min-w-[100px] text-center`}>
                                  {result.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Subject Pulse section */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                  <div className="col-span-12 lg:col-span-6 bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 font-sans">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-bold text-[#140E40]">Subject Pulse</h3>
                      <button
                        onClick={() => setActiveTab('Subject Performance')}
                        className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-black text-[#5138EE] bg-blue-50/50 hover:bg-[#5138EE] hover:text-white rounded-2xl border border-blue-100/50 transition-all uppercase tracking-widest shadow-sm"
                      >
                        View All
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {subjects.map((subj, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleTopicClick(subj.name)}
                          className="group cursor-pointer"
                        >
                          <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-[22px] ${subj.bg} ${subj.color} flex items-center justify-center group-hover:scale-110 shadow-sm transition-transform duration-500`}>
                                <subj.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="font-bold text-[#140E40] text-base">{subj.name}</h4>
                                <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider mt-0.5">{subj.rank}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-[#140E40]">{subj.score}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>


                  <div className="col-span-12 lg:col-span-6 bg-white p-8 rounded-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 font-sans">
                    <div className="flex justify-between items-center mb-10 px-2">
                      <div className="flex items-center gap-4">
                        <h3 className="text-2xl font-black text-[#140E40] tracking-tight">Growth Areas</h3>
                        <span className="px-4 py-1.5 bg-orange-50 text-orange-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-orange-100">ACTION NEEDED</span>
                      </div>
                      <button 
                         onClick={() => setActiveTab('Weak Topics')}
                         className="flex items-center gap-2 px-6 py-3 text-[11px] font-black text-[#5138EE] bg-white hover:bg-slate-50 rounded-full border border-blue-100 shadow-[0_4px_12px_rgba(81,56,238,0.05)] transition-all uppercase tracking-widest"
                      >
                         View All Topics
                         <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 px-4 pb-4">
                      {improveTopics.map((topic, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleTopicClick(topic.name)}
                          className="group cursor-pointer"
                        >
                          <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-3.5 h-3.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-transform group-hover:scale-125"></div>
                                <span className="text-[17px] font-bold text-[#140E40] tracking-tight group-hover:text-[#5138EE] transition-colors">{topic.name}</span>
                              </div>
                              <span className="text-[18px] font-black text-[#140E40]">{topic.score}%</span>
                          </div>
                          <div className="w-full bg-slate-50 rounded-full h-3.5 p-0.5 border border-slate-100 overflow-hidden">
                              <div className="bg-orange-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${topic.score}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Test Progress' && (
              <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <h3 className="text-lg font-bold text-[#140E40]">Test Performance History</h3>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search tests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5138EE]/20 transition-all font-medium"
                      />
                    </div>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                    >
                      <option value="All">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                        <th className="pb-4 px-2">Test Name</th>
                        <th className="pb-4 px-2 text-center">Date</th>
                        <th className="pb-4 px-2 text-center">Score</th>
                        <th className="pb-4 px-2 text-center">Accuracy</th>
                        <th className="pb-4 px-2 text-center">Time Taken</th>
                        <th className="pb-4 px-2 text-center">Status</th>
                        <th className="pb-4 px-2 text-right">Rank</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredTests.map((result, i) => (
                        <tr key={i} className="group hover:bg-slate-50/40 transition-colors">
                          <td className="py-5 px-2">
                            <div className="flex flex-col">
                              <span 
                                onClick={() => handleTestClick(result)}
                                className="font-bold text-[#5138EE] text-[13px] hover:underline cursor-pointer transition-colors"
                              >
                                {result.title}
                              </span>
                              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{result.subject}</span>
                            </div>
                          </td>
                          <td className="py-5 px-2 text-center text-slate-500 text-[13px] font-medium">{result.date}</td>
                          <td className="py-5 px-2 text-center font-black text-[#140E40] text-[13px]">{result.score}</td>
                          <td className="py-5 px-2 text-center text-slate-500 text-[13px] font-medium">{result.accuracy}</td>
                          <td className="py-5 px-2 text-center text-slate-500 text-[13px] font-medium">{result.time}</td>
                          <td className="py-5 px-2 text-center">
                            <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${result.statusColor}`}>
                              {result.status}
                            </span>
                          </td>
                          <td className="py-5 px-2 text-right">
                            <span className="text-[13px] font-black text-[#10B981]">
                              {result.rank}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredTests.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-20 text-center text-slate-400 font-medium">
                            No tests found matching your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                  <p className="text-[13px] text-slate-400 font-bold">Showing {filteredTests.length} of {allTests.length} tests</p>
                  <div className="flex gap-2">
                    <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 font-bold text-xs hover:bg-slate-50 grayscale opacity-50 cursor-not-allowed transition-all">
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#5138EE] text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all">
                      1
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Weak Topics' && (
              <div className="bg-[#FFF8F6] p-8 rounded-[40px] border border-orange-100/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8">
                <div className="flex justify-between items-center mb-8 px-2">
                  <h3 className="text-2xl font-bold text-[#140E40]">Weak Topics</h3>
                  <button className="text-[14px] font-bold text-[#5138EE] hover:underline transition-all flex items-center gap-2">
                    Refresh Analysis
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Trigonometry Identities', priority: 'HIGH PRIORITY', color: 'red' },
                    { name: 'Organic Chemistry Basics', priority: 'HIGH PRIORITY', color: 'red' },
                    { name: 'Quadratic Equations', priority: 'MEDIUM PRIORITY', color: 'amber' },
                    { name: 'Chemical Bonding', priority: 'MEDIUM PRIORITY', color: 'amber' },
                    { name: 'Coordinate Geometry', priority: 'MEDIUM PRIORITY', color: 'amber' },
                    { name: 'Linear Equations', priority: 'LOW PRIORITY', color: 'blue' },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleTopicClick(item.name.split(' ')[0])} // Split to handle things like "Trigonometry Identities" -> "Trigonometry"
                      className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 w-12 h-12 rounded-2xl ${item.color === 'red' ? 'bg-red-50 text-red-500' : item.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-500'} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[15px] font-bold text-[#140E40] leading-tight mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
                            {item.name}
                          </h4>
                          <span className={`text-[10px] font-black ${item.color === 'red' ? 'text-red-500' : item.color === 'amber' ? 'text-amber-600' : 'text-blue-500'} uppercase tracking-widest`}>
                            {item.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-gradient-to-r from-[#5138EE] to-[#140E40] rounded-[32px] flex flex-col md:flex-row items-center justify-between text-white shadow-lg shadow-blue-500/20 px-8 gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                      <Target className="w-8 h-8 text-blue-200" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Ready to improve?</h4>
                      <p className="text-blue-200 text-sm font-medium">Ask Mentix AI for a personalized walkthrough of your weak areas.</p>
                    </div>
                  </div>
                  <button className="whitespace-nowrap px-8 py-4 bg-white text-[#5138EE] font-black rounded-2xl hover:bg-blue-50 transition-all uppercase tracking-widest text-[12px] shadow-lg">
                    Ask Mentix AI
                  </button>
                </div>
              </div>
            )}

          {activeTab === 'Subject Performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">
                <h3 className="text-lg font-bold text-[#140E40] mb-6">Subject Performance</h3>
                <div className="space-y-4">
                  {subjects.map((subj, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-[28px] bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all border border-transparent hover:border-blue-100 group">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${subj.bg} ${subj.color} group-hover:scale-110 transition-transform`}>
                          <subj.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[13px] font-bold text-[#140E40] uppercase tracking-tight">{subj.name}</span>
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="text-center">
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Avg Score</p>
                          <p className="font-bold text-[#140E40] text-lg">{subj.score}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Rank</p>
                          <p className="font-bold text-emerald-500 text-lg">{subj.rank}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">
                <h3 className="text-lg font-bold text-[#140E40] mb-6">Subject Insights</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Mathematics', desc: 'Great job! You are performing above 88% of students.', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { name: 'Science', desc: 'Keep practicing to move up to the top 10%.', icon: FlaskConical, color: 'text-green-500', bg: 'bg-green-50' },
                    { name: 'English', desc: 'Focus on reading comprehension and grammar.', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
                  ].map((insight, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-slate-100 relative group overflow-hidden hover:bg-slate-50 transition-colors">
                      <div className={`absolute top-0 right-0 w-16 h-16 ${insight.bg} rounded-full -mr-8 -mt-8 opacity-20`}></div>
                      <div className="flex items-center gap-3 mb-2 relative z-10">
                        <insight.icon className={`w-5 h-5 ${insight.color}`} />
                        <h4 className="font-bold text-[13px] text-[#140E40] uppercase tracking-tight">{insight.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-bold relative z-10">
                        {insight.desc}
                      </p>
                    </div>
                  ))}
                  <button className="w-full py-4 text-[#5138EE] font-bold text-[11px] uppercase tracking-widest hover:underline flex items-center justify-center gap-2 transition-all">
                    View all subjects performance
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </main>
      </div >
    </div >
  );
};

export default Performance;