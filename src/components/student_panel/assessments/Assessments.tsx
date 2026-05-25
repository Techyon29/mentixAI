"use client";

import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import {
  ClipboardList,
  Calendar,
  Clock,
  ChevronRight,
  FlaskConical,
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const MOCK_QUESTIONS = [
  { id: 1, text: "Which organelle is known as the 'Powerhouse of the Cell'?", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"] },
  { id: 2, text: "The primary site of photosynthesis in plants is:", options: ["Stem", "Root", "Flowers", "Leaves"] },
  { id: 3, text: "What gas is released during photosynthesis as a byproduct?", options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"] },
  { id: 4, text: "Chlorophyll is primarily responsible for absorbing which light spectrum?", options: ["Green", "Blue & Red", "Yellow", "Infrared"] },
  { id: 5, text: "The light-independent reactions of photosynthesis are also known as:", options: ["Krebs Cycle", "Calvin Cycle", "Glycolysis", "Citric Acid Cycle"] },
];

const Assessments = () => {
  // Mock state: Controls whether the "Ongoing Test" section is visible
  const [hasOngoingTest, setHasOngoingTest] = useState(true);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const startTestFlow = () => {
    if (isTestCompleted) return;
    window.open('/student-dashboard/assessments/test', '_blank');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F4F6FB] overflow-hidden font-sans text-slate-800">
      {/* Abstract Background Elements */}      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E8E2FF] to-[#D4CAFF] blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F0F5FF] to-[#E2EBFF] blur-[80px] opacity-60 pointer-events-none" />

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen p-3 gap-6">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-3 pb-8 custom-scrollbar">
          <Navbar />

          <div className="p-6">
            {/* Main Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">


              {/* Ongoing Test */}
              {hasOngoingTest ? (
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0">
                    <div className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      LIVE NOW
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-800">Ongoing Test</h3>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100/50 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />

                    <div className="relative w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-500">
                      <FlaskConical className="w-8 h-8" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-sm"></div>
                    </div>
                    <h4 className="relative z-10 text-lg font-bold text-gray-800">Photosynthesis Process</h4>
                    <div className="relative z-10 flex items-center text-sm text-gray-500 mt-2 space-x-2">
                      <span>Biology</span>
                      <span>•</span>
                      <span>20 Questions</span>
                    </div>

                    <div className="relative z-10 w-full px-6 mt-8">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">12 / 20 Questions</span>
                        <span className="font-bold text-blue-600">60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                        <div className="bg-blue-600 h-2.5 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: '60%' }}></div>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <span className="text-gray-500 text-sm">Time Left</span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-500 animate-pulse" />
                          <span className="font-bold text-gray-800">18:45</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 w-full px-6 mt-6">
                      <button 
                        onClick={startTestFlow}
                        disabled={isTestCompleted}
                        className={`w-full py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                          isTestCompleted 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isTestCompleted ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Test Completed
                          </>
                        ) : (
                          'Begin Test'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/60 p-5 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center opacity-80 backdrop-blur-sm group hover:bg-white transition-all cursor-default">
                  <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-400 group-hover:text-gray-500 transition-colors">No Ongoing Tests</h4>
                  <p className="text-sm text-gray-400 mt-1 max-w-[200px]">You have no active assessments at the moment. Relax!</p>
                </div>
              )}

              {/* Upcoming Tests */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-bold text-gray-800">Upcoming Tests</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { day: '12', month: 'MAY', title: 'Quadratic Equations - Quiz 1', subject: 'Mathematics', qCount: '10 Questions', time: '10:00 AM', status: 'Tomorrow', statusColor: 'text-blue-500 bg-blue-50' },
                    { day: '14', month: 'MAY', title: 'Cell Structure & Functions', subject: 'Biology', qCount: '15 Questions', time: '02:00 PM', status: 'In 2 days', statusColor: 'text-blue-500 bg-blue-50' },
                    { day: '16', month: 'MAY', title: 'Chemical Bonding Basics', subject: 'Chemistry', qCount: '20 Questions', time: '11:30 AM', status: 'In 4 days', statusColor: 'text-blue-500 bg-blue-50' },
                  ].map((test, i) => (
                    <div key={i} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                      <div className="flex flex-col items-center justify-center w-12 h-14 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-sm font-bold text-gray-800">{test.day}</span>
                        <span className="text-xs text-gray-500 font-medium">{test.month}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{test.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                          <span>{test.subject}</span>
                          <span>•</span>
                          <span>{test.qCount}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{test.time}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${test.statusColor}`}>
                        {test.status}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 flex items-center justify-center text-blue-600 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors">
                  View all tests <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>


              {/* Recent Results */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-bold text-gray-800">Recent Results</h3>
                </div>

                <div className="space-y-5">
                  {[
                    { title: 'Trigonometry Basics', subject: 'Mathematics', date: '10 May, 2025', score: '92%', grade: 'Excellent', gradeColor: 'text-green-600 bg-green-50' },
                    { title: 'Organic Chemistry Basics', subject: 'Chemistry', date: '08 May, 2025', score: '78%', grade: 'Good', gradeColor: 'text-blue-600 bg-blue-50' },
                    { title: 'Cell Structure Quiz', subject: 'Biology', date: '05 May, 2025', score: '85%', grade: 'Very Good', gradeColor: 'text-green-600 bg-green-50' },
                    { title: "Newton's Laws Test", subject: 'Physics', date: '01 May, 2025', score: '65%', grade: 'Average', gradeColor: 'text-orange-600 bg-orange-50' },
                  ].map((result, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{result.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                          <span>{result.subject}</span>
                          <span>•</span>
                          <span>{result.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-gray-800">{result.score}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${result.gradeColor} min-w-[80px] text-center`}>
                          {result.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 flex items-center justify-center text-blue-600 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors">
                  View all results <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assessments;