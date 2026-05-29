"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Plus, Download, MoreVertical, ChevronLeft, ChevronRight, User, Mail, GraduationCap, Calendar, Clock, CheckCircle2, AlertTriangle, ArrowLeft, Users, BarChart2, UserCheck, UserMinus, Star, SlidersHorizontal, FileText, X, Trash2, Edit3, ChevronDown, Check, Zap, TrendingUp, Target, Activity, BookOpen, Brain, History, ArrowUpRight, Ban, ShieldAlert, Send, MessageSquare } from "lucide-react";

import MentorLayout from "../MentorLayout";


// --- Mock Data Initialization ---
const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Rohan Verma",
    email: "rohan.verma@email.com",
    class: "Class 10",
    section: "Section A",
    testsAttempted: 12,
    avgScore: 85,
    performance: "Excellent",
    status: "Active",
    lastActive: "Today, 10:30 AM",
    rollNo: 15,
    joinedDate: "10 Jan, 2025",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    email: "ananya.sharma@email.com",
    class: "Class 11",
    section: "Section B",
    testsAttempted: 10,
    avgScore: 72,
    performance: "Good",
    status: "Active",
    lastActive: "Today, 09:15 AM",
    rollNo: 22,
    joinedDate: "12 Jan, 2025",
  },
  {
    id: 3,
    name: "Vihaan Patel",
    email: "vihaan.patel@email.com",
    class: "Class 10",
    section: "Section A",
    testsAttempted: 8,
    avgScore: 68,
    performance: "Average",
    status: "Active",
    lastActive: "Yesterday, 06:45 PM",
    rollNo: 18,
    joinedDate: "15 Jan, 2025",
  },
  {
    id: 4,
    name: "Aditya Singh",
    email: "aditya.singh@email.com",
    class: "Class 11",
    section: "Section A",
    testsAttempted: 9,
    avgScore: 45,
    performance: "Needs Help",
    status: "Active",
    lastActive: "Yesterday, 04:20 PM",
    rollNo: 5,
    joinedDate: "20 Jan, 2025",
  },
  {
    id: 5,
    name: "Meera Iyer",
    email: "meera.iyer@email.com",
    class: "Class 9",
    section: "Section B",
    testsAttempted: 7,
    avgScore: 88,
    performance: "Excellent",
    status: "Active",
    lastActive: "Today, 11:05 AM",
    rollNo: 12,
    joinedDate: "10 Jan, 2025",
  },
  {
    id: 6,
    name: "Kavya Nair",
    email: "kavya.nair@email.com",
    class: "Class 10",
    section: "Section C",
    testsAttempted: 6,
    avgScore: 59,
    performance: "Average",
    status: "Active",
    lastActive: "Yesterday, 08:30 PM",
    rollNo: 31,
    joinedDate: "18 Jan, 2025",
  },
  {
    id: 7,
    name: "Aryan Kumar",
    email: "aryan.kumar@email.com",
    class: "Class 9",
    section: "Section A",
    testsAttempted: 5,
    avgScore: 38,
    performance: "Needs Help",
    status: "Inactive",
    lastActive: "3 days ago",
    rollNo: 9,
    joinedDate: "25 Jan, 2025",
  },
  {
    id: 8,
    name: "Diya Mehta",
    email: "diya.mehta@email.com",
    class: "Class 11",
    section: "Section B",
    testsAttempted: 11,
    avgScore: 76,
    performance: "Good",
    status: "Active",
    lastActive: "Today, 08:50 AM",
    rollNo: 14,
    joinedDate: "12 Jan, 2025",
  },
];

const studentTests = [
  {
    id: 1,
    name: "Quadratic Equations - Quiz 1",
    date: "12 May, 2025",
    score: "88%",
    status: "Live",
    duration: "45m",
    mistakes: 2,
  },
  {
    id: 2,
    name: "Cell Structure & Functions",
    date: "08 May, 2025",
    score: "72%",
    status: "Completed",
    duration: "38m",
    mistakes: 5,
  },
  {
    id: 3,
    name: "Photosynthesis Process",
    date: "05 May, 2025",
    score: "45%",
    status: "Live",
    duration: "50m",
    mistakes: 12,
  },
];

