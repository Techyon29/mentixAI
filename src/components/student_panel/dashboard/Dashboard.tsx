import { Sparkles, Clock, TrendingUp, Target, AlertTriangle, CalendarDays, FileBadge, ClipboardList } from "lucide-react";
import StudentLayout from "../StudentLayout";

export default function Dashboard() {
  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto w-full">
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5 md:mb-8 pl-1 pr-1 gap-4 md:gap-6 mt-2">
            <div className="w-full">
              <h1 className="text-[15px] md:text-2xl font-black text-[#0D245B] tracking-tight mb-1 uppercase">
                Welcome back, Rohan <span className="text-lg">👋</span>
              </h1>
              <p className="text-[#5B779E] text-[9px] md:text-[11px] font-bold uppercase tracking-widest">
                Level 12 &bull; 4,250 XP earned this week
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
               <div className="flex flex-col items-end">
                  <span className="text-[9px] md:text-[10px] font-black text-[#5B779E] uppercase tracking-widest">DAILY STREAK</span>
                  <span className="text-[11px] md:text-[13px] font-black text-orange-500 uppercase">12 DAYS</span>
               </div>
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100 shadow-sm">
                  <Target className="w-4 h-4 md:w-5 md:h-5" />
               </div>
            </div>
          </section>

          {/* Main Grid Content */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 px-1 pb-10">
            {/* Live Assessment - High Visibility */}
            <div className="lg:col-span-8 flex flex-col gap-3 md:gap-4">
              <div className="bg-linear-to-br from-[#0D245B] to-[#0D3694] rounded-[18px] md:rounded-[24px] p-4 md:p-5 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                      <ClipboardList className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-[8px] md:text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1 block">LIVE ASSESSMENT</span>
                      <h4 className="text-[12px] md:text-[14px] font-black uppercase tracking-tight">Quadratic Equations - Quiz 1</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                    <div className="flex-1 md:flex-none">
                      <p className="text-[8px] md:text-[9px] font-black text-white/50 uppercase mb-1">Status</p>
                      <p className="text-[10px] md:text-[11px] font-black uppercase">66% DONE</p>
                    </div>
                    <button className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 bg-white text-[#0D245B] rounded-xl text-[10px] md:text-[11px] font-black hover:bg-blue-50 transition-all uppercase tracking-widest shadow-xl">
                      RESUME
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Scores Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white border border-slate-100 rounded-[18px] md:rounded-[24px] p-4 md:p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-4 md:mb-5">
                    <h3 className="text-[10px] md:text-[11px] font-black text-[#0D245B] uppercase tracking-widest leading-none">Recent Scores</h3>
                    <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-500" />
                  </div>
                  <div className="space-y-2.5 md:space-y-3.5">
                    {[
                      { title: 'Trigonometry', score: '84%', color: 'blue', date: 'MAY 10' },
                      { title: 'Cell Structure', score: '72%', color: 'emerald', date: 'MAY 08' },
                      { title: 'Chemical Bond', score: '68%', color: 'purple', date: 'MAY 05' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 md:p-3 bg-slate-50 rounded-xl border border-slate-50 transition-all hover:bg-white hover:border-slate-100">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-${item.color}-50 flex items-center justify-center`}>
                            <FileBadge className={`w-3.5 h-3.5 md:w-4 md:h-4 text-${item.color}-500`} />
                          </div>
                          <div>
                            <p className="text-[10px] md:text-[12px] font-black text-[#0D245B] uppercase tracking-tight">{item.title}</p>
                            <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.date}</p>
                          </div>
                        </div>
                        <span className="text-[11px] md:text-[13px] font-black text-[#0D245B]">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-[18px] md:rounded-[24px] p-4 md:p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-4 md:mb-5">
                      <h3 className="text-[10px] md:text-[11px] font-black text-[#0D245B] uppercase tracking-widest leading-none">Upcoming Tests</h3>
                      <CalendarDays className="w-3 h-3 md:w-3.5 md:h-3.5 text-indigo-500" />
                    </div>
                    <div className="space-y-2.5 md:space-y-3.5">
                      {[
                        { title: 'Organic Chem', date: '15 MAY', type: 'Final' },
                        { title: 'Calculus', date: '18 MAY', type: 'Unit' },
                        { title: 'Physics', date: '22 MAY', type: 'Practice' }
                      ].map((test, i) => (
                         <div key={i} className="flex items-center justify-between p-2.5 md:p-3 bg-slate-50 rounded-xl border border-slate-50 group hover:border-indigo-100 transition-all">
                            <div className="flex items-center gap-2 md:gap-3">
                               <div className="flex flex-col items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-lg bg-indigo-50 border border-indigo-100">
                                  <span className="text-[10px] md:text-[11px] font-black text-indigo-600 leading-none">{test.date.split(' ')[0]}</span>
                               </div>
                               <div>
                                  <p className="text-[10px] md:text-[12px] font-black text-[#0D245B] uppercase tracking-tighter">{test.title}</p>
                                  <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{test.type}</p>
                               </div>
                            </div>
                            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                         </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>

            {/* Side Column - Weak Topics & Insights */}
            <div className="lg:col-span-4 flex flex-col gap-3 md:gap-4">
               <div className="bg-[#FFF5F3] border border-orange-100 rounded-[18px] md:rounded-[24px] p-4 md:p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-4 md:mb-5">
                    <h3 className="text-[10px] md:text-[11px] font-black text-orange-900 uppercase tracking-widest">Focus Areas</h3>
                    <AlertTriangle className="w-3 h-3 md:w-3.5 md:h-3.5 text-orange-500" />
                  </div>
                  <div className="space-y-2 md:space-y-2.5">
                    {[
                      { topic: 'Trigonometry IDs', priority: 'High', color: 'red' },
                      { topic: 'Organic Basics', priority: 'High', color: 'red' },
                      { topic: 'Quadratic Eq', priority: 'Medium', color: 'amber' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col p-2.5 md:p-3 bg-white rounded-xl border border-orange-50 shadow-sm transition-all hover:translate-x-1">
                        <span className={`text-[7px] md:text-[8px] font-black text-${item.color}-500 uppercase tracking-widest mb-0.5`}>{item.priority} Priority</span>
                        <h4 className="text-[10px] md:text-[12px] font-black text-[#0D245B] uppercase tracking-tight">{item.topic}</h4>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-indigo-50/50 border border-indigo-100 rounded-[18px] md:rounded-[24px] p-4 md:p-5 shadow-sm flex-1">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-600" />
                    <h3 className="text-[10px] md:text-[11px] font-black text-indigo-900 uppercase tracking-widest">AI Insight</h3>
                  </div>
                  <p className="text-[10px] md:text-[12px] font-black text-indigo-900/70 leading-relaxed uppercase tracking-tight italic">
                    &quot;YOU ARE STRUGGLING WITH TRIGONOMETRIC IDENTITIES. FOCUS ON PRACTICE SET #4 FOR A 15% SCORE BOOST.&quot;
                  </p>
               </div>
            </div>
          </section>
      </div>
    </StudentLayout>
  );
}
