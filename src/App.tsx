import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  HelpCircle, 
  Globe, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  ShieldAlert, 
  Info,
  ChevronDown
} from 'lucide-react';

// Subcomponents imports
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import APKAnalysis from './components/APKAnalysis';
import StaticAnalysis from './components/StaticAnalysis';
import DynamicSandbox from './components/DynamicSandbox';
import ThreatIntel from './components/ThreatIntel';
import FraudMapping from './components/FraudMapping';
import AIInvestigation from './components/AIInvestigation';
import RiskReports from './components/RiskReports';
import ReportPage from './components/ReportPage';
import History from './components/History';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';

// Mock data and types imports
import { mockAPKReports, mockAIReports, mockMalwareFamilies } from './mockData';
import { APKReport } from './types';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

export default function App() {
  // Authentication State
  const [user, setUser] = useState<{ email: string } | null>(() => {
    const cached = localStorage.getItem('threatlens_user');
    return cached ? JSON.parse(cached) : null;
  });

  // Navigation and active item selection
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedAPKId, setSelectedAPKId] = useState<string | null>('apk-01'); // Default to SBI report

  // Shared Data collections
  const [apkReports, setApkReports] = useState<APKReport[]>(mockAPKReports);
  const [aiReports, setAiReports] = useState(mockAIReports);

  // Global search query
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [dashboardSearchTerm, setDashboardSearchTerm] = useState('');

  // Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const triggerToast = (title: string, message: string, type: 'info' | 'success' | 'warn' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const handleLogin = (email: string) => {
    const session = { email };
    setUser(session);
    localStorage.setItem('threatlens_user', JSON.stringify(session));
    triggerToast('Secure Connection Established', `Welcome back, CISO operator ${email}`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('threatlens_user');
    setCurrentView('dashboard');
    triggerToast('Session Terminated', 'Disconnected securely from ThreatLens AI compilers.', 'info');
  };

  const handleAddReport = (newReport: APKReport) => {
    setApkReports(prev => [newReport, ...prev]);
    setSelectedAPKId(newReport.id);
  };

  const handleDeleteReport = (id: string) => {
    setApkReports(prev => prev.filter(r => r.id !== id));
    if (selectedAPKId === id) {
      setSelectedAPKId(apkReports.length > 1 ? apkReports[0].id : null);
    }
  };

  // Safe view change handler keeping target selections
  const handleSelectAPKAndNavigate = (id: string, view: 'report' | 'static' | 'dynamic') => {
    setSelectedAPKId(id);
    if (view === 'report') setCurrentView('reports');
    else if (view === 'static') setCurrentView('static');
    else if (view === 'dynamic') setCurrentView('dynamic');
  };

  // Keyboard shortcut or global search submit
  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search filenames or package names
    const match = apkReports.find(
      r => r.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
           r.packageName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (match) {
      setSelectedAPKId(match.id);
      setCurrentView('reports');
      triggerToast('Record Found', `Redirected to security report of ${match.filename}`, 'success');
    } else {
      triggerToast('No Direct Match', `Searching threat feeds for '${searchQuery}'`, 'info');
      setCurrentView('intel');
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Render correct active content pane
  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            apkReports={apkReports}
            malwareFamilies={mockMalwareFamilies}
            onSelectAPK={handleSelectAPKAndNavigate}
            onNavigateToUpload={() => setCurrentView('analyze')}
            onSearch={setDashboardSearchTerm}
            searchTerm={dashboardSearchTerm}
          />
        );
      case 'analyze':
        return (
          <APKAnalysis 
            apkReports={apkReports}
            onAddReport={handleAddReport}
            onSelectAPK={handleSelectAPKAndNavigate}
            triggerToast={triggerToast}
          />
        );
      case 'static':
        return (
          <StaticAnalysis 
            apkReports={apkReports}
            selectedAPKId={selectedAPKId}
            onSelectAPK={setSelectedAPKId}
          />
        );
      case 'dynamic':
        return (
          <DynamicSandbox 
            apkReports={apkReports}
            selectedAPKId={selectedAPKId}
            onSelectAPK={setSelectedAPKId}
            triggerToast={triggerToast}
          />
        );
      case 'intel':
        return <ThreatIntel />;
      case 'fraud':
        return <FraudMapping />;
      case 'investigate':
        return (
          <AIInvestigation 
            apkReports={apkReports}
            aiReports={aiReports}
            selectedAPKId={selectedAPKId}
            onSelectAPK={setSelectedAPKId}
            triggerToast={triggerToast}
          />
        );
      case 'risk':
        return (
          <RiskReports 
            apkReports={apkReports}
            selectedAPKId={selectedAPKId}
            onSelectAPK={setSelectedAPKId}
            onNavigateToReport={(id) => {
              setSelectedAPKId(id);
              setCurrentView('reports');
            }}
          />
        );
      case 'reports':
        return (
          <ReportPage 
            apkReports={apkReports}
            selectedAPKId={selectedAPKId}
            onSelectAPK={setSelectedAPKId}
            triggerToast={triggerToast}
          />
        );
      case 'history':
        return (
          <History 
            apkReports={apkReports}
            onSelectAPK={handleSelectAPKAndNavigate}
            onDeleteReport={handleDeleteReport}
            triggerToast={triggerToast}
          />
        );
      case 'settings':
        return <Settings triggerToast={triggerToast} />;
      default:
        return (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-xl">
            <h3 className="text-sm font-bold text-slate-800">Pane under construction</h3>
            <p className="text-xs text-slate-400 mt-1">Please select another module from the sidebar navigation.</p>
          </div>
        );
    }
  };

  // If user is not authenticated, show secure Login
  if (!user) {
    return (
      <div className="font-sans min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Login onLogin={handleLogin} />
        
        {/* Absolute Toasts panel on Login Screen */}
        <ToastContainer toasts={toasts} setToasts={setToasts} />
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 text-slate-800 min-h-screen font-sans" id="applet-viewport">
      {/* Sidebar navigation */}
      <Sidebar 
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
        userEmail={user.email}
      />

      {/* Main Container */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Global corporate header bar */}
        <header className="sticky top-0 bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between z-20 flex-shrink-0 print:hidden">
          {/* Left search */}
          <form onSubmit={handleGlobalSearch} className="relative w-96 max-w-xs sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search file hash, domains, or certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#2563EB] w-full"
            />
          </form>

          {/* Right profile desk */}
          <div className="flex items-center space-x-4">
            {/* Quick alert notifications banner */}
            <button 
              onClick={() => triggerToast('System Integrity Scan', 'No anomalous logs detected in hardware sandbox containers.', 'success')}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all cursor-pointer relative"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-[#DC2626] rounded-full animate-ping" />
            </button>

            <div className="h-8 w-px bg-slate-200" />

            {/* User credentials badge */}
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <User className="h-4 w-4 text-slate-500" />
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-bold text-slate-700">{user.email}</div>
                <div className="text-[9px] text-[#16A34A] font-mono uppercase font-extrabold tracking-wider">Session Active</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic page content container */}
        <main className="p-6 flex-grow max-w-7xl w-full mx-auto pb-12">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Float Toast list alerts */}
      <ToastContainer toasts={toasts} setToasts={setToasts} />
    </div>
  );
}

