"use client";

import React, { useState, useEffect } from 'react';
import StudentLayout from '../StudentLayout';
import { 
  User, 
  Shield, 
  Bell, 
  Camera, 
  CheckCircle2,
  LogOut,
  Loader2,
  Cloud,
  Edit2,
  Key,
  Lock
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'Saved' | 'Saving' | 'Offline'>('Saved');

  const [formData, setFormData] = useState({
    fullName: "Bhavey Chandna",
    email: "bhavey.m@example.com",
    studentId: "MTX-9821",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: {
      testReminders: true,
      performanceReports: true,
      mentorshipUpdates: true,
      systemAlerts: false
    }
  });

  useEffect(() => {
    if (syncStatus === 'Saving' || isEditing) return;
    
    const handler = setTimeout(() => {
      // Simulate API sync
      setSyncStatus('Saving');
      setTimeout(() => setSyncStatus('Saved'), 1000);
    }, 500);

    return () => clearTimeout(handler);
  }, [formData, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSyncStatus('Saving');
    setTimeout(() => {
      setSyncStatus('Saved');
      setIsEditing(false);
    }, 1000);
  };

  const toggleNotification = (key: keyof typeof formData.notifications) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security & Auth', icon: Shield },
    { id: 'notifications', label: 'Alert Prefs', icon: Bell },
  ];

  return (
    <StudentLayout>
          <div className="max-w-6xl mx-auto w-full px-1 py-4 md:py-8">
            <header className="mb-10 px-1 animate-in fade-in duration-500 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="w-full">
                <h1 className="text-xl md:text-2xl font-black text-[#0D245B] tracking-tight uppercase">System Settings</h1>
                <p className="text-[#5B779E] text-[10px] font-black uppercase tracking-widest mt-1">Configure account access & performance tracking</p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm w-full md:w-auto justify-center md:justify-start">
                {syncStatus === 'Saving' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#5B779E]">Syncing Profile...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#5B779E]">Cloud integrity verified</span>
                  </>
                )}
              </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
               {/* Navigation Sidebar */}
               <div className="w-full lg:w-72 bg-white rounded-[28px] p-4 shadow-sm border border-slate-100 flex flex-col gap-2 animate-in fade-in slide-in-from-left-6 duration-500">
                  <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 no-scrollbar">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-4 px-5 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap ${
                          activeTab === tab.id 
                          ? 'bg-[#0D245B] text-white shadow-xl shadow-blue-900/10' 
                          : 'text-[#5B779E] hover:bg-slate-50 border border-transparent hover:border-slate-100'
                        }`}
                      >
                        <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-200' : 'text-slate-400'}`} />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="hidden lg:block h-px bg-slate-50 my-4 mx-2" />
                  <button className="flex items-center gap-4 px-5 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all whitespace-nowrap border border-transparent hover:border-red-100">
                    <LogOut className="w-4 h-4" />
                    Revoke Access
                  </button>
               </div>

               {/* Settings Panels */}
               <div className="flex-1 w-full animate-in fade-in slide-in-from-right-6 duration-500 delay-100">
                  <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-slate-100 min-h-[600px]">
                    
                    {activeTab === 'profile' && (
                      <div className="animate-in fade-in duration-500">
                        {/* Profile Header/Avatar */}
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                           <div className="relative group/avatar">
                              <div className="w-28 h-28 md:w-36 md:h-36 rounded-[32px] bg-slate-50 border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden transition-all group-hover/avatar:scale-105">
                                <div className="w-full h-full bg-gradient-to-br from-[#0D245B] to-blue-600 flex items-center justify-center text-3xl font-black text-white">
                                  {formData.fullName.split(' ').map(n => n[0]).join('')}
                                </div>
                              </div>
                              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-slate-100 rounded-xl shadow-xl flex items-center justify-center text-blue-600 hover:bg-[#0D245B] hover:text-white transition-all transform active:scale-90">
                                <Camera className="w-5 h-5" />
                              </button>
                           </div>

                           <div className="flex-1 text-center md:text-left">
                              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                 <h2 className="text-2xl font-black text-[#0D245B] uppercase tracking-tight">{formData.fullName}</h2>
                                 <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest self-center md:self-auto">Account Verified</span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                 <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-50">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Student ID</p>
                                    <p className="text-[13px] font-black text-[#0D245B]">{formData.studentId}</p>
                                 </div>
                                 <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-50">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                                    <p className="text-[13px] font-black text-emerald-600">ACTIVE</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Edit Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Identity Name</label>
                              <div className="relative group">
                                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                 <input 
                                    name="fullName"
                                    disabled={!isEditing}
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-black text-[#0D245B] outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all disabled:opacity-70"
                                 />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Email Address</label>
                              <div className="relative group">
                                 <Cloud className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                 <input 
                                    name="email"
                                    disabled={!isEditing}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-black text-[#0D245B] outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all disabled:opacity-70"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                           <div className="hidden md:block">
                              <p className="text-[11px] font-black text-[#5B779E] uppercase tracking-widest">Last synced 2 minutes ago</p>
                           </div>
                           <div className="flex items-center gap-4 w-full md:w-auto">
                              {!isEditing ? (
                                <button 
                                  onClick={() => setIsEditing(true)}
                                  className="w-full md:w-auto px-8 py-4 bg-white border border-slate-100 text-[#0D245B] font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95"
                                >
                                  Edit Account
                                </button>
                              ) : (
                                <>
                                  <button onClick={() => setIsEditing(false)} className="px-6 py-4 text-[#5B779E] font-black text-[11px] uppercase tracking-widest hover:text-red-500">Discard</button>
                                  <button onClick={handleSave} className="w-full md:w-auto px-8 py-4 bg-[#0D245B] text-white font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95">Save Profile Changes</button>
                                </>
                              )}
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'security' && (
                      <div className="animate-in fade-in duration-500">
                        <div className="mb-10">
                           <h3 className="text-[18px] font-black text-[#0D245B] uppercase tracking-tight mb-2">Access Control</h3>
                           <p className="text-[#5B779E] text-[11px] font-black uppercase tracking-widest">Manage your credentials and encryption settings</p>
                        </div>

                        <div className="space-y-8 max-w-2xl">
                          <div className="p-8 bg-slate-50/50 rounded-[32px] border border-slate-50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                               <Shield className="w-24 h-24 text-[#0D245B]" />
                            </div>
                            
                            <div className="relative space-y-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Access Key</label>
                                <input 
                                  type="password" 
                                  placeholder="••••••••"
                                  className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-[13px] font-black text-[#0D245B] outline-none focus:ring-4 focus:ring-blue-500/5 transition-all" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">New Key Requirement</label>
                                <input 
                                  type="password" 
                                  placeholder="Enter new strong password"
                                  className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-[13px] font-black text-[#0D245B] outline-none focus:ring-4 focus:ring-blue-500/5 transition-all" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Verify New Key</label>
                                <input 
                                  type="password" 
                                  placeholder="Confirm your new password"
                                  className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-[13px] font-black text-[#0D245B] outline-none focus:ring-4 focus:ring-blue-500/5 transition-all" 
                                />
                              </div>
                              
                              <button className="w-full py-4 bg-[#0D245B] text-white font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all active:scale-[0.98] mt-4">
                                Update Authentication
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'notifications' && (
                       <div className="animate-in fade-in duration-500">
                          <div className="mb-10">
                            <h3 className="text-[18px] font-black text-[#0D245B] uppercase tracking-tight mb-2">Notification Streams</h3>
                            <p className="text-[#5B779E] text-[11px] font-black uppercase tracking-widest">Configure how you receive system alerts</p>
                          </div>

                          <div className="space-y-4">
                            {Object.entries(formData.notifications).map(([key, value]) => (
                               <div key={key} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-50 hover:bg-white hover:border-slate-100 transition-all">
                                  <div>
                                     <h4 className="text-[13px] font-black text-[#0D245B] uppercase tracking-tight">{key.replace(/([A-Z])/g, ' $1')}</h4>
                                     <p className="text-[10px] font-black text-[#5B779E] uppercase tracking-widest mt-0.5">Stream live updates to your dashboard</p>
                                  </div>
                                  <button 
                                     onClick={() => toggleNotification(key as keyof typeof formData.notifications)}
                                     className={`w-12 h-6 rounded-full p-1 transition-all ${value ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                  >
                                     <div className={`w-4 h-4 bg-white rounded-full transition-all transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
                                  </button>
                               </div>
                            ))}
                          </div>
                       </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
    </StudentLayout>
  );
};

export default Settings;

