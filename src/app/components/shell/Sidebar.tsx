import React, { useState, useEffect } from "react";
import {
  TreePine,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  User,
  ShieldCheck,
  LayoutDashboard,
  Package,
  Users,
  Compass,
  Leaf,
  BarChart3,
  Home,
  Check,
} from "lucide-react";
import asntraMark from "../../../assets/asntra-mark.png";
import asntraLogo from "../../../assets/asntra-logo.png";

export interface NavChild {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  group?: string;
}

export interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: NavChild[];
}

export function Sidebar({
  navSections,
  activeView,
  setActiveView,
  userName,
  userRole,
  onLogout,
  paneCollapsed: controlledCollapsed,
  onTogglePane,
}: {
  navSections: NavSection[];
  activeView: string;
  setActiveView: (v: string) => void;
  userName: string;
  userRole: string;
  onLogout: () => void;
  paneCollapsed?: boolean;
  onTogglePane?: () => void;
}) {
  // Determine which section owns the active view
  const currentSection =
    navSections.find((n) => n.children.some((c) => c.id === activeView)) ?? navSections[0];

  const [selectedSectionId, setSelectedSectionId] = useState(currentSection.id);
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const paneCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  function handleTogglePane() {
    if (onTogglePane) {
      onTogglePane();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  }

  // Sync selected section if activeView changes from outside (e.g. search)
  useEffect(() => {
    if (currentSection && currentSection.id !== selectedSectionId) {
      setSelectedSectionId(currentSection.id);
    }
  }, [currentSection.id]);

  const activeSection =
    navSections.find((n) => n.id === selectedSectionId) ?? navSections[0];

  function handleRailSelect(sectionId: string) {
    setSelectedSectionId(sectionId);
    if (paneCollapsed) {
      handleTogglePane();
    }
    const targetSection = navSections.find((n) => n.id === sectionId);
    if (targetSection && targetSection.children.length === 1) {
      setActiveView(targetSection.children[0].id);
    }
  }

  return (
    <aside className="flex h-full select-none shrink-0 z-20 font-sans">
      {/* ─── Column 1: Primary Dock / Icon Rail (Enlarged 76px, Clean White) ─── */}
      <div className="w-[76px] h-full bg-white border-r border-[#E5E9E6] flex flex-col items-center justify-between py-3 shrink-0 shadow-2xs">
        {/* Section Icons Stack */}
        <div className="flex flex-col items-center gap-2 w-full px-2.5 pt-1">
          {navSections.map((sec) => {
            const Icon = sec.icon;
            const isSelected = selectedSectionId === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => handleRailSelect(sec.id)}
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer group ${
                  isSelected
                    ? "bg-[#EBF3EE] text-[#174B3A] border border-[#C8DDD0] shadow-2xs"
                    : "text-[#5E6E63] hover:text-[#202923] hover:bg-[#F4F6F4]"
                }`}
                title={sec.label}
              >
                <Icon size={22} className={isSelected ? "text-[#174B3A]" : "text-[#5E6E63] group-hover:text-[#202923]"} />
                {/* Active indicator bar on far left */}
                {isSelected && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#174B3A] rounded-r-full" />
                )}

                {/* Tooltip on hover */}
                <div className="absolute left-16 px-3 py-1.5 bg-[#202923] border border-black/10 text-white text-xs font-semibold rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {sec.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom: Rail collapse toggle & Logout */}
        <div className="flex flex-col items-center gap-2 pb-1">
          <button
            type="button"
            onClick={handleTogglePane}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-[#5E6E63] hover:text-[#174B3A] hover:bg-[#EBF3EE] transition-colors cursor-pointer"
            title={paneCollapsed ? "Expand Sub-menu" : "Collapse Sub-menu"}
          >
            {paneCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>

          <button
            onClick={onLogout}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-[#5E6E63] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Sign Out of ANSTRA"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* ─── Column 2: Secondary Section Drawer / Menu (Exact 280px matching header) ─── */}
      <div
        className={`h-full bg-white border-r border-[#E5E9E6] text-[#202923] transition-all duration-200 overflow-hidden flex flex-col shrink-0 ${
          paneCollapsed ? "w-0 border-r-0" : "w-[280px]"
        }`}
      >
        {/* Pane Top Header */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-[#E5E9E6] shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-[#101828] tracking-tight truncate">
              {activeSection.label}
            </h2>
            <p className="text-xs text-[#63756A] truncate mt-0.5">
              {activeSection.children.length} {activeSection.children.length === 1 ? "module" : "modules"} available
            </p>
          </div>
        </div>

        {/* Pane Sub-navigation Items List with Larger Text & Icons */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5" style={{ scrollbarWidth: "none" }}>
          {activeSection.children.map((child) => {
            const ChildIcon = child.icon ?? activeSection.icon;
            const isChildActive = activeView === child.id;

            return (
              <button
                key={child.id}
                onClick={() => setActiveView(child.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[14px] sm:text-[15px] transition-all text-left cursor-pointer ${
                  isChildActive
                    ? "bg-[#174B3A] text-white font-semibold shadow-xs"
                    : "text-[#4F6156] hover:text-[#202923] hover:bg-[#F4F6F4] font-medium"
                }`}
              >
                <ChildIcon
                  size={19}
                  className={`shrink-0 ${
                    isChildActive ? "text-emerald-300" : "text-[#6B7D72]"
                  }`}
                />
                <span className="flex-1 truncate tracking-tight">{child.label}</span>
                {child.badge && (
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded font-medium shrink-0 ${
                      isChildActive
                        ? "bg-white/20 text-white"
                        : "bg-[#F0F4F1] text-[#4F6156] border border-[#E5E9E6]"
                    }`}
                  >
                    {child.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pane Footer Status Info with ASNTRA Logo */}
        <div className="p-3.5 border-t border-[#E5E9E6] bg-[#F7F9F7] shrink-0 space-y-2">
          <div className="flex items-center justify-between">
            <img src={asntraLogo} alt="ASNTRA — Know All Ws." className="h-5 object-contain" />
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span className="text-[11px] font-medium text-[#202923]">Live</span>
            </div>
          </div>
          <p className="text-[10px] text-[#63756A] font-mono truncate">
            Gateway: Nagarahole State Core MIS
          </p>
        </div>
      </div>
    </aside>
  );
}
