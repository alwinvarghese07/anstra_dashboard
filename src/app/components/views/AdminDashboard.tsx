import React, { useState } from "react";
import {
  Users,
  Car,
  Compass,
  Eye,
  Camera,
  DollarSign,
  Navigation,
  AlertTriangle,
  RefreshCw,
  Download,
  Shield,
  TrendingUp,
  XCircle,
  Activity,
  CheckCircle2,
  Calendar,
  Filter,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function AdminDashboard({
  monthlyWildlifeData,
  revenueData,
  speciesDistribution,
}: {
  monthlyWildlifeData: Array<{ month: string; tiger: number; elephant: number; leopard: number; gaur: number }>;
  revenueData: Array<{ month: string; safari: number; rooms: number; entry: number }>;
  speciesDistribution: Array<{ name: string; value: number; color: string }>;
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"Today" | "Month" | "YTD">("Month");

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  }

  function handleExport() {
    const headers = "Category,Metric,Value,Period\n";
    const rows = [
      "Staff,Total Deployed,312,August 2026",
      "Fleet,Operational Vehicles,24,August 2026",
      "Tourism,Visitor Arrivals,1847,August 2026",
      "Wildlife,Sightings Logged,2340,August 2026",
      "Hardware,Camera Traps Active,134,August 2026",
      "Finance,Monthly Revenue,₹6.78L,August 2026",
      "Patrol,Distance Logged (km),5670,August 2026",
      "Security,Open Incidents,2,August 2026",
    ].join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ANSTRA-Command-Summary-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const recentAlerts = [
    {
      type: "sightings",
      severity: "positive",
      title: "Tiger Sighting Verified",
      location: "Sunkadakatte (Nagarahole Core Beat 04)",
      detail: "Adult female with cub recorded on primary trail by camera trap CT-NH-001.",
      time: "06:32 AM Today",
      icon: <Eye size={14} />,
      badge: "Normal Patrol",
    },
    {
      type: "hardware",
      severity: "warning",
      title: "Camera Trap Battery Low",
      location: "D.B. Kuppe (Kakanakote Range Beat 08)",
      detail: "Node CT-KK-007 telemetry reports 18% remaining power. Recharge team alerted.",
      time: "05:45 AM Today",
      icon: <AlertTriangle size={14} />,
      badge: "Maintenance",
    },
    {
      type: "tourism",
      severity: "info",
      title: "Morning Safari Roster Dispatched",
      location: "Nagarahole Safari Gate",
      detail: "4 registered safari Gypsys completed passenger boarding with naturalist guides.",
      time: "04:00 AM Today",
      icon: <Compass size={14} />,
      badge: "Operations",
    },
    {
      type: "patrol",
      severity: "positive",
      title: "Night Foot Patrol Completed",
      location: "Range VH-31 (Veeranahosahalli)",
      detail: "Alpha Squad logged 18.4 km along perimeter boundary. Zero breach incidents recorded.",
      time: "03:20 AM Today",
      icon: <Shield size={14} />,
      badge: "Security",
    },
    {
      type: "hardware",
      severity: "destructive",
      title: "Camera Trap Disconnected",
      location: "Mullur Nala (Antharasante Range)",
      detail: "Node CT-AN-031 dropped telemetry signal. Field team dispatched for inspection.",
      time: "Yesterday 22:15",
      icon: <XCircle size={14} />,
      badge: "Field Dispatch",
    },
    {
      type: "finance",
      severity: "positive",
      title: "Revenue Milestone Reached",
      location: "Accounts & Revenue Division",
      detail: "Consolidated August gross collections reached ₹6.78L (18% above YoY baseline).",
      time: "Yesterday 18:00",
      icon: <TrendingUp size={14} />,
      badge: "Finance",
    },
  ];

  return (
    <div className="w-full space-y-5 font-sans">
      {/* ─── Page Title Bar & Action Controls matching theme ─────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Consolidated reserve command, inventory health, and operational telemetry · 21 August 2026
          </p>
        </div>

        {/* Action Controls in Floating White Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Period selector pill */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-border shadow-xs text-xs">
            {(["Today", "Month", "YTD"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedPeriod === p
                    ? "bg-[#174B3A] text-white shadow-2xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#F8F9FA]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Date Picker Button */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-border bg-white text-foreground hover:bg-[#F8F9FA] shadow-xs cursor-pointer">
            <Calendar size={13} className="text-muted-foreground" />
            <span>Aug 1 – Aug 21, 2026</span>
          </div>

          {/* Filter Button */}
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-border bg-white text-foreground hover:bg-[#F8F9FA] shadow-xs cursor-pointer">
            <Filter size={13} className="text-muted-foreground" />
            <span>Filter</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-border bg-white text-foreground hover:bg-[#F8F9FA] shadow-xs cursor-pointer"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin text-[#174B3A]" : "text-muted-foreground"} />
            <span>Refresh</span>
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#174B3A] text-white hover:bg-[#123C2E] shadow-xs cursor-pointer transition-colors"
          >
            <Download size={13} />
            <span>Export Summary</span>
          </button>
        </div>
      </div>

      {/* ─── Hero Performance Summary Card (Floating White Card) ──────────── */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-foreground tracking-tight">Performance Summary</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Key operational indicators from field telemetry and division reporting
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="pt-2 md:pt-0 md:pr-6">
            <span className="text-xs font-medium text-muted-foreground block">
              Active Field Staff
            </span>
            <span className="text-[11px] text-muted-foreground/70 block">All 7 Ranges</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold font-mono text-foreground">312</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={13} className="inline mr-0.5" /> 1.4%
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">287 on active beat duty</span>
          </div>

          <div className="pt-4 md:pt-0 md:px-6">
            <span className="text-xs font-medium text-muted-foreground block">
              Fleet Operational Rate
            </span>
            <span className="text-[11px] text-muted-foreground/70 block">Patrol Gypsys & Canters</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold font-mono text-foreground">77.4%</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={13} className="inline mr-0.5" /> 2.1%
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">24 ready · 5 under service</span>
          </div>

          <div className="pt-4 md:pt-0 md:px-6">
            <span className="text-xs font-medium text-muted-foreground block">
              Camera Grid Uptime
            </span>
            <span className="text-[11px] text-muted-foreground/70 block">142 Deployed Sensors</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold font-mono text-foreground">94.4%</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={13} className="inline mr-0.5" /> 0.8%
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">134 active telemetry stations</span>
          </div>

          <div className="pt-4 md:pt-0 md:pl-6">
            <span className="text-xs font-medium text-muted-foreground block">
              Monthly Eco-Revenue
            </span>
            <span className="text-[11px] text-muted-foreground/70 block">Safari, FRH & Permits</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold font-mono text-foreground">₹6.78L</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={13} className="inline mr-0.5" /> 18%
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">Surpassed August target</span>
          </div>
        </div>
      </div>

      {/* ─── 8 Key Metric KPI Cards (Floating White Cards in Grid) ─────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Forest Staff",
            value: "312",
            sub: "287 on active beat duty today",
            trend: "↑ 4 this month",
            trendType: "positive",
            icon: <Users size={16} />,
          },
          {
            label: "Active Fleet",
            value: "24",
            sub: "5 in service · 2 depot standby",
            trend: "77.4% deployed",
            trendType: "neutral",
            icon: <Car size={16} />,
          },
          {
            label: "Tourist Arrivals",
            value: "1,847",
            sub: "August 2026 month-to-date",
            trend: "↑ 12% vs July",
            trendType: "positive",
            icon: <Compass size={16} />,
          },
          {
            label: "Wildlife Sightings",
            value: "2,340",
            sub: "19 verified tiger sightings in Aug",
            trend: "↑ 8% vs July",
            trendType: "positive",
            icon: <Eye size={16} />,
          },
          {
            label: "Camera Traps",
            value: "142",
            sub: "134 active · 6 low batt · 2 off",
            trend: "94.4% uptime",
            trendType: "positive",
            icon: <Camera size={16} />,
          },
          {
            label: "Monthly Revenue",
            value: "₹6.78L",
            sub: "Safari + Rooms + Gate Entry",
            trend: "↑ 18% vs Aug '25",
            trendType: "positive",
            icon: <DollarSign size={16} />,
          },
          {
            label: "Patrol Distance",
            value: "5,670",
            sub: "Kilometres logged across 34 beats",
            trend: "100% target met",
            trendType: "positive",
            icon: <Navigation size={16} />,
          },
          {
            label: "Open Incidents",
            value: "2",
            sub: "6 cases resolved this month",
            trend: "< 2h response",
            trendType: "neutral",
            icon: <AlertTriangle size={16} />,
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-border p-5 shadow-xs transition-all hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <div className="text-muted-foreground p-1.5 rounded-xl bg-[#F8F9FA] border border-border">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono tracking-tight">
                {stat.value}
              </p>
              <span
                className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                  stat.trendType === "positive"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-neutral-100 text-neutral-700"
                }`}
              >
                {stat.trend}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 truncate">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* ─── Analytical Charts Row (Wildlife Sightings & Eco-Revenue) ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Wildlife Sightings Trend */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-foreground tracking-tight">
              Wildlife Sightings — Monthly Trend
            </h2>
            <span className="text-[11px] font-mono text-muted-foreground bg-[#F8F9FA] px-2.5 py-0.5 rounded-lg border border-border">
              Mar – Aug 2026
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Aggregated sightings for flagship apex predators and large herbivores
          </p>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyWildlifeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="anstraTiger" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FB923C" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#FB923C" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="anstraElephant" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#174B3A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#174B3A" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={{ stroke: "#E4E7EC" }}
                  tick={{ fontSize: 12, fill: "#667085" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#667085" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E4E7EC",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Area
                  type="monotone"
                  dataKey="tiger"
                  name="Tiger"
                  stroke="#FB923C"
                  fill="url(#anstraTiger)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#FB923C" }}
                />
                <Area
                  type="monotone"
                  dataKey="elephant"
                  name="Elephant"
                  stroke="#174B3A"
                  fill="url(#anstraElephant)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#174B3A" }}
                />
                <Area
                  type="monotone"
                  dataKey="leopard"
                  name="Leopard"
                  stroke="#3B82F6"
                  fill="none"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={{ r: 2.5, fill: "#3B82F6" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-foreground tracking-tight">
              Revenue Breakdown by Category
            </h2>
            <span className="text-[11px] font-mono text-muted-foreground bg-[#F8F9FA] px-2.5 py-0.5 rounded-lg border border-border">
              INR (₹)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Safari bookings, forest rest houses, and gate permits · Mar – Aug 2026
          </p>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={{ stroke: "#E4E7EC" }}
                  tick={{ fontSize: 12, fill: "#667085" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#667085" }}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E4E7EC",
                    fontSize: "13px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar dataKey="safari" name="Safari" fill="#174B3A" radius={[6, 6, 0, 0]} maxBarSize={28} />
                <Bar dataKey="rooms" name="Rooms" fill="#84CC16" radius={[6, 6, 0, 0]} maxBarSize={28} />
                <Bar dataKey="entry" name="Entry Fees" fill="#FB923C" radius={[6, 6, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ─── Operational Events Stream & Species Donut ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Species Distribution Donut */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-foreground tracking-tight">Species Distribution</h2>
              <span className="text-[11px] text-muted-foreground font-mono">1,036 Total</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Recorded observations this month</p>

            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={speciesDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {speciesDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid #E4E7EC",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold font-mono text-foreground">1,036</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                  Observations
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/80">
            {speciesDistribution.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground truncate">{s.name}</span>
                </div>
                <span className="font-mono font-semibold text-foreground text-xs">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Incident & Alert Stream */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
            <div>
              <h2 className="text-sm font-bold text-foreground tracking-tight">
                Operations & Incident Log
              </h2>
              <p className="text-xs text-muted-foreground">
                Real-time operational dispatches, telemetry alerts, and range logs
              </p>
            </div>
            <span className="text-xs font-semibold text-[#174B3A] bg-[#EBF3EE] px-2.5 py-1 rounded-lg border border-[#C8DDD0]">
              6 Alerts Today
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {recentAlerts.map((item, idx) => (
              <div
                key={idx}
                className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3 hover:bg-[#F8F9FA] rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
              >
                <div
                  className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    item.severity === "positive"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                      : item.severity === "warning"
                      ? "bg-amber-50 text-amber-700 border border-amber-200/80"
                      : item.severity === "destructive"
                      ? "bg-red-50 text-red-700 border border-red-200/80"
                      : "bg-blue-50 text-blue-700 border border-blue-200/80"
                  }`}
                >
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground truncate">{item.title}</p>
                    <span className="text-[11px] font-mono text-muted-foreground shrink-0">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80 mt-0.5 leading-snug">{item.detail}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <span className="text-muted-foreground/60">Location:</span> {item.location}
                    </span>
                    <span className="text-muted-foreground/40 text-[10px]">·</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F8F9FA] border border-border text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Infrastructure Readiness Strip (with Hatched Stripes Accent) ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Fleet Readiness",
            val: "77.4%",
            sub: "24 of 31 vehicles ready for patrol",
            pct: 77.4,
            barBg: "repeating-linear-gradient(45deg, #174B3A, #174B3A 6px, #0F3227 6px, #0F3227 12px)",
          },
          {
            label: "Camera Network Health",
            val: "94.4%",
            sub: "134 active grid nodes reporting",
            pct: 94.4,
            barBg: "repeating-linear-gradient(45deg, #84CC16, #84CC16 6px, #65A30D 6px, #65A30D 12px)",
          },
          {
            label: "Patrol Target Completion",
            val: "100%",
            sub: "5,670 km logged across 34 beats",
            pct: 100,
            barBg: "repeating-linear-gradient(45deg, #10B981, #10B981 6px, #059669 6px, #059669 12px)",
          },
          {
            label: "Biometric Attendance Sync",
            val: "92.0%",
            sub: "287 staff checked in today",
            pct: 92,
            barBg: "repeating-linear-gradient(45deg, #174B3A, #174B3A 6px, #0F3227 6px, #0F3227 12px)",
          },
        ].map((item, idx) => (
          <div key={idx} className="p-4 bg-white border border-border rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-muted-foreground font-medium">{item.label}</span>
              <span className="font-mono font-bold text-foreground text-sm">{item.val}</span>
            </div>
            <div className="w-full bg-[#F2F4F7] h-2.5 rounded-full overflow-hidden p-0.5 border border-border/50">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${item.pct}%`,
                  background: item.barBg,
                }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
