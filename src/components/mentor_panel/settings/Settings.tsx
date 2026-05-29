"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import MentorLayout from "../MentorLayout";
import { 
  ChevronDown, Edit2, Loader2, CheckCircle2, Cloud, Activity, 
  Shield, Key, Trash2, Brain, Zap, BellRing, 
  Mail, Users, Star, Clock, Award, MessageSquare,
  TrendingUp, FileText, Camera, ShieldAlert
} from "lucide-react";
import Image from "next/image";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile Settings");
  const [syncStatus, setSyncStatus] = useState("Saved");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["Profile Settings", "Account Settings", "AI Preferences"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Functional UI State
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=11");
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassVerify, setDeletePassVerify] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Bhavendra Kumar",
    email: "bhavendra.kumar@gmail.com",
    expertise: "Mathematics, Physics, Chemistry",
    bio: "Passionate educator with 6+ years of experience in teaching and mentoring students.",
    language: "English",
    timezone: "(GMT+05:30) Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12 Hour",
    isOnline: true,
    liveQueries: true,
    maxStudents: "3",
    twoFactor: true,
    aiTone: "Encouraging",
    aiDifficulty: "Adaptive (Student Level)",
    aiInsights: true,
    aiAutoDraft: false,
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (!isEditing) {
      setSyncStatus("Saving...");
      const timer = setTimeout(() => {
        setSyncStatus("Saved");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [formData, isEditing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setSyncStatus("Saving...");
        setTimeout(() => setSyncStatus("Saved"), 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
        setSyncStatus("Saving...");
        setTimeout(() => setSyncStatus("Saved"), 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      setSyncStatus("Saving...");
      setTimeout(() => setSyncStatus("Saved"), 800);
    }
    setIsEditing(!isEditing);
  };

  const tabs = ["Profile Settings", "Account Settings", "AI Preferences"];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <MentorLayout>
          <section className="mt-4 px-1 max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3 md:mb-6 gap-3">
              <div>
                <h1 className="text-[15px] md:text-2xl font-black text-[#0D245B] tracking-tight mb-1 uppercase">Settings</h1>
                <p className="text-[#5B779E] font-bold text-[11px] md:text-[12px] uppercase tracking-wider">
                  Manage your account & preferences.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm transition-all w-fit">
                {syncStatus === "Saving..." ? (
                  <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                ) : (
                  <Cloud className="w-3.5 h-3.5 text-emerald-500" />
                )}
                <span className="text-[11px] font-black text-[#0D245B] uppercase tracking-widest">{syncStatus}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 mb-6 overflow-x-auto no-scrollbar w-full">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-2 mr-2 md:mr-4 font-black text-[9px] md:text-[12px] transition-all relative whitespace-nowrap uppercase tracking-widest ${
                    activeTab === tab 
                      ? "text-blue-600" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in duration-300" />
                  )}
                </button>
              ))}
            </div>

            {activeTab === "Profile Settings" && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-10 px-1">
                
                {/* Premium Profile Hero */}
                <div className="relative group overflow-hidden rounded-[20px] md:rounded-[32px] border border-slate-100 bg-white shadow-sm">
                  {/* Atmospheric Banner */}
                  <div className="h-28 md:h-44 relative overflow-hidden group/banner">
                    {bannerImage ? (
                      <Image 
                        src={bannerImage} 
                        alt="Profile Banner" 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover/banner:scale-105" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0D245B] to-[#0D3694]">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                      </div>
                    )}
                    
                    <button 
                      onClick={() => bannerInputRef.current?.click()}
                      className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-xl border border-white/20 text-white flex items-center gap-2 transition-all shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Banner</span>
                    </button>
                    <input type="file" ref={bannerInputRef} onChange={handleBannerUpload} accept="image/*" className="hidden" />
                  </div>

                  <div className="px-8 pb-8">
                    {/* Identity Row */}
                    <div className="flex flex-col items-center lg:flex-row lg:items-end gap-6 -mt-12 relative z-10 text-center lg:text-left">
                      <div 
                        className="relative group/photo cursor-pointer shrink-0"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-[18px] md:rounded-[24px] overflow-hidden border-[6px] border-white shadow-xl bg-slate-50 relative transition-transform duration-500 group-hover/photo:scale-[1.02]">
                           <Image 
                             src={profileImage}
                             alt="Profile Photo" 
                             width={112} 
                             height={112}
                             className="object-cover w-full h-full"
                           />
                           <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-300 backdrop-blur-sm">
                             <Cloud className="w-6 h-6 text-white mb-1" />
                             <span className="text-[10px] font-black text-white uppercase tracking-widest">Update</span>
                           </div>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                      </div>

                      <div className="flex-1 w-full lg:mb-2">
                        <div className="flex flex-col items-center lg:items-start md:flex-row md:items-center gap-3 mb-2">
                          {isEditing ? (
                            <input 
                              type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                              className="text-[20px] font-black text-[#0D245B] tracking-tight bg-slate-50 border-b border-blue-500 px-3 py-1 focus:outline-none rounded-t-xl w-full max-w-xs text-center lg:text-left uppercase"
                            />
                          ) : (
                            <h2 className="text-[16px] md:text-[22px] font-black text-[#0D245B] tracking-tight uppercase">{formData.fullName}</h2>
                          )}
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-100">Senior Mentor</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-slate-500 font-black text-[11px] uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#5B779E]" strokeWidth={2.5} />
                            {isEditing ? (
                              <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-transparent border-b border-slate-200 focus:border-blue-500 focus:outline-none py-0.5" />
                            ) : <span className="break-all">{formData.email}</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                            ID: MNT-88291
                          </div>
                        </div>
                      </div>

                      <div className="w-full lg:w-auto lg:mb-2">
                        <button 
                          onClick={toggleEdit}
                          className={`w-full lg:w-auto flex items-center justify-center gap-3 px-4 md:px-8 py-2.5 md:py-3.5 rounded-2xl font-black text-[10px] md:text-[12px] transition-all duration-300 shadow-lg uppercase tracking-[0.2em] active:scale-95 ${
                            isEditing 
                              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                              : 'bg-[#0D245B] text-white hover:bg-[#0D3694]'
                          }`}
                        >
                          {isEditing ? <CheckCircle2 className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                          {isEditing ? 'Save' : 'Edit Profile'}
                        </button>
                      </div>
                    </div>

                    {/* Unified Info Grid */}
                    <div className="mt-10 flex flex-col gap-8">
                      
                      {/* Stats Row */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Students', value: '1.2k+', icon: Users, color: 'blue' },
                          { label: 'Rating', value: '4.9', icon: Star, color: 'emerald' },
                          { label: 'Hours', value: '452h', icon: Clock, color: 'purple' },
                          { label: 'Score', value: '98%', icon: Zap, color: 'orange' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-slate-50/50 p-3 md:p-5 rounded-[16px] md:rounded-[24px] border border-slate-50 transition-all hover:bg-white hover:border-slate-100 hover:shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                              {/* Using literal strings instead of dynamic Tailwind classes for safety */}
                              <stat.icon 
                                className={`w-4 h-4 ${
                                  stat.color === 'blue' ? 'text-blue-500' :
                                  stat.color === 'emerald' ? 'text-emerald-500' :
                                  stat.color === 'purple' ? 'text-purple-500' :
                                  'text-orange-500'
                                }`} 
                                strokeWidth={2.5}
                              />
                              <p className="text-[8px] md:text-[10px] font-black text-[#5B779E] uppercase tracking-widest leading-none">{stat.label}</p>
                            </div>
                            <p className="text-[15px] md:text-[20px] font-black text-[#0D245B] leading-none uppercase tracking-tight">
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Content Area */}
                        <div className="lg:col-span-8 flex flex-col gap-8">
                          {/* Bio Section */}
                          <div className="space-y-4">
                            <h4 className="text-[11px] font-black text-[#5B779E] uppercase tracking-widest ml-1">About Me</h4>
                            <div className={`p-4 md:p-6 rounded-[20px] md:rounded-[28px] border transition-all ${isEditing ? 'bg-white border-blue-200' : 'bg-slate-50/50 border-slate-100'}`}>
                              {isEditing ? (
                                <textarea 
                                  name="bio" value={formData.bio} onChange={handleChange} rows={3}
                                  className="w-full bg-transparent border-none font-black text-[#0D245B] text-[13px] leading-relaxed focus:outline-none resize-none uppercase"
                                  placeholder="DESCRIBE YOUR JOURNEY..."
                                />
                              ) : (
                                <p className="text-[11px] md:text-[13px] font-black text-[#0D245B] leading-relaxed uppercase">
                                  "{formData.bio}"
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Details Row */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`flex items-center gap-4 p-3 md:p-5 rounded-[18px] md:rounded-[24px] border transition-all ${isEditing ? 'bg-white border-blue-200 shadow-sm' : 'bg-slate-50/50 border-slate-100 shadow-none'}`}>
                              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                                <Activity className="w-5 h-5" strokeWidth={2.5} />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="text-[8px] md:text-[10px] font-black text-[#5B779E] uppercase tracking-widest mb-1">Expertise</p>
                                {isEditing ? (
                                  <input 
                                    type="text" name="expertise" value={formData.expertise} onChange={handleChange}
                                    className="w-full bg-transparent border-none p-0 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none uppercase"
                                  />
                                ) : (
                                  <p className="text-[11px] md:text-[13px] font-black text-[#0D245B] truncate uppercase">{formData.expertise}</p>
                                )}
                              </div>
                            </div>

                            <div className={`flex items-center gap-4 p-3 md:p-5 rounded-[18px] md:rounded-[24px] border transition-all ${isEditing ? 'bg-white border-blue-200 shadow-sm' : 'bg-slate-50/50 border-slate-100 shadow-none'}`}>
                              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm shrink-0">
                                <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
                              </div>
                              <div className="flex-1">
                                <p className="text-[8px] md:text-[10px] font-black text-[#5B779E] uppercase tracking-widest mb-1">Language</p>
                                {isEditing ? (
                                  <input 
                                    type="text" name="language" value={formData.language} onChange={handleChange}
                                    className="w-full bg-transparent border-none p-0 text-[11px] md:text-[13px] font-black text-[#0D245B] focus:outline-none uppercase"
                                  />
                                ) : (
                                  <p className="text-[11px] md:text-[13px] font-black text-[#0D245B] uppercase">{formData.language}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Presence Sidebar */}
                        <div className="lg:col-span-4 h-full">
                          <div className="bg-slate-50/50 rounded-[20px] md:rounded-[28px] p-4 md:p-6 border border-slate-100 h-full">
                            <h4 className="text-[11px] font-black text-[#5B779E] uppercase tracking-widest mb-6 ml-1">Live Presence</h4>
                            <div className="space-y-4">
                              {[
                                { label: 'ONLINE STATUS', field: 'isOnline', icon: Activity, color: 'emerald' },
                                { label: 'LIVE QUERIES', field: 'liveQueries', icon: Zap, color: 'blue' }
                              ].map((item, i) => {
                                type BooleanField = 'isOnline' | 'liveQueries';
                                const field = item.field as BooleanField;
                                return (
                                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-[20px] border border-slate-100 shadow-sm group">
                                    <div className="flex items-center gap-3">
                                      {/* Literal color strings for safety */}
                                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <item.icon className="w-5 h-5" strokeWidth={2.5} />
                                      </div>
                                      <span className="text-[10px] md:text-[12px] font-black text-[#0D245B] uppercase tracking-tight">{item.label}</span>
                                    </div>
                                    <button 
                                      onClick={() => setFormData(prev => ({...prev, [field]: !prev[field] }))}
                                      className={`w-11 h-6 rounded-full transition-all relative ${formData[field] ? (item.color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500') : 'bg-slate-200'}`}
                                    >
                                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${formData[field] ? 'left-6' : 'left-1'}`} />
                                    </button>
                                  </div>
                                );
                              })}

                              <div className="p-4 bg-white rounded-xl border border-slate-100">
                                <p className="text-[9px] font-black text-[#5B779E] uppercase tracking-widest mb-3">MAX STUDENTS</p>
                                <div className="relative">
                                  <select 
                                    name="maxStudents" value={formData.maxStudents} onChange={handleChange}
                                    className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 text-[12px] font-black text-[#0D245B] appearance-none cursor-pointer focus:ring-4 focus:ring-blue-500/5 transition-all uppercase"
                                  >
                                    <option value="1">1 STUDENT</option>
                                    <option value="3">UP TO 3</option>
                                    <option value="5">UP TO 5</option>
                                  </select>
                                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Account Settings */}
            {activeTab === "Account Settings" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 px-1">
                <div className="bg-white border border-slate-100 rounded-[20px] md:rounded-[32px] p-4 md:p-8 shadow-sm group">
                  <div className="flex items-center gap-4 mb-5 md:mb-10">
                    <div className="w-14 h-14 rounded-[20px] bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                      <Shield className="w-7 h-7" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[12px] md:text-[15px] font-black text-[#0D245B] uppercase tracking-tight">Access Control</h3>
                      <p className="text-[9px] md:text-[11px] text-[#5B779E] font-black uppercase tracking-widest leading-none mt-1">Maintain security keys</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-[#5B779E] px-2 uppercase tracking-widest">Present Key</label>
                      <div className="relative">
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] px-3 md:px-5 py-2.5 md:py-4 font-black text-[#0D245B] focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-[11px] md:text-[13px] uppercase" />
                        <Key className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-[#5B779E] px-2 uppercase tracking-widest">New Requirement</label>
                      <input 
                        type="password" 
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="ENTER SECURE PASSWORD" 
                        className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] px-3 md:px-5 py-2.5 md:py-4 font-black text-[#0D245B] focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-[11px] md:text-[13px] uppercase" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-[#5B779E] px-2 uppercase tracking-widest">Verify New Key</label>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="REPEAT PASSWORD" 
                        className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] px-3 md:px-5 py-2.5 md:py-4 font-black text-[#0D245B] focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-[11px] md:text-[13px] uppercase" 
                      />
                    </div>

                    <button className="w-full py-4.5 bg-[#0D245B] text-white font-black text-[10px] md:text-[12px] rounded-2xl shadow-xl shadow-blue-900/10 hover:bg-[#0D3694] transition-all uppercase tracking-[0.2em] mt-2 active:scale-95">
                      Commit Security Changes
                    </button>
                    
                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[20px] bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                          <BellRing className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-[11px] md:text-[14px] font-black text-[#0D245B] uppercase tracking-tight">Dual-Factor Verification</h4>
                          <p className="text-[9px] md:text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-0.5">Active Protection</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFormData(prev => ({...prev, twoFactor: !prev.twoFactor }))}
                        className={`w-12 h-6.5 rounded-full transition-all relative shrink-0 ${formData.twoFactor ? 'bg-emerald-500' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-4.5 h-4.5 rounded-full bg-white shadow-md transition-all ${formData.twoFactor ? 'left-6.5' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-red-50/20 border border-red-100 rounded-[20px] md:rounded-[32px] p-4 md:p-8 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                       <Trash2 className="w-24 h-24 text-red-600" />
                    </div>
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className="w-14 h-14 rounded-[20px] bg-red-100 text-red-600 flex items-center justify-center">
                        <Trash2 className="w-7 h-7" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-[12px] md:text-[15px] font-black text-red-600 uppercase tracking-tight">Critical Warning</h3>
                    </div>
                    <p className="text-[10px] md:text-[12px] text-[#0D245B] font-black mb-8 leading-relaxed relative z-10 uppercase tracking-widest opacity-80">
                      TERMINATING YOUR SESSION WILL PERMANENTLY ERASE YOUR TRAINING MODELS AND ASSIGNED STUDENT DATA. THIS CANNOT BE REVERTED.
                    </p>
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-[10px] md:text-[12px] py-4.5 rounded-2xl shadow-xl shadow-red-500/20 transition-all relative z-10 uppercase tracking-[0.2em] active:scale-95"
                    >
                      Purge All Data
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#0D245B] to-[#0D3694] rounded-[20px] md:rounded-[32px] p-4 md:p-8 text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left">
                        <h4 className="text-[12px] md:text-[15px] font-black mb-1 uppercase tracking-tight">Recovery Protocols</h4>
                        <p className="text-[9px] md:text-[11px] text-blue-200 font-black uppercase tracking-widest">Fallback authentication codes</p>
                      </div>
                      <button className="w-full md:w-auto px-8 py-3.5 bg-white/20 hover:bg-white/30 rounded-2xl font-black text-[10px] md:text-[12px] transition-all border border-white/20 uppercase tracking-widest backdrop-blur-md">Generate List</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Preferences */}
            {activeTab === "AI Preferences" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 px-1">
                <div className="bg-white border border-slate-100 rounded-[20px] md:rounded-[32px] p-4 md:p-8 shadow-sm group">
                  <div className="flex items-center gap-4 mb-5 md:mb-10">
                    <div className="w-14 h-14 rounded-[20px] bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm group-hover:rotate-12 transition-all">
                      <Brain className="w-7 h-7" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[12px] md:text-[15px] font-black text-[#0D245B] uppercase tracking-tight">Algorithm Tuning</h3>
                      <p className="text-[9px] md:text-[11px] text-[#5B779E] font-black uppercase tracking-widest mt-1">Cognitive behavior settings</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#5B779E] px-2 uppercase tracking-widest">Communication Tone</label>
                      <div className="relative">
                        <select name="aiTone" value={formData.aiTone} onChange={handleChange} className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] px-5 py-4 text-[13px] font-black text-[#0D245B] appearance-none focus:ring-4 focus:ring-indigo-500/5 transition-all cursor-pointer uppercase">
                          <option>Encouraging & Support</option>
                          <option>Strict & Discipline</option>
                          <option>Professional Academy</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#5B779E] px-2 uppercase tracking-widest">Scaling Precision</label>
                      <div className="relative">
                        <select name="aiDifficulty" value={formData.aiDifficulty} onChange={handleChange} className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] px-5 py-4 text-[13px] font-black text-[#0D245B] appearance-none focus:ring-4 focus:ring-indigo-500/5 transition-all cursor-pointer uppercase">
                          <option>Adaptive Student-Sync</option>
                          <option>Fixed Competitive</option>
                          <option>Foundational Only</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="pt-6 space-y-4">
                      {[
                        { label: 'Deep Context Insights', field: 'aiInsights', desc: 'FAIL-SAFE PREDICTIONS ENABLED' },
                        { label: 'Auto-Response Drafting', field: 'aiAutoDraft', desc: 'INSTANT FEEDBACK GENERATION' }
                      ].map((item, i) => {
                        type BooleanField = 'aiInsights' | 'aiAutoDraft';
                        const field = item.field as BooleanField;
                        return (
                          <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-[24px] border border-slate-50 hover:bg-white hover:border-slate-100 transition-all group/toggle">
                            <div>
                                <h4 className="text-[14px] font-black text-[#0D245B] uppercase tracking-tight">{item.label}</h4>
                                <p className="text-[10px] text-[#5B779E] font-black uppercase tracking-widest mt-1">{item.desc}</p>
                            </div>
                            <button 
                              onClick={() => setFormData(prev => ({...prev, [field]: !prev[field] }))}
                              className={`w-12 h-6.5 rounded-full transition-all relative shrink-0 ${formData[field] ? 'bg-indigo-600 shadow-lg shadow-indigo-900/10' : 'bg-slate-200'}`}
                            >
                              <div className={`absolute top-1 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-all ${formData[field] ? 'left-6.5' : 'left-1'}`} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 text-white shadow-2xl group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Zap className="w-32 h-32 text-indigo-400" />
                  </div>
                  <div className="flex items-center gap-5 mb-12 relative z-10">
                    <div className="w-14 h-14 rounded-[20px] bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                      <Zap className="w-7 h-7" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-black text-white uppercase tracking-tight">Sync Engine</h3>
                      <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-1">External persona training</p>
                    </div>
                  </div>
                  
                  <div className="space-y-10 relative z-10">
                    <div className="p-7 bg-white/5 rounded-[28px] border border-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-all">
                      <div className="flex justify-between items-center mb-5">
                        <p className="text-[11px] text-indigo-400 font-black uppercase tracking-widest">Active Intelligence</p>
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                      </div>
                      <div className="flex items-center justify-between font-black text-[18px] text-white">
                        <span className="uppercase tracking-tight">Senior Educator V.4</span>
                        <div className="flex gap-2">
                          {[1,2,3,4,5].map(i => <div key={i} className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />)}
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[12px] py-4.5 rounded-2xl transition-all shadow-xl shadow-indigo-900/40 uppercase tracking-[0.2em] active:scale-95">
                      Synchronize Intelligence
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </MentorLayout>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowDeleteModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-[30px] bg-red-50 text-red-500 flex items-center justify-center mb-8 shadow-inner border border-red-100">
                <ShieldAlert className="w-10 h-10" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black text-[#0D245B] mb-2 uppercase tracking-tight">Final Authorization</h2>
              <p className="text-[#5B779E] font-black text-[12px] mb-10 leading-relaxed uppercase tracking-widest">
                THIS ACTION WILL WIPE ALL CLOUD RECORDS. PROVIDE YOUR <span className="text-red-500">MASTER KEY</span> TO PROCEED WITH DELETION.
              </p>
              
              <div className="w-full space-y-4">
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="ENTER PASSWORD" 
                    value={deletePassVerify}
                    onChange={(e) => setDeletePassVerify(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] px-6 py-5 font-black text-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all text-[15px] text-center uppercase"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-4.5 rounded-2xl font-black text-[12px] text-[#5B779E] uppercase tracking-widest hover:bg-slate-50 transition-all order-2 sm:order-1"
                  >
                    Abort
                  </button>
                  <button 
                    disabled={!deletePassVerify}
                    className="flex-[1.5] py-4.5 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:grayscale text-white font-black text-[12px] rounded-2xl shadow-xl shadow-red-500/20 transition-all order-1 sm:order-2 uppercase tracking-[0.2em] active:scale-95"
                  >
                    Authorize Deletion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E2E8F0; border-radius: 20px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
