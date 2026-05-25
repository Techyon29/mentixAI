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
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const BackgroundOrbs = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E0EFFF] to-[#C9E0FC] blur-[100px] opacity-70" />
    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E8F3FF] to-[#D4E8FF] blur-[80px] opacity-60" />
    <div className="absolute bottom-[-10%] right-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E6F0F9] to-[#CCE3FA] blur-[120px] opacity-80" />
  </div>
);

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
    Completed: "bg-slate-50 text-slate-500 border-slate-200",
    Scheduled: "bg-amber-50 text-amber-600 border-amber-100",
    Archived: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-lg text-[11.5px] font-bold border ${styles[status as keyof typeof styles]}`}
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
  const itemsPerPage = 8;

  const [filters, setFilters] = useState({
    class: "All",
    status: "All",
    minScore: "",
    date: "",
  });

  const tabs = [
    { label: "All", count: testData.length },
    {
      label: "Live",
      count: testData.filter((t) => t.status === "Live").length,
    },
    {
      label: "Draft",
      count: testData.filter((t) => t.status === "Draft").length,
    },
    {
      label: "Completed",
      count: testData.filter((t) => t.status === "Completed").length,
    },
    {
      label: "Archived",
      count: testData.filter((t) => t.status === "Archived").length,
    },
  ];

  const filteredTests = testData.filter((test) => {
    const matchesTab = activeTab === "All" || test.status === activeTab;
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      filters.class === "All" || test.class === filters.class;
    const matchesStatus =
      filters.status === "All" || test.status === filters.status;
    const matchesScore =
      filters.minScore === "" ||
      (test.avgScore !== null && test.avgScore >= parseInt(filters.minScore));
    const matchesDate = filters.date === "" || test.date.includes(filters.date);

    return (
      matchesTab &&
      matchesSearch &&
      matchesClass &&
      matchesStatus &&
      matchesScore
    );
  });

  // Pagination Logic
  const totalItems = filteredTests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTests = filteredTests.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ class: "All", status: "All", minScore: "", date: "" });
    setActiveTab("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F0F5FA] overflow-hidden font-sans text-slate-800">
      <BackgroundOrbs />

      <div className="relative z-10 flex h-screen p-4 gap-6">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <Navbar />

          {/* Header Section */}
          <section className="mb-8 px-2 mt-2 flex justify-between items-end">
            <div>
              <h1 className="text-[32px] font-bold text-[#0D245B] tracking-tight mb-1">
                All Tests
              </h1>
              <p className="text-[#5B779E] text-[15px] font-medium">
                View and manage all your assessments.
              </p>
            </div>
            <Link
              href="/mentor-dashboard/create-test"
              className="py-3 px-6 rounded-2xl bg-blue-600 text-white font-bold text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Create Test
            </Link>
          </section>

          {/* Search & Tabs Section */}
          <section className="px-2 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search assessments..."
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
                    ? "bg-[#0D245B] text-white border-[#0D245B]"
                    : "bg-white text-[#0D245B] border-slate-200 hover:bg-slate-50"
                }`}
              >
                <SlidersHorizontal
                  className={`w-4 h-4 ${showFilters ? "text-white" : "text-blue-500"}`}
                />{" "}
                Filter
              </button>
            </div>

            {/* Expandable Filter Section */}
            {showFilters && (
              <div className="mb-8 p-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-[28px] animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12.5px] font-bold text-[#0D245B] px-1">
                      Class
                    </label>
                    <div className="relative">
                      <select
                        value={filters.class}
                        onChange={(e) =>
                          handleFilterChange({
                            ...filters,
                            class: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] font-medium text-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
                      >
                        <option value="All">All Classes</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12.5px] font-bold text-[#0D245B] px-1">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        value={filters.status}
                        onChange={(e) => {
                          setFilters({ ...filters, status: e.target.value });
                          setActiveTab(e.target.value); // Keep tabs in sync
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] font-medium text-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
                      >
                        <option value="All">All Status</option>
                        <option value="Live">Live</option>
                        <option value="Draft">Draft</option>
                        <option value="Completed">Completed</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Archived">Archived</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12.5px] font-bold text-[#0D245B] px-1">
                      Min Avg Score
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 50"
                      value={filters.minScore}
                      onChange={(e) =>
                        handleFilterChange({
                          ...filters,
                          minScore: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#0D245B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12.5px] font-bold text-[#0D245B] px-1">
                      Test Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={filters.date}
                        onChange={(e) =>
                          handleFilterChange({
                            ...filters,
                            date: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#0D245B] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2 rounded-xl text-[13.5px] font-bold text-slate-500 hover:bg-white transition-all"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-6 py-2 bg-[#0D245B] text-white rounded-xl text-[13.5px] font-bold shadow-md hover:bg-slate-900 transition-all active:scale-95"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-slate-200/60 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => handleTabChange(tab.label)}
                  className={`pb-4 text-[14.5px] font-bold transition-all relative ${
                    activeTab === tab.label
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab.label} ({tab.count})
                  {activeTab === tab.label && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in duration-300" />
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
                    <th className="text-left py-5 px-8 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                      Test Title
                    </th>
                    <th className="text-left py-5 px-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="text-left py-5 px-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider text-center">
                      Avg Score
                    </th>
                    <th className="text-left py-5 px-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-5 px-8 text-[13px] font-bold text-slate-400 uppercase tracking-wider text-right">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginatedTests.map((test) => {
                    const Icon = test.icon;
                    return (
                      <tr
                        key={test.id}
                        className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                      >
                        <td className="py-5 px-8">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-xl ${test.bgColor} flex items-center justify-center shadow-sm`}
                            >
                              <Icon className={`w-5 h-5 ${test.iconColor}`} />
                            </div>
                            <div>
                              <h4 className="text-[15px] font-bold text-[#0D245B] group-hover:text-blue-600 transition-colors">
                                {test.title}
                              </h4>
                              <p className="text-[12px] text-[#5B779E] font-medium">
                                {test.subject}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <span className="text-[14px] font-bold text-[#5B779E]">
                            {test.class}
                          </span>
                        </td>
                        <td className="py-5 px-4">
                          <div className="flex flex-col items-center">
                            <span className="text-[15px] font-bold text-[#0D245B]">
                              {test.avgScore !== null ? test.avgScore : "-"}
                            </span>
                            {test.avgPercent && (
                              <span className="text-[11px] font-bold text-blue-500 bg-blue-50 px-1.5 rounded">
                                {test.avgPercent}%
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <StatusBadge status={test.status} />
                        </td>
                        <td className="py-5 px-8 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <span className="text-[13.5px] font-medium text-slate-500">
                              {test.date}
                            </span>
                            <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredTests.length === 0 && (
                <div className="py-20 text-center">
                  <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium text-[15px]">
                    No assessments found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 px-4">
              <p className="text-[13.5px] font-medium text-slate-500">
                Showing{" "}
                <span className="text-[#0D245B] font-bold">
                  {totalItems === 0 ? 0 : startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{" "}
                of{" "}
                <span className="text-[#0D245B] font-bold">{totalItems}</span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-all disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
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
                    ),
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-all disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
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
