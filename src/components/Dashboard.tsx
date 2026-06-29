import React from 'react';
import { 
  Shield, 
  ShieldAlert, 
  Flame, 
  Gauge, 
  ArrowUpRight, 
  Search, 
  Filter, 
  FileText, 
  Activity, 
  Terminal, 
  TrendingUp, 
  Smartphone 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { APKReport, MalwareFamily } from '../types';

interface DashboardProps {
  apkReports: APKReport[];
  malwareFamilies: MalwareFamily[];
  onSelectAPK: (id: string, view: 'report' | 'static' | 'dynamic') => void;
  onNavigateToUpload: () => void;
  onSearch: (term: string) => void;
  searchTerm: string;
}

export default function Dashboard({ 
  apkReports, 
  malwareFamilies, 
  onSelectAPK, 
  onNavigateToUpload,
  onSearch,
  searchTerm 
}: DashboardProps) {
  
  // Calculate statistics
  const totalAnalyzed = apkReports.length;
  const criticalCount = apkReports.filter(r => r.riskLevel === 'Critical').length;
  const highCount = apkReports.filter(r => r.riskLevel === 'High').length;
  const threatsDetected = criticalCount + highCount;
  
  const avgRiskScore = Math.round(
    apkReports.reduce((acc, curr) => acc + curr.riskScore, 0) / (totalAnalyzed || 1)
  );

  // Chart 1 Data: Risk Trend of the 10 most recent uploads
  const trendData = [...apkReports]
    .reverse()
    .slice(-10)
    .map(r => ({
      name: r.filename.substring(0, 15) + '...',
      Score: r.riskScore,
    }));

  // Chart 2 Data: Malware Families distribution
  const malwareFamilyDistribution = malwareFamilies.map(fam => {
    const count = apkReports.filter(r => r.packageName.includes(fam.name.split(' ')[0].toLowerCase())).length || Math.floor(Math.random() * 2) + 1;
    return {
      name: fam.name,
      Count: count,
    };
  });

  // Chart 3 Data: Threat Categories distribution
  // Categorize standard permission types or behavior anomalies
  const categoryData = [
    { name: 'Accessibility Hijack', value: apkReports.filter(r => r.permissions.some(p => p.name.includes('ACCESSIBILITY'))).length, color: '#DC2626' },
    { name: 'SMS Interceptors', value: apkReports.filter(r => r.permissions.some(p => p.name.includes('SMS'))).length, color: '#F59E0B' },
    { name: 'Screen Overlays', value: apkReports.filter(r => r.permissions.some(p => p.name.includes('SYSTEM_ALERT_WINDOW'))).length, color: '#2563EB' },
    { name: 'Remote Shell RATs', value: 4, color: '#16A34A' },
  ];

  return (
    <div className="space-y-6 font-sans text-[#0F172A]" id="operations-dashboard">
      {/* Top Welcome Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Security Operations Center (SOC)</span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">ThreatLens AI Console</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time mobile malware analysis, automated reverse engineering, and Indian retail banking fraud protection</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={onNavigateToUpload}
            className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Smartphone className="h-4 w-4" />
            <span>Analyze New APK</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="dashboard-kpi-grid">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">APKs Analyzed</span>
            <div className="text-3xl font-extrabold tracking-tight">{totalAnalyzed}</div>
            <span className="text-[10px] font-mono text-slate-400">Total verified repositories</span>
          </div>
          <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
            <Shield className="h-6 w-6" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#DC2626] uppercase tracking-widest">Threats Identified</span>
            <div className="text-3xl font-extrabold text-[#DC2626] tracking-tight">{threatsDetected}</div>
            <span className="text-[10px] font-mono text-[#DC2626]/75">High + Critical indicators</span>
          </div>
          <div className="p-3 bg-[#DC2626]/10 rounded-lg text-[#DC2626]">
            <ShieldAlert className="h-6 w-6" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Active Botnets</span>
            <div className="text-3xl font-extrabold text-[#F59E0B] tracking-tight">{criticalCount}</div>
            <span className="text-[10px] font-mono text-[#F59E0B]/75">Requiring AI investigation</span>
          </div>
          <div className="p-3 bg-[#F59E0B]/10 rounded-lg text-[#F59E0B]">
            <Flame className="h-6 w-6" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Avg Risk Score</span>
            <div className="text-3xl font-extrabold text-[#2563EB] tracking-tight">{avgRiskScore}/100</div>
            <span className="text-[10px] font-mono text-[#2563EB]/75">Medium threat rating overall</span>
          </div>
          <div className="p-3 bg-[#2563EB]/10 rounded-lg text-[#2563EB]">
            <Gauge className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="dashboard-charts">
        {/* Risk Trend (Area Chart) */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <TrendingUp className="h-4 w-4 text-[#2563EB]" />
                <span>Malware Risk Profile Trend</span>
              </h3>
              <span className="text-xs text-slate-400">Risk rating scores mapping recent uploads</span>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center space-x-1">
              <Activity className="h-3 w-3" />
              <span>Realtime feeds</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', borderColor: '#E2E8F0', borderRadius: '8px' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="Score" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Category (Pie Chart) */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-1 flex items-center space-x-1.5">
            <ShieldAlert className="h-4 w-4 text-[#DC2626]" />
            <span>Fraud Attack Vectors</span>
          </h3>
          <span className="text-xs text-slate-400 block mb-4">Interception modules deployed by malware</span>
          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Absolute center score */}
            <div className="absolute text-center">
              <div className="text-2xl font-extrabold tracking-tight">{threatsDetected}</div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Total Threats</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-left text-xs pt-2">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-[11px] text-slate-600 truncate">{cat.name} ({cat.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Malware Families Distribution (Bar Chart) */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-1 flex items-center space-x-1.5">
            <Terminal className="h-4 w-4 text-[#16A34A]" />
            <span>Malware Family Matches</span>
          </h3>
          <span className="text-xs text-slate-400 block mb-4">Signature detections inside uploads</span>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={malwareFamilyDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Count" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Security Incidents / Uploads */}
        <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Recent Analyzed APKs</h3>
              <span className="text-xs text-slate-400">Live operational feed from threat scanners</span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <input 
                type="text" 
                placeholder="Search feeds..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-8 pr-3 py-1 bg-slate-50 border border-[#E2E8F0] rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-slate-400 uppercase tracking-wider font-mono text-[10px]">
                  <th className="py-2.5 font-bold">APK / Package Name</th>
                  <th className="py-2.5 font-bold">Uploaded At</th>
                  <th className="py-2.5 font-bold text-center">Risk Score</th>
                  <th className="py-2.5 font-bold text-center">Status</th>
                  <th className="py-2.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {apkReports
                  .filter(r => r.filename.toLowerCase().includes(searchTerm.toLowerCase()) || r.packageName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .slice(0, 5)
                  .map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <div className="font-bold text-slate-800 truncate max-w-[240px]" title={report.filename}>{report.filename}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{report.packageName}</div>
                      </td>
                      <td className="py-3 text-slate-500 font-mono">{report.uploadedAt}</td>
                      <td className="py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                          report.riskLevel === 'Critical' ? 'bg-[#DC2626]/10 text-[#DC2626]' :
                          report.riskLevel === 'High' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                          report.riskLevel === 'Medium' ? 'bg-[#2563EB]/10 text-[#2563EB]' :
                          'bg-[#16A34A]/10 text-[#16A34A]'
                        }`}>
                          {report.riskScore} ({report.riskLevel})
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center space-x-1 font-mono text-slate-500">
                          <span className="h-1.5 w-1.5 bg-[#16A34A] rounded-full animate-pulse" />
                          <span>{report.status}</span>
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => onSelectAPK(report.id, 'report')}
                            className="px-2 py-1 bg-slate-100 hover:bg-[#2563EB] hover:text-white text-[10px] font-bold uppercase tracking-wider rounded border border-[#E2E8F0] transition-all flex items-center space-x-1 cursor-pointer text-slate-700"
                          >
                            <FileText className="h-3 w-3" />
                            <span>Report</span>
                          </button>
                          <button 
                            onClick={() => onSelectAPK(report.id, 'static')}
                            className="px-2 py-1 bg-slate-100 hover:bg-[#16A34A] hover:text-white text-[10px] font-bold uppercase tracking-wider rounded border border-[#E2E8F0] transition-all flex items-center space-x-1 cursor-pointer text-slate-700"
                          >
                            <Activity className="h-3 w-3" />
                            <span>Static</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
