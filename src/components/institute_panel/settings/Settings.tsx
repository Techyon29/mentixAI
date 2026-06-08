"use client";

import {
  Building,
  Upload,
  CheckCircle2,
  Loader2,
  X,
  Shield,
  Lock,
  Users,
  Key,
  LogOut,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import InstituteLayout from "../InstituteLayout";

export default function Settings() {
  const router = useRouter();
  const [instituteName, setInstituteName] = useState("Global Tech Academy");
  const [primaryDomain, setPrimaryDomain] = useState("globaltech.edu");
  const [brandLogo, setBrandLogo] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Security Settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Roles
  const [defaultRole, setDefaultRole] = useState("Mentor");

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);
  const [isSavingRoles, setIsSavingRoles] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem("mentix-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.instituteName) setInstituteName(parsed.instituteName);
        if (parsed.primaryDomain) setPrimaryDomain(parsed.primaryDomain);
        if (parsed.brandLogo) setBrandLogo(parsed.brandLogo);
        if (parsed.defaultRole) setDefaultRole(parsed.defaultRole);
      } catch (e) {
        console.error("Failed to parse settings");
      }
    }
  }, []);

  const saveToStorage = (extraData?: any) => {
    const settings = {
      instituteName,
      primaryDomain,
      brandLogo,
      defaultRole,
      ...extraData,
    };
    try {
      localStorage.setItem("mentix-settings", JSON.stringify(settings));
    } catch (e) {
      console.error("Storage full or image too large");
      localStorage.setItem(
        "mentix-settings",
        JSON.stringify({ ...settings, brandLogo: null }),
      );
    }
  };

  const handleSaveProfile = () => {
    setIsSavingProfile(true);
    setTimeout(() => {
      saveToStorage();
      setIsSavingProfile(false);
      setIsEditingProfile(false);
      showToast("Profile settings saved successfully");
    }, 600);
  };

  const handleSaveRoles = () => {
    setIsSavingRoles(true);
    setTimeout(() => {
      saveToStorage();
      setIsSavingRoles(false);
      showToast("Roles settings saved successfully");
    }, 600);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }
    setIsSavingSecurity(true);
    setTimeout(() => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsSavingSecurity(false);
      showToast("Security settings updated successfully");
    }, 600);
  };

  const showToast = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = () => {
    router.push("/login");
  };

  return (
    <InstituteLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-12">
        {/* Toast Notification */}
        {saveMessage && (
          <div className="fixed bottom-6 right-6 bg-[#191c1e] text-white border border-[#c7c4d8]/30 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-4">
            <CheckCircle2
              className={`w-5 h-5 ${saveMessage.includes("match") ? "text-[#ba1a1a]" : "text-green-600"}`}
            />
            <p className="text-sm font-semibold">{saveMessage}</p>
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold text-[#191c1e]">
            Institute Settings
          </h1>
          <p className="text-[#464555] mt-1 text-sm">
            Manage your organization's preferences, security, and AI
            configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <div className="hidden md:block col-span-1">
            <nav className="flex flex-col gap-1 sticky top-24">
              <a
                href="#profile"
                className="px-4 py-2 hover:bg-[#f2f4f6] text-[#464555] font-medium text-sm rounded-lg transition-colors"
              >
                Profile & Branding
              </a>
              <a
                href="#roles"
                className="px-4 py-2 text-[#464555] hover:bg-[#f2f4f6] font-medium text-sm rounded-lg transition-colors"
              >
                Roles & Permissions
              </a>
              <a
                href="#security"
                className="px-4 py-2 text-[#464555] hover:bg-[#f2f4f6] font-medium text-sm rounded-lg transition-colors"
              >
                Security Settings
              </a>
            </nav>
          </div>

          <div className="col-span-1 md:col-span-3 space-y-8">
            {/* Profile Section */}
            <section
              id="profile"
              className="glass-card rounded-2xl p-6 sm:p-8 relative bg-white border border-[#c7c4d8]/30"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3525cd]/10 text-[#3525cd] flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">
                    Institute Profile
                  </h2>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 border border-[#c7c4d8]/60 rounded-full text-sm font-semibold hover:bg-[#f2f4f6] transition-colors text-[#3525cd] cursor-pointer"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">
                    Institute Name
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={instituteName}
                      onChange={(e) => setInstituteName(e.target.value)}
                      className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white border border-[#e6e8ea] rounded-xl text-sm text-[#191c1e] font-medium">
                      {instituteName}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">
                    Primary Domain
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={primaryDomain}
                      onChange={(e) => setPrimaryDomain(e.target.value)}
                      className="w-full bg-[#f2f4f6] border border-transparent focus:border-[#3525cd]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#3525cd]/20 outline-none transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white border border-[#e6e8ea] rounded-xl text-sm text-[#191c1e] font-medium">
                      {primaryDomain}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">
                  Brand Logo
                </label>
                {isEditingProfile ? (
                  <div
                    className="w-full h-40 border-2 border-dashed border-[#c7c4d8]/60 rounded-xl flex flex-col items-center justify-center bg-white hover:border-[#3525cd]/50 hover:bg-[#3525cd]/5 transition-colors cursor-pointer text-center p-4 relative overflow-hidden group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {brandLogo ? (
                      <>
                        <img
                          src={brandLogo}
                          alt="Brand Logo"
                          className="h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-semibold mb-2">
                            Change Logo
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setBrandLogo(null);
                            }}
                            className="p-2 bg-[#ba1a1a] text-white rounded-full hover:bg-[#ba1a1a]/80 transition-colors shadow-sm cursor-pointer"
                            title="Remove Logo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 mb-2 text-[#777587] group-hover:text-[#3525cd] transition-colors" />
                        <p className="text-sm font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-[#777587] mt-1">
                          SVG, PNG, JPG (max. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                ) : brandLogo ? (
                  <div className="w-full h-40 border border-[#e6e8ea] rounded-xl flex items-center justify-center p-4 bg-white">
                    <img
                      src={brandLogo}
                      alt="Brand Logo"
                      className="max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 border border-[#e6e8ea] rounded-xl flex items-center justify-center p-4 bg-white text-[#464555] text-sm font-medium">
                    No Logo Uploaded
                  </div>
                )}
              </div>

              {isEditingProfile && (
                <div className="flex justify-end gap-3 border-t border-[#e6e8ea] pt-6">
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-6 py-2.5 rounded-full text-[#464555] text-sm font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white text-sm font-semibold hover:shadow-lg transition-all shadow-sm shadow-[#3525cd]/20 flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSavingProfile ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    {isSavingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </section>

            {/* Roles & Permissions Section */}
            <section
              id="roles"
              className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden bg-white border border-[#c7c4d8]/30"
            >
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#5654a8]/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-[#5654a8]/10 text-[#5654a8] flex items-center justify-center relative">
                  <Users className="w-5 h-5 relative z-10" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    Roles & Permissions
                  </h2>
                  <p className="text-xs text-[#464555] mt-0.5">
                    Manage default access levels and roles
                  </p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="pt-2 space-y-2">
                  <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">
                    Default Invited User Role
                  </label>
                  <select
                    value={defaultRole}
                    onChange={(e) => setDefaultRole(e.target.value)}
                    className="w-full sm:w-1/2 block bg-[#f2f4f6] border-transparent focus:border-[#5654a8]/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#5654a8]/20 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option>Student</option>
                    <option>Mentor</option>
                    <option>Administrator</option>
                  </select>
                </div>

                <div className="flex justify-between items-center p-4 rounded-xl border border-[#e6e8ea] bg-white/50 mt-4">
                  <div className="pr-4">
                    <p className="font-semibold text-sm mb-1">
                      Self-Registration
                    </p>
                    <p className="text-xs text-[#464555]">
                      Allow users to register accounts automatically using the
                      primary domain.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5654a8] border border-[#e6e8ea]"></div>
                  </label>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveRoles}
                    disabled={isSavingRoles}
                    className="px-6 py-2.5 rounded-full bg-[#f2f4f6] text-[#191c1e] text-sm font-semibold hover:bg-gray-300/45 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSavingRoles ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    {isSavingRoles ? "Saving..." : "Update Roles"}
                  </button>
                </div>
              </div>
            </section>

            {/* Security Settings Section */}
            <section
              id="security"
              className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden bg-white border border-[#c7c4d8]/30"
            >
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center relative">
                  <Shield className="w-5 h-5 relative z-10" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    Security Settings
                  </h2>
                  <p className="text-xs text-[#464555] mt-0.5">
                    Manage authentication and password settings
                  </p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center p-4 rounded-xl border border-[#e6e8ea] bg-white/50">
                  <div className="pr-4">
                    <p className="font-semibold text-sm mb-1">
                      Two-Factor Authentication (2FA)
                    </p>
                    <p className="text-xs text-[#464555]">
                      Require all administrators to use 2FA for login.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 border border-[#e6e8ea]"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#e6e8ea]">
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#777587]" />
                    Reset Password
                  </h3>
                  <form onSubmit={handleSaveSecurity} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full sm:w-2/3 bg-[#f2f4f6] border border-transparent focus:border-red-500/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-[#f2f4f6] border border-transparent focus:border-red-500/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#464555] uppercase tracking-wider">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-[#f2f4f6] border border-transparent focus:border-red-500/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSavingSecurity}
                        className="px-6 py-2.5 rounded-full bg-[#f2f4f6] text-[#191c1e] text-sm font-semibold hover:bg-gray-300/45 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSavingSecurity ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                        {isSavingSecurity ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* Sign Out Section */}
            <section className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#c7c4d8]/30">
              <div>
                <h2 className="text-lg font-bold text-[#191c1e]">
                  Sign Out
                </h2>
                <p className="text-xs text-[#464555] mt-0.5">
                  Securely sign out of your administrator account.
                </p>
              </div>
              <button 
                onClick={handleSignOut}
                className="px-6 py-2.5 rounded-full bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition-colors text-sm font-semibold flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </section>
          </div>
        </div>
      </div>
    </InstituteLayout>
  );
}
