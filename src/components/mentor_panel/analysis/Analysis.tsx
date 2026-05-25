"use client";

import { useState } from "react";
import { 
  Search, ChevronDown, AlertTriangle, Atom, Microscope, 
  GraduationCap, Sparkles, User, List, CheckCircle2, Loader2, Brain, X, Rocket
} from "lucide-react";
import Image from "next/image";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const BackgroundOrbs = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E0EFFF] to-[#C9E0FC] blur-[100px] opacity-70" />
    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E8F3FF] to-[#D4E8FF] blur-[80px] opacity-60" />
    <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E6F0F9] to-[#CCE3FA] blur-[120px] opacity-80" />
  </div>
);

const StatCard = ({ title, value, subtitle, color }: { title: string, value: string, subtitle: string, color: string }) => (
  <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all">
    <p className="text-[13px] font-bold text-blue-600 mb-2 uppercase tracking-wide">{title}</p>
    <h3 className={`text-[32px] font-black ${color} mb-1`}>{value}</h3>
    <p className="text-[12.5px] font-medium text-slate-400">{subtitle}</p>
  </div>
);

const TopicItem = ({ icon: Icon, title, percentage, priorityText, priorityColor, iconBg, iconColor }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/40 transition-all border border-transparent hover:border-white/60 group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shadow-sm`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <h4 className="text-[14.5px] font-bold text-[#0D245B] group-hover:text-blue-600 transition-colors">{title}</h4>
        <p className="text-[12px] text-slate-400 font-medium">{percentage}% of students struggling</p>
      </div>
    </div>
    <span className={`text-[11px] font-bold ${priorityColor}`}>
      {priorityText}
    </span>
  </div>
);

const PerformanceItem = ({ title, avgScore, status, icon: Icon, bgColor, iconColor }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/40 transition-all border border-transparent hover:border-white/60 group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center shadow-sm`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <h4 className="text-[14.5px] font-bold text-[#0D245B] group-hover:text-blue-600 transition-colors">{title}</h4>
        <p className="text-[12px] text-slate-400 font-medium">Avg Score: {avgScore}</p>
      </div>
    </div>
    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
      status === 'Live' 
        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
        : 'bg-blue-50 text-[#2A75FF] border border-blue-100'
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
    <div className="relative w-full min-h-screen bg-[#F0F5FA] overflow-hidden font-sans text-slate-800">
      <BackgroundOrbs />

      <div className="relative z-10 flex h-screen p-4 gap-6">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <Navbar />

          {/* Header Section */}
          <section className="mb-8 px-2 mt-4">
            <div className="flex items-center gap-3 mb-2 bg-white/40 backdrop-blur-sm border border-white/60 rounded-full px-4 py-1.5 w-fit">
               <Search className="w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search tests, students, topics..." 
                 className="bg-transparent border-none outline-none text-[13.5px] font-medium text-[#0D245B] placeholder:text-slate-400 w-64"
               />
            </div>
            
            <div className="flex justify-between items-end mt-6">
              <div>
                <h1 className="text-[32px] font-black text-[#0D245B] tracking-tight">Analysis Overview</h1>
                <p className="text-slate-500 font-medium text-[15px] mt-1">
                  Deep insights to help you improve learning outcomes.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 px-1 uppercase tracking-wider">Select Test</p>
                  <div className="relative">
                    <select 
                      value={selectedTest}
                      onChange={(e) => setSelectedTest(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] font-bold text-[#0D245B] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm min-w-[180px]"
                    >
                      <option>All Tests</option>
                      <option>Quadratic Equations</option>
                      <option>Trigonometry</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 px-1 uppercase tracking-wider">Select Class</p>
                  <div className="relative">
                    <select 
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] font-bold text-[#0D245B] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm min-w-[180px]"
                    >
                      <option>All Classes</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Grid */}
          <section className="grid grid-cols-2 gap-8 px-2 mb-8">
            {/* Left: Top Weak Topics */}
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-[18px] font-black text-[#0D245B] mb-6 px-1">Top Weak Topics</h3>
              <div className="space-y-3">
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
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-[18px] font-black text-[#0D245B] mb-6 px-1">Recent Test Performance</h3>
              <div className="space-y-3">
                <PerformanceItem 
                  title="Quadratic Equations - Quiz 1" 
                  avgScore="68%" 
                  status="Live" 
                  icon={List}
                  bgColor="bg-blue-50"
                  iconColor="text-blue-500"
                />
                <PerformanceItem 
                  title="Cell Structure & Functions" 
                  avgScore="72%" 
                  status="Completed" 
                  icon={User}
                  bgColor="bg-blue-100/50"
                  iconColor="text-[#2A75FF]"
                />
                <PerformanceItem 
                  title="Photosynthesis Process" 
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
                  bgColor="bg-blue-100/50"
                  iconColor="text-[#2A75FF]"
                />
              </div>
            </div>
          </section>

          {/* AI Insight Banner - Borderless & Magical */}
          <section className="px-6 relative mt-16 mb-12 w-full">
            {/* Ethereal Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 via-blue-400/10 to-blue-300/10 blur-[60px] pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-8 max-w-[75%]">
                
                {/* Glowing AI Orb */}
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-full blur-[24px] animate-pulse" />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2A75FF] to-[#0D3694] flex items-center justify-center relative shadow-[0_0_40px_rgba(42,117,255,0.4)] border border-white/20">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                {/* Immersive Text */}
                <div>
                  <h2 className="text-[20px] font-black tracking-tight flex items-center gap-3 mb-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-[#0D3694]">
                      AI Analysis Detected a Pattern
                    </span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  </h2>
                  <p className="text-[#0D245B] text-[17px] font-medium leading-relaxed">
                    Most students are facing challenges with <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#0D3694] drop-shadow-sm">{topWeakTopic}</span>. 
                    I recommend generating a personalized micro-test to address this learning gap.
                  </p>
                </div>
              </div>

              {/* Floating Action Button */}
              <div className="flex shrink-0">
                <button 
                  onClick={handleGenerateTest}
                  className="group relative pr-2 pl-6 py-2 bg-white/50 backdrop-blur-xl border border-white/80 rounded-full flex items-center gap-4 hover:bg-white/80 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(42,117,255,0.15)] hover:-translate-y-0.5">
                  <span className="font-black text-[#0D3694] text-[15px]">Generate Test</span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2A75FF] to-[#0D3694] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
            
            {/* Subtle Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent mt-12" />
          </section>

          {/* Auto-Generation Overlay Modal */}
          {isGenerating && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4 transform transition-all">
              <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-10 max-w-md w-full shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col items-center border border-white/50 animate-in zoom-in-[0.95] slide-in-from-bottom-4 duration-500 ease-out">
                {/* Background ambient orbs */}
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-blue-100/50 rounded-full blur-3xl animate-[spin_8s_linear_infinite]" />
                <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-purple-100/50 rounded-full blur-3xl animate-[spin_8s_linear_infinite_reverse]" />
                
                {/* Master Brain Spinner */}
                <div className="w-32 h-32 mb-8 relative flex items-center justify-center">
                  {/* Outer rings */}
                  <div className="absolute inset-0 border-[3px] border-dashed border-blue-200 rounded-full animate-[spin_8s_linear_infinite]" />
                  <div className="absolute inset-2 border-[3px] border-transparent border-t-[#2A75FF] border-r-[#0D3694] rounded-full animate-[spin_1.5s_linear_infinite]" />
                  <div className="absolute inset-4 border-[3px] border-transparent border-b-[#2A75FF] border-l-[#0D3694] rounded-full animate-[spin_2s_linear_infinite_reverse] opacity-70" />
                  
                  {/* Glowing Core */}
                  <div className="w-16 h-16 bg-gradient-to-tr from-[#2A75FF] to-[#0D3694] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(42,117,255,0.5)] relative shrink-0">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-50" />
                    <Brain className="w-8 h-8 text-white relative z-10 animate-bounce" style={{ animationDuration: '2s' }} />
                  </div>
                </div>

                <h3 className="text-[24px] font-black text-[#0D245B] mb-2 text-center tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">AI is Generating Test</h3>
                <p className="text-[14px] text-slate-500 font-medium mb-10 text-center px-4 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
                  Analyzing <span className="font-bold text-[#0D3694]">{topWeakTopic}</span> and crafting perfectly balanced questions...
                </p>

                <div className="w-full space-y-5 relative z-10">
                  {/* Vertical Progress Line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100 -z-10 rounded-full" />
                  <div 
                    className="absolute left-[15px] top-4 w-[2px] bg-gradient-to-b from-[#2A75FF] to-transparent -z-10 rounded-full transition-all duration-1000 ease-out"
                    style={{ height: generationStep === 1 ? '30%' : generationStep === 2 ? '65%' : generationStep >= 3 ? '100%' : '0%' }}
                  />

                  <div className={`flex items-center gap-5 transition-all duration-700 ease-out ${generationStep >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-500 ${generationStep > 1 ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-[#2A75FF] text-[#2A75FF] shadow-[0_0_15px_rgba(42,117,255,0.3)]'}`}>
                       {generationStep > 1 ? <CheckCircle2 className="w-5 h-5 animate-in zoom-in duration-300" /> : <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />}
                    </div>
                    <span className={`text-[15px] font-bold transition-colors duration-500 ${generationStep > 1 ? 'text-emerald-600' : 'text-[#0D245B]'}`}>Analyzing Student Weaknesses</span>
                  </div>
                  
                  <div className={`flex items-center gap-5 transition-all duration-700 ease-out ${generationStep >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-500 ${generationStep > 2 ? 'bg-emerald-500 border-emerald-500 text-white' : generationStep === 2 ? 'bg-white border-[#2A75FF] text-[#2A75FF] shadow-[0_0_15px_rgba(42,117,255,0.3)]' : 'bg-white border-slate-200 text-slate-300'}`}>
                       {generationStep > 2 ? <CheckCircle2 className="w-5 h-5 animate-in zoom-in duration-300" /> : generationStep === 2 ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                    </div>
                    <span className={`text-[15px] font-bold transition-colors duration-500 ${generationStep > 2 ? 'text-emerald-600' : generationStep === 2 ? 'text-[#0D245B]' : 'text-slate-400'}`}>Formulating Questions</span>
                  </div>

                  <div className={`flex items-center gap-5 transition-all duration-700 ease-out ${generationStep >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-500 ${generationStep > 3 ? 'bg-emerald-500 border-emerald-500 text-white' : generationStep === 3 ? 'bg-white border-[#2A75FF] text-[#2A75FF] shadow-[0_0_15px_rgba(42,117,255,0.3)]' : 'bg-white border-slate-200 text-slate-300'}`}>
                       {generationStep > 3 ? <CheckCircle2 className="w-5 h-5 animate-in zoom-in duration-300" /> : generationStep === 3 ? <Atom className="w-4 h-4 animate-[spin_4s_linear_infinite]" /> : <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                    </div>
                    <span className={`text-[15px] font-bold transition-colors duration-500 ${generationStep > 3 ? 'text-emerald-600' : generationStep === 3 ? 'text-[#0D245B]' : 'text-slate-400'}`}>Generating Options & Answers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Generation Success Modal */}
          {showSuccess && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
               <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-10 max-w-md w-full shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative text-center border border-white/50 animate-in zoom-in-[0.90] slide-in-from-bottom-8 duration-500 ease-out">
                 {/* Success background glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px] pointer-events-none" />
                 
                 <button onClick={() => setShowSuccess(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors active:scale-95 z-10">
                   <X className="w-5 h-5 text-slate-400" />
                 </button>
                 
                 <div className="relative mb-8 mt-2">
                   <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(52,211,153,0.4)] animate-in zoom-in-50 duration-500 delay-100">
                     <CheckCircle2 className="w-12 h-12" />
                   </div>
                   {/* Confetti-like sparks */}
                   <Sparkles className="absolute -top-2 right-[20%] w-8 h-8 text-emerald-400 animate-pulse drop-shadow-md" style={{ animationDelay: '0.2s' }} />
                   <Sparkles className="absolute bottom-2 left-[20%] w-6 h-6 text-emerald-300 animate-pulse drop-shadow-md" style={{ animationDelay: '0.5s' }} />
                 </div>
                 
                 <h3 className="text-[28px] font-black text-[#0D245B] mb-3 tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">Test Ready!</h3>
                 <p className="text-[15px] text-slate-500 font-medium mb-10 px-2 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
                   Mentix AI has successfully generated a perfectly balanced 15-question micro-test focused exclusively on <span className="font-bold text-[#0D3694]">{topWeakTopic}</span>.
                 </p>
                 
                 <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
                   <button onClick={() => setShowSuccess(false)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-[#0D3694] hover:from-blue-500 hover:to-blue-700 text-white font-black text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                     <Rocket className="w-4 h-4" /> Publish Now
                   </button>
                   <button onClick={() => setShowSuccess(false)} className="w-full py-4 rounded-2xl bg-[#F0F5FA] hover:bg-blue-50 text-[#0D245B] font-bold text-[15px] transition-all active:scale-95">
                     Review Test Manually
                   </button>
                 </div>
               </div>
            </div>
          )}

        </main>
      </div>

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
    </div>
  );
}
