"use client";

import { ArrowLeft, ShieldCheck, Mail, Phone, Calendar, Activity, BookOpen, Clock, BadgeCheck, ShieldAlert, CheckCircle2, MessageSquare, Star, X, Send, Edit3, Save, Ban, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InstituteLayout from "../InstituteLayout";

const MENTOR_DB: Record<string, any> = {
  "1": { 
    mentorId: "M-1029",
    name: "Dr. Julian Reed", 
    initials: "JR", 
    date: "Aug 2021", 
    department: "Computer Science", 
    expertise: ["Machine Learning", "Python", "AI Ethics"], 
    classes: ["9", "10", "11", "12"], 
    students: "24/30", 
    rating: 4.9, 
    status: "Active", 
    verified: true, 
    color: "bg-blue-100 text-blue-700", 
    email: "jreed@mentix.edu", 
    phone: "+1 (555) 019-231", 
    lastLogin: "10 mins ago", 
    completionRate: "98%", 
    avgResponse: "1.2h",
    institute: "Mentix Institute of Technology",
    bio: "Experienced educator focusing on artificial intelligence and computational mathematics with 15+ years of teaching experience. Passionate about bringing real-world AI applications into the classroom."
  },
  "2": { 
    mentorId: "M-2184",
    name: "Sarah Chen", 
    initials: "SC", 
    date: "Jan 2023", 
    department: "Design", 
    expertise: ["UX Design", "Research Methodology", "Prototyping"], 
    classes: ["9", "10"], 
    students: "19/20", 
    rating: 4.8, 
    status: "On Leave", 
    verified: true, 
    color: "bg-orange-100 text-orange-700", 
    email: "schen@mentix.edu", 
    phone: "+1 (555) 432-112", 
    lastLogin: "1 hour ago", 
    completionRate: "92%", 
    avgResponse: "2.5h",
    institute: "Mentix Institute of Technology",
    bio: "Design researcher and practitioner specializing in human-computer interaction. Believes in teaching through practical, hands-on studio projects."
  },
  "3": { 
    mentorId: "M-3912",
    name: "Marcus King", 
    initials: "MK", 
    date: "Mar 2023", 
    department: "Mathematics", 
    expertise: ["Data Science", "Statistics", "Linear Algebra"], 
    classes: ["11", "12"], 
    students: "12/30", 
    rating: 4.5, 
    status: "Suspended", 
    verified: false, 
    color: "bg-red-100 text-red-700", 
    email: "mking@mentix.edu", 
    phone: "+1 (555) 876-221", 
    lastLogin: "Yesterday", 
    completionRate: "85%", 
    avgResponse: "4h",
    institute: "Mentix Institute of Technology",
    bio: "Former industry data scientist turned educator. Brings a practical perspective to advanced mathematics and statistical analysis."
  },
};

export default function MentorProfile() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "1";
  const initialMentor = MENTOR_DB[id] || MENTOR_DB["1"];
  
  const [mentor, setMentor] = useState(initialMentor);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(initialMentor);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  
  const [blockUntil, setBlockUntil] = useState("");
  const [authAction, setAuthAction] = useState<"block" | "delete" | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  useEffect(() => {
    const freshMentor = MENTOR_DB[id] || MENTOR_DB["1"];
    setMentor(freshMentor);
    setEditForm(freshMentor);
  }, [id]);

  const handleConfimation = () => {
    if (!adminPassword) {
      setAuthError("Password is required");
      return;
    }
    setIsProcessingAction(true);
    
    setTimeout(() => {
      setIsProcessingAction(false);
      if (adminPassword.length > 3) { 
         if (authAction === "block") {
           setMentor({...mentor, status: "Suspended", color: "bg-red-100 text-red-700"});
           setBlockUntil("");
           setAuthAction(null);
           setAdminPassword("");
           setAuthError("");
         } else if (authAction === "delete") {
           router.push("/institute-dashboard/mentors");
         }
      } else {
         setAuthError("Incorrect password. Try again.");
      }
    }, 800);
  };

  const handleSave = () => {
    setMentor(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(mentor);
    setIsEditing(false);
  };

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
    setEditForm({ ...editForm, expertise: arr });
  };
  
  const handleClassesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
    setEditForm({ ...editForm, classes: arr });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMessageModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <InstituteLayout>
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
            <Link href="/institute-dashboard/mentors" className="shrink-0 p-2.5 bg-white border border-[#c7c4d8]/50 rounded-full hover:bg-[#f2f4f6] text-[#464555] transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#191c1e]">Mentor Profile</h1>
              <p className="text-sm text-[#464555]">Information, insights, and assignment logs.</p>
            </div>
          </div>
          
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#c7c4d8]/50 text-[#5654a8] text-sm font-semibold rounded-full hover:bg-[#f2f4f6] transition-colors shadow-sm bg-white cursor-pointer"
            >
              <Edit3 className="w-4 h-4 shrink-0" /> Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-semibold text-[#464555] hover:bg-[#eceef0] rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-[#191c1e] text-[#f7f9fb] text-sm font-semibold rounded-full hover:bg-[#464555] transition-colors shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4 shrink-0" /> Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Hero Section */}
        <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-[#c7c4d8]/40 shadow-sm bg-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#3525cd]/10 via-[#4f46e5]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 lg:gap-8 items-start md:items-center">
            <div className={`w-28 h-28 rounded-2xl flex items-center justify-center font-bold text-4xl shrink-0 ${mentor.color} shadow-sm`}>
              {mentor.initials}
            </div>
            
            <div className="flex-1 w-full space-y-4">
               <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                 <div>
                   <div className="flex flex-wrap items-center gap-3 mb-1">
                     <h2 className="text-3xl font-bold text-[#191c1e] tracking-tight">{mentor.name}</h2>
                     {mentor.verified ? (
                       <div className="flex items-center gap-1 text-green-700 bg-green-100/80 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider">
                         <ShieldCheck className="w-3.5 h-3.5" />
                         Verified
                       </div>
                     ) : (
                       <div className="flex items-center gap-1 text-orange-600 bg-orange-100/80 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider">
                         <ShieldAlert className="w-3.5 h-3.5" />
                         Unverified
                       </div>
                     )}
                     <span className={`px-2 py-0.5 rounded-md text-xs uppercase tracking-wider font-bold whitespace-nowrap ${
                       mentor.status === "Active" ? "bg-green-100/80 text-green-700" :
                       mentor.status === "On Leave" ? "bg-orange-100/80 text-orange-700" :
                       "bg-red-100 text-red-700"
                     }`}>
                       {mentor.status}
                     </span>
                   </div>
                   <div className="flex items-center gap-2 text-sm mt-2">
                      <span className="font-semibold text-[#3525cd]">{mentor.department}</span>
                      <span className="w-1 h-1 rounded-full bg-[#c7c4d8]"></span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editForm.institute} 
                          onChange={(e) => setEditForm({...editForm, institute: e.target.value})}
                          className="text-sm font-medium border-b border-[#c7c4d8]/50 px-1 py-0.5 outline-none focus:border-[#3525cd] bg-transparent text-[#464555]"
                          placeholder="Institute"
                        />
                      ) : (
                        <span className="text-[#464555] font-medium">{mentor.institute}</span>
                      )}
                   </div>
                 </div>
                 
                 <div className="flex gap-3 w-full md:w-auto shrink-0">
                   <button 
                     onClick={() => setIsMessageModalOpen(true)}
                     className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#191c1e] text-[#f7f9fb] text-sm font-semibold rounded-full shadow-md hover:bg-[#464555] transition-all hover:shadow-lg cursor-pointer"
                   >
                     <MessageSquare className="w-4 h-4" /> Message
                   </button>
                   <a href={`mailto:${mentor.email}`} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-[#c7c4d8]/60 text-[#191c1e] text-sm font-semibold rounded-full hover:bg-[#f2f4f6] transition-colors shadow-sm">
                     <Mail className="w-4 h-4" /> Email
                   </a>
                 </div>
               </div>

               <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-[#eceef0]/50">
                 <div className="flex items-center gap-2 text-sm text-[#464555]">
                   <BadgeCheck className="w-4.5 h-4.5 text-[#777587] shrink-0" /> ID: 
                   {isEditing ? (
                     <input 
                       type="text" 
                       value={editForm.mentorId} 
                       onChange={(e) => setEditForm({...editForm, mentorId: e.target.value})}
                       className="font-semibold text-[#191c1e] border-b border-[#c7c4d8]/50 px-1 outline-none focus:border-[#3525cd] bg-transparent w-24"
                     />
                   ) : (
                     <span className="font-semibold text-[#191c1e]">{mentor.mentorId}</span>
                   )}
                 </div>
                 <div className="flex items-center gap-2 text-sm text-[#464555]">
                   <Mail className="w-4.5 h-4.5 text-[#777587] shrink-0" /> Email: 
                   {isEditing ? (
                     <input 
                       type="email" 
                       value={editForm.email} 
                       onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                       className="font-semibold text-[#191c1e] border-b border-[#c7c4d8]/50 px-1 outline-none focus:border-[#3525cd] bg-transparent w-48"
                     />
                   ) : (
                     <span className="font-semibold text-[#191c1e]">{mentor.email}</span>
                   )}
                 </div>
                 <div className="flex items-center gap-2 text-sm text-[#464555]">
                   <Calendar className="w-4.5 h-4.5 text-[#777587]" /> Joined: <span className="font-semibold text-[#191c1e]">{mentor.date}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#c7c4d8]/30 bg-white">
              <h3 className="font-semibold text-lg mb-3">About Mentor</h3>
              {isEditing ? (
                <textarea 
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full text-sm text-[#191c1e] leading-relaxed mb-6 p-2 border border-[#eceef0] rounded-lg outline-none focus:border-[#3525cd] bg-[#f7f9fb] min-h-[100px] resize-y"
                />
              ) : (
                <p className="text-sm text-[#464555] leading-relaxed mb-6">
                  {mentor.bio}
                </p>
              )}
              
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#777587] mb-3">Expertise</h4>
              {isEditing ? (
                <div>
                  <input 
                    type="text" 
                    value={editForm.expertise.join(", ")} 
                    onChange={handleExpertiseChange}
                    className="w-full text-sm p-2 border border-[#eceef0] rounded-lg outline-none focus:border-[#3525cd] bg-[#f7f9fb] mb-2"
                    placeholder="Comma separated expertise"
                  />
                  <p className="text-[10px] text-[#464555] mb-2">Separate with commas</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((exp: string) => (
                    <span key={exp} className="px-3 py-1 bg-[#eceef0] border border-[#eceef0] rounded-lg text-xs font-semibold text-[#464555]">
                      {exp}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#c7c4d8]/30 bg-gradient-to-br from-white to-[#3525cd]/5">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#3525cd] fill-current" />
                    AI Performance
                  </h3>
               </div>
               <div className="flex items-end gap-3 mb-2">
                 <h3 className="text-5xl font-bold text-[#191c1e] tracking-tighter">{mentor.rating}</h3>
                 <span className="text-base text-[#464555] font-medium pb-1.5">/ 5.0</span>
               </div>
               <p className="text-sm text-[#464555] mt-2 border-t border-[#eceef0]/50 pt-4">Consensus rating based on student feedback and evaluation metrics.</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#c7c4d8]/30 bg-white">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-semibold flex items-center gap-2">
                   <BookOpen className="w-5 h-5 text-[#5654a8]" />
                   Classes Assigned
                 </h3>
               </div>
               
               {isEditing ? (
                 <div className="mb-4">
                   <label className="text-xs font-semibold text-[#464555] block mb-1">Assigned Classes (comma separated)</label>
                   <input 
                     type="text" 
                     value={editForm.classes.join(", ")} 
                     onChange={handleClassesChange}
                     className="w-full text-sm p-2.5 border border-[#eceef0] rounded-lg outline-none focus:border-[#3525cd] bg-[#f7f9fb]"
                     placeholder="e.g. 9, 10, 11"
                   />
                 </div>
               ) : (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mentor.classes.map((cls: string) => (
                      <div key={cls} className="p-4 rounded-xl border border-[#eceef0] bg-white hover:bg-[#f2f4f6]/50 transition-colors flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 rounded-lg bg-[#f2f4f6] flex flex-col items-center justify-center text-[#191c1e] shrink-0 group-hover:bg-[#3525cd] group-hover:text-white transition-colors">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Class</span>
                          <span className="text-lg font-bold leading-none">{cls}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-0.5">{mentor.department} Studies</h4>
                          <div className="flex items-center gap-1.5 text-xs text-[#464555]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            Active Cohort
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#c7c4d8]/30 bg-white">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-semibold flex items-center gap-2">
                   <Activity className="w-5 h-5 text-[#777587]" />
                   Activity Logs
                 </h3>
               </div>
               <div className="space-y-6">
                 <div className="relative pl-6 pb-2 border-l-2 border-[#eceef0]">
                   <div className="absolute w-3 h-3 bg-[#3525cd] rounded-full -left-[7px] top-1 ring-4 ring-white"></div>
                   <h4 className="text-sm font-semibold mb-1">Graded Midterm Exams</h4>
                   <p className="text-sm text-[#464555] leading-relaxed">Completed grading for 28/30 students in "Machine Learning". AI consensus used for 5 questions.</p>
                   <span className="text-xs text-[#777587] font-medium mt-2 flex items-center gap-1.5">
                     <Clock className="w-3.5 h-3.5" /> 2 hours ago
                   </span>
                 </div>
                 <div className="relative pl-6 pb-2 border-l-2 border-[#eceef0]">
                   <div className="absolute w-3 h-3 bg-[#c7c4d8] rounded-full -left-[7px] top-1 ring-4 ring-white"></div>
                   <h4 className="text-sm font-semibold mb-1">Generated Feedback Reports</h4>
                   <p className="text-sm text-[#464555] leading-relaxed">Published AI-assisted feedback reports for student performance gaps.</p>
                   <span className="text-xs text-[#777587] font-medium mt-2 flex items-center gap-1.5">
                     <Clock className="w-3.5 h-3.5" /> Yesterday
                   </span>
                 </div>
                 <div className="relative pl-6">
                   <div className="absolute w-3 h-3 bg-[#c7c4d8] rounded-full -left-[7px] top-1 ring-4 ring-white"></div>
                   <h4 className="text-sm font-semibold mb-1">Assigned to New Class</h4>
                   <p className="text-sm text-[#464555] leading-relaxed">Administrator assigned Mentor to Class 11.</p>
                   <span className="text-xs text-[#777587] font-medium mt-2 flex items-center gap-1.5">
                     <Clock className="w-3.5 h-3.5" /> 3 days ago
                   </span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Account Actions Section */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-red-200 bg-red-50/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-red-100 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <h3 className="font-semibold text-lg text-red-700 mb-1 flex items-center gap-2 relative z-10">
            <ShieldAlert className="w-5 h-5" /> Account Actions
          </h3>
          <p className="text-sm text-[#464555] mb-6 relative z-10">Manage access and permanence of this user's profile on the platform.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Blocking */}
            <div className="p-5 rounded-2xl bg-white border border-red-100 shadow-sm flex flex-col justify-between">
               <div>
                 <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                   <Ban className="w-4 h-4 text-orange-500" /> Restrict Access
                 </h4>
                 <p className="text-xs text-[#464555] mb-4">Temporarily block this user from accessing the platform. Set a date and time for the block to expire.</p>
                 
                 <div className="space-y-3 mb-6">
                   <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider block">Block Until</label>
                     <input 
                       type="datetime-local" 
                       value={blockUntil}
                       onChange={(e) => setBlockUntil(e.target.value)}
                       className="w-full bg-[#f7f9fb] border border-[#c7c4d8]/60 rounded-xl px-4 py-2.5 text-sm focus:border-orange-500/50 outline-none transition-all cursor-pointer"
                     />
                   </div>
                 </div>
               </div>
               
               <button 
                  disabled={!blockUntil}
                  onClick={() => setAuthAction("block")}
                  className="w-full py-2.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold hover:bg-orange-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
               >
                 <Ban className="w-4 h-4" /> 
                 Block Access
               </button>
            </div>
            
            {/* Permanent Removal */}
            <div className="p-5 rounded-2xl bg-white border border-red-100 shadow-sm flex flex-col justify-between">
               <div>
                 <h4 className="font-semibold text-sm flex items-center gap-2 mb-2 text-red-700">
                   <Trash2 className="w-4 h-4" /> Delete Account
                 </h4>
                 <p className="text-xs text-[#464555] mb-4">Permanently remove this user and all associated data from the platform. This action is irreversible.</p>
               </div>
               
               <button 
                  onClick={() => setAuthAction("delete")}
                  className="w-full py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
               >
                 <Trash2 className="w-4 h-4" /> Remove Permanently
               </button>
            </div>
          </div>
        </div>

        {/* Auth Confirmation Modal */}
        {authAction && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#f7f9fb] w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#e6e8ea]">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" /> 
                  {authAction === "block" ? "Confirm Block Access" : "Confirm Deletion"}
                </h3>
                <button 
                  onClick={() => {
                    setAuthAction(null);
                    setAdminPassword("");
                    setAuthError("");
                  }}
                  className="p-2 text-[#464555] hover:text-[#191c1e] hover:bg-[#f2f4f6] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-sm text-[#464555] mb-4">
                  Please enter your administrator password to confirm this action. This is required for security purposes.
                </p>
                
                <div className="space-y-1.5 mb-4">
                  <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider block">Password</label>
                  <input 
                    type="password" 
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setAuthError("");
                    }}
                    className="w-full bg-white border border-[#c7c4d8]/60 rounded-xl px-4 py-3 text-sm focus:border-[#3525cd]/50 outline-none transition-all"
                    placeholder="Enter your password"
                  />
                  {authError && <p className="text-xs text-red-600 mt-1">{authError}</p>}
                </div>

                <div className="flex gap-3 justify-end mt-6">
                   <button 
                     onClick={() => {
                       setAuthAction(null);
                       setAdminPassword("");
                       setAuthError("");
                     }}
                     className="px-4 py-2 rounded-full border border-[#c7c4d8] text-sm font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={handleConfimation}
                     disabled={isProcessingAction || !adminPassword}
                     className="px-5 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                   >
                     {isProcessingAction ? "Verifying..." : "Confirm Action"}
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {isMessageModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-[#c7c4d8]/30">
              <div className="px-6 py-5 border-b border-[#e6e8ea] flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-semibold text-lg text-[#191c1e]">Message {mentor.name}</h3>
                  <p className="text-xs text-[#464555] mt-0.5">Response usually within {mentor.avgResponse}</p>
                </div>
                <button 
                  onClick={() => setIsMessageModalOpen(false)} 
                  className="p-2 text-[#464555] hover:bg-[#f2f4f6] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 bg-white">
                <label className="block text-sm font-semibold text-[#191c1e] mb-2">Your Message</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  autoFocus
                  className="w-full h-32 p-4 bg-[#f7f9fb] border border-[#e6e8ea] rounded-xl text-sm text-[#191c1e] focus:border-[#3525cd] focus:ring-1 focus:ring-[#3525cd] outline-none resize-none transition-all placeholder:text-[#777587]/70"
                ></textarea>
              </div>
              
              <div className="px-6 py-4 border-t border-[#e6e8ea] flex items-center justify-between gap-3 bg-white">
                <p className="text-xs text-[#464555] hidden sm:block">
                  Press <kbd className="px-1.5 py-0.5 bg-[#f2f4f6] rounded border border-[#e6e8ea] font-sans shadow-sm font-semibold text-[10px]">Esc</kbd> to cancel
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setIsMessageModalOpen(false)} 
                    className="flex-1 sm:flex-none px-5 py-2 text-sm font-semibold text-[#464555] hover:bg-[#f2f4f6] hover:text-[#191c1e] rounded-full transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsMessageModalOpen(false);
                      setMessageText("");
                    }} 
                    className="flex-1 sm:flex-none px-6 py-2 bg-[#3525cd] text-white text-sm font-semibold rounded-full hover:bg-[#4f46e5] flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    disabled={!messageText.trim()}
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstituteLayout>
  );
}
