"use client";

import { ArrowLeft, UserPlus, Shield } from "lucide-react";
import Link from "next/link";
import InstituteLayout from "../InstituteLayout";

export default function AddStudent() {
  return (
    <InstituteLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
          <Link href="/institute-dashboard/students" className="p-2 border border-[#c7c4d8]/30 rounded-full hover:bg-[#eceef0] text-[#464555] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Enroll Student</h1>
            <p className="text-sm text-[#464555]">Add a new student profile and biometric baseline.</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8 bg-white border border-[#c7c4d8]/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">First Name</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. David" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Last Name</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. Chen" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Student ID</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. STU-1029" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Cohort / Class</label>
              <select className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all appearance-none cursor-pointer">
                <option>CS-2024-A</option>
                <option>CS-2024-B</option>
                <option>DS-2023-A</option>
              </select>
            </div>
          </div>

          {/* Security Baseline */}
          <div className="border-t border-[#e6e8ea] pt-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#ba1a1a]/10 text-[#ba1a1a] flex items-center justify-center"><Shield className="w-4 h-4" /></div>
              Security Verification Baseline
            </h3>
            <p className="text-sm text-[#464555] mb-4">Upload a reference photo to enable AI Proctoring identity verification.</p>
            <div className="w-full h-32 border-2 border-dashed border-[#c7c4d8]/60 rounded-xl flex items-center justify-center bg-white hover:border-[#3525cd]/50 hover:bg-[#3525cd]/5 transition-colors cursor-pointer text-center p-4">
              <div>
                <UserPlus className="w-6 h-6 mx-auto mb-2 text-[#777587]" />
                <p className="text-sm font-medium">Capture or Upload Baseline ID</p>
                <p className="text-xs text-[#777587] mt-1">Clear front-facing photo required.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#e6e8ea]">
            <Link href="/institute-dashboard/students" className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#191c1e] hover:bg-[#f2f4f6] transition-colors">Cancel</Link>
            <button className="px-6 py-2.5 rounded-full bg-[#3525cd] text-white text-sm font-semibold hover:bg-[#4f46e5] transition-colors shadow-md shadow-[#3525cd]/20 cursor-pointer">Enroll Student</button>
          </div>
        </div>
      </div>
    </InstituteLayout>
  );
}
