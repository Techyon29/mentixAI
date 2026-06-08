"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Users, Target, Search, MessageSquare, ExternalLink } from "lucide-react";
import InstituteLayout from "../InstituteLayout";

const ASSESSMENT_DB: Record<string, any> = {
  "ASM-9921": {
    id: "ASM-9921",
    name: "CS201 Data Structures Midterm",
    class: "11",
    dept: "Computer Science",
    status: "Live",
    date: "Oct 15, 2023",
    time: "10:00 AM - 11:30 AM",
    duration: "90 minutes",
    mentor: {
      name: "Dr. Alan Turing",
      email: "alan.turing@university.edu",
      role: "Head of Computer Science"
    },
    stats: {
      totalStudents: 350,
      attempted: 342,
      averageScore: null,
      highestScore: null
    },
    students: [
      { id: "STU-8921", name: "Sarah Jenkins", score: null, status: "In Progress", submittedAt: "--" },
      { id: "STU-9102", name: "David Chen", score: null, status: "In Progress", submittedAt: "--" },
      { id: "STU-8843", name: "Marcus Reed", score: null, status: "Waiting", submittedAt: "--" },
    ]
  },
  "ASM-9920": {
    id: "ASM-9920",
    name: "Bio 101 Quiz 3",
    class: "10",
    dept: "Biology",
    status: "Completed",
    date: "Oct 10, 2023",
    time: "02:00 PM - 02:45 PM",
    duration: "45 minutes",
    mentor: {
      name: "Dr. Rosalind Franklin",
      email: "r.franklin@university.edu",
      role: "Senior Biology Lecturer"
    },
    stats: {
      totalStudents: 120,
      attempted: 120,
      averageScore: 82,
      highestScore: 100
    },
    students: [
      { id: "STU-1122", name: "Emma Watson", score: 92, status: "Completed", submittedAt: "02:30 PM" },
      { id: "STU-3344", name: "John Doe", score: 88, status: "Completed", submittedAt: "02:40 PM" },
    ]
  },
  "ASM-9922": {
    id: "ASM-9922",
    name: "Advanced Calculus Final",
    class: "12",
    dept: "Mathematics",
    status: "Upcoming",
    date: "Oct 20, 2023",
    time: "09:00 AM - 12:00 PM",
    duration: "180 minutes",
    mentor: {
      name: "Dr. Katherine Johnson",
      email: "k.johnson@university.edu",
      role: "Professor of Mathematics"
    },
    stats: {
      totalStudents: 150,
      attempted: 0,
      averageScore: null,
      highestScore: null
    },
    students: [
      { id: "STU-4455", name: "Alice Smith", score: null, status: "Enrolled", submittedAt: "--" },
      { id: "STU-6677", name: "Bob Jones", score: null, status: "Enrolled", submittedAt: "--" },
    ]
  }
};