const weakTopicsData = [
  {
    topic: "Trigonometric Identities",
    subject: "Mathematics",
    score: 42,
    impact: "High",
    icon: Brain,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    topic: "Organic Synthesis",
    subject: "Chemistry",
    score: 38,
    impact: "High",
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    topic: "Ancient Civilizations",
    subject: "History",
    score: 55,
    impact: "Medium",
    icon: History,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

const activityTimeline = [
  {
    type: "test_completed",
    title: "Completed Quadratic Equations Quiz",
    time: "Today, 10:30 AM",
    detail: "Scored 88% - Ranked #2 in Class",
    icon: CheckCircle2,
    color: "bg-emerald-500",
  },
  {
    type: "practice_start",
    title: "Started Trigonometry Practice",
    time: "Today, 09:15 AM",
    detail: "Time Spent: 45 minutes",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    type: "analysis_viewed",
    title: "Viewed Performance Analysis",
    time: "Yesterday, 06:45 PM",
    detail: "Identified 3 weak areas in Physics",
    icon: BarChart2,
    color: "bg-indigo-500",
  },
  {
    type: "comment_added",
    title: "Received Feedback from Mentor",
    time: "Yesterday, 04:20 PM",
    detail: "'Great improvement in Maths!'",
    icon: Mail,
    color: "bg-orange-500",
  },
];

// --- Sub-Components (Standardized with Dashboard.tsx) ---

const BackgroundOrbs = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E0EFFF] to-[#C9E0FC] blur-[100px] opacity-70" />
    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E8F3FF] to-[#D4E8FF] blur-[80px] opacity-60" />
    <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E6F0F9] to-[#CCE3FA] blur-[120px] opacity-80" />
  </div>
);

const StatCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
  <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[20px] p-3 shadow-sm flex items-center gap-3 hover:bg-white/60 transition-all cursor-pointer">
    <div
      className={`w-10 h-10 rounded-[12px] bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100 shrink-0`}
    >
      <Icon className="w-5 h-5 text-blue-500" />
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[13px] md:text-[20px] font-black text-[#0D245B] leading-none mb-0.5 truncate uppercase">
        {value}
      </span>
      <span className="text-[8px] md:text-[11px] font-black text-[#0D245B] uppercase tracking-widest truncate">
        {title}
      </span>
      <span className="text-[9px] font-black text-blue-500 mt-0.5 uppercase tracking-tighter truncate">
        {subtitle}
      </span>
    </div>
  </div>
);

// --- Main Component ---

export default function StudentDetails() {
  const [students, setStudents] = useState<any[]>(INITIAL_STUDENTS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("mentix_students");
    if (saved) {
      setStudents(JSON.parse(saved));
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"list" | "detail">("list");
  const [detailTab, setDetailTab] = useState("Overview");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8;

  // Filter State
  const [filters, setFilters] = useState({
    class: "All",
    performance: "All",
    status: "All",
  });
  const [notification, setNotification] = useState<{
    msg: string;
    type: "success" | "warning" | "info";
  } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    type: "block" | "delete";
    data?: any;
  } | null>(null);

  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [messageType, setMessageType] = useState<"Feedback" | "Warning" | "Inquiry">("Feedback");
  const [messageText, setMessageText] = useState("");
  const [timelineEvents, setTimelineEvents] = useState(activityTimeline);

  // Real-time Persistence
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("mentix_students", JSON.stringify(students));
    }
  }, [students, isMounted]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newEvent = {
      type: "mentor_message",
      title: messageType === "Warning" ? "Warning Sent" : messageType === "Inquiry" ? "Inquiry Sent" : "Feedback Sent",
      time: "Just now",
      detail: messageText,
      icon: messageType === "Warning" ? AlertTriangle : Mail,
      color: messageType === "Warning" ? "bg-red-500" : messageType === "Inquiry" ? "bg-blue-500" : "bg-emerald-500",
    };

    setTimelineEvents([newEvent, ...timelineEvents]);
    setMessageText("");
    setNotification({ msg: `${messageType} sent successfully`, type: "success" });
    setTimeout(() => setNotification(null), 3000);
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Class",
      "Section",
      "Roll No",
      "Tests Attempted",
      "Avg Score",
      "Performance",
      "Status",
    ];
    const csvRows = [
      headers.join(","),
      ...students.map((s) =>
        [
          s.name,
          s.email,
          s.class,
          s.section,
          s.rollNo,
          s.testsAttempted,
          s.avgScore,
          s.performance,
          s.status,
        ].join(","),
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students_report_${new Date().toLocaleDateString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const addStudent = (newStudent: any) => {
    const studentWithId = {
      ...newStudent,
      id: Date.now(),
      testsAttempted: 0,
      avgScore: 0,
      performance: "Average",
      status: "Active",
      lastActive: "Just now",
      joinedDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    setStudents([studentWithId, ...students]);
    setShowAddModal(false);
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
    if (selectedStudent?.id === id) setView("list");
    setNotification({
      msg: "Student record deleted forever",
      type: "success",
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const blockStudent = (id: number, dateTime: string) => {
    const now = new Date();
    const blockUntil = new Date(dateTime);
    const diffMs = blockUntil.getTime() - now.getTime();

    if (diffMs <= 0) {
      alert("Please select a future date and time.");
      return;
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    let durationMsg = "";
    if (diffDays > 0) durationMsg += `${diffDays} day${diffDays > 1 ? "s" : ""} `;
    if (diffHours > 0)
      durationMsg += `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    if (durationMsg === "") durationMsg = "less than an hour";

    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, status: "Blocked", blockedUntil: dateTime } : s,
      ),
    );
    setSelectedStudent((prev: any) => ({
      ...prev,
      status: "Blocked",
      blockedUntil: dateTime,
    }));

    setNotification({
      msg: `Student blocked for ${durationMsg.trim()}`,
      type: "warning",
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const unblockStudent = (id: number) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, status: "Active" } : s)),
    );
    setSelectedStudent((prev: any) => ({ ...prev, status: "Active" }));
    setNotification({ msg: "Student access restored successfully", type: "success" });
    setTimeout(() => setNotification(null), 3000);
  };

  // Advanced Filter Logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesTab = activeTab === "All" || student.status === activeTab;
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass =
        filters.class === "All" || student.class === filters.class;
      const matchesPerf =
        filters.performance === "All" ||
        student.performance === filters.performance;
      const matchesStatus =
        filters.status === "All" || student.status === filters.status;

      return (
        matchesTab &&
        matchesSearch &&
        matchesClass &&
        matchesPerf &&
        matchesStatus
      );
    });
  }, [students, activeTab, searchQuery, filters]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setView("detail");
    setDetailTab("Overview");
  };

  const getPerformanceColor = (perf: string) => {
    switch (perf) {
      case "Excellent":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Good":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Average":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "Needs Help":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };



  return (
    <MentorLayout>
      {view === "list" ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header Section */}
          <section className="mb-6 px-1 mt-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
            <div className="w-full">
              <h1 className="text-[15px] md:text-2xl font-black text-[#0D245B] tracking-tight mb-1 uppercase">
                Student Details
              </h1>
              <p className="text-[#5B779E] text-[9px] md:text-[13px] font-bold uppercase tracking-wider">
                Monitor student performance and progress.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={exportToCSV}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 md:py-2.5 border border-slate-200 bg-white rounded-xl text-[10px] md:text-[11px] font-black text-[#0D245B] uppercase tracking-widest active:scale-95 shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-blue-500" /> Export
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 md:py-2.5 bg-blue-600 rounded-xl text-[10px] md:text-[11px] font-black text-white active:scale-95 shadow-lg uppercase tracking-widest"
              >
                <Plus className="w-3.5 h-3.5" /> Add Student
              </button>
            </div>
          </section>

          {/* Search & Tabs Section */}
          <section className="px-1 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="SEARCH STUDENTS..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 md:pl-11 pr-4 py-2 md:py-2.5 text-[10px] md:text-[13px] font-bold text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all uppercase tracking-tight shadow-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 md:py-2.5 border rounded-xl text-[10px] md:text-[11px] font-black transition-all active:scale-95 uppercase tracking-widest ${showFilters
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-[#0D245B] border-slate-200"
                  }`}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mb-6 p-3 md:p-6 bg-white/60 backdrop-blur-xl border border-white/70 rounded-[20px] md:rounded-[32px] animate-in fade-in slide-in-from-top-4 duration-300 shadow-[0_8px_24px_rgba(30,100,200,0.06)]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[13px] font-bold text-[#0D245B]">
                      Class Level
                    </label>
                    <select
                      value={filters.class}
                      onChange={(e) =>
                        setFilters({ ...filters, class: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 md:py-2.5 text-[11px] md:text-[14px] font-medium text-slate-500 outline-none"
                    >
                      <option value="All">All Classes</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[13px] font-bold text-[#0D245B]">
                      Performance
                    </label>
                    <select
                      value={filters.performance}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          performance: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 md:py-2.5 text-[11px] md:text-[14px] font-medium text-slate-500 outline-none"
                    >
                      <option value="All">All Performance</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                      <option value="Needs Help">Needs Help</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-[13px] font-bold text-[#0D245B]">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 md:py-2.5 text-[11px] md:text-[14px] font-medium text-slate-500 outline-none"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 md:gap-8 border-b border-slate-200/60 px-4">
              {["All", "Active", "Inactive"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`pb-2 md:pb-4 text-[11px] md:text-[14.5px] font-bold transition-all relative ${activeTab === tab
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  {tab} (
                  {tab === "All"
                    ? students.length
                    : students.filter((s) => s.status === tab).length}
                  )
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in duration-300" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Table Section */}
          <section className="px-2">
            <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] overflow-hidden shadow-[0_8px_24px_rgba(30,100,200,0.06)]">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="py-2 px-3 md:px-4 text-left text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest">
                      Student
                    </th>
                    <th className="py-2 px-3 md:px-4 text-left text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest hidden md:table-cell">
                      Class
                    </th>
                    <th className="py-2 px-3 md:px-4 text-center text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest">
                      Avg Score
                    </th>
                    <th className="py-2 px-3 md:px-4 text-left text-[9px] md:text-[11px] font-black text-[#5B779E] uppercase tracking-widest hidden md:table-cell">
                      Status
                    </th>
                    <th className="py-2 px-3 md:px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                      onClick={() => handleStudentClick(student)}
                    >
                      <td className="py-2 px-3 md:px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm shrink-0">
                            <img
                              src={`https://i.pravatar.cc/150?u=${student.id}`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[10px] md:text-[13px] font-black text-[#0D245B] group-hover:text-blue-600 transition-colors truncate uppercase">
                              {student.name}
                            </h4>
                            <p className="text-[9px] md:text-[10px] text-[#5B779E] font-bold truncate uppercase tracking-tighter">
                              {student.class} • {student.section}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 md:px-4 hidden md:table-cell">
                        <span className="text-[12px] font-black text-[#0D245B] uppercase">{student.class}</span>
                      </td>
                      <td className="py-2 px-3 md:px-4 text-center">
                        <span className="text-[11px] md:text-[14px] font-black text-[#0D245B]">{student.avgScore}%</span>
                      </td>
                      <td className="py-2 px-3 md:px-4 hidden md:table-cell">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${student.status === "Active" ? "bg-emerald-500" : "bg-slate-300"}`} />
                          <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-widest ${student.status === "Active" ? "text-emerald-600" : "text-slate-400"}`}>
                            {student.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-3 md:px-4 text-right">
                        <ChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredStudents.length === 0 && (
                <div className="py-16 text-center">
                  <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-black text-[11px] uppercase tracking-widest">
                    No students found
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4 px-1">
              <p className="text-[11px] font-black text-[#5B779E] uppercase tracking-widest">
                Showing{" "}
                <span className="text-[#0D245B]">
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredStudents.length)}
                </span>{" "}
                of {filteredStudents.length}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50 active:scale-90 shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-black text-[11px] transition-all active:scale-90 ${currentPage === page
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          {/* Profile Header */}
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 text-blue-600 font-bold text-[14px] mb-8 group hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Students
          </button>

          <div className="flex items-start justify-between mb-8 px-2">
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 rounded-[40px] bg-white p-1 shadow-lg overflow-hidden border border-white">
                <img
                  src={`https://i.pravatar.cc/150?u=${selectedStudent.id}`}
                  alt=""
                  className="w-full h-full object-cover rounded-[38px]"
                />
              </div>
              <div>
                <h1 className="text-[36px] font-black text-[#0D245B] leading-none mb-2">
                  {selectedStudent.name}
                </h1>
                <p className="text-[16px] font-bold text-slate-400 mb-6">
                  {selectedStudent.email}
                </p>
                <div className="flex items-center gap-4 text-slate-500 font-bold text-[14px] mt-1">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${selectedStudent.status === "Active"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : "bg-slate-50 border-slate-200 text-slate-500"
                    }`}>
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${selectedStudent.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`}
                    />
                    <span className="text-[12px] uppercase tracking-wider font-black">
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* Detail Tabs */}
          <div className="flex gap-4 border-b border-slate-200/60 mb-6 px-1 overflow-x-auto no-scrollbar">
            {["Overview", "Performance", "Activity"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`pb-2.5 text-[11px] font-black transition-all relative whitespace-nowrap uppercase tracking-widest ${detailTab === tab
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  {tab}
                  {detailTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in duration-300" />
                  )}
                </button>
              ),
            )}
          </div>

          {/* Detail Content Grid */}
          <div className="px-1">
            {detailTab === "Overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-[13px] font-black text-[#0D245B] uppercase tracking-widest">
                      Student Information
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "NAME", value: selectedStudent.name },
                      { label: "EMAIL", value: selectedStudent.email },
                      { label: "CLASS", value: `${selectedStudent.class}` },
                      { label: "JOINED", value: selectedStudent.joinedDate },
                      { label: "LAST ACTIVE", value: selectedStudent.lastActive },
                    ].map((info) => (
                      <div
                        key={info.label}
                        className="flex justify-between items-center py-0.5"
                      >
                        <span className="text-[10px] font-black text-[#5B779E] uppercase tracking-tighter">
                          {info.label}
                        </span>
                        <span className="text-[12px] font-black text-[#0D245B] uppercase">
                          {info.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
                  <h3 className="text-[13px] font-black text-[#0D245B] mb-5 uppercase tracking-widest">
                    Recent Test Scores
                  </h3>
                  <div className="space-y-3">
                    {studentTests.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                            <Calendar className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[12px] font-black text-[#0D245B] truncate uppercase">
                              {test.name}
                            </h4>
                            <p className="text-[10px] text-[#5B779E] font-bold uppercase tracking-tighter">
                              {test.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[13px] font-black text-[#0D245B]">
                            {test.score}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${test.status === "Live" ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"}`}
                          >
                            {test.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {detailTab === "Performance" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Date Picker Row */}
                <div className="flex justify-end mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
                    <span className="text-[11px] font-black text-[#0D245B] uppercase tracking-widest">MAY 1 – MAY 12, 2025</span>
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-4">
                  {/* Performance by Test Table */}
                  <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
                    <h3 className="text-[13px] font-black text-[#0D245B] mb-4 uppercase tracking-widest">Performance by Test</h3>
                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr className="border-b border-slate-50">
                            <th className="text-left py-3 text-[10px] font-black text-[#5B779E] uppercase tracking-widest">Test</th>
                            <th className="text-left py-3 text-[10px] font-black text-[#5B779E] uppercase tracking-widest">Sub</th>
                            <th className="text-left py-3 text-[10px] font-black text-[#5B779E] uppercase tracking-widest">Score</th>
                            <th className="text-left py-3 text-[10px] font-black text-[#5B779E] uppercase tracking-widest">Rank</th>
                            <th className="text-left py-3 text-[10px] font-black text-[#5B779E] uppercase tracking-widest">Date</th>
                            <th className="text-left py-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            { name: "Quadratic Equations", sub: "Math", score: "86/100", rank: "2/45", date: "May 12", status: "Done" },
                            { name: "Cell Structure", sub: "Bio", score: "92/100", rank: "1/45", date: "May 08", status: "Done" },
                            { name: "Chemical Bonding", sub: "Chem", score: "75/100", rank: "5/45", date: "May 05", status: "Done" },
                            { name: "Photosynthesis", sub: "Bio", score: "88/100", rank: "2/45", date: "May 01", status: "Done" },
                          ].map((row, idx) => (
                            <tr key={idx} className="group hover:bg-slate-50 transition-all">
                              <td className="py-3 text-[12px] font-black text-[#0D245B] uppercase truncate max-w-[120px]">{row.name}</td>
                              <td className="py-3 text-[11px] font-bold text-[#5B779E] uppercase">{row.sub}</td>
                              <td className="py-3 text-[12px] font-black text-[#0D245B]">{row.score}</td>
                              <td className="py-3 text-[11px] font-black text-[#5B779E]">{row.rank}</td>
                              <td className="py-3 text-[11px] font-bold text-[#5B779E] uppercase">{row.date}</td>
                              <td className="py-3 text-right">
                                <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">{row.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Subject Performance */}
                  <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
                    <h3 className="text-[13px] font-black text-[#0D245B] mb-6 uppercase tracking-widest">Subject Performance</h3>
                    <div className="space-y-5">
                      {[
                        { subject: "Mathematics", score: 95 },
                        { subject: "Physics", score: 85 },
                        { subject: "Chemistry", score: 80 },
                        { subject: "Biology", score: 75 },
                      ].map((s, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-tight">
                            <span className="text-[#5B779E]">{s.subject}</span>
                            <span className="text-[#0D245B]">{s.score}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" style={{ width: `${s.score}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
                    <h3 className="text-[13px] font-black text-[#0D245B] mb-6 uppercase tracking-widest">Analysis</h3>

                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Strengths</p>
                        <div className="space-y-3">
                          {[
                            { topic: "Cell Structure", score: 92 },
                            { topic: "Quadratic Equations", score: 86 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0">
                                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                                </div>
                                <span className="text-[12px] font-black text-[#0D245B] uppercase">{item.topic}</span>
                              </div>
                              <span className="text-[12px] font-black text-emerald-600">{item.score}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3">Needs Work</p>
                        <div className="space-y-3">
                          {[
                            { topic: "Trigonometry", score: 70 },
                            { topic: "Chemical Bonding", score: 75 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0">
                                  <AlertTriangle className="w-2.5 h-2.5 text-orange-500" />
                                </div>
                                <span className="text-[12px] font-black text-[#0D245B] uppercase">{item.topic}</span>
                              </div>
                              <span className="text-[12px] font-black text-orange-500">{item.score}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {detailTab === "Weak Topics" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-red-50/50 border border-red-100 rounded-[24px] p-6 mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div>
                      <h4 className="text-[16px] font-bold text-red-700">
                        Immediate Action Required
                      </h4>
                      <p className="text-[13px] text-red-600 font-medium">
                        Scores in Trigonometry are below 40%. Consider
                        remedial practice.
                      </p>
                    </div>
                  </div>
                  <button className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold text-[13px] hover:bg-red-700 transition-all">
                    Assign Practice
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {weakTopicsData.map((item) => (
                    <div
                      key={item.topic}
                      className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] p-8 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}
                          >
                            <item.icon
                              className={`w-5 h-5 ${item.color}`}
                            />
                          </div>
                          <div>
                            <h4 className="text-[15px] font-bold text-[#0D245B]">
                              {item.topic}
                            </h4>
                            <p className="text-[12px] text-slate-400 font-medium">
                              {item.subject}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-lg border border-red-100 uppercase tracking-wider">
                          {item.impact} Impact
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[12px] font-bold text-slate-500">
                          <span>Understanding</span>
                          <span>{item.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.score < 40 ? "bg-red-500" : "bg-orange-500"} rounded-full`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detailTab === "Activity" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Communication Module */}
                <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-black text-[#0D245B] uppercase tracking-widest">Send Message</h3>
                      <p className="text-[10px] text-[#5B779E] font-bold uppercase tracking-tighter">Feedback, warnings, or inquiries</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
                      {["Feedback", "Warning", "Inquiry"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setMessageType(type as any)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border uppercase tracking-widest whitespace-nowrap ${messageType === type
                              ? type === "Warning"
                                ? "bg-red-50 text-red-600 border-red-200"
                                : type === "Inquiry"
                                  ? "bg-blue-50 text-blue-600 border-blue-200"
                                  : "bg-emerald-50 text-emerald-600 border-emerald-200"
                              : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder={`TYPE YOUR ${messageType.toUpperCase()} HERE...`}
                        className="w-full h-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 resize-none transition-all uppercase tracking-tight"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="absolute bottom-3 right-3 bg-[#0D245B] hover:bg-blue-900 disabled:bg-slate-200 text-white px-4 py-2 rounded-lg font-black text-[10px] transition-all flex items-center gap-2 shadow-md uppercase tracking-widest"
                      >
                        <Send className="w-3 h-3" /> Send
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
                  <h3 className="text-[13px] font-black text-[#0D245B] mb-6 flex items-center gap-2 uppercase tracking-widest">
                    <Activity className="w-4 h-4 text-blue-500" /> Timeline
                  </h3>
                  <div className="space-y-8 relative px-2">
                    <div className="absolute left-[20px] top-4 bottom-4 w-px bg-slate-100" />
                    {timelineEvents.map((item, idx) => (
                      <div key={idx} className="flex gap-4 relative z-10">
                        <div
                          className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shadow-md shrink-0`}
                        >
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="flex justify-between items-start mb-0.5">
                            <h4 className="text-[12px] font-black text-[#0D245B] uppercase">
                              {item.title}
                            </h4>
                            <span className="text-[9px] font-black text-[#5B779E] uppercase tracking-tighter">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5B779E] font-bold uppercase tracking-tight">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Management & Security Zone */}
          <div className="px-1 mt-10 mb-20 space-y-4">
            <h3 className="text-[13px] font-black text-[#0D245B] flex items-center gap-2 uppercase tracking-widest ml-1">
              <ShieldAlert className="w-4 h-4 text-slate-400" /> Security
            </h3>

            {/* Block Student Card */}
            <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 shadow-sm">
                    <Ban className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#0D245B]">
                      {selectedStudent.status === "Blocked"
                        ? "Student is Blocked"
                        : "Block Student Access"}
                    </h4>
                    <p className="text-[13px] text-slate-500 font-medium max-w-md">
                      {selectedStudent.status === "Blocked"
                        ? `This student is currently blocked until ${selectedStudent.blockedUntil || "further notice"}. They cannot access the platform.`
                        : "Temporarily restrict student access to the platform. You can specify an end date for this restriction."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {selectedStudent.status === "Blocked" ? (
                    <button
                      onClick={() => unblockStudent(selectedStudent.id)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-[14px] hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" /> Unblock Student
                    </button>
                  ) : (
                    <div className="flex items-end gap-3">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-400 mb-1 ml-1">
                          Block Until Date
                        </span>
                        <input
                          type="date"
                          id="blockUntilDate"
                          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-[#0D245B] outline-none focus:ring-2 focus:ring-amber-400/20"
                          min={new Date().toISOString().split("T")[0]}
                          defaultValue={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-400 mb-1 ml-1">
                          Time
                        </span>
                        <input
                          type="time"
                          id="blockUntilTime"
                          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-[#0D245B] outline-none focus:ring-2 focus:ring-amber-400/20"
                          defaultValue="23:59"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const dateInput = document.getElementById(
                            "blockUntilDate",
                          ) as HTMLInputElement;
                          const timeInput = document.getElementById(
                            "blockUntilTime",
                          ) as HTMLInputElement;
                          if (!dateInput.value || !timeInput.value) return;
                          setConfirmModal({
                            type: "block",
                            data: `${dateInput.value}T${timeInput.value}`,
                          });
                        }}
                        className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-bold text-[14px] hover:bg-amber-600 transition-all shadow-md active:scale-95 flex items-center gap-2"
                      >
                        <Ban className="w-4 h-4" /> Block
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Styled Alert Message / Notification */}
            {notification && (
              <div className="fixed bottom-10 right-10 z-[200] animate-in slide-in-from-right-10 fade-in duration-300">
                <div
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${notification.type === "warning"
                      ? "bg-amber-50/90 border-amber-200 text-amber-800"
                      : "bg-emerald-50/90 border-emerald-200 text-emerald-800"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.type === "warning"
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-500 text-white"
                      }`}
                  >
                    {notification.type === "warning" ? (
                      <Ban className="w-5 h-5" />
                    ) : (
                      <Check className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-[14px] font-black leading-tight">
                      {notification.type === "warning"
                        ? "Restriction Applied"
                        : "Action Successful"}
                    </p>
                    <p className="text-[13px] font-bold opacity-80">
                      {notification.msg}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotification(null)}
                    className="ml-4 p-1 hover:bg-black/5 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Custom Confirmation Modal */}
            {confirmModal && (
              <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
                <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-10 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/50 transform animate-in zoom-in-95 duration-300">
                  <div
                    className={`w-20 h-20 rounded-[24px] ${confirmModal.type === "delete"
                        ? "bg-red-50 text-red-500"
                        : "bg-amber-50 text-amber-500"
                      } flex items-center justify-center mb-8 mx-auto shadow-sm`}
                  >
                    {confirmModal.type === "delete" ? (
                      <Trash2 className="w-10 h-10" />
                    ) : (
                      <Ban className="w-10 h-10" />
                    )}
                  </div>

                  <h3 className="text-[24px] font-black text-[#0D245B] text-center mb-4 leading-tight">
                    {confirmModal.type === "delete"
                      ? "Delete Student Forever?"
                      : "Confirm Student Block?"}
                  </h3>

                  <p className="text-[15px] text-slate-500 font-medium text-center mb-6 leading-relaxed">
                    {confirmModal.type === "delete"
                      ? "This will permanently remove this student and all their data from the system. This action cannot be undone."
                      : "The student will be restricted from accessing the platform until the specified date and time."}
                  </p>

                  <div className="mb-8">
                    <label className="text-[13px] font-bold text-[#0D245B] block mb-2 text-center">
                      Enter your Master Password to Confirm
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
                        if (confirmModal.type === "delete") {
                          deleteStudent(selectedStudent.id);
                        } else {
                          blockStudent(
                            selectedStudent.id,
                            confirmModal.data,
                          );
                        }
                        setConfirmModal(null);
                        setAdminPassword("");
                        setPasswordError("");
                      }}
                      className={`w-full py-4 rounded-2xl font-black text-[15px] transition-all shadow-md active:scale-95 ${confirmModal.type === "delete"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-amber-500 text-white hover:bg-amber-600"
                        }`}
                    >
                      Confirm & Proceed
                    </button>
                    <button
                      onClick={() => {
                        setConfirmModal(null);
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

            {/* Delete Student Card */}
            <div className="bg-red-50/50 border border-red-100 rounded-[32px] p-8 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-red-100 shadow-sm">
                  <Trash2 className="w-7 h-7 text-red-500" />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-red-600">
                    Delete Student Profile Forever
                  </h4>
                  <p className="text-[13px] text-slate-500 font-medium">
                    This action is permanent and cannot be undone. All test
                    results and activity logs will be lost.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConfirmModal({ type: "delete" })}
                className="bg-white border border-red-200 text-red-500 px-8 py-3 rounded-2xl font-bold text-[14px] hover:bg-red-50 transition-all shadow-sm active:scale-95"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

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
