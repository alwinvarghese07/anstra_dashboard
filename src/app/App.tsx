import React, { useState, useEffect } from "react";
import {
  TreePine,
  LayoutDashboard,
  Package,
  Users,
  Eye,
  BarChart3,
  Car,
  Camera,
  Satellite,
  Radio,
  Monitor,
  Archive,
  Wrench,
  User,
  Calendar,
  Shield,
  AlertTriangle,
  DollarSign,
  MessageSquare,
  Filter,
  Download,
  Plus,
  Home,
  Compass,
  Navigation,
  Leaf,
  TrendingUp,
  Activity,
  RefreshCw,
  CheckCircle,
  XCircle,
  FileText,
  Map,
  ClipboardList,
  ArrowRightLeft,
  Clock,
  Tent,
  Pencil,
  Trash2,
  X,
  Search,
  Sparkles,
} from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Badge,
  ConditionBadge,
  StatCard,
  MiniStat,
  SectionHeader,
  BtnPrimary,
  BtnSecondary,
  TH,
  TD,
  RowActions,
  TableFooter,
  ConfirmModal,
  InvFormModal,
  ModulePlaceholder,
  FieldDef,
} from "./components/design-system";

import { Sidebar, NavSection } from "./components/shell/Sidebar";
import { TopHeader } from "./components/shell/TopHeader";
import { AdminDashboard } from "./components/views/AdminDashboard";
import { OverviewSection } from "./components/views/OverviewSection";
import { LoginScreen } from "./components/views/LoginScreen";

// ─── Domain Mock Data ─────────────────────────────────────────────────────────

const VEHICLES = [
  { id: "KA-09-G-1023", type: "Gypsy", zone: "Nagarahole Core", driver: "Ramesh K.", status: "Active", fuel: "Petrol", lastService: "12 Jul 2026", nextService: "12 Oct 2026", km: 47823 },
  { id: "KA-09-G-1156", type: "Gypsy", zone: "Hunsur Range", driver: "Manjunath S.", status: "Active", fuel: "Petrol", lastService: "28 Jun 2026", nextService: "28 Sep 2026", km: 62104 },
  { id: "KA-09-C-0445", type: "Canter", zone: "Veeranahosahalli", driver: "Suresh P.", status: "Service", fuel: "Diesel", lastService: "02 Aug 2026", nextService: "02 Nov 2026", km: 83450 },
  { id: "KA-09-T-0012", type: "Truck", zone: "Depot", driver: "—", status: "Inactive", fuel: "Diesel", lastService: "15 May 2026", nextService: "15 Aug 2026", km: 124600 },
  { id: "KA-09-G-0889", type: "Gypsy", zone: "Kakanakote Range", driver: "Venkatesh B.", status: "Active", fuel: "Petrol", lastService: "19 Jul 2026", nextService: "19 Oct 2026", km: 38270 },
  { id: "KA-09-A-0034", type: "Ambulance", zone: "HQ Virajpet", driver: "Govind M.", status: "Active", fuel: "Diesel", lastService: "05 Aug 2026", nextService: "05 Nov 2026", km: 29845 },
  { id: "KA-09-G-1342", type: "Gypsy", zone: "Antharasante", driver: "Basavaraju N.", status: "Active", fuel: "Petrol", lastService: "22 Jun 2026", nextService: "22 Sep 2026", km: 51230 },
  { id: "KA-09-M-0078", type: "Mahindra Bolero", zone: "Taraka Range", driver: "Shivaraj D.", status: "Service", fuel: "Diesel", lastService: "10 Aug 2026", nextService: "10 Nov 2026", km: 76580 },
  { id: "KA-09-G-2001", type: "Gypsy", zone: "Nagarahole Core", driver: "Nanjunda K.", status: "Active", fuel: "Petrol", lastService: "30 Jul 2026", nextService: "30 Oct 2026", km: 33410 },
  { id: "KA-09-B-0099", type: "Bus", zone: "Tourism Depot", driver: "Puttaraju S.", status: "Active", fuel: "Diesel", lastService: "01 Aug 2026", nextService: "01 Nov 2026", km: 98760 },
];

const CAMERA_TRAPS = [
  { id: "CT-NH-001", location: "Sunkadakatte", range: "Nagarahole Core", lat: "12.0523", lng: "76.1234", status: "Active", battery: 87, captures: 234, lastCapture: "20 Aug 2026", installed: "15 Jan 2025" },
  { id: "CT-HU-014", location: "Karapura", range: "Hunsur Range", lat: "12.1145", lng: "76.0987", status: "Active", battery: 62, captures: 189, lastCapture: "20 Aug 2026", installed: "20 Feb 2025" },
  { id: "CT-KK-007", location: "D.B. Kuppe", range: "Kakanakote", lat: "11.9823", lng: "76.2456", status: "Low Battery", battery: 18, captures: 412, lastCapture: "19 Aug 2026", installed: "10 Dec 2024" },
  { id: "CT-VH-023", location: "Kalkere", range: "Veeranahosahalli", lat: "11.8934", lng: "76.1890", status: "Active", battery: 94, captures: 167, lastCapture: "21 Aug 2026", installed: "05 Mar 2025" },
  { id: "CT-AN-031", location: "Mullur Nala", range: "Antharasante", lat: "12.0012", lng: "76.3201", status: "Offline", battery: 0, captures: 58, lastCapture: "14 Aug 2026", installed: "18 Nov 2024" },
  { id: "CT-NH-042", location: "Chelavara", range: "Nagarahole Core", lat: "12.0345", lng: "76.1567", status: "Active", battery: 76, captures: 301, lastCapture: "21 Aug 2026", installed: "22 Jan 2025" },
  { id: "CT-TK-016", location: "Heggadadevanakote", range: "Taraka Range", lat: "11.9450", lng: "76.0820", status: "Active", battery: 55, captures: 143, lastCapture: "21 Aug 2026", installed: "12 Apr 2025" },
  { id: "CT-KK-028", location: "Balle Elephant Camp", range: "Kakanakote", lat: "11.9712", lng: "76.2100", status: "Low Battery", battery: 22, captures: 289, lastCapture: "18 Aug 2026", installed: "08 Oct 2024" },
];

const EMPLOYEES = [
  { empId: "NSTR-001", name: "Dr. Arjun Kulkarni", designation: "Field Director", grade: "IFS", division: "Headquarters", joined: "12 Apr 2019", mobile: "9480001001", status: "Active" },
  { empId: "NSTR-014", name: "K.S. Prakash", designation: "Deputy Director", grade: "KFS-I", division: "Nagarahole Core", joined: "23 Jun 2015", mobile: "9480001014", status: "Active" },
  { empId: "NSTR-027", name: "B.R. Nagesh", designation: "DFO", grade: "KFS-II", division: "Hunsur Range", joined: "07 Sep 2018", mobile: "9480001027", status: "Active" },
  { empId: "NSTR-038", name: "Smt. Kavitha Rao", designation: "Range Officer", grade: "KFS-III", division: "Kakanakote", joined: "15 Mar 2021", mobile: "9480001038", status: "Active" },
  { empId: "NSTR-052", name: "M.N. Siddaraju", designation: "Anti-Poaching Watcher", grade: "Group-D", division: "Veeranahosahalli", joined: "01 Jan 2010", mobile: "9480001052", status: "Active" },
  { empId: "NSTR-063", name: "S.K. Devaraju", designation: "Forest Guard", grade: "Group-D", division: "Antharasante", joined: "11 Aug 2012", mobile: "9480001063", status: "On Leave" },
  { empId: "NSTR-079", name: "Ravi Gowda", designation: "Driver", grade: "Group-C", division: "Nagarahole Core", joined: "20 May 2017", mobile: "9480001079", status: "Active" },
  { empId: "NSTR-085", name: "Chandra Naik", designation: "Forest Watcher", grade: "Group-D", division: "Taraka Range", joined: "14 Feb 2009", mobile: "9480001085", status: "Active" },
  { empId: "NSTR-091", name: "Latha Devi R.", designation: "Accountant", grade: "Group-B", division: "Headquarters", joined: "03 Nov 2013", mobile: "9480001091", status: "Active" },
  { empId: "NSTR-103", name: "T. Rangaswamy", designation: "Naturalist Guide", grade: "Group-C", division: "Nagarahole Core", joined: "18 Jul 2016", mobile: "9480001103", status: "Active" },
];

const SIGHTINGS = [
  { id: "SIG-2026-1847", species: "Royal Bengal Tiger", count: 2, zone: "Nagarahole Core", gridCell: "NH-12C", reportedBy: "K.S. Prakash", date: "21 Aug 2026 06:32", evidence: "Camera Trap", notes: "Adult female with cub" },
  { id: "SIG-2026-1846", species: "Indian Elephant", count: 17, zone: "Kakanakote Range", gridCell: "KK-08A", reportedBy: "Kavitha Rao", date: "21 Aug 2026 05:18", evidence: "Direct Sighting", notes: "Mixed herd crossing forest road" },
  { id: "SIG-2026-1845", species: "Indian Leopard", count: 1, zone: "Hunsur Range", gridCell: "HU-14D", reportedBy: "B.R. Nagesh", date: "20 Aug 2026 19:45", evidence: "Camera Trap", notes: "Male, moving north" },
  { id: "SIG-2026-1844", species: "Gaur", count: 8, zone: "Antharasante", gridCell: "AN-06B", reportedBy: "Siddaraju M.N.", date: "20 Aug 2026 07:20", evidence: "Direct Sighting", notes: "Feeding near grassland edge" },
  { id: "SIG-2026-1843", species: "Wild Dog (Dhole)", count: 6, zone: "Nagarahole Core", gridCell: "NH-09A", reportedBy: "K.S. Prakash", date: "19 Aug 2026 16:15", evidence: "Direct Sighting", notes: "Pack hunting sambar near waterbody" },
  { id: "SIG-2026-1842", species: "Sloth Bear", count: 1, zone: "Veeranahosahalli", gridCell: "VH-11C", reportedBy: "Forest Guard", date: "19 Aug 2026 06:00", evidence: "Camera Trap", notes: "Near honeybee hive, active foraging" },
  { id: "SIG-2026-1841", species: "Sambar Deer", count: 12, zone: "Taraka Range", gridCell: "TK-03D", reportedBy: "T. Rangaswamy", date: "18 Aug 2026 18:30", evidence: "Direct Sighting", notes: "Evening grazing, large mixed group" },
];

const PATROL_RECORDS = [
  { id: "PAT-2026-0842", team: "Alpha Team", range: "Nagarahole Core", route: "Sunkadakatte–Karapura", date: "21 Aug 2026", duration: 6.5, distance: 18.4, sightings: 7, incidents: 0, status: "Completed" },
  { id: "PAT-2026-0841", team: "Tiger Squad", range: "Kakanakote Range", route: "D.B. Kuppe–Balle", date: "21 Aug 2026", duration: 5, distance: 14.2, sightings: 4, incidents: 1, status: "Completed" },
  { id: "PAT-2026-0840", team: "Bravo Team", range: "Hunsur Range", route: "Karapura–Anechowkur", date: "20 Aug 2026", duration: 7.25, distance: 21.8, sightings: 9, incidents: 0, status: "Completed" },
  { id: "PAT-2026-0839", team: "Rapid Response Unit", range: "Veeranahosahalli", route: "Kalkere Buffer Loop", date: "20 Aug 2026", duration: 4.5, distance: 12.6, sightings: 3, incidents: 1, status: "Completed" },
  { id: "PAT-2026-0838", team: "Delta Team", range: "Antharasante", route: "Mullur Nala East", date: "21 Aug 2026", duration: 3.75, distance: 9.8, sightings: 2, incidents: 0, status: "In Progress" },
  { id: "PAT-2026-0837", team: "Night Patrol", range: "Taraka Range", route: "Taraka Reservoir Edge", date: "21 Aug 2026", duration: 0, distance: 0, sightings: 0, incidents: 0, status: "Scheduled" },
];

const ANTI_POACHING_RECORDS = [
  { id: "APR-2026-0118", date: "20 Aug 2026", range: "Kakanakote Range", type: "Snare Recovery", location: "Balle Beat 08", reportedBy: "Tiger Squad", seizure: "3 wire snares", caseNo: "NSTR/WL/118/26", status: "Under Investigation" },
  { id: "APR-2026-0117", date: "18 Aug 2026", range: "Nagarahole Core", type: "Illegal Entry", location: "Karapura Gate Sector", reportedBy: "Alpha Team", seizure: "Motorcycle impounded", caseNo: "NSTR/WL/117/26", status: "Case Filed" },
  { id: "APR-2026-0116", date: "15 Aug 2026", range: "Hunsur Range", type: "Timber Offence", location: "Anechowkur Buffer", reportedBy: "Forest Guard HU-12", seizure: "0.8 m³ timber", caseNo: "NSTR/WL/116/26", status: "Case Filed" },
  { id: "APR-2026-0115", date: "11 Aug 2026", range: "Veeranahosahalli", type: "Suspected Poaching", location: "Kalkere Waterhole", reportedBy: "Rapid Response Unit", seizure: "Ballistic evidence", caseNo: "NSTR/WL/115/26", status: "Under Investigation" },
  { id: "APR-2026-0114", date: "04 Aug 2026", range: "Antharasante", type: "Snare Recovery", location: "Mullur Nala South", reportedBy: "Range Officer AN", seizure: "1 cable snare", caseNo: "NSTR/WL/114/26", status: "Resolved" },
];

const GIS_LAYERS = [
  { id: "GIS-WL-001", name: "Tiger Movement Corridors", type: "Wildlife Movement", coverage: "All Ranges", source: "Camera Trap + GPS", updatedBy: "Research Cell", lastUpdated: "21 Aug 2026", features: 186, status: "Published" },
  { id: "GIS-PT-002", name: "August Patrol Tracks", type: "Patrol Routes", coverage: "All Ranges", source: "Field GPS", updatedBy: "Control Room", lastUpdated: "21 Aug 2026", features: 842, status: "Published" },
  { id: "GIS-WB-003", name: "Seasonal Water Bodies", type: "Habitat", coverage: "Core & Buffer", source: "Remote Sensing", updatedBy: "GIS Cell", lastUpdated: "18 Aug 2026", features: 74, status: "Published" },
  { id: "GIS-AP-004", name: "Anti-Poaching Risk Grid", type: "Risk Analysis", coverage: "Sensitive Beats", source: "Incident Analytics", updatedBy: "Intelligence Unit", lastUpdated: "20 Aug 2026", features: 32, status: "Restricted" },
  { id: "GIS-FR-005", name: "Fire Risk Compartments", type: "Forest Protection", coverage: "All Ranges", source: "Satellite + Field Survey", updatedBy: "GIS Cell", lastUpdated: "12 Aug 2026", features: 119, status: "Draft" },
];

const SAFARI_BOOKINGS = [
  { id: "SAF-2026-4521", tourist: "Priya Sharma", origin: "Bengaluru", zone: "Nagarahole Safari", date: "21 Aug 2026", slot: "06:00–09:00", vehicle: "KA-09-G-1023", guide: "Muthappa", pax: 4, amount: 2800, status: "Confirmed" },
  { id: "SAF-2026-4520", tourist: "James Wilson", origin: "London, UK", zone: "Nagarahole Safari", date: "21 Aug 2026", slot: "15:30–18:30", vehicle: "KA-09-G-0889", guide: "Rangaswamy", pax: 2, amount: 1400, status: "Confirmed" },
  { id: "SAF-2026-4519", tourist: "Ravi Teja Group", origin: "Hyderabad", zone: "Kabini Zone", date: "20 Aug 2026", slot: "06:00–09:00", vehicle: "KA-09-G-1342", guide: "Nanjunda", pax: 6, amount: 4200, status: "Completed" },
  { id: "SAF-2026-4518", tourist: "Chen Wei", origin: "Shanghai, China", zone: "Nagarahole Safari", date: "20 Aug 2026", slot: "15:30–18:30", vehicle: "KA-09-G-1156", guide: "Krishnappa", pax: 3, amount: 2100, status: "Completed" },
  { id: "SAF-2026-4522", tourist: "Anjali Mehta", origin: "Mumbai", zone: "Kabini Zone", date: "22 Aug 2026", slot: "06:00–09:00", vehicle: "KA-09-G-1023", guide: "Muthappa", pax: 5, amount: 3500, status: "Pending" },
  { id: "SAF-2026-4523", tourist: "David & Sarah Park", origin: "Seoul, Korea", zone: "Nagarahole Safari", date: "22 Aug 2026", slot: "15:30–18:30", vehicle: "KA-09-G-2001", guide: "Basavaraju", pax: 2, amount: 1400, status: "Pending" },
];

