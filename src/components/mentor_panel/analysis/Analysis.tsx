"use client";

import { useState } from "react";
import { 
  Search, ChevronDown, AlertTriangle, Atom, Microscope, 
  GraduationCap, Sparkles, User, List, CheckCircle2, Loader2, Brain, X, Rocket
} from "lucide-react";
import Image from "next/image";
import MentorLayout from "../MentorLayout";

const StatCard = ({ title, value, subtitle, color }: { title: string, value: string, subtitle: string, color: string }) => (
  <div className="bg-white border border-slate-100 rounded-[20px] md:rounded-[28px] p-4 md:p-6 shadow-sm hover:shadow-md transition-all">
    <p className="text-[9px] md:text-[11px] font-black text-[#5B779E] mb-1 md:mb-2 uppercase tracking-widest">{title}</p>
    <div className="flex items-baseline gap-2">
      <h3 className={`text-[22px] md:text-[28px] font-black ${color} tracking-tight uppercase`}>{value}</h3>
      <span className="text-[9px] md:text-[11px] font-black text-emerald-500 uppercase tracking-widest">+12.5%</span>
    </div>
    <p className="text-[9px] md:text-[11px] font-black text-[#5B779E] mt-1 uppercase tracking-widest">{subtitle}</p>
  </div>
);

const TopicItem = ({ icon: Icon, title, percentage, priorityText, priorityColor, iconBg, iconColor }: any) => (
  <div className="flex items-center justify-between p-3 md:p-5 bg-slate-50/50 rounded-[18px] md:rounded-[24px] hover:bg-white hover:border-slate-100 transition-all border border-transparent shadow-sm group">
    <div className="flex items-center gap-3 md:gap-4">
      <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${iconBg} flex items-center justify-center border border-current/10 shadow-sm transition-transform group-hover:scale-105`}>
        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${iconColor}`} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-tight">{title}</h4>
        <p className="text-[9px] md:text-[11px] text-[#5B779E] font-black uppercase tracking-widest mt-0.5">{percentage}% students struggling</p>
      </div>
    </div>
    <span className={`text-[8px] md:text-[9px] font-black px-1.5 md:px-2 py-1 rounded-lg uppercase tracking-[0.15em] border border-current/10 ${priorityColor} ${iconBg}`}>
      {priorityText}
    </span>
  </div>
);

const PerformanceItem = ({ title, avgScore, status, icon: Icon, bgColor, iconColor }: any) => (
  <div className="flex items-center justify-between p-3 md:p-5 bg-slate-50/50 rounded-[18px] md:rounded-[24px] hover:bg-white hover:border-slate-100 transition-all border border-transparent shadow-sm group">
    <div className="flex items-center gap-3 md:gap-4">
      <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${bgColor} flex items-center justify-center border border-current/20 shadow-sm transition-transform group-hover:scale-105`}>
        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${iconColor}`} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-tight">{title}</h4>
        <p className="text-[9px] md:text-[11px] text-[#5B779E] font-black uppercase tracking-widest mt-0.5">AVG SCORE: {avgScore}</p>
      </div>
    </div>
    <span className={`px-2 py-1 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] border ${
      status === 'Live' 
        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
        : 'bg-blue-50 text-[#0D245B] border-blue-100'
    }`}>
      {status}
    </span>
  </div>
);

const weakTopicsList = [
  {
    icon: AlertTriangle,
    title: "Trigonometry Identities",
    percentage: "67",
    priorityText: "High Priority",
    priorityColor: "text-red-500",
    iconBg: "bg-red-50",
    iconColor: "text-red-500"
  },
  {
    icon: AlertTriangle,
    title: "Organic Chemistry Basics",
    percentage: "56",
    priorityText: "High Priority",
    priorityColor: "text-red-500",
    iconBg: "bg-red-50",
    iconColor: "text-red-500"
  },
  {
    icon: AlertTriangle,
    title: "Quadratic Equations",
    percentage: "44",
    priorityText: "Medium Priority",
    priorityColor: "text-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500"
  },
  {
    icon: User,
    title: "Cell Structure",
    percentage: "36",
    priorityText: "Medium Priority",
    priorityColor: "text-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500"
  }
];

