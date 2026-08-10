'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { caseStudySection } from '@/config/siteContent';

interface CaseStudySectionProps {
  lang: 'zh' | 'en';
}

export default function CaseStudySection({ lang }: CaseStudySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  return (
    <section id="cases" className="relative min-h-[150vh] bg-[#0B0C10] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Placeholder for case study background - dark abstract */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f15] via-[#0B0C10] to-[#0f0f15]">
          {/* Abstract Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(0, 242, 254, 0.15) 0%, transparent 50%),
                                 radial-gradient(circle at 70% 60%, rgba(255, 8, 68, 0.1) 0%, transparent 40%)`,
              }}
            />
          </div>

          {/* Animated Grid */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 border-b border-white/[0.03]"
                style={{ top: `${i * 5}%` }}
                initial={{ opacity: 0, x: '-100%' }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 1 }}
                viewport={{ once: true }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 border-l border-white/[0.03]"
                style={{ left: `${i * 5}%` }}
                initial={{ opacity: 0, y: '-100%' }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 1 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0B0C10] to-transparent" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/40 uppercase tracking-widest">
            {lang === 'zh' ? caseStudySection.eyebrow_zh : caseStudySection.eyebrow_en}
          </span>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {caseStudySection.tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/60 backdrop-blur-sm"
            >
              {lang === 'zh' ? tag.label_zh : tag.label_en}
            </motion.span>
          ))}
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white text-center mb-8 tracking-tight leading-[1.1]"
        >
          {lang === 'zh' ? caseStudySection.title_zh : caseStudySection.title_en}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-white/50 text-center max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          {lang === 'zh' ? caseStudySection.description_zh : caseStudySection.description_en}
        </motion.p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {caseStudySection.metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center overflow-hidden"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-[#06b6d4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Value */}
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 200 }}
                  className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#06b6d4] mb-2"
                >
                  {metric.value}
                  <span className="text-2xl">
                    {lang === 'zh' ? metric.unit_zh : metric.unit_en}
                  </span>
                </motion.div>

                {/* Label */}
                <div className="text-sm text-white/40 uppercase tracking-wider">
                  {lang === 'zh' ? metric.label_zh : metric.label_en}
                </div>
              </div>

              {/* Bottom Border Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a855f7]/50 via-[#06b6d4]/50 to-[#a855f7]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 242, 254, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/20 text-white font-semibold rounded-xl overflow-hidden group"
          >
            <span className="relative z-10">
              {lang === 'zh' ? '开启你的增长故事' : 'Start Your Growth Story'}
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 uppercase tracking-widest">
            {lang === 'zh' ? '更多案例' : 'More Cases'}
          </span>
          <svg
            className="w-6 h-6 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