const monthlyWildlifeData = [
  { month: "Mar", tiger: 12, elephant: 45, leopard: 8, gaur: 67 },
  { month: "Apr", tiger: 18, elephant: 52, leopard: 11, gaur: 74 },
  { month: "May", tiger: 14, elephant: 38, leopard: 9, gaur: 58 },
  { month: "Jun", tiger: 9, elephant: 61, leopard: 6, gaur: 82 },
  { month: "Jul", tiger: 22, elephant: 71, leopard: 14, gaur: 91 },
  { month: "Aug", tiger: 19, elephant: 64, leopard: 12, gaur: 78 },
];

const revenueData = [
  { month: "Mar", safari: 284000, rooms: 156000, entry: 48000 },
  { month: "Apr", safari: 312000, rooms: 189000, entry: 56000 },
  { month: "May", safari: 198000, rooms: 124000, entry: 34000 },
  { month: "Jun", safari: 156000, rooms: 98000, entry: 28000 },
  { month: "Jul", safari: 425000, rooms: 234000, entry: 78000 },
  { month: "Aug", safari: 389000, rooms: 218000, entry: 71000 },
];

const speciesDistribution = [
  { name: "Tiger", value: 104, color: "#D97706" },
  { name: "Elephant", value: 331, color: "#174B3A" },
  { name: "Leopard", value: 60, color: "#2563EB" },
  { name: "Gaur", value: 450, color: "#40916C" },
  { name: "Wild Dog", value: 87, color: "#10B981" },
  { name: "Others", value: 234, color: "#8E9E94" },
];

const patrolData = [
  { week: "W1", patrols: 42, incidents: 2 },
  { week: "W2", patrols: 38, incidents: 0 },
  { week: "W3", patrols: 45, incidents: 3 },
  { week: "W4", patrols: 51, incidents: 1 },
  { week: "W5", patrols: 44, incidents: 2 },
  { week: "W6", patrols: 48, incidents: 0 },
];

const CAMERA_INVENTORY = [
  { id: "INV-CT-001", model: "Bushnell Core S-4K", type: "Passive IR", range: "Nagarahole Core", location: "Sunkadakatte", assignedTo: "K.S. Prakash", purchased: "10 Jan 2025", warranty: "10 Jan 2028", cost: 12500, condition: "Good" },
  { id: "INV-CT-002", model: "Bushnell Core S-4K", type: "Passive IR", range: "Nagarahole Core", location: "Chelavara", assignedTo: "K.S. Prakash", purchased: "10 Jan 2025", warranty: "10 Jan 2028", cost: 12500, condition: "Good" },
  { id: "INV-CT-003", model: "Cuddeback Long Range", type: "Flash + IR", range: "Hunsur Range", location: "Karapura", assignedTo: "B.R. Nagesh", purchased: "15 Feb 2025", warranty: "15 Feb 2027", cost: 18200, condition: "Good" },
  { id: "INV-CT-004", model: "Stealth Cam G45NG", type: "No-Glow IR", range: "Kakanakote", location: "D.B. Kuppe", assignedTo: "Kavitha Rao", purchased: "05 Dec 2024", warranty: "05 Dec 2026", cost: 9800, condition: "Fair" },
  { id: "INV-CT-005", model: "Stealth Cam G45NG", type: "No-Glow IR", range: "Kakanakote", location: "Balle Elephant Camp", assignedTo: "Kavitha Rao", purchased: "05 Oct 2024", warranty: "05 Oct 2026", cost: 9800, condition: "Fair" },
  { id: "INV-CT-006", model: "Browning Strike Force Pro", type: "Passive IR", range: "Veeranahosahalli", location: "Kalkere", assignedTo: "Range Officer VH", purchased: "01 Mar 2025", warranty: "01 Mar 2027", cost: 11400, condition: "Good" },
  { id: "INV-CT-007", model: "Bushnell Core S-4K", type: "Passive IR", range: "Antharasante", location: "Mullur Nala", assignedTo: "Range Officer AN", purchased: "12 Nov 2024", warranty: "12 Nov 2026", cost: 12500, condition: "Damaged" },
  { id: "INV-CT-008", model: "Browning Strike Force Pro", type: "Passive IR", range: "Taraka Range", location: "Heggadadevanakote", assignedTo: "Range Officer TK", purchased: "10 Apr 2025", warranty: "10 Apr 2027", cost: 11400, condition: "Good" },
  { id: "INV-CT-009", model: "Reconyx HyperFire 2", type: "No-Glow IR", range: "Nagarahole Core", location: "Research Station", assignedTo: "K.S. Prakash", purchased: "20 Jun 2024", warranty: "20 Jun 2027", cost: 38000, condition: "Good" },
  { id: "INV-CT-010", model: "Cuddeback Long Range", type: "Flash + IR", range: "Hunsur Range", location: "Kabini Buffer", assignedTo: "B.R. Nagesh", purchased: "18 Feb 2025", warranty: "18 Feb 2027", cost: 18200, condition: "Under Repair" },
];

const GPS_EQUIPMENT = [
  { id: "GPS-NH-01", model: "Garmin GPSMAP 66i", type: "Handheld", range: "Nagarahole Core", assignedTo: "K.S. Prakash", purchased: "15 Mar 2024", warranty: "15 Mar 2027", status: "Active", accuracy: "3m", lastCalibrated: "01 Aug 2026" },
  { id: "GPS-NH-02", model: "Garmin GPSMAP 66i", type: "Handheld", range: "Nagarahole Core", assignedTo: "Field Patrol Team", purchased: "15 Mar 2024", warranty: "15 Mar 2027", status: "Active", accuracy: "3m", lastCalibrated: "01 Aug 2026" },
  { id: "GPS-HU-03", model: "Magellan eXplorist 510", type: "Handheld", range: "Hunsur Range", assignedTo: "B.R. Nagesh", purchased: "10 Jun 2023", warranty: "10 Jun 2026", status: "Active", accuracy: "5m", lastCalibrated: "15 Jul 2026" },
  { id: "GPS-KK-04", model: "Garmin eTrex 32x", type: "Handheld", range: "Kakanakote", assignedTo: "Kavitha Rao", purchased: "22 Sep 2023", warranty: "22 Sep 2026", status: "Active", accuracy: "3m", lastCalibrated: "10 Jul 2026" },
  { id: "GPS-VH-05", model: "Garmin eTrex 32x", type: "Handheld", range: "Veeranahosahalli", assignedTo: "Range Officer VH", purchased: "22 Sep 2023", warranty: "22 Sep 2026", status: "Active", accuracy: "3m", lastCalibrated: "12 Jul 2026" },
  { id: "GPS-AN-06", model: "Magellan eXplorist 310", type: "Handheld", range: "Antharasante", assignedTo: "Range Officer AN", purchased: "05 Jan 2022", warranty: "05 Jan 2025", status: "Expired Warranty", accuracy: "5m", lastCalibrated: "20 Jun 2026" },
  { id: "GPS-TK-07", model: "Garmin eTrex 32x", type: "Handheld", range: "Taraka Range", assignedTo: "Range Officer TK", purchased: "30 Nov 2023", warranty: "30 Nov 2026", status: "Active", accuracy: "3m", lastCalibrated: "05 Jul 2026" },
  { id: "VT-NH-01", model: "Teltonika FMB920", type: "Vehicle Tracker", range: "Nagarahole Core", assignedTo: "KA-09-G-1023", purchased: "01 Apr 2025", warranty: "01 Apr 2027", status: "Active", accuracy: "<1m", lastCalibrated: "01 Apr 2025" },
  { id: "VT-NH-02", model: "Teltonika FMB920", type: "Vehicle Tracker", range: "Nagarahole Core", assignedTo: "KA-09-G-2001", purchased: "01 Apr 2025", warranty: "01 Apr 2027", status: "Active", accuracy: "<1m", lastCalibrated: "01 Apr 2025" },
  { id: "VT-HQ-01", model: "Concox GT06N", type: "Vehicle Tracker", range: "HQ Virajpet", assignedTo: "KA-09-A-0034", purchased: "15 Feb 2024", warranty: "15 Feb 2026", status: "Expired Warranty", accuracy: "2m", lastCalibrated: "15 Feb 2024" },
];

const WIRELESS_EQUIPMENT = [
  { id: "WLS-HQ-01", type: "Base Station", model: "Motorola CDM1250", frequency: "VHF 148–174 MHz", location: "HQ Virajpet", range: "Headquarters", assignedTo: "Control Room", power: "45W", purchased: "10 Jan 2022", status: "Active" },
  { id: "WLS-NH-01", type: "Base Station", model: "Motorola CDM1250", frequency: "VHF 148–174 MHz", location: "Nagarahole Core Station", range: "Nagarahole Core", assignedTo: "K.S. Prakash", power: "45W", purchased: "10 Jan 2022", status: "Active" },
  { id: "WLS-HU-01", type: "Base Station", model: "Kenwood TK-8360", frequency: "UHF 450–520 MHz", location: "Hunsur Range Office", range: "Hunsur Range", assignedTo: "B.R. Nagesh", power: "35W", purchased: "20 Mar 2023", status: "Active" },
  { id: "WLS-REP-01", type: "Repeater", model: "Kenwood NXR-700", frequency: "VHF 136–174 MHz", location: "Brahmagiri Hill", range: "All Ranges", assignedTo: "Technical Staff", power: "50W", purchased: "15 Jun 2021", status: "Active" },
  { id: "WLS-REP-02", type: "Repeater", model: "Motorola XPR 8380", frequency: "UHF 403–470 MHz", location: "Nagarahole Hillock", range: "All Ranges", assignedTo: "Technical Staff", power: "50W", purchased: "15 Jun 2021", status: "Under Repair" },
  { id: "WLS-HT-01", type: "Walkie-Talkie", model: "Motorola DP1400", frequency: "VHF 136–174 MHz", location: "Nagarahole Core", range: "Nagarahole Core", assignedTo: "Patrol Team Alpha", power: "5W", purchased: "01 Feb 2024", status: "Active" },
  { id: "WLS-HT-02", type: "Walkie-Talkie", model: "Motorola DP1400", frequency: "VHF 136–174 MHz", location: "Nagarahole Core", range: "Nagarahole Core", assignedTo: "Patrol Team Beta", power: "5W", purchased: "01 Feb 2024", status: "Active" },
  { id: "WLS-HT-03", type: "Walkie-Talkie", model: "Kenwood TK-3401D", frequency: "UHF 446 MHz", location: "Kakanakote", range: "Kakanakote", assignedTo: "Kavitha Rao", power: "5W", purchased: "15 May 2023", status: "Active" },
  { id: "WLS-HT-04", type: "Walkie-Talkie", model: "Kenwood TK-3401D", frequency: "UHF 446 MHz", location: "Veeranahosahalli", range: "Veeranahosahalli", assignedTo: "Anti-Poaching Squad", power: "5W", purchased: "15 May 2023", status: "Damaged" },
  { id: "WLS-HT-05", type: "Walkie-Talkie", model: "Motorola DP1400", frequency: "VHF 136–174 MHz", location: "Taraka Range", range: "Taraka Range", assignedTo: "Patrol Team", power: "5W", purchased: "01 Feb 2024", status: "Active" },
];

const COMPUTERS = [
  { id: "IT-PC-001", type: "Desktop PC", brand: "Dell OptiPlex 7000", os: "Windows 11 Pro", ram: "16 GB", storage: "512 GB SSD", office: "HQ Virajpet — Admin", assignedTo: "Dr. Arjun Kulkarni", purchased: "10 Jan 2025", warranty: "10 Jan 2028", status: "Active" },
  { id: "IT-PC-002", type: "Desktop PC", brand: "Dell OptiPlex 7000", os: "Windows 11 Pro", ram: "16 GB", storage: "512 GB SSD", office: "HQ Virajpet — Accounts", assignedTo: "Latha Devi R.", purchased: "10 Jan 2025", warranty: "10 Jan 2028", status: "Active" },
  { id: "IT-PC-003", type: "Desktop PC", brand: "HP EliteDesk 800", os: "Windows 10 Pro", ram: "8 GB", storage: "256 GB SSD", office: "Nagarahole Core Office", assignedTo: "K.S. Prakash", purchased: "05 Mar 2022", warranty: "05 Mar 2025", status: "Expired Warranty" },
  { id: "IT-LT-001", type: "Laptop", brand: "Dell Latitude 5540", os: "Windows 11 Pro", ram: "16 GB", storage: "512 GB SSD", office: "HQ Virajpet", assignedTo: "Dr. Arjun Kulkarni", purchased: "15 Feb 2025", warranty: "15 Feb 2028", status: "Active" },
  { id: "IT-LT-002", type: "Laptop", brand: "Lenovo ThinkPad E14", os: "Windows 11 Pro", ram: "8 GB", storage: "256 GB SSD", office: "Hunsur Range", assignedTo: "B.R. Nagesh", purchased: "20 Apr 2024", warranty: "20 Apr 2027", status: "Active" },
  { id: "IT-LT-003", type: "Laptop", brand: "Lenovo ThinkPad E14", os: "Windows 10 Pro", ram: "8 GB", storage: "256 GB SSD", office: "Kakanakote", assignedTo: "Kavitha Rao", purchased: "20 Apr 2024", warranty: "20 Apr 2027", status: "Active" },
  { id: "IT-LT-004", type: "Laptop", brand: "HP ProBook 440 G9", os: "Windows 10 Pro", ram: "8 GB", storage: "256 GB SSD", office: "Taraka Range", assignedTo: "Range Officer TK", purchased: "10 Jul 2023", warranty: "10 Jul 2026", status: "Active" },
  { id: "IT-PR-001", type: "Laser Printer", brand: "HP LaserJet Pro M404n", os: "—", ram: "—", storage: "—", office: "HQ Virajpet — Admin", assignedTo: "General Use", purchased: "15 Jan 2025", warranty: "15 Jan 2027", status: "Active" },
  { id: "IT-PR-002", type: "Inkjet Printer", brand: "Epson EcoTank L3250", os: "—", ram: "—", storage: "—", office: "Nagarahole Core Office", assignedTo: "General Use", purchased: "01 Jun 2023", warranty: "01 Jun 2025", status: "Expired Warranty" },
  { id: "IT-SC-001", type: "Scanner", brand: "Canon DR-C225 II", os: "—", ram: "—", storage: "—", office: "HQ Virajpet — Records", assignedTo: "General Use", purchased: "20 Mar 2024", warranty: "20 Mar 2026", status: "Active" },
];

