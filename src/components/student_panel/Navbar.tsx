"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, User, Settings, LogOut, Activity, MessageSquare, Star, Menu } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  
  // Mock state: In a real app, this would be fetched from an API
  const [hasLiveTest, setHasLiveTest] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: "New Assessment", desc: "You have a new Math assessment.", time: "10m ago", type: "assessment", icon: Activity, color: "blue" },
    { id: 2, title: "Mentor Message", desc: "Mentor sent you feedback.", time: "30m ago", type: "message", icon: MessageSquare, color: "emerald" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-1.5 md:py-4 px-3 md:px-0 mb-3 md:mb-4 bg-[#F4F6FB]/90 backdrop-blur-md rounded-b-2xl gap-2 md:gap-4">
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        <button 
          onClick={onMenuClick}
          className="p-1.5 md:p-2 bg-white/40 border border-white/60 rounded-xl md:hidden text-[#0D3694] hover:bg-white/60 transition-all shrink-0"
        >
          <Menu className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <div className="relative w-full max-w-[480px] hidden xs:block">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-9 md:pl-12 pr-4 py-1.5 md:py-3 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-[#0D3694] placeholder:text-slate-500 font-medium transition-all text-[11px] md:text-sm"
          />
        </div>
        <button className="p-1.5 bg-white/40 border border-white/60 rounded-xl xs:hidden text-[#0D3694] shrink-0">
          <Search className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-1.5 md:gap-6 shrink-0">
        {/* Live Status Indicator - Only shows when hasLiveTest is true */}
        {hasLiveTest && (
          <Link href="/student-dashboard/assessments" className="hidden sm:flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-red-50 border border-red-100 rounded-full group hover:bg-red-100 transition-colors shadow-sm cursor-pointer whitespace-nowrap">
             <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
             </div>
             <span className="text-[9px] md:text-[10px] font-black text-red-600 uppercase tracking-wider group-hover:tracking-widest transition-all">Live Test</span>
          </Link>
        )}

        {/* Notifications Section */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsDropdownOpen(false);
            }}
            className={`relative p-1.5 md:p-2.5 transition-all rounded-full border border-transparent ${isNotificationsOpen ? 'bg-white shadow-md border-slate-100 text-blue-600' : 'text-[#0D3694] hover:bg-white/40'}`}
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 md:w-3 md:h-3 bg-red-500 border-2 border-white rounded-full animate-pulse shadow-sm"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-72 md:w-80 bg-white/90 backdrop-blur-2xl border border-white rounded-[24px] md:rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-2 md:p-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 md:px-4 py-2 md:py-3 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-[12px] md:text-[15px] font-black text-[#0D3694]">Recent Alerts</h4>
                <button 
                  onClick={() => setUnreadCount(0)}
                  className="text-[10px] md:text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-[280px] md:max-h-[400px] overflow-y-auto custom-scrollbar py-1 md:py-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 md:p-3 rounded-xl md:rounded-2xl hover:bg-blue-50/50 transition-all cursor-pointer group mb-1 border border-transparent hover:border-blue-100">
                    <div className="flex gap-2 md:gap-4">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-${n.color}-100 text-${n.color}-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                        <n.icon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-[11px] md:text-[13px] font-black text-[#0D3694] truncate">{n.title}</p>
                          <span className="text-[9px] md:text-[10px] font-bold text-slate-400 shrink-0 ml-1">{n.time}</span>
                        </div>
                        <p className="text-[10px] md:text-[12px] text-slate-500 font-medium leading-relaxed">{n.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1 md:pt-2 border-t border-slate-100 text-center">
                <button className="w-full py-2 md:py-3 text-[10px] md:text-[12px] font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.15em]">
                  View Activity History
                </button>
              </div>
            </div>
          )}
        </div>
        {/* User Dropdown Section */}
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsNotificationsOpen(false);
            }}
            className={`flex items-center gap-1.5 xs:gap-2 md:gap-3 cursor-pointer group px-1.5 xs:px-2 md:px-3 py-1 md:py-1.5 rounded-xl md:rounded-2xl transition-all border border-transparent ${isDropdownOpen ? 'bg-white shadow-md border-slate-100' : 'hover:bg-white/40 hover:border-white/60'}`}
          >
            <img src="https://i.pravatar.cc/150?u=r1" alt="Rohan Verma" className="w-7 h-7 xs:w-8 xs:h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition-all object-cover shrink-0" />
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="text-[#0D3694] font-bold text-[11px] xs:text-[12px] md:text-[14.5px] truncate">Rohan Verma</span>
              <span className="text-[#5B779E] text-[9px] xs:text-[10px] md:text-[12.5px] font-medium truncate">Class 10</span>
            </div>
            <ChevronDown className={`w-3 h-3 xs:w-3.5 xs:h-3.5 md:w-4 md:h-4 text-[#5B779E] ml-0 xs:ml-0.5 md:ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* User Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 md:w-64 bg-white/90 backdrop-blur-2xl border border-white rounded-[20px] md:rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
              <div className="px-3 md:px-4 py-3 md:py-4 mb-2 border-b border-slate-100">
                <p className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-widest mb-1">Student Account</p>
                <p className="text-[12px] md:text-[14px] font-bold text-[#0D3694] truncate">rohan.verma@school.edu</p>
              </div>
              <div className="space-y-1">
                {[
                  { label: "My Profile", icon: User, path: "/student-dashboard/settings?tab=Profile Settings" },
                  { label: "Account Settings", icon: Settings, path: "/student-dashboard/settings?tab=Account Settings" },
                ].map((item, i) => (
                  <Link 
                    key={i} 
                    href={item.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all group/item"
                  >
                    <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/item:scale-110" />
                    <span className="text-[12px] md:text-[14px] font-bold">{item.label}</span>
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-slate-100">
                  <Link href="/" className="w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-500 transition-all group/item">
                    <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/item:translate-x-1" />
                    <span className="text-[12px] md:text-[14px] font-black">Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
