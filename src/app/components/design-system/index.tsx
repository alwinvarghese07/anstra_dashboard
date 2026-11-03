import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// ─── Status Badge ─────────────────────────────────────────────────────────────

export interface StatusConfig {
  dotColor: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export const STATUS_STYLE_MAP: Record<string, StatusConfig> = {
  // Operational / Positive
  Active: {
    dotColor: "bg-emerald-600",
    bgClass: "bg-emerald-50/80",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200/80",
  },
  Confirmed: {
    dotColor: "bg-emerald-600",
    bgClass: "bg-emerald-50/80",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200/80",
  },
  Resolved: {
    dotColor: "bg-emerald-600",
    bgClass: "bg-emerald-50/80",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200/80",
  },
  Published: {
    dotColor: "bg-emerald-600",
    bgClass: "bg-emerald-50/80",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200/80",
  },
  Received: {
    dotColor: "bg-emerald-600",
    bgClass: "bg-emerald-50/80",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200/80",
  },
  Good: {
    dotColor: "bg-emerald-600",
    bgClass: "bg-emerald-50/80",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200/80",
  },
  Adequate: {
    dotColor: "bg-emerald-600",
    bgClass: "bg-emerald-50/80",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200/80",
  },

  // In Progress / Info / Scheduled
  "In Progress": {
    dotColor: "bg-blue-600",
    bgClass: "bg-blue-50/80",
    textClass: "text-blue-800",
    borderClass: "border-blue-200/80",
  },
  Scheduled: {
    dotColor: "bg-indigo-600",
    bgClass: "bg-indigo-50/80",
    textClass: "text-indigo-800",
    borderClass: "border-indigo-200/80",
  },
  "Case Filed": {
    dotColor: "bg-blue-600",
    bgClass: "bg-blue-50/80",
    textClass: "text-blue-800",
    borderClass: "border-blue-200/80",
  },
  Approved: {
    dotColor: "bg-blue-600",
    bgClass: "bg-blue-50/80",
    textClass: "text-blue-800",
    borderClass: "border-blue-200/80",
  },
  "In Transit": {
    dotColor: "bg-purple-600",
    bgClass: "bg-purple-50/80",
    textClass: "text-purple-800",
    borderClass: "border-purple-200/80",
  },
  "On Leave": {
    dotColor: "bg-sky-600",
    bgClass: "bg-sky-50/80",
    textClass: "text-sky-800",
    borderClass: "border-sky-200/80",
  },

  // Pending / Warning / Service
  Pending: {
    dotColor: "bg-amber-500",
    bgClass: "bg-amber-50/80",
    textClass: "text-amber-800",
    borderClass: "border-amber-200/80",
  },
  Service: {
    dotColor: "bg-amber-500",
    bgClass: "bg-amber-50/80",
    textClass: "text-amber-800",
    borderClass: "border-amber-200/80",
  },
  "Low Battery": {
    dotColor: "bg-amber-500",
    bgClass: "bg-amber-50/80",
    textClass: "text-amber-800",
    borderClass: "border-amber-200/80",
  },
  "Low Stock": {
    dotColor: "bg-amber-500",
    bgClass: "bg-amber-50/80",
    textClass: "text-amber-800",
    borderClass: "border-amber-200/80",
  },
  "Under Investigation": {
    dotColor: "bg-amber-500",
    bgClass: "bg-amber-50/80",
    textClass: "text-amber-800",
    borderClass: "border-amber-200/80",
  },
  "Under Repair": {
    dotColor: "bg-amber-500",
    bgClass: "bg-amber-50/80",
    textClass: "text-amber-800",
    borderClass: "border-amber-200/80",
  },
  Requested: {
    dotColor: "bg-amber-500",
    bgClass: "bg-amber-50/80",
    textClass: "text-amber-800",
    borderClass: "border-amber-200/80",
  },
  Fair: {
    dotColor: "bg-amber-500",
    bgClass: "bg-amber-50/80",
    textClass: "text-amber-800",
    borderClass: "border-amber-200/80",
  },

  // Negative / Alert / Destructive
  Inactive: {
    dotColor: "bg-neutral-400",
    bgClass: "bg-neutral-100",
    textClass: "text-neutral-700",
    borderClass: "border-neutral-200",
  },
  Offline: {
    dotColor: "bg-red-500",
    bgClass: "bg-red-50/80",
    textClass: "text-red-800",
    borderClass: "border-red-200/80",
  },
  Cancelled: {
    dotColor: "bg-red-500",
    bgClass: "bg-red-50/80",
    textClass: "text-red-800",
    borderClass: "border-red-200/80",
  },
  Rejected: {
    dotColor: "bg-red-500",
    bgClass: "bg-red-50/80",
    textClass: "text-red-800",
    borderClass: "border-red-200/80",
  },
  Restricted: {
    dotColor: "bg-red-500",
    bgClass: "bg-red-50/80",
    textClass: "text-red-800",
    borderClass: "border-red-200/80",
  },
  Damaged: {
    dotColor: "bg-red-500",
    bgClass: "bg-red-50/80",
    textClass: "text-red-800",
    borderClass: "border-red-200/80",
  },
  "Out of Stock": {
    dotColor: "bg-red-500",
    bgClass: "bg-red-50/80",
    textClass: "text-red-800",
    borderClass: "border-red-200/80",
  },
  "Expired Warranty": {
    dotColor: "bg-orange-500",
    bgClass: "bg-orange-50/80",
    textClass: "text-orange-800",
    borderClass: "border-orange-200/80",
  },

  // Neutral / Archival
  Completed: {
    dotColor: "bg-slate-400",
    bgClass: "bg-slate-50",
    textClass: "text-slate-700",
    borderClass: "border-slate-200",
  },
  Draft: {
    dotColor: "bg-slate-400",
    bgClass: "bg-slate-50",
    textClass: "text-slate-700",
    borderClass: "border-slate-200",
  },
};

export function Badge({ status }: { status: string }) {
  const style = STATUS_STYLE_MAP[status] ?? {
    dotColor: "bg-neutral-400",
    bgClass: "bg-neutral-50",
    textClass: "text-neutral-700",
    borderClass: "border-neutral-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${style.bgClass} ${style.textClass} ${style.borderClass} tracking-normal whitespace-nowrap`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${style.dotColor}`} />
      {status}
    </span>
  );
}

export function ConditionBadge({ cond }: { cond: string }) {
  return <Badge status={cond} />;
}

// ─── Stat Card (KPI Metric) ───────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  sub,
  icon,
  trend,
  trendType = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
}) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border transition-all hover:border-[#CBD5CD]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        {icon && (
          <div className="text-muted-foreground/70 p-1 rounded-md bg-[#F7F9F7] border border-border/50">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-foreground font-mono tracking-tight">
          {value}
        </p>
        {trend && (
          <span
            className={`inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded border ${
              trend.includes("↑") || trendType === "positive"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200/70"
                : trend.includes("↓") || trendType === "negative"
                ? "bg-red-50 text-red-800 border-red-200/70"
                : "bg-neutral-50 text-neutral-700 border-neutral-200"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      {sub && <p className="text-xs text-muted-foreground mt-1 truncate">{sub}</p>}
    </div>
  );
}

// ─── Mini Stat Strip ──────────────────────────────────────────────────────────

export function MiniStat({
  label,
  value,
  colorClass = "text-foreground",
}: {
  label: string;
  value: string;
  colorClass?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 text-left transition-colors hover:border-[#CBD5CD]">
      <p className="text-[11px] font-medium text-muted-foreground truncate uppercase tracking-wider">
        {label}
      </p>
      <p className={`text-xl font-bold ${colorClass} font-mono mt-0.5 tracking-tight`}>
        {value}
      </p>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

export function SectionHeader({
  title,
  subtitle,
  actions,
  badge,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6 pb-4 border-b border-border/60">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
          {badge && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#EBF3EE] text-[#174B3A] border border-[#C8DDD0]">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap shrink-0">{actions}</div>}
    </div>
  );
}

// ─── Primary & Secondary Buttons ─────────────────────────────────────────────

export function BtnPrimary({
  icon,
  label,
  onClick,
  disabled,
  className = "",
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#174B3A] text-white hover:bg-[#123C2E] disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-[0.99] cursor-pointer shadow-xs ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function BtnSecondary({
  icon,
  label,
  onClick,
  disabled,
  className = "",
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-white text-foreground hover:bg-[#F7F9F7] hover:border-[#D1D9D3] disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-[0.99] cursor-pointer shadow-xs ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// ─── Table Design System Constants & Components ───────────────────────────────

export const TH =
  "px-5 py-3.5 text-left text-xs font-semibold text-[#344054] uppercase tracking-wider border-b border-border bg-[#F8F9FA] whitespace-nowrap";
export const TD = "px-5 py-3.5 text-sm text-foreground border-b border-border/80 align-middle";

export function RowActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <td className={`${TD} text-right whitespace-nowrap`}>
      <div className="flex items-center justify-end gap-1.5">
        <button
          onClick={onEdit}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-[#174B3A] hover:bg-[#EBF3EE] transition-colors cursor-pointer border border-transparent hover:border-[#C8DDD0]"
          title="Edit Record"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={onDelete}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
          title="Delete Record"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </td>
  );
}

export function TableFooter({
  shown,
  total,
  label,
  onPageChange,
}: {
  shown: number;
  total: number;
  label: string;
  onPageChange?: (dir: "prev" | "next") => void;
}) {
  return (
    <div className="px-5 py-3.5 border-t border-border bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{shown}</span> of{" "}
        <span className="font-semibold text-foreground">{total}</span> {label}
      </p>
      <div className="flex items-center gap-2">
        <button
          disabled={shown <= 10}
          onClick={() => onPageChange?.("prev")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-white text-muted-foreground hover:text-foreground hover:bg-[#F8F9FA] disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs cursor-pointer"
        >
          <ChevronLeft size={14} />
          <span>Previous</span>
        </button>
        <button
          disabled={shown >= total}
          onClick={() => onPageChange?.("next")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-white text-muted-foreground hover:text-foreground hover:bg-[#F8F9FA] disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Modal Dialogs ────────────────────────────────────────────────────────────

export interface FieldDef {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea";
  options?: string[];
  readOnly?: boolean;
  placeholder?: string;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  itemName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-border rounded-xl shadow-lg w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200/80 flex items-center justify-center mb-3.5">
          <Trash2 size={18} className="text-red-600" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">Confirm Deletion</h3>
        <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
          Are you sure you want to permanently delete{" "}
          <strong className="text-foreground font-semibold">"{itemName}"</strong>? This action
          cannot be reversed.
        </p>
        <div className="flex gap-2 justify-end">
          <BtnSecondary label="Cancel" onClick={onClose} />
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export function InvFormModal({
  open,
  onClose,
  onSave,
  fields,
  initialValues,
  title,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string | number>) => void;
  fields: FieldDef[];
  initialValues: Record<string, string | number>;
  title: string;
}) {
  const [form, setForm] = React.useState<Record<string, string | number>>(initialValues);

  React.useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  if (!open) return null;

  function handleChange(key: string, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
    onClose();
  }

  const inputBase =
    "w-full px-3 py-2 text-xs bg-white border border-border rounded-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 disabled:opacity-50 disabled:bg-[#F7F9F7] transition-all";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-semibold text-foreground tracking-tight">{title}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fill in all mandatory attributes for the inventory register
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-[#F7F9F7] hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="overflow-y-auto flex-1 px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label className="block text-[11px] font-semibold text-foreground mb-1 uppercase tracking-wider">
                    {f.label}
                  </label>
                  {f.type === "select" ? (
                    <select
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      disabled={f.readOnly}
                      className={inputBase}
                    >
                      <option value="">Select option…</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      disabled={f.readOnly}
                      placeholder={f.placeholder}
                      rows={3}
                      className={`${inputBase} resize-none`}
                    />
                  ) : (
                    <input
                      type={f.type}
                      value={String(form[f.key] ?? "")}
                      onChange={(e) =>
                        handleChange(
                          f.key,
                          f.type === "number" ? Number(e.target.value) : e.target.value,
                        )
                      }
                      disabled={f.readOnly}
                      placeholder={f.placeholder ?? f.label}
                      className={inputBase}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 justify-end px-6 py-3.5 border-t border-border bg-[#F7F9F7] shrink-0 rounded-b-xl">
            <BtnSecondary label="Cancel" onClick={onClose} />
            <BtnPrimary label="Save Changes" className="px-4" />
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Module Placeholder ───────────────────────────────────────────────────────

export function ModulePlaceholder({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <SectionHeader title={title} subtitle={description} badge="Specification Ready" />
      <div className="bg-card border border-border rounded-xl p-10 max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 bg-[#F7F9F7] border border-border rounded-xl flex items-center justify-center mx-auto mb-4 text-[#174B3A]">
          {icon ?? <Layers size={22} />}
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1.5">
          {title} Module Configured
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
          The database schema, RBAC policies, and reporting models for this division have been
          staged. Records and telemetry pipelines are active in the central forest service gateway.
        </p>

        <div className="grid grid-cols-3 gap-3 text-left mb-6 p-3.5 bg-[#F7F9F7] rounded-lg border border-border/70 text-xs">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">
              Status
            </span>
            <span className="font-medium text-[#174B3A]">Live Schema</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">
              RBAC Scope
            </span>
            <span className="font-medium text-foreground">Divisional Access</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">
              Target Sync
            </span>
            <span className="font-medium text-foreground">Nightly Rollup</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <BtnPrimary icon={<Sparkles size={13} />} label="Initialize Test Data" />
          <BtnSecondary icon={<ArrowRight size={13} />} label="View Schema Specs" />
        </div>
      </div>
    </div>
  );
}