const FURNITURE = [
  { id: "FRN-HQ-001", type: "Executive Chair", item: "High-back Ergonomic Chair", material: "Leather + Steel", location: "HQ — Field Director Office", qty: 1, condition: "Good", purchaseYear: 2023, supplier: "Durian Furniture" },
  { id: "FRN-HQ-002", type: "Office Chair", item: "Mid-back Mesh Chair", material: "Mesh + Nylon", location: "HQ — Staff Workstations", qty: 12, condition: "Good", purchaseYear: 2024, supplier: "Nilkamal Ltd." },
  { id: "FRN-HQ-003", type: "Office Table", item: "L-shaped Workstation Desk", material: "Engineered Wood + Laminate", location: "HQ — Admin Block", qty: 6, condition: "Good", purchaseYear: 2024, supplier: "Godrej Interio" },
  { id: "FRN-HQ-004", type: "Conference Table", item: "8-Seater Conference Table", material: "Solid Wood + Glass Top", location: "HQ — Conference Room", qty: 1, condition: "Good", purchaseYear: 2022, supplier: "Godrej Interio" },
  { id: "FRN-HQ-005", type: "Steel Almirah", item: "Heavy-duty Double-door Almirah", material: "Cold Rolled Steel", location: "HQ — Records Room", qty: 4, condition: "Good", purchaseYear: 2021, supplier: "Hindustan Safes" },
  { id: "FRN-HQ-006", type: "Filing Cabinet", item: "4-Drawer Vertical Filing Cabinet", material: "Steel", location: "HQ — Accounts Section", qty: 3, condition: "Fair", purchaseYear: 2019, supplier: "Hindustan Safes" },
  { id: "FRN-NH-007", type: "Office Chair", item: "Plastic Moulded Chair", material: "Polypropylene", location: "Nagarahole Core Office", qty: 8, condition: "Good", purchaseYear: 2023, supplier: "Nilkamal Ltd." },
  { id: "FRN-NH-008", type: "Office Table", item: "Standard Writing Table", material: "Engineered Wood", location: "Nagarahole Core Office", qty: 4, condition: "Fair", purchaseYear: 2020, supplier: "Local Supplier" },
  { id: "FRN-HU-009", type: "Steel Almirah", item: "Single Door Almirah", material: "Cold Rolled Steel", location: "Hunsur Range Office", qty: 2, condition: "Fair", purchaseYear: 2018, supplier: "Hindustan Safes" },
  { id: "FRN-KK-010", type: "Waiting Bench", item: "3-Seater Steel Bench", material: "Steel + Cushion", location: "Kakanakote Visitor Area", qty: 4, condition: "Fair", purchaseYear: 2021, supplier: "Local Supplier" },
  { id: "FRN-HQ-011", type: "Notice Board", item: "4x3 ft Softboard", material: "Softboard + Aluminium Frame", location: "HQ — All Offices", qty: 8, condition: "Good", purchaseYear: 2024, supplier: "Stationery Mart" },
  { id: "FRN-HQ-012", type: "Safe Cabinet", item: "Electronic Safe (30L)", material: "Steel + Digital Lock", location: "HQ — Field Director Office", qty: 1, condition: "Good", purchaseYear: 2023, supplier: "Godrej Security" },
];

const CAMP_EQUIPMENT = [
  { id: "CMP-NH-001", item: "Military-grade Camping Tent (4-person)", category: "Shelter", qty: 6, condition: "Good", range: "Nagarahole Core", lastUsed: "15 Aug 2026", purchaseYear: 2024, supplier: "Decathlon India" },
  { id: "CMP-NH-002", item: "Sleeping Bag (Mummy-style, 5°C rated)", category: "Bedding", qty: 12, condition: "Good", range: "Nagarahole Core", lastUsed: "15 Aug 2026", purchaseYear: 2024, supplier: "Decathlon India" },
  { id: "CMP-HU-003", item: "Military-grade Camping Tent (4-person)", category: "Shelter", qty: 4, condition: "Fair", range: "Hunsur Range", lastUsed: "10 Aug 2026", purchaseYear: 2022, supplier: "Decathlon India" },
  { id: "CMP-KK-004", item: "Field Kitchen Set (8-person)", category: "Cooking", qty: 2, condition: "Good", range: "Kakanakote", lastUsed: "18 Aug 2026", purchaseYear: 2023, supplier: "Army Surplus Store" },
  { id: "CMP-ALL-005", item: "Portable Water Filter (Sawyer Squeeze)", category: "Sanitation", qty: 15, condition: "Good", range: "All Ranges", lastUsed: "20 Aug 2026", purchaseYear: 2025, supplier: "Wildcraft India" },
  { id: "CMP-ALL-006", item: "Headlamp (Petzl Tikka, 300 lm)", category: "Lighting", qty: 30, condition: "Good", range: "All Ranges", lastUsed: "21 Aug 2026", purchaseYear: 2024, supplier: "Decathlon India" },
  { id: "CMP-ALL-007", item: "First Aid Kit (Comprehensive Field Kit)", category: "Medical", qty: 10, condition: "Good", range: "All Ranges", lastUsed: "15 Aug 2026", purchaseYear: 2025, supplier: "Apollo Pharmacy" },
  { id: "CMP-VH-008", item: "Raincoat + Poncho Set", category: "Apparel", qty: 20, condition: "Good", range: "Veeranahosahalli", lastUsed: "19 Aug 2026", purchaseYear: 2024, supplier: "Wildcraft India" },
  { id: "CMP-NH-009", item: "Collapsible Water Container (20L)", category: "Water Storage", qty: 8, condition: "Good", range: "Nagarahole Core", lastUsed: "20 Aug 2026", purchaseYear: 2024, supplier: "Wildcraft India" },
  { id: "CMP-ALL-010", item: "Multi-tool (Leatherman Wave+)", category: "Tools", qty: 10, condition: "Good", range: "All Ranges", lastUsed: "18 Aug 2026", purchaseYear: 2023, supplier: "Amazon India" },
  { id: "CMP-HU-011", item: "Sleeping Bag (Mummy-style, 5°C rated)", category: "Bedding", qty: 8, condition: "Fair", range: "Hunsur Range", lastUsed: "10 Aug 2026", purchaseYear: 2022, supplier: "Decathlon India" },
  { id: "CMP-TK-012", item: "Portable Solar Lantern (10W)", category: "Lighting", qty: 6, condition: "Good", range: "Taraka Range", lastUsed: "17 Aug 2026", purchaseYear: 2024, supplier: "Luminous India" },
];

const TOURISM_ASSETS = [
  { id: "TA-GY-001", type: "Safari Gypsy (Tourism)", model: "Maruti Suzuki Gypsy MG410", zone: "Nagarahole Safari Zone", capacity: "6 pax + guide", status: "Active", regNo: "KA-09-G-1023", lastService: "12 Jul 2026", condition: "Good" },
  { id: "TA-GY-002", type: "Safari Gypsy (Tourism)", model: "Maruti Suzuki Gypsy MG410", zone: "Nagarahole Safari Zone", capacity: "6 pax + guide", status: "Active", regNo: "KA-09-G-1156", lastService: "28 Jun 2026", condition: "Good" },
  { id: "TA-GY-003", type: "Safari Gypsy (Tourism)", model: "Maruti Suzuki Gypsy MG410", zone: "Kabini Zone", capacity: "6 pax + guide", status: "Active", regNo: "KA-09-G-0889", lastService: "19 Jul 2026", condition: "Good" },
  { id: "TA-GY-004", type: "Safari Gypsy (Tourism)", model: "Maruti Suzuki Gypsy MG410", zone: "Kabini Zone", capacity: "6 pax + guide", status: "Service", regNo: "KA-09-G-1342", lastService: "22 Jun 2026", condition: "Fair" },
  { id: "TA-BT-001", type: "Coracle", model: "Traditional River Coracle", zone: "Kabini Reservoir", capacity: "3 pax + boatman", status: "Active", regNo: "BOAT-KAB-01", lastService: "01 Aug 2026", condition: "Good" },
  { id: "TA-BT-002", type: "Coracle", model: "Traditional River Coracle", zone: "Kabini Reservoir", capacity: "3 pax + boatman", status: "Active", regNo: "BOAT-KAB-02", lastService: "01 Aug 2026", condition: "Good" },
  { id: "TA-BT-003", type: "Motor Boat", model: "Aquapro 16ft Fibre Boat (15HP)", zone: "Kabini Reservoir", capacity: "8 pax + crew", status: "Active", regNo: "BOAT-KAB-03", lastService: "15 Jul 2026", condition: "Good" },
  { id: "TA-BN-001", type: "Binoculars", model: "Nikon Monarch 5 (8x42)", zone: "Nagarahole Safari Zone", capacity: "1 per guide", status: "Active", regNo: "—", lastService: "—", condition: "Good" },
  { id: "TA-WK-001", type: "Watchtower / Machan", model: "Elevated Viewing Platform (10m)", zone: "Nagarahole Core", capacity: "8 visitors", status: "Active", regNo: "MACH-NH-01", lastService: "20 Jun 2026", condition: "Good" },
  { id: "TA-WK-002", type: "Watchtower / Machan", model: "Elevated Viewing Platform (8m)", zone: "Kabini Zone", capacity: "6 visitors", status: "Under Repair", regNo: "MACH-KAB-01", lastService: "10 May 2026", condition: "Fair" },
];

const STORE_MATERIALS = [
  { id: "STR-001", item: "A4 Printing Paper (500 sheets/ream)", category: "Stationery", qty: 85, unit: "Reams", reorderLevel: 20, location: "HQ Virajpet Store", lastUpdated: "15 Aug 2026" },
  { id: "STR-002", item: "Ball Point Pens (Blue)", category: "Stationery", qty: 240, unit: "Pieces", reorderLevel: 50, location: "HQ Virajpet Store", lastUpdated: "15 Aug 2026" },
  { id: "STR-003", item: "Ink Cartridge — HP (Black, 507A)", category: "IT Consumables", qty: 8, unit: "Cartridges", reorderLevel: 3, location: "HQ Virajpet Store", lastUpdated: "10 Aug 2026" },
  { id: "STR-004", item: "Toner — HP LaserJet Pro (CF258A)", category: "IT Consumables", qty: 3, unit: "Cartridges", reorderLevel: 2, location: "HQ Virajpet Store", lastUpdated: "10 Aug 2026" },
  { id: "STR-005", item: "Forest Guard Uniform Set (Khaki)", category: "Uniform", qty: 45, unit: "Sets", reorderLevel: 10, location: "HQ Store Room B", lastUpdated: "01 Aug 2026" },
  { id: "STR-006", item: "Leather Belt (Field Use)", category: "Uniform", qty: 28, unit: "Pieces", reorderLevel: 10, location: "HQ Store Room B", lastUpdated: "01 Aug 2026" },
  { id: "STR-007", item: "Rubber Boots (Field Grade)", category: "PPE", qty: 32, unit: "Pairs", reorderLevel: 10, location: "HQ Store Room B", lastUpdated: "05 Aug 2026" },
  { id: "STR-008", item: "Mosquito Repellent (Odomos 100g)", category: "Field Supplies", qty: 120, unit: "Tubes", reorderLevel: 30, location: "Each Range Store", lastUpdated: "12 Aug 2026" },
  { id: "STR-009", item: "Diesel Fuel Stock (Bulk)", category: "Fuel", qty: 2400, unit: "Litres", reorderLevel: 500, location: "Fuel Depot, Depot Rd", lastUpdated: "20 Aug 2026" },
  { id: "STR-010", item: "Petrol Fuel Stock (Bulk)", category: "Fuel", qty: 1800, unit: "Litres", reorderLevel: 400, location: "Fuel Depot, Depot Rd", lastUpdated: "20 Aug 2026" },
  { id: "STR-011", item: "Engine Oil — 20W40 (1L can)", category: "Lubricants", qty: 48, unit: "Cans", reorderLevel: 12, location: "Fuel Depot, Depot Rd", lastUpdated: "18 Aug 2026" },
  { id: "STR-012", item: "Camera Trap AA Batteries (Pack 4)", category: "Electronics", qty: 180, unit: "Packs", reorderLevel: 40, location: "HQ Store Room A", lastUpdated: "19 Aug 2026" },
  { id: "STR-013", item: "32 GB SD Cards (Class 10)", category: "Electronics", qty: 55, unit: "Pieces", reorderLevel: 15, location: "HQ Store Room A", lastUpdated: "19 Aug 2026" },
  { id: "STR-014", item: "Stamp Pad + Ink (Blue)", category: "Stationery", qty: 12, unit: "Sets", reorderLevel: 4, location: "HQ Virajpet Store", lastUpdated: "15 Aug 2026" },
];

const MAINTENANCE_REGISTER = [
  { id: "MNT-2026-0214", asset: "KA-09-C-0445 (Canter)", category: "Vehicle", issue: "Engine oil leak — gasket replacement required", reportedBy: "Suresh P.", reportedDate: "02 Aug 2026", completedDate: "08 Aug 2026", status: "Completed", cost: 8400, technician: "Raju Auto Works, Mysuru" },
  { id: "MNT-2026-0215", asset: "CT-AN-031 (Camera Trap)", category: "Camera Trap", issue: "Unit offline — moisture ingress, PCB damaged", reportedBy: "Range Officer AN", reportedDate: "14 Aug 2026", completedDate: "—", status: "In Progress", cost: 0, technician: "Bushnell Service Centre" },
  { id: "MNT-2026-0216", asset: "KA-09-M-0078 (Bolero)", category: "Vehicle", issue: "Gearbox noise — synchronizer ring worn", reportedBy: "Shivaraj D.", reportedDate: "10 Aug 2026", completedDate: "—", status: "Pending", cost: 0, technician: "Mahindra Authorised, Mysuru" },
  { id: "MNT-2026-0217", asset: "WLS-REP-02 (VHF Repeater)", category: "Wireless", issue: "Repeater output power drop — PA module faulty", reportedBy: "Technical Staff", reportedDate: "05 Aug 2026", completedDate: "—", status: "In Progress", cost: 0, technician: "Motorola Service, Bengaluru" },
  { id: "MNT-2026-0218", asset: "IT-PR-002 (Epson Printer)", category: "IT Equipment", issue: "Paper jam — roller damaged, nozzle clogged", reportedBy: "Latha Devi R.", reportedDate: "12 Aug 2026", completedDate: "16 Aug 2026", status: "Completed", cost: 1200, technician: "Epson Service Centre, Mysuru" },
  { id: "MNT-2026-0219", asset: "INV-CT-010 (Cuddeback Camera)", category: "Camera Trap", issue: "PIR sensor malfunction — false triggers", reportedBy: "B.R. Nagesh", reportedDate: "18 Aug 2026", completedDate: "—", status: "Pending", cost: 0, technician: "Cuddeback Service" },
  { id: "MNT-2026-0211", asset: "TA-WK-002 (Kabini Machan)", category: "Tourism Asset", issue: "Structural — wooden planks rotting, railing loose", reportedBy: "Tourism Officer", reportedDate: "10 May 2026", completedDate: "—", status: "In Progress", cost: 45000, technician: "Dept. Civil Works, Mysuru" },
  { id: "MNT-2026-0212", asset: "GPS-AN-06 (Magellan eTrex)", category: "GPS Equipment", issue: "Screen crack — display unreadable", reportedBy: "Range Officer AN", reportedDate: "25 Jul 2026", completedDate: "30 Jul 2026", status: "Completed", cost: 3500, technician: "Electronics Repair, Gonikoppal" },
  { id: "MNT-2026-0213", asset: "FRN-HQ-006 (Filing Cabinet)", category: "Furniture", issue: "3rd drawer jammed — locking mechanism broken", reportedBy: "Admin Staff", reportedDate: "28 Jul 2026", completedDate: "29 Jul 2026", status: "Completed", cost: 350, technician: "In-house Carpenter" },
];

const PORTAL_USERS = [
  { id: "USR-001", employeeId: "NSTR-001", name: "Dr. Arjun Kulkarni", username: "arjun.kulkarni", email: "arjun.kulkarni@nstr.gov.in", mobile: "9480001001", role: "Field Director", division: "Headquarters", status: "Active", lastLogin: "21 Aug 2026 08:10", tempPassword: "" },
  { id: "USR-002", employeeId: "NSTR-014", name: "K.S. Prakash", username: "ks.prakash", email: "ks.prakash@nstr.gov.in", mobile: "9480001014", role: "Deputy Director", division: "Nagarahole Core", status: "Active", lastLogin: "21 Aug 2026 07:45", tempPassword: "" },
  { id: "USR-003", employeeId: "NSTR-027", name: "B.R. Nagesh", username: "br.nagesh", email: "br.nagesh@nstr.gov.in", mobile: "9480001027", role: "DFO", division: "Hunsur Range", status: "Active", lastLogin: "20 Aug 2026 18:22", tempPassword: "" },
  { id: "USR-004", employeeId: "NSTR-038", name: "Smt. Kavitha Rao", username: "kavitha.rao", email: "kavitha.rao@nstr.gov.in", mobile: "9480001038", role: "Range Officer", division: "Kakanakote Range", status: "Active", lastLogin: "21 Aug 2026 06:55", tempPassword: "" },
  { id: "USR-005", employeeId: "NSTR-052", name: "M.N. Siddaraju", username: "mn.siddaraju", email: "mn.siddaraju@nstr.gov.in", mobile: "9480001052", role: "Staff", division: "Veeranahosahalli", status: "Inactive", lastLogin: "14 Aug 2026 17:05", tempPassword: "" },
  { id: "USR-006", employeeId: "NSTR-063", name: "S.K. Devaraju", username: "sk.devaraju", email: "sk.devaraju@nstr.gov.in", mobile: "9480001063", role: "Staff", division: "Antharasante", status: "Active", lastLogin: "20 Aug 2026 09:14", tempPassword: "" },
];

