import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";
import asntraLogo from "../../../assets/asntra-logo.png";

export function LoginScreen({
  onLogin,
}: {
  onLogin: (role: string, name: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Check Caps Lock on key events
  function handleKeyEvent(e: React.KeyboardEvent) {
    if (typeof e.getModifierState === "function") {
      setCapsLockActive(e.getModifierState("CapsLock"));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your Employee ID or Username.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Role detection based on input or default to Administrator
    let role = "Administrator";
    const lower = username.toLowerCase();
    if (lower.includes("director") || lower.includes("field")) {
      role = "Field Director";
    } else if (lower.includes("dfo")) {
      role = "DFO";
    } else if (lower.includes("range") || lower.includes("officer")) {
      role = "Range Officer";
    } else if (lower.includes("staff") || lower.includes("guard")) {
      role = "Staff";
    }

    const displayName = username.includes("-") || username.length < 5
      ? "Dr. Arjun Kulkarni"
      : username.trim();

    onLogin(role, displayName);
  }

  function handleQuickLogin(role: string, name: string) {
    setUsername(name);
    setPassword("password123");
    onLogin(role, name);
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans antialiased">
      {/* ─── Left Panel: Full-Bleed Majestic Forest Image (No Unwanted Text) ─── */}
      <div className="lg:w-1/2 min-h-[260px] lg:min-h-screen relative overflow-hidden bg-[#0A1A14]">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1800&auto=format&fit=crop"
          alt="Nagarahole Forest"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Subtle vignette border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10" />
      </div>

      {/* ─── Right Panel: Clean White Sign-In Form ─── */}
      <div className="lg:w-1/2 min-h-screen p-8 sm:p-12 lg:p-16 xl:p-24 flex flex-col justify-between bg-white overflow-y-auto">
        {/* Top Header Logo */}
        <div className="flex items-center justify-center">
          <img src={asntraLogo} alt="ASNTRA" className="h-8 object-contain" />
        </div>

        {/* Center Content Form */}
        <div className="w-full max-w-sm mx-auto my-auto py-8">
          {/* Title & Subtitle */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#101828]">
              Welcome Back
            </h2>
            <p className="text-xs text-[#667085] mt-2">
              Enter your employee id and password to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Employee ID / Username */}
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                Employee ID / Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyEvent}
                onKeyUp={handleKeyEvent}
                placeholder="Enter your employee ID or username"
                className="w-full px-4 py-3 bg-[#F8F9FA] hover:bg-[#F2F4F7] focus:bg-white border border-[#E5E9E6] focus:border-[#101828] rounded-xl text-sm text-[#101828] placeholder:text-[#98A2B3] transition-all focus:outline-none focus:ring-2 focus:ring-[#101828]/10"
              />
            </div>

            {/* Field 2: Password with visibility toggle & caps lock detection */}
            <div>
              <label className="block text-xs font-semibold text-[#344054] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyEvent}
                  onKeyUp={handleKeyEvent}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-11 py-3 bg-[#F8F9FA] hover:bg-[#F2F4F7] focus:bg-white border border-[#E5E9E6] focus:border-[#101828] rounded-xl text-sm text-[#101828] placeholder:text-[#98A2B3] transition-all focus:outline-none focus:ring-2 focus:ring-[#101828]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#101828] p-1 transition-colors cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Caps Lock Alert */}
              {capsLockActive && (
                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 mt-1.5 animate-in fade-in duration-100">
                  <AlertCircle size={12} className="shrink-0" />
                  <span>Caps Lock is ON</span>
                </div>
              )}
            </div>

            {/* Options Row: Remember me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#475467] hover:text-[#101828]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D0D5DD] text-[#101828] focus:ring-[#101828] cursor-pointer accent-[#101828]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="font-medium text-[#475467] hover:text-[#101828] hover:underline cursor-pointer transition-colors"
              >
                Forgot Password
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-in fade-in duration-150">
                <AlertCircle size={14} className="shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Primary Action Button: Sign In */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#101828] hover:bg-black text-white text-sm font-semibold transition-all shadow-sm active:scale-[0.99] cursor-pointer mt-2"
            >
              Sign In
            </button>

            {/* Secondary Action: Sign In with Google */}
            <button
              type="button"
              onClick={() => handleQuickLogin("Administrator", "Dr. Arjun Kulkarni")}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F8F9FA] border border-[#E5E9E6] text-xs font-semibold text-[#344054] hover:text-[#101828] transition-all shadow-2xs flex items-center justify-center gap-2.5 cursor-pointer mt-2"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign In with Google</span>
            </button>
          </form>

          {/* Quick Demo Credentials shortcut */}
          <div className="mt-6 pt-4 border-t border-[#F2F4F7]">
            <span className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider block mb-2 text-center">
              Quick One-Click Demo Access
            </span>
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {[
                { r: "Administrator", name: "Dr. Arjun Kulkarni" },
                { r: "Field Director", name: "Dr. Arjun Kulkarni" },
                { r: "Range Officer", name: "Smt. Kavitha Rao" },
              ].map((demo) => (
                <button
                  key={demo.r}
                  type="button"
                  onClick={() => handleQuickLogin(demo.r, demo.name)}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-[#F8F9FA] hover:bg-[#EBF3EE] hover:text-[#174B3A] border border-[#E5E9E6] text-[#475467] transition-colors cursor-pointer"
                >
                  {demo.r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center text-xs text-[#667085] pt-4">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => alert("Please contact your Range Forest Officer or Central IT Division (helpdesk@nstr.gov.in) to provision an employee account.")}
            className="font-semibold text-[#101828] hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* ─── Forgot Password Modal ─── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E5E9E6] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#EBF3EE] text-[#174B3A] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#101828]">Password Recovery Protocol</h3>
              <p className="text-xs text-[#475467] mt-1.5 leading-relaxed">
                For administrative and anti-poaching security, passwords can only be reset by your Range Forest Officer or the Central IT Helpdesk.
              </p>
            </div>
            <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E5E9E6] text-xs text-[#344054] space-y-1">
              <p><strong className="text-[#101828]">Helpdesk:</strong> it-support@nstr.gov.in</p>
              <p><strong className="text-[#101828]">Nagarahole Control Room:</strong> +91 821-2480001</p>
            </div>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 px-4 bg-[#101828] hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
