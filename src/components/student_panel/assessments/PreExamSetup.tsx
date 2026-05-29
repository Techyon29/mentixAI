"use client";

import React, { useEffect, useRef, useState } from 'react';
import { 
  Camera, 
  Mic, 
  Maximize, 
  AlertCircle, 
  CheckCircle, 
  Video, 
  VideoOff, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight,
  FileText,
  Monitor,
  Clock,
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  Info,
  Award,
  Calendar
} from 'lucide-react';

interface PreExamSetupProps {
  onComplete: () => void;
  testName: string;
}

const PreExamSetup: React.FC<PreExamSetupProps> = ({ onComplete, testName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micLevel, setMicLevel] = useState(0);
  const [status, setStatus] = useState({
    camera: 'pending',
    mic: 'pending',
    fullscreen: 'pending',
    screen: 'pending'
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [stream]);

  useEffect(() => {
    const handleFsChange = () => {
      setStatus(prev => ({ 
        ...prev, 
        fullscreen: document.fullscreenElement ? 'success' : 'pending' 
      }));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const startMedia = async (target: 'camera' | 'mic' | 'both' = 'both') => {
    setErrorMessage('');
    
    try {
      const constraints = {
        video: target === 'camera' || target === 'both' ? { width: 1280, height: 720 } : false,
        audio: target === 'mic' || target === 'both' ? true : false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (constraints.video) {
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
        setStatus(prev => ({ ...prev, camera: 'success' }));
      }

      if (constraints.audio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(mediaStream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        
        const updateMicLevel = () => {
          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setMicLevel(average);
          animationRef.current = requestAnimationFrame(updateMicLevel);
        };
        updateMicLevel();
        setStatus(prev => ({ ...prev, mic: 'success' }));
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
      if (target === 'camera' || target === 'both') setStatus(prev => ({ ...prev, camera: 'error' }));
      if (target === 'mic' || target === 'both') setStatus(prev => ({ ...prev, mic: 'error' }));
      setErrorMessage("Permissions denied. Please enable them in your browser settings.");
    }
  };

  const handleEnableScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setStatus(prev => ({ ...prev, screen: 'success' }));
      // In a real app we'd track this stream, but for this setup we just verify permission
      screenStream.getTracks().forEach(track => track.onended = () => setStatus(prev => ({ ...prev, screen: 'pending' })));
    } catch (err) {
      console.error("Error enabling screen share:", err);
      setStatus(prev => ({ ...prev, screen: 'error' }));
      setErrorMessage("Screen sharing permission is required for the proctored test.");
    }
  };

  const handleEnableFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.error("Error enabling fullscreen:", err);
      setErrorMessage("Could not enable fullscreen. Please try again or check browser settings.");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const verifyOtp = () => {
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMessage("Please enter the complete 6-digit code.");
      return;
    }
    
    // Check all required permissions
    const allPermissionsMet = 
      status.camera === 'success' && 
      status.mic === 'success' && 
      status.fullscreen === 'success' && 
      status.screen === 'success';

    if (!allPermissionsMet) {
      setErrorMessage("Please enable all required hardware and browser permissions before entering the code.");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#F8FAFC] flex flex-col font-sans overflow-y-auto custom-scrollbar">
      
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">M</div>
          <span className="font-black text-slate-800 tracking-tighter text-lg">MENTIX AI</span>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
             Student Verification Portal — 2.0.4
           </span>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Main Area: Instructions & OTP */}
        <div className="flex-1 p-8 md:p-12 space-y-10">
          
          {/* Instructions Header */}
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-4">
              Instructions
              <div className="h-px flex-1 bg-slate-200" />
            </h2>
            <div className="space-y-4 text-slate-600 text-[16px] leading-relaxed font-medium">
              <p>Assessments are highly regarded by our industry partners as they are trusted to be the true representation of a student's skills.</p>
              <p>Tests will be awarded following successful verification through integrity checks. To ensure successful verification, please follow these guidelines:</p>
              
              <ul className="space-y-3 mt-6">
                {[
                  "Ensure you're sharing the entire screen during the session, rather than just a tab or window.",
                  "Maintain focus solely on the assessment window. Close all other tabs, windows, and notifications.",
                  "Refrain from using in-browser AI assistance or any other helper tools during the test.",
                  "Share your webcam feed at all times and avoid interacting with peers or leaving your seat."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start group">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proctoring Guidelines Box */}
            <div className="mt-8 bg-amber-50/50 border border-dashed border-amber-200 rounded-3xl p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -mr-16 -mt-16 blur-3xl" />
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                    <h3 className="text-xl font-bold text-amber-900">Proctoring Guidelines</h3>
                  </div>
                  <p className="text-amber-800/80 font-medium leading-relaxed max-w-2xl">
                    This assessment requires you to share your <span className="font-bold">Camera and Microphone</span> feed, as well as your <span className="font-bold">entire screen</span>. Failure to maintain any of these will result in immediate disqualification.
                  </p>
               </div>
            </div>
          </section>

          {/* Bottom OTP Section */}
          <section className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm">
             <div className="text-center mb-8">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Verification Step</h3>
               <h2 className="text-2xl font-black text-slate-900">Enter the Security code shared by your mentor</h2>
             </div>
             
             <div className="max-w-xl mx-auto space-y-8">
                <div className="grid grid-cols-6 gap-4">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-full aspect-square border-2 border-slate-100 rounded-2xl text-center text-3xl font-black text-slate-900 focus:border-blue-600 focus:ring-8 focus:ring-blue-50 outline-none transition-all placeholder-slate-200"
                      placeholder="•"
                    />
                  ))}
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold leading-tight">{errorMessage}</span>
                  </div>
                )}

                <button 
                  onClick={verifyOtp}
                  disabled={isVerifying}
                  className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                      Verifying Integrity...
                    </div>
                  ) : (
                    <>Establish Connection & Start <ArrowRight className="w-6 h-6" /></>
                  )}
                </button>
             </div>
          </section>
        </div>

        {/* Right Sidebar: Exam Details & Permissions */}
        <div className="w-full md:w-[450px] bg-white border-l border-slate-100 p-8 space-y-8">
          
          {/* Exam Details Card */}
          <section className="bg-slate-50 border border-slate-100 rounded-[32px] overflow-hidden">
            <div className="bg-blue-600 p-6 flex items-center gap-4 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                 <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Exam Details</h3>
            </div>
            <div className="p-8 space-y-6">
               {[
                 { label: 'Exam Name', value: testName, icon: FileText },
                 { label: 'Total Questions', value: '50', icon: LayoutDashboard },
                 { label: 'Duration', value: '60 Minutes', icon: Clock },
                 { label: 'Total Marks', value: '100', icon: Award },
                 { label: 'Start Time', value: '10:30 AM, 18 May 2025', icon: Calendar },
               ].map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-500">{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-slate-800">{item.value}</span>
                 </div>
               ))}
            </div>
          </section>

          {/* Permissions Panel */}
          <section className="space-y-6 pt-4">
             <div className="flex justify-between items-center">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Hardware Compliance</h3>
               {status.camera === 'success' && status.mic === 'success' && status.fullscreen === 'success' && status.screen === 'success' && (
                 <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   ALL SYSTEMS READY
                 </span>
               )}
             </div>

             <div className="space-y-3">
               {/* Camera/Mic Pair (Simplified Image-like) */}
               <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-6 space-y-6">
                 <div className="flex justify-between items-center">
                   <div className="flex items-center gap-4">
                     <Camera className="w-5 h-5 text-slate-400" />
                     <span className="text-[13px] font-bold text-slate-700">Camera & Microphone</span>
                   </div>
                   {status.camera === 'success' && status.mic === 'success' ? (
                     <CheckCircle className="w-5 h-5 text-blue-600" />
                   ) : (
                     <button onClick={() => startMedia('both')} className="text-[#5138EE] font-black text-[11px] uppercase tracking-wider hover:underline">Enable</button>
                   )}
                 </div>
                 
                 <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-inner relative group border-2 border-slate-100">
                    {status.camera === 'success' ? (
                      <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-700">
                        <VideoOff className="w-8 h-8 mb-2 opacity-20" />
                        <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Feed Offline</span>
                      </div>
                    )}
                    {status.camera === 'success' && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-black/40 backdrop-blur-md rounded-full overflow-hidden p-0.5 border border-white/10">
                           <div className="h-full bg-blue-500 transition-all rounded-full" style={{ width: `${Math.min(micLevel * 2, 100)}%` }} />
                        </div>
                        <Mic className={`w-3.5 h-3.5 ${micLevel > 10 ? 'text-blue-400 animate-pulse' : 'text-white/40'}`} />
                      </div>
                    )}
                 </div>
               </div>

               {/* Screen Sharing */}
               <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-6 space-y-6">
                 <div className="flex justify-between items-center">
                   <div className="flex items-center gap-4">
                     <Monitor className="w-5 h-5 text-slate-400" />
                     <span className="text-[13px] font-bold text-slate-700">Screen Sharing</span>
                   </div>
                   {status.screen === 'success' ? (
                     <CheckCircle className="w-5 h-5 text-blue-600" />
                   ) : (
                     <button onClick={handleEnableScreenShare} className="text-[#5138EE] font-black text-[11px] uppercase tracking-wider hover:underline">Enable</button>
                   )}
                 </div>
                 <div className="aspect-[21/9] bg-slate-200 rounded-2xl flex items-center justify-center border-2 border-slate-100">
                    <Monitor className={`w-8 h-8 ${status.screen === 'success' ? 'text-blue-500 animate-pulse' : 'text-slate-400 opacity-20'}`} />
                 </div>
               </div>

               {/* Full Screen Lockdown */}
               <button 
                 onClick={handleEnableFullscreen}
                 className={`w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between transition-all hover:bg-slate-100 ${status.fullscreen === 'success' ? 'opacity-100' : 'opacity-60'}`}
               >
                 <div className="flex items-center gap-4">
                   <Maximize className={`w-5 h-5 ${status.fullscreen === 'success' ? 'text-blue-600' : 'text-slate-400'}`} />
                   <div className="text-left">
                     <span className="block text-sm font-black text-slate-900 leading-none">Browser Lockdown</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{status.fullscreen === 'success' ? 'Locked' : 'Required'}</span>
                   </div>
                 </div>
                 {status.fullscreen === 'success' ? <CheckCircle className="w-5 h-5 text-blue-600" /> : <div className="w-5 h-5 border-2 border-slate-200 rounded-lg" />}
               </button>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PreExamSetup;