const INVENTORY_TRANSFERS = [
  { id: "TRF-2026-0041", assetId: "GPS-NH-02", category: "GPS Equipment", description: "Garmin GPSMAP 66i", fromDivision: "Nagarahole Core", toDivision: "Hunsur Range", quantity: 1, requestedBy: "B.R. Nagesh", requestDate: "21 Aug 2026", approvedBy: "—", status: "Requested", remarks: "Required for monsoon patrol coverage" },
  { id: "TRF-2026-0040", assetId: "WLS-HT-02", category: "Wireless Equipment", description: "Motorola DP1400 Walkie-Talkie", fromDivision: "Nagarahole Core", toDivision: "Taraka Range", quantity: 2, requestedBy: "Range Officer TK", requestDate: "20 Aug 2026", approvedBy: "K.S. Prakash", status: "Approved", remarks: "Replacement units for field patrol team" },
  { id: "TRF-2026-0039", assetId: "CMP-ALL-007", category: "Camp Equipment", description: "Comprehensive Field First Aid Kit", fromDivision: "Headquarters", toDivision: "Veeranahosahalli", quantity: 3, requestedBy: "Range Officer VH", requestDate: "19 Aug 2026", approvedBy: "Dr. Arjun Kulkarni", status: "In Transit", remarks: "Dispatch ref. DSP-2026-119" },
  { id: "TRF-2026-0038", assetId: "INV-CT-006", category: "Camera Trap", description: "Browning Strike Force Pro", fromDivision: "Headquarters", toDivision: "Veeranahosahalli", quantity: 1, requestedBy: "Range Officer VH", requestDate: "16 Aug 2026", approvedBy: "K.S. Prakash", status: "Received", remarks: "Received in good condition on 18 Aug" },
  { id: "TRF-2026-0037", assetId: "IT-LT-004", category: "Computer & Laptop", description: "HP ProBook 440 G9", fromDivision: "Headquarters", toDivision: "Taraka Range", quantity: 1, requestedBy: "Range Officer TK", requestDate: "14 Aug 2026", approvedBy: "Dr. Arjun Kulkarni", status: "Received", remarks: "Asset register updated" },
];

// ─── Navigation Definitions ───────────────────────────────────────────────────

const NAV: NavSection[] = [
  {
    id: "overview",
    label: "Overview",
    icon: Home,
    children: [{ id: "overview", label: "Reserve Architecture", icon: TreePine }],
  },
  {
    id: "dashboard",
    label: "Command Dashboards",
    icon: LayoutDashboard,
    children: [
      { id: "dash-admin", label: "Administrator Command", icon: Shield },
      { id: "dash-field", label: "Field Director View", icon: User },
      { id: "dash-deputy", label: "Deputy Director View", icon: CheckCircle },
      { id: "dash-dfo", label: "DFO Range View", icon: Navigation },
      { id: "dash-range", label: "Range Officer Beat View", icon: Compass },
      { id: "dash-staff", label: "Staff Operational View", icon: ClipboardList },
    ],
  },
  {
    id: "inventory",
    label: "Forest Inventory",
    icon: Package,
    children: [
      { id: "inv-vehicles", label: "Vehicles & Fleet", icon: Car },
      { id: "inv-cameras", label: "Camera Traps", icon: Camera },
      { id: "inv-gps", label: "GPS & Nav Devices", icon: Satellite },
      { id: "inv-wireless", label: "Wireless & Comms", icon: Radio },
      { id: "inv-computers", label: "IT & Computing", icon: Monitor },
      { id: "inv-furniture", label: "Office Furniture", icon: Archive },
      { id: "inv-camp", label: "Camp & Field Gear", icon: Tent },
      { id: "inv-tourism", label: "Tourism Assets", icon: Compass },
      { id: "inv-store", label: "Store Materials", icon: Package },
      { id: "inv-maintenance", label: "Maintenance Register", icon: Wrench },
      { id: "inv-transfer", label: "Custody Transfers", icon: ArrowRightLeft },
    ],
  },
  {
    id: "hr",
    label: "Human Resources",
    icon: Users,
    children: [
      { id: "hr-employees", label: "Personnel Database", icon: Users },
      { id: "hr-attendance", label: "Biometric Attendance", icon: Clock },
      { id: "hr-leave", label: "Leave Management", icon: Calendar },
      { id: "hr-duty", label: "Duty & Patrol Roster", icon: ClipboardList },
      { id: "hr-transfer", label: "Posting Transfers", icon: ArrowRightLeft },
      { id: "hr-users", label: "User Management", icon: Shield },
    ],
  },
  {
    id: "tourism",
    label: "Tourism Operations",
    icon: Compass,
    children: [
      { id: "tour-safari", label: "Safari Reservations", icon: Compass },
      { id: "tour-rooms", label: "FRH Accommodation", icon: Home },
      { id: "tour-visitors", label: "Visitor Database", icon: Users },
      { id: "tour-revenue", label: "Revenue Ledger", icon: DollarSign },
      { id: "tour-feedback", label: "Tourist Feedback", icon: MessageSquare },
    ],
  },
  {
    id: "wildlife",
    label: "Wildlife & Patrols",
    icon: Leaf,
    children: [
      { id: "wl-cameras", label: "Camera Trap Monitoring", icon: Camera },
      { id: "wl-sightings", label: "Sighting Register", icon: Eye },
      { id: "wl-patrol", label: "Patrol Tracking", icon: Navigation },
      { id: "wl-antipoach", label: "Anti-Poaching Cases", icon: AlertTriangle },
      { id: "wl-gis", label: "GIS & Spatial Layers", icon: Map },
    ],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: BarChart3,
    children: [
      { id: "rep-graphical", label: "Graphical Analytics", icon: BarChart3 },
      { id: "rep-daily", label: "Daily Range Rollup", icon: FileText },
      { id: "rep-monthly", label: "Monthly Performance", icon: Calendar },
      { id: "rep-annual", label: "NTCA Annual Compliance", icon: Shield },
      { id: "rep-mis", label: "Executive MIS", icon: Activity },
    ],
  },
];

// ─── Module Implementations ───────────────────────────────────────────────────

