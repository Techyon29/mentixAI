"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
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
    <div className="relative w-full min-h-screen bg-[#F0F5FA] overflow-hidden font-sans text-slate-800">
      <div className="relative z-10 flex h-screen p-4 gap-6">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <Navbar />
          
          <section className="mt-8 px-2 max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h1 className="text-[32px] font-black text-[#0D245B] tracking-tight mb-1">Settings</h1>
                <p className="text-slate-500 font-medium text-[15px]">
                  Manage your real-time presence and account preferences.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-sm transition-all">
                {syncStatus === "Saving..." ? (
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                ) : (
                  <Cloud className="w-4 h-4 text-emerald-500" />
                )}
                <span className="text-[13px] font-bold text-[#0D245B]">{syncStatus}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200/60 mb-8 overflow-x-auto hide-scrollbar px-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 mr-10 font-bold text-[15px] transition-all relative whitespace-nowrap ${
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
              <div className="flex flex-col gap-8 animate-in fade-in duration-700">
                
                {/* Premium Profile Hero */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[48px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                  <div className="relative bg-white/80 backdrop-blur-2xl border border-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden">
                    
                    {/* Atmospheric Banner (LinkedIn/YouTube Style) */}
                    <div className="h-52 relative overflow-hidden group/banner">
                      {bannerImage ? (
                        <Image 
                          src={bannerImage} 
                          alt="Profile Banner" 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover/banner:scale-105" 
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2A75FF] to-[#0D3694]">
                          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        </div>
                      )}
                      
                      {/* Banner Edit Trigger */}
                      <button 
                        onClick={() => bannerInputRef.current?.click()}
                        className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-xl border border-white/20 text-white flex items-center gap-2 transition-all opacity-0 group-hover/banner:opacity-100 translate-y-2 group-hover/banner:translate-y-0 shadow-lg"
                      >
                        <Camera className="w-5 h-5" />
                        <span className="text-[12px] font-black uppercase tracking-widest">Change Banner</span>
                      </button>
                      <input type="file" ref={bannerInputRef} onChange={handleBannerUpload} accept="image/*" className="hidden" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="px-10 pb-10">
                      {/* Identity Row */}
                      <div className="flex flex-col lg:flex-row items-end gap-8 -mt-16 relative z-10">
                        <div 
                          className="relative group/photo cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="w-40 h-40 rounded-[40px] overflow-hidden border-[8px] border-white shadow-2xl bg-slate-100 relative transition-transform duration-500 group-hover/photo:scale-[1.02]">
                             <Image 
                               src={profileImage}
                               alt="Profile Photo" 
                               width={160} 
                               height={160}
                               className="object-cover w-full h-full"
                             />
                             <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-300 backdrop-blur-sm">
                               <Cloud className="w-8 h-8 text-white mb-2" />
                               <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Change Photo</span>
                             </div>
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                          </div>
                          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                        </div>

                        <div className="flex-1 mb-4">
                          <div className="flex items-center gap-3 mb-2">
                            {isEditing ? (
                              <input 
                                type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                className="text-3xl font-black text-[#2A75FF] tracking-tight bg-blue-50/50 border-b-2 border-[#2A75FF] px-2 py-1 focus:outline-none rounded-t-xl w-full max-w-md"
                              />
                            ) : (
                              <h2 className="text-3xl font-black text-[#2A75FF] tracking-tight">{formData.fullName}</h2>
                            )}
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 whitespace-nowrap">Senior Mentor</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-5 text-slate-500 font-bold text-[14px]">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-blue-500" />
                              {isEditing ? (
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-transparent border-b border-slate-200 focus:border-blue-500 focus:outline-none py-0.5" />
                              ) : formData.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-emerald-500" />
                              ID: MNT-88291
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <button 
                            onClick={toggleEdit}
                            className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-[14px] transition-all duration-300 shadow-xl hover:-translate-y-1 active:translate-y-0 ${
                              isEditing 
                                ? 'bg-emerald-500 text-white shadow-emerald-500/25 hover:bg-emerald-600' 
                                : 'bg-[#2A75FF] text-white shadow-[#2A75FF]/20 hover:bg-[#0D3694]'
                            }`}
                          >
                            {isEditing ? <CheckCircle2 className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                          </button>
                        </div>
                      </div>

                    {/* Unified Info Grid - Identical in both modes */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                      
                      {/* Stats Row (Always same) */}
                      <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-slate-100">
                        {[
                          { label: 'Total Students', value: '1.2k+', icon: Users, color: 'blue' },
                          { label: 'Avg. Rating', value: '4.9', sub: '/ 5.0', icon: Star, color: 'emerald' },
                          { label: 'Hours Taught', value: '452h', icon: Clock, color: 'purple' },
                          { label: 'Live Score', value: '98%', icon: Zap, color: 'orange' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-slate-50/50 p-5 rounded-[24px] border border-slate-100 transition-all hover:bg-white hover:shadow-md group">
                            <div className="flex items-center gap-2 mb-2">
                              <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-500`} />
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                            <p className="text-2xl font-black text-[#2A75FF]">
                              {stat.value} {stat.sub && <span className="text-sm text-slate-400 font-bold">{stat.sub}</span>}
                            </p>
                          </div>
                        ))}
                      </div>

                        {/* Content Area */}
                        <div className="lg:col-span-8 flex flex-col gap-10">
                          {/* Bio Section */}
                          <div className="space-y-4">
                            {isEditing && <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">About the Mentor</h4>}
                            <div className={`p-6 rounded-[32px] border transition-all min-h-[160px] flex items-center ${isEditing ? 'bg-white border-blue-500/30 ring-4 ring-blue-500/5' : 'bg-slate-50/50 border-slate-100'}`}>
                              {isEditing ? (
                                <textarea 
                                  name="bio" value={formData.bio} onChange={handleChange} rows={4}
                                  className="w-full bg-transparent border-none font-bold text-slate-600 text-lg leading-relaxed italic focus:outline-none resize-none"
                                  placeholder="Describe your mentorship journey..."
                                />
                              ) : (
                                <p className="text-lg font-bold text-slate-600 leading-relaxed italic">
                                  "{formData.bio}"
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Details Row */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Expertise Card */}
                            <div className={`flex items-center gap-4 p-5 rounded-3xl border transition-all ${isEditing ? 'bg-white border-blue-500/30 ring-4 ring-blue-500/5' : 'bg-slate-50/50 border-slate-100'}`}>
                              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <Activity className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                {isEditing && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expertise</p>}
                                {isEditing ? (
                                  <input 
                                    type="text" name="expertise" value={formData.expertise} onChange={handleChange}
                                    className="w-full bg-transparent border-none p-0 text-[15px] font-black text-[#2A75FF] focus:outline-none"
                                  />
                                ) : (
                                  <p className="text-[15px] font-black text-[#2A75FF]">{formData.expertise}</p>
                                )}
                              </div>
                            </div>

                            {/* Language Card */}
                            <div className={`flex items-center gap-4 p-5 rounded-3xl border transition-all ${isEditing ? 'bg-white border-blue-500/30 ring-4 ring-blue-500/5' : 'bg-slate-50/50 border-slate-100'}`}>
                              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                                <MessageSquare className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                {isEditing && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Communication</p>}
                                {isEditing ? (
                                  <input 
                                    type="text" name="language" value={formData.language} onChange={handleChange}
                                    className="w-full bg-transparent border-none p-0 text-[15px] font-black text-[#2A75FF] focus:outline-none"
                                  />
                                ) : (
                                  <p className="text-[15px] font-black text-[#2A75FF]">{formData.language} (Native)</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                      {/* Presence Sidebar */}
                      <div className="lg:col-span-4">
                        <div className="bg-white/70 backdrop-blur-md rounded-[40px] p-8 border border-white/60 shadow-sm h-full">
                          <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Real-time Presence</h4>
                          <div className="space-y-6">
                            {[
                              { label: 'Online Status', field: 'isOnline', icon: Activity, color: 'emerald' },
                              { label: 'Live Handoffs', field: 'liveQueries', icon: Zap, color: 'blue' }
                            ].map((item, i) => {
                              type BooleanField = 'isOnline' | 'liveQueries';
                              const field = item.field as BooleanField;
                              return (
                                <div key={i} className="flex items-center justify-between p-5 bg-white/50 rounded-2xl border border-slate-100 transition-all hover:scale-[1.02]">
                                  <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-${item.color}-50 text-${item.color}-500 flex items-center justify-center`}>
                                      <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[15px] font-black text-[#0D245B]">{item.label}</span>
                                  </div>
                                  <button 
                                    onClick={() => setFormData(prev => ({...prev, [field]: !prev[field] }))}
                                    className={`w-14 h-7 rounded-full transition-all relative ${formData[field] ? `bg-${item.color}-500` : 'bg-slate-200'}`}
                                  >
                                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${formData[field] ? 'left-8' : 'left-1'}`} />
                                  </button>
                                </div>
                              );
                            })}

                            <div className="p-6 bg-white/50 rounded-2xl border border-slate-100">
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Active Capacity</p>
                              <div className="relative">
                                <select 
                                  name="maxStudents" value={formData.maxStudents} onChange={handleChange}
                                  className="w-full bg-slate-100/50 border-none rounded-xl px-5 py-3 text-[14px] font-black text-[#2A75FF] appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/10 transition-all"
                                >
                                  <option value="1">1 Student</option>
                                  <option value="3">Up to 3 Students</option>
                                  <option value="5">Up to 5 Students</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>

                {/* Additional Sections could go here */}
              </div>
            )}
            
            {/* Account Settings */}
            {activeTab === "Account Settings" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group transition-all hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#2A75FF]">Security & Access</h3>
                      <p className="text-[13px] text-slate-400 font-bold">Manage your credentials and MFA</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[12px] font-black text-slate-400 ml-2 uppercase tracking-widest">Current Password</label>
                      <div className="relative">
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#2A75FF] focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                        <Key className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-black text-slate-400 ml-2 uppercase tracking-widest">New Password</label>
                      <input 
                        type="password" 
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Min. 8 characters" 
                        className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#2A75FF] focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-black text-slate-400 ml-2 uppercase tracking-widest">Confirm Password</label>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat new password" 
                        className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#2A75FF] focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
                      />
                    </div>

                    <button className="w-full py-4 bg-blue-50 text-[#2A75FF] font-black text-[14px] rounded-2xl border border-blue-100 hover:bg-[#2A75FF] hover:text-white transition-all shadow-sm">
                      Update Security Credentials
                    </button>
                    
                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <BellRing className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-black text-[#0D245B]">Two-Factor (2FA)</h4>
                          <p className="text-[12px] text-slate-400 font-bold">Highly recommended for mentors</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFormData(prev => ({...prev, twoFactor: !prev.twoFactor }))}
                        className={`w-14 h-7 rounded-full transition-all relative ${formData.twoFactor ? 'bg-emerald-500' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${formData.twoFactor ? 'left-8' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-red-50/30 backdrop-blur-md border border-red-100/50 rounded-[40px] p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                        <Trash2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-red-600">Danger Zone</h3>
                    </div>
                    <p className="text-[14px] text-red-800/60 font-bold mb-8 leading-relaxed relative z-10">
                      Once deleted, your profile, history, and student records are permanently wiped. Mentorships will be reassigned instantly.
                    </p>
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-[14px] py-4 rounded-2xl shadow-xl shadow-red-500/20 hover:-translate-y-1 active:translate-y-0 transition-all relative z-10"
                    >
                      Terminate Account
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#2A75FF] to-[#0D3694] rounded-[40px] p-8 text-white relative overflow-hidden group shadow-xl shadow-blue-500/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-black mb-1">Backup Access</h4>
                        <p className="text-[13px] text-white/70 font-bold">Generate emergency recovery codes</p>
                      </div>
                      <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-[13px] transition-all border border-white/20 hover:scale-105 active:scale-95">Generate</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Preferences */}
            {activeTab === "AI Preferences" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                      <Brain className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#0D245B]">AI Assistant Persona</h3>
                      <p className="text-[13px] text-slate-400 font-bold">Tailor the AI's interaction style</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[12px] font-black text-slate-400 ml-2 uppercase tracking-widest">Feedback Tone</label>
                      <div className="relative">
                        <select 
                          name="aiTone" value={formData.aiTone} onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#0D245B] appearance-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
                        >
                          <option>Encouraging</option>
                          <option>Strict & Professional</option>
                          <option>Socratic (Ask Questions)</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[12px] font-black text-slate-400 ml-2 uppercase tracking-widest">Generation Difficulty</label>
                      <div className="relative">
                        <select 
                          name="aiDifficulty" value={formData.aiDifficulty} onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#0D245B] appearance-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
                        >
                          <option>Adaptive (Student Level)</option>
                          <option>Slightly Challenging (+1 Level)</option>
                          <option>Remedial (Focus on Basics)</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Zap className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#0D245B]">AI Automation</h3>
                      <p className="text-[13px] text-slate-400 font-bold">Smart background tasks</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-black text-[#0D245B]">Proactive Insights</h4>
                          <p className="text-[12px] text-slate-400 font-bold">Auto-detect learning gaps</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFormData(prev => ({...prev, aiInsights: !prev.aiInsights }))}
                        className={`w-14 h-7 rounded-full transition-all relative ${formData.aiInsights ? 'bg-orange-500' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${formData.aiInsights ? 'left-8' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-black text-[#0D245B]">Auto-Remedials</h4>
                          <p className="text-[12px] text-slate-400 font-bold">Pre-build tests for weak topics</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFormData(prev => ({...prev, aiAutoDraft: !prev.aiAutoDraft }))}
                        className={`w-14 h-7 rounded-full transition-all relative ${formData.aiAutoDraft ? 'bg-blue-600' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${formData.aiAutoDraft ? 'left-8' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowDeleteModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-[30px] bg-red-50 text-red-500 flex items-center justify-center mb-6 shadow-inner">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Final Confirmation</h2>
              <p className="text-slate-500 font-medium text-[15px] mb-8 leading-relaxed">
                This action is irreversible. Please enter your <span className="font-bold text-slate-900">current password</span> to authorize the permanent deletion of your account.
              </p>
              
              <div className="w-full space-y-4">
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Enter password" 
                    value={deletePassVerify}
                    onChange={(e) => setDeletePassVerify(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#2A75FF] focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-400 transition-all"
                  />
                  <Key className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-4 rounded-2xl font-black text-[14px] text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={!deletePassVerify}
                    className="flex-[1.5] py-4 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:grayscale text-white font-black text-[14px] rounded-2xl shadow-lg shadow-red-500/20 transition-all"
                  >
                    Confirm Delete
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
