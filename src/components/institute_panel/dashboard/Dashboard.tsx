"use client";

import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Ticket, 
  Key, 
  LifeBuoy, 
  ChevronRight 
} from "lucide-react";
import Link from "next/link";
import InstituteLayout from "../InstituteLayout";

export default function Dashboard() {
  return (
    <InstituteLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-[#191c1e] tracking-tight">Institute Overview</h1>
            <p className="text-[#464555] mt-2 text-sm max-w-lg">Welcome back. Here's what's happening across Mentix today. Monitor system vitals and manage institute resources.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/institute-dashboard/mentors/add" className="whitespace-nowrap px-5 py-2.5 bg-white border border-[#c7c4d8]/60 text-[#191c1e] text-sm font-semibold rounded-full hover:bg-[#eceef0] transition-all shadow-sm flex items-center gap-2">
              <GraduationCap className="shrink-0 w-4 h-4 text-[#3525cd]" /> Add Mentor
            </Link>
            <Link href="/institute-dashboard/students/add" className="whitespace-nowrap px-5 py-2.5 bg-[#191c1e] text-[#f7f9fb] text-sm font-semibold rounded-full hover:bg-[#464555] hover:shadow-lg transition-all shadow-md flex items-center gap-2">
              <Users className="shrink-0 w-4 h-4" /> Add Student
            </Link>
          </div>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Primary Metric - Students */}
          <div className="lg:col-span-2 md:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative border border-[#c7c4d8]/40 shadow-sm bg-gradient-to-br from-white to-[#3525cd]/5">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#3525cd]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 group-hover:bg-[#3525cd]/15 transition-colors"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#777587] mb-2">Total Active Students</p>
                  <div className="flex items-end gap-3">
                    <h3 className="text-6xl font-extrabold tracking-tighter text-[#191c1e]">12,450</h3>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-[#c7c4d8]/30 text-[#3525cd] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-7 h-7" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 border-t border-[#eceef0]/50 pt-6 mt-auto">
                <p className="text-sm text-green-700 bg-green-100/80 px-3 py-1 rounded-full font-bold flex items-center gap-1.5 w-fit">
                  <TrendingUp className="w-4 h-4" /> +12% this term
                </p>
                <p className="text-sm font-medium text-[#464555] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Enrollment optimal
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="glass-card rounded-3xl p-6 border border-[#c7c4d8]/30 flex flex-col justify-between group hover:shadow-md transition-all bg-white">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#5654a8]/10 text-[#5654a8] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#777587] mb-1">Active Mentors</p>
              <h4 className="text-4xl font-bold">342</h4>
            </div>
            <div className="mt-6 pt-4 border-t border-[#eceef0]/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+14 this month</span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-[#c7c4d8]/30 flex flex-col justify-between group hover:shadow-md transition-all bg-white">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#4f46e5]/20 text-[#3525cd] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#777587] mb-1">Active Assessments</p>
              <h4 className="text-4xl font-bold">89</h4>
            </div>
            <div className="mt-6 pt-4 border-t border-[#eceef0]/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Requires attention</span>
            </div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Live OTP Share for Active Tests */}
          <div className="glass-card rounded-3xl p-6 lg:p-8 border border-[#c7c4d8]/30 flex flex-col gap-6 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Key className="w-5 h-5 text-[#3525cd]" />
                Live Test OTPs
              </h3>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-[#eceef0] hover:border-[#3525cd]/30 transition-all flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-[#191c1e]">Data Structures & Algorithms</h4>
                    <p className="text-[11px] font-semibold text-[#c7c4d8] mt-0.5">CS201 • Active globally</p>
                  </div>
                  <div className="px-2.5 py-1 bg-[#3525cd]/10 text-[#3525cd] font-mono font-bold tracking-widest text-lg rounded-lg border border-[#3525cd]/20">
                    8421
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#464555] font-medium">
                  <Clock className="w-3.5 h-3.5" /> Expires in 45:12
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#eceef0] hover:border-[#3525cd]/30 transition-all flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-[#191c1e]">Introduction to Machine Learning</h4>
                    <p className="text-[11px] font-semibold text-[#c7c4d8] mt-0.5">CS401 • Cohort A only</p>
                  </div>
                  <div className="px-2.5 py-1 bg-[#3525cd]/10 text-[#3525cd] font-mono font-bold tracking-widest text-lg rounded-lg border border-[#3525cd]/20">
                    9034
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#464555] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#ba1a1a]" /> Expires in 05:30
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-2xl border border-[#eceef0] mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#191c1e] mb-0.5">Secure Testing Enforced</h4>
                    <p className="text-xs text-[#464555] font-medium">All active sessions authenticated directly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Support Tickets */}
          <div className="lg:col-span-2 glass-card rounded-3xl p-6 lg:p-8 border border-[#c7c4d8]/30 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-[#777587]" />
                Recent Support Tickets
              </h3>
              <Link href="/institute-dashboard/support" className="text-[#3525cd] text-sm font-bold hover:bg-[#3525cd]/5 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {[
                { status: "Open", statusColor: "bg-orange-100 text-orange-700", title: "Unable to access CS301 final assessment", author: "Student: James Doe", time: "10 mins ago", id: "TKT-1049" },
                { status: "In Progress", statusColor: "bg-blue-100 text-blue-700", title: "Video upload failing for assignment submission", author: "Student: Maria Garcia", time: "1 hr ago", id: "TKT-1048" },
                { status: "Resolved", statusColor: "bg-green-100 text-green-700", title: "Requesting extended time due to medical leave", author: "Student: Ahmed Khan", time: "1 day ago", id: "TKT-1042" },
              ].map((ticket, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 hover:bg-[#f2f4f6]/50 rounded-2xl transition-colors border border-[#eceef0]/50 hover:border-[#eceef0] group items-start sm:items-center justify-between bg-white">
                  <div className="flex gap-4 items-start sm:items-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ticket.statusColor.split(" ")[0]} ${ticket.statusColor.split(" ")[1]}`}>
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#191c1e] mb-1 line-clamp-1">{ticket.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#464555]">
                        <span className="text-[#777587] font-mono">{ticket.id}</span>
                        <span className="w-1 h-1 rounded-full bg-[#c7c4d8]/30"></span>
                        <span>{ticket.author}</span>
                        <span className="w-1 h-1 rounded-full bg-[#c7c4d8]/30"></span>
                        <span>{ticket.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 mt-2 sm:mt-0">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md ${ticket.statusColor}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InstituteLayout>
  );
}
