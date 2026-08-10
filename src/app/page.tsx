'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import AIWeaponSection from '@/components/AIWeaponSection';
import ServicesSection from '@/components/ServicesSection';
import CaseStudySection from '@/components/CaseStudySection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  const handleLangChange = (newLang: 'zh' | 'en') => {
    setLang(newLang);
  };

  return (
    <main className="relative bg-[#0B0C10] overflow-hidden">
      {/* Smooth Scroll */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0B0C10;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #06b6d4);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9333ea, #0891b2);
        }
      `}</style>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-[#0B0C10] pointer-events-none z-0">
        {/* Subtle radial gradient */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 242, 254, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar lang={lang} onLangChange={handleLangChange} />
        
        <HeroSection lang={lang} />
        <ManifestoSection lang={lang} />
        <AIWeaponSection lang={lang} />
        <ServicesSection lang={lang} />
        <CaseStudySection lang={lang} />
        <PricingSection lang={lang} />
        <Footer lang={lang} />
      </div>
    </main>
  );
}
