"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BarChart3,
  FileCheck2,
  BrainCircuit,
  Headset,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  User,
  LogOut,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { name: "Dashboard", path: "/institute-dashboard", icon: LayoutDashboard },
  { name: "Mentors", path: "/institute-dashboard/mentors", icon: GraduationCap },
  { name: "Students", path: "/institute-dashboard/students", icon: Users },
  { name: "Analytics", path: "/institute-dashboard/analytics", icon: BarChart3 },
  { name: "Assessments", path: "/institute-dashboard/assessments", icon: FileCheck2 },
  { name: "Support Tickets", path: "/institute-dashboard/support", icon: Headset },
  { name: "Settings", path: "/institute-dashboard/settings", icon: Settings },
];

interface InstituteLayoutProps {
  children: React.ReactNode;
}

export default function InstituteLayout({ children }: InstituteLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopClosed, setIsDesktopClosed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const activeRoute = navItems.find((item) => {
      if (item.path === "/institute-dashboard") return pathname === "/institute-dashboard";
      return pathname.startsWith(item.path);
    });
    return activeRoute ? activeRoute.name : "Mentix AI";
  };

  const handleSignOut = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-[#191c1e] overflow-x-hidden w-full font-sans">
      {/* Sidebar overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-gradient-to-b from-[#4f46e5] to-[#5654a8] transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        ${isDesktopClosed ? "md:-translate-x-full" : "md:translate-x-0"}
      `}>
        <div className="h-full flex flex-col pt-8 pb-6 text-white">
          <div className="px-8 flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold tracking-tight text-xl">Mentix AI</h1>
                <p className="text-xs text-white/80 font-medium">Institute Management</p>
              </div>
            </div>
            <button
              className="md:hidden p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto hide-scrollbar">
            {navItems.map((item) => {
              const isActive = item.path === "/institute-dashboard"
                ? pathname === "/institute-dashboard"
                : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative
                    ${isActive
                      ? "bg-white/10 backdrop-blur-md text-white font-bold"
                      : "text-white/70 hover:text-white hover:bg-white/5"}
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-md" />
                  )}
                  <item.icon className={`w-5 h-5 ${isActive ? "opacity-100" : "opacity-70"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`
        flex-1 min-w-0 flex flex-col min-h-screen transition-[padding] duration-300 ease-in-out
        ${isDesktopClosed ? "md:pl-0" : "md:pl-[280px]"}
      `}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-[#e6e8ea] flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <button
              className="md:hidden p-2 -ml-2 text-[#464555] hover:bg-[#eceef0] rounded-full"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              className="hidden md:block p-2 -ml-2 text-[#464555] hover:bg-[#eceef0] rounded-full transition-all"
              onClick={() => setIsDesktopClosed(!isDesktopClosed)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold hidden sm:block text-[#191c1e]">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-1 justify-end relative">
            <div className="relative hidden lg:block w-full max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777587]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-[#f2f4f6] border-none rounded-full text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all"
              />
            </div>

            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative w-10 h-10 flex items-center justify-center text-[#464555] hover:bg-[#eceef0] rounded-full transition-colors focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></div>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#c7c4d8]/30 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-4">
                  <div className="p-4 border-b border-[#e6e8ea] flex items-center justify-between">
                    <h3 className="font-semibold text-[#191c1e]">Notifications</h3>
                    <button className="text-xs text-[#3525cd] hover:underline font-medium">Mark all as read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-4 border-b border-[#f2f4f6] hover:bg-[#eceef0] transition-colors cursor-pointer bg-[#3525cd]/5">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] shrink-0">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#191c1e] mb-1">Low Attendance Alert</p>
                          <p className="text-xs text-[#464555] line-clamp-2">Sarah Jenkins has dropped below the 75% attendance threshold.</p>
                          <p className="text-[10px] text-[#777587] mt-1">10 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b border-[#f2f4f6] hover:bg-[#eceef0] transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-[#3525cd]/10 text-[#3525cd] shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#191c1e] mb-1">Assessment Graded</p>
                          <p className="text-xs text-[#464555] line-clamp-2">Dr. Sarah Connor has finished grading the Mid-term assessments.</p>
                          <p className="text-[10px] text-[#777587] mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-[#e6e8ea] text-center">
                    <button className="text-sm text-[#3525cd] font-medium hover:underline">View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-[#e6e8ea] mx-1 hidden sm:block"></div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-[#f2f4f6] p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-[#eceef0] focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#3525cd]/10 text-[#3525cd] flex items-center justify-center font-bold text-sm shrink-0">
                  AD
                </div>
                <span className="text-sm font-medium hidden sm:block whitespace-nowrap">Admin</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#c7c4d8]/30 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-4">
                  <div className="p-4 border-b border-[#e6e8ea] bg-white">
                    <p className="font-semibold text-[#191c1e] text-sm">System Administrator</p>
                    <p className="text-xs text-[#464555] mt-0.5">admin@mentix.edu</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/institute-dashboard/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-[#191c1e] hover:bg-[#f2f4f6] rounded-lg transition-colors w-full text-left"
                    >
                      <User className="w-4 h-4 text-[#464555]" /> Profile Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-[#ba1a1a] hover:bg-[#ba1a1a]/10 rounded-lg transition-colors w-full text-left mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
