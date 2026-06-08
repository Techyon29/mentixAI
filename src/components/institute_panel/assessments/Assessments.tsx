"use client";

import { Download, Plus, Search, CheckCircle2, Key, Copy, RefreshCw, Link as LinkIcon } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InstituteLayout from "../InstituteLayout";

const LiveOtpManager = ({ exam, onClose }: { exam: any, onClose: () => void }) => {
  const [otp, setOtp] = useState("149257");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [totalTimeLeft, setTotalTimeLeft] = useState(900); // 15 minutes
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (totalTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // generate new OTP
          setOtp(Math.floor(100000 + Math.random() * 900000).toString());
          return 300;
        }
        return prev - 1;
      });
      setTotalTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTimeLeft]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://student.edu/test/${exam.id}/auth`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
      {totalTimeLeft <= 0 ? (
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-gray-300 text-[#464555] flex items-start justify-between gap-4 w-full max-w-lg bg-white" onClick={e => e.stopPropagation()}>
           <div className="flex gap-4 items-center">
             <Key className="w-8 h-8 text-[#777587]" />
             <div>
                <h3 className="font-bold text-[#191c1e]">OTP Session Expired</h3>
                <p className="text-sm">The 15-minute OTP generation window has closed.</p>
             </div>
           </div>
           <button onClick={onClose} className="p-2 text-[#464555] hover:bg-[#f2f4f6] rounded-full transition-colors shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
           </button>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-6 md:p-8 bg-white border-l-4 border-l-[#3525cd] flex flex-col gap-6 overflow-hidden relative w-full max-w-2xl shadow-xl border border-gray-200" onClick={e => e.stopPropagation()}>
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#3525cd]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="flex items-start justify-between z-10 w-full gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3525cd]/10 text-[#3525cd] flex items-center justify-center shrink-0">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                   <h3 className="font-bold text-lg md:text-xl text-[#191c1e] tracking-tight">Live Test OTP</h3>
                   <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 flex items-center gap-1 animate-pulse shrink-0">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Live
                   </span>
                </div>
                <p className="text-sm text-[#464555] font-medium break-words pr-4">{exam.name} <span className="text-[#777587] mx-1">•</span> ID: {exam.id}</p>
                
                <div className="mt-4 flex flex-wrap items-center gap-3">
                   <div className="bg-[#f2f4f6] px-4 py-2 rounded-lg border border-[#e6e8ea] flex items-center gap-3">
                     <span className="text-3xl font-mono font-bold text-[#3525cd] tracking-[0.2em]">{otp}</span>
                     <button onClick={() => {
                        navigator.clipboard.writeText(otp);
                     }} className="p-2 text-[#777587] hover:text-[#3525cd] hover:bg-[#3525cd]/10 rounded-md transition-colors cursor-pointer" title="Copy OTP">
                       <Copy className="w-5 h-5" />
                     </button>
                   </div>
                   <div className="flex items-center gap-2 text-sm font-semibold text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                      <RefreshCw className="w-4 h-4 animate-spin-slow" />
                      Renews in {minutes}:{seconds.toString().padStart(2, '0')}
                   </div>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-[#464555] hover:bg-[#eceef0] rounded-full transition-colors shrink-0 -mt-2 -mr-2 bg-white/50 backdrop-blur-sm z-20 cursor-pointer">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 pt-4 border-t border-[#eceef0]">
            <div className="text-sm font-medium text-[#464555]">
               Total window remaining: <span className="font-bold text-[#191c1e]">{Math.floor(totalTimeLeft / 60)}:{Math.floor(totalTimeLeft % 60).toString().padStart(2, "0")}</span>
            </div>
            <button 
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#191c1e] text-[#f7f9fb] font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#464555] transition-colors shadow-sm cursor-pointer"
            >
              {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
              {isCopied ? "Link Copied!" : "Copy Student Test Link"}
            </button>
          </div>
          <p className="text-xs text-[#777587] leading-tight z-10 sm:text-right">
            Students must enter the active OTP above to verify and begin their assessment.
          </p>
        </div>
      )}
    </div>
  );
};

const examsData = [
  { name: "CS201 Data Structures Midterm", id: "ASM-9921", class: "11", dept: "Computer Science", status: "Live", students: "342 / 350", security: "High Risk Flags" },
  { name: "Bio 101 Quiz 3", id: "ASM-9920", class: "10", dept: "Biology", status: "Completed", students: "120 / 120", security: "Clean" },
  { name: "Advanced Calculus Final", id: "ASM-9922", class: "12", dept: "Mathematics", status: "Upcoming", students: "Starts in 2h", security: "Strict" },
  { name: "Physics Labs", id: "ASM-9923", class: "9", dept: "Physics", status: "Completed", students: "40 / 45", security: "Clean" }
];

export default function Assessments() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeOtpExam, setActiveOtpExam] = useState<any>(null);

  const filteredExams = useMemo(() => {
    let result = [...examsData];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(q) || 
        e.id.toLowerCase().includes(q)
      );
    }
    
    if (selectedClass !== "All") {
      result = result.filter(e => e.class === selectedClass);
    }
    
    if (selectedDept !== "All") {
      result = result.filter(e => e.dept === selectedDept);
    }
    
    if (selectedStatus !== "All") {
      result = result.filter(e => e.status === selectedStatus);
    }

    return result;
  }, [searchQuery, selectedClass, selectedDept, selectedStatus]);

  const allClasses = Array.from(new Set(examsData.map(e => e.class))).sort();
  const allDepts = Array.from(new Set(examsData.map(e => e.dept))).sort();
  const allStatuses = Array.from(new Set(examsData.map(e => e.status))).sort();

  return (
    <InstituteLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#191c1e]">Assessments Overview</h1>
            <p className="text-[#464555] mt-1 text-sm">Monitor live exams, review completion rates, and manage security flags.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="whitespace-nowrap px-4 py-2 border border-[#c7c4d8]/50 text-[#191c1e] text-sm font-semibold rounded-full hover:bg-[#f2f4f6] transition-colors shadow-sm flex items-center gap-2 cursor-pointer bg-white">
              <Download className="shrink-0 w-4 h-4" /> Export Report
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all ai-glow flex items-center gap-2 cursor-pointer">
              <Plus className="shrink-0 w-4 h-4" /> New Assessment
            </button>
          </div>
        </div>

        {activeOtpExam && (
          <LiveOtpManager exam={activeOtpExam} onClose={() => setActiveOtpExam(null)} />
        )}

        <div className="glass-card rounded-2xl overflow-hidden w-full bg-white border border-[#c7c4d8]/30">
          <div className="p-4 border-b border-[#e6e8ea] flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777587]" />
              <input 
                type="text" 
                placeholder="Search assessments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#f2f4f6] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none" 
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
               <div className="flex items-center gap-2 bg-white border border-[#e6e8ea] rounded-lg px-3 py-1.5 shrink-0">
                 <span className="text-xs font-semibold text-[#464555]">Class:</span>
                 <select 
                   value={selectedClass} 
                   onChange={(e) => setSelectedClass(e.target.value)}
                   className="bg-transparent text-sm text-[#191c1e] outline-none border-none font-medium cursor-pointer"
                 >
                   <option value="All">All</option>
                   {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
               </div>
               
               <div className="flex items-center gap-2 bg-white border border-[#e6e8ea] rounded-lg px-3 py-1.5 shrink-0">
                 <span className="text-xs font-semibold text-[#464555]">Dept:</span>
                 <select 
                   value={selectedDept} 
                   onChange={(e) => setSelectedDept(e.target.value)}
                   className="bg-transparent text-sm text-[#191c1e] outline-none border-none font-medium cursor-pointer"
                 >
                   <option value="All">All</option>
                   {allDepts.map(d => <option key={d} value={d}>{d}</option>)}
                 </select>
               </div>

               <div className="flex items-center gap-2 bg-white border border-[#e6e8ea] rounded-lg px-3 py-1.5 shrink-0">
                 <span className="text-xs font-semibold text-[#464555]">Status:</span>
                 <select 
                   value={selectedStatus} 
                   onChange={(e) => setSelectedStatus(e.target.value)}
                   className="bg-transparent text-sm text-[#191c1e] outline-none border-none font-medium cursor-pointer"
                 >
                   <option value="All">All</option>
                   {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
               </div>
            </div>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-[#e6e8ea] text-xs uppercase tracking-wider text-[#464555]">
                <th className="p-4 pl-6 font-semibold">Assessment</th>
                <th className="p-4 font-semibold">Class</th>
                <th className="p-4 font-semibold">Department</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Participants</th>
                <th className="p-4 pr-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e8ea] bg-white">
              {filteredExams.map((exam) => (
                <tr 
                  key={exam.id} 
                  className="hover:bg-[#f2f4f6]/40 transition-colors group cursor-pointer"
                  onClick={() => router.push(`/institute-dashboard/assessments/${exam.id}`)}
                >
                  <td className="p-4 pl-6">
                    <div>
                      <p className="font-semibold text-sm text-[#191c1e]">{exam.name}</p>
                      <p className="text-xs text-[#777587]">{exam.id}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium">{exam.class}</td>
                  <td className="p-4 text-sm">{exam.dept}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                      exam.status === "Live" ? "bg-[#3525cd]/10 text-[#3525cd]" : 
                      exam.status === "Completed" ? "bg-gray-100 text-gray-700" : "bg-gray-50 text-gray-400"
                    }`}>
                      {exam.status === "Live" && <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd] animate-pulse"></span>}
                      {exam.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium">{exam.students}</td>
                  <td className="p-4 pr-6 text-right">
                    {exam.status === "Live" && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveOtpExam(exam);
                        }}
                        className="px-3 py-1.5 bg-[#3525cd]/10 text-[#3525cd] text-xs font-semibold rounded-lg hover:bg-[#3525cd] hover:text-white transition-colors flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5" />
                        Manage OTP
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </InstituteLayout>
  );
}
