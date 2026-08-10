'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { heroSection } from '@/config/siteContent';

interface HeroSectionProps {
  lang: 'zh' | 'en';
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = lang === 'zh' ? heroSection.title_zh : heroSection.title_en;

  useEffect(() => {
    setCurrentText('');
    setIsTyping(true);
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setCurrentText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0C10]">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Gradient Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#a855f7]/20 to-[#06b6d4]/10 rounded-full blur-[120px]"
        />
        
        {/* Secondary Gradient Orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#06b6d4]/15 to-[#a855f7]/10 rounded-full blur-[100px]"
        />

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/60">
            <span className="w-2 h-2 bg-[#a855f7] rounded-full animate-pulse" />
            {lang === 'zh' ? 'AI驱动的出海营销专家' : 'AI-Powered Global Marketing Experts'}
          </span>
        </motion.div>

        {/* Main Title with Typewriter Effect */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
          <span className="block">
            {currentText}
            <span className={`inline-block w-[4px] h-[0.9em] bg-[#a855f7] ml-1 align-middle ${
              isTyping ? 'animate-pulse' : 'opacity-0'
            }`} />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-lg sm:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {lang === 'zh' ? heroSection.subtitle_zh : heroSection.subtitle_en}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary Button */}
          <motion.a
            href={heroSection.primaryButton.href}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 242, 254, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#a855f7] to-[#00d4e8] text-[#0B0C10] font-bold text-lg rounded-xl overflow-hidden"
          >
            <span className="relative z-10">
              {lang === 'zh' ? heroSection.primaryButton.label_zh : heroSection.primaryButton.label_en}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00d4e8] to-[#a855f7]"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Secondary Button - Glassmorphism */}
          <motion.a
            href={heroSection.secondaryButton.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/20 text-white font-semibold text-lg rounded-xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#06b6d4] rounded-full group-hover:animate-ping" />
              {lang === 'zh' ? heroSection.secondaryButton.label_zh : heroSection.secondaryButton.label_en}
            </span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/30 uppercase tracking-widest">
              {lang === 'zh' ? '向下探索' : 'Scroll to Explore'}
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
      </div>
    </section>
  );
}
