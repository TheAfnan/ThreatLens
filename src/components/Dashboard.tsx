import React from 'react';
import { 
  Shield, 
  Flame, 
  Search, 
  FileText, 
  Activity, 
  TrendingUp, 
  Smartphone,
  Frown
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
  Cell
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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  
  const totalAnalyzed = 15;
  const criticalCount = 12;
  const highCount = 4;
  const threatsDetected = 82; 
  
  const trendData = [
    { name: 'Wed', Score: 20 },
    { name: 'Thu', Score: 40 },
    { name: 'Evib', Score: 45 },
    { name: 'Fri', Score: 40 },
    { name: 'Sat', Score: 50 },
    { name: 'Jast', Score: 80 },
    { name: 'Mon', Score: 40 },
    { name: 'Nov', Score: 100 },
  ];

  const malwareFamilyDistribution = [
    { name: 'Malware', Count: 65, fill: '#3b82f6' },
    { name: 'Basu', Count: 48, fill: '#ea580c' },
    { name: 'Malwar...', Count: 42, fill: '#0d9488' },
    { name: 'Bires', Count: 33, fill: '#a855f7' },
    { name: 'Flot', Count: 30, fill: '#9333ea' },
    { name: 'Rinawa', Count: 25, fill: '#0ea5e9' },
    { name: 'Frsm...', Count: 20, fill: '#ea580c' },
    { name: 'Llewo', Count: 15, fill: '#64748b' },
    { name: 'Others', Count: 10, fill: '#0d9488' }
  ];

  const categoryData = [
    { name: 'Fraud Attack Vectors', value: 127, color: '#3b82f6' },
    { name: 'Robust Vectors', value: 123, color: '#f59e0b' },
    { name: 'Data Vectors', value: 137, color: '#0d9488' },
    { name: 'Fraud Attack Vectors', value: 187, color: '#cbd5e1' }
  ];
  
  const gaugeData = [
    { name: 'Low', value: 33, color: '#ef4444' }, 
    { name: 'Med', value: 33, color: '#f59e0b' },
    { name: 'High', value: 34, color: '#22c55e' }
  ];

  const customTooltipStyle = {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    color: '#f8fafc',
    backdropFilter: 'blur(24px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)',
    padding: '12px 16px',
    fontSize: '13px',
    fontWeight: 'bold'
  };

  return (
    <div className="space-y-6 font-sans text-slate-800" id="operations-dashboard">
      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="dashboard-kpi-grid">
        {/* KPI 1 */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md flex items-center space-x-6 hover-lift cursor-default">
          <div className="h-16 w-16 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center flex-shrink-0 shadow-glass transition-transform duration-300 hover:scale-110 hover:rotate-3">
            <Shield className="h-8 w-8 text-[#0f357e]" />
          </div>
          <div className="space-y-0.5">
            {isLoading ? (
              <div className="h-8 w-16 bg-slate-200/50 rounded-lg animate-pulse mb-1"></div>
            ) : (
              <div className="text-[32px] font-black tracking-tight leading-none text-gradient drop-shadow-sm">{totalAnalyzed}</div>
            )}
            <div className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Total Risk KPI</div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md flex items-center space-x-6 hover-lift cursor-default">
          <div className="h-16 w-16 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center flex-shrink-0 shadow-glass transition-transform duration-300 hover:scale-110 hover:-rotate-3">
            <Frown className="h-8 w-8 text-red-600" />
          </div>
          <div className="space-y-0.5">
            {isLoading ? (
              <div className="h-8 w-16 bg-slate-200/50 rounded-lg animate-pulse mb-1"></div>
            ) : (
              <div className="text-[32px] font-black tracking-tight leading-none text-gradient drop-shadow-sm">{criticalCount}</div>
            )}
            <div className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Malware Factors</div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md flex items-center space-x-6 hover-lift cursor-default">
          <div className="h-16 w-16 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center flex-shrink-0 shadow-glass transition-transform duration-300 hover:scale-110 hover:rotate-3">
            <Flame className="h-8 w-8 text-orange-600" />
          </div>
          <div className="space-y-0.5">
            {isLoading ? (
              <div className="h-8 w-16 bg-slate-200/50 rounded-lg animate-pulse mb-1"></div>
            ) : (
              <div className="text-[32px] font-black tracking-tight leading-none text-gradient drop-shadow-sm">{highCount}</div>
            )}
            <div className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Fraud Relators</div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md flex items-center space-x-6 hover-lift cursor-default">
          <div className="h-16 w-16 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center flex-shrink-0 shadow-glass transition-transform duration-300 hover:scale-110 hover:-rotate-3">
            <Flame className="h-8 w-8 text-amber-500" />
          </div>
          <div className="space-y-0.5">
            {isLoading ? (
              <div className="h-8 w-16 bg-slate-200/50 rounded-lg animate-pulse mb-1"></div>
            ) : (
              <div className="text-[32px] font-black tracking-tight leading-none text-gradient drop-shadow-sm">{threatsDetected}</div>
            )}
            <div className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Attack Vectors</div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dashboard-charts">
        {/* Gauge Chart (Span 3) */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md lg:col-span-3 flex flex-col items-center hover-lift cursor-default">
          <h3 className="text-[15px] font-extrabold text-slate-800 w-full mb-6 tracking-wide">Avg Risk Score</h3>
          <div className="h-40 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {gaugeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Needle */}
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-white/60 bg-white/30 backdrop-blur-md z-10 shadow-glass"></div>
            <div className="absolute top-[80%] left-1/2 -translate-y-1/2 w-[60px] h-1.5 bg-white/40 backdrop-blur-md origin-left -rotate-45 rounded-full shadow-glass border border-white/30"></div>
          </div>
          <button
            onClick={onNavigateToUpload}
            className="mt-6 w-[80%] py-3 bg-white/20 backdrop-blur-xl hover:bg-white/40 text-[#0F357E] border border-white/50 shadow-glass text-[13px] font-extrabold rounded-xl transition-all duration-300 hover:scale-105"
          >
            Analyze New APK
          </button>
        </div>

        {/* Risk Trend (Area Chart) (Span 6) */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md lg:col-span-6 hover-lift cursor-default">
          <h3 className="text-[15px] font-extrabold text-slate-800 mb-6 tracking-wide">Malware Risk Profile Trend</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickCount={6} />
                <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#334155' }} />
                <Area type="monotone" dataKey="Score" stroke="#0f357e" strokeWidth={3} fillOpacity={1} fill="rgba(15,53,126,0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud Attack Vectors (Pie Chart) (Span 3) */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md lg:col-span-3 hover-lift cursor-default">
          <h3 className="text-[15px] font-extrabold text-slate-800 mb-6 tracking-wide">Attack Vectors</h3>
          <div className="flex flex-col items-center">
            <div className="h-32 w-32 relative mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#334155' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-[22px] font-black text-slate-800 leading-none">12</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-1">Total Threats</div>
              </div>
            </div>
            
            <div className="w-full space-y-3">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <span className="h-3 w-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: cat.color }} />
                  <div className="flex-grow min-w-0">
                    <div className="text-[12px] font-bold text-slate-700 truncate leading-tight">{cat.name}</div>
                    <div className="text-[10px] text-slate-500">{cat.value} attack vectors</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Malware Families Distribution (Bar Chart) */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md lg:col-span-6 hover-lift cursor-default">
          <h3 className="text-[15px] font-extrabold text-slate-800 mb-8 tracking-wide">Malware Family Matches</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={malwareFamilyDistribution} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickCount={5} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={customTooltipStyle} itemStyle={{ color: '#334155' }}/>
                <Bar dataKey="Count" barSize={24} radius={[4, 4, 0, 0]}>
                  {malwareFamilyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Security Incidents / Uploads */}
        <div className="bg-glass p-6 rounded-2xl border border-glass shadow-glass backdrop-blur-md lg:col-span-6 hover-lift cursor-default">
          <h3 className="text-[15px] font-extrabold text-slate-800 mb-6 tracking-wide">Recent Analyzed APKs</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/30 text-slate-600 text-[12px]">
                  <th className="pb-3 font-bold">APK Name</th>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold">Last Update</th>
                  <th className="pb-3 font-bold">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-white/20 transition-colors">
                    <td className="py-4">
                      <div className="text-[13px] text-slate-800 font-medium truncate max-w-[200px]">Application-10043000.apk{idx + 1}</div>
                    </td>
                    <td className="py-4 text-[13px] text-slate-500">{idx % 2 === 0 ? '01/06/2023' : '23/05/2023'}</td>
                    <td className="py-4 text-[13px] text-slate-500">{'01/02/2022'}</td>
                    <td className="py-4 text-[13px] text-slate-500">{'162,363 KB'}</td>
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
