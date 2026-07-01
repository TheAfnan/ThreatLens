import React from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ChevronRight, Shield, Code, Activity, Search, ShieldCheck, Cpu } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from '../clerk-mock';
import { Logo } from './Logo';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOGOS = [
  { name: 'Google Cloud', url: 'https://svgl.app/library/google-cloud.svg', from: '#0284C7', to: '#7DD3FC' },
  { name: 'AWS', url: 'https://svgl.app/library/aws.svg', from: '#232F3E', to: '#FF9900' },
  { name: 'Microsoft', url: 'https://svgl.app/library/microsoft.svg', from: '#00A4EF', to: '#7FBA00' },
  { name: 'Cloudflare', url: 'https://svgl.app/library/cloudflare.svg', from: '#F38020', to: '#FAAD3F' },
  { name: 'Datadog', url: 'https://svgl.app/library/datadog.svg', from: '#632CA6', to: '#8442D8' },
  { name: 'Sentry', url: 'https://svgl.app/library/sentry.svg', from: '#362D59', to: '#E1567C' },
  { name: 'Android', url: 'https://svgl.app/library/android-icon.svg', from: '#3DDC84', to: '#073042' },
  { name: 'Docker', url: 'https://svgl.app/library/docker.svg', from: '#2496ED', to: '#0DB7ED' },
];

