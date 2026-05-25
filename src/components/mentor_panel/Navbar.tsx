"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, User, Settings, LogOut, Activity, MessageSquare, Star } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: "New Test Submission", desc: "Rohan Verma completed 'Physics Quiz 2'", time: "5m ago", type: "submission", icon: Activity, color: "blue" },
    { id: 2, title: "Urgent Query", desc: "Ananya Sharma asked a question about Algebra", time: "12m ago", type: "query", icon: MessageSquare, color: "orange" },
    { id: 3, title: "Performance Milestone", desc: "Average class score increased by 12%", time: "1h ago", type: "milestone", icon: Star, color: "emerald" },
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
    <header className="sticky top-0 z-50 flex items-center justify-between py-4 mb-4 bg-[#F0F5FA]/80 backdrop-blur-md rounded-b-2xl">
      <div className="relative w-full max-w-[480px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search tests, students, topics..." 
          className="w-full pl-12 pr-4 py-3 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02),_inset_0_2px_4px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-[#0D3694] placeholder:text-slate-500 font-medium transition-all"
        />
      </div>
      <div className="flex items-center gap-6 pr-2">
        {/* Notifications Section */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsDropdownOpen(false);
            }}
            className={`relative p-2.5 transition-all rounded-full border border-transparent ${isNotificationsOpen ? 'bg-white shadow-md border-slate-100 text-blue-600' : 'text-[#0D3694] hover:bg-white/40'}`}
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse shadow-sm"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white/90 backdrop-blur-2xl border border-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-[15px] font-black text-[#0D3694]">Recent Alerts</h4>
                <button 
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar py-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-2xl hover:bg-blue-50/50 transition-all cursor-pointer group mb-1 border border-transparent hover:border-blue-100">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-${n.color}-100 text-${n.color}-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                        <n.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-[13px] font-black text-[#0D3694]">{n.title}</p>
                          <span className="text-[10px] font-bold text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{n.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <button className="w-full py-3 text-[12px] font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.15em]">
                  View Activity History
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsNotificationsOpen(false);
            }}
            className={`flex items-center gap-3 cursor-pointer group px-3 py-1.5 rounded-2xl transition-all border border-transparent ${isDropdownOpen ? 'bg-white shadow-md border-slate-100' : 'hover:bg-white/40 hover:border-white/60'}`}
          >
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Arjun" className="w-10 h-10 rounded-full border-2 border-white shadow-sm group-hover:shadow-md transition-all object-cover" />
            <div className="flex flex-col">
              <span className="text-[#0D3694] font-bold text-[14.5px]">Arjun Mehta</span>
              <span className="text-[#5B779E] text-[12.5px] font-medium">Mentor</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#5B779E] ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* User Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-2xl border border-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
              <div className="px-4 py-4 mb-2 border-b border-slate-100">
                <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-1">Mentor Account</p>
                <p className="text-[14px] font-bold text-[#0D3694] truncate">arjun.mehta@mentix.ai</p>
              </div>
              
              <div className="space-y-1">
                {[
                  { label: "My Profile", icon: User, path: "/mentor-dashboard/settings?tab=Profile Settings" },
                  { label: "Account Settings", icon: Settings, path: "/mentor-dashboard/settings?tab=Account Settings" },
                ].map((item, i) => (
                  <Link 
                    key={i} 
                    href={item.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all group/item"
                  >
                    <item.icon className="w-4 h-4 transition-transform group-hover/item:scale-110" />
                    <span className="text-[14px] font-bold">{item.label}</span>
                  </Link>
                ))}
                
                <div className="pt-2 mt-2 border-t border-slate-100">
                  <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-500 transition-all group/item">
                    <LogOut className="w-4 h-4 transition-transform group-hover/item:translate-x-1" />
                    <span className="text-[14px] font-black">Logout</span>
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