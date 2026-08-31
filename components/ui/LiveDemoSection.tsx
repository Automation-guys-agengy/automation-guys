'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, CheckCircle2, Mail, AlertCircle, ArrowRight, Activity } from 'lucide-react';

export function LiveDemoSection() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Animation Controls
  const triggerControls = useAnimation();
  const path1Controls = useAnimation();
  const actionControls = useAnimation();
  const path2Controls = useAnimation();
  const outputControls = useAnimation();

  // Validate Email Client-Side
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Start UI Animation (Trigger -> Action)
    triggerControls.start({
      boxShadow: ['0px 0px 0px rgba(59, 130, 246, 0)', '0px 0px 20px rgba(59, 130, 246, 0.8)', '0px 0px 0px rgba(59, 130, 246, 0)'],
      borderColor: ['#262626', '#3B82F6', '#262626'],
      transition: { duration: 1 }
    });

    path1Controls.start({
      pathLength: [0, 1],
      opacity: [0.2, 1],
      transition: { duration: 0.8, delay: 0.5, ease: 'easeInOut' }
    });

    actionControls.start({
      boxShadow: ['0px 0px 0px rgba(59, 130, 246, 0)', '0px 0px 20px rgba(59, 130, 246, 0.8)', '0px 0px 10px rgba(59, 130, 246, 0.4)'],
      borderColor: ['#262626', '#3B82F6', '#3B82F6'],
      transition: { duration: 1, delay: 1.2 }
    });

    // Make actual API call while animations are running
    try {
      const response = await fetch('/api/demo-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // API Success -> Complete the animation chain
      path2Controls.start({
        pathLength: [0, 1],
        opacity: [0.2, 1],
        transition: { duration: 0.8, ease: 'easeInOut' }
      });

      outputControls.start({
        boxShadow: ['0px 0px 0px rgba(16, 185, 129, 0)', '0px 0px 25px rgba(16, 185, 129, 0.9)', '0px 0px 15px rgba(16, 185, 129, 0.5)'],
        borderColor: ['#262626', '#10B981', '#10B981'],
        transition: { duration: 1, delay: 0.8 }
      });

      setTimeout(() => {
        setStatus('success');
      }, 1500);

    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
      
      // Reset animations on error
      actionControls.start({ borderColor: '#EF4444', boxShadow: '0px 0px 15px rgba(239, 68, 68, 0.5)' });
    }
  };

  return (
    <section className="relative w-full py-24 bg-[var(--bg-color)] overflow-hidden" id="live-demo">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            See it in <span className="text-[#3B82F6]">Action</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm md:text-base font-mono">
            Experience our intelligent workflows live. Enter your email to trigger a real-time automation sequence directly from this page.
          </p>
        </div>

        {/* Demo Container */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between bg-[#111] p-8 md:p-12 rounded-3xl border border-[#262626] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Grid Background for Canvas feel */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* Left: Input Form */}
          <div className="w-full lg:w-1/3 relative z-10">
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-[#262626] shadow-lg">
              <div className="flex items-center gap-3 mb-6 text-[var(--text-primary)]">
                <Activity className="w-5 h-5 text-[#3B82F6]" />
                <h3 className="font-bold font-mono text-sm uppercase tracking-wider">Test Automation</h3>
              </div>
              
              <form onSubmit={handleRun} className="flex flex-col gap-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrorMessage(''); }}
                    placeholder="Enter your email"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email || status === 'loading' || status === 'success'}
                  className="group flex items-center justify-center gap-2 w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#262626] disabled:text-[#666] text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] disabled:shadow-none"
                  aria-live="polite"
                >
                  {status === 'loading' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <span>Sent</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current group-hover:translate-x-0.5 transition-transform" />
                      <span>Run Workflow</span>
                    </>
                  )}
                </button>

                {/* Error State */}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 text-[#EF4444] text-xs mt-2 bg-[#EF4444]/10 p-3 rounded-lg border border-[#EF4444]/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>{errorMessage}</p>
                  </motion.div>
                )}

                {/* Success Toast / Notification */}
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 text-[#10B981] text-xs mt-2 bg-[#10B981]/10 p-3 rounded-lg border border-[#10B981]/20">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <p>Email sent! Check your inbox for the automated response.</p>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Right: Node Canvas UI */}
          <div className="w-full lg:w-2/3 h-64 relative flex items-center justify-between px-4 sm:px-12">
            
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {/* Line 1: Trigger -> Action */}
              <motion.path
                d="M 20% 50% L 50% 50%"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={path1Controls}
                className="hidden sm:block"
              />
              <motion.path
                d="M 50% 20% L 50% 50%" // Mobile fallback approximation
                stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" fill="none"
                initial={{ pathLength: 0, opacity: 0.2 }} animate={path1Controls}
                className="block sm:hidden"
              />

              {/* Line 2: Action -> Output */}
              <motion.path
                d="M 50% 50% L 80% 50%"
                stroke="#10B981"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.1 }}
                animate={path2Controls}
                className="hidden sm:block"
              />
              <motion.path
                d="M 50% 50% L 50% 80%" // Mobile fallback approximation
                stroke="#10B981" strokeWidth="2" fill="none"
                initial={{ pathLength: 0, opacity: 0.1 }} animate={path2Controls}
                className="block sm:hidden"
              />
            </svg>

            {/* Nodes Container */}
            <div className="w-full h-full flex flex-col sm:flex-row justify-between items-center relative z-10 gap-6 sm:gap-0">
              
              {/* Node 1: Trigger */}
              <motion.div 
                className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col items-center gap-3 min-w-[140px] shadow-lg"
                initial={{ borderColor: '#262626' }}
                animate={triggerControls}
              >
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-1">Trigger</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Manual Click</p>
                </div>
              </motion.div>

              {/* Node 2: Action */}
              <motion.div 
                className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col items-center gap-3 min-w-[140px] shadow-lg"
                initial={{ borderColor: '#262626' }}
                animate={actionControls}
              >
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-1">Action</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Send Email</p>
                </div>
              </motion.div>

              {/* Node 3: Output */}
              <motion.div 
                className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col items-center gap-3 min-w-[140px] shadow-lg"
                initial={{ borderColor: '#262626' }}
                animate={outputControls}
              >
                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-1">Output</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Confirmation</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
