'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { servicesSection } from '@/config/siteContent';

interface ServicesSectionProps {
  lang: 'zh' | 'en';
}

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: '-20%' });
  
  const [activeEngine, setActiveEngine] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate which card should be active based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const cardIndex = Math.floor(latest * 3);
      setActiveEngine(Math.min(cardIndex, 2));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Transform values for parallax effects
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);

  return (
    <section id="solutions" ref={containerRef} className="relative bg-[#0B0C10]">
      {/* Sticky Header */}
      <motion.div
        ref={headerRef}
        style={{ y: headerY, opacity: headerOpacity }}
        className="sticky top-0 z-20 h-screen flex items-center justify-center pointer-events-none"
      >
        <div className="text-center max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/40 uppercase tracking-widest mb-8"
          >
            {lang === 'zh' ? servicesSection.eyebrow_zh : servicesSection.eyebrow_en}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight"
          >
            {lang === 'zh' ? servicesSection.title_zh : servicesSection.title_en}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50"
          >
            {lang === 'zh' ? servicesSection.subtitle_zh : servicesSection.subtitle_en}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Container - 200vh for 3 cards */}
      <div className="relative" style={{ height: '300vh' }}>
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#06b6d4]/5 rounded-full blur-[150px]" />
        </div>

        {/* Engine Cards */}
        {servicesSection.engines.map((engine, index) => (
          <EngineCard
            key={engine.id}
            engine={engine}
            index={index}
            lang={lang}
            isActive={activeEngine === index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Bottom Fade */}
      <div className="h-[50vh] bg-gradient-to-b from-transparent to-[#0B0C10]" />
    </section>
  );
}

interface EngineCardProps {
  engine: typeof servicesSection.engines[0];
  index: number;
  lang: 'zh' | 'en';
  isActive: boolean;
  scrollYProgress: any;
}

function EngineCard({ engine, index, lang, isActive, scrollYProgress }: EngineCardProps) {
  const start = index / 3;
  const end = (index + 1) / 3;
  
  const y = useTransform(scrollYProgress, [start, end], ['100%', '0%']);
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.95, 1]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="absolute inset-0 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-6xl">
        {/* Card */}
        <motion.div
          className={`
            relative overflow-hidden rounded-3xl
            bg-white/5 backdrop-blur-xl border border-white/10
            transition-all duration-500
            ${isActive ? 'shadow-2xl' : ''}
          `}
          style={{
            boxShadow: isActive ? `0 0 80px rgba(0, 242, 254, 0.1), 0 0 120px rgba(255, 8, 68, 0.05)` : 'none',
          }}
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-3xl">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${engine.gradient} opacity-10`} />
            <div className={`absolute inset-[1px] rounded-3xl bg-[#0B0C10]`} />
          </div>

          {/* Content */}
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Info */}
              <div>
                {/* Engine Number */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${engine.gradient} flex items-center justify-center text-white font-black text-xl`}>
                    {index + 1}
                  </div>
                  <span className={`text-2xl font-bold bg-gradient-to-r ${engine.gradient} bg-clip-text text-transparent`}>
                    {lang === 'zh' ? engine.title_zh : engine.title_en}
                  </span>
                </motion.div>

                {/* Tagline */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                >
                  {lang === 'zh' ? engine.tagline_zh : engine.tagline_en}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-white/60 mb-8 leading-relaxed"
                >
                  {lang === 'zh' ? engine.description_zh : engine.description_en}
                </motion.p>

                {/* Features */}
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  {(lang === 'zh' ? engine.features_zh : engine.features_en).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${engine.gradient}`} />
                      {feature}
                    </li>
                  ))}
                </motion.ul>
              </div>

              {/* Right: Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative"
              >
                {/* Glow */}
                <div className={`absolute -inset-4 bg-gradient-to-br ${engine.gradient} opacity-20 blur-3xl rounded-3xl`} />
                
                {/* Visual Container */}
                <div className={`relative aspect-square bg-gradient-to-br ${engine.gradient === 'from-cyan-500 to-blue-500' ? 'from-cyan-500/20 to-blue-500/20' : engine.gradient === 'from-blue-500 to-purple-500' ? 'from-blue-500/20 to-purple-500/20' : 'from-purple-500/20 to-pink-500/20'} rounded-2xl border border-white/10 overflow-hidden`}>
                  {/* Abstract Pattern */}
                  <div className="absolute inset-0">
                    {/* Rings */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full`}
                        style={{
                          width: `${30 + i * 20}%`,
                          height: `${30 + i * 20}%`,
                        }}
                      />
                    ))}
                    
                    {/* Center Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className={`w-32 h-32 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center`}
                      >
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${engine.gradient} flex items-center justify-center shadow-lg`}>
                          <span className="text-3xl font-black text-white">
                            {index === 0 ? '⚡' : index === 1 ? '🎨' : '📈'}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Orbiting Particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${engine.gradient}`}
                        initial={{
                          top: '50%',
                          left: '50%',
                          x: '-50%',
                          y: '-50%',
                        }}
                        animate={{
                          rotate: [i * 60, i * 60 + 360],
                        }}
                        transition={{
                          duration: 8 + i * 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          transform: `rotate(${i * 60}deg) translateX(80px)`,
                          transformOrigin: '0 0',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Gradient Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`h-[2px] bg-gradient-to-r from-transparent ${engine.gradient === 'from-cyan-500 to-blue-500' ? 'via-cyan-500' : engine.gradient === 'from-blue-500 to-purple-500' ? 'via-blue-500' : 'via-purple-500'} to-transparent`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
