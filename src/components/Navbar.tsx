'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '@/config/siteContent';

interface NavbarProps {
  lang: 'zh' | 'en';
  onLangChange: (lang: 'zh' | 'en') => void;
}

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B0C10]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/logo.png"
                alt="Brand Go.Global"
                className="h-10 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 relative group"
                >
                  {lang === 'zh' ? link.label_zh : link.label_en}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#a855f7] to-[#06b6d4] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <motion.button
                onClick={() => onLangChange(lang === 'zh' ? 'en' : 'zh')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-3 py-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
              >
                <span className="relative z-10">
                  {lang === 'zh' ? 'EN' : '中'}
                </span>
              </motion.button>

              {/* Sign In Button */}
              <motion.a
                href={navigation.signInButton.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex relative px-5 py-2 text-sm font-semibold text-white rounded-lg overflow-hidden group"
              >
                {/* Glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#06b6d4] opacity-80 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
                {/* Button background */}
                <span className="absolute inset-[2px] bg-[#0B0C10] rounded-md" />
                {/* Content */}
                <span className="relative z-10">
                  {lang === 'zh' ? navigation.signInButton.label_zh : navigation.signInButton.label_en}
                </span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="w-5 h-0.5 bg-white block"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-5 h-0.5 bg-white block"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="w-5 h-0.5 bg-white block"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0B0C10]/95 backdrop-blur-xl md:hidden pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navigation.links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-bold text-white hover:text-[#a855f7] transition-colors"
                >
                  {lang === 'zh' ? link.label_zh : link.label_en}
                </motion.a>
              ))}
              <motion.a
                href={navigation.signInButton.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.links.length * 0.1 }}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-[#a855f7] to-[#06b6d4] text-white font-semibold rounded-lg"
              >
                {lang === 'zh' ? navigation.signInButton.label_zh : navigation.signInButton.label_en}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
