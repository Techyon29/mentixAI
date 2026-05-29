"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#F4F6FB] overflow-hidden font-sans text-slate-800">
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#E8E2FF] to-[#D4CAFF] blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F0F5FF] to-[#E2EBFF] blur-[80px] opacity-60 pointer-events-none" />

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen p-2 md:p-3 gap-0 md:gap-6">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden pl-2 pr-1 md:pl-0 md:pr-3 pb-8 custom-scrollbar">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          {children}
        </main>
      </div>
    </div>
  );
}
