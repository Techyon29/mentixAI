"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
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
    <div className="relative w-full min-h-screen bg-[#F4F6FB] overflow-hidden font-sans text-slate-800">
      <div className="relative z-10 flex h-screen p-3 gap-6">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-y-auto pr-3 pb-8 custom-scrollbar">
          <Navbar />

          <div className="p-6">
            <header className="mb-10 animate-in fade-in duration-500 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-[#0D3694] tracking-tight">System Settings</h1>
                <p className="text-slate-400 font-bold mt-2">Manage your account preferences and security.</p>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                {syncStatus === 'Saving' ? (
                  <>
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    <span className="text-sm font-bold text-slate-500">Syncing Changes...</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-500">Auto-saved to Cloud</span>
                  </>
                )}
              </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
               {/* Fixed Tabs Sidebar */}
               <div className="w-full lg:w-80 bg-white rounded-[40px] p-6 shadow-sm border border-slate-100 flex flex-col gap-2 animate-in fade-in slide-in-from-left-6 duration-500">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                  <div className="h-px bg-slate-100 my-4" />
                  <button className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all">
                    <LogOut className="w-5 h-5" />
                    Sign Out Access
                  </button>
               </div>

               {/* Dynamic Settings Content */}
               <div className="flex-1 w-full animate-in fade-in slide-in-from-right-6 duration-500 delay-100">
                  <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100">
                    
                    {activeTab === 'profile' && (
                      <div className="animate-in fade-in duration-500">
                        {/* Redesigned Profile Identity Card */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/30 rounded-[32px] border border-slate-100 p-8 mb-10 group transition-all hover:shadow-xl hover:shadow-blue-500/5">
                          {/* Background Deco Elements */}
                          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-600/5 rounded-full -ml-10 -mb-10 blur-2xl" />

                          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-10">
                            {/* Avatar Section */}
                            <div className="relative">
                              <div className="w-40 h-40 rounded-[48px] bg-white p-2 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                                <div className="w-full h-full rounded-[40px] bg-gradient-to-br from-[#0D3694] to-blue-500 flex items-center justify-center text-5xl font-black text-white shadow-inner">
                                  {formData.fullName.split(' ').map(n => n[0]).join('')}
                                </div>
                              </div>
                              <button className="absolute bottom-1 -right-1 z-20 w-12 h-12 bg-white text-blue-600 rounded-2xl shadow-xl flex items-center justify-center border-2 border-slate-50 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 active:scale-90">
                                <Camera className="w-6 h-6" />
                              </button>
                            </div>

                            {/* Info Section */}
                            <div className="flex-1 text-center md:text-left pt-2">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                    <h2 className="text-4xl font-black text-[#0D3694] tracking-tight">{formData.fullName}</h2>
                                    <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                      Verified
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-center md:justify-start gap-6 text-slate-400 font-bold text-sm">
                                    <span className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-blue-400" /> Student ID: {formData.studentId}
                                    </span>
                                    <span className="flex items-center gap-2">
                                      <Shield className="w-4 h-4 text-indigo-400" /> Active Profile
                                    </span>
                                  </div>
                                </div>

                                {!isEditing && (
                                  <button 
                                    onClick={() => setIsEditing(true)}
                                    className="px-10 py-4 bg-white text-blue-600 font-black rounded-2xl shadow-lg border border-blue-50 hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 group/btn hover:shadow-blue-200"
                                  >
                                    Edit Profile <Edit2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                                  </button>
                                )}
                              </div>

                              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 text-left">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 italic">Identity Name</label>
                                  {isEditing ? (
                                    <input 
                                        name="fullName"
                                        type="text" 
                                        value={formData.fullName} 
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none font-bold text-slate-800 transition-all shadow-sm" 
                                    />
                                  ) : (
                                    <div className="px-6 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 font-bold text-slate-800 shadow-sm transition-all group-hover:bg-white/80">
                                      {formData.fullName}
                                    </div>
                                  )}
                                </div>
                                <div className="space-y-2 text-left">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 italic">Email Connection</label>
                                  {isEditing ? (
                                    <input 
                                        name="email"
                                        type="email" 
                                        value={formData.email} 
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none font-bold text-slate-800 transition-all shadow-sm" 
                                    />
                                  ) : (
                                    <div className="px-6 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 font-bold text-slate-800 shadow-sm transition-all group-hover:bg-white/80">
                                      {formData.email}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                              <Cloud className="w-6 h-6 text-blue-600 animate-pulse" />
                            </div>
                            <div>
                               <p className="text-slate-800 font-black text-sm">Real-time Data Encryption</p>
                               <p className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Changes synced to secure cloud</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 w-full md:w-auto">
                              {isEditing && (
                                <>
                                  <button 
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 md:flex-none px-10 py-4 bg-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all"
                                  >
                                    Discard
                                  </button>
                                  <button 
                                    onClick={handleSave}
                                    className="flex-1 md:flex-none px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                                  >
                                    Update Profile <CheckCircle2 className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'security' && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-6 mb-12">
                          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                            <Lock className="w-10 h-10" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-black text-[#0D3694] mb-1">Security & Authentication</h2>
                            <p className="text-slate-400 font-bold text-sm tracking-tight">Manage your account access and protection settings.</p>
                          </div>
                        </div>

                        <div className="space-y-8 max-w-2xl">
                          <div className="p-8 bg-slate-50/50 rounded-[32px] border border-slate-100">
                            <div className="flex items-center gap-4 mb-8">
                              <Key className="w-6 h-6 text-blue-600" />
                              <h3 className="text-xl font-black text-slate-800">Change Password</h3>
                            </div>
                            
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-4">Current Password</label>
                                <input 
                                  type="password" 
                                  name="currentPassword"
                                  placeholder="••••••••"
                                  className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none font-bold text-slate-800 transition-all" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-4">New Password</label>
                                <input 
                                  type="password" 
                                  name="newPassword"
                                  placeholder="Enter new password"
                                  className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none font-bold text-slate-800 transition-all" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-4">Confirm New Password</label>
                                <input 
                                  type="password" 
                                  name="confirmPassword"
                                  placeholder="Repeat new password"
                                  className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none font-bold text-slate-800 transition-all" 
                                />
                              </div>

                              <button className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                                Update Security Credentials
                              </button>
                            </div>
                          </div>

                          <div className="p-8 bg-emerald-50/30 rounded-[32px] border border-emerald-100 flex items-center justify-between">
                            <div className="flex items-center gap-5">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <Shield className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="text-lg font-black text-emerald-900 mb-0.5">Two-Factor Auth (2FA)</h4>
                                <p className="text-emerald-700/60 font-medium text-sm">Add an extra layer of security to your account.</p>
                              </div>
                            </div>
                            <button className="px-6 py-3 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-xs font-black hover:bg-emerald-600 hover:text-white transition-all">Enable 2FA</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'notifications' && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-6 mb-12">
                          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                            <Bell className="w-10 h-10" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-black text-[#0D3694] mb-1">Notification Preferences</h2>
                            <p className="text-slate-400 font-bold text-sm tracking-tight">Decide how and when you want to be alerted.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { 
                              id: 'testReminders', 
                              title: 'Assessment Reminders', 
                              desc: 'Receive alerts 24 hours before your scheduled tests.',
                              icon: Shield 
                            },
                            { 
                              id: 'performanceReports', 
                              title: 'Performance Briefs', 
                              desc: 'Get notified as soon as your test analysis is generated.',
                              icon: CheckCircle2 
                            },
                            { 
                              id: 'mentorshipUpdates', 
                              title: 'Mentor Messages', 
                              desc: 'Alerts for new feedback or notes from your assigned mentor.',
                              icon: User 
                            },
                            { 
                              id: 'systemAlerts', 
                              title: 'System Maintenance', 
                              desc: 'Critical updates regarding platform downtime or features.',
                              icon: Lock 
                            }
                          ].map((item) => {
                            const isEnabled = formData.notifications[item.id as keyof typeof formData.notifications];
                            return (
                              <div key={item.id} className="p-8 bg-white rounded-[32px] border border-slate-100 hover:border-blue-200 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isEnabled ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                                    <item.icon className="w-6 h-6" />
                                  </div>
                                  <button 
                                    onClick={() => toggleNotification(item.id as keyof typeof formData.notifications)}
                                    className={`w-14 h-7 rounded-full transition-all relative ${isEnabled ? 'bg-blue-600 shadow-lg shadow-blue-100' : 'bg-slate-200'}`}
                                  >
                                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${isEnabled ? 'left-8' : 'left-1'}`} />
                                  </button>
                                </div>
                                <h4 className="text-lg font-black text-slate-800 mb-2">{item.title}</h4>
                                <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-12 p-8 bg-blue-50/50 rounded-[32px] border border-blue-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                             <p className="text-blue-900 font-bold text-sm">All alerts are sent to your primary email: {formData.email}</p>
                          </div>
                          <button className="text-blue-600 font-black text-sm hover:underline">Change Delivery Method</button>
                        </div>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

