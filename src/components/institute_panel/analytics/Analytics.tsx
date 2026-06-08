"use client";

import React, { useState, useRef, useMemo, ChangeEvent } from "react";
import {
  Users,
  UserCheck,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  ChevronDown,
  Download,
  Filter,
  Calendar,
  BookOpen,
  Target,
  GraduationCap,
  Upload,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";
import InstituteLayout from "../InstituteLayout";

interface ClassData {
  name: string;
  students: number;
  avgScore: string;
  compRate: string;
  att: string;
}

export default function Analytics() {
  const [isExporting, setIsExporting] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dateRange, setDateRange] = useState("All Time");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const [filterClass, setFilterClass] = useState("All Classes");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const [classData, setClassData] = useState<ClassData[]>([
    {
      name: "Class 12",
      students: 340,
      avgScore: "81%",
      compRate: "96%",
      att: "92%",
    },
    {
      name: "Class 11",
      students: 295,
      avgScore: "76%",
      compRate: "92%",
      att: "88%",
    },
    {
      name: "Class 10",
      students: 310,
      avgScore: "79%",
      compRate: "94%",
      att: "90%",
    },
    {
      name: "Class 9",
      students: 303,
      avgScore: "74%",
      compRate: "89%",
      att: "86%",
    },
  ]);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof ClassData;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof ClassData) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map((row: any) => ({
            name: row["Class"] || "Unknown",
            students: parseInt(row["Students"]) || 0,
            avgScore: row["Average Score"] || "0%",
            compRate: row["Completion Rate"] || "0%",
            att: row["Attendance"] || "0%",
          }));
          setClassData(parsedData);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          alert("Failed to parse CSV file.");
        },
      });
    }
  };

  const handleExportPDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    try {
      setIsExporting(true);

      // Add a slight delay to ensure rendering is complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(input, {
        scale: 2, // Higher scale for better resolution
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      // First page
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages if content overflows
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Mentix_Analytics_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const filteredClassData = classData.filter(
    (cls) => filterClass === "All Classes" || cls.name === filterClass,
  );

  const sortedClassData = useMemo(() => {
    let sortableItems = [...filteredClassData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        let aCmp =
          typeof aVal === "string" && aVal.endsWith("%")
            ? parseFloat(aVal)
            : aVal;
        let bCmp =
          typeof bVal === "string" && bVal.endsWith("%")
            ? parseFloat(bVal)
            : bVal;

        if (aCmp < bCmp) return sortConfig.direction === "asc" ? -1 : 1;
        if (aCmp > bCmp) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredClassData, sortConfig]);

  const totalStudents = filteredClassData.reduce(
    (acc, curr) => acc + curr.students,
    0,
  );
  const avgScore =
    filteredClassData.length > 0
      ? (
          filteredClassData.reduce(
            (acc, curr) => acc + parseFloat(curr.avgScore),
            0,
          ) / filteredClassData.length
        ).toFixed(1) + "%"
      : "0%";
  const compRate =
    filteredClassData.length > 0
      ? (
          filteredClassData.reduce(
            (acc, curr) => acc + parseFloat(curr.compRate),
            0,
          ) / filteredClassData.length
        ).toFixed(1) + "%"
      : "0%";
  const attRate =
    filteredClassData.length > 0
      ? (
          filteredClassData.reduce(
            (acc, curr) => acc + parseFloat(curr.att),
            0,
          ) / filteredClassData.length
        ).toFixed(1) + "%"
      : "0%";
  const totalAssessments =
    dateRange === "All Time"
      ? 3842
      : dateRange === "Last 30 Days"
        ? 425
        : dateRange === "Last 7 Days"
          ? 84
          : 12;

  return (
    <InstituteLayout>
      <div
        ref={pdfRef}
        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 bg-[#f7f9fb]"
      >
        {/* PAGE HEADER */}
        <div
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          data-html2canvas-ignore="false"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#191c1e]">
              Analytics
            </h1>
            <p className="text-[#464555] mt-1 text-sm">
              Monitor institute-wide academic performance, attendance,
              assessments, and mentor effectiveness.
            </p>
          </div>
          <div
            className="flex flex-wrap items-center gap-3 print:hidden"
            data-html2canvas-ignore="true"
          >
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white text-[#191c1e] text-sm font-semibold rounded-xl border border-[#c7c4d8]/30 hover:bg-[#f2f4f6] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" /> Import CSV
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  setIsDateDropdownOpen(!isDateDropdownOpen);
                  setIsFilterDropdownOpen(false);
                }}
                className="px-4 py-2 bg-white text-[#191c1e] text-sm font-semibold rounded-xl border border-[#c7c4d8]/30 hover:bg-[#f2f4f6] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> {dateRange}{" "}
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDateDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-[#c7c4d8]/30 shadow-lg rounded-xl overflow-hidden z-50">
                  {["All Time", "Last 30 Days", "Last 7 Days", "Today"].map(
                    (range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setDateRange(range);
                          setIsDateDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f2f4f6] transition-colors cursor-pointer ${dateRange === range ? "font-bold text-[#3525cd] bg-[#3525cd]/5" : "text-[#191c1e]"}`}
                      >
                        {range}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsFilterDropdownOpen(!isFilterDropdownOpen);
                  setIsDateDropdownOpen(false);
                }}
                className="px-4 py-2 bg-white text-[#191c1e] text-sm font-semibold rounded-xl border border-[#c7c4d8]/30 hover:bg-[#f2f4f6] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Filter className="w-4 h-4" /> {filterClass}{" "}
                <ChevronDown className="w-4 h-4" />
              </button>
              {isFilterDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#c7c4d8]/30 shadow-lg rounded-xl overflow-hidden z-50">
                  {[
                    "All Classes",
                    "Class 12",
                    "Class 11",
                    "Class 10",
                    "Class 9",
                  ].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => {
                        setFilterClass(cls);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f2f4f6] transition-colors cursor-pointer ${filterClass === cls ? "font-bold text-[#3525cd] bg-[#3525cd]/5" : "text-[#191c1e]"}`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-4 py-2 bg-[#3525cd] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#4f46e5] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Download className="w-4 h-4" />{" "}
              {isExporting ? "Exporting..." : "Export Analytics"}
            </button>
          </div>
        </div>

        {/* SECTION 1: ANALYTICS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              label: "Total Students",
              value: totalStudents.toLocaleString(),
              icon: Users,
              color: "text-[#3525cd]",
            },
            {
              label: "Total Mentors",
              value: "42",
              icon: UserCheck,
              color: "text-green-600",
            },
            {
              label: "Assessments Conducted",
              value: totalAssessments.toLocaleString(),
              icon: FileText,
              color: "text-blue-600",
            },
            {
              label: "Average Score",
              value: avgScore,
              icon: Target,
              color: "text-indigo-600",
            },
            {
              label: "Completion Rate",
              value: compRate,
              icon: CheckCircle,
              color: "text-green-600",
            },
            {
              label: "Attendance Rate",
              value: attRate,
              icon: Clock,
              color: "text-orange-600",
            },
          ].map((metric, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 border border-[#c7c4d8]/30 flex flex-col gap-3 bg-white"
            >
              <div
                className={`w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center ${metric.color}`}
              >
                <metric.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#191c1e]">
                  {metric.value}
                </p>
                <p className="text-xs font-semibold text-[#464555] mt-0.5">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 2: CLASS PERFORMANCE */}
        <section className="glass-card rounded-3xl border border-[#c7c4d8]/30 overflow-hidden bg-white">
          <div className="p-6 border-b border-[#c7c4d8]/30 bg-white/50 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#3525cd]" /> Class Performance
            </h2>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm min-w-[700px]">
              <thead className="bg-[#f2f4f6] border-b border-[#e6e8ea] text-xs uppercase tracking-wider text-[#464555]">
                <tr>
                  {[
                    { key: "name", label: "Class" },
                    { key: "students", label: "Students" },
                    { key: "avgScore", label: "Average Score" },
                    { key: "compRate", label: "Completion Rate" },
                    { key: "att", label: "Attendance" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      className="px-6 py-4 font-semibold cursor-pointer hover:bg-[#eceef0] transition-colors"
                      onClick={() => handleSort(col.key as keyof ClassData)}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sortConfig?.key === col.key &&
                          (sortConfig.direction === "asc" ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          ))}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e8ea] bg-white">
                {sortedClassData.map((cls, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#f2f4f6]/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-[#191c1e]">
                      {cls.name}
                    </td>
                    <td className="px-6 py-4 text-[#464555]">
                      {cls.students}
                    </td>
                    <td className="px-6 py-4 font-medium">{cls.avgScore}</td>
                    <td className="px-6 py-4 font-medium">{cls.compRate}</td>
                    <td className="px-6 py-4 font-medium">{cls.att}</td>
                    <td className="px-6 py-4">
                      <button className="text-[#3525cd] font-semibold hover:underline cursor-pointer">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SUBJECT PERFORMANCE */}
        <section>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4 px-1">
            <BookOpen className="w-5 h-5 text-[#3525cd]" /> Subject Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Mathematics",
                avgScore: "76%",
                compRate: "94%",
                assessments: 145,
              },
              {
                name: "Physics",
                avgScore: "72%",
                compRate: "91%",
                assessments: 120,
              },
              {
                name: "Chemistry",
                avgScore: "79%",
                compRate: "95%",
                assessments: 132,
              },
              {
                name: "Biology",
                avgScore: "84%",
                compRate: "98%",
                assessments: 110,
              },
            ].map((sub, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 border border-[#c7c4d8]/30 flex flex-col gap-4 bg-white"
              >
                <h3 className="font-semibold text-[#191c1e] text-base">
                  {sub.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#464555]">Average Score</span>
                    <span className="font-bold text-[#191c1e]">
                      {sub.avgScore}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#464555]">
                      Completion Rate
                    </span>
                    <span className="font-bold text-[#191c1e]">
                      {sub.compRate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#464555]">
                      Total Assessments
                    </span>
                    <span className="font-bold text-[#191c1e]">
                      {sub.assessments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: ASSESSMENT ANALYTICS */}
        <section className="glass-card rounded-3xl border border-[#c7c4d8]/30 overflow-hidden bg-white">
          <div>
            <div className="p-6 border-b border-[#c7c4d8]/30 bg-white/50 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#3525cd]" /> Assessment Analytics
              </h2>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm min-w-[700px]">
                <thead className="bg-[#f2f4f6] border-b border-[#e6e8ea] text-xs uppercase tracking-wider text-[#464555]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Assessment Name</th>
                    <th className="px-6 py-4 font-semibold">Subject</th>
                    <th className="px-6 py-4 font-semibold">Attempts</th>
                    <th className="px-6 py-4 font-semibold">Average Score</th>
                    <th className="px-6 py-4 font-semibold">Completion</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6e8ea] bg-white">
                  {[
                    {
                      name: "Midterm Calculus",
                      sub: "Mathematics",
                      att: 340,
                      avg: "72%",
                      comp: "98%",
                      status: "Completed",
                      sClass: "bg-green-100 text-green-700",
                    },
                    {
                      name: "Organic Chemistry Basics",
                      sub: "Chemistry",
                      att: 290,
                      avg: "81%",
                      comp: "95%",
                      status: "Completed",
                      sClass: "bg-green-100 text-green-700",
                    },
                    {
                      name: "Newtonian Mechanics",
                      sub: "Physics",
                      att: 315,
                      avg: "68%",
                      comp: "91%",
                      status: "Active",
                      sClass: "bg-blue-100 text-blue-700",
                    },
                    {
                      name: "Genetics Quiz",
                      sub: "Biology",
                      att: 280,
                      avg: "85%",
                      comp: "100%",
                      status: "Completed",
                      sClass: "bg-green-100 text-green-700",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-[#f2f4f6]/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-[#191c1e]">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-[#464555]">
                        {row.sub}
                      </td>
                      <td className="px-6 py-4 font-medium">{row.att}</td>
                      <td className="px-6 py-4 font-medium">{row.avg}</td>
                      <td className="px-6 py-4 font-medium">{row.comp}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md ${row.sClass}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: MENTOR PERFORMANCE */}
        <section className="glass-card rounded-3xl border border-[#c7c4d8]/30 overflow-hidden bg-white">
          <div className="p-6 border-b border-[#c7c4d8]/30 bg-white/50 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#3525cd]" /> Mentor Performance
            </h2>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm min-w-[700px]">
              <thead className="bg-[#f2f4f6] border-b border-[#e6e8ea] text-xs uppercase tracking-wider text-[#464555]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mentor</th>
                  <th className="px-6 py-4 font-semibold">Assigned Students</th>
                  <th className="px-6 py-4 font-semibold">
                    Average Student Score
                  </th>
                  <th className="px-6 py-4 font-semibold">Completion Rate</th>
                  <th className="px-6 py-4 font-semibold">Attendance Mgmt</th>
                  <th className="px-6 py-4 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e8ea] bg-white">
                {[
                  {
                    name: "Dr. Alan Smith",
                    students: 120,
                    avg: "81%",
                    comp: "96%",
                    att: "94%",
                    rating: "4.9/5",
                  },
                  {
                    name: "Sarah Jenkins",
                    students: 85,
                    avg: "78%",
                    comp: "92%",
                    att: "88%",
                    rating: "4.7/5",
                  },
                  {
                    name: "Michael Chang",
                    students: 110,
                    avg: "75%",
                    comp: "90%",
                    att: "89%",
                    rating: "4.5/5",
                  },
                  {
                    name: "Dr. Emily Reed",
                    students: 95,
                    avg: "84%",
                    comp: "98%",
                    att: "96%",
                    rating: "4.9/5",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#f2f4f6]/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-[#191c1e]">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-[#464555]">
                      {row.students}
                    </td>
                    <td className="px-6 py-4 font-medium">{row.avg}</td>
                    <td className="px-6 py-4 font-medium">{row.comp}</td>
                    <td className="px-6 py-4 font-medium">{row.att}</td>
                    <td className="px-6 py-4 font-semibold text-[#3525cd]">
                      {row.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: STUDENT PERFORMANCE SUMMARY & SECTION 7: ATTENDANCE ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Performance Summary */}
          <section className="glass-card rounded-3xl p-6 border border-[#c7c4d8]/30 bg-white">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#3525cd]" /> Student Performance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex flex-col items-center text-center">
                <span className="text-3xl font-bold text-green-700 mb-1">
                  312
                </span>
                <span className="text-sm font-semibold text-green-800">
                  Excellent Students
                </span>
                <span className="text-xs font-medium text-green-600/80 mt-1">
                  90% and above
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col items-center text-center">
                <span className="text-3xl font-bold text-blue-700 mb-1">
                  540
                </span>
                <span className="text-sm font-semibold text-blue-800">
                  Good Students
                </span>
                <span className="text-xs font-medium text-blue-600/80 mt-1">
                  75% – 89%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col items-center text-center">
                <span className="text-3xl font-bold text-orange-700 mb-1">
                  285
                </span>
                <span className="text-sm font-semibold text-orange-800">
                  Average Students
                </span>
                <span className="text-xs font-medium text-orange-600/80 mt-1">
                  50% – 74%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex flex-col items-center text-center">
                <span className="text-3xl font-bold text-red-700 mb-1">
                  111
                </span>
                <span className="text-sm font-semibold text-red-800">
                  Needs Improvement
                </span>
                <span className="text-xs font-medium text-red-600/80 mt-1">
                  Below 50%
                </span>
              </div>
            </div>
          </section>

          {/* Attendance Analytics */}
          <section className="glass-card rounded-3xl p-6 border border-[#c7c4d8]/30 bg-white">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-[#3525cd]" /> Attendance Analytics
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-[#464555] flex items-center gap-2 mb-3">
                  <ArrowUpRight className="w-4 h-4 text-green-600" /> Best
                  Attendance Classes
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 p-3 bg-[#f7f9fb] border border-[#c7c4d8]/30 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-sm">Class 12A</span>
                    <span className="font-medium text-green-600 text-sm">
                      96%
                    </span>
                  </div>
                  <div className="flex-1 p-3 bg-[#f7f9fb] border border-[#c7c4d8]/30 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-sm">Class 11B</span>
                    <span className="font-medium text-green-600 text-sm">
                      94%
                    </span>
                  </div>
                  <div className="flex-1 p-3 bg-[#f7f9fb] border border-[#c7c4d8]/30 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-sm">Class 10A</span>
                    <span className="font-medium text-green-600 text-sm">
                      92%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#464555] flex items-center gap-2 mb-3">
                  <ArrowDownRight className="w-4 h-4 text-red-500" /> Low Attendance
                  Classes
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 p-3 bg-[#f7f9fb] border border-[#c7c4d8]/30 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-sm">Class 9B</span>
                    <span className="font-medium text-red-500 text-sm">78%</span>
                  </div>
                  <div className="flex-1 p-3 bg-[#f7f9fb] border border-[#c7c4d8]/30 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-sm">Class 8A</span>
                    <span className="font-medium text-red-500 text-sm">81%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </InstituteLayout>
  );
}
