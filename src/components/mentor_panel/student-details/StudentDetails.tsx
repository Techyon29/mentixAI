"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Plus, Download, MoreVertical, ChevronLeft, ChevronRight, User, Mail, GraduationCap, Calendar, Clock, CheckCircle2, AlertTriangle, ArrowLeft, Users, BarChart2, UserCheck, UserMinus, Star, SlidersHorizontal, FileText, X, Trash2, Edit3, ChevronDown, Check, Zap, TrendingUp, Target, Activity, BookOpen, Brain, History, ArrowUpRight, Ban, ShieldAlert, Send, MessageSquare } from "lucide-react";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";


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
  <div className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[28px] p-6 shadow-[0_8px_24px_rgba(30,100,200,0.06),_inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center gap-5 hover:bg-white/60 transition-all cursor-pointer">
    <div
      className={`w-14 h-14 rounded-[18px] bg-blue-50 text-blue-500 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] border border-blue-100 group-hover:scale-110 transition-transform duration-500`}
    >
      <Icon className="w-7 h-7 text-blue-500" />
    </div>
    <div className="flex flex-col">
      <span className="text-[28px] font-bold text-[#0D245B] leading-none mb-1">
        {value}
      </span>
      <span className="text-[14px] font-bold text-[#0D245B]">
        {title}
      </span>
      <span className="text-[12px] font-semibold text-blue-500 mt-0.5">
        {subtitle}
      </span>
    </div>
  </div>
);

// --- Main Component ---

