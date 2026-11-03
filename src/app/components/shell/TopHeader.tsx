import React, { useState } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  AlertTriangle,
  Activity,
  CheckCircle,
  LogOut,
} from "lucide-react";
import asntraMark from "../../../assets/asntra-mark.png";

export function TopHeader({
  sidebarCollapsed = false,
  onToggleSidebar,
  onSearchClick,
  unreadCount = 3,
  userName = "Dr. Arjun Kulkarni",
  userRole = "Administrator",
  onLogout,
}: {
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  onSearchClick?: () => void;
  unreadCount?: number;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
  sectionLabel?: string;
  childLabel?: string;
  childIcon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <header className="h-16 bg-white border-b border-[#E5E9E6] flex items-center shrink-0 select-none z-30 w-full">
      {/* ─── Left Sidebar Header Columns (Mathematically aligned to Sidebar) ─── */}
      <div className="flex h-full shrink-0">
        {/* Sub-column 1: 76px Rail Header (Icon Mark) */}
        <div className="w-[76px] h-full flex items-center justify-center border-r border-[#E5E9E6] shrink-0 bg-white">
          <img src={asntraMark} alt="ASNTRA" className="w-8 h-8 object-contain shrink-0" />
        </div>

        {/* Sub-column 2: 280px Drawer Header (Brand Title + Collapse Button) */}
        <div
          className={`h-full flex items-center justify-between border-r border-[#E5E9E6] transition-all duration-200 shrink-0 bg-white overflow-hidden ${
            sidebarCollapsed ? "w-0 px-0 border-r-0" : "w-[280px] px-5"
          }`}
        >
          <span className="font-bold text-base tracking-tight text-[#101828] truncate">
            ASNTRA
          </span>

          <button
            type="button"
            onClick={onToggleSidebar}
            className="w-8 h-8 rounded-lg border border-[#E5E9E6] bg-white hover:bg-[#F8F9FA] text-[#667085] hover:text-[#101828] flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>
      </div>

      {/* ─── Main Header Area: Starts IMMEDIATELY at the sidebar edge ─── */}
      <div className="flex-1 flex items-center justify-between px-5 min-w-0 h-full">
        {/* Left cluster: Reopen Button (if collapsed) + Search Bar at the start */}
        <div className="flex items-center gap-3 min-w-0">
          {sidebarCollapsed && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="w-8 h-8 rounded-lg border border-[#E5E9E6] bg-white hover:bg-[#F8F9FA] text-[#174B3A] hover:text-[#101828] flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
              title="Expand sidebar"
            >
              <PanelLeftOpen size={16} />
            </button>
          )}

          {/* Search Bar starting immediately */}
          <div
            onClick={onSearchClick}
            className="w-72 sm:w-80 relative flex items-center gap-2.5 px-3.5 py-2 bg-[#F8F9FA] hover:bg-[#F2F4F7] border border-[#E5E9E6] rounded-full text-xs text-[#667085] cursor-pointer transition-all shadow-2xs group shrink-0"
          >
            <Search size={14} className="text-[#667085] group-hover:text-[#101828] shrink-0" />
            <span className="flex-1 truncate">Search anything...</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#E5E9E6] text-[#667085] shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right cluster: Sun, Bell & Circular Avatar */}
        <div className="flex items-center gap-2.5 shrink-0 pl-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white border border-[#E5E9E6] hover:bg-[#F8F9FA] text-[#475467] hover:text-[#101828] shadow-2xs flex items-center justify-center transition-colors cursor-pointer"
          title={isDarkMode ? "Switch to Light mode" : "Switch to Dark mode"}
        >
          {isDarkMode ? <Moon size={16} /> : <Sun size={17} />}
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="w-9 h-9 rounded-full bg-white border border-[#E5E9E6] hover:bg-[#F8F9FA] text-[#475467] hover:text-[#101828] shadow-2xs flex items-center justify-center transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E5E9E6] rounded-2xl shadow-xl p-3 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E9E6]">
                <span className="text-xs font-semibold text-[#101828]">Operational Alerts</span>
                <span className="text-[10px] text-[#667085] bg-[#F8F9FA] px-1.5 py-0.5 rounded">
                  {unreadCount} unread
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-800 font-medium">
                    <AlertTriangle size={12} />
                    <span>Camera CT-KK-007</span>
                  </div>
                  <p className="text-[11px] text-amber-900/80 mt-0.5">
                    Critical battery level (18%) at D.B. Kuppe beat.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs">
                  <div className="flex items-center gap-1.5 text-blue-800 font-medium">
                    <Activity size={12} />
                    <span>Safari Morning Slot</span>
                  </div>
                  <p className="text-[11px] text-blue-900/80 mt-0.5">
                    4 safari gypsy bookings confirmed for 06:00 AM slot.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <CheckCircle size={12} />
                    <span>Night Patrol Completed</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/80 mt-0.5">
                    Range VH-31 Veeranahosahalli recorded zero breaches.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Circular User Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="w-9 h-9 rounded-full border border-[#E5E9E6] overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#174B3A]/20 transition-all shrink-0 bg-[#EBF3EE] flex items-center justify-center shadow-2xs"
            title={`${userName} (${userRole})`}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
              alt={userName}
              className="w-full h-full object-cover"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E9E6] rounded-2xl shadow-xl p-3 z-50 animate-in fade-in duration-150">
              <div className="pb-2 mb-2 border-b border-[#E5E9E6]">
                <p className="text-xs font-bold text-[#101828] truncate">{userName}</p>
                <p className="text-[11px] text-[#667085] truncate">{userRole}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut size={14} />
                <span>Sign Out of ANSTRA</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
);
}
