'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, CheckCircle2, Mail, AlertCircle, Activity } from 'lucide-react';

/** Client-side email regex — mirrors the server-side check */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LiveDemoSection() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — invisible to humans
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const announcerRef = useRef<HTMLDivElement>(null);

  // Animation Controllers — one per animated element
  const triggerControls = useAnimation();
  const path1Controls = useAnimation();
  const actionControls = useAnimation();
  const path2Controls = useAnimation();
  const outputControls = useAnimation();

  /** Announce status changes to screen readers */
  const announce = useCallback((msg: string) => {
    if (announcerRef.current) announcerRef.current.textContent = msg;
  }, []);

  /** Reset the entire canvas back to its idle visual state */
  const resetCanvas = useCallback(() => {
    const idle = { borderColor: '#262626', boxShadow: '0px 0px 0px rgba(0,0,0,0)' };
    triggerControls.start(idle);
    actionControls.start(idle);
    outputControls.start(idle);
    path1Controls.start({ pathLength: 0, opacity: 0.15 });
    path2Controls.start({ pathLength: 0, opacity: 0.15 });
  }, [triggerControls, actionControls, outputControls, path1Controls, path2Controls]);

  const handleRun = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      announce('Validation error: invalid email.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    announce('Running workflow…');

    // Phase 1 — Trigger node pulses
    triggerControls.start({
      boxShadow: [
        '0 0 0 rgba(59,130,246,0)',
        '0 0 24px rgba(59,130,246,0.9)',
        '0 0 8px rgba(59,130,246,0.35)',
      ],
      borderColor: ['#262626', '#3B82F6', '#3B82F6'],
      transition: { duration: 0.8 },
    });

    // Phase 2 — Line draws to Action node
    path1Controls.start({
      pathLength: [0, 1],
      opacity: [0.15, 1],
      transition: { duration: 0.7, delay: 0.4, ease: 'easeInOut' },
    });

    // Phase 3 — Action node pulses
    actionControls.start({
      boxShadow: [
        '0 0 0 rgba(59,130,246,0)',
        '0 0 24px rgba(59,130,246,0.9)',
        '0 0 10px rgba(59,130,246,0.4)',
      ],
      borderColor: ['#262626', '#3B82F6', '#3B82F6'],
      transition: { duration: 0.8, delay: 1.0 },
    });

    // Actual API call — animations run concurrently
    try {
      const res = await fetch('/api/demo-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      // API confirmed success → complete the animation chain
      path2Controls.start({
        pathLength: [0, 1],
        opacity: [0.15, 1],
        transition: { duration: 0.7, ease: 'easeInOut' },
      });

      outputControls.start({
        boxShadow: [
          '0 0 0 rgba(16,185,129,0)',
          '0 0 28px rgba(16,185,129,0.95)',
          '0 0 14px rgba(16,185,129,0.5)',
        ],
        borderColor: ['#262626', '#10B981', '#10B981'],
        transition: { duration: 0.9, delay: 0.7 },
      });

      setTimeout(() => {
        setStatus('success');
        announce('Email sent — check your inbox.');
      }, 1400);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setStatus('error');
      setErrorMessage(msg);
      announce(`Error: ${msg}`);
      actionControls.start({
        borderColor: '#EF4444',
        boxShadow: '0 0 16px rgba(239,68,68,0.55)',
      });
    }
  }, [email, website, announce, triggerControls, path1Controls, actionControls, path2Controls, outputControls]);

  const canSubmit = EMAIL_RE.test(email) && status !== 'loading' && status !== 'success';

  return (
    <section
      className="relative w-full py-24 bg-[var(--bg-color)] overflow-hidden"
      id="live-demo"
    >
      {/* Accessibility: live region for screen-reader announcements */}
      <div ref={announcerRef} aria-live="assertive" className="sr-only" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            See it in <span className="text-[#3B82F6]">Action</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm md:text-base font-mono">
            Experience our intelligent workflows live. Enter your email to
            trigger a real-time automation sequence directly from this page.
          </p>
        </div>

        {/* Demo Container */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch bg-[#111] p-6 md:p-10 rounded-3xl border border-[#262626] shadow-2xl relative overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Left Panel: Input Form */}
          <div className="w-full lg:w-[320px] shrink-0 relative z-10">
            <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-[#262626] shadow-lg h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6 text-[var(--text-primary)]">
                <Activity className="w-5 h-5 text-[#3B82F6]" />
                <h3 className="font-bold font-mono text-sm uppercase tracking-wider">
                  Test Automation
                </h3>
              </div>

              <form onSubmit={handleRun} className="flex flex-col gap-4 flex-1">
                {/* Honeypot — hidden from humans, bots will fill it */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                  <input
                    id="demo-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') {
                        setStatus('idle');
                        setErrorMessage('');
                      }
                    }}
                    placeholder="Enter your email to see it work"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Circular Play Button (n8n-style) */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group flex items-center justify-center gap-2.5 w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#1a1a1a] disabled:text-[#555] text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-colors shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                >
                  {status === 'loading' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: 'linear',
                      }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <span>Sent</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Run Workflow</span>
                    </>
                  )}
                </button>

                {/* Error Feedback */}
                {status === 'error' && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 text-[#EF4444] text-xs bg-[#EF4444]/10 p-3 rounded-lg border border-[#EF4444]/20"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </motion.div>
                )}

                {/* Success Feedback */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 text-[#10B981] text-xs bg-[#10B981]/10 p-3 rounded-lg border border-[#10B981]/20"
                    role="status"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>Email sent — check your inbox.</p>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Right Panel: Node Canvas */}
          <div className="flex-1 min-h-[260px] relative flex items-center justify-center z-10">
            {/* SVG Connectors with arrowhead markers */}
            <svg
              viewBox="0 0 600 200"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="arrowBlue"
                  markerWidth="8"
                  markerHeight="6"
                  refX="8"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L8,3 L0,6" fill="#3B82F6" />
                </marker>
                <marker
                  id="arrowGreen"
                  markerWidth="8"
                  markerHeight="6"
                  refX="8"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L8,3 L0,6" fill="#10B981" />
                </marker>
              </defs>

              {/* Line 1: Trigger → Action */}
              <motion.line
                x1="150"
                y1="100"
                x2="280"
                y2="100"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="5 5"
                markerEnd="url(#arrowBlue)"
                initial={{ pathLength: 0, opacity: 0.15 }}
                animate={path1Controls}
              />

              {/* Line 2: Action → Output */}
              <motion.line
                x1="320"
                y1="100"
                x2="450"
                y2="100"
                stroke="#10B981"
                strokeWidth="2"
                markerEnd="url(#arrowGreen)"
                initial={{ pathLength: 0, opacity: 0.15 }}
                animate={path2Controls}
              />
            </svg>

            {/* Nodes */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center relative z-10 gap-6 sm:gap-4 px-2">
              {/* Node 1: Trigger */}
              <motion.div
                className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col items-center gap-3 min-w-[130px] shadow-lg"
                initial={{ borderColor: '#262626' }}
                animate={triggerControls}
              >
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-0.5">
                    Trigger
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Manual Click
                  </p>
                </div>
              </motion.div>

              {/* Node 2: Action */}
              <motion.div
                className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col items-center gap-3 min-w-[130px] shadow-lg"
                initial={{ borderColor: '#262626' }}
                animate={actionControls}
              >
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-0.5">
                    Action
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Send Email
                  </p>
                </div>
              </motion.div>

              {/* Node 3: Output */}
              <motion.div
                className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col items-center gap-3 min-w-[130px] shadow-lg"
                initial={{ borderColor: '#262626' }}
                animate={outputControls}
              >
                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-0.5">
                    Output
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Confirmation
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
