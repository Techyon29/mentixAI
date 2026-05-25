"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
          <span className="text-[24px] font-bold text-[#0D245B] tracking-tight">
            Mentix AI
          </span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-[32px] font-bold text-[#0D245B] mb-2 tracking-tight">
            Create an Account
          </h2>
          <p className="text-[#5B779E] text-[15.5px] font-medium">
            Join us to start your assessment journey
          </p>
        </div>

        <form
          className="w-full space-y-[22px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-[6px]">
            <label className="block text-[14.5px] font-medium text-[#4A678E] ml-1">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User
                className="absolute left-4 w-5 h-5 text-[#7C97BB]"
                strokeWidth={1.5}
              />
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full pl-[46px] pr-4 py-3.5 rounded-2xl bg-white/40 border border-white/70 
                  focus:outline-none focus:ring-[3px] focus:ring-blue-400/30 focus:border-blue-400/50 
                  transition-all placeholder:text-[#8AA6CA] text-[#0D245B] font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          <div className="space-y-[6px]">
            <label className="block text-[14.5px] font-medium text-[#4A678E] ml-1">
              Email address
            </label>
            <div className="relative flex items-center">
              <Mail
                className="absolute left-4 w-5 h-5 text-[#7C97BB]"
                strokeWidth={1.5}
              />
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full pl-[46px] pr-4 py-3.5 rounded-2xl bg-white/40 border border-white/70 
                  focus:outline-none focus:ring-[3px] focus:ring-blue-400/30 focus:border-blue-400/50 
                  transition-all placeholder:text-[#8AA6CA] text-[#0D245B] font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          <div className="space-y-[6px]">
            <label className="block text-[14.5px] font-medium text-[#4A678E] ml-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock
                className="absolute left-4 w-5 h-5 text-[#7C97BB]"
                strokeWidth={1.5}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create a password"
                className="w-full pl-[46px] pr-12 py-3.5 rounded-2xl bg-white/40 border border-white/70 
                  focus:outline-none focus:ring-[3px] focus:ring-blue-400/30 focus:border-blue-400/50 
                  transition-all placeholder:text-[#8AA6CA] text-[#0D245B] font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[#7C97BB] hover:text-[#4A678E] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-[18px] h-[18px]" strokeWidth={2} />
                ) : (
                  <Eye className="w-[18px] h-[18px]" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

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
                placeholder="Confirm your password"
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
                defaultValue=""
                required
                className="w-full pl-[46px] pr-12 py-3.5 rounded-2xl bg-white/40 border border-white/70 
                  focus:outline-none focus:ring-[3px] focus:ring-blue-400/30 focus:border-blue-400/50 
                  transition-all text-[#0D245B] font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] appearance-none"
              >
                <option value="" disabled hidden className="text-[#8AA6CA]">
                  Select your role
                </option>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
              <div className="absolute right-4 pointer-events-none text-[#7C97BB]">
                <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between pt-1 pb-1">
            <label className="flex items-center gap-[8px] cursor-pointer group">
              <input
                required
                type="checkbox"
                className="hidden"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center backdrop-blur-md transition-all group-active:scale-95 ${
                  agreedToTerms
                    ? "bg-[#2481FF]/60 border border-white/50 text-white shadow-[0_2px_8px_rgba(36,129,255,0.3),_inset_0_1px_1px_rgba(255,255,255,0.4)]"
                    : "bg-white/40 border border-white/60 text-transparent hover:bg-white/50"
                }`}
              >
                <Check className="w-[14px] h-[14px]" strokeWidth={3} />
              </div>
              <span className="text-[14px] font-medium text-[#5B779E] group-hover:text-[#4A678E] transition-colors">
                I agree to the Terms
              </span>
            </label>
          </div>

          {/* Main Action Button */}
          <button
            type="submit"
            className="w-full pt-[15px] pb-[15px] rounded-2xl text-white font-bold text-[15.5px] tracking-wide 
              bg-gradient-to-r from-[#3A92FF]/90 to-[#1268FF]/90 backdrop-blur-[40px] border border-[#8BBEFF]
              hover:from-[#499BFF]/90 hover:to-[#1C71FF]/90 hover:brightness-110
              shadow-[0_10px_32px_rgba(30,110,255,0.4),_inset_0_2px_6px_rgba(255,255,255,0.6),_inset_0_-2px_6px_rgba(0,0,0,0.15)]
              hover:shadow-[0_12px_48px_rgba(30,110,255,0.55),_inset_0_2px_6px_rgba(255,255,255,0.9),_inset_0_-2px_6px_rgba(0,0,0,0.15)]
              active:scale-[0.98] active:shadow-[0_4px_16px_rgba(30,110,255,0.3)]
              transition-all duration-300 flex items-center justify-center gap-[6px]
              relative overflow-hidden group
              before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/30 before:to-transparent before:pointer-events-none"
          >
            <div className="absolute inset-y-0 w-1/2 -ml-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none" />
            <span className="relative z-10 flex items-center justify-center gap-[6px] drop-shadow-md">
              SIGN UP{" "}
              <span className="font-sans ml-1 text-lg leading-none">
                &rarr;
              </span>
            </span>
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="w-full flex items-center gap-4 mt-8 mb-6">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-slate-300/60 to-slate-300/60"></div>
          <span className="text-[13px] text-[#7C97BB] font-medium">
            Or continue with
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-slate-300/60 to-slate-300/60"></div>
        </div>

        {/* Social Buttons */}
        <div className="w-full">
          <button
            className="w-full flex justify-center items-center gap-2.5 py-3 px-4 rounded-2xl
            bg-white/20 backdrop-blur-[30px] border border-white/50 hover:bg-white/40 transition-all duration-300
            shadow-[0_8px_32px_0_rgba(30,100,200,0.1),_inset_0_1px_1px_rgba(255,255,255,0.9),_inset_0_-1px_1px_rgba(0,0,0,0.05)]
            hover:shadow-[0_12px_40px_rgba(30,100,200,0.15),_inset_0_1px_1px_rgba(255,255,255,1),_inset_0_-1px_1px_rgba(0,0,0,0.05)]
            active:scale-[0.98] relative overflow-hidden group
            before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/10 before:to-transparent before:pointer-events-none"
          >
            <div className="absolute inset-y-0 w-1/2 -ml-10 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none" />
            <span className="relative z-10 flex justify-center items-center gap-2.5">
              <GoogleIcon />
              <span className="text-[13.5px] font-semibold text-[#4A678E]">
                Continue with Google
              </span>
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-[14.5px] font-medium text-[#5B779E] text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#1A73E8] hover:text-[#1557A0] transition-colors ml-1"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