// Vehicle Inventory
const VEHICLE_FIELDS: FieldDef[] = [
  { key: "id", label: "Registration No.", type: "text", placeholder: "KA-09-G-XXXX" },
  { key: "type", label: "Vehicle Type", type: "select", options: ["Gypsy", "Canter", "Truck", "Ambulance", "Mahindra Bolero", "Bus", "Motorcycle", "Pickup"] },
  { key: "zone", label: "Zone / Range", type: "text", placeholder: "e.g. Nagarahole Core" },
  { key: "driver", label: "Assigned Driver", type: "text", placeholder: "Full name" },
  { key: "fuel", label: "Fuel Type", type: "select", options: ["Diesel", "Petrol"] },
  { key: "lastService", label: "Last Service Date", type: "date" },
  { key: "nextService", label: "Next Service Date", type: "date" },
  { key: "km", label: "Odometer (km)", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Service", "Inactive"] },
];

function VehicleInventory() {
  const [items, setItems] = useState(() => [...VEHICLES]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(v => {
    const q = search.toLowerCase();
    return (
      (v.id.toLowerCase().includes(q) || v.zone.toLowerCase().includes(q) || v.type.toLowerCase().includes(q) || v.driver.toLowerCase().includes(q)) &&
      (filterStatus === "All" || v.status === filterStatus)
    );
  });

  function openCreate() {
    setEditItem({ id: "", type: "Gypsy", zone: "", driver: "", fuel: "Diesel", lastService: "", nextService: "", km: 0, status: "Active" });
    setFormOpen(true);
  }

  function openEdit(v: typeof VEHICLES[0]) {
    setEditItem({ ...v });
    setFormOpen(true);
  }

  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const exists = prev.findIndex(v => v.id === data.id);
      const item = { ...data, km: Number(data.km) } as typeof VEHICLES[0];
      return exists >= 0 ? prev.map((v, i) => i === exists ? item : v) : [...prev, item];
    });
  }

  function handleDelete(id: string) {
    setItems(prev => prev.filter(v => v.id !== id));
  }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={VEHICLE_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Vehicle Asset" : "Register New Vehicle"} />

      <SectionHeader
        title="Vehicle & Fleet Inventory"
        subtitle={`Command fleet across 7 ranges and reserve depot · ${items.length} units tracked`}
        badge="Motor Transport"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Roster" />
            <BtnPrimary icon={<Plus size={13} />} label="Add Vehicle" onClick={openCreate} />
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat label="Total Fleet" value={String(items.length)} />
        <MiniStat label="Operational" value={String(items.filter(v => v.status === "Active").length)} colorClass="text-emerald-700" />
        <MiniStat label="In Maintenance" value={String(items.filter(v => v.status === "Service").length)} colorClass="text-amber-700" />
        <MiniStat label="Standby / Off" value={String(items.filter(v => v.status === "Inactive").length)} colorClass="text-neutral-500" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search reg, zone, type, or driver…"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 cursor-pointer"
          >
            {["All", "Active", "Service", "Inactive"].map(s => <option key={s} value={s}>{s} Status</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Registration No.</th>
                <th className={TH}>Type</th>
                <th className={TH}>Range / Sector</th>
                <th className={TH}>Assigned Driver</th>
                <th className={TH}>Fuel</th>
                <th className={TH}>Last Service</th>
                <th className={TH}>Next Service</th>
                <th className={`${TH} text-right`}>Odometer</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(v => (
                <tr key={v.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{v.id}</td>
                  <td className={TD}>{v.type}</td>
                  <td className={`${TD} text-muted-foreground`}>{v.zone}</td>
                  <td className={TD}>{v.driver}</td>
                  <td className={`${TD} text-muted-foreground`}>{v.fuel}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{v.lastService}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{v.nextService}</td>
                  <td className={`${TD} text-right font-mono font-medium`}>{v.km.toLocaleString()} km</td>
                  <td className={TD}><Badge status={v.status} /></td>
                  <RowActions onEdit={() => openEdit(v)} onDelete={() => setDeleteId(v.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-muted-foreground">No vehicle records match your filters.</div>
        )}
        <TableFooter shown={filtered.length} total={items.length} label="vehicles" />
      </div>
    </div>
  );
}

// Camera Trap Monitoring
const CAMERA_MONITOR_FIELDS: FieldDef[] = [
  { key: "id", label: "Trap Node ID", type: "text", placeholder: "CT-XX-XXX" },
  { key: "location", label: "Beat / Sector", type: "text" },
  { key: "range", label: "Range", type: "text" },
  { key: "lat", label: "Latitude", type: "text" },
  { key: "lng", label: "Longitude", type: "text" },
  { key: "battery", label: "Battery Level (%)", type: "number" },
  { key: "captures", label: "Capture Count", type: "number" },
  { key: "lastCapture", label: "Last Trigger Date", type: "date" },
  { key: "status", label: "Operational State", type: "select", options: ["Active", "Low Battery", "Offline"] },
];

function CameraTrapMonitoring() {
  const [items, setItems] = useState(() => [...CAMERA_TRAPS]);
  const [search, setSearch] = useState("");
  const [filterRange, setFilterRange] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const ranges = ["All", ...Array.from(new Set(items.map(c => c.range)))];
  const filtered = items.filter(c => {
    const q = search.toLowerCase();
    return (
      (c.id.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.range.toLowerCase().includes(q)) &&
      (filterRange === "All" || c.range === filterRange)
    );
  });

  function openCreate() {
    setEditItem({ id: "", location: "", range: "Nagarahole Core", lat: "12.0000", lng: "76.0000", battery: 100, captures: 0, lastCapture: "", installed: "", status: "Active" });
    setFormOpen(true);
  }
  function openEdit(item: typeof CAMERA_TRAPS[0]) { setEditItem({ ...item }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const item = { ...data, battery: Number(data.battery), captures: Number(data.captures) } as typeof CAMERA_TRAPS[0];
      const index = prev.findIndex(c => c.id === data.id);
      return index >= 0 ? prev.map((c, i) => i === index ? item : c) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(c => c.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={CAMERA_MONITOR_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Trap Node" : "Register Trap Node"} />

      <SectionHeader
        title="Camera Trap Monitoring Network"
        subtitle={`Active sensor grid telemetry across tiger beats · ${items.length} stations`}
        badge="Telemetry Live"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Sensor Logs" />
            <BtnPrimary icon={<Plus size={13} />} label="Deploy Node" onClick={openCreate} />
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat label="Total Nodes" value={String(items.length)} />
        <MiniStat label="Online Telemetry" value={String(items.filter(c => c.status === "Active").length)} colorClass="text-emerald-700" />
        <MiniStat label="Low Battery Alert" value={String(items.filter(c => c.status === "Low Battery").length)} colorClass="text-amber-700" />
        <MiniStat label="Offline / Damaged" value={String(items.filter(c => c.status === "Offline").length)} colorClass="text-red-700" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search node, beat, or coordinates…"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20"
          />
        </div>
        <select
          value={filterRange}
          onChange={e => setFilterRange(e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 cursor-pointer"
        >
          {ranges.map(r => <option key={r} value={r}>{r === "All" ? "All Ranges" : r}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Node ID</th>
                <th className={TH}>Beat / Sector</th>
                <th className={TH}>Range</th>
                <th className={TH}>Coordinates</th>
                <th className={TH}>Battery</th>
                <th className={`${TH} text-right`}>Triggers</th>
                <th className={TH}>Last Trigger</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{c.id}</td>
                  <td className={`${TD} font-medium`}>{c.location}</td>
                  <td className={`${TD} text-muted-foreground`}>{c.range}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px] text-muted-foreground`}>{c.lat}, {c.lng}</td>
                  <td className={TD}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-medium">{c.battery}%</span>
                      <div className="w-16 bg-[#E5E9E6] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${c.battery > 50 ? "bg-emerald-600" : c.battery > 20 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${c.battery}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className={`${TD} text-right font-mono font-medium`}>{c.captures}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{c.lastCapture}</td>
                  <td className={TD}><Badge status={c.status} /></td>
                  <RowActions onEdit={() => openEdit(c)} onDelete={() => setDeleteId(c.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="nodes" />
      </div>
    </div>
  );
}

// Employee Database
function EmployeeDatabase() {
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("All");

  const filtered = EMPLOYEES.filter(e => {
    const q = search.toLowerCase();
    return (
      (e.name.toLowerCase().includes(q) || e.designation.toLowerCase().includes(q) || e.division.toLowerCase().includes(q) || e.empId.toLowerCase().includes(q)) &&
      (filterGrade === "All" || e.grade === filterGrade)
    );
  });

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Personnel & Staff Database"
        subtitle="Permanent cadre, contractual field watchers, and IFS/KFS command hierarchy · 312 records"
        badge="HR Division"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Roster" />
            <BtnPrimary icon={<Plus size={13} />} label="Add Staff Member" />
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat label="Total Cadre" value="312" />
        <MiniStat label="Officers (IFS/KFS)" value="28" colorClass="text-[#174B3A]" />
        <MiniStat label="Field Watchers" value="248" colorClass="text-emerald-700" />
        <MiniStat label="Authorized Leave" value="17" colorClass="text-amber-700" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, designation, division, or ID…"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20"
          />
        </div>
        <select
          value={filterGrade}
          onChange={e => setFilterGrade(e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 cursor-pointer"
        >
          {["All", "IFS", "KFS-I", "KFS-II", "KFS-III", "Group-B", "Group-C", "Group-D"].map(g => (
            <option key={g} value={g}>{g === "All" ? "All Grades" : `Grade: ${g}`}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Officer ID</th>
                <th className={TH}>Full Name</th>
                <th className={TH}>Designation</th>
                <th className={TH}>Cadre Grade</th>
                <th className={TH}>Division / Range</th>
                <th className={TH}>Date Joined</th>
                <th className={TH}>Emergency Contact</th>
                <th className={TH}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(e => (
                <tr key={e.empId} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{e.empId}</td>
                  <td className={`${TD} font-medium`}>{e.name}</td>
                  <td className={`${TD} text-muted-foreground`}>{e.designation}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{e.grade}</td>
                  <td className={`${TD} text-muted-foreground`}>{e.division}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{e.joined}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{e.mobile}</td>
                  <td className={TD}><Badge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={EMPLOYEES.length} label="personnel records" />
      </div>
    </div>
  );
}

// Safari Bookings
function SafariBookings() {
  const [filterZone, setFilterZone] = useState("All");
  const filtered = SAFARI_BOOKINGS.filter(b => filterZone === "All" || b.zone === filterZone);

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Safari Reservations & Eco-Tourism"
        subtitle="Public safari reservations, assigned vehicles, and revenue reconciliation"
        badge="Eco-Tourism Board"
        actions={
          <>
            <BtnSecondary icon={<Calendar size={13} />} label="Calendar View" />
            <BtnSecondary icon={<Download size={13} />} label="Export Bookings" />
            <BtnPrimary icon={<Plus size={13} />} label="New Reservation" />
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat label="Today's Departures" value="23" />
        <MiniStat label="Booked Tourists" value="94" colorClass="text-[#174B3A]" />
        <MiniStat label="Today's Gross" value="₹52,400" colorClass="text-emerald-700" />
        <MiniStat label="Open Afternoon Slots" value="8" colorClass="text-amber-700" />
      </div>

      <div className="flex justify-end pt-2">
        <select
          value={filterZone}
          onChange={e => setFilterZone(e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 cursor-pointer"
        >
          {["All", "Nagarahole Safari", "Kabini Zone"].map(z => <option key={z} value={z}>{z === "All" ? "All Safari Zones" : z}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Booking ID</th>
                <th className={TH}>Tourist / Lead</th>
                <th className={TH}>Origin</th>
                <th className={TH}>Safari Zone</th>
                <th className={TH}>Date</th>
                <th className={TH}>Slot</th>
                <th className={TH}>Assigned Gypsy</th>
                <th className={TH}>Certified Guide</th>
                <th className={`${TH} text-center`}>Pax</th>
                <th className={`${TH} text-right`}>Fee (₹)</th>
                <th className={TH}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{b.id}</td>
                  <td className={`${TD} font-medium`}>{b.tourist}</td>
                  <td className={`${TD} text-muted-foreground`}>{b.origin}</td>
                  <td className={`${TD} text-muted-foreground`}>{b.zone}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{b.date}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{b.slot}</td>
                  <td className={`${TD} text-[#174B3A] font-mono`}>{b.vehicle}</td>
                  <td className={TD}>{b.guide}</td>
                  <td className={`${TD} text-center font-mono font-medium`}>{b.pax}</td>
                  <td className={`${TD} text-right font-mono font-semibold`}>₹{b.amount.toLocaleString()}</td>
                  <td className={TD}><Badge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={SAFARI_BOOKINGS.length} label="reservations" />
      </div>
    </div>
  );
}

// Sighting Register
const SIGHTING_FIELDS: FieldDef[] = [
  { key: "id", label: "Sighting ID", type: "text", placeholder: "SIG-2026-XXXX" },
  { key: "species", label: "Species", type: "text" },
  { key: "count", label: "Individual Count", type: "number" },
  { key: "zone", label: "Range / Zone", type: "text" },
  { key: "gridCell", label: "Grid Reference", type: "text" },
  { key: "reportedBy", label: "Reporting Officer", type: "text" },
  { key: "date", label: "Timestamp", type: "text" },
  { key: "evidence", label: "Evidence Type", type: "select", options: ["Camera Trap", "Direct Sighting", "Pugmark / Scat", "Thermal Drone"] },
  { key: "notes", label: "Field Observations", type: "textarea" },
];

function SightingRegister() {
  const [items, setItems] = useState(() => [...SIGHTINGS]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(s => {
    const q = search.toLowerCase();
    return s.id.toLowerCase().includes(q) || s.species.toLowerCase().includes(q) || s.zone.toLowerCase().includes(q) || s.gridCell.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `SIG-2026-${items.length + 1848}`, species: "Royal Bengal Tiger", count: 1, zone: "Nagarahole Core", gridCell: "NH-01A", reportedBy: "Field Team", date: "21 Aug 2026 08:00", evidence: "Direct Sighting", notes: "" });
    setFormOpen(true);
  }
  function openEdit(item: typeof SIGHTINGS[0]) { setEditItem({ ...item }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const item = { ...data, count: Number(data.count) } as typeof SIGHTINGS[0];
      const index = prev.findIndex(s => s.id === data.id);
      return index >= 0 ? prev.map((s, i) => i === index ? item : s) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(s => s.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={SIGHTING_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Wildlife Sighting" : "Log Sighting Entry"} />

      <SectionHeader
        title="Wildlife Sighting Register"
        subtitle="Verified apex predator and megaherbivore records across forest ranges"
        badge="NTCA Registry"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Sightings" />
            <BtnPrimary icon={<Plus size={13} />} label="Log Sighting" onClick={openCreate} />
          </>
        }
      />

      <div className="flex items-center justify-between gap-3 pt-2">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search species, zone, or grid cell…"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Sighting ID</th>
                <th className={TH}>Species</th>
                <th className={`${TH} text-center`}>Count</th>
                <th className={TH}>Range / Sector</th>
                <th className={TH}>Grid Ref.</th>
                <th className={TH}>Reported By</th>
                <th className={TH}>Date & Time</th>
                <th className={TH}>Evidence</th>
                <th className={TH}>Field Notes</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{s.id}</td>
                  <td className={`${TD} font-medium`}>{s.species}</td>
                  <td className={`${TD} text-center font-mono font-semibold`}>{s.count}</td>
                  <td className={`${TD} text-muted-foreground`}>{s.zone}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px] text-[#174B3A]`}>{s.gridCell}</td>
                  <td className={TD}>{s.reportedBy}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{s.date}</td>
                  <td className={TD}>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#F7F9F7] border border-border text-foreground">
                      {s.evidence}
                    </span>
                  </td>
                  <td className={`${TD} text-muted-foreground text-xs max-w-xs truncate`}>{s.notes}</td>
                  <RowActions onEdit={() => openEdit(s)} onDelete={() => setDeleteId(s.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="sightings" />
      </div>
    </div>
  );
}

// Patrol Monitoring
const PATROL_FIELDS: FieldDef[] = [
  { key: "id", label: "Patrol Log ID", type: "text" },
  { key: "team", label: "Squad / Team", type: "text" },
  { key: "range", label: "Range", type: "text" },
  { key: "route", label: "Route Traversed", type: "text" },
  { key: "date", label: "Patrol Date", type: "date" },
  { key: "duration", label: "Duration (hrs)", type: "number" },
  { key: "distance", label: "Distance (km)", type: "number" },
  { key: "sightings", label: "Sightings", type: "number" },
  { key: "incidents", label: "Incidents", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Completed", "In Progress", "Scheduled"] },
];

function PatrolMonitoring() {
  const [items, setItems] = useState(() => [...PATROL_RECORDS]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(p => filterStatus === "All" || p.status === filterStatus);

  function openCreate() {
    setEditItem({ id: `PAT-2026-0${items.length + 843}`, team: "Bravo Team", range: "Nagarahole Core", route: "", date: "21 Aug 2026", duration: 5, distance: 15, sightings: 0, incidents: 0, status: "Scheduled" });
    setFormOpen(true);
  }
  function openEdit(item: typeof PATROL_RECORDS[0]) { setEditItem({ ...item }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const item = { ...data, duration: Number(data.duration), distance: Number(data.distance), sightings: Number(data.sightings), incidents: Number(data.incidents) } as typeof PATROL_RECORDS[0];
      const index = prev.findIndex(p => p.id === data.id);
      return index >= 0 ? prev.map((p, i) => i === index ? item : p) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(p => p.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={PATROL_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Patrol Record" : "Schedule Patrol"} />

      <SectionHeader
        title="Patrol Route Tracking"
        subtitle="GPS-logged foot and vehicular reconnaissance patrols across 34 beats"
        badge="Field Command"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Tracks" />
            <BtnPrimary icon={<Plus size={13} />} label="Log Patrol" onClick={openCreate} />
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat label="Logged Distance" value="76.8 km" colorClass="text-[#174B3A]" />
        <MiniStat label="Completed Routes" value={String(items.filter(p => p.status === "Completed").length)} colorClass="text-emerald-700" />
        <MiniStat label="In Progress" value={String(items.filter(p => p.status === "In Progress").length)} colorClass="text-blue-700" />
        <MiniStat label="Scheduled" value={String(items.filter(p => p.status === "Scheduled").length)} colorClass="text-neutral-500" />
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Patrol ID</th>
                <th className={TH}>Squad Name</th>
                <th className={TH}>Range</th>
                <th className={TH}>Patrol Route</th>
                <th className={TH}>Date</th>
                <th className={`${TH} text-right`}>Duration</th>
                <th className={`${TH} text-right`}>Distance</th>
                <th className={`${TH} text-center`}>Sightings</th>
                <th className={`${TH} text-center`}>Incidents</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{p.id}</td>
                  <td className={`${TD} font-medium`}>{p.team}</td>
                  <td className={`${TD} text-muted-foreground`}>{p.range}</td>
                  <td className={`${TD} text-foreground`}>{p.route}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{p.date}</td>
                  <td className={`${TD} text-right font-mono`}>{p.duration} hrs</td>
                  <td className={`${TD} text-right font-mono font-medium`}>{p.distance} km</td>
                  <td className={`${TD} text-center font-mono font-medium`}>{p.sightings}</td>
                  <td className={`${TD} text-center font-mono ${p.incidents > 0 ? "text-red-700 font-bold" : "text-muted-foreground"}`}>{p.incidents}</td>
                  <td className={TD}><Badge status={p.status} /></td>
                  <RowActions onEdit={() => openEdit(p)} onDelete={() => setDeleteId(p.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="patrol logs" />
      </div>
    </div>
  );
}

// Anti-Poaching Records
const ANTI_POACHING_FIELDS: FieldDef[] = [
  { key: "id", label: "Incident ID", type: "text" },
  { key: "date", label: "Date Recorded", type: "date" },
  { key: "range", label: "Range", type: "text" },
  { key: "type", label: "Offence Category", type: "select", options: ["Snare Recovery", "Illegal Entry", "Timber Offence", "Suspected Poaching", "Trespass"] },
  { key: "location", label: "Beat Location", type: "text" },
  { key: "reportedBy", label: "Reporting Squad", type: "text" },
  { key: "seizure", label: "Seizures / Evidence", type: "text" },
  { key: "caseNo", label: "Court / Forest Case No.", type: "text" },
  { key: "status", label: "Legal Status", type: "select", options: ["Under Investigation", "Case Filed", "Resolved"] },
];

function AntiPoachingRecords() {
  const [items, setItems] = useState(() => [...ANTI_POACHING_RECORDS]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(i => {
    const q = search.toLowerCase();
    return i.id.toLowerCase().includes(q) || i.type.toLowerCase().includes(q) || i.range.toLowerCase().includes(q) || i.caseNo.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `APR-2026-0${items.length + 119}`, date: "21 Aug 2026", range: "Nagarahole Core", type: "Snare Recovery", location: "", reportedBy: "Tiger Squad", seizure: "", caseNo: `NSTR/WL/${items.length + 119}/26`, status: "Under Investigation" });
    setFormOpen(true);
  }
  function openEdit(item: typeof ANTI_POACHING_RECORDS[0]) { setEditItem({ ...item }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const item = data as typeof ANTI_POACHING_RECORDS[0];
      const index = prev.findIndex(i => i.id === data.id);
      return index >= 0 ? prev.map((i, idx) => idx === index ? item : i) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(i => i.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={ANTI_POACHING_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Case Dossier" : "File Anti-Poaching Incident"} />

      <SectionHeader
        title="Anti-Poaching Incident Records"
        subtitle="Formal forest offences, snare recoveries, timber seizures, and legal prosecution dossiers"
        badge="Legal & Enforcement"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Dossiers" />
            <BtnPrimary icon={<Plus size={13} />} label="File Incident" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Case ID</th>
                <th className={TH}>Date</th>
                <th className={TH}>Range</th>
                <th className={TH}>Offence Category</th>
                <th className={TH}>Beat Location</th>
                <th className={TH}>Reporting Squad</th>
                <th className={TH}>Seized Evidence</th>
                <th className={TH}>Case Dossier No.</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(i => (
                <tr key={i.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{i.id}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{i.date}</td>
                  <td className={`${TD} text-muted-foreground`}>{i.range}</td>
                  <td className={`${TD} font-medium`}>{i.type}</td>
                  <td className={TD}>{i.location}</td>
                  <td className={`${TD} text-muted-foreground`}>{i.reportedBy}</td>
                  <td className={TD}>{i.seizure}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px] text-[#174B3A]`}>{i.caseNo}</td>
                  <td className={TD}><Badge status={i.status} /></td>
                  <RowActions onEdit={() => openEdit(i)} onDelete={() => setDeleteId(i.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="incident records" />
      </div>
    </div>
  );
}

// GIS Integration
const GIS_FIELDS: FieldDef[] = [
  { key: "id", label: "Layer ID", type: "text" },
  { key: "name", label: "Layer Name", type: "text" },
  { key: "type", label: "Spatial Category", type: "select", options: ["Wildlife Movement", "Patrol Routes", "Habitat", "Risk Analysis", "Forest Protection"] },
  { key: "coverage", label: "Coverage Boundary", type: "text" },
  { key: "source", label: "Data Source", type: "text" },
  { key: "updatedBy", label: "Authoring Unit", type: "text" },
  { key: "lastUpdated", label: "Last Sync", type: "date" },
  { key: "features", label: "Geometry Count", type: "number" },
  { key: "status", label: "Status", type: "select", options: ["Published", "Restricted", "Draft"] },
];

function GISIntegration() {
  const [items, setItems] = useState(() => [...GIS_LAYERS]);
  const [filterType, setFilterType] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(l => filterType === "All" || l.type === filterType);
  const types = ["All", ...Array.from(new Set(items.map(l => l.type)))];

  function openCreate() {
    setEditItem({ id: `GIS-NEW-0${items.length + 1}`, name: "", type: "Wildlife Movement", coverage: "All Ranges", source: "Field GPS", updatedBy: "GIS Cell", lastUpdated: "21 Aug 2026", features: 0, status: "Draft" });
    setFormOpen(true);
  }
  function openEdit(item: typeof GIS_LAYERS[0]) { setEditItem({ ...item }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const item = { ...data, features: Number(data.features) } as typeof GIS_LAYERS[0];
      const index = prev.findIndex(l => l.id === data.id);
      return index >= 0 ? prev.map((l, i) => i === index ? item : l) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(l => l.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={GIS_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Spatial Layer" : "Publish Spatial Layer"} />

      <SectionHeader
        title="GIS & Spatial Intelligence Integration"
        subtitle="ESRI Shapefiles, GeoJSON boundaries, patrol tracks, and waterhole layer catalog"
        badge="Spatial Geoportal"
        actions={
          <>
            <BtnSecondary icon={<Map size={13} />} label="Open GIS Map" />
            <BtnPrimary icon={<Plus size={13} />} label="Import Layer" onClick={openCreate} />
          </>
        }
      />

      <div className="flex justify-end pt-2">
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 cursor-pointer"
        >
          {types.map(t => <option key={t} value={t}>{t === "All" ? "All Layer Types" : t}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Layer ID</th>
                <th className={TH}>Spatial Dataset Name</th>
                <th className={TH}>Category</th>
                <th className={TH}>Coverage Area</th>
                <th className={TH}>Data Pipeline</th>
                <th className={TH}>Authoring Cell</th>
                <th className={TH}>Last Synchronization</th>
                <th className={`${TH} text-right`}>Features</th>
                <th className={TH}>Security Level</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{l.id}</td>
                  <td className={`${TD} font-medium`}>{l.name}</td>
                  <td className={TD}>{l.type}</td>
                  <td className={`${TD} text-muted-foreground`}>{l.coverage}</td>
                  <td className={`${TD} text-muted-foreground`}>{l.source}</td>
                  <td className={TD}>{l.updatedBy}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{l.lastUpdated}</td>
                  <td className={`${TD} text-right font-mono font-medium`}>{l.features}</td>
                  <td className={TD}><Badge status={l.status} /></td>
                  <RowActions onEdit={() => openEdit(l)} onDelete={() => setDeleteId(l.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="spatial layers" />
      </div>
    </div>
  );
}

// Graphical Reports
function GraphicalReports() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Visual Analytics & Graphical Reports"
        subtitle="Cross-sectional charts, telemetry distributions, and historical trendlines · August 2026"
        badge="NTCA Compliance"
        actions={<BtnPrimary icon={<Download size={13} />} label="Export Analytical PDF" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1 */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-foreground">Apex Wildlife Population Trends</h2>
            <span className="text-[11px] font-mono text-muted-foreground">Mar – Aug 2026</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Cumulative monthly sighting counts</p>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyWildlifeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#E5E9E6" />
                <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: "#E5E9E6" }} tick={{ fontSize: 11, fill: "#5E6E63" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5E6E63" }} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E9E6", fontSize: "12px" }} />
                <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} iconType="circle" iconSize={7} />
                <Line type="monotone" dataKey="tiger" name="Tiger" stroke="#D97706" strokeWidth={2.5} dot={{ r: 3.5, fill: "#D97706" }} />
                <Line type="monotone" dataKey="elephant" name="Elephant" stroke="#174B3A" strokeWidth={2.5} dot={{ r: 3.5, fill: "#174B3A" }} />
                <Line type="monotone" dataKey="leopard" name="Leopard" stroke="#2563EB" strokeWidth={1.5} strokeDasharray="4 3" dot={{ r: 3, fill: "#2563EB" }} />
                <Line type="monotone" dataKey="gaur" name="Gaur" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: "#10B981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-foreground">Revenue Flow (₹ Thousands)</h2>
            <span className="text-[11px] font-mono text-muted-foreground">Mar – Aug 2026</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Breakdown across Safari, Rooms & Gate Entry</p>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#E5E9E6" />
                <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: "#E5E9E6" }} tick={{ fontSize: 11, fill: "#5E6E63" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5E6E63" }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E9E6", fontSize: "12px" }} />
                <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} iconType="circle" iconSize={7} />
                <Bar dataKey="safari" name="Safari" fill="#174B3A" radius={[3, 3, 0, 0]} maxBarSize={28} />
                <Bar dataKey="rooms" name="Rooms" fill="#40916C" radius={[3, 3, 0, 0]} maxBarSize={28} />
                <Bar dataKey="entry" name="Entry Fees" fill="#B5891E" radius={[3, 3, 0, 0]} maxBarSize={28} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3 */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-foreground">Weekly Patrol Effort vs Incident Occurrence</h2>
            <span className="text-[11px] font-mono text-muted-foreground">Rolling 6 Weeks</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Correlation between field presence and deterrence</p>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={patrolData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#E5E9E6" />
                <XAxis dataKey="week" tickLine={false} axisLine={{ stroke: "#E5E9E6" }} tick={{ fontSize: 11, fill: "#5E6E63" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5E6E63" }} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E9E6", fontSize: "12px" }} />
                <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} iconType="circle" iconSize={7} />
                <Bar dataKey="patrols" name="Patrols Logged" fill="#174B3A" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="incidents" name="Incidents Detected" fill="#DC2626" radius={[3, 3, 0, 0]} maxBarSize={24} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4 */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-foreground">Species Sighting Distribution</h2>
            <span className="text-[11px] font-mono text-muted-foreground">August 2026</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Cumulative distribution across all 7 ranges</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={speciesDistribution} cx="50%" cy="50%" outerRadius={78} innerRadius={48} paddingAngle={2} dataKey="value">
                  {speciesDistribution.map((entry, i) => <Cell key={i} fill={entry.color} stroke="#FFFFFF" strokeWidth={1.5} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E9E6", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/80">
            {speciesDistribution.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-muted-foreground truncate">{s.name}</span>
                <span className="font-mono font-medium text-foreground text-[11px] ml-auto">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Camera Trap Inventory
const CAMERA_TRAP_FIELDS: FieldDef[] = [
  { key: "id", label: "Asset ID", type: "text", placeholder: "INV-CT-XXX" },
  { key: "model", label: "Camera Model", type: "text" },
  { key: "type", label: "Sensor Type", type: "select", options: ["Passive IR", "Flash + IR", "No-Glow IR", "Video Trap"] },
  { key: "range", label: "Range / Zone", type: "text" },
  { key: "location", label: "Location / Beat", type: "text" },
  { key: "assignedTo", label: "Custodian Officer", type: "text" },
  { key: "purchased", label: "Purchase Date", type: "date" },
  { key: "warranty", label: "Warranty End", type: "date" },
  { key: "cost", label: "Unit Cost (₹)", type: "number" },
  { key: "condition", label: "Physical Condition", type: "select", options: ["Good", "Fair", "Under Repair", "Damaged"] },
];

function CameraTrapInventory() {
  const [items, setItems] = useState(() => [...CAMERA_INVENTORY]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(c => {
    const q = search.toLowerCase();
    return c.id.toLowerCase().includes(q) || c.model.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.range.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `INV-CT-0${items.length + 1}`, model: "Bushnell Core S-4K", type: "Passive IR", range: "Nagarahole Core", location: "", assignedTo: "K.S. Prakash", purchased: "2025-01-10", warranty: "2028-01-10", cost: 12500, condition: "Good" });
    setFormOpen(true);
  }
  function openEdit(c: typeof CAMERA_INVENTORY[0]) { setEditItem({ ...c }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(c => c.id === data.id);
      const item = { ...data, cost: Number(data.cost) } as typeof CAMERA_INVENTORY[0];
      return idx >= 0 ? prev.map((c, i) => i === idx ? item : c) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(c => c.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={CAMERA_TRAP_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Trap Asset" : "Acquire Camera Trap"} />

      <SectionHeader
        title="Camera Trap Asset Register"
        subtitle="Physical custody, warranty contracts, purchase records, and asset condition ledger"
        badge="Hardware Custody"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Asset Ledger" />
            <BtnPrimary icon={<Plus size={13} />} label="Register Asset" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Asset ID</th>
                <th className={TH}>Camera Trap Model</th>
                <th className={TH}>Sensor Type</th>
                <th className={TH}>Range</th>
                <th className={TH}>Beat Location</th>
                <th className={TH}>Custodian</th>
                <th className={TH}>Warranty</th>
                <th className={`${TH} text-right`}>Procurement Cost</th>
                <th className={TH}>Condition</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{c.id}</td>
                  <td className={`${TD} font-medium`}>{c.model}</td>
                  <td className={`${TD} text-muted-foreground`}>{c.type}</td>
                  <td className={TD}>{c.range}</td>
                  <td className={TD}>{c.location}</td>
                  <td className={`${TD} text-muted-foreground`}>{c.assignedTo}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{c.warranty}</td>
                  <td className={`${TD} text-right font-mono font-medium`}>₹{c.cost.toLocaleString()}</td>
                  <td className={TD}><ConditionBadge cond={c.condition} /></td>
                  <RowActions onEdit={() => openEdit(c)} onDelete={() => setDeleteId(c.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="camera assets" />
      </div>
    </div>
  );
}

// GPS Inventory
const GPS_FIELDS: FieldDef[] = [
  { key: "id", label: "Asset Tag", type: "text" },
  { key: "model", label: "Equipment Model", type: "text" },
  { key: "type", label: "Category", type: "select", options: ["Handheld", "Vehicle Tracker", "Base Station"] },
  { key: "range", label: "Assigned Range", type: "text" },
  { key: "assignedTo", label: "Custodian / Target", type: "text" },
  { key: "accuracy", label: "RMS Accuracy", type: "text" },
  { key: "lastCalibrated", label: "Last Calibration", type: "date" },
  { key: "status", label: "Operational State", type: "select", options: ["Active", "Expired Warranty", "Service"] },
];

function GPSInventory() {
  const [items, setItems] = useState(() => [...GPS_EQUIPMENT]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(g => {
    const q = search.toLowerCase();
    return g.id.toLowerCase().includes(q) || g.model.toLowerCase().includes(q) || g.range.toLowerCase().includes(q) || g.assignedTo.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `GPS-NEW-0${items.length + 1}`, model: "Garmin eTrex 32x", type: "Handheld", range: "Nagarahole Core", assignedTo: "Field Team", purchased: "2024-01-01", warranty: "2027-01-01", status: "Active", accuracy: "3m", lastCalibrated: "2026-08-01" });
    setFormOpen(true);
  }
  function openEdit(g: typeof GPS_EQUIPMENT[0]) { setEditItem({ ...g }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(g => g.id === data.id);
      const item = data as typeof GPS_EQUIPMENT[0];
      return idx >= 0 ? prev.map((g, i) => i === idx ? item : g) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(g => g.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={GPS_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit GPS Device" : "Register GPS Equipment"} />

      <SectionHeader
        title="GPS & Navigation Equipment"
        subtitle="Handheld patrol GPS units, vehicle telematics transponders, and calibration records"
        badge="Navigation Assets"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Device List" />
            <BtnPrimary icon={<Plus size={13} />} label="Add Device" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Asset Tag</th>
                <th className={TH}>Hardware Model</th>
                <th className={TH}>Type</th>
                <th className={TH}>Range</th>
                <th className={TH}>Custodian / Vehicle</th>
                <th className={TH}>Accuracy</th>
                <th className={TH}>Last Calibrated</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(g => (
                <tr key={g.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{g.id}</td>
                  <td className={`${TD} font-medium`}>{g.model}</td>
                  <td className={TD}>{g.type}</td>
                  <td className={`${TD} text-muted-foreground`}>{g.range}</td>
                  <td className={TD}>{g.assignedTo}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{g.accuracy}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{g.lastCalibrated}</td>
                  <td className={TD}><Badge status={g.status} /></td>
                  <RowActions onEdit={() => openEdit(g)} onDelete={() => setDeleteId(g.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="GPS units" />
      </div>
    </div>
  );
}

// Wireless Equipment
const WIRELESS_FIELDS: FieldDef[] = [
  { key: "id", label: "Asset ID", type: "text" },
  { key: "type", label: "Station Type", type: "select", options: ["Base Station", "Repeater", "Walkie-Talkie"] },
  { key: "model", label: "Equipment Model", type: "text" },
  { key: "frequency", label: "Operating Band", type: "text" },
  { key: "location", label: "Station Location", type: "text" },
  { key: "range", label: "Division / Range", type: "text" },
  { key: "assignedTo", label: "Custodian Squad", type: "text" },
  { key: "power", label: "TX Power", type: "text" },
  { key: "status", label: "Operational State", type: "select", options: ["Active", "Under Repair", "Damaged"] },
];

function WirelessInventory() {
  const [items, setItems] = useState(() => [...WIRELESS_EQUIPMENT]);
  const [filterType, setFilterType] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(w => filterType === "All" || w.type === filterType);

  function openCreate() {
    setEditItem({ id: `WLS-NEW-0${items.length + 1}`, type: "Walkie-Talkie", model: "Motorola DP1400", frequency: "VHF 136–174 MHz", location: "Nagarahole Core", range: "Nagarahole Core", assignedTo: "Patrol Squad", power: "5W", purchased: "2024-02-01", status: "Active" });
    setFormOpen(true);
  }
  function openEdit(w: typeof WIRELESS_EQUIPMENT[0]) { setEditItem({ ...w }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(w => w.id === data.id);
      const item = data as typeof WIRELESS_EQUIPMENT[0];
      return idx >= 0 ? prev.map((w, i) => i === idx ? item : w) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(w => w.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={WIRELESS_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Wireless Asset" : "Register Wireless Asset"} />

      <SectionHeader
        title="Wireless & Comms Equipment"
        subtitle="VHF/UHF hill repeaters, headquarters base stations, and handheld patrol handsets"
        badge="Telecommunications"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Radio Register" />
            <BtnPrimary icon={<Plus size={13} />} label="Add Wireless Asset" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Asset ID</th>
                <th className={TH}>Category</th>
                <th className={TH}>Hardware Model</th>
                <th className={TH}>Frequency Spectrum</th>
                <th className={TH}>Station Location</th>
                <th className={TH}>Range</th>
                <th className={TH}>Custodian</th>
                <th className={TH}>TX Power</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{w.id}</td>
                  <td className={`${TD} font-medium`}>{w.type}</td>
                  <td className={TD}>{w.model}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{w.frequency}</td>
                  <td className={TD}>{w.location}</td>
                  <td className={`${TD} text-muted-foreground`}>{w.range}</td>
                  <td className={TD}>{w.assignedTo}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{w.power}</td>
                  <td className={TD}><Badge status={w.status} /></td>
                  <RowActions onEdit={() => openEdit(w)} onDelete={() => setDeleteId(w.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="wireless devices" />
      </div>
    </div>
  );
}

// Computer & IT Inventory
const COMPUTER_FIELDS: FieldDef[] = [
  { key: "id", label: "Asset Tag", type: "text" },
  { key: "type", label: "Device Category", type: "select", options: ["Desktop PC", "Laptop", "Laser Printer", "Inkjet Printer", "Scanner", "Server"] },
  { key: "brand", label: "Model / Brand", type: "text" },
  { key: "os", label: "Operating System", type: "text" },
  { key: "ram", label: "Memory (RAM)", type: "text" },
  { key: "storage", label: "Storage Capacity", type: "text" },
  { key: "office", label: "Deployment Office", type: "text" },
  { key: "assignedTo", label: "Assigned User", type: "text" },
  { key: "warranty", label: "Warranty End", type: "date" },
  { key: "status", label: "State", type: "select", options: ["Active", "Expired Warranty", "Under Repair"] },
];

function ComputerInventory() {
  const [items, setItems] = useState(() => [...COMPUTERS]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(c => {
    const q = search.toLowerCase();
    return c.id.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.office.toLowerCase().includes(q) || c.assignedTo.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `IT-NEW-0${items.length + 1}`, type: "Laptop", brand: "Dell Latitude 5540", os: "Windows 11 Pro", ram: "16 GB", storage: "512 GB SSD", office: "HQ Virajpet", assignedTo: "", purchased: "2025-01-01", warranty: "2028-01-01", status: "Active" });
    setFormOpen(true);
  }
  function openEdit(c: typeof COMPUTERS[0]) { setEditItem({ ...c }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(c => c.id === data.id);
      const item = data as typeof COMPUTERS[0];
      return idx >= 0 ? prev.map((c, i) => i === idx ? item : c) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(c => c.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={COMPUTER_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit IT Asset" : "Acquire IT Hardware"} />

      <SectionHeader
        title="Computers & IT Hardware Register"
        subtitle="Desktops, field laptops, document scanners, network laser printers, and office servers"
        badge="IT Division"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Asset Registry" />
            <BtnPrimary icon={<Plus size={13} />} label="Add IT Hardware" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Asset Tag</th>
                <th className={TH}>Category</th>
                <th className={TH}>Brand & Model</th>
                <th className={TH}>Operating System</th>
                <th className={TH}>RAM / Storage</th>
                <th className={TH}>Office Location</th>
                <th className={TH}>Assigned Officer</th>
                <th className={TH}>Warranty End</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{c.id}</td>
                  <td className={`${TD} font-medium`}>{c.type}</td>
                  <td className={TD}>{c.brand}</td>
                  <td className={`${TD} text-muted-foreground`}>{c.os}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{c.ram !== "—" ? `${c.ram} · ${c.storage}` : "—"}</td>
                  <td className={TD}>{c.office}</td>
                  <td className={`${TD} text-muted-foreground`}>{c.assignedTo}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{c.warranty}</td>
                  <td className={TD}><Badge status={c.status} /></td>
                  <RowActions onEdit={() => openEdit(c)} onDelete={() => setDeleteId(c.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="computing assets" />
      </div>
    </div>
  );
}

// Office Furniture
const FURNITURE_FIELDS: FieldDef[] = [
  { key: "id", label: "Asset ID", type: "text" },
  { key: "type", label: "Category", type: "select", options: ["Executive Chair", "Office Chair", "Office Table", "Conference Table", "Steel Almirah", "Filing Cabinet", "Waiting Bench", "Notice Board", "Safe Cabinet"] },
  { key: "item", label: "Item Description", type: "text" },
  { key: "material", label: "Material Composition", type: "text" },
  { key: "location", label: "Office Location", type: "text" },
  { key: "qty", label: "Quantity", type: "number" },
  { key: "purchaseYear", label: "Acquisition Year", type: "number" },
  { key: "supplier", label: "Approved Supplier", type: "text" },
  { key: "condition", label: "Condition", type: "select", options: ["Good", "Fair", "Under Repair", "Damaged"] },
];

function FurnitureInventory() {
  const [items, setItems] = useState(() => [...FURNITURE]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(f => {
    const q = search.toLowerCase();
    return f.id.toLowerCase().includes(q) || f.item.toLowerCase().includes(q) || f.location.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `FRN-HQ-0${items.length + 1}`, type: "Office Chair", item: "", material: "Steel", location: "HQ Virajpet", qty: 1, purchaseYear: 2024, supplier: "Godrej Interio", condition: "Good" });
    setFormOpen(true);
  }
  function openEdit(f: typeof FURNITURE[0]) { setEditItem({ ...f }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(f => f.id === data.id);
      const item = { ...data, qty: Number(data.qty), purchaseYear: Number(data.purchaseYear) } as typeof FURNITURE[0];
      return idx >= 0 ? prev.map((f, i) => i === idx ? item : f) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(f => f.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={FURNITURE_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Furniture Asset" : "Add Office Furniture"} />

      <SectionHeader
        title="Office Furniture & Fixtures"
        subtitle="Administrative furniture, storage almirahs, conference tables, and fireproof safe cabinets"
        badge="General Assets"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Furniture List" />
            <BtnPrimary icon={<Plus size={13} />} label="Add Furniture" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Asset ID</th>
                <th className={TH}>Classification</th>
                <th className={TH}>Specification</th>
                <th className={TH}>Material</th>
                <th className={TH}>Deployment Office</th>
                <th className={`${TH} text-center`}>Qty</th>
                <th className={TH}>Acquired</th>
                <th className={TH}>Vendor Supplier</th>
                <th className={TH}>Condition</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(f => (
                <tr key={f.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{f.id}</td>
                  <td className={`${TD} font-medium`}>{f.type}</td>
                  <td className={TD}>{f.item}</td>
                  <td className={`${TD} text-muted-foreground`}>{f.material}</td>
                  <td className={TD}>{f.location}</td>
                  <td className={`${TD} text-center font-mono font-medium`}>{f.qty}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{f.purchaseYear}</td>
                  <td className={`${TD} text-muted-foreground`}>{f.supplier}</td>
                  <td className={TD}><ConditionBadge cond={f.condition} /></td>
                  <RowActions onEdit={() => openEdit(f)} onDelete={() => setDeleteId(f.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="furniture items" />
      </div>
    </div>
  );
}

// Camp Equipment
const CAMP_FIELDS: FieldDef[] = [
  { key: "id", label: "Inventory Tag", type: "text" },
  { key: "item", label: "Equipment Name", type: "text" },
  { key: "category", label: "Category", type: "select", options: ["Shelter", "Bedding", "Cooking", "Sanitation", "Lighting", "Medical", "Apparel", "Water Storage", "Tools"] },
  { key: "qty", label: "Stock Quantity", type: "number" },
  { key: "range", label: "Allocated Range", type: "text" },
  { key: "lastUsed", label: "Last Field Use", type: "date" },
  { key: "supplier", label: "Vendor", type: "text" },
  { key: "condition", label: "Condition", type: "select", options: ["Good", "Fair", "Under Repair", "Damaged"] },
];

function CampEquipmentInventory() {
  const [items, setItems] = useState(() => [...CAMP_EQUIPMENT]);
  const [filterCat, setFilterCat] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(items.map(c => c.category)))];
  const filtered = items.filter(c => filterCat === "All" || c.category === filterCat);

  function openCreate() {
    setEditItem({ id: `CMP-ALL-0${items.length + 1}`, item: "", category: "Shelter", qty: 1, range: "Nagarahole Core", lastUsed: "2026-08-20", purchaseYear: 2025, supplier: "Decathlon India", condition: "Good" });
    setFormOpen(true);
  }
  function openEdit(c: typeof CAMP_EQUIPMENT[0]) { setEditItem({ ...c }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(c => c.id === data.id);
      const item = { ...data, qty: Number(data.qty) } as typeof CAMP_EQUIPMENT[0];
      return idx >= 0 ? prev.map((c, i) => i === idx ? item : c) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(c => c.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={CAMP_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Camp Gear" : "Add Field Camp Equipment"} />

      <SectionHeader
        title="Field & Camp Equipment"
        subtitle="Anti-poaching camp gear, all-weather tents, solar lanterns, first aid kits, and survival supplies"
        badge="Field Equipment"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Inventory" />
            <BtnPrimary icon={<Plus size={13} />} label="Add Camp Gear" onClick={openCreate} />
          </>
        }
      />

      <div className="flex justify-end pt-2">
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 cursor-pointer"
        >
          {categories.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Tag ID</th>
                <th className={TH}>Equipment Description</th>
                <th className={TH}>Category</th>
                <th className={`${TH} text-center`}>Stock</th>
                <th className={TH}>Range Allocation</th>
                <th className={TH}>Last Field Use</th>
                <th className={TH}>Vendor Supplier</th>
                <th className={TH}>Condition</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{c.id}</td>
                  <td className={`${TD} font-medium`}>{c.item}</td>
                  <td className={TD}>{c.category}</td>
                  <td className={`${TD} text-center font-mono font-medium`}>{c.qty}</td>
                  <td className={`${TD} text-muted-foreground`}>{c.range}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{c.lastUsed}</td>
                  <td className={`${TD} text-muted-foreground`}>{c.supplier}</td>
                  <td className={TD}><ConditionBadge cond={c.condition} /></td>
                  <RowActions onEdit={() => openEdit(c)} onDelete={() => setDeleteId(c.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="camp equipment records" />
      </div>
    </div>
  );
}

// Tourism Assets
const TOURISM_ASSET_FIELDS: FieldDef[] = [
  { key: "id", label: "Asset Tag", type: "text" },
  { key: "type", label: "Tourism Asset Type", type: "select", options: ["Safari Gypsy (Tourism)", "Coracle", "Motor Boat", "Binoculars", "Watchtower / Machan"] },
  { key: "model", label: "Specification / Model", type: "text" },
  { key: "zone", label: "Operational Zone", type: "text" },
  { key: "capacity", label: "Visitor Capacity", type: "text" },
  { key: "regNo", label: "Official ID / Reg No.", type: "text" },
  { key: "lastService", label: "Last Inspection", type: "date" },
  { key: "status", label: "State", type: "select", options: ["Active", "Service", "Under Repair"] },
  { key: "condition", label: "Condition", type: "select", options: ["Good", "Fair", "Under Repair"] },
];

function TourismAssetsInventory() {
  const [items, setItems] = useState(() => [...TOURISM_ASSETS]);
  const [filterType, setFilterType] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(t => filterType === "All" || t.type === filterType);
  const types = ["All", ...Array.from(new Set(items.map(t => t.type)))];

  function openCreate() {
    setEditItem({ id: `TA-NEW-0${items.length + 1}`, type: "Safari Gypsy (Tourism)", model: "Maruti Gypsy MG410", zone: "Nagarahole Safari Zone", capacity: "6 pax + guide", status: "Active", regNo: "KA-09-G-XXXX", lastService: "2026-08-01", condition: "Good" });
    setFormOpen(true);
  }
  function openEdit(t: typeof TOURISM_ASSETS[0]) { setEditItem({ ...t }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(t => t.id === data.id);
      const item = data as typeof TOURISM_ASSETS[0];
      return idx >= 0 ? prev.map((t, i) => i === idx ? item : t) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(t => t.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={TOURISM_ASSET_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Tourism Asset" : "Register Tourism Asset"} />

      <SectionHeader
        title="Tourism Asset Inventory"
        subtitle="Safari Gypsys, reservoir coracles, motor boats, visitor machans, and optical gear"
        badge="Eco-Tourism Assets"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Asset Registry" />
            <BtnPrimary icon={<Plus size={13} />} label="Add Tourism Asset" onClick={openCreate} />
          </>
        }
      />

      <div className="flex justify-end pt-2">
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-[#174B3A] focus:ring-1 focus:ring-[#174B3A]/20 cursor-pointer"
        >
          {types.map(t => <option key={t} value={t}>{t === "All" ? "All Asset Types" : t}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Tag ID</th>
                <th className={TH}>Category</th>
                <th className={TH}>Asset Specification</th>
                <th className={TH}>Operational Zone</th>
                <th className={TH}>Visitor Capacity</th>
                <th className={TH}>Official Reg.</th>
                <th className={TH}>Last Inspection</th>
                <th className={TH}>Status</th>
                <th className={TH}>Condition</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{t.id}</td>
                  <td className={`${TD} font-medium`}>{t.type}</td>
                  <td className={TD}>{t.model}</td>
                  <td className={`${TD} text-muted-foreground`}>{t.zone}</td>
                  <td className={TD}>{t.capacity}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px] text-[#174B3A]`}>{t.regNo}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{t.lastService}</td>
                  <td className={TD}><Badge status={t.status} /></td>
                  <td className={TD}><ConditionBadge cond={t.condition} /></td>
                  <RowActions onEdit={() => openEdit(t)} onDelete={() => setDeleteId(t.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="tourism assets" />
      </div>
    </div>
  );
}

// Store Materials
const STORE_FIELDS: FieldDef[] = [
  { key: "id", label: "SKU / Code", type: "text" },
  { key: "item", label: "Material Description", type: "text" },
  { key: "category", label: "Category", type: "select", options: ["Stationery", "IT Consumables", "Uniform", "PPE", "Field Supplies", "Fuel", "Lubricants", "Electronics"] },
  { key: "qty", label: "Current Stock", type: "number" },
  { key: "unit", label: "Unit of Measurement", type: "text" },
  { key: "reorderLevel", label: "Reorder Trigger Level", type: "number" },
  { key: "location", label: "Warehouse / Depot", type: "text" },
  { key: "lastUpdated", label: "Stock Count Date", type: "date" },
];

function StoreMaterialsInventory() {
  const [items, setItems] = useState(() => [...STORE_MATERIALS]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(s => {
    const q = search.toLowerCase();
    return s.id.toLowerCase().includes(q) || s.item.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `STR-0${items.length + 15}`, item: "", category: "Stationery", qty: 0, unit: "Pieces", reorderLevel: 10, location: "HQ Virajpet Store", lastUpdated: "2026-08-21" });
    setFormOpen(true);
  }
  function openEdit(s: typeof STORE_MATERIALS[0]) { setEditItem({ ...s }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(s => s.id === data.id);
      const item = { ...data, qty: Number(data.qty), reorderLevel: Number(data.reorderLevel) } as typeof STORE_MATERIALS[0];
      return idx >= 0 ? prev.map((s, i) => i === idx ? item : s) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(s => s.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={STORE_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Stock Item" : "Register Store Stock Item"} />

      <SectionHeader
        title="Central Store Materials & Consumables"
        subtitle="Diesel reserves, staff uniforms, camera batteries, SD storage media, and stationery supplies"
        badge="Supply Chain"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Stock Audit" />
            <BtnPrimary icon={<Plus size={13} />} label="Add Stock Item" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>SKU / Code</th>
                <th className={TH}>Material Item Description</th>
                <th className={TH}>Category</th>
                <th className={`${TH} text-right`}>Stock Quantity</th>
                <th className={`${TH} text-right`}>Reorder Threshold</th>
                <th className={TH}>Warehouse Location</th>
                <th className={TH}>Last Count</th>
                <th className={TH}>Inventory Health</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(s => {
                const ratio = s.qty / s.reorderLevel;
                const stockStatus = ratio === 0 ? "Out of Stock" : ratio < 1.2 ? "Low Stock" : "Adequate";

                return (
                  <tr key={s.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                    <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{s.id}</td>
                    <td className={`${TD} font-medium`}>{s.item}</td>
                    <td className={TD}>{s.category}</td>
                    <td className={`${TD} text-right font-mono font-semibold`}>{s.qty.toLocaleString()} {s.unit}</td>
                    <td className={`${TD} text-right font-mono text-muted-foreground`}>{s.reorderLevel} {s.unit}</td>
                    <td className={TD}>{s.location}</td>
                    <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{s.lastUpdated}</td>
                    <td className={TD}><Badge status={stockStatus} /></td>
                    <RowActions onEdit={() => openEdit(s)} onDelete={() => setDeleteId(s.id)} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="stock records" />
      </div>
    </div>
  );
}

// Maintenance Register
const MAINTENANCE_FIELDS: FieldDef[] = [
  { key: "id", label: "Job Ticket No.", type: "text" },
  { key: "asset", label: "Asset Name / Code", type: "text" },
  { key: "category", label: "Asset Category", type: "select", options: ["Vehicle", "Camera Trap", "Wireless", "IT Equipment", "Tourism Asset", "GPS Equipment", "Furniture"] },
  { key: "issue", label: "Fault Description", type: "textarea" },
  { key: "reportedBy", label: "Reported By", type: "text" },
  { key: "reportedDate", label: "Reported Date", type: "date" },
  { key: "technician", label: "Technician / Service Center", type: "text" },
  { key: "cost", label: "Invoice Cost (₹)", type: "number" },
  { key: "status", label: "Repair Status", type: "select", options: ["Pending", "In Progress", "Completed"] },
];

function MaintenanceRegister() {
  const [items, setItems] = useState(() => [...MAINTENANCE_REGISTER]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(m => filterStatus === "All" || m.status === filterStatus);
  const totalCost = items.filter(m => m.status === "Completed").reduce((sum, m) => sum + m.cost, 0);

  function openCreate() {
    setEditItem({ id: `MNT-2026-0${items.length + 220}`, asset: "", category: "Vehicle", issue: "", reportedBy: "Field Team", reportedDate: "2026-08-21", completedDate: "—", status: "Pending", cost: 0, technician: "" });
    setFormOpen(true);
  }
  function openEdit(m: typeof MAINTENANCE_REGISTER[0]) { setEditItem({ ...m }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const idx = prev.findIndex(m => m.id === data.id);
      const item = { ...data, cost: Number(data.cost) } as typeof MAINTENANCE_REGISTER[0];
      return idx >= 0 ? prev.map((m, i) => i === idx ? item : m) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(m => m.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={MAINTENANCE_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Job Ticket" : "Log Maintenance Work Order"} />

      <SectionHeader
        title="Asset Maintenance Register"
        subtitle={`Scheduled preventive maintenance, emergency repairs, and vendor invoices · Total Completed: ₹${totalCost.toLocaleString()}`}
        badge="Asset Service"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Service Records" />
            <BtnPrimary icon={<Plus size={13} />} label="Log Work Order" onClick={openCreate} />
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MiniStat label="Total Tickets" value={String(items.length)} />
        <MiniStat label="Completed Repairs" value={String(items.filter(m => m.status === "Completed").length)} colorClass="text-emerald-700" />
        <MiniStat label="Under Service" value={String(items.filter(m => m.status === "In Progress").length)} colorClass="text-blue-700" />
        <MiniStat label="Awaiting Dispatch" value={String(items.filter(m => m.status === "Pending").length)} colorClass="text-amber-700" />
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Job Order</th>
                <th className={TH}>Target Equipment</th>
                <th className={TH}>Category</th>
                <th className={TH}>Reported Defect</th>
                <th className={TH}>Reported By</th>
                <th className={TH}>Reported Date</th>
                <th className={TH}>Assigned Workshop</th>
                <th className={`${TH} text-right`}>Service Cost</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{m.id}</td>
                  <td className={`${TD} font-medium`}>{m.asset}</td>
                  <td className={TD}>{m.category}</td>
                  <td className={`${TD} max-w-xs text-xs truncate`}>{m.issue}</td>
                  <td className={TD}>{m.reportedBy}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{m.reportedDate}</td>
                  <td className={`${TD} text-muted-foreground`}>{m.technician}</td>
                  <td className={`${TD} text-right font-mono font-semibold`}>{m.cost > 0 ? `₹${m.cost.toLocaleString()}` : "—"}</td>
                  <td className={TD}><Badge status={m.status} /></td>
                  <RowActions onEdit={() => openEdit(m)} onDelete={() => setDeleteId(m.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="maintenance orders" />
      </div>
    </div>
  );
}

// Custody / Inventory Transfers
const DIVISIONS = ["Headquarters", "Nagarahole Core", "Hunsur Range", "Kakanakote Range", "Veeranahosahalli", "Antharasante", "Taraka Range"];

const INVENTORY_TRANSFER_FIELDS: FieldDef[] = [
  { key: "id", label: "Transfer Ref No.", type: "text" },
  { key: "assetId", label: "Asset Tag", type: "text" },
  { key: "category", label: "Asset Category", type: "select", options: ["GPS Equipment", "Wireless Equipment", "Camp Equipment", "Camera Trap", "Computer & Laptop", "Vehicle"] },
  { key: "description", label: "Item Description", type: "text" },
  { key: "fromDivision", label: "Originating Range / Unit", type: "select", options: DIVISIONS },
  { key: "toDivision", label: "Destination Range / Unit", type: "select", options: DIVISIONS },
  { key: "quantity", label: "Quantity", type: "number" },
  { key: "requestedBy", label: "Requesting Officer", type: "text" },
  { key: "requestDate", label: "Requisition Date", type: "date" },
  { key: "approvedBy", label: "Approving Authority", type: "text" },
  { key: "status", label: "Transfer Status", type: "select", options: ["Requested", "Approved", "In Transit", "Received"] },
  { key: "remarks", label: "Custody Notes", type: "textarea" },
];

function InventoryTransfer() {
  const [items, setItems] = useState(() => [...INVENTORY_TRANSFERS]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(t => {
    const q = search.toLowerCase();
    return t.id.toLowerCase().includes(q) || t.assetId.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.fromDivision.toLowerCase().includes(q) || t.toDivision.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `TRF-2026-00${items.length + 42}`, assetId: "GPS-NH-01", category: "GPS Equipment", description: "Garmin GPSMAP 66i", fromDivision: "Headquarters", toDivision: "Hunsur Range", quantity: 1, requestedBy: "Range Officer", requestDate: "2026-08-21", approvedBy: "—", status: "Requested", remarks: "" });
    setFormOpen(true);
  }
  function openEdit(item: typeof INVENTORY_TRANSFERS[0]) { setEditItem({ ...item }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const item = { ...data, quantity: Number(data.quantity) } as typeof INVENTORY_TRANSFERS[0];
      const index = prev.findIndex(t => t.id === data.id);
      return index >= 0 ? prev.map((t, i) => i === index ? item : t) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(t => t.id !== id)); }

  function advanceTransfer(id: string) {
    const nextStatus: Record<string, string> = { Requested: "Approved", Approved: "In Transit", "In Transit": "Received" };
    setItems(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next = nextStatus[t.status] ?? t.status;
      return { ...t, status: next, approvedBy: next === "Approved" ? "Dr. Arjun Kulkarni" : t.approvedBy };
    }));
  }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={INVENTORY_TRANSFER_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit Requisition" : "Initiate Inter-Range Transfer"} />

      <SectionHeader
        title="Inter-Range Inventory Custody Transfers"
        subtitle="Permanent and temporary asset allocations between Headquarters, core beats, and peripheral divisions"
        badge="Asset Movement"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Waybills" />
            <BtnPrimary icon={<Plus size={13} />} label="Transfer Request" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Transfer Ref</th>
                <th className={TH}>Asset Tag</th>
                <th className={TH}>Category</th>
                <th className={TH}>Item Description</th>
                <th className={TH}>Source Division</th>
                <th className={TH}>Destination Range</th>
                <th className={`${TH} text-center`}>Qty</th>
                <th className={TH}>Requisition By</th>
                <th className={TH}>Authorized By</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{t.id}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px] text-[#174B3A]`}>{t.assetId}</td>
                  <td className={TD}>{t.category}</td>
                  <td className={`${TD} font-medium`}>{t.description}</td>
                  <td className={`${TD} text-muted-foreground`}>{t.fromDivision}</td>
                  <td className={`${TD} font-medium text-foreground`}>{t.toDivision}</td>
                  <td className={`${TD} text-center font-mono font-medium`}>{t.quantity}</td>
                  <td className={`${TD} text-muted-foreground`}>{t.requestedBy}</td>
                  <td className={TD}>{t.approvedBy}</td>
                  <td className={TD}>
                    <div className="flex items-center gap-2">
                      <Badge status={t.status} />
                      {t.status !== "Received" && (
                        <button
                          onClick={() => advanceTransfer(t.id)}
                          className="text-[10px] px-1.5 py-0.5 rounded border border-border hover:bg-[#F7F9F7] text-foreground font-medium"
                          title="Advance Status"
                        >
                          Advance →
                        </button>
                      )}
                    </div>
                  </td>
                  <RowActions onEdit={() => openEdit(t)} onDelete={() => setDeleteId(t.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="custody transfers" />
      </div>
    </div>
  );
}

// User Management
const USER_FIELDS: FieldDef[] = [
  { key: "id", label: "User ID", type: "text" },
  { key: "employeeId", label: "Staff ID", type: "text" },
  { key: "name", label: "Full Name", type: "text" },
  { key: "username", label: "Login Username", type: "text" },
  { key: "email", label: "Official Email", type: "text" },
  { key: "mobile", label: "Official Phone", type: "text" },
  { key: "role", label: "RBAC Role", type: "select", options: ["Administrator", "Field Director", "Deputy Director", "DFO", "Range Officer", "Staff"] },
  { key: "division", label: "Administrative Division", type: "select", options: DIVISIONS },
  { key: "status", label: "Access State", type: "select", options: ["Active", "Inactive"] },
];

function UserManagement() {
  const [items, setItems] = useState(() => [...PORTAL_USERS]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, string | number> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(u => {
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  function openCreate() {
    setEditItem({ id: `USR-00${items.length + 1}`, employeeId: `NSTR-0${items.length + 100}`, name: "", username: "", email: "", mobile: "", role: "Staff", division: "Headquarters", status: "Active", lastLogin: "—", tempPassword: "" });
    setFormOpen(true);
  }
  function openEdit(item: typeof PORTAL_USERS[0]) { setEditItem({ ...item }); setFormOpen(true); }
  function handleSave(data: Record<string, string | number>) {
    setItems(prev => {
      const item = data as typeof PORTAL_USERS[0];
      const index = prev.findIndex(u => u.id === data.id);
      return index >= 0 ? prev.map((u, i) => i === index ? item : u) : [...prev, item];
    });
  }
  function handleDelete(id: string) { setItems(prev => prev.filter(u => u.id !== id)); }

  return (
    <div className="space-y-4">
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId!)} itemName={deleteId ?? ""} />
      <InvFormModal key={JSON.stringify(editItem)} open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} fields={USER_FIELDS} initialValues={editItem ?? {}} title={editItem?.id ? "Edit User Profile" : "Create Officer Account"} />

      <SectionHeader
        title="User Access & RBAC Administration"
        subtitle="Role-based permissions, credentials policy, multi-factor tokens, and access logs"
        badge="Security & Access"
        actions={
          <>
            <BtnSecondary icon={<Download size={13} />} label="Export Security Audit" />
            <BtnPrimary icon={<Plus size={13} />} label="New User Account" onClick={openCreate} />
          </>
        }
      />

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>User ID</th>
                <th className={TH}>Officer Name</th>
                <th className={TH}>Username</th>
                <th className={TH}>Official Email</th>
                <th className={TH}>RBAC Role</th>
                <th className={TH}>Division</th>
                <th className={TH}>Last Active Session</th>
                <th className={TH}>Status</th>
                <th className={`${TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[#F7F9F7]/70 transition-colors">
                  <td className={`${TD} font-semibold text-[#174B3A] font-mono`}>{u.id}</td>
                  <td className={`${TD} font-medium`}>{u.name}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px] text-muted-foreground`}>{u.username}</td>
                  <td className={`${TD} text-muted-foreground`}>{u.email}</td>
                  <td className={TD}>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF3EE] text-[#174B3A] border border-[#C8DDD0]">
                      {u.role}
                    </span>
                  </td>
                  <td className={TD}>{u.division}</td>
                  <td className={`${TD} font-mono text-xs sm:text-[13px]`}>{u.lastLogin}</td>
                  <td className={TD}><Badge status={u.status} /></td>
                  <RowActions onEdit={() => openEdit(u)} onDelete={() => setDeleteId(u.id)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableFooter shown={filtered.length} total={items.length} label="user accounts" />
      </div>
    </div>
  );
}

// ─── Content Router ───────────────────────────────────────────────────────────

function ContentRouter({ view }: { view: string }) {
  switch (view) {
    case "overview":
      return <OverviewSection />;
    case "dash-admin":
      return (
        <AdminDashboard
          monthlyWildlifeData={monthlyWildlifeData}
          revenueData={revenueData}
          speciesDistribution={speciesDistribution}
        />
      );
    case "dash-field":
      return <ModulePlaceholder title="Field Director Command View" description="Reserve-wide high-level operational command and strategic oversight" icon={<LayoutDashboard size={24} />} />;
    case "dash-deputy":
      return <ModulePlaceholder title="Deputy Director Dashboard" description="Division-level operations, HR approvals, and inventory custodianship" icon={<LayoutDashboard size={24} />} />;
    case "dash-dfo":
      return <ModulePlaceholder title="DFO Range Dashboard" description="Range-level daily operations, wildlife patrol logs, and revenue summary" icon={<LayoutDashboard size={24} />} />;
    case "dash-range":
      return <ModulePlaceholder title="Range Officer Beat Dashboard" description="Beat-level field data entry, camera trap logs, and sighting reports" icon={<LayoutDashboard size={24} />} />;
    case "dash-staff":
      return <ModulePlaceholder title="Staff Personal Dashboard" description="Personal attendance history, duty schedule assignments, and leave balances" icon={<LayoutDashboard size={24} />} />;

    // Inventory Assets
    case "inv-vehicles":
      return <VehicleInventory />;
    case "inv-cameras":
      return <CameraTrapInventory />;
    case "inv-gps":
      return <GPSInventory />;
    case "inv-wireless":
      return <WirelessInventory />;
    case "inv-computers":
      return <ComputerInventory />;
    case "inv-furniture":
      return <FurnitureInventory />;
    case "inv-camp":
      return <CampEquipmentInventory />;
    case "inv-tourism":
      return <TourismAssetsInventory />;
    case "inv-store":
      return <StoreMaterialsInventory />;
    case "inv-maintenance":
      return <MaintenanceRegister />;
    case "inv-transfer":
      return <InventoryTransfer />;

    // Human Resources
    case "hr-employees":
      return <EmployeeDatabase />;
    case "hr-attendance":
      return <ModulePlaceholder title="Biometric Attendance Management" description="Real-time biometric sync across all 7 range checkpoints" icon={<Clock size={24} />} />;
    case "hr-leave":
      return <ModulePlaceholder title="Leave Approval System" description="Officer leave applications, casual leave credits, and relief arrangements" icon={<Calendar size={24} />} />;
    case "hr-duty":
      return <ModulePlaceholder title="Duty & Beat Allocation Scheduler" description="Automated weekly patrol assignments and anti-poaching camp rosters" icon={<ClipboardList size={24} />} />;
    case "hr-transfer":
      return <ModulePlaceholder title="Cadre Posting & Transfer Records" description="Official posting orders, tenure tracking, and inter-range transfer histories" icon={<ArrowRightLeft size={24} />} />;
    case "hr-users":
      return <UserManagement />;

    // Tourism
    case "tour-safari":
      return <SafariBookings />;
    case "tour-rooms":
      return <ModulePlaceholder title="Forest Rest House Bookings" description="Accommodation reservations for Nagarahole, Kabini, and Kakanakote FRHs" icon={<Archive size={24} />} />;
    case "tour-visitors":
      return <ModulePlaceholder title="Tourist Master Database" description="Verified visitor registry, nationality records, and vehicle gate clearances" icon={<Users size={24} />} />;
    case "tour-revenue":
      return <ModulePlaceholder title="Consolidated Tourism Revenue" description="Automated financial rollups, GST calculations, and payment gateway receipts" icon={<DollarSign size={24} />} />;
    case "tour-feedback":
      return <ModulePlaceholder title="Tourist Feedback & Rating System" description="Visitor satisfaction surveys, guide ratings, and eco-tourism feedback" icon={<MessageSquare size={24} />} />;

    // Wildlife & Patrols
    case "wl-cameras":
      return <CameraTrapMonitoring />;
    case "wl-sightings":
      return <SightingRegister />;
    case "wl-patrol":
      return <PatrolMonitoring />;
    case "wl-antipoach":
      return <AntiPoachingRecords />;
    case "wl-gis":
      return <GISIntegration />;

    // Reports & Analytics
    case "rep-graphical":
      return <GraphicalReports />;
    case "rep-daily":
      return <ModulePlaceholder title="Daily Operations Summary" description="Consolidated daily incident, sighting, and attendance rollup for NTCA" icon={<FileText size={24} />} />;
    case "rep-monthly":
      return <ModulePlaceholder title="Monthly Performance Review" description="Comprehensive divisional progress reports, budget tracking, and patrols" icon={<FileText size={24} />} />;
    case "rep-annual":
      return <ModulePlaceholder title="Annual Tiger Reserve Management Report" description="Year-end ecological and administrative compendium for Ministry of Environment" icon={<FileText size={24} />} />;
    case "rep-mis":
      return <ModulePlaceholder title="Executive MIS Analytics" description="High-level KPI executive scorecard and automated alert threshold trackers" icon={<BarChart3 size={24} />} />;

    default:
      return (
        <AdminDashboard
          monthlyWildlifeData={monthlyWildlifeData}
          revenueData={revenueData}
          speciesDistribution={speciesDistribution}
        />
      );
  }
}

// ─── Main Application Root ────────────────────────────────────────────────────

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("dash-admin");
  const [userRole, setUserRole] = useState("Administrator");
  const [userName, setUserName] = useState("Dr. Arjun Kulkarni");
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function handleLogin(role: string, name: string) {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserName("");
    setActiveView("dash-admin");
  }

  // Keyboard shortcut listener (Cmd+K / Ctrl+K for search, Cmd+B / Ctrl+B for sidebar toggle)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCollapsed(prev => !prev);
      }
      if (e.key === "Escape") {
        setSearchModalOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const currentSection = NAV.find(n => n.children.some(c => c.id === activeView));
  const currentChild = currentSection?.children.find(c => c.id === activeView);
  const breadcrumb = [currentSection?.label, currentChild?.label].filter(Boolean).join(" › ");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white text-foreground font-sans">
      {/* Global Shortcut Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-100"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white border border-border rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3 border-b border-border gap-2.5">
              <Search size={16} className="text-muted-foreground" />
              <input
                autoFocus
                value={globalSearchQuery}
                onChange={e => setGlobalSearchQuery(e.target.value)}
                placeholder="Search anything across modules, assets, or personnel…"
                className="w-full text-xs bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F7F9F7] border border-border text-muted-foreground">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              <span className="text-[10px] font-semibold text-muted-foreground px-2 py-1 block uppercase tracking-wider">
                Quick Navigation
              </span>
              <div className="space-y-0.5">
                {NAV.flatMap(s => s.children)
                  .filter(c => c.label.toLowerCase().includes(globalSearchQuery.toLowerCase()))
                  .map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveView(c.id);
                        setSearchModalOpen(false);
                      }}
                      className="w-full flex items-center justify-between text-left px-2.5 py-2 text-xs rounded-lg hover:bg-[#F7F9F7] text-foreground transition-colors cursor-pointer"
                    >
                      <span>{c.label}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">Jump →</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Top Header matching reference image */}
      <TopHeader
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSearchClick={() => setSearchModalOpen(true)}
        unreadCount={3}
        userName={userName}
        userRole={userRole}
        onLogout={handleLogout}
      />

      {/* Main Workspace Frame (Sidebar + Body Canvas) */}
      <div className="flex flex-1 min-w-0 overflow-hidden bg-[#F2F4F7]">
        <Sidebar
          navSections={NAV}
          activeView={activeView}
          setActiveView={setActiveView}
          userName={userName}
          userRole={userRole}
          onLogout={handleLogout}
          paneCollapsed={sidebarCollapsed}
          onTogglePane={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Workspace Content (Full width on soft neutral canvas) */}
        <main
          className="flex-1 overflow-y-auto px-6 py-6 bg-[#F2F4F7] w-full"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="w-full">
            <ContentRouter view={activeView} />
          </div>
        </main>
      </div>
    </div>
  );
}
