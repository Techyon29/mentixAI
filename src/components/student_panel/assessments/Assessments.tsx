"use client";

import React, { useState } from 'react';
import StudentLayout from '../StudentLayout';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Play,
  LayoutGrid,
  List
} from 'lucide-react';
import Link from 'next/link';

const Assessments = () => {
  const [activeTab, setActiveTab] = useState('Available');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const assessments = [
    {
      id: 1,
      title: "Photosynthesis Process",
      subject: "Biology",
      questions: 25,
      duration: "30M",
      status: "Available",
      deadline: "30 MAY, 2025",
      difficulty: "Intermediate",
      points: 100
    },
    {
      id: 2,
      title: "Quadratic Equations - Quiz 1",
      subject: "Mathematics",
      questions: 20,
      duration: "45M",
      status: "Available",
      deadline: "12 JUNE, 2025",
      difficulty: "Advanced",
      points: 150
    },
    {
      id: 3,
      title: "Chemical Bonding",
      subject: "Chemistry",
      questions: 15,
      duration: "20M",
      status: "Upcoming",
      deadline: "15 JUNE, 2025",
      difficulty: "Basic",
      points: 50
    },
    {
      id: 4,
      title: "Cell Structure & Functions",
      subject: "Biology",
      questions: 30,
      duration: "40M",
      status: "Completed",
      score: "85%",
      date: "25 MAY, 2025",
      points: 85
    }
  ];

  const filteredAssessments = assessments.filter(test => {
    const matchesTab = activeTab === 'All' || test.status === activeTab;
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          test.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto w-full pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5 md:mb-8 gap-4 md:gap-6 px-1 mt-2">
          <div className="w-full">
            <h1 className="text-[15px] md:text-2xl font-black text-[#0D245B] tracking-tight uppercase">Assessments</h1>
            <p className="text-[#5B779E] text-[9px] md:text-[11px] font-bold uppercase tracking-widest mt-1">Proof your skills in real-time</p>
          </div>
          
          <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['Available', 'Upcoming', 'Completed', 'All'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 md:pb-2.5 px-2 md:px-3 mr-3 md:mr-4 font-black text-[10px] md:text-[11px] transition-all relative whitespace-nowrap uppercase tracking-widest ${activeTab === tab ? 'text-blue-600' : 'text-slate-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Tooling */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-5 md:mb-8 px-1">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="SEARCH BY TITLE OR SUBJECT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 md:pl-11 pr-4 py-2 md:py-2.5 bg-white border border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/5 transition-all font-black text-[#0D245B] text-[10px] md:text-[12px] uppercase tracking-tight"
            />
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] md:text-[11px] font-black text-[#0D245B] transition-all flex-1 md:flex-none uppercase tracking-widest shadow-sm">
              <Filter className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-500" /> Filter
            </button>
            <div className="flex bg-white border border-slate-100 rounded-xl p-0.5 shadow-sm">
               <button onClick={() => setViewType('grid')} className={`p-1.5 md:p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-[#0D245B] text-white' : 'text-slate-400'}`}>
                 <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4" />
               </button>
               <button onClick={() => setViewType('list')} className={`p-1.5 md:p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-[#0D245B] text-white' : 'text-slate-400'}`}>
                 <List className="w-3.5 h-3.5 md:w-4 md:h-4" />
               </button>
            </div>
          </div>
        </div>

        {/* High Density Content */}
        <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-3 md:gap-4 px-1 pb-10`}>
          {filteredAssessments.map((test) => (
            <div key={test.id} className="bg-white border border-slate-100 rounded-[18px] md:rounded-[24px] p-4 md:p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden">
               <div className="flex items-start justify-between gap-2 md:gap-3 mb-4 md:mb-5">
                  <div className="flex items-center gap-2 md:gap-3">
                     <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                     </div>
                     <div>
                        <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">{test.subject}</span>
                        <h3 className="text-[12px] md:text-[14px] font-black text-[#0D245B] uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{test.title}</h3>
                     </div>
                  </div>
                  <span className={`px-1.5 md:px-2 py-0.5 rounded-md text-[8px] md:text-[9px] font-black uppercase tracking-widest border shrink-0 ${
                    test.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    test.status === 'Upcoming' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}>
                    {test.status}
                  </span>
               </div>

               <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="p-2 md:p-3 bg-slate-50/50 rounded-xl border border-slate-50">
                     <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Duration & Pts</p>
                     <p className="text-[10px] md:text-[12px] font-black text-[#0D245B] uppercase">{test.duration} &bull; {test.points}XP</p>
                  </div>
                  <div className="p-2 md:p-3 bg-slate-50/50 rounded-xl border border-slate-50">
                     <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Difficulty</p>
                     <p className="text-[10px] md:text-[12px] font-black text-[#0D245B] uppercase">{test.difficulty}</p>
                  </div>
               </div>

               <div>
                 {test.status === 'Available' ? (
                   <Link href="/student-dashboard/assessments/test" className="flex items-center justify-center gap-2 w-full py-2.5 md:py-3 bg-[#0D245B] text-white rounded-xl font-black text-[10px] md:text-[11px] uppercase tracking-widest shadow-md hover:bg-[#0D3694] transition-all">
                     Start Test <Play className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                   </Link>
                 ) : test.status === 'Completed' ? (
                   <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center px-3 md:px-4 py-2 md:py-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                         <span className="text-[9px] md:text-[10px] font-black text-emerald-800 uppercase tracking-widest text-center">Your Score</span>
                         <span className="text-[12px] md:text-[14px] font-black text-emerald-600 uppercase">{test.score}</span>
                      </div>
                      <Link href="/student-dashboard/performance/report" className="text-center py-1.5 md:py-2 text-[9px] md:text-[10px] font-black text-[#0D245B] hover:text-blue-600 uppercase tracking-widest">View Detailed Analysis</Link>
                   </div>
                 ) : (
                   <div className="flex flex-col gap-2">
                      <button disabled className="w-full py-2.5 md:py-3 bg-slate-100 text-slate-400 rounded-xl font-black text-[10px] md:text-[11px] uppercase tracking-widest border border-slate-200 cursor-not-allowed">
                        Coming Soon
                      </button>
                      <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Unlocks on {test.deadline}</p>
                   </div>
                 )}
               </div>
            </div>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 border border-slate-100 rounded-[32px] mt-10">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-[18px] font-black text-[#0D245B] mb-2 uppercase tracking-tight">No assessments found</h3>
            <p className="text-[#5B779E] text-[11px] font-black uppercase tracking-widest">Try adjusting your search or filters.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveTab('All');}}
              className="mt-6 text-blue-600 font-black text-[11px] uppercase tracking-widest hover:underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default Assessments;