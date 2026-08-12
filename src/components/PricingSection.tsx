'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { pricingSection } from '@/config/siteContent';

interface PricingSectionProps {
  lang: 'zh' | 'en';
}

export default function PricingSection({ lang }: PricingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  // Generate particle data only on client-side to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{
    initialX: string;
    initialY: string;
    animateY: string[];
    duration: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      [...Array(30)].map(() => ({
        initialX: Math.random() * 100 + '%',
        initialY: Math.random() * 100 + '%',
        animateY: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
        duration: 5 + Math.random() * 5,
      }))
    );
  }, []);

  return (
    <section id="pricing" className="relative min-h-screen bg-[#0B0C10] flex items-center justify-center py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#a855f7]/10 via-[#06b6d4]/5 to-transparent rounded-full blur-3xl" />
        
        {/* Ambient Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: particle.initialX,
                y: particle.initialY,
              }}
              animate={{
                y: particle.animateY,
                opacity: [0.2, 0.6, 0.2],
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

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/40 uppercase tracking-widest mb-6">
            {lang === 'zh' ? pricingSection.eyebrow_zh : pricingSection.eyebrow_en}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            {lang === 'zh' ? pricingSection.title_zh : pricingSection.title_en}
          </h2>
        </motion.div>

        {/* Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#a855f7]/20 via-transparent to-[#06b6d4]/20 rounded-[2rem] blur-2xl" />
          
          {/* Card Border Gradient */}
          <div className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-br from-[#a855f7]/50 via-[#06b6d4]/30 to-[#a855f7]/50">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#a855f7]/20 to-[#06b6d4]/20" />
          </div>

          {/* Card */}
          <div className="relative bg-[#0B0C10]/90 backdrop-blur-2xl rounded-[2rem] overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-[#a855f7]/5 via-transparent to-transparent opacity-50" />

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-32 h-32">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-[#a855f7]/50 rounded-tl-lg"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-12 left-12 w-4 h-4 border-l border-t border-[#06b6d4]/30 rounded-tl"
              />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-[#06b6d4]/50 rounded-tr-lg"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute top-12 right-12 w-4 h-4 border-r border-t border-[#a855f7]/30 rounded-tr"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
                className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-[#06b6d4]/50 rounded-bl-lg"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
                className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-[#a855f7]/50 rounded-br-lg"
              />
            </div>

            {/* Content */}
            <div className="relative p-10 md:p-14 lg:p-16">
              {/* Header */}
              <div className="text-center mb-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                >
                  {lang === 'zh' ? pricingSection.invitationCard.title_zh : pricingSection.invitationCard.title_en}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/50"
                >
                  {lang === 'zh' ? pricingSection.invitationCard.subtitle_zh : pricingSection.invitationCard.subtitle_en}
                </motion.p>
              </div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                className="text-center mb-10"
              >
                <div className="inline-flex items-baseline">
                  <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#06b6d4]">
                    {pricingSection.invitationCard.currency}
                  </span>
                  <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#06b6d4]">
                    {pricingSection.invitationCard.price}
                  </span>
                </div>
                <div className="text-white/50 text-lg mt-2">
                  {lang === 'zh' ? pricingSection.invitationCard.period_zh : pricingSection.invitationCard.period_en}
                </div>
              </motion.div>

              {/* Features */}
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7 }}
                className="space-y-4 mb-10"
              >
                {(lang === 'zh' ? pricingSection.invitationCard.features_zh : pricingSection.invitationCard.features_en).map((feature, index) => (
                  <li key={index} className="flex items-center gap-4 text-white/70">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#06b6d4]/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </motion.ul>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0, 242, 254, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#a855f7] to-[#06b6d4] text-white font-bold text-lg rounded-xl overflow-hidden"
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">
                    {lang === 'zh' ? pricingSection.invitationCard.cta_zh : pricingSection.invitationCard.cta_en}
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

              {/* Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
                className="text-center text-sm text-white/30 mt-6"
              >
                {lang === 'zh' ? pricingSection.note_zh : pricingSection.note_en}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
