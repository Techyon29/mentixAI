"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Calendar,
  GraduationCap,
  BookOpen,
  Atom,
  Microscope,
  FunctionSquare,
  LayoutGrid,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";
import MentorLayout from "../MentorLayout";

const testData = [
  {
    id: 1,
    title: "Quadratic Equations - Quiz 1",
    subject: "Mathematics",
    class: "Class 10",
    avgScore: 66,
    avgPercent: null,
    status: "Live",
    date: "12 May, 2025",
    icon: GraduationCap,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    title: "Trigonometry Basics",
    subject: "Mathematics",
    class: "Class 11",
    avgScore: 62,
    avgPercent: 54,
    status: "Live",
    date: "10 May, 2025",
    icon: FunctionSquare,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: 3,
    title: "Cell Structure & Functions",
    subject: "Biology",
    class: "Class 9",
    avgScore: 124,
    avgPercent: 72,
    status: "Completed",
    date: "08 May, 2025",
    icon: Microscope,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: 4,
    title: "Photosynthesis Process",
    subject: "Biology",
    class: "Class 11",
    avgScore: 63,
    avgPercent: 60,
    status: "Completed",
    date: "06 May, 2025",
    icon: Microscope,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 5,
    title: "Chemical Bonding",
    subject: "Chemistry",
    class: "Class 11",
    avgScore: 68,
    avgPercent: 70,
    status: "Completed",
    date: "05 May, 2025",
    icon: Atom,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: 6,
    title: "Newton's Laws",
    subject: "Physics",
    class: "Class 9",
    avgScore: 0,
    avgPercent: null,
    status: "Draft",
    date: "01 May, 2025",
    icon: LayoutGrid,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    id: 7,
    title: "Algebra - Linear Equations",
    subject: "Mathematics",
    class: "Class 9",
    avgScore: null,
    avgPercent: null,
    status: "Scheduled",
    date: "30 Apr, 2025",
    icon: BookOpen,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: 8,
    title: "Human Digestive System",
    subject: "Biology",
    class: "Class 10",
    avgScore: 48,
    avgPercent: 60,
    status: "Live",
    date: "28 Apr, 2025",
    icon: Microscope,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 9,
    title: "Light & Reflection",
    subject: "Physics",
    class: "Class 10",
    avgScore: 72,
    avgPercent: 68,
    status: "Completed",
    date: "25 Apr, 2025",
    icon: Atom,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 10,
    title: "Periodic Table Quiz",
    subject: "Chemistry",
    class: "Class 10",
    avgScore: 55,
    avgPercent: 50,
    status: "Live",
    date: "22 Apr, 2025",
    icon: Atom,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Live: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Draft: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-slate-100 text-slate-500 border-slate-200",
    Scheduled: "bg-amber-50 text-amber-600 border-amber-100",
    Archived: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-[9px] font-black border uppercase tracking-widest ${styles[status as keyof typeof styles]}`}
    >
      {status}
    </span>
  );
};

export default function TestsList() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    class: "All",
    status: "All",
    minScore: "",
    date: "",
  });

  const tabs = [
    { label: "All", count: testData.length },
    { label: "Live", count: testData.filter((t) => t.status === "Live").length },
    { label: "Draft", count: testData.filter((t) => t.status === "Draft").length },
    { label: "Done", count: testData.filter((t) => t.status === "Completed").length },
  ];

  const filteredTests = testData.filter((test) => {
    const matchesTab = activeTab === "All" || (activeTab === "Done" && test.status === "Completed") || test.status === activeTab;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || test.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <MentorLayout>
      <div className="max-w-5xl mx-auto w-full pb-10">
          {/* Header Section */}
          <section className="px-1 mt-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-4 md:mb-6">
            <div>
              <h1 className="text-[16px] md:text-2xl font-black text-[#0D245B] tracking-tight mb-1 uppercase">Assessments</h1>
              <p className="text-[#5B779E] text-[9px] md:text-[11px] font-bold uppercase tracking-widest">Manage and track your tests</p>
            </div>
            <Link
              href="/mentor-dashboard/create-test"
              className="py-2 md:py-2.5 px-4 md:px-6 rounded-xl bg-[#0D245B] text-white font-black text-[10px] md:text-[11px] shadow-md hover:bg-[#0D3694] transition-all flex items-center gap-2 w-full md:w-auto justify-center uppercase tracking-widest"
            >
              <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" /> New Assessment
            </Link>
          </section>

          {/* Search & Tabs */}
          <section className="px-1 mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="w-full md:flex-1 relative">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="SEARCH TESTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-xl pl-9 md:pl-11 pr-4 py-2 md:py-2.5 text-[10px] md:text-[12px] font-black text-[#0D245B] focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm uppercase tracking-tight"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 border rounded-xl text-[10px] md:text-[11px] font-black transition-all shadow-sm justify-center uppercase tracking-widest w-full md:w-auto ${
                  showFilters ? "bg-[#0D245B] text-white border-[#0D245B]" : "bg-white text-[#0D245B] border-slate-100"
                }`}
              >
                <SlidersHorizontal className="w-3 h-3 md:w-3.5 md:h-3.5" /> Filter
              </button>
            </div>

            <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`pb-2 md:pb-2.5 px-2 md:px-3 mr-3 md:mr-4 font-black text-[10px] md:text-[11px] transition-all relative whitespace-nowrap uppercase tracking-widest ${
                    activeTab === tab.label ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  {tab.label} <span className="ml-1 opacity-50">{tab.count}</span>
                  {activeTab === tab.label && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* High Density Grid */}
          <section className="px-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
             {paginatedTests.map((test) => {
               const Icon = test.icon;
               return (
                 <div key={test.id} className="bg-white border border-slate-100 rounded-[20px] md:rounded-[28px] p-4 md:p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="flex items-start justify-between gap-3 md:gap-4 relative z-10">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl ${test.bgColor} flex items-center justify-center border border-current/10 shadow-sm shrink-0 transition-transform group-hover:scale-105`}>
                          <Icon className={`w-4 h-4 md:w-5 md:h-5 ${test.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-[12px] md:text-[14px] font-black text-[#0D245B] uppercase leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
                            {test.title}
                          </h3>
                          <div className="flex items-center gap-2 md:gap-3 mt-1">
                            <span className="text-[9px] md:text-[10px] font-black text-[#5B779E] uppercase tracking-widest bg-slate-50 px-1.5 md:px-2 py-0.5 rounded-md border border-slate-100">
                              {test.subject}
                            </span>
                            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{test.class}</span>
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={test.status} />
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-3 mt-4 md:mt-6 pt-3 md:pt-5 border-t border-slate-50">
                       <div>
                         <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</p>
                         <div className="flex items-baseline gap-1">
                            <span className="text-[13px] md:text-[15px] font-black text-[#0D245B]">{test.avgScore || '--'}</span>
                            {test.avgPercent && <span className="text-[9px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest">({test.avgPercent}%)</span>}
                         </div>
                       </div>
                       <div>
                         <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Students</p>
                         <p className="text-[13px] md:text-[15px] font-black text-[#0D245B]">120</p>
                       </div>
                       <div className="text-right">
                         <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                         <p className="text-[10px] md:text-[12px] font-black text-[#0D245B] uppercase tracking-widest">{test.date.split(',')[0]}</p>
                       </div>
                    </div>

                    <div className="mt-3 md:mt-5 flex gap-2 md:gap-3">
                       <button className="flex-1 py-2 md:py-3 bg-slate-50 hover:bg-slate-100 text-[#0D245B] font-black text-[10px] md:text-[11px] rounded-xl md:rounded-2xl transition-all uppercase tracking-[0.1em] border border-slate-100">
                         Analytics
                       </button>
                       <button className="flex-1 py-2 md:py-3 bg-[#0D245B] text-white font-black text-[10px] md:text-[11px] rounded-xl md:rounded-2xl transition-all uppercase tracking-[0.1em] shadow-lg shadow-blue-900/10 active:scale-95">
                         Details
                       </button>
                    </div>
                 </div>
               );
             })}
          </section>

          {/* Pagination */}
          <section className="mt-6 md:mt-8 px-1 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
             <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
               Page {currentPage} of {Math.ceil(filteredTests.length / itemsPerPage)}
             </p>
             <div className="flex gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="p-1.5 md:p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 disabled:opacity-50 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
                <div className="flex gap-1 md:gap-1.5">
                  {[...Array(Math.ceil(filteredTests.length / itemsPerPage))].map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-xl font-black text-[10px] md:text-[11px] transition-all shadow-sm ${
                        currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  disabled={currentPage === Math.ceil(filteredTests.length / itemsPerPage)}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-1.5 md:p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 disabled:opacity-50 transition-all shadow-sm"
                >
                  <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
             </div>
          </section>
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
    </MentorLayout>
  );
}
