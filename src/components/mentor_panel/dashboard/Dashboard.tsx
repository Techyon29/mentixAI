"use client";

import { useState } from "react";
import { Sparkles, Calendar, CheckCircle2, User, AlertTriangle, CalendarDays, ArrowRight, Users, X } from "lucide-react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const BackgroundOrbs = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E0EFFF] to-[#C9E0FC] blur-[100px] opacity-70" />
    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E8F3FF] to-[#D4E8FF] blur-[80px] opacity-60" />
    <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E6F0F9] to-[#CCE3FA] blur-[120px] opacity-80" />
  </div>
);

export default function Dashboard() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F0F5FA] overflow-hidden font-sans text-slate-800">
      
      <BackgroundOrbs />

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-blue-100 flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
          <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />
          <span className="font-semibold text-[#0D245B] text-sm">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* AI Modal Overlay */}
      {showAIModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 transform animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#0D245B] flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
                Ask AI
              </h3>
              <button onClick={() => setShowAIModal(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <textarea 
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all resize-none text-sm"
              placeholder="What would you like me to help you with? (e.g. Generate 10 tricky algebra questions...)"
            />
            <button 
              onClick={() => {
                setShowAIModal(false);
                showToast("✨ AI is generating your request...");
              }}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-95"
            >
              Generate
            </button>
          </div>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="relative z-10 flex h-screen p-4 gap-6">
        
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-10">
          
          <Navbar />

          {/* Hero Section */}
          <section className="flex items-center justify-between mt-2 mb-8 px-2 relative min-h-[160px]">
            <div>
              <h1 className="text-[34px] font-bold text-[#0D245B] tracking-tight mb-2 flex items-center gap-3">
                Good morning, Arjun! <span className="text-3xl">👋</span>
              </h1>
              <p className="text-[#5B779E] text-[16px] font-medium">
                Let's build assessments that create impact.
              </p>
            </div>
            
            {/* Abstract 3D Illustration Placeholder using CSS shapes */}
            <div className="relative w-[320px] h-[160px] mr-10">
              <div className="absolute top-[20%] right-[30%] w-[120px] h-[120px] rounded-full bg-gradient-to-tr from-blue-600 to-blue-300 shadow-[0_20px_40px_rgba(37,99,235,0.4),_inset_10px_10px_20px_rgba(255,255,255,0.6)] mix-blend-multiply" />
              <div className="absolute bottom-[10%] right-[10%] w-[140px] h-[100px] rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rotate-[-10deg] flex flex-col p-3 gap-2">
                 <div className="w-full h-3 bg-blue-100 rounded-md" />
                 <div className="w-3/4 h-3 bg-blue-100 rounded-md" />
                 <div className="mt-auto w-1/2 h-6 bg-blue-500 rounded-md" />
              </div>
              <div className="absolute top-[10%] right-[0%] w-[100px] h-[120px] rounded-2xl bg-white/60 backdrop-blur-lg border border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rotate-[15deg] flex p-2 gap-1 justify-end items-end">
                 <div className="w-4 h-12 bg-blue-200 rounded-sm" />
                 <div className="w-4 h-8 bg-blue-300 rounded-sm" />
                 <div className="w-4 h-16 bg-blue-400 rounded-sm" />
              </div>
              <Sparkles className="absolute top-[10%] right-[50%] w-6 h-6 text-blue-400" />
              <Sparkles className="absolute bottom-[20%] right-[-5%] w-4 h-4 text-blue-300" />
            </div>
          </section>

          {/* Lower Section Grid */}
          <section className="grid grid-cols-4 gap-5 mb-8">
            
            {/* Recent Tests */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[32px] p-6 shadow-[0_8px_24px_rgba(30,100,200,0.06),_inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[16px] font-bold text-[#0D245B]">Recent Tests</h3>
                <button onClick={() => showToast("Opening all Recent Tests...")} className="text-[13px] font-semibold text-blue-500 hover:text-blue-600">View all</button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0D245B] truncate">Quadratic Equations - Quiz 1</h4>
                    <p className="text-[12px] text-[#5B779E] truncate">Mathematics &bull; Class 10</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-[11px] font-bold mb-1">Live</span>
                    <span className="text-[11px] font-bold text-[#0D245B]">86</span>
                    <span className="text-[10px] text-[#5B779E]">Attempts</span>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200/50" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0D245B] truncate">Trigonometry Basics</h4>
                    <p className="text-[12px] text-[#5B779E] truncate">Mathematics &bull; Class 11</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-[11px] font-bold mb-1">Live</span>
                    <span className="text-[11px] font-bold text-[#0D245B]">62</span>
                    <span className="text-[10px] text-[#5B779E]">Attempts</span>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200/50" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0D245B] truncate">Cell Structure & Functions</h4>
                    <p className="text-[12px] text-[#5B779E] truncate">Biology &bull; Class 9</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[11px] font-bold mb-1">Draft</span>
                    <span className="text-[11px] font-bold text-[#0D245B]">0</span>
                    <span className="text-[10px] text-[#5B779E]">Attempts</span>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200/50" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0D245B] truncate">Chemical Bonding</h4>
                    <p className="text-[12px] text-[#5B779E] truncate">Chemistry &bull; Class 11</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-[11px] font-bold mb-1">Completed</span>
                    <span className="text-[11px] font-bold text-[#0D245B]">68</span>
                    <span className="text-[10px] text-[#5B779E]">Attempts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weak Topic Alerts */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[32px] p-6 shadow-[0_8px_24px_rgba(30,100,200,0.06),_inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[16px] font-bold text-[#0D245B] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Weak Topic Alerts
                </h3>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-[14px] font-bold text-[#0D245B] leading-tight">Trigonometry Identities</h4>
                      <span className="px-2 py-0.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold whitespace-nowrap">High Priority</span>
                    </div>
                    <p className="text-[12px] text-[#5B779E] mt-0.5">67% of students struggling</p>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200/50" />

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-[14px] font-bold text-[#0D245B] leading-tight">Organic Chemistry Basics</h4>
                      <span className="px-2 py-0.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold whitespace-nowrap">High Priority</span>
                    </div>
                    <p className="text-[12px] text-[#5B779E] mt-0.5">50% of students struggling</p>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200/50" />

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-[14px] font-bold text-[#0D245B] leading-tight">Quadratic Equations</h4>
                      <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-bold whitespace-nowrap">Medium Priority</span>
                    </div>
                    <p className="text-[12px] text-[#5B779E] mt-0.5">48% of students struggling</p>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-200/50" />

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-[14px] font-bold text-[#0D245B] leading-tight">Chemical Bonding</h4>
                      <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-bold whitespace-nowrap">Medium Priority</span>
                    </div>
                    <p className="text-[12px] text-[#5B779E] mt-0.5">30% of students struggling</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => showToast("Preparing to generate new practice test...")}
                className="w-full mt-4 py-2.5 rounded-full border border-blue-200 text-blue-600 font-bold text-[13px] hover:bg-blue-50 transition-colors active:scale-95"
              >
                Generate Practice Test
              </button>
            </div>

            {/* Student Alerts */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[32px] p-6 shadow-[0_8px_24px_rgba(30,100,200,0.06),_inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[16px] font-bold text-[#0D245B]">Student Alerts</h3>
                <button onClick={() => showToast("Opening all Student Alerts...")} className="text-[13px] font-semibold text-blue-500 hover:text-blue-600">View all</button>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?u=1" className="w-10 h-10 rounded-full border border-white shadow-sm object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0D245B]">Rohan Verma</h4>
                    <p className="text-[12px] text-red-500 font-medium">Low performance in 2 tests</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?u=2" className="w-10 h-10 rounded-full border border-white shadow-sm object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0D245B]">Ananya Sharma</h4>
                    <p className="text-[12px] text-amber-500 font-medium">Needs improvement</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?u=3" className="w-10 h-10 rounded-full border border-white shadow-sm object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0D245B]">Vihaan Patel</h4>
                    <p className="text-[12px] text-blue-500 font-medium">Pending submissions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?u=4" className="w-10 h-10 rounded-full border border-white shadow-sm object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0D245B]">Aditya Singh</h4>
                    <p className="text-[12px] text-slate-500 font-medium">Scored below 40%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Prominent Card */}
            <div className="bg-gradient-to-b from-[#EBF4FF] to-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-[0_12px_32px_rgba(30,100,200,0.1),_inset_0_2px_8px_rgba(255,255,255,0.9)] flex flex-col items-center text-center relative overflow-hidden">
               {/* Decorative glow inside */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />
               
               <div className="w-32 h-32 relative mb-4">
                 {/* Fake 3D Robot placeholder - visually approximated */}
                 <div className="absolute inset-0 bg-blue-500 rounded-[40px] shadow-[inset_10px_10px_20px_rgba(255,255,255,0.5)]"></div>
                 <div className="absolute inset-x-4 top-6 bottom-12 rounded-[20px] bg-slate-900 border-4 border-blue-400 flex items-center justify-center gap-3">
                   <div className="w-4 h-4 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
                   <div className="w-4 h-4 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
                 </div>
               </div>

               <h3 className="text-[20px] font-bold text-[#0D245B] mb-2">AI Assistant</h3>
               <p className="text-[13.5px] font-medium text-[#5B779E] mb-6 px-2">
                 Your AI co-pilot for creating better assessments.
               </p>

               <ul className="text-left w-full space-y-3 mb-6">
                 <li className="flex items-center gap-2 text-[13px] font-semibold text-[#0D245B]">
                   <CheckCircle2 className="w-4 h-4 text-blue-500" /> Generate test with AI
                 </li>
                 <li className="flex items-center gap-2 text-[13px] font-semibold text-[#0D245B]">
                   <CheckCircle2 className="w-4 h-4 text-blue-500" /> Analyze weak topics
                 </li>
                 <li className="flex items-center gap-2 text-[13px] font-semibold text-[#0D245B]">
                   <CheckCircle2 className="w-4 h-4 text-blue-500" /> Suggest difficult questions
                 </li>
                 <li className="flex items-center gap-2 text-[13px] font-semibold text-[#0D245B]">
                   <CheckCircle2 className="w-4 h-4 text-blue-500" /> Review performance trends
                 </li>
               </ul>

               <button 
                 onClick={() => setShowAIModal(true)}
                 className="mt-auto w-full py-3.5 rounded-2xl bg-blue-500 text-white font-bold text-[15px] shadow-[0_8px_20px_rgba(59,130,246,0.3),_inset_0_2px_4px_rgba(255,255,255,0.4)] hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2"
               >
                 <Sparkles className="w-5 h-5" />
                 Ask AI
               </button>
            </div>
          </section>

          {/* Upcoming Tests Row */}
          <div className="flex justify-between items-center mb-4 px-2 w-3/4">
            <h3 className="text-[16px] font-bold text-[#0D245B]">Upcoming Tests</h3>
            <button onClick={() => showToast("Opening upcoming tests calendar...")} className="text-[13px] font-semibold text-blue-500 hover:text-blue-600">View calendar</button>
          </div>
          <section className="grid grid-cols-4 gap-5 mb-10">
             <div className="col-span-3 grid grid-cols-3 gap-5">
               <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[24px] p-5 shadow-[0_4px_16px_rgba(30,100,200,0.04),_inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold text-[#0D245B] mb-1">Physics - Laws of Motion</h4>
                    <div className="flex items-center gap-2 text-[12px] font-medium text-[#5B779E] mb-2">
                      <span className="text-blue-500">Class 11</span> <span className="text-slate-300">&bull;</span> <span>32 Students</span>
                    </div>
                    <p className="text-[12px] font-bold text-[#0D245B]">10 May, 10:00 AM</p>
                  </div>
               </div>

               <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[24px] p-5 shadow-[0_4px_16px_rgba(30,100,200,0.04),_inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold text-[#0D245B] mb-1">Biology - Human Digestive System</h4>
                    <div className="flex items-center gap-2 text-[12px] font-medium text-[#5B779E] mb-2">
                      <span className="text-blue-500">Class 10</span> <span className="text-slate-300">&bull;</span> <span>45 Students</span>
                    </div>
                    <p className="text-[12px] font-bold text-[#0D245B]">14 May, 02:00 PM</p>
                  </div>
               </div>

               <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[24px] p-5 shadow-[0_4px_16px_rgba(30,100,200,0.04),_inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 font-bold text-xl uppercase font-serif pb-1">
                    A
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold text-[#0D245B] mb-1">Algebra - Linear Equations</h4>
                    <div className="flex items-center gap-2 text-[12px] font-medium text-[#5B779E] mb-2">
                      <span className="text-blue-500">Class 9</span> <span className="text-slate-300">&bull;</span> <span>28 Students</span>
                    </div>
                    <p className="text-[12px] font-bold text-[#0D245B]">16 May, 11:30 AM</p>
                  </div>
               </div>
             </div>
          </section>
        </main>
      </div>
    </div>
  );
}

