import React, { useState } from "react";
import {
  Download,
  Info,
  CheckCircle,
  AlertTriangle,
  Shield,
  FileText,
  Activity,
  Package,
} from "lucide-react";

type OverviewTab = "background" | "objectives" | "scope" | "existing";

export function OverviewSection() {
  const [tab, setTab] = useState<OverviewTab>("background");

  const tabs: { id: OverviewTab; label: string }[] = [
    { id: "background", label: "Ch.1 · Background of NSTR" },
    { id: "objectives", label: "Purpose & Objectives" },
    { id: "scope", label: "Scope & Outcomes" },
    { id: "existing", label: "Ch.2 · Current System & Challenges" },
  ];

  function handleExportDocumentation() {
    const text = `NAGARAHOLE STATE TIGER RESERVE (NSTR)
Management Information System & Architecture Documentation
Specification: v2.1 | Karnataka Forest Department
Core Area: 847.26 sq km | Buffer Area: 562.41 sq km | Ranges: 7 | Beats: 34
Tigers: 170+ (est. 2026) | Elephants: 1,500+ | Personnel: 312 | APCs: 54`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "NSTR_Documentation_v2.1.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full space-y-5 font-sans">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#111827] tracking-tight">
              Project Overview & System Architecture
            </h1>
            <span className="text-xs font-medium text-[#174B3A] bg-[#EBF3EE] px-2 py-0.5 rounded-md border border-[#C8DDD0]">
              Specification v2.1
            </span>
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Nagarahole State Tiger Reserve (NSTR) · Management Information System Documentation
          </p>
        </div>

        <button
          onClick={handleExportDocumentation}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E5E9E6] text-xs font-medium text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827] shadow-2xs transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Download size={14} className="text-[#6B7280]" />
          <span>Export Documentation</span>
        </button>
      </div>

      {/* ─── Segmented Tabs ─── */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E5E9E6] rounded-lg w-fit overflow-x-auto shadow-2xs">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3.5 py-1.5 text-xs rounded-md transition-colors cursor-pointer font-medium whitespace-nowrap ${
              tab === t.id
                ? "bg-[#174B3A] text-white font-semibold"
                : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─── Tab 1: Background of NSTR ─── */}
      {tab === "background" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main 2-column info */}
          <div className="lg:col-span-2 space-y-5">
            {/* 1. Background of NSTR */}
            <div className="bg-white border border-[#E5E9E6] rounded-xl p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-semibold text-[#111827]">1. Background of NSTR</h2>
              <div className="space-y-3 text-sm text-[#374151] leading-relaxed">
                <p>
                  Nagarahole State Tiger Reserve (NSTR), officially{" "}
                  <strong className="font-semibold text-[#111827]">Rajiv Gandhi National Park</strong>, is one of
                  India&apos;s premier tiger reserves located in the Mysuru and Kodagu districts. Established as a
                  Wildlife Sanctuary in 1955 and designated as a National Park in 1988, the reserve spans{" "}
                  <strong className="font-semibold text-[#111827]">847.26 sq km</strong> in its core zone with a buffer area of{" "}
                  <strong className="font-semibold text-[#111827]">562.41 sq km</strong>.
                </p>
                <p>
                  The reserve is an integral component of the Nilgiri Biosphere Reserve and houses one of the highest
                  tiger densities in the world with an estimated population of over 170 tigers. It serves as an essential
                  ecological corridor linking Bandipur, Mudumalai, and Wayanad protected areas.
                </p>
              </div>

              <div className="p-3.5 bg-[#F9FAFB] rounded-lg border border-[#E5E9E6] flex items-start gap-2.5">
                <Info size={16} className="text-[#174B3A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Under NTCA guidelines, high-density reserves require strict digitised tracking of all patrol
                  operations, sighting registries, hardware assets, and administrative inventories to eliminate
                  compilation lag and enhance anti-poaching response time.
                </p>
              </div>
            </div>

            {/* 2. Current Operational Status */}
            <div className="bg-white border border-[#E5E9E6] rounded-xl p-6 shadow-2xs space-y-4">
              <div>
                <h2 className="text-base font-semibold text-[#111827]">2. Current Operational Status</h2>
                <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                  The reserve operates across 7 designated administrative forest ranges subdivided into 34 beats.
                  Protection operations are conducted 24/7 via stationary anti-poaching camps (APCs), foot patrols,
                  and vehicle reconnaissance.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  ["7 Ranges", "Full Administrative Division"],
                  ["34 Beats", "Field Operational Units"],
                  ["54 APCs", "Anti-Poaching Camps"],
                  ["142 Camera Nodes", "24/7 Wildlife Telemetry"],
                  ["312 Personnel", "Guards, Watchers & Officers"],
                  ["31 Vehicles", "Patrol Fleet & Ambulances"],
                ].map(([title, subtitle]) => (
                  <div key={title} className="p-3.5 bg-[#F9FAFB] border border-[#E5E9E6] rounded-lg">
                    <p className="text-sm font-semibold text-[#111827]">{title}</p>
                    <p className="text-xs text-[#4B5563] mt-0.5">{subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Facts & Release */}
          <div className="space-y-5">
            <div className="bg-white border border-[#E5E9E6] rounded-xl p-5 shadow-2xs">
              <h3 className="text-xs font-semibold text-[#111827] uppercase tracking-wider mb-4">
                Reserve Fast Facts
              </h3>
              <div className="divide-y divide-[#F3F4F6] text-xs">
                {[
                  ["Core Area", "847.26 sq km"],
                  ["Buffer Zone", "562.41 sq km"],
                  ["Forest Ranges", "7 ranges"],
                  ["Beats", "34 beats"],
                  ["Tiger Population", "170+ (est. 2026)"],
                  ["Elephant Corridor", "1,500+ animals"],
                  ["Districts", "Mysuru & Kodagu"],
                  ["State", "Karnataka, India"],
                  ["NTCA Status", "Tiger Reserve"],
                  ["Biosphere", "Nilgiri BR"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0">
                    <span className="text-[#4B5563]">{k}</span>
                    <span className="font-semibold text-[#111827] font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E5E9E6] rounded-xl p-5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                  Platform Release
                </span>
                <span className="text-xs font-mono font-bold text-[#174B3A] bg-[#EBF3EE] px-2 py-0.5 rounded border border-[#C8DDD0]">
                  v2.1.0
                </span>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                NSTR Forest Department · 2026
                <br />
                Integrated Management Information System & Asset Inventory Division
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Tab 2: Purpose & Objectives ─── */}
      {tab === "objectives" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white border border-[#E5E9E6] rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-semibold text-[#111827]">
              3. Core Digital Transformation Objectives
            </h2>
            <div className="space-y-3">
              {[
                "Digitize and centralize all administrative records into a unified secure database",
                "Provide role-based access control ensuring data security across 6 user hierarchy levels",
                "Enable real-time wildlife monitoring through camera trap integration and field sighting logs",
                "Automate inventory tracking for vehicles, equipment, and tourism assets across all ranges",
                "Streamline HR management including attendance, leave, and duty roster allocation",
                "Manage tourism operations including safari bookings, visitor database, and revenue reporting",
                "Generate automated daily, monthly, and annual reports with graphical analytics",
                "Integrate GIS/GPS data for spatial visualization of patrol routes and wildlife movements",
                "Establish a centralized anti-poaching record and incident management system",
                "Provide management dashboards supporting data-driven decisions at all levels",
              ].map((obj, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-md bg-[#174B3A] text-white text-[11px] font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-[#374151] leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5E9E6] rounded-xl p-6 shadow-2xs space-y-4">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">User Hierarchy & Authentication</h2>
              <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                The portal enforces strict 6-tier role-based access control (RBAC). Higher levels inherit all lower-tier views with full audit trail logging.
              </p>
            </div>
            <div className="space-y-2">
              {[
                { role: "Administrator", level: "L1", desc: "Full system access, user management, audit logs", bg: "bg-[#174B3A] text-white" },
                { role: "Field Director", level: "L2", desc: "Reserve-wide view, cross-range operations, all reports", bg: "bg-[#235847] text-white" },
                { role: "Deputy Director", level: "L3", desc: "Division-level ops, HR approvals, inventory management", bg: "bg-[#306C59] text-white" },
                { role: "DFO", level: "L4", desc: "Range-level management, patrol logs, revenue data", bg: "bg-[#3D806B] text-white" },
                { role: "Range Officer", level: "L5", desc: "Beat-level data entry, camera logs, sighting reports", bg: "bg-[#4D947E] text-white" },
                { role: "Staff", level: "L6", desc: "Personal attendance, duty schedule, form submission", bg: "bg-[#61A892] text-white" },
              ].map((u) => (
                <div key={u.role} className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E9E6] hover:bg-[#F9FAFB] transition-colors">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${u.bg}`}>
                    {u.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#111827]">{u.role}</p>
                    <p className="text-[11px] text-[#4B5563] truncate">{u.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Tab 3: Scope & Outcomes ─── */}
      {tab === "scope" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white border border-[#E5E9E6] rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-semibold text-[#111827]">4. Scope of the System</h2>
            <div className="space-y-3">
              {[
                { module: "Inventory Management", desc: "10 categories: vehicles, camera traps, GPS, wireless, IT, furniture, camp equipment, tourism assets, store materials, and maintenance register" },
                { module: "Human Resources", desc: "Employee database, daily attendance, leave management, duty allocation scheduler, and inter-range transfer history" },
                { module: "Tourism Management", desc: "Forest rest house room bookings, safari reservations, visitor database, revenue tracking, and tourist feedback collection" },
                { module: "Wildlife Management", desc: "Camera trap monitoring, wildlife sighting register, patrol route logs, anti-poaching incident records, and GIS/GPS spatial mapping" },
                { module: "Reporting & MIS", desc: "Automated daily/monthly/annual reports, MIS executive dashboards, graphical analytics, and NTCA compliance reporting" },
                { module: "Authentication & Security", desc: "6-tier RBAC, password policy enforcement, session management, audit trail, and data encryption at rest and in transit" },
              ].map((s) => (
                <div key={s.module} className="border-l-2 border-[#174B3A] pl-3 py-0.5">
                  <p className="text-xs font-semibold text-[#111827]">{s.module}</p>
                  <p className="text-xs text-[#4B5563] mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5E9E6] rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-semibold text-[#111827]">5. Measurable Outcomes</h2>
            <div className="space-y-3">
              {[
                { outcome: "100% digital record keeping", detail: "Elimination of paper-based registers across all 7 ranges" },
                { outcome: "Real-time situational awareness", detail: "Live camera trap alerts and patrol status monitoring" },
                { outcome: "80% reduction in reporting time", detail: "Automated daily and monthly report generation" },
                { outcome: "Unified inventory visibility", detail: "Single view of all assets across all ranges and divisions" },
                { outcome: "Improved tourism revenue tracking", detail: "Online booking integration with live revenue dashboard" },
                { outcome: "Enhanced anti-poaching response", detail: "Digital incident management with faster escalation" },
                { outcome: "Species trend analytics", detail: "Data-driven wildlife population monitoring and analysis" },
                { outcome: "NTCA compliance readiness", detail: "Audit-ready centralized logs and reporting trail" },
              ].map((o) => (
                <div key={o.outcome} className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">{o.outcome}</p>
                    <p className="text-xs text-[#4B5563]">{o.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Tab 4: Current Workflow vs Digital ANSTRA ─── */}
      {tab === "existing" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white border border-[#E5E9E6] rounded-xl p-6 shadow-2xs space-y-4">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">6. Legacy Paper Workflow</h2>
              <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                Before ANSTRA, NSTR operated on predominantly paper-based and siloed registers. Information flowed through slow hierarchical chains, causing significant delays and data loss.
              </p>
            </div>
            <div className="space-y-2">
              {[
                "Field Guard logs sighting in paper register at beat level",
                "Range Officer compiles weekly summary manually from guard reports",
                "DFO aggregates data from multiple ranges into division report",
                "Deputy Director prepares monthly summary from division inputs",
                "Field Director receives compiled report — often 2–4 weeks delayed",
                "HQ submits annual report to NTCA with further compilation",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="w-5 h-5 rounded-full bg-[#F9FAFB] border border-[#E5E9E6] text-[#111827] text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    {i < 5 && <div className="w-px h-3.5 bg-[#E5E9E6]" />}
                  </div>
                  <p className="text-xs text-[#4B5563] pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5E9E6] rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-semibold text-[#111827]">Legacy Bottlenecks Resolved by ANSTRA</h2>
            <div className="space-y-3">
              {[
                { title: "Manual Record Inconsistencies", icon: <AlertTriangle size={14} />, desc: "Physical registers prone to weathering, damage, and human error. ANSTRA provides encrypted, immutable cloud backups.", cls: "text-amber-800 bg-amber-50/70 border-amber-200/80" },
                { title: "Lack of Access Controls", icon: <Shield size={14} />, desc: "Sensitive operational and anti-poaching intelligence accessible without authorization. ANSTRA secures data with 6-tier RBAC.", cls: "text-red-800 bg-red-50/70 border-red-200/80" },
                { title: "Reporting Delays", icon: <FileText size={14} />, desc: "Manual compilation across 7 ranges took 15–30 days. ANSTRA generates instantaneous PDF/CSV rollups.", cls: "text-blue-800 bg-blue-50/70 border-blue-200/80" },
                { title: "Delayed Field Response", icon: <Activity size={14} />, desc: "Camera trap data compiled weekly. ANSTRA pushes instant alerts for low battery, traps offline, and sightings.", cls: "text-emerald-800 bg-emerald-50/70 border-emerald-200/80" },
                { title: "Asset Leakage & Misplacement", icon: <Package size={14} />, desc: "Separate registers created asset tracking voids. ANSTRA provides unified lifecycle registers from acquisition to scrap.", cls: "text-purple-800 bg-purple-50/70 border-purple-200/80" },
              ].map((c) => (
                <div key={c.title} className={`flex items-start gap-3 p-3 rounded-lg border ${c.cls}`}>
                  <div className="mt-0.5 shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-xs font-semibold">{c.title}</p>
                    <p className="text-xs opacity-90 mt-0.5 leading-snug">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
