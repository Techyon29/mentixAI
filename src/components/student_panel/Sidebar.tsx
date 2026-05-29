
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  FileText,
  BarChart2,
  Star,
  Settings,
  Sparkles,
  ChevronDown,
  LayoutDashboard,
  ClipboardList,
  History,
  TrendingUp,
  BookOpen,
  Target,
  Award
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/student-dashboard" },
  { id: "assessments", label: "Assessments", icon: ClipboardList, path: "/student-dashboard/assessments" },
  { id: "performance", label: "Performance", icon: BarChart2, path: "/student-dashboard/performance" },
  {id: "settings", label: "Settings", icon: Settings, path: "/student-dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] h-full rounded-none bg-gradient-to-b from-[#2A75FF] to-[#0D3694] shadow-[4px_0_24px_rgba(20,80,200,0.15)] flex flex-col pt-6 pb-4 px-3 relative overflow-hidden backdrop-blur-xl shrink-0">
      {/* Internal Glow for Sidebar */}
      <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] rounded-full bg-white/10 blur-[40px] pointer-events-none" />

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shadow-lg border border-white/20 overflow-hidden backdrop-blur-md">
          <Image
            src="/logo.png"
            alt="Mentix AI Logo"
            width={44}
            height={44}
            className="object-contain"
            style={{ height: "auto" }}
          />
        </div>
        <span className="text-[17px] font-bold text-white tracking-tight">
          Mentix AI
        </span>
      </div>

      {/* Scrollable Container for Navigation & Promo */}
      <div className="flex-1 overflow-y-auto pr-1 -mr-1 
        [&::-webkit-scrollbar]:w-1.5 
        [&::-webkit-scrollbar-track]:bg-transparent 
        [&::-webkit-scrollbar-thumb]:bg-white/10 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
        
        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.id}
                href={item.path}
                className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 overflow-hidden text-[13.5px] ${
                  isActive
                    ? "text-white font-semibold bg-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20"
                    : "text-white/70 hover:bg-white/5 font-medium hover:text-white border border-transparent"
                }`}
              >
                {/* Active Indicator & Glow */}
                {isActive && (
                  <>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                  </>
                )}

                {/* Icon Container with hover effects */}
                <div
                  className={`relative z-10 flex items-center justify-center p-1.5 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 shadow-inner"
                      : "group-hover:bg-white/10 group-hover:scale-110"
                  }`}
                >
                  <Icon
                    className={`w-[18px] h-[18px] transition-colors duration-300 ${isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "text-white/70 group-hover:text-white"}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>

                <span
                  className={`relative z-10 transition-transform duration-300 ${isActive ? "translate-x-0.5" : "group-hover:translate-x-1"}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* AI Assistant Promo */}
      <div className="mt-auto px-2 mb-4">
        <div className="relative p-5 rounded-[24px] bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden group">
          {/* Header with Icon */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center border border-white/20 shadow-inner">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white font-bold text-[15px] tracking-tight">AI Assistant</h4>
          </div>
          
          <p className="text-white/70 text-[12px] font-medium leading-[1.6] mb-5">
            Get personalized study help, instant answers with our AI Assistant.
          </p>

          <Link 
            href="/ai-assistant"
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-[13px] flex items-center justify-center gap-2 transition-all border border-white/20 active:scale-95 group/btn"
          >
            <Sparkles className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
            Ask AI
          </Link>
        </div>
      </div>
    </aside>
  );
}
