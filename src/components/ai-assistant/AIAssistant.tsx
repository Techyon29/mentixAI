"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, Sparkles, User, MessageSquare, Plus, 
  Search, Trash2, Settings, ChevronRight, 
  Image as ImageIcon, Mic, Paperclip, MoreHorizontal,
  History, Zap, Brain, Wand2, Compass, ArrowLeft,
  Home, Clock, Bookmark, Gem, LayoutGrid, HelpCircle,
  Menu, ChevronDown, FlaskConical, SearchCode, Lightbulb,
  Leaf, Variable, FileText, Layout, MousePointer2, LogOut
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AIAssistant() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
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
    <div className="flex h-screen bg-white font-sans text-[#1f1f1f] overflow-hidden">
      
      {/* Sidebar - Gemini Style */}
      <aside className="w-[280px] flex flex-col bg-[#f8fafd] border-r border-[#e3e3e3] p-4 pt-6">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[20px] font-medium text-[#444746]">Mentix AI</span>
        </div>

        <button 
          onClick={resetChat}
          className="w-fit flex items-center gap-3 px-6 py-4 bg-[#e9eef6] hover:bg-[#dde3ea] text-[#041e49] rounded-2xl transition-all mb-8 shadow-sm group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          <span className="text-[14px] font-medium">New chat</span>
        </button>

        <nav className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
          <div className="space-y-1 mb-6">
            <button className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full bg-[#d3e3fd] text-[#041e49] font-medium transition-all text-[14px]">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            {[
              { icon: Clock, label: "Recent" },
              { icon: Bookmark, label: "Saved" },
              { icon: Gem, label: "Mentix Gems", badge: "New" },
              { icon: Compass, label: "Explore" },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full hover:bg-[#e9eef6] text-[#444746] font-medium transition-all text-[14px]">
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-bold">{item.badge}</span>}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#e3e3e3]">
            <h4 className="px-4 text-[13px] font-medium text-[#444746] mb-3">Recent chats</h4>
            <div className="space-y-1">
              <p className="px-4 text-[11px] font-bold text-[#444746]/60 uppercase tracking-wider mb-2">Today</p>
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
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full hover:bg-[#e9eef6] text-[#444746] transition-all text-[14px] group text-left"
                >
                  <MessageSquare className="w-4 h-4 opacity-70" />
                  <span className="truncate flex-1">{chat.title}</span>
                </button>
              ))}
              <p className="px-4 text-[11px] font-bold text-[#444746]/60 uppercase tracking-wider mt-4 mb-2">Yesterday</p>
              {recentChats.slice(5).map((chat) => (
                <button 
                  key={chat.id} 
                  onClick={() => {
                    setShowChat(true);
                    setMessages([{
                      role: "assistant",
                      content: `Continuing our chat from yesterday about "${chat.title}". What's the next step?`,
                      time: "Just now"
                    }]);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full hover:bg-[#e9eef6] text-[#444746] transition-all text-[14px] group text-left"
                >
                  <MessageSquare className="w-4 h-4 opacity-70" />
                  <span className="truncate flex-1">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="pt-6 border-t border-[#e3e3e3] space-y-1">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-full hover:bg-[#e9eef6] text-[#444746] font-medium transition-all text-[13px]">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <div className="text-left flex-1">
              <p className="font-bold">Upgrade to Mentix Pro</p>
              <p className="text-[11px] text-[#444746]/60">Get Gemini Advanced features</p>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-full hover:bg-[#e9eef6] text-[#444746] font-medium transition-all text-[13px]">
            <Settings className="w-5 h-5" />
            <span className="flex-1 text-left">Settings & help</span>
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
          </button>
          <div className="p-2 pt-4 relative">
            <div 
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-3 px-4 py-3 bg-white border border-[#e3e3e3] rounded-2xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all group"
            >
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Arjun" className="w-8 h-8 rounded-full" />
              <div className="flex-1 text-left">
                <p className="text-[13px] font-bold text-[#1f1f1f]">Arjun Mehta</p>
                <p className="text-[11px] text-[#444746]">Mentor</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#444746] transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isUserDropdownOpen && (
              <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-[#e3e3e3] rounded-2xl shadow-xl p-2 animate-in slide-in-from-bottom-2 duration-200">
                <Link href="/mentor-dashboard/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f0f4f9] text-[#444746] text-[13px] font-medium transition-colors">
                  <User className="w-4 h-4" /> My Profile
                </Link>
                <button onClick={() => setIsUserDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f0f4f9] text-[#444746] text-[13px] font-medium transition-colors border-t border-[#f0f4f9]">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-white overflow-hidden">
        
        {/* Header */}
        <header className="h-16 px-8 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#f0f4f9] rounded-xl transition-all group text-[#444746]"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#e3e3e3] flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
              <span className="text-[14px] font-black uppercase tracking-wider">Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#f0f4f9] rounded-full transition-all">
              <LayoutGrid className="w-5 h-5 text-[#444746]" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border border-[#e3e3e3]">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Arjun" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Hero or Chat */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar items-center">
          {!showChat ? (
            <div className="max-w-[800px] w-full pt-20 px-6 flex flex-col items-center">
              <div className="text-center mb-12">
                <h1 className="text-[56px] leading-tight font-medium tracking-tight mb-2">
                  Hello, <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">Arjun</span>
                </h1>
                <h2 className="text-[56px] leading-tight font-medium text-[#c4c7c5]">
                  How can I help you today?
                </h2>
              </div>

              {/* Chat Input Container */}
              <div className="w-full max-w-[800px] relative mb-12">
                <div className="bg-[#f0f4f9] rounded-[28px] p-4 pt-6 pb-6 shadow-sm border border-transparent focus-within:bg-white focus-within:shadow-xl focus-within:border-[#e3e3e3] transition-all duration-300">
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask anything..."
                    className="w-full bg-transparent border-none resize-none px-4 text-[18px] text-[#1f1f1f] focus:outline-none min-h-[60px] placeholder:text-[#444746]/60"
                  />
                  <div className="flex items-center justify-between px-2 mt-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#e1e5e9] rounded-full transition-all text-[#444746]">
                        <Plus className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setAiMode(aiMode === "Deep Research" ? "Default" : "Deep Research")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-[14px] ${aiMode === "Deep Research" ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'hover:bg-[#e1e5e9] text-[#444746]'}`}
                      >
                        <SearchCode className="w-4 h-4" />
                        Deep Research
                      </button>
                      <button 
                        onClick={() => setAiMode(aiMode === "Think" ? "Default" : "Think")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium text-[14px] ${aiMode === "Think" ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'hover:bg-[#e1e5e9] text-[#444746]'}`}
                      >
                        <Lightbulb className="w-4 h-4" />
                        Think
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#e1e5e9] rounded-full transition-all text-[#444746]">
                        <Mic className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleSend()}
                        disabled={!input.trim()}
                        className={`p-3 rounded-full transition-all ${input.trim() ? 'bg-blue-600 text-white shadow-lg' : 'text-[#c4c7c5] hover:bg-[#e1e5e9]'}`}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions Grid */}
              <div className="grid grid-cols-5 gap-3 w-full max-w-[1000px] mb-20">
                {suggestions.map((s, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleSend(`${s.title} ${s.desc}`)}
                    className="p-5 bg-[#f0f4f9] hover:bg-[#e9eef6] rounded-2xl cursor-pointer transition-all flex flex-col justify-between h-[180px] group shadow-sm hover:shadow-md border border-transparent hover:border-[#e3e3e3]"
                  >
                    <div>
                      <p className="text-[15px] font-bold text-[#1f1f1f] mb-1">{s.title}</p>
                      <p className="text-[13px] text-[#444746] leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="flex justify-end">
                      <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Chat Messages Area */
            <div className="w-full max-w-[800px] flex flex-col p-8 pb-32 space-y-12">
              <button 
                onClick={() => setShowChat(false)}
                className="w-fit flex items-center gap-2 text-[14px] font-bold text-slate-400 hover:text-blue-600 transition-colors mb-4 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </button>

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                  <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'assistant' ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md' : 'border border-[#e3e3e3]'}`}>
                    {msg.role === 'assistant' ? <Zap className="w-5 h-5" /> : <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-full h-full rounded-full" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-[16px] leading-[1.6] text-[#1f1f1f] font-medium whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              
              {/* Floating Input during chat */}
              <div className="fixed bottom-0 left-[280px] right-0 p-6 flex justify-center z-30">
                <div className="w-full max-w-[800px] bg-[#f0f4f9] rounded-[28px] p-3 shadow-xl border border-[#e3e3e3]">
                  <div className="flex items-center gap-2">
                    <button className="p-3 text-[#444746] hover:bg-[#e1e5e9] rounded-full transition-all">
                      <Plus className="w-5 h-5" />
                    </button>
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Enter a prompt here"
                      className="flex-1 bg-transparent border-none py-3 px-2 text-[16px] font-medium text-[#1f1f1f] focus:outline-none placeholder:text-[#444746]/60"
                    />
                    <div className="flex items-center gap-1">
                      <button className="p-3 text-[#444746] hover:bg-[#e1e5e9] rounded-full transition-all">
                        <Mic className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleSend()}
                        className={`p-3 rounded-full transition-all ${input.trim() ? 'bg-blue-600 text-white shadow-lg' : 'text-[#c4c7c5] hover:bg-[#e1e5e9]'}`}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Disclaimer */}
          <footer className="w-full flex flex-col items-center py-4 px-6 z-10">
            <p className="text-[12px] text-[#444746]/60 font-medium text-center max-w-[600px]">
              Mentix AI may display inaccurate info, including about people, so double-check its responses. 
              <Link href="#" className="underline ml-1">Your privacy & Mentix AI</Link>
            </p>
          </footer>
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
