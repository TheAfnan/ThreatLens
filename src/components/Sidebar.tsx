import React from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  FileCode, 
  Smartphone, 
  Network, 
  GitBranch, 
  Sparkles, 
  ShieldAlert, 
  History, 
  Settings, 
  FileCheck,
  LogOut,
  Building2,
  Lock
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userEmail: string;
}

export default function Sidebar({ 
  currentView, 
  onNavigate, 
  onLogout,
  userEmail 
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'Security Dashboard', icon: LayoutDashboard },
    { id: 'analyze', label: 'APK Analysis Pipeline', icon: Upload },
    { id: 'static', label: 'Static Manifest Audit', icon: FileCode },
    { id: 'dynamic', label: 'Dynamic Sandbox Run', icon: Smartphone },
    { id: 'intel', label: 'Threat Intelligence Feeds', icon: Network },
    { id: 'fraud', label: 'Banking Fraud Mapping', icon: GitBranch },
    { id: 'investigate', label: 'Gemini Forensics', icon: Sparkles },
    { id: 'risk', label: 'Vulnerability Index', icon: ShieldAlert },
    { id: 'reports', label: 'Executive Dossier', icon: FileCheck },
    { id: 'history', label: 'Assessment History', icon: History },
    { id: 'settings', label: 'System Configuration', icon: Settings },
  ];

  // Try to parse bank association from user email or default to SBI
  const getBankAssociation = (email: string) => {
    if (email.toLowerCase().includes('sbi')) return 'State Bank of India';
    if (email.toLowerCase().includes('hdfc')) return 'HDFC Bank Ltd';
    if (email.toLowerCase().includes('icici')) return 'ICICI Bank Corp';
    if (email.toLowerCase().includes('boi')) return 'Bank of India';
    return 'SBI Security Ops';
  };

  const bankName = getBankAssociation(userEmail);

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-slate-800 text-slate-300 flex flex-col justify-between h-screen sticky top-0 font-sans flex-shrink-0" id="enterprise-sidebar">
      <div className="flex flex-col overflow-y-auto">
        {/* Brand Logo Header */}
        <div className="p-5 border-b border-slate-800 flex items-center space-x-3.5">
          <div className="p-2 bg-[#2563EB] text-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wider text-white uppercase leading-none">ThreatLens AI</h1>
            <span className="text-[10px] font-mono text-slate-500 block mt-1 tracking-widest font-extrabold">SECURE COMPILER</span>
          </div>
        </div>

        {/* Bank Context Tag */}
        <div className="px-5 py-3.5 bg-slate-900/50 flex items-center space-x-2 border-b border-slate-800/40">
          <Building2 className="h-4 w-4 text-[#2563EB] flex-shrink-0" />
          <span className="text-xs font-bold text-slate-400 truncate tracking-wide">{bankName}</span>
        </div>

        {/* Menu Navigation */}
        <nav className="p-4 space-y-1.5 flex-grow">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#2563EB] text-white shadow-md font-extrabold' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <IconComponent className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-slate-800 space-y-3.5">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-[#2563EB] border border-slate-700 uppercase flex-shrink-0">
            {userEmail.substring(0, 2)}
          </div>
          <div className="min-w-0 flex-grow">
            <div className="text-xs font-extrabold text-white truncate">{userEmail}</div>
            <div className="text-[9px] font-mono text-slate-500 uppercase font-black">CISO Administrator</div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full py-2 bg-slate-800/50 hover:bg-[#DC2626] hover:text-white border border-slate-700 hover:border-[#DC2626] rounded-lg text-xs font-bold uppercase tracking-widest text-slate-400 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Exit System</span>
        </button>
      </div>
    </aside>
  );
}
