'use client'

import { motion } from 'framer-motion'
import { Activity, ArrowRight, CheckCircle2, Cpu, Database, GitMerge, Layers, Zap } from 'lucide-react'

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Abstract Surface Card Container */}
      <div className="relative rounded-2xl bg-[#141414] border border-[#262626] p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Top Card Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#262626] font-mono text-xs text-[#8C8C88]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="text-[#F2F2F0] font-semibold">LIVE_OPERATIONS_FLOW</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#1f1f1f] text-[#3B82F6] border border-[#3B82F6]/30">
            SYSTEM_ACTIVE
          </span>
        </div>

        {/* Abstract Node Flow Diagram */}
        <div className="py-6 space-y-6">
          {/* Node Row 1: Trigger / Data In */}
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-5 p-3.5 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-mono text-xs font-bold border border-[#3B82F6]/30">
                IN
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-mono font-bold text-[#F2F2F0] truncate">Inbound Signal</p>
                <p className="text-[10px] font-mono text-[#8C8C88]">Webhook / API Payload</p>
              </div>
            </div>

            <div className="col-span-2 flex justify-center relative">
              <div className="w-full h-0.5 bg-[#262626] relative overflow-hidden">
                <motion.div
                  className="absolute top-0 bottom-0 w-1/2 bg-[#3B82F6]"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                />
              </div>
            </div>

            <div className="col-span-5 p-3.5 rounded-xl bg-[#0A0A0A] border border-[#262626] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center border border-[#3B82F6]/30">
                <GitMerge className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-mono font-bold text-[#F2F2F0] truncate">Parser Engine</p>
                <p className="text-[10px] font-mono text-[#8C8C88]">Logic & Validation</p>
              </div>
            </div>
          </div>

          {/* Central Process Flow Line */}
          <div className="relative pl-6 py-2 border-l-2 border-dashed border-[#3B82F6]/40 ml-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#3B82F6] border-2 border-[#141414] -ml-[31px]" />
              <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#262626] flex-1 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8C8C88]">1. Auto-qualification & enrichment</span>
                <span className="text-[#3B82F6] font-bold">PASS</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#3B82F6] border-2 border-[#141414] -ml-[31px]" />
              <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#262626] flex-1 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8C8C88]">2. CRM sync & team notification</span>
                <span className="text-[#3B82F6] font-bold">12ms</span>
              </div>
            </div>
          </div>

          {/* Node Row 3: Output Execution */}
          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#3B82F6]/30 flex items-center justify-between font-mono">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6] text-[#0A0A0A] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F2F2F0]">SYSTEM OUTPUT</p>
                <p className="text-[11px] text-[#8C8C88]">Action completed zero human intervention</p>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#3B82F6]" />
          </div>
        </div>

        {/* Bottom Metric Bar */}
        <div className="pt-4 border-t border-[#262626] grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
          <div className="p-2 rounded bg-[#0A0A0A] border border-[#262626]">
            <span className="block text-[#8C8C88]">LATENCY</span>
            <span className="font-bold text-[#3B82F6]">18ms</span>
          </div>
          <div className="p-2 rounded bg-[#0A0A0A] border border-[#262626]">
            <span className="block text-[#8C8C88]">SUCCESS</span>
            <span className="font-bold text-[#F2F2F0]">99.98%</span>
          </div>
          <div className="p-2 rounded bg-[#0A0A0A] border border-[#262626]">
            <span className="block text-[#8C8C88]">STATUS</span>
            <span className="font-bold text-[#3B82F6]">AUTO</span>
          </div>
        </div>
      </div>
    </div>
  )
}
