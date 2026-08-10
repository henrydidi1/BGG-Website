'use client';

import { motion } from 'framer-motion';
import { footer } from '@/config/siteContent';

interface FooterProps {
  lang: 'zh' | 'en';
}

// Social Icons
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WeChatIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.87l-.407-.01zm-1.47 2.31a.955.955 0 01.956.956.955.955 0 11-1.91 0c0-.528.426-.956.954-.956zm4.857 0c.528 0 .954.428.954.956a.955.955 0 11-1.91 0c0-.528.427-.956.956-.956z"/>
  </svg>
);

const iconMap: Record<string, React.FC> = {
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  wechat: WeChatIcon,
};

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="relative bg-[#0B0C10] border-t border-white/5">
      {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start gap-4"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Brand Go.Global"
                className="h-10 w-auto"
              />
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-white/40">
              {lang === 'zh' ? footer.copyright_zh : footer.copyright_en}
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {footer.socialLinks.map((link) => {
              const IconComponent = iconMap[link.icon] || LinkedInIcon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-[#a855f7] hover:border-[#a855f7]/30 transition-all duration-300"
                  aria-label={link.name}
                >
                  <IconComponent />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-white/30"
        >
          <a href="#" className="hover:text-white/60 transition-colors">
            {lang === 'zh' ? '隐私政策' : 'Privacy Policy'}
          </a>
          <span className="hidden md:block">•</span>
          <a href="#" className="hover:text-white/60 transition-colors">
            {lang === 'zh' ? '服务条款' : 'Terms of Service'}
          </a>
          <span className="hidden md:block">•</span>
          <a href="#" className="hover:text-white/60 transition-colors">
            {lang === 'zh' ? '联系我们' : 'Contact Us'}
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
