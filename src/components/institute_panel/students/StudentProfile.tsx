"use client";

import { ArrowLeft, Mail, MessageSquare, X, Send, Activity, Clock, ShieldAlert, CheckCircle2, FileText, BadgeCheck, Phone, BookOpen, Ban, Trash2, Edit3, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InstituteLayout from "../InstituteLayout";

const STUDENT_DB: Record<string, any> = {
  "STU-8921": {
    studentId: "STU-8921",
    name: "Sarah Jenkins",
    initials: "SJ",
    cohort: "11",
    performance: "Excellent",
    performanceColor: "bg-green-100 text-green-700",
    status: "Active",
    statusColor: "bg-green-100 text-green-700 border-green-200",
    highlight: false,
    email: "sarah.j@student.edu",
    phone: "+1 (555) 123-456",
    joinedDate: "Sep 2023",
    gpa: "3.9",
    attendance: "98%",
    bio: "Diligent student with a strong aptitude for algorithm design and data structures. Highly active in study groups and consistently performs well in practical assignments.",
    recentTests: [
      { name: "Midterm Algorithm Design", date: "Oct 15, 2023", score: "95/100", status: "Excellent" },
      { name: "Database Systems Quiz 3", date: "Oct 02, 2023", score: "28/30", status: "Good" },
      { name: "Python Programming Checkpoint", date: "Sep 20, 2023", score: "100/100", status: "Excellent" }
    ]
  },
  "STU-8843": {
    studentId: "STU-8843",
    name: "Marcus Reed",
    initials: "MR",
    cohort: "10",
    performance: "Risk",
    performanceColor: "bg-red-100 text-red-700",
    status: "Suspended",
    statusColor: "bg-red-100 text-red-700 border-red-200 font-bold",
    highlight: false,
    email: "m.reed@student.edu",
    phone: "+1 (555) 987-654",
    joinedDate: "Jan 2023",
    gpa: "2.1",
    attendance: "65%",
    bio: "Currently struggling with course workload and missing frequent assignments. Requires intervention and potentially tutoring support for upcoming modules.",
    recentTests: [
      { name: "Advanced Statistics Midterm", date: "Oct 12, 2023", score: "42/100", status: "Needs Improvement" },
      { name: "Data Visualization Quiz", date: "Sep 28, 2023", score: "12/30", status: "Needs Improvement" },
      { name: "Machine Learning Basics", date: "Sep 10, 2023", score: "65/100", status: "Average" }
    ]
  },
  "STU-9102": {
    studentId: "STU-9102",
    name: "David Chen",
    initials: "DC",
    cohort: "12",
    performance: "Good",
    performanceColor: "bg-blue-100 text-blue-700",
    status: "Inactive",
    statusColor: "bg-gray-100 text-gray-700 border-gray-200",
    highlight: false,
    email: "david.c@student.edu",
    phone: "+1 (555) 456-789",
    joinedDate: "Sep 2023",
    gpa: "3.1",
    attendance: "85%",
    bio: "Solid understanding of core concepts but inconsistent assignment submission. Performs well in group projects but struggles with individual assessments.",
    recentTests: [
      { name: "Midterm Algorithm Design", date: "Oct 15, 2023", score: "75/100", status: "Average" },
      { name: "Database Systems Quiz 3", date: "Oct 02, 2023", score: "25/30", status: "Good" },
      { name: "Python Programming Checkpoint", date: "Sep 20, 2023", score: "70/100", status: "Average" }
    ]
  },
};

export default function StudentProfile() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "STU-8921";
  const student = STUDENT_DB[id] || STUDENT_DB["STU-8921"];

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const [blockUntil, setBlockUntil] = useState("");
  const [currentStudent, setCurrentStudent] = useState(student);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(student);

  const [authAction, setAuthAction] = useState<"block" | "delete" | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  useEffect(() => {
    const freshStudent = STUDENT_DB[id] || STUDENT_DB["STU-8921"];
    setCurrentStudent(freshStudent);
    setEditForm(freshStudent);
  }, [id]);

  const handleConfimation = () => {
    if (!adminPassword) {
      setAuthError("Password is required");
      return;
    }
    setIsProcessingAction(true);

    setTimeout(() => {
      setIsProcessingAction(false);
      if (adminPassword.length > 3) {
        if (authAction === "block") {
          setCurrentStudent({ ...currentStudent, status: "Suspended", statusColor: "bg-red-100 text-red-700 border-red-200 font-bold" });
          setBlockUntil("");
          setAuthAction(null);
          setAdminPassword("");
          setAuthError("");
        } else if (authAction === "delete") {
          router.push("/institute-dashboard/students");
        }
      } else {
        setAuthError("Incorrect password. Try again.");
      }
    }, 800);
  };

  const handleSave = () => {
    setCurrentStudent(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(currentStudent);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMessageModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <InstituteLayout>
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
            <Link href="/institute-dashboard/students" className="shrink-0 p-2.5 bg-white border border-[#c7c4d8]/50 rounded-full hover:bg-[#f2f4f6] text-[#464555] transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#191c1e]">Student Profile</h1>
              <p className="text-sm text-[#464555]">Performance, details, and activity tracking.</p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#c7c4d8]/50 text-[#5654a8] text-sm font-semibold rounded-full hover:bg-[#f2f4f6] transition-colors shadow-sm bg-white cursor-pointer"
            >
              <Edit3 className="w-4 h-4 shrink-0" /> Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-semibold text-[#464555] hover:bg-[#eceef0] rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-[#191c1e] text-[#f7f9fb] text-sm font-semibold rounded-full hover:bg-[#464555] transition-colors shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4 shrink-0" /> Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Hero Section */}
        <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-[#c7c4d8]/40 shadow-sm bg-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#3525cd]/10 via-[#4f46e5]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-6 lg:gap-8 items-start md:items-center">
            <div className="w-28 h-28 rounded-2xl flex items-center justify-center font-bold text-4xl shrink-0 bg-[#f2f4f6] text-[#3525cd] shadow-sm">
              {currentStudent.initials}
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="text-3xl font-bold text-[#191c1e] tracking-tight border-b border-[#c7c4d8]/50 px-1 outline-none focus:border-[#3525cd] bg-transparent"
                      />
                    ) : (
                      <h2 className="text-3xl font-bold text-[#191c1e] tracking-tight">{currentStudent.name}</h2>
                    )}
                    <span className={`px-2 py-0.5 rounded-md text-xs uppercase tracking-wider font-bold whitespace-nowrap ${currentStudent.statusColor}`}>
                      {currentStudent.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <span className="font-semibold text-[#3525cd]">Class: </span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.cohort}
                        onChange={(e) => setEditForm({ ...editForm, cohort: e.target.value })}
                        className="text-sm font-semibold text-[#3525cd] border-b border-[#c7c4d8]/50 px-1 py-0.5 outline-none focus:border-[#3525cd] bg-transparent w-16"
                      />
                    ) : (
                      <span className="font-semibold text-[#3525cd]">{currentStudent.cohort}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => setIsMessageModalOpen(true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#191c1e] text-[#f7f9fb] text-sm font-semibold rounded-full shadow-md hover:bg-[#464555] transition-all hover:shadow-lg cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" /> Message
                  </button>
                  <a href={`mailto:${currentStudent.email}`} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-[#c7c4d8]/60 text-[#191c1e] text-sm font-semibold rounded-full hover:bg-[#f2f4f6] transition-colors shadow-sm">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-[#eceef0]/50">
                <div className="flex items-center gap-2 text-sm text-[#464555]">
                  <BadgeCheck className="w-4.5 h-4.5 text-[#777587] shrink-0" /> ID:
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.studentId}
                      onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                      className="font-semibold text-[#191c1e] border-b border-[#c7c4d8]/50 px-1 outline-none focus:border-[#3525cd] bg-transparent w-24"
                    />
                  ) : (
                    <span className="font-semibold text-[#191c1e]">{currentStudent.studentId}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#464555]">
                  <Mail className="w-4.5 h-4.5 text-[#777587] shrink-0" /> Email:
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="font-semibold text-[#191c1e] border-b border-[#c7c4d8]/50 px-1 outline-none focus:border-[#3525cd] bg-transparent w-48"
                    />
                  ) : (
                    <span className="font-semibold text-[#191c1e]">{currentStudent.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#464555]">
                  <Phone className="w-4.5 h-4.5 text-[#777587] shrink-0" /> Phone:
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="font-semibold text-[#191c1e] border-b border-[#c7c4d8]/50 px-1 outline-none focus:border-[#3525cd] bg-transparent w-32"
                    />
                  ) : (
                    <span className="font-semibold text-[#191c1e]">{currentStudent.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#c7c4d8]/30 bg-gradient-to-br from-white to-[#3525cd]/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#3525cd]" />
                  Performance
                </h3>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span className={`px-4 py-2 rounded-lg text-lg uppercase font-bold tracking-wider inline-block ${currentStudent.performanceColor}`}>
                  {currentStudent.performance}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold text-[#464555]">
                    <span>Attendance</span>
                    <span>{currentStudent.attendance}</span>
                  </div>
                  <div className="w-full h-2 bg-[#f2f4f6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5654a8] rounded-full" style={{ width: currentStudent.attendance }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold text-[#464555]">
                    <span>GPA</span>
                    <span>{currentStudent.gpa}/4.0</span>
                  </div>
                  <div className="w-full h-2 bg-[#f2f4f6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3525cd] rounded-full" style={{ width: `${(parseFloat(currentStudent.gpa) / 4) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#c7c4d8]/30 bg-white">
              <h3 className="font-semibold text-lg mb-3">About Student</h3>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full text-sm text-[#191c1e] leading-relaxed mb-6 p-2 border border-[#eceef0] rounded-lg outline-none focus:border-[#3525cd] bg-[#f7f9fb] min-h-[100px] resize-y"
                />
              ) : (
                <p className="text-sm text-[#464555] leading-relaxed mb-6">
                  {currentStudent.bio}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#c7c4d8]/30 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#5654a8]" />
                  Recent Tests
                </h3>
              </div>

              <div className="space-y-4">
                {currentStudent.recentTests.map((test: any, idx: number) => (
                  <div key={idx} className="p-4 flex items-center justify-between border-b border-[#eceef0] last:border-0 rounded-xl hover:bg-[#f2f4f6]/50 transition-colors bg-white">
                    <div>
                      <h4 className="text-sm font-semibold text-[#191c1e]">{test.name}</h4>
                      <p className="text-xs text-[#464555] mt-1">{test.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#191c1e] block">{test.score}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${test.status === "Excellent" ? "text-green-600" :
                          test.status === "Needs Improvement" ? "text-[#ba1a1a]" :
                            "text-yellow-600"
                        }`}>{test.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#c7c4d8]/30 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#777587]" />
                  Recent Activity
                </h3>
              </div>
              <div className="space-y-6">
                <div className="relative pl-6 pb-2 border-l-2 border-[#eceef0]">
                  <div className="absolute w-3 h-3 bg-[#3525cd] rounded-full -left-[7px] top-1 ring-4 ring-white"></div>
                  <h4 className="text-sm font-semibold mb-1">Submitted Assignment</h4>
                  <p className="text-sm text-[#464555] leading-relaxed">Submitted "Final Project Proposal" for class {currentStudent.cohort}.</p>
                  <span className="text-xs text-[#777587] font-medium mt-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 2 hours ago
                  </span>
                </div>
                <div className="relative pl-6 pb-2 border-l-2 border-[#eceef0]">
                  <div className="absolute w-3 h-3 bg-[#c7c4d8] rounded-full -left-[7px] top-1 ring-4 ring-white"></div>
                  <h4 className="text-sm font-semibold mb-1">Attended Lecture</h4>
                  <p className="text-sm text-[#464555] leading-relaxed">Joined "Introduction to Data Science" via video conferencing link.</p>
                  <span className="text-xs text-[#777587] font-medium mt-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Yesterday
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions Section */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-red-200 bg-red-50/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-red-100 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <h3 className="font-semibold text-lg text-red-700 mb-1 flex items-center gap-2 relative z-10">
            <ShieldAlert className="w-5 h-5" /> Account Actions
          </h3>
          <p className="text-sm text-[#464555] mb-6 relative z-10">Manage access and permanence of this user's profile on the platform.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Blocking */}
            <div className="p-5 rounded-2xl bg-white border border-red-100 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                  <Ban className="w-4 h-4 text-orange-500" /> Restrict Access
                </h4>
                <p className="text-xs text-[#464555] mb-4">Temporarily block this user from accessing the platform. Set a date and time for the block to expire.</p>

                <div className="space-y-3 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider block">Block Until</label>
                    <input
                      type="datetime-local"
                      value={blockUntil}
                      onChange={(e) => setBlockUntil(e.target.value)}
                      className="w-full bg-[#f7f9fb] border border-[#c7c4d8]/60 rounded-xl px-4 py-2.5 text-sm focus:border-orange-500/50 outline-none transition-all cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={!blockUntil}
                onClick={() => setAuthAction("block")}
                className="w-full py-2.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold hover:bg-orange-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
              >
                <Ban className="w-4 h-4" />
                Block Access
              </button>
            </div>

            {/* Permanent Removal */}
            <div className="p-5 rounded-2xl bg-white border border-red-100 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-2 mb-2 text-red-700">
                  <Trash2 className="w-4 h-4" /> Delete Account
                </h4>
                <p className="text-xs text-[#464555] mb-4">Permanently remove this user and all associated data from the platform. This action is irreversible.</p>
              </div>

              <button
                onClick={() => setAuthAction("delete")}
                className="w-full py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Remove Permanently
              </button>
            </div>
          </div>
        </div>

        {/* Auth Confirmation Modal */}
        {authAction && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#f7f9fb] w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#e6e8ea]">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  {authAction === "block" ? "Confirm Block Access" : "Confirm Deletion"}
                </h3>
                <button
                  onClick={() => {
                    setAuthAction(null);
                    setAdminPassword("");
                    setAuthError("");
                  }}
                  className="p-2 text-[#464555] hover:text-[#191c1e] hover:bg-[#f2f4f6] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-sm text-[#464555] mb-4">
                  Please enter your administrator password to confirm this action. This is required for security purposes.
                </p>

                <div className="space-y-1.5 mb-4">
                  <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider block">Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setAuthError("");
                    }}
                    className="w-full bg-white border border-[#c7c4d8]/60 rounded-xl px-4 py-3 text-sm focus:border-[#3525cd]/50 outline-none transition-all"
                    placeholder="Enter your password"
                  />
                  {authError && <p className="text-xs text-red-600 mt-1">{authError}</p>}
                </div>

                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => {
                      setAuthAction(null);
                      setAdminPassword("");
                      setAuthError("");
                    }}
                    className="px-4 py-2 rounded-full border border-[#c7c4d8] text-sm font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfimation}
                    disabled={isProcessingAction || !adminPassword}
                    className="px-5 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                  >
                    {isProcessingAction ? "Verifying..." : "Confirm Action"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {isMessageModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-[#c7c4d8]/30">
              <div className="px-6 py-5 border-b border-[#e6e8ea] flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-semibold text-lg text-[#191c1e]">Message {currentStudent.name}</h3>
                  <p className="text-xs text-[#464555] mt-0.5">Send a direct message via student portal.</p>
                </div>
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="p-2 text-[#464555] hover:bg-[#f2f4f6] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-white">
                <label className="block text-sm font-semibold text-[#191c1e] mb-2">Your Message</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  autoFocus
                  className="w-full h-32 p-4 bg-[#f7f9fb] border border-[#e6e8ea] rounded-xl text-sm text-[#191c1e] focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] outline-none resize-none transition-all placeholder:text-[#777587]/70"
                ></textarea>
              </div>

              <div className="px-6 py-4 border-t border-[#e6e8ea] flex items-center justify-between gap-3 bg-white">
                <p className="text-xs text-[#464555] hidden sm:block">
                  Press <kbd className="px-1.5 py-0.5 bg-[#f2f4f6] rounded border border-[#e6e8ea] font-sans shadow-sm font-semibold text-[10px]">Esc</kbd> to cancel
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsMessageModalOpen(false)}
                    className="flex-1 sm:flex-none px-5 py-2 text-sm font-semibold text-[#464555] hover:bg-[#f2f4f6] hover:text-[#191c1e] rounded-full transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsMessageModalOpen(false);
                      setMessageText("");
                    }}
                    className="flex-1 sm:flex-none px-6 py-2 bg-[#3525cd] text-white text-sm font-semibold rounded-full hover:bg-[#4f46e5] flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    disabled={!messageText.trim()}
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstituteLayout>
  );
}