export default function AssessmentDetails() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "ASM-9921";
  
  const [assessment, setAssessment] = useState(ASSESSMENT_DB[id] || ASSESSMENT_DB["ASM-9921"]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setAssessment(ASSESSMENT_DB[id] || ASSESSMENT_DB["ASM-9921"]);
  }, [id]);

  const filteredStudents = assessment.students.filter((s: any) => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <InstituteLayout>
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            <Link href="/institute-dashboard/assessments" className="p-2.5 bg-white border border-[#c7c4d8]/50 rounded-full hover:bg-[#f2f4f6] text-[#464555] transition-colors shadow-sm shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1e] tracking-tight">{assessment.name}</h1>
                <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${
                  assessment.status === "Live" ? "bg-[#3525cd]/10 text-[#3525cd]" : 
                  assessment.status === "Completed" ? "bg-gray-100 text-gray-700" : "bg-gray-50 text-gray-400"
                }`}>
                  {assessment.status === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3525cd] animate-pulse mr-1.5"></span>}
                  {assessment.status}
                </span>
              </div>
              <p className="text-[#464555] text-sm font-medium mt-1">
                ID: {assessment.id} <span className="mx-1.5 text-[#777587]">•</span> Class {assessment.class} <span className="mx-1.5 text-[#777587]">•</span> {assessment.dept}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Details & Mentor */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl p-6 bg-white border border-[#c7c4d8]/30 shadow-sm">
              <h2 className="text-sm font-bold text-[#191c1e] uppercase tracking-wider mb-4">Assessment Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#464555] shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#464555] font-medium uppercase tracking-wide">Date</p>
                    <p className="text-sm font-semibold text-[#191c1e]">{assessment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#464555] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#464555] font-medium uppercase tracking-wide">Time & Duration</p>
                    <p className="text-sm font-semibold text-[#191c1e]">{assessment.time} ({assessment.duration})</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-white to-[#3525cd]/5 border border-[#c7c4d8]/30 shadow-sm">
              <h2 className="text-sm font-bold text-[#191c1e] uppercase tracking-wider mb-4">Mentor in Charge</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#3525cd]/20 text-[#3525cd] flex items-center justify-center font-bold text-lg shrink-0">
                  {assessment.mentor.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-bold text-[#191c1e]">{assessment.mentor.name}</p>
                  <p className="text-xs text-[#464555] font-medium mt-0.5">{assessment.mentor.role}</p>
                  <p className="text-xs text-[#3525cd] font-medium mt-1 hover:underline cursor-pointer">{assessment.mentor.email}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 bg-white border border-[#c7c4d8]/30 shadow-sm">
              <h2 className="text-sm font-bold text-[#191c1e] uppercase tracking-wider mb-4">Performance Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#e6e8ea]">
                  <div className="flex items-center gap-2 text-[#464555] mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-semibold">{assessment.status === "Upcoming" ? "Enrolled" : "Attempt Rate"}</span>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-[#191c1e]">{assessment.status === "Upcoming" ? assessment.stats.totalStudents : assessment.stats.attempted}</span>
                    {assessment.status !== "Upcoming" && (
                      <span className="text-sm text-[#777587] font-medium mb-0.5">/ {assessment.stats.totalStudents}</span>
                    )}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#e6e8ea]">
                  <div className="flex items-center gap-2 text-[#464555] mb-1">
                    <Target className="w-4 h-4" />
                    <span className="text-xs font-semibold">Avg Score</span>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-[#191c1e]">{assessment.stats.averageScore !== null ? `${assessment.stats.averageScore}%` : "--"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Students List */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl h-full flex flex-col bg-white border border-[#c7c4d8]/30 shadow-sm">
              <div className="p-5 border-b border-[#e6e8ea] flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50">
                <h2 className="text-sm font-bold text-[#191c1e] uppercase tracking-wider">
                  {assessment.status === "Upcoming" ? "Enrolled Students" : "Student Results"}
                </h2>
                <div className="relative max-w-sm w-full sm:w-auto">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777587]" />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#f2f4f6] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none" 
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white border-b border-[#e6e8ea] text-xs uppercase tracking-wider text-[#464555]">
                      <th className="p-4 pl-6 font-semibold">Student</th>
                      <th className="p-4 font-semibold">Status</th>
                      {assessment.status !== "Upcoming" && <th className="p-4 font-semibold">Score</th>}
                      <th className="p-4 font-semibold text-right pr-6">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6e8ea] bg-white">
                    {filteredStudents.map((student: any) => (
                      <tr key={student.id} className="hover:bg-[#f2f4f6]/40 transition-colors group">
                        <td className="p-4 pl-6">
                          <div>
                            <p 
                              className="font-semibold text-sm text-[#191c1e] hover:text-[#3525cd] cursor-pointer transition-colors"
                              onClick={() => router.push(`/institute-dashboard/students/${student.id}`)}
                            >
                              {student.name}
                            </p>
                            <p className="text-xs text-[#777587] font-medium">{student.id}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                            student.status === "Completed" ? "bg-green-100 text-green-700" : 
                            student.status === "In Progress" ? "bg-[#3525cd]/10 text-[#3525cd]" : 
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {student.status}
                          </span>
                          {student.status === "Completed" && (
                            <div className="text-[10px] text-[#777587] font-medium mt-1">at {student.submittedAt}</div>
                          )}
                        </td>
                        {assessment.status !== "Upcoming" && (
                          <td className="p-4 font-semibold">
                            {student.score !== null ? (
                              <span className={`${student.score >= 90 ? "text-green-600" : student.score >= 70 ? "text-[#3525cd]" : "text-[#ba1a1a]"}`}>
                                {student.score}%
                              </span>
                            ) : (
                              <span className="text-[#777587]">--</span>
                            )}
                          </td>
                        )}
                        <td className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              title="Direct Message"
                              className="p-1.5 text-[#464555] hover:text-[#3525cd] hover:bg-[#3525cd]/10 rounded-md transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button 
                              title="View Profile"
                              onClick={() => router.push(`/institute-dashboard/students/${student.id}`)}
                              className="p-1.5 text-[#464555] hover:text-[#3525cd] hover:bg-[#3525cd]/10 rounded-md transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-[#777587]">
                          No students found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstituteLayout>
  );
}
