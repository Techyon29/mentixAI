"use client";

import { ChevronDown, List, Search, ArrowLeft, ArrowUpDown, Paperclip, Image as ImageIcon, Clock, AlertCircle, CheckCircle, XCircle, User, Bell, Sparkles, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import InstituteLayout from "../InstituteLayout";

const initialTickets = [
  { id: "#TK-4092", title: "Assessment grading mismatch", desc: "Multiple students are reporting that question 4 on the Python 101 assessment is marking correct answers as wrong.", reporterType: "Mentor", reporterId: "1", reporterName: "Dr. Julian Reed", reporterEmail: "j.reed@institute.edu", category: "Assessment Issue", status: "Pending", time: "10m ago", timestamp: 1717200000 },
  { id: "#TK-4091", title: "Cannot access Video Lectures", desc: "The player keeps buffering on Module 3. I have tried clearing my cache and using a different browser.", reporterType: "Student", reporterId: "1", reporterName: "Emma Thompson", reporterEmail: "emma.t@student.edu", category: "Platform Issue", status: "Pending", time: "1h ago", timestamp: 1717196000 },
  { id: "#TK-4088", title: "Profile update request", desc: "I need to update my contact information on the student portal but the fields are locked.", reporterType: "Student", reporterId: "2", reporterName: "Michael Chen", reporterEmail: "m.chen@student.edu", category: "Profile Update", status: "Open", time: "3h ago", timestamp: 1717189000 },
  { id: "#TK-4085", title: "Wrong class assignment", desc: "I was assigned to Class 10 Biology instead of Class 9 for this upcoming semester.", reporterType: "Mentor", reporterId: "2", reporterName: "Prof. Sarah Jenkins", reporterEmail: "s.jenkins@institute.edu", category: "Administrative", status: "Resolved", time: "1 day ago", timestamp: 1717113600 },
  { id: "#TK-4080", title: "Absence excuse upload failed", desc: "The system rejected my PDF file format for my medical excuse.", reporterType: "Student", reporterId: "3", reporterName: "Sophia Martinez", reporterEmail: "s.martinez@student.edu", category: "Platform Issue", status: "Rejected", time: "2 days ago", timestamp: 1717027200 },
];

export default function Support() {
  const [tickets, setTickets] = useState(initialTickets);
  const [activeTab, setActiveTab] = useState<"All" | "Mentor" | "Student">("All");
  const [selectedTicketId, setSelectedTicketId] = useState(initialTickets[0].id);
  const [toastMessage, setToastMessage] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [sortField, setSortField] = useState<"date" | "category" | "reporter">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [selectedReporterTypes, setSelectedReporterTypes] = useState<string[]>([]);
  const [isReporterFilterOpen, setIsReporterFilterOpen] = useState(false);

  const reporterOptions = ["Mentor", "Student"];

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [replies, setReplies] = useState<{ticketId: string, text: string, attachments: string[], time: string}[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [replyText, setReplyText] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);

  const quickReplies = [
    "Thank you for reporting this. We're investigating the issue right now.",
    "This issue has been resolved. Please check and let us know if it works for you.",
    "Could you please share a screenshot to help us understand the problem better?",
    "We have updated your profile as requested."
  ];

  const filteredTickets = tickets.filter(t => activeTab === "All" || t.reporterType === activeTab);
  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || filteredTickets[0];

  const handleUpdateStatus = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      setToastMessage(`Status updated to ${newStatus}. Alert notification sent to ${ticket.reporterName}.`);
      setTimeout(() => setToastMessage(""), 4000);
    }
    setIsStatusDropdownOpen(false);
  };

  const handleSendReply = () => {
    if (!replyText.trim() && attachments.length === 0) return;
    
    const newReply = {
      ticketId: selectedTicket.id,
      text: replyText,
      attachments: attachments.map(f => f.name),
      time: "Just now"
    };
    
    setReplies([...replies, newReply]);
    setReplyText("");
    setAttachments([]);
    setShowQuickReplies(false);
    setToastMessage("Reply sent successfully.");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Pending": return <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded"><Clock className="w-3 h-3" /> Pending</span>;
      case "Open": return <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded"><AlertCircle className="w-3 h-3" /> Open</span>;
      case "Resolved": return <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded"><CheckCircle className="w-3 h-3" /> Resolved</span>;
      case "Rejected": return <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#ba1a1a] bg-[#ba1a1a]/10 px-2 py-0.5 rounded"><XCircle className="w-3 h-3" /> Rejected</span>;
      default: return null;
    }
  };

  return (
    <InstituteLayout>
      <div className="min-h-[70vh] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-right-8 fade-in flex items-center gap-3 bg-[#191c1e] text-white px-4 py-3 rounded-xl shadow-xl border border-[#c7c4d8]/30">
            <Bell className="w-5 h-5 text-[#3525cd]" />
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-[#191c1e]">Support Tickets</h1>
            <p className="text-[#464555] mt-1 text-sm">Manage and resolve inquiries from Mentors and Students.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {viewMode === "detail" && (
              <button 
                onClick={() => setViewMode("list")}
                className="whitespace-nowrap px-4 py-2 bg-white border border-[#e6e8ea] text-[#191c1e] text-sm font-semibold rounded-xl hover:bg-[#f2f4f6] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="shrink-0 w-4 h-4" /> Back to Tickets
              </button>
            )}
            <button 
              onClick={() => setIsHistoryModalOpen(true)}
              className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2 shadow-sm shadow-[#3525cd]/20 cursor-pointer"
            >
              <List className="shrink-0 w-4 h-4" /> Tickets History
            </button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl border border-[#c7c4d8]/30 overflow-hidden shadow-sm">
             <div className="p-4 border-b border-[#e6e8ea] flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
               <div className="relative max-w-sm w-full">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777587]" />
                 <input 
                   type="text" 
                   placeholder="Search by name or ticket ID..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-10 pr-4 py-2.5 bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-lg text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all" 
                 />
               </div>
               
               <div className="flex items-center gap-3 shrink-0">
                 <div className="relative">
                   <button 
                     onClick={() => setIsReporterFilterOpen(!isReporterFilterOpen)}
                     className={`flex items-center gap-2 px-4 py-2 bg-white border ${selectedReporterTypes.length > 0 ? "border-[#3525cd] ring-1 ring-[#3525cd]/20 text-[#3525cd]" : "border-[#e6e8ea] text-[#191c1e] hover:bg-[#f2f4f6]"} rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer`}
                   >
                     Reporter Type {selectedReporterTypes.length > 0 && `(${selectedReporterTypes.length})`}
                     <ChevronDown className="w-4 h-4 text-[#777587]" />
                   </button>
                   {isReporterFilterOpen && (
                     <div className="absolute top-full mt-2 w-48 bg-white border border-[#e6e8ea] rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 right-0">
                       {reporterOptions.map(option => (
                         <label key={option} className="flex items-center gap-3 px-4 py-2 hover:bg-[#f2f4f6] cursor-pointer transition-colors">
                           <input 
                             type="checkbox" 
                             checked={selectedReporterTypes.includes(option)}
                             onChange={(e) => {
                               if (e.target.checked) setSelectedReporterTypes([...selectedReporterTypes, option]);
                               else setSelectedReporterTypes(selectedReporterTypes.filter(p => p !== option));
                             }}
                             className="w-4 h-4 rounded text-[#3525cd] focus:ring-[#3525cd] border-[#c7c4d8]"
                           />
                           <span className="text-sm font-medium">{option}</span>
                         </label>
                       ))}
                     </div>
                   )}
                 </div>
               </div>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead>
                   <tr className="bg-white border-b border-[#e6e8ea] text-xs uppercase tracking-wider text-[#464555]">
                     <th className="px-6 py-4 font-semibold">Ticket ID</th>
                     <th 
                       className="px-6 py-4 font-semibold cursor-pointer hover:text-[#191c1e] transition-colors"
                       onClick={() => { setSortField("reporter"); setSortOrder(sortField === "reporter" && sortOrder === "asc" ? "desc" : "asc"); }}
                     >
                       <div className="flex items-center gap-1">Reporter <ArrowUpDown className="w-3 h-3" /></div>
                     </th>
                     <th className="px-6 py-4 font-semibold">Role</th>
                     <th className="px-6 py-4 font-semibold">Subject</th>
                     <th className="px-6 py-4 font-semibold">Status</th>
                     <th 
                       className="px-6 py-4 font-semibold cursor-pointer hover:text-[#191c1e] transition-colors"
                       onClick={() => { setSortField("category"); setSortOrder(sortField === "category" && sortOrder === "asc" ? "desc" : "asc"); }}
                     >
                       <div className="flex items-center gap-1">Category <ArrowUpDown className="w-3 h-3" /></div>
                     </th>
                     <th 
                       className="px-6 py-4 font-semibold cursor-pointer hover:text-[#191c1e] transition-colors"
                       onClick={() => { setSortField("date"); setSortOrder(sortField === "date" && sortOrder === "asc" ? "desc" : "asc"); }}
                     >
                       <div className="flex items-center gap-1">Time <ArrowUpDown className="w-3 h-3" /></div>
                     </th>
                     <th className="px-6 py-4 font-semibold text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#e6e8ea] bg-white">
                   {(tickets || [])
                     .filter(t => selectedReporterTypes.length === 0 || selectedReporterTypes.includes(t.reporterType))
                     .filter(t => t.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  t.category.toLowerCase().includes(searchQuery.toLowerCase()))
                     .sort((a, b) => {
                       let cmp = 0;
                       if (sortField === "date") cmp = a.timestamp - b.timestamp;
                       else if (sortField === "category") cmp = a.category.localeCompare(b.category);
                       else if (sortField === "reporter") cmp = a.reporterName.localeCompare(b.reporterName);
                       return sortOrder === "asc" ? cmp : -cmp;
                     })
                     .map(ticket => (
                     <tr 
                       key={ticket.id} 
                       onClick={() => {
                         setSelectedTicketId(ticket.id);
                         setViewMode("detail");
                       }}
                       className="hover:bg-[#f2f4f6]/40 transition-colors cursor-pointer"
                     >
                       <td className="px-6 py-4">
                         <span className="text-sm font-semibold">{ticket.id}</span>
                       </td>
                       <td className="px-6 py-4">
                         <span className="text-sm font-medium">{ticket.reporterName}</span>
                       </td>
                       <td className="px-6 py-4">
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${ticket.reporterType === "Mentor" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>{ticket.reporterType}</span>
                       </td>
                       <td className="px-6 py-4">
                         <p className="text-sm font-medium truncate max-w-xs">{ticket.title}</p>
                       </td>
                       <td className="px-6 py-4">
                         {getStatusBadge(ticket.status)}
                       </td>
                       <td className="px-6 py-4">
                         <span className="text-sm font-medium text-[#464555] py-1 px-3 bg-[#f2f4f6] rounded-lg border border-[#e6e8ea]">{ticket.category}</span>
                       </td>
                       <td className="px-6 py-4">
                         <span className="text-sm text-[#464555] font-medium">{ticket.time}</span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button className="px-3 py-1.5 bg-[#f2f4f6] hover:bg-[#eceef0] border border-[#e6e8ea] rounded-full text-xs font-semibold transition-colors cursor-pointer">
                           View Details
                         </button>
                       </td>
                     </tr>
                   ))}
                   {(tickets || [])
                     .filter(t => selectedReporterTypes.length === 0 || selectedReporterTypes.includes(t.reporterType))
                     .filter(t => t.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  t.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                     <tr>
                       <td colSpan={8} className="px-6 py-12 text-center text-[#464555]">
                         No tickets found matching your criteria.
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 animate-in slide-in-from-right-4 duration-300">
            <div className="flex-[2] flex flex-col bg-white rounded-2xl border border-[#c7c4d8]/30 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#e6e8ea] bg-white">
                 <div className="flex items-center gap-3 mb-4">
                   <span className="text-sm font-bold text-[#3525cd]">{selectedTicket.id}</span>
                   {getStatusBadge(selectedTicket.status)}
                   <span className="text-[10px] font-bold text-[#464555] bg-[#f2f4f6] px-2 py-0.5 rounded uppercase tracking-wider">{selectedTicket.category}</span>
                 </div>
                 <h2 className="text-2xl font-bold text-[#191c1e] mb-2">{selectedTicket.title}</h2>
                 <div className="flex items-center gap-4 text-sm text-[#464555]">
                   <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {selectedTicket.reporterName}</span>
                   <span>•</span>
                   <span>{selectedTicket.time}</span>
                 </div>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto bg-white">
                <div className="bg-[#f7f9fb] rounded-2xl p-5 mb-8">
                  <p className="text-[#464555] leading-relaxed whitespace-pre-wrap">{selectedTicket.desc}</p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm flex items-center gap-2 font-bold uppercase tracking-wider text-[#777587]"><MessageSquare className="w-4 h-4" /> Issue Discussion</h3>
                  
                  <div className="space-y-6">
                    {replies.filter(r => r.ticketId === selectedTicket.id).map((r, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#3525cd]/10 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-[#3525cd]" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-white border border-[#e6e8ea] rounded-2xl rounded-tl-none p-4">
                            <p className="text-sm text-[#191c1e] mb-2">{r.text}</p>
                            {r.attachments && r.attachments.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {r.attachments.map((att, idx) => (
                                  <span key={idx} className="text-xs bg-[#f2f4f6] text-[#464555] px-2 py-1 rounded-md border border-[#e6e8ea] flex items-center gap-1">
                                    📎 {att}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-[#464555] mt-1 ml-1">{r.time} • You</span>
                        </div>
                      </div>
                    ))}
                    
                    {replies.filter(r => r.ticketId === selectedTicket.id).length === 0 && (
                      <p className="text-sm text-[#464555] italic text-center py-4 bg-white rounded-xl border border-dashed border-[#c7c4d8]/30">No replies yet. Be the first to respond.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-[#e6e8ea] bg-white">
                 <div className="flex gap-2 mb-2 relative">
                   <button 
                     onClick={() => setShowQuickReplies(!showQuickReplies)}
                     className="p-2 hover:bg-[#f2f4f6] rounded-lg text-[#777587] transition-colors relative group cursor-pointer"
                     title="Quick replies"
                   >
                     <Sparkles className="w-5 h-5 group-hover:text-[#3525cd] transition-colors" />
                   </button>
                   <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="p-2 hover:bg-[#f2f4f6] rounded-lg text-[#777587] transition-colors group cursor-pointer"
                     title="Attach Document"
                   >
                     <Paperclip className="w-5 h-5 group-hover:text-[#3525cd] transition-colors" />
                   </button>
                   <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="p-2 hover:bg-[#f2f4f6] rounded-lg text-[#777587] transition-colors group cursor-pointer"
                     title="Attach Image"
                   >
                     <ImageIcon className="w-5 h-5 group-hover:text-[#3525cd] transition-colors" />
                   </button>
                   <input 
                     type="file" 
                     ref={fileInputRef} 
                     className="hidden" 
                     multiple
                     onChange={(e) => {
                       if (e.target.files) {
                         setAttachments([...attachments, ...Array.from(e.target.files)]);
                       }
                     }} 
                   />
                   
                   {showQuickReplies && (
                     <div className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#e6e8ea] rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2">
                       <div className="p-3 border-b border-[#e6e8ea] bg-[#f7f9fb]">
                         <span className="text-xs font-bold uppercase tracking-wider text-[#777587]">Quick Replies</span>
                       </div>
                       <div className="max-h-60 overflow-y-auto bg-white">
                         {quickReplies.map((qr, i) => (
                           <button
                             key={i}
                             onClick={() => {
                               setReplyText(qr);
                               setShowQuickReplies(false);
                             }}
                             className="w-full text-left p-3 text-sm hover:bg-[#f2f4f6] border-b border-[#e6e8ea] transition-colors text-[#464555] last:border-0 cursor-pointer"
                           >
                             {qr}
                           </button>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
                 
                 <div className="flex gap-3 items-end">
                   <div className="flex-1 relative">
                     {attachments.length > 0 && (
                       <div className="flex flex-wrap gap-2 mb-2">
                         {attachments.map((file, i) => (
                           <span key={i} className="text-xs bg-[#f2f4f6] text-[#464555] px-2 py-1 rounded-md border border-[#e6e8ea] flex items-center gap-1">
                             📎 {file.name}
                             <button 
                               onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                               className="text-[#777587] hover:text-[#ba1a1a] ml-1 cursor-pointer"
                             >
                               <XCircle className="w-3 h-3" />
                             </button>
                           </span>
                         ))}
                       </div>
                     )}
                     <textarea 
                       value={replyText}
                       onChange={(e) => setReplyText(e.target.value)}
                       placeholder="Type your response here..." 
                       className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none resize-none h-[44px] min-h-[44px] transition-all"
                     />
                   </div>
                   <button 
                     onClick={handleSendReply}
                     disabled={!replyText.trim() && attachments.length === 0}
                     className="px-6 h-[44px] bg-[#3525cd] hover:bg-[#4f46e5] disabled:bg-gray-150 disabled:text-[#777587] text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                   >
                     Send
                   </button>
                 </div>
              </div>
            </div>

            <div className="flex-[1] flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-[#c7c4d8]/30 shadow-sm p-6">
                <h3 className="font-bold text-[#191c1e] mb-6">Ticket Actions</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#777587] block mb-2">Change Status</span>
                    <div className="relative">
                      <button 
                        onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                        className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#e6e8ea] rounded-xl text-sm font-medium flex justify-between items-center hover:border-[#3525cd]/50 transition-colors cursor-pointer"
                      >
                        {getStatusBadge(selectedTicket.status)}
                        <ChevronDown className="w-4 h-4 text-[#777587]" />
                      </button>
                      
                      {isStatusDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e6e8ea] rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95">
                          {["Pending", "Open", "Resolved", "Rejected"].map(status => (
                             <button
                               key={status}
                               onClick={() => handleUpdateStatus(selectedTicket.id, status)}
                               className="w-full text-left px-4 py-3 hover:bg-[#f2f4f6] border-b border-[#e6e8ea] last:border-0 transition-colors flex items-center cursor-pointer"
                             >
                               {getStatusBadge(status)}
                             </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#c7c4d8]/30 shadow-sm p-6 overflow-hidden">
                 <h3 className="font-bold text-[#191c1e] mb-6">Reporter Information</h3>
                 
                 <div className="space-y-5">
                   <div className="bg-white p-4 rounded-xl border border-[#e6e8ea] flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#3525cd]/20 to-[#3525cd]/5 flex items-center justify-center text-[#3525cd] font-bold text-lg">
                       {selectedTicket.reporterName.charAt(0)}
                     </div>
                     <div>
                       <p className="font-bold text-[#191c1e]">{selectedTicket.reporterName}</p>
                       <p className="text-xs text-[#464555]">{selectedTicket.reporterEmail}</p>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white border border-gray-200 p-3 rounded-xl">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-[#777587] block mb-1">Role</span>
                       <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block ${selectedTicket.reporterType === "Mentor" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>{selectedTicket.reporterType}</span>
                     </div>
                     <div className="bg-white border border-gray-200 p-3 rounded-xl">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-[#777587] block mb-1">User ID</span>
                       <span className="text-sm font-medium text-[#191c1e]">{selectedTicket.reporterId}</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Tickets History Modal */}
        {isHistoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
              <div className="p-6 border-b border-[#e6e8ea] flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-xl font-bold text-[#191c1e]">Tickets History</h3>
                  <p className="text-sm text-[#464555] flex items-center gap-2 mt-1">
                    History of all tickets from Mentors and Students
                  </p>
                </div>
                <button 
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="p-2 hover:bg-[#f2f4f6] rounded-full transition-colors text-[#777587] cursor-pointer"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto bg-white flex-1">
                <div className="space-y-4">
                  {tickets.length > 0 ? (
                    tickets.map(t => (
                      <div 
                        key={t.id} 
                        onClick={() => {
                          setSelectedTicketId(t.id);
                          setViewMode("detail");
                          setIsHistoryModalOpen(false);
                        }}
                        className={`bg-white p-5 rounded-2xl border ${selectedTicket && selectedTicket.id === t.id ? "border-[#3525cd] ring-1 ring-[#3525cd]/20 bg-[#3525cd]/5" : "border-[#e6e8ea] hover:border-[#3525cd]/50 hover:bg-[#f2f4f6]/50"} shadow-sm cursor-pointer transition-all flex flex-col md:flex-row gap-4 justify-between items-start md:items-center`}
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold ${selectedTicket && selectedTicket.id === t.id ? "text-[#3525cd]" : "text-[#191c1e]"}`}>{t.id}</span>
                            {getStatusBadge(t.status)}
                            <span className="text-[10px] font-bold text-[#464555] bg-[#f2f4f6] px-2 py-0.5 rounded uppercase tracking-wider">{t.category}</span>
                          </div>
                          <p className="text-sm font-medium text-[#191c1e]">{t.title}</p>
                          <p className="text-xs text-[#464555] flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            <span>{t.reporterName} ({t.reporterType})</span>
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                           <span className="text-sm font-medium text-[#777587]">{t.time}</span>
                           {selectedTicket && selectedTicket.id === t.id && (
                             <span className="block text-[11px] font-bold text-[#3525cd] mt-1">CURRENTLY VIEWING</span>
                           )}
                        </div>
                      </div>
                    ))
                  ) : (
                     <div className="text-center py-12 text-[#464555]">
                       <p>No history found.</p>
                     </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 border-t border-[#e6e8ea] bg-white flex justify-end">
                <button 
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="px-6 py-2 bg-[#f2f4f6] hover:bg-[#eceef0] text-[#191c1e] font-semibold rounded-xl transition-colors text-sm cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstituteLayout>
  );
}
