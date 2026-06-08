"use client";

import { Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import InstituteLayout from "../InstituteLayout";

export default function AddMentor() {
  return (
    <InstituteLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
          <Link href="/institute-dashboard/mentors" className="p-2 border border-[#c7c4d8]/30 rounded-full hover:bg-[#eceef0] text-[#464555] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Add New Mentor</h1>
            <p className="text-sm text-[#464555]">Create a profile and assign permissions.</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8 bg-white border border-[#c7c4d8]/30">
          {/* Photo Upload */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#c7c4d8]/50 flex flex-col items-center justify-center bg-white text-[#777587] hover:border-[#3525cd]/50 hover:bg-[#3525cd]/5 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">Upload</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Profile Photo</h3>
              <p className="text-xs text-[#464555] mb-3">Professional headshot. JPG or PNG, max 2MB.</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">First Name</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. Sarah" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Last Name</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. Chen" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Institute Email</label>
              <input type="email" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="sarah.chen@institute.edu" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Institute Name</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. Kalvium" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Mentor ID</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. MNT-2024" />
            </div>
            
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Expertised Subjects</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. Advanced Calculus, Physics (comma separated)" />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">Assigned Classes</label>
              <input type="text" className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" placeholder="e.g. 9, 10, 11 (comma separated)" />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">About Mentor</label>
              <textarea className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all h-24 resize-none" placeholder="Brief professional background or bio..."></textarea>
            </div>
          </div>

          {/* AI Permissions */}
          <div className="border-t border-[#e6e8ea] pt-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#3525cd]/10 flex items-center justify-center"><SparklesIcon /></div>
              AI Permissions
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#c7c4d8]/30 hover:bg-[#f2f4f6]/50 cursor-pointer transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-[#3525cd] focus:ring-[#3525cd] border-[#c7c4d8]" defaultChecked />
                <div>
                  <p className="text-sm font-semibold text-[#191c1e]">Automated Grading Access</p>
                  <p className="text-xs text-[#464555]">Allow mentor to use AI for initial assessment scoring.</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#c7c4d8]/30 hover:bg-[#f2f4f6]/50 cursor-pointer transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded text-[#3525cd] focus:ring-[#3525cd] border-[#c7c4d8]" defaultChecked />
                <div>
                  <p className="text-sm font-semibold text-[#191c1e]">Predictive Risk Dashboard</p>
                  <p className="text-xs text-[#464555]">Access to AI-generated student risk profiles.</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link href="/institute-dashboard/mentors" className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#191c1e] hover:bg-[#f2f4f6] transition-colors">Cancel</Link>
            <button className="px-6 py-2.5 rounded-full bg-[#3525cd] text-white text-sm font-semibold hover:bg-[#4f46e5] transition-colors shadow-md shadow-[#3525cd]/20 cursor-pointer">Save Mentor</button>
          </div>
        </div>
      </div>
    </InstituteLayout>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3525cd]"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  );
}
