"use client";

import { useState } from "react";
import { Sparkles, Calendar, CheckCircle2, User, AlertTriangle, CalendarDays, ArrowRight, Users, X } from "lucide-react";
import MentorLayout from "../MentorLayout";

export default function Dashboard() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <MentorLayout>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-3xl p-5 md:p-6 max-w-md w-full shadow-2xl border border-white/40 transform animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-[#0D245B] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                Ask AI
              </h3>
              <button onClick={() => setShowAIModal(false)} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <textarea
              className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all resize-none text-[13px]"
              placeholder="What would you like me to help you with? (e.g. Generate 10 tricky algebra questions...)"
            />
            <button
              onClick={() => {
                setShowAIModal(false);
                showToast("✨ AI is generating your request...");
              }}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-95 text-[13px]"
            >
              Generate
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mt-2 mb-4 md:mb-6 px-1 relative min-h-[100px] md:min-h-[140px] gap-4 md:gap-6 text-center md:text-left">
        <div>
          <h1 className="text-[16px] md:text-[24px] font-black text-[#0D245B] tracking-tight mb-1 flex flex-wrap justify-center md:justify-start items-center gap-2 uppercase">
            Good morning, Arjun! <span className="text-lg md:text-2xl">👋</span>
          </h1>
          <p className="text-[#5B779E] text-[9px] md:text-[11px] font-black uppercase tracking-widest">
            Let's build assessments that create impact.
          </p>
        </div>

        {/* Abstract 3D Illustration Placeholder - Hidden on mobile or made smaller */}
        <div className="relative w-full max-w-[320px] h-[160px] md:mr-10 hidden sm:block">
          <div className="absolute top-[20%] right-[30%] w-[100px] md:w-[120px] h-[100px] md:h-[120px] rounded-full bg-gradient-to-tr from-blue-600 to-blue-300 shadow-[0_20px_40px_rgba(37,99,235,0.4),_inset_10px_10px_20px_rgba(255,255,255,0.6)] mix-blend-multiply" />
          <div className="absolute bottom-[10%] right-[10%] w-[120px] md:w-[140px] h-[90px] md:h-[100px] rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rotate-[-10deg] flex flex-col p-3 gap-2">
            <div className="w-full h-2.5 bg-blue-100 rounded-md" />
            <div className="w-3/4 h-2.5 bg-blue-100 rounded-md" />
            <div className="mt-auto w-1/2 h-5 bg-blue-500 rounded-md" />
          </div>
          <div className="absolute top-[10%] right-[0%] w-[90px] md:w-[100px] h-[110px] md:h-[120px] rounded-2xl bg-white/60 backdrop-blur-lg border border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rotate-[15deg] flex p-2 gap-1 justify-end items-end">
            <div className="w-3 md:w-4 h-10 md:h-12 bg-blue-200 rounded-sm" />
            <div className="w-3 md:w-4 h-7 md:h-8 bg-blue-300 rounded-sm" />
            <div className="w-3 md:w-4 h-14 md:h-16 bg-blue-400 rounded-sm" />
          </div>
          <Sparkles className="absolute top-[10%] right-[50%] w-5 md:w-6 h-5 md:h-6 text-blue-400" />
          <Sparkles className="absolute bottom-[20%] right-[-5%] w-3 md:w-4 h-3 md:w-4 text-blue-300" />
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {/* Recent Tests */}
        <div className="bg-white border border-slate-100 rounded-[20px] md:rounded-[28px] p-4 md:p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-widest">Recent Tests</h3>
            <button onClick={() => showToast("Opening all Recent Tests...")} className="text-[9px] md:text-[10px] font-black text-blue-500 hover:text-blue-600 uppercase tracking-widest">View all</button>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] truncate">Quadratic Equations</h4>
                <p className="text-[9px] md:text-[10px] text-[#5B779E] truncate uppercase font-black tracking-widest">Math &bull; Class 10</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="px-1.5 md:px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[8px] md:text-[9px] font-black mb-1 uppercase tracking-widest border border-emerald-100">Live</span>
                <span className="text-[11px] md:text-[13px] font-black text-[#0D245B]">86</span>
              </div>
            </div>
            <div className="w-full h-px bg-slate-50" />
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100 shadow-sm">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] truncate">Trigonometry Basics</h4>
                <p className="text-[9px] md:text-[10px] text-[#5B779E] truncate uppercase font-black tracking-widest">Math &bull; Class 11</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="px-1.5 md:px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[8px] md:text-[9px] font-black mb-1 uppercase tracking-widest border border-emerald-100">Live</span>
                <span className="text-[11px] md:text-[13px] font-black text-[#0D245B]">62</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weak Topic Alerts */}
        <div className="bg-white border border-slate-100 rounded-[20px] md:rounded-[28px] p-4 md:p-6 shadow-sm flex flex-col">
          <h3 className="text-[11px] md:text-[13px] font-black text-[#0D245B] flex items-center gap-2 mb-4 md:mb-6 uppercase tracking-widest">
            <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
            Weak Topics
          </h3>
          <div className="flex flex-col gap-3 md:gap-4 flex-1">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 shadow-sm">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] truncate">Trigonometry</h4>
                  <span className="px-1.5 md:px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-red-100">High</span>
                </div>
                <p className="text-[9px] md:text-[11px] font-black text-slate-400 mt-1 uppercase tracking-widest">67% struggling</p>
              </div>
            </div>
            <div className="w-full h-px bg-slate-50" />
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100 shadow-sm">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] truncate">Organic Chem</h4>
                  <span className="px-1.5 md:px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-amber-100">Med</span>
                </div>
                <p className="text-[9px] md:text-[11px] font-black text-slate-400 mt-1 uppercase tracking-widest">48% struggling</p>
              </div>
            </div>
          </div>
          <button onClick={() => showToast("Generating practice test...")} className="w-full mt-3 md:mt-4 py-2 md:py-3 rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/50 text-[#0D245B] font-black text-[9px] md:text-[11px] hover:bg-white hover:border-blue-200 transition-all uppercase tracking-widest shadow-sm">
            Generate Test
          </button>
        </div>

        {/* Student Alerts */}
        <div className="bg-white border border-slate-100 rounded-[20px] md:rounded-[28px] p-4 md:p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-widest">Student Alerts</h3>
            <button onClick={() => showToast("Viewing alerts...")} className="text-[9px] md:text-[10px] font-black text-blue-500 hover:text-blue-600 uppercase tracking-widest">View all</button>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            {[1, 2].map((id) => (
              <div key={id} className="flex items-center gap-2 md:gap-3">
                <img src={`https://i.pravatar.cc/150?u=${id}`} className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl border border-white shadow-sm object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] truncate">Student {id}</h4>
                  <p className="text-[9px] md:text-[10px] text-red-500 font-black truncate uppercase tracking-widest">Low performance</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Upcoming Tests Section */}
      <div className="flex justify-between items-center mb-4 md:mb-6 px-1">
        <h3 className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-widest">Upcoming Tests</h3>
        <button onClick={() => showToast("Opening calendar...")} className="text-[9px] md:text-[10px] font-black text-blue-500 hover:text-blue-600 uppercase tracking-widest">View calendar</button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-10">
        {[
          { title: "Physics - Laws of Motion", class: "Class 11", count: 32, date: "10 May, 10:00 AM" },
          { title: "Biology - Human Digestive", class: "Class 10", count: 45, date: "14 May, 02:00 PM" },
          { title: "Algebra - Linear Equations", class: "Class 9", count: 28, date: "16 May, 11:30 AM" },
        ].map((test, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[20px] md:rounded-[28px] p-4 md:p-5 shadow-sm flex items-start gap-3 md:gap-4 hover:border-blue-200 transition-all cursor-pointer group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[12px] md:text-[14px] font-black text-[#0D245B] mb-1 truncate uppercase tracking-tight">{test.title}</h4>
              <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-[#5B779E] mb-2 uppercase tracking-widest">
                <span className="text-blue-500">{test.class}</span>
                <span className="text-slate-200">&bull;</span>
                <span>{test.count} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 md:px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 text-[9px] md:text-[10px] font-black text-[#0D245B] uppercase tracking-widest">
                  {test.date}
                </div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-300 group-hover:text-blue-500 transition-colors self-center" />
          </div>
        ))}
      </section>

      {/* AI Assistant Card */}
      <div className="bg-gradient-to-br from-[#0D245B] to-[#0D3694] rounded-[20px] md:rounded-[28px] p-4 md:p-6 shadow-lg flex flex-col items-center text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
        <div className="w-12 h-12 md:w-16 md:h-16 relative mb-3 md:mb-4">
          <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl animate-pulse"></div>
          <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
          </div>
        </div>
        <h3 className="text-[11px] md:text-[13px] font-black text-white mb-1 uppercase tracking-[0.2em]">AI Assistant</h3>
        <p className="text-[9px] md:text-[10px] font-black text-blue-200/60 mb-4 md:mb-6 uppercase tracking-widest">Test co-pilot</p>
        <button onClick={() => setShowAIModal(true)} className="mt-auto w-full py-2 md:py-3 rounded-xl md:rounded-2xl bg-white text-[#0D245B] font-black text-[10px] md:text-[11px] shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
          Ask AI
        </button>
      </div>

    </MentorLayout>
  );
}