export default function StudentDetails() {
  const [students, setStudents] = useState<any[]>(INITIAL_STUDENTS);
  const [isLoaded, setIsLoaded] = useState(false);
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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mentix_students");
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load students from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Real-time Persistence
  useEffect(() => {
    if (isLoaded && students.length > 0) {
      localStorage.setItem("mentix_students", JSON.stringify(students));
    }
  }, [students, isLoaded]);

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

  const addStudent = async (newStudent: any) => {
    try {
      const res = await fetch("/api/teacher/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newStudent.name,
          email: newStudent.email,
          class: newStudent.class,
          section: newStudent.section,
          rollNo: Number(newStudent.rollNo),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Failed to add student");
        return;
      }

      const responseData = await res.json();
      const savedStudent = responseData.student;
      const extra = savedStudent.extra || {};

      const studentWithId = {
        id: savedStudent._id,
        name: savedStudent.name,
        email: savedStudent.email,
        class: extra.class || newStudent.class,
        section: extra.section || newStudent.section,
        rollNo: extra.rollNo !== undefined ? Number(extra.rollNo) : Number(newStudent.rollNo),
        testsAttempted: 0,
        avgScore: 0,
        performance: "Average",
        status: savedStudent.isActive ? "Active" : "Inactive",
        lastActive: "Just now",
        joinedDate: new Date(savedStudent.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      setStudents([studentWithId, ...students]);
      setShowAddModal(false);
      setNotification({
        msg: "Student record added successfully",
        type: "success",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the student.");
    }
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
    <div className="relative w-full min-h-screen bg-[#F0F5FA] overflow-hidden font-sans text-slate-800">
      <BackgroundOrbs />

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/40 transform animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#0D245B]">
                Add New Student
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                addStudent({
                  name: formData.get("name"),
                  email: formData.get("email"),
                  class: formData.get("class"),
                  section: formData.get("section"),
                  rollNo: formData.get("rollNo"),
                });
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-[13px] font-bold text-[#0D245B]">
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[13px] font-bold text-[#0D245B]">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold text-[#0D245B]">
                    Class
                  </label>
                  <select
                    name="class"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                  >
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold text-[#0D245B]">
                    Section
                  </label>
                  <input
                    name="section"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                    placeholder="A"
                  />
                </div>
              </div>
              <div className="space-y-1 pb-2">
                <label className="text-[13px] font-bold text-[#0D245B]">
                  Roll Number
                </label>
                <input
                  name="rollNo"
                  type="number"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                  placeholder="15"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-95"
              >
                Add Student
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="relative z-10 flex h-screen p-4 gap-6">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <Navbar />

          {view === "list" ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header Section */}
              <section className="mb-8 px-2 mt-2 flex justify-between items-end">
                <div>
                  <h1 className="text-[34px] font-bold text-[#0D245B] tracking-tight mb-2 flex items-center gap-3">
                    Student Details
                  </h1>
                  <p className="text-[#5B779E] text-[16px] font-medium">
                    Manage and monitor student performance and progress.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white rounded-2xl text-[14px] font-bold text-[#0D245B] hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                  >
                    <Download className="w-4 h-4 text-blue-500" /> Export Data
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-2xl text-[14px] font-bold text-white hover:bg-blue-700 transition-all shadow-[0_8px_20px_rgba(37,99,235,0.3)] active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Add Student
                  </button>
                </div>
              </section>

              {/* Search & Tabs Section */}
              <section className="px-2 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search students by name or email..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-white border border-slate-200 rounded-[20px] pl-12 pr-4 py-3.5 text-[15px] font-medium text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all shadow-sm"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-5 py-3.5 border rounded-[20px] text-[14px] font-bold transition-all shadow-sm active:scale-95 ${
                      showFilters
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-[#0D245B] border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4" /> Filter
                  </button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="mb-6 p-6 bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] animate-in fade-in slide-in-from-top-4 duration-300 shadow-[0_8px_24px_rgba(30,100,200,0.06)]">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-[#0D245B]">
                          Class Level
                        </label>
                        <select
                          value={filters.class}
                          onChange={(e) =>
                            setFilters({ ...filters, class: e.target.value })
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-slate-500 outline-none"
                        >
                          <option value="All">All Classes</option>
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                          <option value="Class 11">Class 11</option>
                          <option value="Class 12">Class 12</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-[#0D245B]">
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
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-slate-500 outline-none"
                        >
                          <option value="All">All Performance</option>
                          <option value="Excellent">Excellent</option>
                          <option value="Good">Good</option>
                          <option value="Average">Average</option>
                          <option value="Needs Help">Needs Help</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-[#0D245B]">
                          Status
                        </label>
                        <select
                          value={filters.status}
                          onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value })
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-slate-500 outline-none"
                        >
                          <option value="All">All Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-8 border-b border-slate-200/60 px-4">
                  {["All", "Active", "Inactive"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setCurrentPage(1);
                      }}
                      className={`pb-4 text-[14.5px] font-bold transition-all relative ${
                        activeTab === tab
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
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in duration-300"/>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Table Section */}
              <section className="px-2">
                <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] overflow-hidden shadow-[0_8px_24px_rgba(30,100,200,0.06)]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="py-5 px-8 w-10">
                          <input
                            type="checkbox"
                            className="rounded-md border-slate-300"
                          />
                        </th>
                        <th className="py-5 px-4 text-left text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="py-5 px-4 text-left text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                          Class
                        </th>

                        <th className="py-5 px-4 text-center text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                          Avg Score
                        </th>
                        <th className="py-5 px-4 text-left text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="py-5 px-4 text-left text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="py-5 px-8"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                          onClick={() => handleStudentClick(student)}
                        >
                          <td
                            className="py-5 px-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              className="rounded-md border-slate-300 cursor-pointer"
                            />
                          </td>
                          <td className="py-5 px-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                <img
                                  src={`https://i.pravatar.cc/150?u=${student.id}`}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-[15px] font-bold text-[#0D245B] group-hover:text-blue-600 transition-colors">
                                  {student.name}
                                </h4>
                                <p className="text-[12px] text-[#5B779E] font-medium">
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-4">
                            <h4 className="text-[14px] font-bold text-[#0D245B]">
                              {student.class}
                            </h4>
                            <p className="text-[12px] text-[#5B779E] font-medium">
                              {student.section}
                            </p>
                          </td>

                          <td className="py-5 px-4 text-center text-[15px] font-black text-[#0D245B]">
                            {student.avgScore}%
                          </td>
                          <td className="py-5 px-4">
                            <span
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${getPerformanceColor(student.performance)}`}
                            >
                              {student.performance}
                            </span>
                          </td>
                          <td className="py-5 px-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${student.status === "Active" ? "bg-emerald-500" : "bg-slate-300"}`}
                              />
                              <span
                                className={`text-[13px] font-bold ${student.status === "Active" ? "text-emerald-600" : "text-slate-400"}`}
                              >
                                {student.status}
                              </span>
                            </div>
                          </td>
                          <td
                            className="py-5 px-8 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => deleteStudent(student.id)}
                                className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredStudents.length === 0 && (
                    <div className="py-20 text-center">
                      <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-medium text-[15px]">
                        No students found matching your criteria.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-8 px-4">
                  <p className="text-[13.5px] font-medium text-slate-500">
                    Showing{" "}
                    <span className="text-[#0D245B] font-bold">
                      {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredStudents.length,
                      )}
                    </span>{" "}
                    results
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(0, 5)
                        .map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-xl font-bold text-[14px] transition-all ${
                              currentPage === page
                                ? "bg-blue-600 text-white shadow-md"
                                : "hover:bg-white border border-transparent hover:border-slate-200 text-slate-600"
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
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
                        selectedStudent.status === "Active" 
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
              <div className="flex gap-10 border-b border-slate-200/60 mb-8 px-4">
                {["Overview", "Performance", "Activity"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`pb-4 text-[15px] font-bold transition-all relative ${
                        detailTab === tab
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

              {/* Detail Content Grid (Matching CreateTest style) */}
              <div className="px-2">
                {detailTab === "Overview" && (
                  <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] p-8 shadow-[0_8px_24px_rgba(30,100,200,0.06),_inset_0_2px_4px_rgba(255,255,255,0.8)]">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[18px] font-bold text-[#0D245B]">
                          Student Information
                        </h3>
                       
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: "Full Name: ", value: selectedStudent.name },
                          { label: "Email: ", value: selectedStudent.email },
                          { label: "Class: ", value: `${selectedStudent.class}` },
                          {
                            label: "Joined: ",
                            value: selectedStudent.joinedDate,
                          },
                          {
                            label: "Last Active: ",
                            value: selectedStudent.lastActive,
                          },
                        ].map((info) => (
                          <div
                            key={info.label}
                            className="flex justify-between items-center py-1"
                          >
                            <span className="text-[14px] font-bold text-slate-400">
                              {info.label}
                            </span>
                            <span className="text-[14px] font-bold text-[#0D245B]">
                              {info.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] p-8 shadow-[0_8px_24px_rgba(30,100,200,0.06),_inset_0_2px_4px_rgba(255,255,255,0.8)]">
                      <h3 className="text-[18px] font-bold text-[#0D245B] mb-6">
                        Recent Test Scores
                      </h3>
                      <div className="space-y-4">
                        {studentTests.map((test) => (
                          <div
                            key={test.id}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-blue-500" />
                              </div>
                              <div>
                                <h4 className="text-[14px] font-bold text-[#0D245B] truncate">
                                  {test.name}
                                </h4>
                                <p className="text-[11px] text-slate-400 font-medium">
                                  {test.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[15px] font-bold text-[#0D245B]">
                                {test.score}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${test.status === "Live" ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"}`}
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
                    <div className="flex justify-end mb-6">
                      <div className="flex items-center gap-3 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/60 rounded-xl shadow-sm cursor-pointer hover:bg-white transition-all">
                        <span className="text-[13px] font-bold text-[#0D245B]">May 1 – May 12, 2025</span>
                        <Calendar className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6 mb-8">
                      {/* Performance by Test Table */}
                      <div className="col-span-12 bg-white/70 backdrop-blur-md border border-white/60 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-[16px] font-bold text-[#0D245B] mb-6">Performance by Test</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-100">
                                <th className="text-left py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Test Name</th>
                                <th className="text-left py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Subject</th>
                                <th className="text-left py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Score</th>
                                <th className="text-left py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Rank</th>
                                <th className="text-left py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Date</th>
                                <th className="text-left py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {[
                                { name: "Quadratic Equations - Quiz 1", sub: "Mathematics", score: "86/100", rank: "2/45", date: "May 12, 2025", status: "Completed" },
                                { name: "Cell Structure & Functions", sub: "Biology", score: "92/100", rank: "1/45", date: "May 08, 2025", status: "Completed" },
                                { name: "Chemical Bonding", sub: "Chemistry", score: "75/100", rank: "5/45", date: "May 05, 2025", status: "Completed" },
                                { name: "Photosynthesis Process", sub: "Biology", score: "88/100", rank: "2/45", date: "May 01, 2025", status: "Completed" },
                              ].map((row, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                  <td className="py-4 text-[13px] font-bold text-[#0D245B]">{row.name}</td>
                                  <td className="py-4 text-[12px] font-medium text-slate-500">{row.sub}</td>
                                  <td className="py-4 text-[13px] font-black text-[#0D245B]">{row.score}</td>
                                  <td className="py-4 text-[12px] font-bold text-slate-400">{row.rank}</td>
                                  <td className="py-4 text-[12px] font-medium text-slate-500">{row.date}</td>
                                  <td className="py-4">
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg border border-emerald-100">{row.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                      {/* Subject Performance */}
                      <div className="col-span-7 bg-white/70 backdrop-blur-md border border-white/60 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-[16px] font-bold text-[#0D245B] mb-8">Subject Performance</h3>
                        <div className="space-y-6">
                          {[
                            { subject: "Mathematics", score: 95 },
                            { subject: "Physics", score: 85 },
                            { subject: "Chemistry", score: 80 },
                            { subject: "Biology", score: 75 },
                            { subject: "English", score: 70 },
                          ].map((s, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className="flex justify-between items-center text-[13px] font-bold">
                                <span className="text-slate-500">{s.subject}</span>
                                <span className="text-[#0D245B]">{s.score}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${s.score}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strengths & Weaknesses */}
                      <div className="col-span-5 bg-white/70 backdrop-blur-md border border-white/60 rounded-[32px] p-8 shadow-sm">
                        <h3 className="text-[16px] font-bold text-[#0D245B] mb-8">Strengths & Weaknesses</h3>
                        
                        <div className="space-y-8">
                          <div>
                            <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-5">Strengths</p>
                            <div className="space-y-4">
                              {[
                                { topic: "Cell Structure", score: 92 },
                                { topic: "Quadratic Equations", score: 86 },
                                { topic: "Photosynthesis", score: 88 }
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                      <Check className="w-3 h-3 text-emerald-600" />
                                    </div>
                                    <span className="text-[13px] font-bold text-[#0D245B]">{item.topic}</span>
                                  </div>
                                  <span className="text-[13px] font-black text-emerald-600">{item.score}%</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-[11px] font-black text-orange-500 uppercase tracking-widest mb-5">Needs Improvement</p>
                            <div className="space-y-4">
                              {[
                                { topic: "Trigonometry", score: 70 },
                                { topic: "Chemical Bonding", score: 75 }
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
                                      <AlertTriangle className="w-3 h-3 text-orange-500" />
                                    </div>
                                    <span className="text-[13px] font-bold text-[#0D245B]">{item.topic}</span>
                                  </div>
                                  <span className="text-[13px] font-black text-orange-500">{item.score}%</span>
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
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Communication Module */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="text-[16px] font-bold text-[#0D245B]">Send Message</h3>
                          <p className="text-[12px] text-slate-500 font-medium">Send feedback, warnings, or inquiries</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex gap-4">
                          {["Feedback", "Warning", "Inquiry"].map((type) => (
                            <button
                              key={type}
                              onClick={() => setMessageType(type as any)}
                              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all border ${
                                messageType === type
                                  ? type === "Warning" 
                                    ? "bg-red-50 text-red-600 border-red-200" 
                                    : type === "Inquiry"
                                      ? "bg-blue-50 text-blue-600 border-blue-200"
                                      : "bg-emerald-50 text-emerald-600 border-emerald-200"
                                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
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
                            placeholder={`Type your ${messageType.toLowerCase()} here...`}
                            className="w-full h-32 px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none transition-all"
                          />
                          <button
                            onClick={handleSendMessage}
                            disabled={!messageText.trim()}
                            className="absolute bottom-4 right-4 bg-[#0D245B] hover:bg-blue-900 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-xl font-bold text-[13px] transition-all flex items-center gap-2 shadow-md hover:shadow-lg disabled:shadow-none"
                          >
                            <Send className="w-4 h-4" /> Send
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] p-10 shadow-sm">
                      <h3 className="text-[18px] font-bold text-[#0D245B] mb-10 flex items-center gap-3">
                        <Activity className="w-5 h-5 text-blue-500" /> Activity
                        Timeline
                      </h3>
                      <div className="space-y-10 relative">
                        <div className="absolute left-[23px] top-4 bottom-4 w-px bg-slate-200" />
                        {timelineEvents.map((item, idx) => (
                          <div key={idx} className="flex gap-6 relative z-10">
                            <div
                              className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shadow-lg shrink-0`}
                            >
                              <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 pt-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="text-[15px] font-bold text-[#0D245B]">
                                  {item.title}
                                </h4>
                                <span className="text-[11px] font-bold text-slate-400">
                                  {item.time}
                                </span>
                              </div>
                              <p className="text-[13px] text-slate-500 font-medium">
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
              <div className="px-2 mt-12 mb-20 space-y-6">
                <h3 className="text-[18px] font-bold text-[#0D245B] mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-slate-400" /> Management
                  & Security
                </h3>

                {/* Block Student Card */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[32px] p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
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
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${
                        notification.type === "warning"
                          ? "bg-amber-50/90 border-amber-200 text-amber-800"
                          : "bg-emerald-50/90 border-emerald-200 text-emerald-800"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          notification.type === "warning"
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
                        className={`w-20 h-20 rounded-[24px] ${
                          confirmModal.type === "delete"
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
                          className={`w-full py-4 rounded-2xl font-black text-[15px] transition-all shadow-md active:scale-95 ${
                            confirmModal.type === "delete"
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
