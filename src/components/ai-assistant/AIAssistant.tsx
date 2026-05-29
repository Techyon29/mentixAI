"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, Sparkles, MessageSquare, Plus, 
  Search, ChevronRight, 
  Image as ImageIcon, Mic,
  Zap, Compass, ArrowLeft,
  Home, Clock, Bookmark, Gem,
  Menu, ChevronDown, SearchCode, Lightbulb,
  Leaf, Variable, FileText, Layout,
  Paperclip, Cloud, Book, BookOpen, Info
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AIAssistant() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [aiMode, setAiMode] = useState("Default");
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hello! I'm your Mentix AI Assistant. I can help you draft assessments, analyze student performance, or suggest remedial topics. What can I do for you today?",
      time: "10:30 AM"
    }
  ]);

  const resetChat = () => {
    setShowChat(false);
    setInput("");
    setAiMode("Default");
    setMessages([{ 
      role: "assistant", 
      content: "Hello! I'm your Mentix AI Assistant. I can help you draft assessments, analyze student performance, or suggest remedial topics. What can I do for you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const recentChats = [
    { id: 1, title: "Photosynthesis process expl...", date: "Today" },
    { id: 2, title: "Quadratic equations formula", date: "Today" },
    { id: 3, title: "Cell structure and function", date: "Today" },
    { id: 4, title: "Newton's laws of motion", date: "Today" },
    { id: 5, title: "Chemical bonding types", date: "Today" },
    { id: 6, title: "Trigonometry basics", date: "Yesterday" },
    { id: 7, title: "Human digestive system", date: "Yesterday" },
    { id: 8, title: "Organic chemistry reactions", date: "Yesterday" },
  ];

  const suggestions = [
    { title: "Explain", desc: "photosynthesis in simple terms", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Help me solve", desc: "this math problem step by step", icon: Variable, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Write a summary", desc: "of the chapter on cell structure", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Create a quiz", desc: "on periodic table for class 10", icon: Layout, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Give me ideas", desc: "for a science project on environment", icon: Lightbulb, color: "text-green-500", bg: "bg-green-50" },
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showChat) scrollToBottom();
  }, [messages, showChat]);

  const handleSend = (overrideInput?: string) => {
    const finalInput = overrideInput || input;
    if (!finalInput.trim()) return;
    setShowChat(true);

    const newMessage = {
      role: "user",
      content: finalInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");

    // Simulate AI Response
    setTimeout(() => {
      const responses = {
        "Default": "I've analyzed your request. Based on the current syllabus, I recommend focusing on the key concepts we discussed. Would you like a detailed breakdown?",
        "Deep Research": "I've conducted a deep search across the educational database. I found 12 relevant source documents and synthesized a comprehensive response for your assessment prep.",
        "Think": "Thinking... (Processing cognitive steps) I have evaluated 3 different pedagogical approaches for this topic. Here is the most effective one for your class demographics."
      };
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: responses[aiMode as keyof typeof responses] || responses["Default"],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-white font-sans text-[#1f1f1f] overflow-hidden relative">
      
      {/* Mobile Drawer Overlay */}
      {isUserDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-100 md:hidden backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsUserDropdownOpen(false)}
        />
      )}

      {/* Sidebar - Gemini Style */}
      <aside className={`
        fixed md:relative z-110 md:z-auto
        w-[260px] md:w-[280px] h-full bg-[#f8fafd] border-r border-[#e3e3e3] p-3 md:p-4 pt-5 md:pt-6
        transition-transform duration-300 ease-in-out
        ${isUserDropdownOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-6 md:mb-8 px-2 md:block">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-[#0D245B] flex items-center justify-center text-white shadow-lg">
              <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            </div>
            <span className="text-[15px] md:text-[18px] font-black text-[#0D245B] tracking-tight uppercase">Mentix AI</span>
          </div>
          <button 
            onClick={() => setIsUserDropdownOpen(false)}
            className="md:hidden p-2 hover:bg-slate-200 rounded-full transition-all"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-[#0D245B]" />
          </button>
        </div>

        <button 
          onClick={resetChat}
          className="w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-[#0D245B] hover:bg-[#0D3694] text-white rounded-[20px] md:rounded-[24px] transition-all mb-6 md:mb-8 shadow-xl group"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-90" />
          <span className="text-[11px] md:text-[13px] font-black uppercase tracking-widest">New chat</span>
        </button>

        <nav className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
          <div className="space-y-1 mb-5 md:mb-6">
            <button className="w-full flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-blue-50 text-[#0D245B] font-black transition-all text-[11px] md:text-[13px] uppercase tracking-widest">
              <Home className="w-4 h-4 md:w-5 md:h-5" />
              <span>Home</span>
            </button>
            {[
              { icon: Clock, label: "Recent" },
              { icon: Bookmark, label: "Saved" },
              { icon: Gem, label: "Mentix Gems", badge: "New" },
              { icon: Compass, label: "Explore" },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2 md:py-2.5 rounded-full hover:bg-slate-100/80 text-[#5B779E] font-black transition-all text-[11px] md:text-[13px] uppercase tracking-widest">
                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && <span className="text-[9px] md:text-[10px] bg-blue-500 text-white px-1.5 md:px-2 py-0.5 rounded-md font-black">{item.badge}</span>}
              </button>
            ))}
          </div>

          <div className="pt-3 md:pt-4 border-t border-slate-100">
            <h4 className="px-3 md:px-4 text-[9px] md:text-[10px] font-black text-[#5B779E] mb-2 md:mb-3 uppercase tracking-widest">Recent chats</h4>
            <div className="space-y-1">
              {recentChats.slice(0, 5).map((chat) => (
                <button 
                  key={chat.id} 
                  onClick={() => {
                    setShowChat(true);
                    setMessages([{
                      role: "assistant",
                      content: `Loading your discussion about "${chat.title}"... How can I continue helping you with this topic?`,
                      time: "Just now"
                    }]);
                    if (window.innerWidth < 768) setIsUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-xl hover:bg-slate-50 text-[#0D245B] transition-all text-[11px] md:text-[12px] font-bold group text-left"
                >
                  <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#5B779E]" />
                  <span className="truncate flex-1">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="pt-6 border-t border-slate-100 space-y-2 relative">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl bg-linear-to-r from-blue-50 to-indigo-50 text-[#0D245B] font-black transition-all text-[12px] border border-blue-100 shadow-sm">
            <Sparkles className="w-5 h-5 text-blue-600 fill-blue-600/20" />
            <div className="text-left flex-1">
              <p className="uppercase tracking-widest">Mentix Pro</p>
              <p className="text-[10px] text-[#5B779E] font-bold">More powerful AI</p>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:bg-slate-50 transition-all">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Arjun" className="w-8 h-8 rounded-full border-2 border-slate-100" />
              <div className="text-left truncate max-w-[120px]">
                <p className="text-[13px] font-black text-[#0D245B] truncate">Arjun Mehta</p>
                <p className="text-[10px] text-[#5B779E] font-black uppercase tracking-widest">Mentor</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#5B779E]" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-white overflow-hidden">
        
        {/* Header */}
        <header className="h-16 px-4 md:px-8 flex items-center justify-between z-20 bg-white/50 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsUserDropdownOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-all"
            >
              <Menu className="w-6 h-6 text-[#0D245B]" />
            </button>
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2.5 px-2 md:px-4 py-2 hover:bg-slate-100 rounded-xl transition-all group text-[#0D245B]"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shrink-0">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest hidden sm:block">Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <Search className="w-5 h-5 text-[#5B779E]" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-2 border-slate-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Arjun" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Hero or Chat */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar items-center pb-32">
          {!showChat ? (
            <div className="max-w-[1000px] w-full pt-10 md:pt-20 px-4 md:px-6 flex flex-col items-center">
              <div className="text-center mb-6 md:mb-12">
                <h1 className="text-[26px] md:text-[56px] leading-tight font-black tracking-tighter mb-2">
                  Hello, <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400 bg-clip-text text-transparent">Arjun</span>
                </h1>
                <h2 className="text-[22px] md:text-[56px] leading-tight font-black text-slate-200">
                  How can I help you today?
                </h2>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full mt-5 md:mt-8 max-w-[800px]">
                {suggestions.slice(0, 4).map((s, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleSend(`${s.title} ${s.desc}`)}
                    className="p-4 md:p-5 bg-slate-50/50 hover:bg-white rounded-[24px] md:rounded-[32px] cursor-pointer transition-all flex flex-col justify-between h-[140px] md:h-[180px] group shadow-sm hover:shadow-xl border border-slate-100/50 hover:border-blue-100"
                  >
                    <div>
                      <p className="text-[12px] md:text-[14px] font-black text-[#0D245B] mb-1 md:mb-2 uppercase tracking-tight">{s.title}</p>
                      <p className="text-[10px] md:text-[12px] text-[#5B779E] font-bold leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="flex justify-end">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl ${s.bg} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border border-white/50`}>
                        <s.icon className={`w-4 h-4 md:w-5 md:h-5 ${s.color}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[800px] flex flex-col gap-6 py-8 px-4 md:px-0">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 md:gap-5 ${msg.role === 'user' ? 'justify-end' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#0D245B] flex items-center justify-center text-white shrink-0 mt-1 shadow-lg ring-4 ring-blue-50">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    </div>
                  )}
                  <div className={`max-w-[88%] md:max-w-[80%] rounded-[20px] md:rounded-[24px] p-3 md:p-5 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                      : 'bg-slate-50 border border-slate-100 text-[#0D245B] font-bold leading-[1.6]'
                  }`}>
                    <p className="text-[12px] md:text-[14px] tracking-tight">{msg.content}</p>
                    <span className={`text-[8px] md:text-[9px] mt-1.5 md:mt-2 block font-black uppercase tracking-widest ${msg.role === 'user' ? 'text-blue-100' : 'text-[#5B779E]'}`}>{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Floating Chat Input — Gemini pill style */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-12 bg-linear-to-t from-white via-white/95 to-transparent z-30">
          <div className="max-w-[760px] mx-auto">

            {/* Mode chips — shown above the pill when a mode is active */}
            {aiMode !== "Default" && (
              <div className="flex items-center gap-2 mb-2 px-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  aiMode === "Deep Research"
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-indigo-50 text-indigo-600 border-indigo-200"
                }`}>
                  {aiMode === "Deep Research" ? <SearchCode className="w-3 h-3" /> : <Lightbulb className="w-3 h-3" />}
                  {aiMode}
                  <button onClick={() => setAiMode("Default")} className="ml-1 opacity-60 hover:opacity-100">✕</button>
                </span>
              </div>
            )}

            <input type="file" ref={fileInputRef} className="hidden" />

            {/* Gemini-style pill */}
            <div className="flex items-center gap-2 md:gap-3 bg-[#F0F4F9] hover:bg-[#E8EDF5] focus-within:bg-white border border-transparent focus-within:border-slate-200 focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-full px-3 md:px-4 py-2 md:py-2.5 transition-all duration-300 group relative">

              {/* Left: + button with blue dot (Gemini style) */}
              <div className="relative">
                <button 
                  onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                  className={`relative shrink-0 p-1 transition-colors rounded-full ${isAttachmentMenuOpen ? 'bg-slate-200 text-[#0D245B]' : 'text-[#5B779E] hover:text-[#0D245B]'}`}
                >
                  <Plus className={`w-5 h-5 md:w-[22px] md:h-[22px] transition-transform ${isAttachmentMenuOpen ? 'rotate-45' : ''}`} strokeWidth={2} />
                  {!isAttachmentMenuOpen && <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#F0F4F9] group-focus-within:border-white transition-colors" />}
                </button>
                
                {/* Attachment Menu */}
                {isAttachmentMenuOpen && (
                  <div className="absolute bottom-full left-0 mb-3 w-[260px] bg-[#1E1E1E] text-[#E3E3E3] rounded-3xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <button 
                      onClick={() => { fileInputRef.current?.click(); setIsAttachmentMenuOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Paperclip className="w-5 h-5" />
                        <span className="text-[15px] font-medium">Upload files</span>
                      </div>
                      <Info className="w-4 h-4 text-slate-400" />
                    </button>
                    <button 
                      onClick={() => { alert('Add from Drive selected'); setIsAttachmentMenuOpen(false); }}
                      className="w-full flex items-center px-4 py-2.5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Cloud className="w-5 h-5" />
                        <span className="text-[15px] font-medium">Add from Drive</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => { alert('Notebooks selected'); setIsAttachmentMenuOpen(false); }}
                      className="w-full flex items-center px-4 py-2.5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Book className="w-5 h-5" />
                        <span className="text-[15px] font-medium">Notebooks</span>
                      </div>
                    </button>
                    <div className="my-2 border-t border-white/10"></div>
                    <button 
                      onClick={() => { alert('Guided Learning selected'); setIsAttachmentMenuOpen(false); }}
                      className="w-full flex items-center px-4 py-2.5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-[15px] font-medium">Guided Learning</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Input */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Mentix AI anything..."
                className="flex-1 bg-transparent border-none outline-none text-[13px] md:text-[15px] font-medium text-[#0D245B] placeholder:text-[#8A9BB5] placeholder:font-normal min-w-0"
              />

              {/* Right controls */}
              <div className="flex items-center gap-1 shrink-0">

                {/* Mode toggle — compact pill (Gemini "Flash" style) */}
                <button
                  onClick={() => setAiMode(aiMode === "Deep Research" ? "Default" : "Deep Research")}
                  className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold transition-all border ${
                    aiMode === "Deep Research"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-transparent text-[#5B779E] border-transparent hover:bg-slate-200/60"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  Research
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {/* Mic */}
                <button
                  onClick={() => setAiMode(aiMode === "Think" ? "Default" : "Think")}
                  className={`p-2 rounded-full transition-all ${
                    aiMode === "Think"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-[#5B779E] hover:text-[#0D245B] hover:bg-slate-200/60"
                  }`}
                  title="Think mode"
                >
                  <Mic className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2} />
                </button>

                {/* Image */}
                <button className="p-2 rounded-full text-[#5B779E] hover:text-[#0D245B] hover:bg-slate-200/60 transition-all">
                  <ImageIcon className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2} />
                </button>

                {/* Send — appears when there's input */}
                {input.trim() && (
                  <button
                    onClick={() => handleSend()}
                    className="p-2 bg-[#0D245B] text-white rounded-full hover:bg-blue-700 shadow-md transition-all animate-in zoom-in duration-200 active:scale-90 ml-0.5"
                  >
                    <Send className="w-4 h-4 fill-current" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-[10px] text-[#A0AEBF] font-medium text-center mt-3 pb-1">
              Mentix AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E2E8F0; border-radius: 20px; }
      `}} />
    </div>
  );
}
