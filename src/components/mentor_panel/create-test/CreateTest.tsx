"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, ChevronDown, Rocket, 
  CheckCircle2, Clock, AlertCircle, HelpCircle,
  Trash2, Plus, Hash, ListTodo, MousePointer2, PlusCircle, GripVertical, Calendar
} from "lucide-react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

type QuestionType = "single" | "multiple" | "integer";

interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options: string[];
  correctAnswer: any;
  marks: number;
}

const BackgroundOrbs = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E0EFFF] to-[#C9E0FC] blur-[100px] opacity-70" />
    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E8F3FF] to-[#D4E8FF] blur-[80px] opacity-60" />
    <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E6F0F9] to-[#CCE3FA] blur-[120px] opacity-80" />
  </div>
);

export default function CreateTest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(true);
  const [publishType, setPublishType] = useState<"now" | "schedule">("now");
  const [publishDateTime, setPublishDateTime] = useState("");
  const [resultType, setResultType] = useState<"immediate" | "schedule">("immediate");
  const [resultDateTime, setResultDateTime] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "single",
      text: "",
      options: ["", "", "", ""],
      correctAnswer: null,
      marks: 1,
    }
  ]);

  const steps = [
    { id: 1, label: "Test Details" },
    { id: 2, label: "Add Questions" },
    { id: 3, label: "Review" },
    { id: 4, label: "Publish" }
  ];

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      type: "single",
      text: "",
      options: ["", "", "", ""],
      correctAnswer: null,
      marks: 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const addOption = (qId: number) => {
    const q = questions.find(q => q.id === qId);
    if (q && q.options.length < 6) {
      updateQuestion(qId, { options: [...q.options, ""] });
    }
  };

  const removeOption = (qId: number, optIndex: number) => {
    const q = questions.find(q => q.id === qId);
    if (q && q.options.length > 2) {
      const newOptions = q.options.filter((_, i) => i !== optIndex);
      updateQuestion(qId, { options: newOptions });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F0F5FA] overflow-hidden font-sans text-slate-800">
      
      <BackgroundOrbs />

      {/* Main Layout Container */}
      <div className="relative z-10 flex h-screen p-4 gap-6">
        
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-10 custom-scrollbar">
          
          <Navbar />

          {/* Header Section */}
          <section className="mb-6 px-2 mt-2">
            <h1 className="text-[32px] font-bold text-[#0D245B] tracking-tight mb-1">
              Create New Test
            </h1>
            <p className="text-[#5B779E] text-[15px] font-medium">
              Build a new assessment in simple steps.
            </p>
          </section>

          {/* Stepper */}
          <section className="px-2 mb-8">
            <div className="flex items-center gap-4 w-3/4 max-w-3xl">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-3 flex-1">
                  <div className={`flex items-center gap-2 ${step.id === currentStep ? "text-blue-600 font-bold" : "text-[#5B779E] font-medium"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-colors ${
                      step.id < currentStep ? "bg-blue-600 border-blue-600 text-white" : 
                      step.id === currentStep ? "bg-white border-blue-600 text-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.2)]" : 
                      "bg-white border-slate-300 text-slate-400"
                    }`}>
                      {step.id < currentStep ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                    </div>
                    <span className="text-[14.5px] whitespace-nowrap">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-px bg-slate-200 flex-1 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Content Flex Layout */}
          <section className="flex gap-6 px-2 items-start">
            
            {/* Left Box: Form */}
            <div className="flex-1 bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] p-8 shadow-[0_8px_24px_rgba(30,100,200,0.06),_inset_0_2px_4px_rgba(255,255,255,0.8)]">
              
              {currentStep === 1 && (
                <>
                  <h3 className="text-[18px] font-bold text-[#0D245B] mb-6">Test Information</h3>
                  
                  {/* Form Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="col-span-1 space-y-2">
                      <label className="text-[13.5px] font-bold text-[#0D245B]">Test Title <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Enter test title" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm" />
                    </div>
                    
                    <div className="col-span-1 space-y-2">
                      <label className="text-[13.5px] font-bold text-[#0D245B]">Subject <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-[14px] font-medium text-slate-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm">
                          <option value="">Select subject</option>
                          <option value="math">Mathematics</option>
                          <option value="science">Science</option>
                          <option value="english">English</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="col-span-1 space-y-2">
                      <label className="text-[13.5px] font-bold text-[#0D245B]">Class <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-[14px] font-medium text-slate-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm">
                          <option value="">Select class</option>
                          <option value="9">Class 9</option>
                          <option value="10">Class 10</option>
                          <option value="11">Class 11</option>
                          <option value="12">Class 12</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="col-span-2 space-y-2">
                      <label className="text-[13.5px] font-bold text-[#0D245B]">Description (optional)</label>
                      <textarea placeholder="Enter description" className="w-full h-24 bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm resize-none"></textarea>
                    </div>

                    <div className="col-span-2 grid grid-cols-5 gap-6">
                       <div className="col-span-2 space-y-2">
                          <label className="text-[13.5px] font-bold text-[#0D245B]">Duration <span className="text-red-500">*</span></label>
                          <div className="flex gap-2 items-center">
                            <div className="flex-1 flex flex-col items-center gap-1">
                              <input type="text" defaultValue="01" className="w-14 text-center bg-white border border-slate-200 rounded-xl py-2.5 text-[15px] font-bold text-[#0D245B] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm" />
                              <span className="text-[11px] font-medium text-[#5B779E]">Hours</span>
                            </div>
                            <span className="text-xl font-bold text-slate-300 pb-5">:</span>
                            <div className="flex-1 flex flex-col items-center gap-1">
                              <input type="text" defaultValue="30" className="w-14 text-center bg-white border border-slate-200 rounded-xl py-2.5 text-[15px] font-bold text-[#0D245B] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm" />
                              <span className="text-[11px] font-medium text-[#5B779E]">Minutes</span>
                            </div>
                            <span className="text-xl font-bold text-slate-300 pb-5">:</span>
                            <div className="flex-1 flex flex-col items-center gap-1">
                              <input type="text" defaultValue="00" className="w-14 text-center bg-white border border-slate-200 rounded-xl py-2.5 text-[15px] font-bold text-[#0D245B] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm" />
                              <span className="text-[11px] font-medium text-[#5B779E]">Seconds</span>
                            </div>
                          </div>
                       </div>

                       <div className="col-span-1 space-y-2">
                          <label className="text-[13.5px] font-bold text-[#0D245B]">Total Marks <span className="text-red-500">*</span></label>
                          <input type="number" defaultValue="100" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pl-5 text-[14px] font-bold text-[#0D245B] placeholder:text-slate-400 focus:outline-none transition-all shadow-sm" />
                       </div>

                       <div className="col-span-1 space-y-2">
                          <label className="text-[13.5px] font-bold text-[#0D245B]">Passing Marks <span className="text-red-500">*</span></label>
                          <input type="number" defaultValue="40" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pl-5 text-[14px] font-bold text-[#0D245B] placeholder:text-slate-400 focus:outline-none transition-all shadow-sm" />
                       </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-slate-200/60 mb-8"></div>

                  <h3 className="text-[18px] font-bold text-[#0D245B] mb-6">Additional Settings</h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-10">
                     <div className="col-span-1 space-y-2">
                      <label className="text-[13.5px] font-bold text-[#0D245B]">Difficulty Level</label>
                      <div className="relative">
                        <select className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-[14px] font-medium text-slate-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm">
                          <option value="">Select level</option>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                     </div>

                     <div className="col-span-1 space-y-2">
                      <label className="text-[13.5px] font-bold text-[#0D245B]">Negative Marking</label>
                      <div className="relative">
                        <select className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-[14px] font-medium text-slate-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm">
                          <option value="">Select option</option>
                          <option value="0">No negative marking</option>
                          <option value="0.25">-1 per wrong answer</option>
                          <option value="0.5">-2 per wrong answer</option>
                          <option value="0.75">-3 per wrong answer</option> 
                          <option value="1">-4 per wrong answer</option>  
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                     </div>

                     <div className="col-span-2 space-y-4 pt-6 border-t border-slate-100 mt-4">
                        {/* Publish Schedule */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h4 className="text-[15px] font-bold text-[#0D245B]">Publish Schedule</h4>
                            <p className="text-[12px] text-[#5B779E] font-medium">Choose when this test will be visible to students.</p>
                          </div>
                          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button 
                              type="button"
                              onClick={() => setPublishType("now")}
                              className={`px-4 py-1.5 rounded-lg text-[12.5px] font-bold transition-all ${publishType === 'now' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Publish Now
                            </button>
                            <button 
                              type="button"
                              onClick={() => setPublishType("schedule")}
                              className={`px-4 py-1.5 rounded-lg text-[12.5px] font-bold transition-all ${publishType === 'schedule' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Schedule
                            </button>
                          </div>
                        </div>

                        {publishType === 'schedule' && (
                          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#0D245B] flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-blue-500" /> Select Date & Time
                              </label>
                              <input 
                                type="datetime-local" 
                                value={publishDateTime}
                                onChange={(e) => setPublishDateTime(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-bold text-[#0D245B] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm"
                              />
                            </div>
                          </div>
                        )}

                        {/* Result Visibility */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                          <div className="space-y-0.5">
                            <h4 className="text-[15px] font-bold text-[#0D245B]">Result Visibility</h4>
                            <p className="text-[12px] text-[#5B779E] font-medium">Choose when students can view their results.</p>
                          </div>
                          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button 
                              type="button"
                              onClick={() => setResultType("immediate")}
                              className={`px-4 py-1.5 rounded-lg text-[12.5px] font-bold transition-all ${resultType === 'immediate' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Immediately
                            </button>
                            <button 
                              type="button"
                              onClick={() => setResultType("schedule")}
                              className={`px-4 py-1.5 rounded-lg text-[12.5px] font-bold transition-all ${resultType === 'schedule' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Schedule
                            </button>
                          </div>
                        </div>

                        {resultType === 'schedule' && (
                          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#0D245B] flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-blue-500" /> Select Date & Time
                              </label>
                              <input 
                                type="datetime-local" 
                                value={resultDateTime}
                                onChange={(e) => setResultDateTime(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-bold text-[#0D245B] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm"
                              />
                            </div>
                          </div>
                        )}
                     </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-end pt-6 mt-4">
                     <div className="flex gap-4">
                        <button className="py-2.5 px-6 rounded-xl font-bold text-[#5B779E] text-[14.5px] border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
                          Cancel
                        </button>
                        <button 
                          onClick={() => setCurrentStep(2)}
                          className="py-2.5 px-6 rounded-xl bg-blue-600 text-white font-bold text-[14.5px] shadow-[0_8px_20px_rgba(37,99,235,0.3),_inset_0_2px_4px_rgba(255,255,255,0.3)] hover:bg-blue-700 transition-colors flex items-center gap-2 active:scale-95"
                        >
                          Next: Add Questions <ArrowRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#0D245B]">Add Questions</h3>
                      <p className="text-[14px] text-[#5B779E] font-medium">Total questions: {questions.length}</p>
                    </div>
                    <button 
                      onClick={addQuestion}
                      className="py-2.5 px-5 rounded-2xl bg-blue-600 text-white font-bold text-[14px] flex items-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:bg-blue-700 transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" /> Add New Question
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    {questions.map((q, index) => (
                      <div key={q.id} className="relative group bg-white border border-slate-200 rounded-[28px] p-7 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)] transition-all duration-300">
                        {/* Question Header */}
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-4">
                            <div className="cursor-move p-1 text-slate-300 hover:text-slate-400">
                              <GripVertical className="w-5 h-5" />
                            </div>
                            <span className="text-[15px] font-bold text-[#0D245B] bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-100/50">
                              Question {index + 1}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {/* Type Selector */}
                            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                              <button 
                                onClick={() => updateQuestion(q.id, { type: "single" })}
                                className={`p-1.5 rounded-lg transition-all flex items-center gap-2 px-3 text-[12px] font-bold ${q.type === 'single' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Single Choice"
                              >
                                <MousePointer2 className="w-3.5 h-3.5" />
                                {q.type === 'single' && "Single Choice"}
                              </button>
                              <button 
                                onClick={() => updateQuestion(q.id, { type: "multiple" })}
                                className={`p-1.5 rounded-lg transition-all flex items-center gap-2 px-3 text-[12px] font-bold ${q.type === 'multiple' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Multiple Choice"
                              >
                                <ListTodo className="w-3.5 h-3.5" />
                                {q.type === 'multiple' && "Multiple Choice"}
                              </button>
                              <button 
                                onClick={() => updateQuestion(q.id, { type: "integer" })}
                                className={`p-1.5 rounded-lg transition-all flex items-center gap-2 px-3 text-[12px] font-bold ${q.type === 'integer' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Integer Based"
                              >
                                <Hash className="w-3.5 h-3.5" />
                                {q.type === 'integer' && "Integer Based"}
                              </button>
                            </div>
                            
                            <div className="w-px h-6 bg-slate-200 mx-1" />
                            
                            <button 
                              onClick={() => removeQuestion(q.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </div>

                        {/* Question Input */}
                        <div className="mb-6">
                          <textarea 
                            value={q.text}
                            onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                            placeholder="Type your question here..." 
                            className="w-full h-24 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-[15px] font-medium text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all resize-none shadow-inner"
                          />
                        </div>

                        {/* Options / Answer Section */}
                        {q.type !== 'integer' ? (
                          <div className="space-y-3">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="flex items-center gap-4 group/opt">
                                <button 
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                                    q.type === 'single' 
                                      ? (q.correctAnswer === optIdx ? 'bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]' : 'border-slate-300 hover:border-blue-400')
                                      : (Array.isArray(q.correctAnswer) && q.correctAnswer.includes(optIdx) ? 'bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)] rounded-lg' : 'border-slate-300 hover:border-blue-400 rounded-lg')
                                  }`}
                                  onClick={() => {
                                    if (q.type === 'single') {
                                      updateQuestion(q.id, { correctAnswer: optIdx });
                                    } else {
                                      const current = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
                                      const next = current.includes(optIdx) 
                                        ? current.filter(i => i !== optIdx) 
                                        : [...current, optIdx];
                                      updateQuestion(q.id, { correctAnswer: next });
                                    }
                                  }}
                                >
                                  {(q.type === 'single' ? q.correctAnswer === optIdx : Array.isArray(q.correctAnswer) && q.correctAnswer.includes(optIdx)) && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                  )}
                                </button>
                                
                                <div className="flex-1 relative">
                                  <input 
                                    type="text" 
                                    value={opt}
                                    onChange={(e) => {
                                      const newOpts = [...q.options];
                                      newOpts[optIdx] = e.target.value;
                                      updateQuestion(q.id, { options: newOpts });
                                    }}
                                    placeholder={`Option ${optIdx + 1}`} 
                                    className={`w-full bg-white border rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all focus:outline-none ${
                                      (q.type === 'single' ? q.correctAnswer === optIdx : Array.isArray(q.correctAnswer) && q.correctAnswer.includes(optIdx))
                                        ? 'border-blue-300 ring-2 ring-blue-500/5 bg-blue-50/10'
                                        : 'border-slate-200 focus:border-blue-400'
                                    }`}
                                  />
                                </div>
                                
                                {q.options.length > 2 && (
                                  <button 
                                    onClick={() => removeOption(q.id, optIdx)}
                                    className="opacity-0 group-hover/opt:opacity-100 p-2 text-slate-300 hover:text-red-400 transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            
                            {q.options.length < 6 && (
                              <button 
                                onClick={() => addOption(q.id)}
                                className="flex items-center gap-2 text-[13px] font-bold text-blue-600 hover:text-blue-700 mt-2 px-10 transition-colors"
                              >
                                <PlusCircle className="w-4 h-4" /> Add Option
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="bg-slate-50/50 rounded-2xl p-6 border border-dashed border-slate-300 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-500">
                                <Hash className="w-4 h-4" />
                              </div>
                              <span className="text-[14px] font-bold text-[#0D245B]">Correct Answer (Numeric)</span>
                            </div>
                            <input 
                              type="number" 
                              value={q.correctAnswer || ""}
                              onChange={(e) => updateQuestion(q.id, { correctAnswer: e.target.value })}
                              placeholder="Type correct integer value..." 
                              className="w-full max-w-[240px] bg-white border border-slate-200 rounded-xl px-5 py-3 text-[15px] font-bold text-[#0D245B] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm"
                            />
                            <p className="text-[12px] text-[#5B779E] font-medium italic">Note: Only numeric answers will be accepted for this question.</p>
                          </div>
                        )}

                        {/* Question Footer */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-[#0D245B]">Marks:</span>
                            <input 
                              type="number" 
                              value={q.marks}
                              onChange={(e) => updateQuestion(q.id, { marks: parseInt(e.target.value) || 0 })}
                              className="w-16 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[14px] font-bold text-[#0D245B] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-center shadow-inner"
                              min="0"
                            />
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                              <span className="text-[13px] font-bold text-[#0D245B]">Required</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-10 mt-10 border-t border-slate-200/60">
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="py-2.5 px-8 rounded-xl font-bold text-[#5B779E] text-[15px] border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setCurrentStep(3)}
                      className="py-2.5 px-8 rounded-xl bg-blue-600 text-white font-bold text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.3),_inset_0_2px_4px_rgba(255,255,255,0.3)] hover:bg-blue-700 transition-colors flex items-center gap-2 active:scale-95"
                    >
                      Next: Review
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8 px-2">
                    <div>
                      <h3 className="text-[22px] font-bold text-[#0D245B]">Review Test</h3>
                      <p className="text-[14px] text-[#5B779E] font-medium">Please verify all details before publishing.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-end">
                      <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[13px] font-bold border border-blue-100 flex items-center gap-2 shrink-0">
                        Total Marks: {questions.reduce((acc, q) => acc + q.marks, 0)}
                      </div>
                      {publishType === 'schedule' && publishDateTime && (
                        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[13px] font-bold border border-emerald-100 flex items-center gap-2 shrink-0">
                          <Clock className="w-3.5 h-3.5" /> Published: {new Date(publishDateTime).toLocaleString()}
                        </div>
                      )}
                      {resultType === 'schedule' && resultDateTime && (
                        <div className="bg-purple-50 text-purple-600 px-4 py-2 rounded-xl text-[13px] font-bold border border-purple-100 flex items-center gap-2 shrink-0">
                          <AlertCircle className="w-3.5 h-3.5" /> Results: {new Date(resultDateTime).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    {questions.map((q, index) => (
                      <div key={q.id} className="bg-white/40 border border-white/60 rounded-2xl p-5 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[13px] shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-[15px] font-bold text-[#0D245B] line-clamp-1">{q.text || "(No question text)"}</h4>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{q.type}</span>
                          </div>
                          <p className="text-[12px] text-[#5B779E] font-medium">
                            {q.type === 'integer' ? `Correct Answer: ${q.correctAnswer || 'Not set'}` : `${q.options.filter(o => o).length} Options • ${q.marks} Mark${q.marks > 1 ? 's' : ''}`}
                          </p>
                        </div>
                        <button onClick={() => setCurrentStep(2)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                           <Rocket className="w-4 h-4 rotate-[270deg]" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-10 border-t border-slate-200/60">
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="py-2.5 px-8 rounded-xl font-bold text-[#5B779E] text-[15px] border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      Back to Edit
                    </button>
                    <button 
                      onClick={() => setShowConfirmModal(true)}
                      className="py-2.5 px-10 rounded-xl bg-blue-600 text-white font-bold text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-colors active:scale-95 flex items-center gap-2"
                    >
                      Confirm & Publish <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Custom Confirmation Modal */}
              {showConfirmModal && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
                  <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-10 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/50 transform animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 rounded-[24px] bg-blue-50 text-blue-500 flex items-center justify-center mb-8 mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <h3 className="text-[24px] font-black text-[#0D245B] text-center mb-4 leading-tight">
                      Publish Test?
                    </h3>

                    <p className="text-[15px] text-slate-500 font-medium text-center mb-6 leading-relaxed">
                      Please enter your master password to confirm and publish this test.
                    </p>

                    <div className="mb-8">
                      <label className="text-[13px] font-bold text-[#0D245B] block mb-2 text-center">
                        Master Password
                      </label>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => {
                          setAdminPassword(e.target.value);
                          setPasswordError("");
                        }}
                        className={`w-full px-4 py-3 bg-slate-50/50 border ${passwordError ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-blue-100'} rounded-xl focus:outline-none focus:ring-2 text-center font-medium text-slate-700 transition-all`}
                        placeholder="••••••••"
                      />
                      {passwordError && (
                        <p className="text-red-500 text-[12px] font-bold text-center mt-2">{passwordError}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          if (adminPassword !== "admin123") {
                            setPasswordError("Incorrect password. Please try again.");
                            return;
                          }
                          setShowConfirmModal(false);
                          setAdminPassword("");
                          setPasswordError("");
                          setCurrentStep(4);
                        }}
                        className="w-full py-4 rounded-2xl font-black text-[15px] transition-all shadow-md active:scale-95 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Confirm & Publish
                      </button>
                      <button
                        onClick={() => {
                          setShowConfirmModal(false);
                          setAdminPassword("");
                          setPasswordError("");
                        }}
                        className="w-full py-4 rounded-2xl font-bold text-[15px] text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center py-20 flex flex-col items-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0D245B] mb-2">
                    {publishType === 'schedule' ? 'Test Scheduled Successfully!' : 'Test Published Successfully!'}
                  </h3>
                  <p className="text-slate-500 mb-10 font-medium text-center max-w-md">
                    {publishType === 'schedule' 
                      ? `Students will be able to see and attempt this test starting from ${publishDateTime ? new Date(publishDateTime).toLocaleString() : 'the scheduled time'}.` 
                      : 'Students can now see and attempt this test in their panel.'}
                  </p>
                  <Link 
                    href="/mentor-dashboard"
                    className="py-3 px-10 rounded-2xl bg-[#0D245B] text-white font-bold text-[15px] shadow-[0_8px_24px_rgba(13,36,91,0.2)] hover:bg-slate-900 transition-all active:scale-95 no-underline"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              )}

            </div>

            {/* Right Box: Tips */}
            <div className="w-[320px] bg-gradient-to-b from-[#EBF4FF] to-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-[0_12px_32px_rgba(30,100,200,0.1),_inset_0_2px_8px_rgba(255,255,255,0.9)] flex flex-col items-center relative overflow-hidden shrink-0">
               {/* Decorative glow inside */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/50 rounded-full blur-2xl" />

               <div className="w-24 h-24 bg-blue-100 rounded-full mb-6 flex justify-center items-center relative shadow-[inset_0_4px_10px_rgba(255,255,255,0.8)]">
                  <Rocket className="w-12 h-12 text-blue-600 fill-blue-500/20" strokeWidth={1.5} />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full blur-md opacity-60"></div>
               </div>

               <h4 className="text-[15.5px] font-bold text-[#0D245B] mb-6 text-center">
                 Tips for creating effective tests
               </h4>

               <ul className="w-full space-y-4 mb-10">
                 <li className="flex items-start gap-3">
                   <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-3 h-3 text-blue-600" />
                   </div>
                   <span className="text-[13px] font-bold text-[#0D245B] leading-[18px]">Add a clear and descriptive test title</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-3 h-3 text-blue-600" />
                   </div>
                   <span className="text-[13px] font-bold text-[#0D245B] leading-[18px]">Set appropriate duration and limit attempts</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-3 h-3 text-blue-600" />
                   </div>
                   <span className="text-[13px] font-bold text-[#0D245B] leading-[18px]">Ensure questions are balanced across topics</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-3 h-3 text-blue-600" />
                   </div>
                   <span className="text-[13px] font-bold text-[#0D245B] leading-[18px]">Review before publishing</span>
                 </li>
               </ul>

               <div className="w-full mt-auto">
                 <div className="flex items-center gap-2 mb-3 text-[13px] font-bold text-[#0D245B]">
                   <HelpCircle className="w-4 h-4 text-blue-500" /> Need help?
                 </div>
                 <button className="w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[14px] transition-colors border border-blue-200/60 shadow-sm active:scale-95">
                   Take Guidance
                 </button>
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