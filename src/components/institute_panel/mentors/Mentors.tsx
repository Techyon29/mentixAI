"use client";

import { Search, Plus, ShieldCheck, ShieldAlert, MoreVertical, Eye, Trash2, ArrowUpDown, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import InstituteLayout from "../InstituteLayout";

const mentorsData = [
  { id: 1, name: "Dr. Julian Reed", initials: "JR", date: "Aug 2021", department: "Computer Science", classes: ["9", "10", "11", "12"], students: "24/30", rating: 4.9, status: "Active", verified: true, color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Sarah Chen", initials: "SC", date: "Jan 2023", department: "Design", classes: ["9", "10"], students: "19/20", rating: 4.8, status: "At Capacity", verified: true, color: "bg-orange-100 text-orange-700" },
  { id: 3, name: "Marcus King", initials: "MK", date: "Mar 2023", department: "Mathematics", classes: ["11", "12"], students: "12/30", rating: 4.5, status: "Active", verified: false, color: "bg-green-100 text-green-700" },
];

export default function Mentors() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Name (A-Z)");

  const toggleDropdown = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Initials", "Date Joined", "Department", "Classes", "Students", "Rating", "Status", "Verified"];
    const rows = mentorsData.map(m => [
      m.id,
      `"${m.name}"`,
      m.initials,
      `"${m.date}"`,
      `"${m.department}"`,
      `"${m.classes.join(", ")}"`,
      `"${m.students}"`,
      m.rating,
      m.status,
      m.verified ? "Yes" : "No"
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "mentors_roster.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMentors = useMemo(() => {
    let result = [...mentorsData];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.department.toLowerCase().includes(q)
      );
    }
    
    if (selectedClass !== "All") {
      result = result.filter(m => m.classes.includes(selectedClass));
    }
    
    if (selectedDepartment !== "All") {
      result = result.filter(m => m.department === selectedDepartment);
    }
    
    if (selectedStatus !== "All") {
      result = result.filter(m => m.status === selectedStatus);
    }
    
    if (sortBy === "Name (A-Z)") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Name (Z-A)") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "Rating (High to Low)") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedClass, selectedDepartment, selectedStatus, sortBy]);

  const allClasses = Array.from(new Set(mentorsData.flatMap(m => m.classes))).sort((a, b) => parseInt(a) - parseInt(b));
  const allDepartments = Array.from(new Set(mentorsData.map(m => m.department))).sort();
  const allStatuses = Array.from(new Set(mentorsData.map(m => m.status))).sort();

  return (
    <InstituteLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#191c1e]">Mentor Roster</h1>
            <p className="text-[#464555] mt-1 text-sm">Manage, evaluate, and assign mentors within the institute.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={exportToCSV}
              className="whitespace-nowrap px-4 py-2 border border-[#c7c4d8]/50 text-[#5654a8] text-sm font-semibold rounded-full hover:bg-[#f2f4f6] transition-colors shadow-sm flex items-center gap-2 cursor-pointer bg-white"
            >
              <Download className="shrink-0 w-4 h-4" /> Export CSV
            </button>
            <Link href="/institute-dashboard/mentors/add" className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all ai-glow flex items-center gap-2">
              <Plus className="shrink-0 w-4 h-4" /> Add Mentor
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden w-full bg-white">
          <div className="p-4 border-b border-[#e6e8ea] flex flex-col md:flex-row justify-between items-center bg-white/50 gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777587]" />
              <input 
                type="text" 
                placeholder="Search mentors..." 
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
                   value={selectedDepartment} 
                   onChange={(e) => setSelectedDepartment(e.target.value)}
                   className="bg-transparent text-sm text-[#191c1e] outline-none border-none font-medium cursor-pointer"
                 >
                   <option value="All">All</option>
                   {allDepartments.map(d => <option key={d} value={d}>{d}</option>)}
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
                   <option value="Rating (High to Low)">Rating (High to Low)</option>
                 </select>
               </div>
            </div>
          </div>
          
          <div className="overflow-x-auto w-full min-h-[400px]">
            <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#e6e8ea] text-xs uppercase tracking-wider text-[#464555]">
                <th className="p-4 pl-6 font-semibold">Mentor</th>
                <th className="p-4 font-semibold">Department</th>
                <th className="p-4 font-semibold">Classes</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 pr-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e8ea] relative bg-white">
              {filteredMentors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#464555]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-[#f2f4f6] rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-[#777587]" />
                      </div>
                      <p className="text-lg font-semibold">No mentors found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredMentors.map((mentor) => (
                <tr 
                  key={mentor.id} 
                  className="hover:bg-[#f2f4f6]/40 transition-colors cursor-pointer group"
                  onClick={() => router.push(`/institute-dashboard/mentors/${mentor.id}`)}
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${mentor.color}`}>
                        {mentor.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-sm text-[#191c1e] group-hover:text-[#3525cd] transition-colors">{mentor.name}</p>
                          {mentor.verified ? (
                            <ShieldCheck className="w-4 h-4 text-green-600" aria-label="Verified" />
                          ) : (
                            <ShieldAlert className="w-4 h-4 text-orange-500" aria-label="Unverified" />
                          )}
                        </div>
                        <p className="text-xs text-[#777587]">Joined {mentor.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm whitespace-nowrap">{mentor.department}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {mentor.classes.map(cls => (
                        <span key={cls} className="px-2 py-1 bg-[#eceef0] rounded-md text-[10px] uppercase font-bold text-[#464555] tracking-widest whitespace-nowrap">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold whitespace-nowrap ${
                      mentor.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {mentor.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right relative">
                    <button 
                      onClick={(e) => toggleDropdown(e, mentor.id)}
                      className="p-2 text-[#777587] hover:text-[#3525cd] rounded-full hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {activeDropdown === mentor.id && (
                      <div 
                        className="absolute right-8 top-10 bg-white rounded-xl shadow-lg border border-[#e6e8ea] py-2 min-w-[160px] z-50 animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button onClick={() => router.push(`/institute-dashboard/mentors/${mentor.id}`)} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#464555] hover:bg-[#f2f4f6] hover:text-[#191c1e] transition-colors cursor-pointer">
                          <Eye className="w-4 h-4 shrink-0" />
                          View
                        </button>
                        <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#ba1a1a] hover:bg-[#ba1a1a]/10 transition-colors font-medium cursor-pointer">
                          <Trash2 className="w-4 h-4 shrink-0" />
                          Delete Mentor
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
