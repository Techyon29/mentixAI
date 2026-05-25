import { Sparkles, Calendar, Clock, TrendingUp, Target, AlertTriangle, BookOpen, CalendarDays, FileBadge, ClipboardList, FileText } from "lucide-react";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export default function Dashboard() {
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

          {/* Hero Section */}
          <section className="flex justify-between items-center mb-6 pl-2 pr-6 relative min-h-[160px]">
            <div>
              <h1 className="text-[32px] font-bold text-[#140E40] tracking-tight mb-1 flex items-center gap-3">
                Good morning, Rohan! <span className="text-2xl">👋</span>
              </h1>
              <p className="text-slate-500 text-[15px] font-medium">
                Let's continue your learning journey and achieve greatness.
              </p>
            </div>
            <div className="relative w-[340px] h-[160px]">
              {/* Abstract hero illustration replacement */}
              <div className="absolute right-0 top-[-20px] w-48 h-48 bg-gradient-to-tr from-[#5138EE] to-[#A399EB] rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center opacity-90 blur-[1px]">
                <div className="w-[180%] h-px bg-white/40 absolute rotate-[-20deg]"></div>
              </div>
              <div className="absolute right-20 top-4 w-28 h-24 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white rotate-[-5deg]">
                <div className="w-16 h-16 bg-[#5138EE] rounded-xl flex items-center justify-center pb-2 relative">
                  <div className="w-6 h-2 bg-white/80 rounded-full absolute top-3"></div>
                  <div className="flex gap-2 mt-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <Sparkles className="absolute top-0 right-48 w-6 h-6 text-yellow-400" />
              <div className="absolute bottom-4 right-10 w-4 h-4 rounded-full bg-blue-300 blur-[2px]"></div>
              <div className="absolute top-10 right-2 w-3 h-3 rounded-full bg-purple-300 blur-[1px]"></div>
            </div>
          </section>

          {/* Main Grid Content */}
          <section className="grid grid-cols-12 gap-5 mb-6">
            {/* Left Column (Continue Test & Recent Scores) */}
            <div className="col-span-4 flex flex-col gap-5">
              {/* Continue Test Card */}
              <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col">
                <h3 className="text-[15px] font-bold text-[#140E40] mb-4">
                  Live Now
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5138EE] flex items-center justify-center shrink-0">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#140E40]">
                      Quadratic Equations - Quiz 1
                    </h4>
                    <p className="text-[12px] text-slate-500">
                      Mathematics &bull; 20 Questions
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-bold text-emerald-500">
                    66% Completed
                  </span>
                  <button className="px-5 py-2.5 bg-[#5138EE] hover:bg-[#432ACC] text-white rounded-xl text-[13px] font-bold shadow-[0_4px_12px_rgba(81,56,238,0.3)] transition-colors">
                    Begin Test
                  </button>
                </div>
                <div className="w-1/2 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-[-10px]">
                  <div className="h-full bg-emerald-500 rounded-full w-[66%]"></div>
                </div>
              </div>

              {/* Recent Scores */}
              <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[15px] font-bold text-[#140E40]">
                    Recent Scores
                  </h3>
                  <a
                    href="#"
                    className="text-[12px] font-bold text-[#5138EE] hover:text-[#432ACC]"
                  >
                    View all
                  </a>
                </div>

                <div className="flex flex-col gap-0">
                  {/* Item 1 */}
                  <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                      <FileBadge className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-[#140E40] truncate">
                        Trigonometry Basics
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        Mathematics &bull; 10 May, 2025
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[12px] font-bold">
                      84%
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                      <FileBadge className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-[#140E40] truncate">
                        Cell Structure & Functions
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        Biology &bull; 08 May, 2025
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[12px] font-bold">
                      72%
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                    <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                      <FileBadge className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-[#140E40] truncate">
                        Chemical Bonding
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        Chemistry &bull; 05 May, 2025
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[12px] font-bold">
                      68%
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {/* Right Column (Upcoming Tests) */}
            <div className="col-span-4 flex flex-col gap-5">
              <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[15px] font-bold text-[#140E40]">Upcoming Tests</h3>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { date: "15", month: "May", title: "Organic Chemistry II", time: "10:00 AM", type: "Final Exam", color: "blue" },
                    { date: "18", month: "May", title: "Calculus & Vectors", time: "02:30 PM", type: "Unit Test", color: "indigo" },
                    { date: "22", month: "May", title: "Modern Physics", time: "11:15 AM", type: "Practice Quiz", color: "purple" },
                    { date: "25", month: "May", title: "Animal Physiology", time: "09:00 AM", type: "Mid-Term", color: "emerald" }
                  ].map((test, index) => (
                    <div key={index} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 p-2 -m-2 rounded-xl transition-all">
                      <div className={`w-12 h-14 rounded-2xl bg-${test.color}-50 flex flex-col items-center justify-center border border-${test.color}-100 shrink-0`}>
                        <span className={`text-[10px] font-black text-${test.color}-600 uppercase`}>{test.month}</span>
                        <span className={`text-[18px] font-black text-${test.color}-700 leading-tight`}>{test.date}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-[#140E40] truncate group-hover:text-blue-600 transition-colors">{test.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {test.time}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-[11px] font-bold text-slate-400">{test.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-8 w-full py-3 bg-slate-50 text-slate-500 font-bold text-[13px] rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  Sync to Google Calendar
                </button>
              </div>
            </div>
           

            {/* Middle Column (Weak Topics) */}
            <div className="col-span-4 bg-gradient-to-b from-[#FFF5F3] to-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-orange-100/50 flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[15px] font-bold text-[#140E40]">
                  Weak Topics
                </h3>
                <a href="#" className="text-[12px] font-bold text-[#5138EE]">
                  View all
                </a>
              </div>

              <div className="flex flex-col gap-4">
                {/* Topic 1 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-50">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#140E40] leading-tight mb-1">
                      Trigonometry Identities
                    </h4>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                      High Priority
                    </span>
                  </div>
                </div>

                {/* Topic 2 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-50">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#140E40] leading-tight mb-1">
                      Organic Chemistry Basics
                    </h4>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                      High Priority
                    </span>
                  </div>
                </div>

                {/* Topic 3 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-50">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#140E40] leading-tight mb-1">
                      Quadratic Equations
                    </h4>
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">
                      Medium Priority
                    </span>
                  </div>
                </div>

                {/* Topic 4 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-50">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#140E40] leading-tight mb-1">
                      Chemical Bonding
                    </h4>
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">
                      Medium Priority
                    </span>
                  </div>
                </div>
              </div>
            </div>

           
          </section>
        </main>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E2E8F0;
          border-radius: 10px;
        }
      `,
        }}
      />
    </div>
  );
}
