'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { manifestoSection } from '@/config/siteContent';

interface ManifestoSectionProps {
  lang: 'zh' | 'en';
}

export default function ManifestoSection({ lang }: ManifestoSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const paragraphs = lang === 'zh' ? manifestoSection.paragraphs_zh : manifestoSection.paragraphs_en;

  return (
    <section id="manifesto" className="relative min-h-screen flex items-center justify-center bg-[#0B0C10] py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Left Gradient */}
        <div className="absolute left-0 top-1/4 w-[400px] h-[600px] bg-gradient-to-r from-[#a855f7]/5 to-transparent rounded-r-full blur-3xl" />
        
        {/* Right Gradient */}
        <div className="absolute right-0 bottom-1/4 w-[400px] h-[600px] bg-gradient-to-l from-[#06b6d4]/5 to-transparent rounded-l-full blur-3xl" />
        
        {/* Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/40 uppercase tracking-widest">
            {lang === 'zh' ? manifestoSection.eyebrow_zh : manifestoSection.eyebrow_en}
          </span>
        </motion.div>

        {/* Main Headline - Typography Driven */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white text-center mb-20 tracking-tighter leading-[0.9]"
        >
          <span className="block">
            {lang === 'zh' ? manifestoSection.headline_zh : manifestoSection.headline_en}
          </span>
        </motion.h2>

        {/* Paragraphs - Staggered Reveal */}
        <div className="space-y-8 md:space-y-12">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={`${lang}-${index}`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4 + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="text-xl sm:text-2xl md:text-3xl text-white/70 font-light leading-relaxed text-center max-w-4xl mx-auto"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent"
        />

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-white/40 italic">
            {lang === 'zh' 
              ? '"我们不猜测，我们计算。不赌博，我们投资。"' 
              : '"We don\'t guess, we calculate. We don\'t gamble, we invest."'}
          </p>
        </motion.div>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-[#a855f7] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
