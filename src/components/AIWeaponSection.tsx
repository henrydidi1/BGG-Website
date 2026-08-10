'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { aiWeaponSection } from '@/config/siteContent';

// Icon Components
const ScanIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

const LocalizeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const iconMap: Record<string, React.FC> = {
  scan: ScanIcon,
  lock: LockIcon,
  localize: LocalizeIcon,
};

interface AIWeaponSectionProps {
  lang: 'zh' | 'en';
}

export default function AIWeaponSection({ lang }: AIWeaponSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  // Generate particle data with useMemo to avoid hydration mismatch
  // useMemo with empty deps runs once on mount (client-side only)
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      initialX: Math.random() * 100 + '%',
      initialY: Math.random() * 100 + '%',
      animateX: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
      animateY: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
      duration: 10 + Math.random() * 10,
    }));
  }, []);

  return (
    <section id="ai-radar" className="relative min-h-[150vh] bg-[#0B0C10] py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-[#a855f7]/5 via-transparent to-transparent" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#a855f7]/30 rounded-full"
              initial={{
                x: particle.initialX,
                y: particle.initialY,
              }}
              animate={{
                x: particle.animateX,
                y: particle.animateY,
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/40 uppercase tracking-widest mb-6">
            {lang === 'zh' ? aiWeaponSection.eyebrow_zh : aiWeaponSection.eyebrow_en}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            {lang === 'zh' ? aiWeaponSection.title_zh : aiWeaponSection.title_en}
          </h2>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-24"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#a855f7]/20 via-transparent to-[#06b6d4]/20 rounded-3xl blur-xl" />
          
          {/* Dashboard Frame */}
          <div className="relative bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28ca41]" />
              <div className="flex-1 mx-4">
                <div className="h-6 bg-white/5 rounded-md flex items-center px-3">
                  <span className="text-xs text-white/30">ai-radar.brandgo.com</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="relative aspect-video bg-gradient-to-br from-[#0B0C10] to-[#0f0f15] p-8">
              {/* Placeholder Dashboard Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between py-8">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="border-b border-white/5 mx-8" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-row justify-between px-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-r border-white/5 py-8" />
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="absolute inset-8">
                    {/* Mock Chart Bars */}
                    <div className="absolute bottom-0 left-[10%] w-[8%] h-[60%] bg-gradient-to-t from-[#a855f7]/30 to-[#a855f7]/5 rounded-t-sm">
                      <motion.div
                        className="absolute inset-0 bg-[#a855f7]/20"
                        animate={{ height: ['60%', '75%', '60%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-[25%] w-[8%] h-[80%] bg-gradient-to-t from-[#a855f7]/40 to-[#a855f7]/10 rounded-t-sm">
                      <motion.div
                        className="absolute inset-0 bg-[#a855f7]/30"
                        animate={{ height: ['80%', '90%', '80%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-[40%] w-[8%] h-[45%] bg-gradient-to-t from-[#06b6d4]/30 to-[#06b6d4]/5 rounded-t-sm" />
                    <div className="absolute bottom-0 left-[55%] w-[8%] h-[70%] bg-gradient-to-t from-[#a855f7]/35 to-[#a855f7]/10 rounded-t-sm">
                      <motion.div
                        className="absolute inset-0 bg-[#a855f7]/25"
                        animate={{ height: ['70%', '85%', '70%'] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-[70%] w-[8%] h-[55%] bg-gradient-to-t from-[#06b6d4]/25 to-[#06b6d4]/5 rounded-t-sm" />
                    <div className="absolute bottom-0 left-[85%] w-[8%] h-[90%] bg-gradient-to-t from-[#a855f7]/50 to-[#a855f7]/15 rounded-t-sm">
                      <motion.div
                        className="absolute inset-0 bg-[#a855f7]/40"
                        animate={{ height: ['90%', '100%', '90%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                      />
                    </div>
                  </div>

                  {/* Floating Data Cards */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-8 right-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-3 w-32"
                  >
                    <div className="text-xs text-white/40 mb-1">Market Score</div>
                    <div className="text-xl font-bold text-[#a855f7]">87.3</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-12 left-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-3 w-36"
                  >
                    <div className="text-xs text-white/40 mb-1">Opportunities</div>
                    <div className="text-xl font-bold text-[#06b6d4]">+23</div>
                  </motion.div>
                </div>
              </div>

              {/* Scan Line Animation */}
              <motion.div
                className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none"
              >
                <motion.div
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-[#a855f7]/30 to-transparent"
                />
              </motion.div>
            </div>
          </div>

          {/* Reflection */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-[#a855f7]/10 to-transparent blur-xl" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aiWeaponSection.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || ScanIcon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-[#a855f7]/30 transition-all duration-300"
              >
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a855f7]/10 to-[#06b6d4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-[#06b6d4]/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {lang === 'zh' ? feature.title_zh : feature.title_en}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed">
                    {lang === 'zh' ? feature.description_zh : feature.description_en}
                  </p>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