// Subcomponent: Absolute Toast wrapper
function ToastContainer({ toasts, setToasts }: { toasts: Toast[], setToasts: React.Dispatch<React.SetStateAction<Toast[]>> }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3 w-80 pointer-events-none">
      {toasts.map((toast) => {
        const getToastStyles = () => {
          switch (toast.type) {
            case 'success': return { bg: 'bg-white border-[#16A34A]/20', icon: CheckCircle, iconColor: 'text-[#16A34A]' };
            case 'warn': return { bg: 'bg-white border-[#F59E0B]/20', icon: AlertTriangle, iconColor: 'text-[#F59E0B]' };
            case 'error': return { bg: 'bg-white border-[#DC2626]/20', icon: ShieldAlert, iconColor: 'text-[#DC2626]' };
            default: return { bg: 'bg-white border-[#2563EB]/20', icon: Info, iconColor: 'text-[#2563EB]' };
          }
        };

        const config = getToastStyles();
        const Icon = config.icon;

        return (
          <div 
            key={toast.id}
            className={`p-4 rounded-xl border shadow-lg flex items-start space-x-3 transition-all duration-300 pointer-events-auto animate-slide-in ${config.bg}`}
          >
            <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
            <div className="flex-grow min-w-0">
              <h4 className="text-xs font-extrabold text-slate-800 tracking-tight">{toast.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-slate-300 hover:text-slate-500 cursor-pointer flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
