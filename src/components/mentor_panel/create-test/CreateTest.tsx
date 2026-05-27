"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, ChevronDown, Rocket, 
  CheckCircle2, Clock, AlertCircle, HelpCircle,
  Trash2, Plus, Hash, ListTodo, MousePointer2, PlusCircle, GripVertical, Calendar
} from "lucide-react";
import MentorLayout from "../MentorLayout";

type QuestionType = "single" | "multiple" | "integer";

interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options: string[];
  correctAnswer: any;
  marks: number;
}

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
    <MentorLayout>
          {/* Header Section */}
          <section className="mb-4 md:mb-8 px-1 mt-4">
            <h1 className="text-[15px] md:text-2xl font-black text-[#0D245B] tracking-tight mb-2 uppercase">
              Create New Test
            </h1>
            <p className="text-[#5B779E] text-[9px] md:text-[12px] font-black uppercase tracking-[0.15em]">
              Build a new assessment.
            </p>
          </section>

          {/* Stepper */}
          <section className="px-1 mb-6 md:mb-8 overflow-x-auto no-scrollbar min-h-[80px] flex items-center">
            <div className="flex items-center gap-2 md:gap-4 w-full max-w-4xl min-w-[600px] md:min-w-full py-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className={`flex items-center gap-2 ${step.id === currentStep ? "text-blue-600 font-black" : "text-[#5B779E] font-black"}`}>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-[11px] md:text-[13px] font-black border-2 transition-all duration-300 shrink-0 ${
                      step.id < currentStep ? "bg-emerald-500 border-emerald-500 text-white" : 
                      step.id === currentStep ? "bg-white border-blue-600 text-blue-600 shadow-md" : 
                      "bg-white border-slate-200 text-slate-300"
                    }`}>
                      {step.id < currentStep ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} /> : step.id}
                    </div>
                    <span className="text-[10px] md:text-[12px] whitespace-nowrap uppercase tracking-widest">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 md:mx-4 min-w-[16px] rounded-full transition-all duration-500 ${step.id < currentStep ? 'bg-emerald-400' : 'bg-slate-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Content Flex Layout */}
          <section className="flex flex-col lg:flex-row gap-5 px-1 items-start">
            
            {/* Left Box: Form */}
            <div className="w-full flex-1 bg-white border border-slate-100 rounded-[20px] md:rounded-[32px] p-4 md:p-8 shadow-sm">
              
              {currentStep === 1 && (
                <>
                  <h3 className="text-[11px] md:text-[13px] font-black text-[#0D245B] mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                    Test Info
                  </h3>
                  
                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    <div className="md:col-span-1 space-y-2">
                      <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1">Title <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Enter test title" className="w-full bg-slate-50 border border-slate-100 rounded-[20px] px-3 md:px-5 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all uppercase tracking-tight" />
                    </div>
                    
                    <div className="md:col-span-1 space-y-2">
                      <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1">Subject <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-[20px] pl-3 md:pl-5 pr-8 md:pr-10 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all uppercase tracking-tight">
                          <option value="">Select subject</option>
                          <option value="math">Mathematics</option>
                          <option value="science">Science</option>
                          <option value="english">English</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B779E] pointer-events-none" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="md:col-span-1 space-y-2">
                      <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1">Class <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-[20px] pl-3 md:pl-5 pr-8 md:pr-10 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all uppercase tracking-tight">
                          <option value="">Select class</option>
                          <option value="9">Class 9</option>
                          <option value="10">Class 10</option>
                          <option value="11">Class 11</option>
                          <option value="12">Class 12</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B779E] pointer-events-none" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1">Description</label>
                      <textarea placeholder="Enter description" className="w-full h-24 bg-slate-50 border border-slate-100 rounded-[24px] px-3 md:px-5 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all resize-none uppercase tracking-tight leading-relaxed"></textarea>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-5">
                       <div className="md:col-span-3 space-y-2">
                          <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1 leading-none">Duration <span className="text-red-500">*</span></label>
                          <div className="flex gap-3 items-center justify-between md:justify-start">
                            <div className="flex-1 flex flex-col items-center gap-1.5">
                              <input type="text" defaultValue="01" className="w-full md:w-16 text-center bg-slate-50 border border-slate-100 rounded-[18px] py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all" />
                              <span className="text-[10px] font-black text-[#5B779E] uppercase tracking-widest">Hrs</span>
                            </div>
                            <span className="text-base md:text-xl font-black text-slate-200 pb-6">:</span>
                            <div className="flex-1 flex flex-col items-center gap-1.5">
                              <input type="text" defaultValue="30" className="w-full md:w-16 text-center bg-slate-50 border border-slate-100 rounded-[18px] py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all" />
                              <span className="text-[10px] font-black text-[#5B779E] uppercase tracking-widest">Mins</span>
                            </div>
                            <span className="text-base md:text-xl font-black text-slate-200 pb-6">:</span>
                            <div className="flex-1 flex flex-col items-center gap-1.5">
                              <input type="text" defaultValue="00" className="w-full md:w-16 text-center bg-slate-50 border border-slate-100 rounded-[18px] py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all" />
                              <span className="text-[10px] font-black text-[#5B779E] uppercase tracking-widest">Secs</span>
                            </div>
                          </div>
                       </div>

                       <div className="md:col-span-1 space-y-2">
                          <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1">Total</label>
                          <input type="number" defaultValue="100" className="w-full bg-slate-50 border border-slate-100 rounded-[20px] px-3 md:px-5 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all" />
                       </div>

                       <div className="md:col-span-1 space-y-2">
                          <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1">Pass</label>
                          <input type="number" defaultValue="40" className="w-full bg-slate-50 border border-slate-100 rounded-[20px] px-3 md:px-5 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all" />
                       </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-slate-50 mb-8"></div>

                  <h3 className="text-[11px] md:text-[13px] font-black text-[#0D245B] mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                    <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                    Settings
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                     <div className="md:col-span-1 space-y-2">
                      <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1">Difficulty</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-[20px] pl-3 md:pl-5 pr-8 md:pr-10 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all uppercase tracking-tight">
                          <option value="">Select level</option>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B779E] pointer-events-none" strokeWidth={2.5} />
                      </div>
                     </div>

                     <div className="md:col-span-1 space-y-2">
                      <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest px-1">Negative Marking</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-[20px] pl-3 md:pl-5 pr-8 md:pr-10 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all uppercase tracking-tight">
                          <option value="">Select option</option>
                          <option value="0">No negative marking</option>
                          <option value="0.25">-1 per wrong answer</option>
                          <option value="0.5">-2 per wrong answer</option>
                          <option value="0.75">-3 per wrong answer</option> 
                          <option value="1">-4 per wrong answer</option>  
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B779E] pointer-events-none" strokeWidth={2.5} />
                      </div>
                     </div>

                     <div className="md:col-span-2 space-y-5 pt-8 border-t border-slate-50 mt-4">
                        {/* Publish Schedule */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-[0.1em] leading-none">Publish Schedule</h4>
                            <p className="text-[9px] md:text-[10px] font-black text-[#5B779E] uppercase tracking-widest">When will students see this?</p>
                          </div>
                          <div className="flex bg-slate-100 p-1.5 rounded-[18px] border border-slate-200/50 w-fit">
                            <button 
                              type="button"
                              onClick={() => setPublishType("now")}
                              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-[14px] text-[10px] md:text-[11px] font-black transition-all uppercase tracking-widest ${publishType === 'now' ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Now
                            </button>
                            <button 
                              type="button"
                              onClick={() => setPublishType("schedule")}
                              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-[14px] text-[10px] md:text-[11px] font-black transition-all uppercase tracking-widest ${publishType === 'schedule' ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Later
                            </button>
                          </div>
                        </div>

                        {publishType === 'schedule' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="space-y-2">
                              <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] flex items-center gap-2 uppercase tracking-widest px-1">
                                <Calendar className="w-4 h-4 text-blue-600" strokeWidth={2.5} /> Select Date
                              </label>
                              <input 
                                type="datetime-local" 
                                value={publishDateTime}
                                onChange={(e) => setPublishDateTime(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-[20px] px-3 md:px-5 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all uppercase tracking-tight"
                              />
                            </div>
                          </div>
                        )}

                        {/* Result Visibility */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 border-t border-slate-50 gap-4">
                          <div className="space-y-1">
                            <h4 className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase tracking-[0.1em] leading-none">Result Visibility</h4>
                            <p className="text-[9px] md:text-[10px] font-black text-[#5B779E] uppercase tracking-widest">When are ranks visible?</p>
                          </div>
                          <div className="flex bg-slate-100 p-1.5 rounded-[18px] border border-slate-200/50 w-fit">
                            <button 
                              type="button"
                              onClick={() => setResultType("immediate")}
                              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-[14px] text-[10px] md:text-[11px] font-black transition-all uppercase tracking-widest ${resultType === 'immediate' ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Immediate
                            </button>
                            <button 
                              type="button"
                              onClick={() => setResultType("schedule")}
                              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-[14px] text-[10px] md:text-[11px] font-black transition-all uppercase tracking-widest ${resultType === 'schedule' ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              Delayed
                            </button>
                          </div>
                        </div>

                        {resultType === 'schedule' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="space-y-2">
                              <label className="text-[9px] md:text-[11px] font-black text-[#5B779E] flex items-center gap-2 uppercase tracking-widest px-1">
                                <Clock className="w-4 h-4 text-blue-600" strokeWidth={2.5} /> Select Time
                              </label>
                              <input 
                                type="datetime-local" 
                                value={resultDateTime}
                                onChange={(e) => setResultDateTime(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-[20px] px-3 md:px-5 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all uppercase tracking-tight"
                              />
                            </div>
                          </div>
                        )}
                     </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-end pt-8 mt-4 border-t border-slate-50">
                     <div className="flex gap-4">
                        <button className="py-2 md:py-3 px-4 md:px-8 rounded-2xl font-black text-[#5B779E] text-[11px] md:text-[13px] border border-slate-200 bg-white hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm active:scale-95">
                          Cancel
                        </button>
                        <button 
                          onClick={() => setCurrentStep(2)}
                          className="py-2 md:py-3 px-4 md:px-8 rounded-2xl bg-[#0D245B] text-white font-black text-[11px] md:text-[13px] shadow-[0_8px_30px_rgb(13,36,91,0.2)] hover:bg-slate-900 transition-all flex items-center gap-3 active:scale-95 uppercase tracking-widest"
                        >
                          Next: Add Questions <ArrowRight className="w-4 h-4" strokeWidth={3} />
                        </button>
                     </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-5 md:mb-10 pb-4 md:pb-6 border-b border-slate-50">
                    <div>
                      <h3 className="text-[12px] md:text-[15px] font-black text-[#0D245B] uppercase tracking-[0.2em] mb-1">Add Questions</h3>
                      <p className="text-[9px] md:text-[11px] text-[#5B779E] font-black uppercase tracking-widest">Total questions: {questions.length}</p>
                    </div>
                    <button 
                      onClick={addQuestion}
                      className="py-2 md:py-3 px-4 md:px-6 rounded-2xl bg-[#0D245B] text-white font-black text-[11px] md:text-[13px] flex items-center gap-3 shadow-[0_8px_30px_rgb(13,36,91,0.2)] hover:bg-slate-900 transition-all active:scale-95 uppercase tracking-widest"
                    >
                      <Plus className="w-4 h-4" strokeWidth={3} /> Add New
                    </button>
                  </div>
                  
                  <div className="space-y-5 md:space-y-10">
                    {questions.map((q, index) => (
                      <div key={q.id} className="relative group bg-white border border-slate-100 rounded-[20px] md:rounded-[32px] p-3 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        {/* Question Header */}
                        <div className="flex justify-between items-center mb-4 md:mb-8">
                          <div className="flex items-center gap-4">
                            <div className="cursor-move p-1 text-slate-300 hover:text-slate-400">
                              <GripVertical className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] md:text-[12px] font-black text-[#0D245B] bg-blue-50 px-3 md:px-5 py-1 md:py-2 rounded-xl border border-blue-100/50 uppercase tracking-widest">
                              Question {index + 1}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {/* Type Selector */}
                            <div className="flex bg-slate-100 p-1 rounded-[18px] border border-slate-200/50">
                              <button 
                                onClick={() => updateQuestion(q.id, { type: "single" })}
                                className={`p-2 rounded-[14px] transition-all flex items-center gap-2 px-2 md:px-4 text-[9px] md:text-[11px] font-black uppercase tracking-widest ${q.type === 'single' ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                                title="Single Choice"
                              >
                                <MousePointer2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                                {q.type === 'single' && "Single"}
                              </button>
                              <button 
                                onClick={() => updateQuestion(q.id, { type: "multiple" })}
                                className={`p-2 rounded-[14px] transition-all flex items-center gap-2 px-2 md:px-4 text-[9px] md:text-[11px] font-black uppercase tracking-widest ${q.type === 'multiple' ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                                title="Multiple Choice"
                              >
                                <ListTodo className="w-3.5 h-3.5" strokeWidth={2.5} />
                                {q.type === 'multiple' && "Multi"}
                              </button>
                              <button 
                                onClick={() => updateQuestion(q.id, { type: "integer" })}
                                className={`p-2 rounded-[14px] transition-all flex items-center gap-2 px-2 md:px-4 text-[9px] md:text-[11px] font-black uppercase tracking-widest ${q.type === 'integer' ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                                title="Integer Based"
                              >
                                <Hash className="w-3.5 h-3.5" strokeWidth={2.5} />
                                {q.type === 'integer' && "Integer"}
                              </button>
                            </div>
                            
                            <div className="w-px h-6 bg-slate-100 mx-2" />
                            
                            <button 
                              onClick={() => removeQuestion(q.id)}
                              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                            >
                              <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Question Input */}
                        <div className="mb-6">
                          <textarea 
                            value={q.text}
                            onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                            placeholder="Type your question here..." 
                            className="w-full h-20 md:h-28 bg-slate-50 border border-slate-100 rounded-[24px] px-3 md:px-6 py-3 md:py-5 text-[11px] md:text-[13px] font-black text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all resize-none shadow-inner leading-relaxed uppercase tracking-tight"
                          />
                        </div>

                        {/* Options / Answer Section */}
                        {q.type !== 'integer' ? (
                          <div className="space-y-4">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="flex items-center gap-4 group/opt">
                                <button 
                                  className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all shrink-0 ${
                                    (q.type === 'single' ? q.correctAnswer === optIdx : Array.isArray(q.correctAnswer) && q.correctAnswer.includes(optIdx))
                                      ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/20 scale-105' 
                                      : 'bg-white border-slate-200 hover:border-blue-300'
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
                                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />
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
                                    className={`w-full bg-slate-50 border rounded-[18px] px-3 md:px-5 py-2 md:py-3 text-[11px] md:text-[13px] font-black transition-all focus:outline-none uppercase tracking-tight ${
                                      (q.type === 'single' ? q.correctAnswer === optIdx : Array.isArray(q.correctAnswer) && q.correctAnswer.includes(optIdx))
                                        ? 'border-blue-300 bg-blue-50/30 text-blue-700'
                                        : 'border-slate-100 focus:border-blue-400 text-[#0D245B]'
                                    }`}
                                  />
                                </div>
                                
                                {q.options.length > 2 && (
                                  <button 
                                    onClick={() => removeOption(q.id, optIdx)}
                                    className="opacity-0 group-hover/opt:opacity-100 p-2.5 text-slate-300 hover:text-red-500 transition-all active:scale-95"
                                  >
                                    <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                                  </button>
                                )}
                              </div>
                            ))}
                            
                            {q.options.length < 6 && (
                              <button 
                                onClick={() => addOption(q.id)}
                                className="flex items-center gap-3 text-[11px] font-black text-blue-600 hover:text-blue-700 mt-6 px-12 transition-all uppercase tracking-[0.15em] active:scale-95"
                              >
                                <PlusCircle className="w-4 h-4" strokeWidth={3} /> Add Option
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="bg-slate-50 rounded-[28px] p-8 border border-dashed border-slate-200 flex flex-col gap-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm">
                                <Hash className="w-5 h-5" strokeWidth={2.5} />
                              </div>
                              <span className="text-[13px] font-black text-[#0D245B] uppercase tracking-widest">Correct Answer (Numeric)</span>
                            </div>
                            <input 
                              type="number" 
                              value={q.correctAnswer || ""}
                              onChange={(e) => updateQuestion(q.id, { correctAnswer: e.target.value })}
                              placeholder="0" 
                              className="w-full max-w-[180px] bg-white border border-slate-100 rounded-[20px] px-7 py-4 text-[18px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all text-center shadow-inner"
                            />
                            <p className="text-[10px] text-[#5B779E] font-black uppercase tracking-widest leading-relaxed">Note: Students must enter exact numeric value.</p>
                          </div>
                        )}

                        {/* Question Footer */}
                        <div className="mt-8 pt-8 border-t border-slate-50 flex justify-between items-center">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest">Marks:</span>
                              <input 
                                type="number" 
                                value={q.marks}
                                onChange={(e) => updateQuestion(q.id, { marks: parseInt(e.target.value) || 0 })}
                                className="w-16 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 md:py-3 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all text-center shadow-inner"
                                min="0"
                              />
                            </div>
                            
                            <label className="flex items-center gap-2.5 cursor-pointer group/check">
                              <div className="relative flex items-center">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="w-5 h-5 bg-white border-2 border-slate-200 rounded-lg transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600"></div>
                                <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-0.5" strokeWidth={3} />
                              </div>
                              <span className="text-[11px] font-black text-[#5B779E] uppercase tracking-widest group-hover/check:text-[#0D245B] transition-colors">Required</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-10 mt-10 border-t border-slate-50 gap-4">
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="w-full sm:w-auto py-2.5 md:py-3.5 px-6 md:px-10 rounded-2xl font-black text-[#5B779E] text-[10px] md:text-[12px] border border-slate-200 bg-white hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm active:scale-95"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setCurrentStep(3)}
                      className="w-full sm:w-auto py-2.5 md:py-3.5 px-6 md:px-10 rounded-2xl bg-[#0D245B] text-white font-black text-[10px] md:text-[12px] shadow-[0_8px_30px_rgb(13,36,91,0.2)] hover:bg-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest"
                    >
                      Next: Review <ArrowRight className="w-4 h-4" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                      <h3 className="text-[15px] font-black text-[#0D245B] uppercase tracking-[0.2em] mb-1">Review Test</h3>
                      <p className="text-[11px] text-[#5B779E] font-black uppercase tracking-widest leading-relaxed">Please verify all details before publishing.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-blue-50 text-blue-700 px-5 py-2.5 rounded-2xl text-[11px] font-black border border-blue-100 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                        Total Marks: {questions.reduce((acc, q) => acc + q.marks, 0)}
                      </div>
                      {publishType === 'schedule' && publishDateTime && (
                        <div className="bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-2xl text-[11px] font-black border border-emerald-100 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                          <Clock className="w-4 h-4" strokeWidth={2.5} /> Published: {new Date(publishDateTime).toLocaleString()}
                        </div>
                      )}
                      {resultType === 'schedule' && resultDateTime && (
                        <div className="bg-purple-50 text-purple-700 px-5 py-2.5 rounded-2xl text-[11px] font-black border border-purple-100 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                          <AlertCircle className="w-4 h-4" strokeWidth={2.5} /> Results: {new Date(resultDateTime).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    {questions.map((q, index) => (
                      <div key={q.id} className="bg-slate-50 border border-slate-100 rounded-[28px] p-5 flex items-start gap-5 hover:bg-white hover:shadow-md transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-xl bg-[#0D245B] text-white flex items-center justify-center font-black text-[14px] shrink-0 shadow-lg shadow-slate-900/20">
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex justify-between items-start mb-2 gap-4">
                            <h4 className="text-[11px] md:text-[12px] font-black text-[#0D245B] line-clamp-2 uppercase tracking-tight">{q.text || "(No question text)"}</h4>
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#5B779E] bg-white border border-slate-100 px-2.5 py-1 rounded-lg shrink-0">{q.type}</span>
                          </div>
                          <p className="text-[10px] text-[#5B779E] font-black uppercase tracking-[0.1em]">
                            {q.type === 'integer' ? `Correct: ${q.correctAnswer || 'Not set'}` : `${q.options.filter(o => o).length} Options • ${q.marks} Mark${q.marks > 1 ? 's' : ''}`}
                          </p>
                        </div>
                        <button onClick={() => setCurrentStep(2)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90 group-hover:scale-110">
                           <Rocket className="w-5 h-5 rotate-[270deg]" strokeWidth={2.5} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-slate-50 gap-4">
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="w-full sm:w-auto py-2.5 md:py-3.5 px-6 md:px-10 rounded-2xl font-black text-[#5B779E] text-[10px] md:text-[12px] border border-slate-200 bg-white hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm active:scale-95"
                    >
                      Back to Edit
                    </button>
                    <button 
                      onClick={() => setShowConfirmModal(true)}
                      className="w-full sm:w-auto py-2.5 md:py-3.5 px-6 md:px-12 rounded-2xl bg-blue-600 text-white font-black text-[10px] md:text-[12px] shadow-[0_8px_30px_rgba(37,99,235,0.2)] hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
                    >
                      Confirm & Publish <CheckCircle2 className="w-4 h-4" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              )}

              {/* Custom Confirmation Modal */}
              {showConfirmModal && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300 p-4">
                  <div className="bg-white rounded-[40px] p-8 md:p-12 max-w-md w-full shadow-[0_32px_80px_rgba(0,0,0,0.3)] border border-white transform animate-in zoom-in-95 duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                    
                    <div className="w-24 h-24 rounded-[32px] bg-blue-50 text-blue-600 flex items-center justify-center mb-8 mx-auto shadow-inner relative">
                      <CheckCircle2 className="w-12 h-12" strokeWidth={2.5} />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white">
                        <Rocket className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-[20px] font-black text-[#0D245B] text-center mb-4 uppercase tracking-tight leading-tight">
                      Ready to Launch?
                    </h3>

                    <p className="text-[12px] text-[#5B779E] font-black text-center mb-10 leading-relaxed uppercase tracking-widest">
                      Enter your master password to publish this assessment.
                    </p>

                    <div className="mb-10 space-y-3">
                      <label className="text-[10px] font-black text-[#5B779E] block text-center uppercase tracking-[0.2em]">
                        Master Password
                      </label>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => {
                          setAdminPassword(e.target.value);
                          setPasswordError("");
                        }}
                        className={`w-full px-6 py-4 bg-slate-50 border ${passwordError ? 'border-red-400 focus:ring-red-100' : 'border-slate-100 focus:border-blue-400'} rounded-[20px] focus:outline-none focus:ring-4 text-center font-black text-[18px] text-[#0D245B] transition-all uppercase tracking-[0.3em]`}
                        placeholder="••••"
                      />
                      {passwordError && (
                        <p className="text-red-500 text-[10px] font-black text-center mt-3 uppercase tracking-widest">{passwordError}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
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
                        className="w-full py-4.5 rounded-[24px] font-black text-[13px] transition-all shadow-lg active:scale-95 bg-blue-600 text-white hover:bg-blue-700 uppercase tracking-widest"
                      >
                        Publish Now
                      </button>
                      <button
                        onClick={() => {
                          setShowConfirmModal(false);
                          setAdminPassword("");
                          setPasswordError("");
                        }}
                        className="w-full py-4.5 rounded-[24px] font-black text-[13px] text-[#5B779E] hover:text-[#0D245B] hover:bg-slate-50 transition-all uppercase tracking-widest"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center py-24 flex flex-col items-center animate-in zoom-in duration-700">
                  <div className="w-28 h-28 bg-emerald-50 text-emerald-500 rounded-[40px] flex items-center justify-center mb-10 shadow-lg shadow-emerald-500/10 relative">
                    <CheckCircle2 className="w-14 h-14" strokeWidth={2.5} />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white animate-bounce-slow">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-[22px] font-black text-[#0D245B] mb-4 uppercase tracking-tight">
                    {publishType === 'schedule' ? 'Launch Scheduled!' : 'Mission Successful!'}
                  </h3>
                  <p className="text-[12px] text-[#5B779E] mb-12 font-black uppercase tracking-[0.1em] text-center max-w-sm leading-relaxed">
                    {publishType === 'schedule' 
                      ? `Assessment will be live on ${publishDateTime ? new Date(publishDateTime).toLocaleString() : 'the scheduled time'}.` 
                      : 'Test is now live and accessible to all assigned students.'}
                  </p>
                  <Link 
                    href="/mentor-dashboard"
                    className="py-4.5 px-12 rounded-[24px] bg-[#0D245B] text-white font-black text-[13px] shadow-[0_12px_40px_rgba(13,36,91,0.25)] hover:bg-slate-900 transition-all active:scale-95 no-underline uppercase tracking-[0.2em]"
                  >
                    Back to Terminal
                  </Link>
                </div>
              )}

            </div>

            {/* Right Box: Tips */}
            <div className="w-full lg:w-[320px] bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex flex-col items-center relative overflow-hidden shrink-0">
               <div className="w-20 h-20 bg-blue-50 rounded-[24px] mb-8 flex justify-center items-center relative shadow-inner">
                  <Rocket className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-lg blur-lg opacity-40 animate-pulse"></div>
               </div>

               <h4 className="text-[13px] font-black text-[#0D245B] mb-8 text-center uppercase tracking-[0.2em]">
                 Expert Protocol
               </h4>

               <ul className="w-full space-y-6 mb-12">
                 <li className="flex items-start gap-4">
                   <div className="mt-1 w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                     <CheckCircle2 className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                   </div>
                   <span className="text-[11px] font-black text-[#5B779E] leading-[18px] uppercase tracking-widest">Descriptive test titles help students focus</span>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="mt-1 w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                     <CheckCircle2 className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                   </div>
                   <span className="text-[11px] font-black text-[#5B779E] leading-[18px] uppercase tracking-widest">Balanced difficulty ensures better assessment</span>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="mt-1 w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                     <CheckCircle2 className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                   </div>
                   <span className="text-[11px] font-black text-[#5B779E] leading-[18px] uppercase tracking-widest">Negative marking reduces random guessing</span>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="mt-1 w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                     <CheckCircle2 className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                   </div>
                   <span className="text-[11px] font-black text-[#5B779E] leading-[18px] uppercase tracking-widest">Always preview test in review stage</span>
                 </li>
               </ul>

               <div className="w-full mt-auto pt-8 border-t border-slate-50">
                 <div className="flex items-center gap-3 mb-4 text-[11px] font-black text-[#0D245B] uppercase tracking-widest">
                   <HelpCircle className="w-4 h-4 text-blue-600" strokeWidth={2.5} /> Logic Support
                 </div>
                 <button className="w-full py-4 rounded-[20px] bg-slate-50 hover:bg-slate-100 text-[#5B779E] font-black text-[11px] transition-all border border-slate-100 uppercase tracking-widest active:scale-95 shadow-sm">
                   Take Guidance
                 </button>
               </div>
            </div>

          </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `,
        }}
      />
    </MentorLayout>
  );
}