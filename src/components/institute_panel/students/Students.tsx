"use client";

import { Search, Plus, MoreVertical, Eye, Trash2, ArrowUpDown, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import InstituteLayout from "../InstituteLayout";

const studentsData = [
  { id: "STU-8921", name: "Sarah Jenkins", initials: "SJ", cohort: "11", performance: "Excellent", performanceColor: "bg-green-100 text-green-700", status: "Active", statusColor: "bg-green-100 text-green-700 border-green-200", highlight: false },
  { id: "STU-8843", name: "Marcus Reed", initials: "MR", cohort: "10", performance: "Risk", performanceColor: "bg-red-100 text-red-700", status: "Suspended", statusColor: "bg-red-100 text-red-700 border-red-200 font-bold", highlight: false },
  { id: "STU-9102", name: "David Chen", initials: "DC", cohort: "12", performance: "Good", performanceColor: "bg-blue-100 text-blue-700", status: "Inactive", statusColor: "bg-gray-100 text-gray-700 border-gray-200", highlight: false },
];

export default function Students() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("All");
  const [selectedPerformance, setSelectedPerformance] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Name (A-Z)");

  const toggleDropdown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Class", "Performance", "Status"];
    const rows = studentsData.map(s => [
      s.id,
      `"${s.name}"`,
      `"${s.cohort}"`,
      s.performance,
      s.status
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "students_directory.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = useMemo(() => {
    let result = [...studentsData];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.id.toLowerCase().includes(q)
      );
    }
    
    if (selectedCohort !== "All") {
      result = result.filter(s => s.cohort === selectedCohort);
    }
    
    if (selectedPerformance !== "All") {
      result = result.filter(s => s.performance === selectedPerformance);
    }
    
    if (selectedStatus !== "All") {
      result = result.filter(s => s.status === selectedStatus);
    }
    
    if (sortBy === "Name (A-Z)") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Name (Z-A)") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "Performance (High to Low)") {
      const weight = { "Excellent": 4, "Good": 3, "Avg": 2, "Risk": 1 } as Record<string, number>;
      result.sort((a, b) => (weight[b.performance] || 0) - (weight[a.performance] || 0));
    } else if (sortBy === "Performance (Low to High)") {
      const weight = { "Excellent": 4, "Good": 3, "Avg": 2, "Risk": 1 } as Record<string, number>;
      result.sort((a, b) => (weight[a.performance] || 0) - (weight[b.performance] || 0));
    }

    return result;
  }, [searchQuery, selectedCohort, selectedPerformance, selectedStatus, sortBy]);

  const allCohorts = Array.from(new Set(studentsData.map(s => s.cohort))).sort();
  const allPerformances = Array.from(new Set(studentsData.map(s => s.performance))).sort();
  const allStatuses = Array.from(new Set(studentsData.map(s => s.status))).sort();

  return (
    <InstituteLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#191c1e]">Student Directory</h1>
            <p className="text-[#464555] mt-1 text-sm">Manage student profiles, track engagement, and review risk assessments.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={exportToCSV}
              className="whitespace-nowrap px-4 py-2 border border-[#c7c4d8]/50 text-[#5654a8] text-sm font-semibold rounded-full hover:bg-[#f2f4f6] transition-colors shadow-sm flex items-center gap-2 cursor-pointer bg-white"
            >
              <Download className="shrink-0 w-4 h-4" /> Export CSV
            </button>
            <Link href="/institute-dashboard/students/add" className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all ai-glow flex items-center gap-2 shadow-sm shadow-[#3525cd]/20">
              <Plus className="shrink-0 w-4 h-4" /> Add Student
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden w-full bg-white">
          <div className="p-4 border-b border-[#e6e8ea] flex flex-col md:flex-row justify-between items-center bg-white/50 gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777587]" />
              <input 
                type="text" 
                placeholder="Search by name, email, or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#f2f4f6] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none" 
              />
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
               <div className="flex items-center gap-2 bg-white border border-[#e6e8ea] rounded-lg px-3 py-1.5 shrink-0">
                 <span className="text-xs font-semibold text-[#464555]">Class:</span>
                 <select 
                   value={selectedCohort} 
                   onChange={(e) => setSelectedCohort(e.target.value)}
                   className="bg-transparent text-sm text-[#191c1e] outline-none border-none font-medium cursor-pointer"
                 >
                   <option value="All">All</option>
                   {allCohorts.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
               </div>

               <div className="flex items-center gap-2 bg-white border border-[#e6e8ea] rounded-lg px-3 py-1.5 shrink-0">
                 <span className="text-xs font-semibold text-[#464555]">Performance:</span>
                 <select 
                   value={selectedPerformance} 
                   onChange={(e) => setSelectedPerformance(e.target.value)}
                   className="bg-transparent text-sm text-[#191c1e] outline-none border-none font-medium cursor-pointer"
                 >
                   <option value="All">All</option>
                   {allPerformances.map(s => <option key={s} value={s}>{s}</option>)}
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
               
               <div className="flex items-center gap-2 bg-white border border-[#e6e8ea] rounded-lg px-3 py-1.5 shrink-0">
                 <ArrowUpDown className="w-3.5 h-3.5 text-[#464555]" />
                 <select 
                   value={sortBy} 
                   onChange={(e) => setSortBy(e.target.value)}
                   className="bg-transparent text-sm text-[#191c1e] outline-none border-none font-medium cursor-pointer"
                 >
                   <option value="Name (A-Z)">Name (A-Z)</option>
                   <option value="Name (Z-A)">Name (Z-A)</option>
                   <option value="Performance (High to Low)">Performance (High to Low)</option>
                   <option value="Performance (Low to High)">Performance (Low to High)</option>
                 </select>
               </div>
            </div>
          </div>
          
          <div className="overflow-x-auto w-full min-h-[400px]">
            <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#e6e8ea] text-xs uppercase tracking-wider text-[#464555]">
                <th className="p-4 pl-6 font-semibold">Student</th>
                <th className="p-4 font-semibold">Class</th>
                <th className="p-4 font-semibold">Performance</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 pr-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e8ea] relative bg-white">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#464555]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-[#777587]" />
                      </div>
                      <p className="text-lg font-semibold">No students found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.map((student) => (
                <tr 
                  key={student.id} 
                  className={`group cursor-pointer transition-colors border-l-4 ${student.highlight ? "bg-red-50/20 border-l-red-500 hover:bg-[#f2f4f6]/20" : "hover:bg-[#f2f4f6]/40 border-l-transparent"}`}
                  onClick={() => router.push(`/institute-dashboard/students/${student.id}`)}
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f2f4f6] text-[#464555] flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-[#3525cd]/10 group-hover:text-[#3525cd] transition-colors">
                        {student.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#191c1e] flex items-center gap-1 group-hover:text-[#3525cd] transition-colors">
                          {student.name}
                          {student.highlight && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-1 inline-block"></span>}
                        </p>
                        <p className="text-xs text-[#777587]">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium">{student.cohort}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider inline-block ${student.performanceColor}`}>
                      {student.performance}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border tracking-wider inline-block ${student.statusColor}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right relative">
                    <button 
                      onClick={(e) => toggleDropdown(e, student.id)}
                      className="p-2 text-[#777587] hover:text-[#3525cd] rounded-full hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {activeDropdown === student.id && (
                      <div 
                        className="absolute right-8 top-10 bg-white rounded-xl shadow-lg border border-[#e6e8ea] py-2 min-w-[160px] z-50 animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button onClick={() => router.push(`/institute-dashboard/students/${student.id}`)} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#464555] hover:bg-[#f2f4f6] hover:text-[#191c1e] transition-colors cursor-pointer">
                          <Eye className="w-4 h-4 shrink-0" />
                          View Account
                        </button>
                        <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium cursor-pointer">
                          <Trash2 className="w-4 h-4 shrink-0" />
                          Remove Student
                        </button>
                      </div>
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
