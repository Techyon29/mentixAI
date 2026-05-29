"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24V28H35.303C33.656 32.613 29.214 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691L13.161 19.467C14.887 15.179 19.068 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691Z"
    />
    <path
      fill="#4CAF50"
      d="M24 44C29.166 44 33.863 42.023 37.406 38.808L30.932 33.56C29.006 35.127 26.602 36 24 36C18.798 36 14.428 32.428 12.87 27.828L6.035 33.003C9.37 39.52 16.148 44 24 44Z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24V28H35.303C34.69 29.743 33.541 31.309 32.062 32.551L32.064 32.549L38.486 37.808C38.1 38.158 44 33.722 44 24C44 22.659 43.862 21.35 43.611 20.083Z"
    />
  </svg>
);

export const Logo = () => (
  <div className="relative w-20 h-20">
    <Image 
      src="/logo.png" 
      alt="Mentix AI Logo" 
      fill 
      className="object-contain drop-shadow-sm"
    />
  </div>
);

export const Sparkle = ({ className }: { className: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z"
      fill="white"
    />
  </svg>
);

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#D8EDFF] flex items-center justify-center pointer-events-none">
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 15s infinite alternate;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>

      {/* Soft gradient base layers */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-[#E6F3FF] to-transparent opacity-80"></div>

      {/* Deep back sphere (top center) */}
      <div className="absolute -top-[15%] left-[40%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-white/60 to-[#A0D5FF]/30 blur-[80px] animate-blob"></div>

      {/* Orbit Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 animate-[spin_60s_linear_infinite]">
        <svg
          viewBox="0 0 1000 1000"
          className="absolute w-[180%] h-[180%] max-w-[1500px]"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse
            cx="400"
            cy="500"
            rx="600"
            ry="250"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            transform="rotate(-20 400 500)"
          ></ellipse>
          <ellipse
            cx="600"
            cy="600"
            rx="500"
            ry="200"
            fill="none"
            stroke="white"
            strokeWidth="1"
            transform="rotate(25 600 600)"
          ></ellipse>
        </svg>
      </div>

      {/* Large Left Sphere */}
      <div
        className="absolute top-[20%] -left-[15%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#E1F1FF] to-[#A9DBFF] 
        shadow-[inset_-20px_-20px_60px_rgba(255,255,255,0.8),_inset_20px_20px_60px_rgba(255,255,255,0.9)] 
        opacity-90 blur-[2px] animate-blob animation-delay-2000"
      ></div>

      {/* Large Right Sphere */}
      <div
        className="absolute top-[15%] -right-[15%] w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-[#C7E6FF] to-[#F0F8FF] 
        shadow-[inset_30px_30px_80px_rgba(255,255,255,1),_inset_-10px_-10px_40px_rgba(150,200,255,0.3)] 
        opacity-90 blur-[1px] animate-blob animation-delay-4000"
      ></div>

      {/* Bottom Right Small Sphere */}
      <div
        className="absolute bottom-[5%] right-[10%] w-[120px] h-[120px] rounded-full bg-gradient-to-tr from-[#BDE0FF] to-white 
        shadow-[0_15px_30px_rgba(100,160,255,0.2),_inset_-5px_-5px_15px_rgba(255,255,255,1),_inset_5px_5px_15px_rgba(255,255,255,0.8)] 
        backdrop-blur-sm z-20 animate-blob"
      ></div>

      {/* Bottom Left Medium blurry Sphere */}
      <div className="absolute bottom-[10%] left-[8%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-white/80 to-[#A0D5FF]/40 blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Sparkles */}
      <Sparkle className="absolute top-[35%] left-[25%] w-3 h-3 opacity-80 animate-[pulse_3s_ease-in-out_infinite]" />
      <Sparkle className="absolute top-[15%] right-[20%] w-4 h-4 opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,1)] animate-[pulse_4s_ease-in-out_infinite]" />
      <Sparkle className="absolute bottom-[40%] right-[30%] w-2 h-2 opacity-60 animate-[pulse_2s_ease-in-out_infinite]" />
      <Sparkle className="absolute bottom-[20%] left-[15%] w-3 h-3 opacity-90 animate-[pulse_5s_ease-in-out_infinite]" />
    </div>
  );
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [view, setView] = useState<
    "login" | "forgot_email" | "forgot_otp" | "forgot_reset"
  >("login");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [userType, setUserType] = useState<"institute" | "teacher" | "student">("student");
  const [institutes, setInstitutes] = useState<any[]>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const res = await fetch("/api/institute");
        const data = await res.json();
        if (data.institutes) {
          setInstitutes(data.institutes);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchInstitutes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    if (view === "forgot_email") {
      setView("forgot_otp");
    } else if (view === "forgot_otp") {
      setView("forgot_reset");
    } else if (view === "forgot_reset") {
      setNotification({
        type: "success",
        message:
          "Password reset successfully! Please log in with your new password.",
      });
      setView("login");
    } else if (view === "login") {
      const loginUrl =
        userType === "institute"
          ? "/api/auth/institute/login"
          : userType === "teacher"
          ? "/api/auth/teacher/login"
          : "/api/auth/student/login";

      try {
        const res = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            ...(userType !== "institute" && { instituteId: selectedInstitute }),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          setNotification({ type: "error", message: data.error || "Login failed" });
          return;
        }

        setNotification({ type: "success", message: "Login successful!" });
        if (userType === "student") {
          router.push("/student-dashboard");
        } else {
          router.push("/mentor-dashboard");
        }
      } catch (err: any) {
        setNotification({ type: "error", message: "An error occurred during login." });
      }
    }
  };

  const getHeaderContent = () => {
    switch (view) {
      case "forgot_email":
        return {
          title: "Reset Password",
          desc: "Enter your email to receive a reset link",
        };
      case "forgot_otp":
        return {
          title: "Enter OTP",
          desc: "We've sent a verification code to your email",
        };
      case "forgot_reset":
        return { title: "New Password", desc: "Create a strong new password" };
      default:
        return {
          title: "Welcome Back!",
          desc: "Login to continue your assessment journey",
        };
    }
  };

  const getButtonText = () => {
    switch (view) {
      case "forgot_email":
        return "Send OTP";
      case "forgot_otp":
        return "Verify OTP";
      case "forgot_reset":
        return "Reset Password";
      default:
        return "Login";
    }
  };

  const header = getHeaderContent();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-sans text-slate-800 antialiased overflow-hidden selection:bg-blue-200">
      <Background />

      {/* Main Glass Card */}
      <div
        className="relative z-10 w-full max-w-[540px] px-10 py-12 md:px-[60px] md:py-[50px] mx-4 rounded-[32px] 
        bg-white/40 backdrop-blur-2xl 
        border-[1.5px] border-white/60
        shadow-[0_20px_80px_-20px_rgba(30,100,200,0.15),_inset_0_0_20px_rgba(255,255,255,0.5)]
        flex flex-col items-center transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Logo />
          <span className="text-[20px] font-black text-[#0D245B] tracking-tight uppercase">
            Mentix AI
          </span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-[28px] font-black text-[#0D245B] mb-2 tracking-tighter uppercase">
            {header.title}
          </h2>
          <p className="text-[#5B779E] text-[13px] font-black uppercase tracking-widest">
            {header.desc}
          </p>
        </div>

        {notification && (
          <div
            className={`w-full mb-6 p-4 rounded-2xl flex items-start gap-3 border backdrop-blur-md transition-all duration-300 animate-in fade-in zoom-in-95 ${
              notification.type === "success"
                ? "bg-emerald-50/70 border-emerald-200/60 text-emerald-700 shadow-[0_2px_10px_rgba(16,185,129,0.08)]"
                : "bg-red-50/70 border-red-200/60 text-red-700 shadow-[0_2px_10px_rgba(239,68,68,0.08)]"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2
                className="w-[18px] h-[18px] mt-[1px] text-emerald-600 flex-shrink-0"
                strokeWidth={2.5}
              />
            ) : (
              <AlertCircle
                className="w-[18px] h-[18px] mt-[1px] text-red-600 flex-shrink-0"
                strokeWidth={2.5}
              />
            )}
            <div className="flex-1 text-[14.5px] font-medium leading-[20px]">
              {notification.message}
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="p-0.5 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="w-[15px] h-[15px]" strokeWidth={2.5} />
            </button>
          </div>
        )}

        <form className="w-full space-y-[22px]" onSubmit={handleSubmit}>
          {view === "login" && (
            <div className="space-y-[6px]">
              <label className="block text-[14.5px] font-medium text-[#4A678E] ml-1">
                Role
              </label>
              <div className="relative flex items-center">
                <User
                  className="absolute left-4 w-5 h-5 text-[#7C97BB]"
                  strokeWidth={1.5}
                />
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value as any)}
                  required
                  className="w-full pl-[46px] pr-12 py-3.5 rounded-2xl bg-white/40 border border-white/70 
                    focus:outline-none focus:ring-[3px] focus:ring-blue-400/30 focus:border-blue-400/50 
                    transition-all text-[#0D245B] font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] appearance-none"
                >
                  <option value="institute">Institute</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
                <div className="absolute right-4 pointer-events-none text-[#7C97BB]">
                  <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          )}

          {view === "login" && (userType === "teacher" || userType === "student") && (
            <div className="space-y-[6px]">
              <label className="block text-[14.5px] font-medium text-[#4A678E] ml-1">
                Select Institute
              </label>
              <div className="relative flex items-center">
                <User
                  className="absolute left-4 w-5 h-5 text-[#7C97BB]"
                  strokeWidth={1.5}
                />
                <select
                  value={selectedInstitute}
                  onChange={(e) => setSelectedInstitute(e.target.value)}
                  required
                  className="w-full pl-[46px] pr-12 py-3.5 rounded-2xl bg-white/40 border border-white/70 
                    focus:outline-none focus:ring-[3px] focus:ring-blue-400/30 focus:border-blue-400/50 
                    transition-all text-[#0D245B] font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] appearance-none"
                >
                  <option value="" disabled hidden>
                    Choose your institute
                  </option>
                  {institutes.map((inst) => (
                    <option key={inst._id} value={inst._id}>
                      {inst.instituteName}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 pointer-events-none text-[#7C97BB]">
                  <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          )}

          {(view === "login" || view === "forgot_email") && (
            <div className="space-y-2">
              <label className="block text-[11px] font-black text-[#5B779E] ml-1 uppercase tracking-widest">
                Email address
              </label>
              <div className="relative flex items-center">
                <Mail
                  className="absolute left-4 w-5 h-5 text-[#5B779E]"
                  strokeWidth={2.5}
                />
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  className="w-full pl-[46px] pr-4 py-4 rounded-[20px] bg-slate-50/50 border border-slate-100 
                    focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-200 focus:bg-white
                    transition-all placeholder:text-[#5B779E]/40 text-[#0D245B] text-[13px] font-black shadow-sm"
                />
              </div>
            </div>
          )}

          {view === "forgot_otp" && (
            <div className="space-y-2">
              <label className="block text-[11px] font-black text-[#5B779E] ml-1 uppercase tracking-widest">
                One-Time Password (OTP)
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute left-4 w-5 h-5 text-[#5B779E]"
                  strokeWidth={2.5}
                />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="w-full pl-[46px] pr-4 py-4 rounded-[20px] bg-slate-50/50 border border-slate-100 
                    focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-200 focus:bg-white
                    transition-all placeholder:text-[#5B779E]/40 text-[#0D245B] text-[13px] font-black shadow-sm"
                />
              </div>
            </div>
          )}

          {(view === "login" || view === "forgot_reset") && (
            <div className="space-y-2">
              <label className="block text-[11px] font-black text-[#5B779E] ml-1 uppercase tracking-widest">
                {view === "forgot_reset" ? "New Password" : "Password"}
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute left-4 w-5 h-5 text-[#5B779E]"
                  strokeWidth={2.5}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-[46px] pr-12 py-4 rounded-[20px] bg-slate-50/50 border border-slate-100 
                    focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-200 focus:bg-white
                    transition-all placeholder:text-[#5B779E]/40 text-[#0D245B] text-[13px] font-black shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#5B779E] hover:text-[#0D245B] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={2.5} />
                  )}
                </button>
              </div>
            </div>
          )}

          {view === "forgot_reset" && (
            <div className="space-y-[6px]">
              <label className="block text-[14.5px] font-medium text-[#4A678E] ml-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute left-4 w-5 h-5 text-[#7C97BB]"
                  strokeWidth={1.5}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm your new password"
                  className="w-full pl-[46px] pr-12 py-3.5 rounded-2xl bg-white/40 border border-white/70 
                    focus:outline-none focus:ring-[3px] focus:ring-blue-400/30 focus:border-blue-400/50 
                    transition-all placeholder:text-[#8AA6CA] text-[#0D245B] font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 text-[#7C97BB] hover:text-[#4A678E] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-[18px] h-[18px]" strokeWidth={2} />
                  ) : (
                    <Eye className="w-[18px] h-[18px]" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Options Row */}
          {view === "login" && (
            <div className="flex items-center justify-between pt-1 pb-1">
              <label className="flex items-center gap-[8px] cursor-pointer group">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center backdrop-blur-md transition-all group-active:scale-95 ${
                    rememberMe
                      ? "bg-[#2481FF]/60 border border-white/50 text-white shadow-[0_2px_8px_rgba(36,129,255,0.3),_inset_0_1px_1px_rgba(255,255,255,0.4)]"
                      : "bg-white/40 border border-white/60 text-transparent hover:bg-white/50"
                  }`}
                >
                  <Check className="w-[14px] h-[14px]" strokeWidth={3} />
                </div>
                <span className="text-[14px] font-medium text-[#5B779E] group-hover:text-[#4A678E] transition-colors">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setView("forgot_email");
                  setNotification(null);
                }}
                className="text-[14px] font-semibold text-[#1A73E8] hover:text-[#1557A0] transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Main Action Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-[24px] text-white font-black text-[13px] uppercase tracking-[0.2em]
              bg-[#0D245B] hover:bg-[#0D3694]
              shadow-[0_20px_40px_-10px_rgba(13,36,91,0.3)]
              active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>{getButtonText()}</span>
            <span className="text-lg">&rarr;</span>
          </button>
        </form>

        {view === "login" && (
          <>
            {/* Social Login Divider */}
            <div className="w-full flex items-center gap-4 mt-8 mb-6">
              <div className="flex-1 h-[1px] bg-slate-100"></div>
              <span className="text-[10px] text-[#5B779E] font-black uppercase tracking-widest">
                Or connect via
              </span>
              <div className="flex-1 h-[1px] bg-slate-100"></div>
            </div>

            {/* Social Buttons */}
            <div className="w-full">
              <button
                className="w-full flex justify-center items-center gap-3 py-4 rounded-[24px]
                bg-white border border-slate-100 hover:bg-slate-50 transition-all duration-300
                shadow-sm active:scale-[0.98]"
              >
                <GoogleIcon />
                <span className="text-[11px] font-black text-[#5B779E] uppercase tracking-widest">
                  Continue with Google
                </span>
              </button>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-[14.5px] font-medium text-[#5B779E] text-center">
          {view !== "login" ? (
            <button
              type="button"
              onClick={() => {
                setView("login");
                setNotification(null);
              }}
              className="font-semibold text-[#1A73E8] hover:text-[#1557A0] transition-colors"
            >
              &larr; Back to Login
            </button>
          ) : (
            <>
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#1A73E8] hover:text-[#1557A0] transition-colors ml-1"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
