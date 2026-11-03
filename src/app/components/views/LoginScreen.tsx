import React, { useState } from "react";
import { TreePine, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import asntraLogo from "../../../assets/asntra-logo.png";
import asntraMark from "../../../assets/asntra-mark.png";

export function LoginScreen({
  onLogin,
}: {
  onLogin: (role: string, name: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Administrator");
  const [error, setError] = useState("");

  const ROLES = [
    "Administrator",
    "Field Director",
    "Deputy Director",
    "DFO",
    "Range Officer",
    "Staff",
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    onLogin(role, username.trim());
  }

  function handleDemoQuickLogin(selectedRole: string, defaultName: string) {
    setRole(selectedRole);
    setUsername(defaultName);
    setPassword("password123");
    onLogin(selectedRole, defaultName);
  }

  return (
    <div className="min-h-screen flex bg-white font-sans text-foreground">
      {/* Left: Brand Identity & Reserve Telemetry */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between bg-[#103327] text-white p-12 overflow-hidden">
        {/* Subtle photo background with deep green overlay */}
        <img
          src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1400&h=1000&fit=crop&auto=format"
          alt="Nagarahole Tiger Reserve Forest"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B251C] via-[#103327]/90 to-[#103327]/85" />

        {/* Brand Top Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-11 px-3 py-1.5 rounded-xl bg-white/95 border border-white/20 flex items-center justify-center shrink-0 shadow-sm">
            <img src={asntraLogo} alt="ASNTRA — Know All Ws." className="h-7 object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                v2.1 Enterprise
              </span>
            </div>
            <p className="text-xs text-[#A3B8AD] mt-0.5">Forest Inventory & Operations Platform</p>
          </div>
        </div>

        {/* Center Mission Statement */}
        <div className="relative z-10 max-w-lg">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
            Nagarahole Tiger Reserve · NSTR
          </span>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight text-white mb-4">
            Unified forest governance, wildlife protection, and resource inventory.
          </h1>
          <p className="text-sm text-[#D3E0D8] leading-relaxed mb-8">
            An integrated management information system for continuous field reconnaissance,
            asset custody, GIS layers, and multi-range operational command.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold font-mono text-white">847.26</p>
              <p className="text-xs text-[#A3B8AD] mt-0.5">sq km core zone</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-white">170+</p>
              <p className="text-xs text-[#A3B8AD] mt-0.5">tigers recorded</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-white">34</p>
              <p className="text-xs text-[#A3B8AD] mt-0.5">monitored beats</p>
            </div>
          </div>
        </div>

        {/* Footer accreditation */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#A3B8AD] pt-6 border-t border-white/10">
          <span>Karnataka Forest Department · Government of Karnataka</span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-400" />
            NTCA Verified Node
          </span>
        </div>
      </div>

      {/* Right: Modern Stripe-style Clean Sign-In Form */}
      <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-white">
        <div className="flex justify-end items-center">
          <span className="text-xs text-muted-foreground">
            Support: <a href="mailto:support@anstra.gov.in" className="text-[#174B3A] hover:underline font-medium">it-support@anstra.gov.in</a>
          </span>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-2 mb-6">
            <img src={asntraLogo} alt="ASNTRA — Know All Ws." className="h-9 object-contain" />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground tracking-tight">Sign in to ASNTRA</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select your administrative role and enter your portal credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Authorized Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 transition-all cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Officer ID / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. arjun.kulkarni or NSTR-001"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 transition-all"
                />
                <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 transition-all"
                />
                <Lock size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200/80 text-xs text-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#174B3A] text-white text-xs font-semibold hover:bg-[#123C2E] transition-all cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Sign In to Command Portal</span>
              <ArrowRight size={13} />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-5 border-t border-border">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
              Quick Role Switching (Demo)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { r: "Administrator", name: "Dr. Arjun Kulkarni" },
                { r: "Field Director", name: "Dr. Arjun Kulkarni" },
                { r: "Range Officer", name: "Smt. Kavitha Rao" },
                { r: "Staff", name: "M.N. Siddaraju" },
              ].map((item) => (
                <button
                  key={item.r}
                  type="button"
                  onClick={() => handleDemoQuickLogin(item.r, item.name)}
                  className="px-2 py-1 text-[11px] rounded bg-[#F7F9F7] hover:bg-[#EBF3EE] hover:text-[#174B3A] border border-border text-muted-foreground transition-colors cursor-pointer"
                >
                  {item.r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Protected by Government PKI & Role-Based Access Control · NSTR MIS 2026
        </div>
      </div>
    </div>
  );
}