export default function LandingPage({ 
  onEnterDashboard, 
  onNavigateToDocs,
  onNavigateToLegal
}: { 
  onEnterDashboard: () => void, 
  onNavigateToDocs: () => void,
  onNavigateToLegal?: (type: 'privacy' | 'terms') => void 
}) {
  const navigate = useNavigate();

  // Global Mouse Tracking for Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.pageX);
    mouseY.set(e.pageY);
  };

  return (
    <div 
      className="min-h-screen app-bg-container relative overflow-x-hidden font-sans pb-10 pt-10"
      onMouseMove={handleMouseMove}
    >
      <div className="app-bg animate-breathe z-0" />
      
      {/* 1. Dynamic Mouse Glow (Spotlight) */}
      <motion.div
        className="pointer-events-none absolute z-0 rounded-full w-[800px] h-[800px] bg-gradient-to-r from-[#38BDF8]/20 to-[#0F357E]/10 blur-[100px] opacity-70"
        style={{
          left: -400,
          top: -400,
          x: springX,
          y: springY,
        }}
      />

      {/* 2. Main Hero Container & Video Background */}
      <section className="relative z-10 w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[600px] flex flex-col">
        
        {/* Underlying Video Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
          />
        </div>

        {/* 3. Floating Animated Badges */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] z-30 bg-white/30 backdrop-blur-2xl border border-white/60 px-5 py-2.5 rounded-2xl shadow-glass flex items-center space-x-2 hidden md:flex"
        >
          <ShieldCheck className="w-5 h-5 text-[#0F357E]" />
          <span className="text-sm font-bold text-[#0a1b33]">0-Day Protected</span>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-[15%] z-30 bg-white/30 backdrop-blur-2xl border border-white/60 px-5 py-2.5 rounded-2xl shadow-glass flex items-center space-x-2 hidden md:flex"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-ring"></div>
          <span className="text-sm font-bold text-[#0a1b33]">AI Core Active</span>
        </motion.div>

        {/* 4. Hero Text Content */}
        <div className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <div className="mb-4 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/40 border border-white/50 backdrop-blur-md shadow-sm">
              <Cpu className="h-4 w-4 text-[#0F357E]" />
              <span className="text-xs font-bold text-[#0a1b33] uppercase tracking-wider">ThreatLens v2.0</span>
            </div>

            <h1 className="font-display text-[42px] md:text-[56px] font-medium tracking-tight text-[#0a1b33] leading-tight drop-shadow-sm">
              Next-Gen <br />Binary Security
            </h1>
            <p className="font-sans text-[14px] md:text-[15px] text-[#64748b] mt-4 max-w-md leading-relaxed">
              Decompile, analyze, and secure enterprise applications in seconds with our AI-driven threat intelligence platform.
            </p>
            
            <SignInButton>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-[#0a152d] text-white px-8 py-3.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2 group"
              >
                <span>Login</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </SignInButton>
          </motion.div>
        </div>

        {/* 5. Floating Bottom Navbar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40"
          >
            {/* Logo Placeholder */}
            <div className="relative flex items-center justify-center w-10 h-10 ml-1">
              <Logo className="w-9 h-9 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform" />
            </div>
            
            {/* Nav Links */}
            <div className="flex items-center space-x-1 px-2">
              <button 
                onClick={onNavigateToDocs}
                className="px-4 py-2 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] transition-colors rounded-full hover:bg-slate-50"
              >
                Docs
              </button>
            </div>

            {/* Get in touch CTA */}
            <button 
              onClick={() => navigate('/pricing')}
              className="flex items-center space-x-1 bg-white px-5 py-2.5 rounded-full text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all group"
            >
              <span>Pricing & Trial</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.nav>
        </div>

      </section>

      {/* 6. Seamless Marquee Logo Scroller Component */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-20 w-full max-w-[1400px] mx-auto overflow-hidden relative z-10"
      >
        <div className="text-center mb-8">
          <p className="font-sans text-[13px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            Trusted by Engineering & Security Teams Worldwide
          </p>
        </div>

        <div 
          className="absolute inset-0 top-14 z-10 pointer-events-none" 
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        ></div>
        
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] space-x-4 pl-4" style={{ width: 'max-content' }}>
          {[...LOGOS, ...LOGOS].map((logo, idx) => (
            <div 
              key={`${logo.name}-${idx}`} 
              className={cn(
                "group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-[32px] bg-white border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all overflow-hidden",
                "hover:border-slate-300 hover:shadow-md cursor-pointer"
              )}
            >
              <div 
                className="absolute inset-0 opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-0"
                style={{
                  background: `linear-gradient(135deg, ${logo.from} 0%, ${logo.to} 100%)`
                }}
              />
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="w-12 h-12 object-contain relative z-10 transition-all duration-300 group-hover:brightness-0 group-hover:invert grayscale group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* 7. Ultra Pro Max Glass Bento Grid */}
      <motion.section 
        id="features"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-32 w-full max-w-[1400px] mx-auto px-6 md:px-10 relative z-20"
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-[32px] md:text-[48px] font-bold tracking-tight text-[#0a1b33]">
            Unprecedented Visibility.
          </h2>
          <p className="font-sans text-slate-500 mt-4 max-w-2xl mx-auto text-[16px] leading-relaxed">
            Our proprietary engine dissects binaries at the opcode level, providing a microscopic view of every threat vector before it reaches production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
          
          {/* Card 1: Static Compiler */}
          <div className="md:col-span-2 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-glass rounded-[40px] p-10 relative overflow-hidden group hover-lift flex flex-col justify-between">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
               <Code className="w-64 h-64 text-[#0F357E] scale-150 -translate-y-10 translate-x-10 group-hover:scale-100 transition-transform duration-700" />
             </div>
             <div className="relative z-10 max-w-md">
               <div className="h-16 w-16 bg-white shadow-sm border border-slate-100 rounded-[20px] flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                 <Shield className="h-8 w-8 text-[#0F357E]" />
               </div>
               <h3 className="font-display text-[28px] font-bold text-[#0a1b33]">Secure Compiler Engine</h3>
               <p className="mt-4 text-slate-600 font-sans leading-relaxed text-[15px]">Deep static analysis of raw DEX binaries, extracting unexported components and hardcoded secrets with absolutely zero execution.</p>
             </div>
          </div>

          {/* Card 2: Dynamic Sandbox */}
          <div className="md:col-span-1 bg-gradient-to-br from-[#0a152d] to-[#1e3a8a] border border-[#1e3a8a]/50 shadow-glass rounded-[40px] p-10 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 flex flex-col justify-between">
             <div className="relative z-10">
               <div className="h-16 w-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-[20px] flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                 <Activity className="h-8 w-8 text-sky-400" />
               </div>
               <h3 className="font-display text-[28px] font-bold text-white leading-tight">Dynamic Sandbox</h3>
               <p className="mt-4 text-sky-200/80 font-sans leading-relaxed text-[15px]">Execute evasive payloads in hardware-isolated environments. Trace memory hooks in real-time.</p>
             </div>
             
             {/* Decorative UI element for dynamic sandbox */}
             <div className="absolute bottom-0 right-0 translate-x-8 translate-y-8 flex space-x-2 opacity-50">
               <div className="w-4 h-24 bg-sky-400/30 rounded-full blur-sm"></div>
               <div className="w-4 h-32 bg-sky-400/30 rounded-full blur-sm -translate-y-4"></div>
               <div className="w-4 h-16 bg-sky-400/30 rounded-full blur-sm"></div>
             </div>
          </div>

          {/* Card 3: Threat Intel */}
          <div className="md:col-span-3 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-glass rounded-[40px] p-10 relative overflow-hidden group hover-lift flex flex-col md:flex-row items-center justify-between">
             <div className="flex-1 pr-10 z-10 relative">
               <div className="h-16 w-16 bg-white shadow-sm border border-slate-100 rounded-[20px] flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                 <Search className="h-8 w-8 text-[#0F357E]" />
               </div>
               <h3 className="font-display text-[28px] font-bold text-[#0a1b33]">Global Threat Intelligence</h3>
               <p className="mt-4 text-slate-600 font-sans leading-relaxed text-[15px] max-w-2xl">Cross-reference millions of malware signatures globally. ThreatLens is constantly updated with real-world IOCs, ensuring your application defenses are always one step ahead.</p>
             </div>
             
             {/* Decorative abstract elements */}
             <div className="hidden md:flex space-x-4 pr-10">
               {[1,2,3,4].map((i, idx) => (
                 <motion.div 
                   key={i} 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 3, delay: idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
                   className="h-32 w-12 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full shadow-sm"
                 ></motion.div>
               ))}
             </div>
          </div>

        </div>
      </motion.section>

      {/* 8. Royal Blue 3D Infrastructure Section */}
      <section className="w-full bg-[#1e40af]/20 backdrop-blur-[80px] py-32 relative overflow-hidden mt-32 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        {/* Glow behind building */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1300px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between relative z-10">
          
          {/* Left: Ultra Pro Max Glassmorphism 3D Building */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center mb-16 md:mb-0 relative group"
          >
            {/* Dynamic Hover Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sky-400/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-[1px] rounded-[48px] bg-gradient-to-b from-white/60 via-white/20 to-white/5 shadow-[0_30px_60px_-15px_rgba(255,255,255,0.4)]"
            >
              <div className="relative bg-white/40 backdrop-blur-3xl border border-white/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] rounded-[48px] overflow-hidden p-8 flex items-center justify-center group-hover:bg-white/50 transition-colors duration-700">
                {/* Ambient inner glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white/20 opacity-40 pointer-events-none" />
                
                {/* Image with strong 3D Drop Shadow & Physics */}
                <img 
                  src="/iso_building_white.png" 
                  alt="3D Isometric Server Building" 
                  className="relative z-10 w-full max-w-[400px] object-contain drop-shadow-[0_20px_30px_rgba(56,189,248,0.4)] transform group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-700 ease-out"
                />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right: Enhanced Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-1/2 md:pl-20"
          >
            <div className="mb-6 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-900/10 border border-blue-900/20 backdrop-blur-md shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-pulse-ring"></div>
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-widest">Enterprise Infrastructure</span>
            </div>

            <h2 className="font-display text-[38px] md:text-[46px] font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              AI-powered security <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">automation for scale</span>
            </h2>
            <p className="font-sans text-[15px] text-slate-700 font-medium leading-[1.8] mb-10 max-w-[480px]">
              Create safe, efficient, and intelligent environments through state-of-the-art security systems, automation, and AI-driven analytics. Ensure seamless integration, real-time monitoring, and proactive threat detection at an enterprise scale.
            </p>
            <SignInButton>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold shadow-[0_10px_30px_rgba(29,78,216,0.3)] hover:shadow-[0_15px_40px_rgba(29,78,216,0.4)] transition-all uppercase tracking-[0.15em] text-[12px] flex items-center space-x-2 group">
                <span>Deploy Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignInButton>
          </motion.div>
        </div>
      </section>

      {/* 9. Enhanced Pro Max Footer Details */}
      <footer className="w-full bg-[#1e40af]/20 backdrop-blur-[100px] px-6 md:px-16 pt-24 pb-12 relative z-20 border-t border-blue-500/20 text-slate-700 font-sans overflow-hidden">
        
        {/* Decorative Glows inside footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/10 blur-[150px] pointer-events-none"></div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          
          {/* Top Section: Newsletter & Branding */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 pb-16 border-b border-slate-900/10">
            <div className="mb-10 md:mb-0 max-w-md">
              <h3 className="text-[28px] font-display font-bold text-slate-900 mb-4 tracking-tight">
                Secure your infrastructure.
              </h3>
              <p className="text-[14px] text-slate-700 font-medium leading-relaxed">
                Join 500+ enterprises using ThreatLens AI to stop zero-day threats before they execute.
              </p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your work email" 
                className="px-6 py-4 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-[300px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] font-medium text-[13px] transition-all"
              />
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold shadow-[0_5px_20px_rgba(29,78,216,0.3)] hover:shadow-[0_10px_25px_rgba(29,78,216,0.4)] transition-all uppercase tracking-widest text-[12px] whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Middle Section: Links */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-[20px] border border-white/40 shadow-[0_8px_32px_rgba(29,78,216,0.3)] overflow-hidden">
                  <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400/80 via-blue-600/80 to-purple-600/80 blur-md opacity-90 animate-pulse-slow"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
                  <span className="relative z-10 font-black text-white text-[16px] tracking-tighter drop-shadow-md">TL</span>
                </div>
                <span className="text-[22px] font-bold text-slate-900 tracking-tight">ThreatLens</span>
              </div>
              <p className="text-[13px] leading-relaxed max-w-xs text-slate-700 font-medium">
                The next-generation, AI-driven binary security and threat intelligence platform designed for enterprise scale.
              </p>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-[12px] uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-[13px] font-semibold text-slate-700">
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Features</button></li>
                <li><button onClick={() => navigate('/sandbox')} className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Dynamic Sandbox</button></li>
                <li><button onClick={() => navigate('/threat-intel')} className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Threat Intelligence</button></li>
                <li><button onClick={() => navigate('/pricing')} className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center flex-wrap">Enterprise Pricing <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[9px] uppercase tracking-wider">New</span></button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-[12px] uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4 text-[13px] font-semibold text-slate-700">
                <li><button onClick={onNavigateToDocs} className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Documentation</button></li>
                <li><a href="#" className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">API Reference</a></li>
                <li><a href="#" className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Security Advisories</a></li>
                <li><a href="#" className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Research Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-[12px] uppercase tracking-widest">Legal</h4>
              <ul className="space-y-4 text-[13px] font-semibold text-slate-700">
                <li><button onClick={() => onNavigateToLegal?.('privacy')} className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Privacy Policy</button></li>
                <li><button onClick={() => onNavigateToLegal?.('terms')} className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Terms of Service</button></li>
                <li><a href="#" className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-[12px] uppercase tracking-widest">Contact</h4>
              <ul className="space-y-4 text-[13px] font-semibold text-slate-700">
                <li><a href="mailto:aithreatlens@gmail.com" className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">aithreatlens@gmail.com</a></li>
                <li><a href="tel:8303536986" className="hover:text-blue-700 hover:translate-x-1 transition-all flex items-center">+91 8303536986</a></li>
                <li><span className="flex items-center">Available 24/7 for support</span></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section: Copyright & Socials */}
          <div className="pt-8 border-t border-slate-900/10 flex flex-col md:flex-row items-center justify-between text-[12px] text-slate-500 font-semibold">
            <div className="mb-4 md:mb-0">
              &copy; 2026 ThreatLens Inc. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-700 transition-colors flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="hover:text-blue-700 transition-colors flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="hover:text-blue-700 transition-colors flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