export default function Analysis() {
  const [selectedTest, setSelectedTest] = useState("All Tests");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Calculate dynamic top weak topic
  const topWeakTopic = weakTopicsList.length > 0 ? weakTopicsList[0].title : "fundamental concepts";

  const handleGenerateTest = () => {
    setIsGenerating(true);
    setGenerationStep(1);
    
    // Simulate complex AI generation process
    setTimeout(() => setGenerationStep(2), 2000);
    setTimeout(() => setGenerationStep(3), 4500);
    setTimeout(() => {
      setGenerationStep(4);
      setTimeout(() => {
        setIsGenerating(false);
        setShowSuccess(true);
      }, 1000);
    }, 7000);
  };

  return (
    <MentorLayout>
          {/* Header Section */}
          <section className="mb-4 md:mb-6 px-1 mt-4">
            <div className="flex items-center gap-3 mb-2 bg-slate-50 border border-slate-100 rounded-2xl px-4 md:px-5 py-2 md:py-3 w-full md:w-fit shadow-sm">
               <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#5B779E] shrink-0" strokeWidth={2.5} />
               <input 
                 type="text" 
                 placeholder="Search tests, students, topics..." 
                 className="bg-transparent border-none outline-none text-[11px] md:text-[13px] font-black text-[#0D245B] placeholder:text-slate-400 w-full md:w-64 uppercase tracking-tight"
               />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-6 md:mt-8 gap-4 md:gap-6">
              <div className="w-full">
                <h1 className="text-[18px] md:text-2xl font-black text-[#0D245B] tracking-tight uppercase">Analysis Overview</h1>
                <p className="text-[#5B779E] font-black text-[9px] md:text-[12px] mt-1 uppercase tracking-[0.15em]">
                  Deep insights for better outcomes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
                <div className="space-y-1.5 w-full sm:w-auto">
                  <p className="text-[9px] md:text-[11px] font-black text-[#5B779E] px-2 uppercase tracking-widest">Select Test</p>
                  <div className="relative">
                    <select 
                      value={selectedTest}
                      onChange={(e) => setSelectedTest(e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl pl-3 md:pl-4 pr-8 md:pr-10 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm min-w-[140px] md:min-w-[200px] uppercase tracking-tight"
                    >
                      <option>All Tests</option>
                      <option>Quadratic Equations</option>
                      <option>Trigonometry</option>
                    </select>
                    <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5 w-full sm:w-auto">
                  <p className="text-[9px] md:text-[11px] font-black text-[#5B779E] px-2 uppercase tracking-widest">Select Class</p>
                  <div className="relative">
                    <select 
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl pl-3 md:pl-4 pr-8 md:pr-10 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm min-w-[140px] md:min-w-[200px] uppercase tracking-tight"
                    >
                      <option>All Classes</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                    </select>
                    <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-1 mb-10">
            {/* Left: Top Weak Topics */}
            <div className="bg-white border border-slate-100 rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm">
              <h3 className="text-[9px] md:text-[11px] font-black text-[#5B779E] mb-4 md:mb-6 px-2 uppercase tracking-widest">Top Weak Topics</h3>
              <div className="space-y-3 md:space-y-4">
                {weakTopicsList.map((topic, index) => (
                  <TopicItem 
                    key={index}
                    icon={topic.icon} 
                    title={topic.title} 
                    percentage={topic.percentage} 
                    priorityText={topic.priorityText} 
                    priorityColor={topic.priorityColor} 
                    iconBg={topic.iconBg}
                    iconColor={topic.iconColor}
                  />
                ))}
              </div>
            </div>

            {/* Right: Recent Test Performance */}
            <div className="bg-white border border-slate-100 rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm">
              <h3 className="text-[9px] md:text-[11px] font-black text-[#5B779E] mb-4 md:mb-6 px-2 uppercase tracking-widest">Recent Performance</h3>
              <div className="space-y-3 md:space-y-4">
                <PerformanceItem 
                  title="Quadratic - Quiz 1" 
                  avgScore="68%" 
                  status="Live" 
                  icon={List}
                  bgColor="bg-blue-50"
                  iconColor="text-blue-500"
                />
                <PerformanceItem 
                  title="Cell Structure" 
                  avgScore="72%" 
                  status="Completed" 
                  icon={User}
                  bgColor="bg-slate-50"
                  iconColor="text-[#0D245B]"
                />
                <PerformanceItem 
                  title="Photosynthesis" 
                  avgScore="60%" 
                  status="Live" 
                  icon={Microscope}
                  bgColor="bg-blue-50"
                  iconColor="text-blue-500"
                />
                <PerformanceItem 
                  title="Chemical Bonding" 
                  avgScore="70%" 
                  status="Completed" 
                  icon={Atom}
                  bgColor="bg-slate-50"
                  iconColor="text-[#0D245B]"
                />
              </div>
            </div>
          </section>

          {/* AI Insight Banner */}
          <section className="px-2 relative mt-10 md:mt-16 mb-10 md:mb-16 w-full">
            <div className="absolute inset-0 bg-blue-100/30 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 text-center lg:text-left p-6 md:p-10 rounded-[28px] md:rounded-[40px] bg-[#0D245B] shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700" />
              
              <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 max-w-full lg:max-w-[70%] relative z-10">
                {/* Glowing AI Orb */}
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-[25px] animate-pulse" />
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-[20px] md:rounded-[24px] bg-white/10 backdrop-blur-md flex items-center justify-center relative shadow-lg border border-white/20">
                    <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-blue-400" strokeWidth={2.5} />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-[10px] md:text-[13px] font-black tracking-[0.2em] text-blue-400 gap-2 mb-2 md:mb-3 uppercase">
                    AI PATTERN DETECTED
                  </h2>
                  <p className="text-white text-[13px] md:text-[20px] font-black leading-tight uppercase tracking-tight">
                    Most students are facing challenges with <span className="text-blue-400 underline decoration-blue-400/30 underline-offset-8">{topWeakTopic}</span>. 
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 w-full lg:w-auto justify-center relative z-10">
                <button 
                  onClick={handleGenerateTest}
                  className="w-full lg:w-auto px-6 md:px-10 py-3 md:py-5 bg-white text-[#0D245B] rounded-[16px] md:rounded-[20px] font-black text-[11px] md:text-[13px] uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-50 transition-all active:scale-95 whitespace-nowrap"
                >
                  Generate Test
                </button>
              </div>
            </div>
          </section>

          {/* Auto-Generation Overlay Modal */}
          {isGenerating && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md px-4 transform transition-all">
              <div className="bg-white rounded-[40px] p-12 max-w-md w-full shadow-2xl relative overflow-hidden flex flex-col items-center border border-white/50 animate-in zoom-in-95 duration-500">
                {/* Background ambient orbs */}
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-blue-50 rounded-full blur-3xl" />
                
                {/* Master Brain Spinner */}
                <div className="w-32 h-32 mb-10 relative flex items-center justify-center">
                  <div className="absolute inset-0 border-[4px] border-dashed border-blue-50 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 border-[4px] border-transparent border-t-blue-600 border-r-blue-900 rounded-full animate-[spin_1.5s_linear_infinite]" />
                  
                  <div className="w-16 h-16 bg-[#0D245B] rounded-full flex items-center justify-center shadow-2xl relative shrink-0">
                    <Brain className="w-8 h-8 text-white relative z-10 animate-pulse" strokeWidth={2.5} />
                  </div>
                </div>

                <h3 className="text-[24px] font-black text-[#0D245B] mb-2 text-center tracking-tight uppercase">AI Generating Test</h3>
                <p className="text-[11px] text-[#5B779E] font-black mb-12 text-center px-4 leading-relaxed uppercase tracking-widest">
                  Analyzing <span className="text-blue-600">{topWeakTopic}</span> and crafting perfectly balanced questions...
                </p>

                <div className="w-full space-y-6 relative z-10">
                  <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-50 -z-10 rounded-full" />
                  <div 
                    className="absolute left-[15px] top-4 w-[2px] bg-blue-600 -z-10 rounded-full transition-all duration-1000"
                    style={{ height: generationStep === 1 ? '30%' : generationStep === 2 ? '65%' : generationStep >= 3 ? '100%' : '0%' }}
                  />

                  <div className={`flex items-center gap-5 transition-all duration-700 ${generationStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${generationStep > 1 ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-500/20'}`}>
                       {generationStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-4 h-4 animate-spin" />}
                    </div>
                    <span className={`text-[13px] font-black uppercase tracking-tight ${generationStep > 1 ? 'text-emerald-600' : 'text-[#0D245B]'}`}>Analyzing Weaknesses</span>
                  </div>
                  
                  <div className={`flex items-center gap-5 transition-all duration-700 ${generationStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${generationStep > 2 ? 'bg-emerald-500 border-emerald-500 text-white' : generationStep === 2 ? 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-300'}`}>
                       {generationStep > 2 ? <CheckCircle2 className="w-5 h-5" /> : generationStep === 2 ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                    </div>
                    <span className={`text-[13px] font-black uppercase tracking-tight ${generationStep > 2 ? 'text-emerald-600' : generationStep === 2 ? 'text-[#0D245B]' : 'text-[#5B779E]'}`}>Formulating Questions</span>
                  </div>

                  <div className={`flex items-center gap-5 transition-all duration-700 ${generationStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${generationStep > 3 ? 'bg-emerald-500 border-emerald-500 text-white' : generationStep === 3 ? 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-300'}`}>
                       {generationStep > 3 ? <CheckCircle2 className="w-5 h-5" /> : generationStep === 3 ? <Atom className="w-4 h-4 animate-spin" /> : <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                    </div>
                    <span className={`text-[13px] font-black uppercase tracking-tight ${generationStep > 3 ? 'text-emerald-600' : generationStep === 3 ? 'text-[#0D245B]' : 'text-[#5B779E]'}`}>Generating Options</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Generation Success Modal */}
          {showSuccess && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md px-4">
               <div className="bg-white rounded-[40px] p-12 max-w-md w-full shadow-2xl relative text-center border border-white/50 animate-in zoom-in-95 duration-500">
                 <button onClick={() => setShowSuccess(false)} className="absolute top-8 right-8 p-2 hover:bg-slate-50 rounded-xl transition-all active:scale-95 z-10">
                   <X className="w-5 h-5 text-slate-400" strokeWidth={2.5} />
                 </button>
                 
                 <div className="relative mb-8 mt-4">
                   <div className="w-24 h-24 bg-emerald-500 text-white rounded-[30px] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                     <CheckCircle2 className="w-12 h-12" strokeWidth={2.5} />
                   </div>
                   <Sparkles className="absolute -top-3 right-[20%] w-8 h-8 text-emerald-400 animate-pulse" />
                 </div>
                 
                 <h3 className="text-[28px] font-black text-[#0D245B] mb-2 tracking-tight uppercase">Test Ready!</h3>
                 <p className="text-[11px] text-[#5B779E] font-black mb-12 px-2 leading-relaxed uppercase tracking-widest">
                   Mentix AI has successfully generated a perfectly balanced 15-question micro-test focused exclusively on <span className="text-blue-600">{topWeakTopic}</span>.
                 </p>
                 
                 <div className="flex flex-col gap-4">
                   <button onClick={() => setShowSuccess(false)} className="w-full py-5 rounded-[20px] bg-[#0D245B] hover:bg-[#0D3694] text-white font-black text-[13px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.2em]">
                     <Rocket className="w-4 h-4" /> Publish Now
                   </button>
                   <button onClick={() => setShowSuccess(false)} className="w-full py-5 rounded-[20px] bg-slate-50 hover:bg-slate-100 text-[#0D245B] font-black text-[13px] transition-all active:scale-95 uppercase tracking-[0.2em]">
                     Review Manually
                   </button>
                 </div>
               </div>
            </div>
          )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E2E8F0;
          border-radius: 20px;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}} />
    </MentorLayout>
  );
}
