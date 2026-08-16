"use client";

import React, { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";

export type HeaderLang = "en" | "zh";

interface NavItem {
  key: "goradar" | "services" | "cases" | "pricing" | "faq";
  href: string;
}

interface HeaderProps {
  lang: HeaderLang;
  setLang: (next: HeaderLang) => void;
  t: {
    brand: string;
    nav: {
      goradar: string;
      services: string;
      cases: string;
      pricing: string;
      faq: string;
      contact: string;
      signin: string;
      langSwitch: string;
    };
    mobile: {
      openMenu: string;
      closeMenu: string;
    };
  };
}

const NAV_ITEMS: NavItem[] = [
  { key: "goradar", href: "#goradar" },
  { key: "services", href: "#services" },
  { key: "cases", href: "#cases" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
];

/** Sections tracked for active-section underline indicator. */
const ACTIVE_OBSERVED_IDS: ReadonlyArray<string> = [
  "goradar",
  "services",
  "cases",
  "pricing",
  "faq",
];

const HEADER_HEIGHT_PX = 64;

export default function Header({ lang, setLang, t }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Theme: "yellow" | "dark". Default to "yellow" so SSR and first paint
  // show the correct Yellow Hero state without any black flash.
  const [theme, setTheme] = useState<"yellow" | "dark">("yellow");

  const headerId = useId();
  const menuId = `${headerId}-mobile-menu`;

  // Keep <html lang> in sync with current language.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  // ─── SECTION-AWARE THEME DETECTION ─────────────────────────────────────────
  // Sample the content two pixels below the sticky header. This makes the theme
  // change at the same visual boundary as the page background without scanning
  // every section on each scroll event.
  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameId: number | null = null;

    const detectTheme = () => {
      frameId = null;
      const header = document.getElementById("site-header");
      if (!header) return;

      const sampleY = Math.min(header.getBoundingClientRect().bottom + 2, window.innerHeight - 1);
      const sampledElement = document.elementFromPoint(window.innerWidth / 2, sampleY);
      const themedSection = sampledElement?.closest<HTMLElement>("[data-section-theme]");
      const nextTheme = themedSection?.dataset.sectionTheme;

      if (nextTheme === "yellow" || nextTheme === "dark") {
        setTheme((currentTheme) => currentTheme === nextTheme ? currentTheme : nextTheme);
      }
    };

    const scheduleDetection = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(detectTheme);
    };

    scheduleDetection();
    window.addEventListener("scroll", scheduleDetection, { passive: true });
    window.addEventListener("resize", scheduleDetection);
    window.addEventListener("hashchange", scheduleDetection);

    return () => {
      window.removeEventListener("scroll", scheduleDetection);
      window.removeEventListener("resize", scheduleDetection);
      window.removeEventListener("hashchange", scheduleDetection);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  // ─── ACTIVE SECTION INDICATOR ───────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = ACTIVE_OBSERVED_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const id of ACTIVE_OBSERVED_IDS) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        setActiveId((prev) => bestId ?? prev ?? "goradar");
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ─── ESC closes mobile drawer ───────────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // ─── Body scroll lock while drawer open ─────────────────────────────────────
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleNavClick = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      setMobileOpen(false);
      void e;
      void href;
    },
    [],
  );

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "zh" : "en");
  }, [lang, setLang]);

  // ─── Theme tokens ────────────────────────────────────────────────────────────
  // Two clean, solid themes.  No blur, no transparency — pure color blocks.
  const s = theme === "dark"
    ? {
        headerBg: "bg-[#0A0A0A]",
        headerBorder: "border-b border-white/10",
        wordmarkText: "text-white",
        wordmarkDot: "text-[#E5FF00]",
        navText: "text-white/85 hover:text-white",
        navActive: "text-[#E5FF00]",
        navUnderline: "bg-[#E5FF00]",
        contactClass:
          "border border-[#E5FF00] text-[#E5FF00] hover:bg-[#E5FF00] hover:text-black",
        langClass: "text-white/85 hover:text-white",
        signinClass: "bg-white text-black hover:bg-[#E5FF00] hover:text-black",
        hamburgerClass: "text-white hover:text-[#E5FF00]",
      }
    : {
        headerBg: "bg-[#E5FF00]",
        headerBorder: "border-b border-black/10",
        wordmarkText: "text-black",
        wordmarkDot: "text-black",
        navText: "text-black/85 hover:text-black",
        navActive: "text-black",
        navUnderline: "bg-black",
        contactClass:
          "border border-black text-black hover:bg-black hover:text-[#E5FF00]",
        langClass: "text-black/85 hover:text-black",
        signinClass: "bg-black text-[#E5FF00] hover:bg-zinc-800",
        hamburgerClass: "text-black hover:text-black/70",
      };

  return (
    <>
      <header
        id="site-header"
        style={{ height: `${HEADER_HEIGHT_PX}px` }}
        className={`sticky top-0 left-0 right-0 z-50 ${s.headerBg} ${s.headerBorder}`}
        data-header-theme={theme}
      >
        <div
          className="mx-auto max-w-[1600px] h-full px-5 md:px-8 flex items-center justify-between gap-4"
        >
          {/* Brand wordmark — no small square logo.  Hero has the large graphic. */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label={t.brand}
          >
            <span
              className={`text-base md:text-lg font-extrabold tracking-tight whitespace-nowrap transition-colors duration-200 ${s.wordmarkText}`}
            >
              BrandGo
              <span
                className={`mx-[1px] transition-colors duration-200 ${s.wordmarkDot}`}
              >
                .
              </span>
              Global
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.key;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm font-bold tracking-tight transition-colors duration-200 ${
                    isActive ? s.navActive : s.navText
                  }`}
                >
                  {t.nav[item.key]}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 right-0 h-[2px] origin-left transition-all duration-200 ${s.navUnderline} ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right cluster (desktop) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0">
            <a
              href="#contact"
              onClick={handleNavClick("#contact")}
              className={`text-sm font-black tracking-tight px-4 py-1.5 rounded-full transition-colors duration-200 ${s.contactClass}`}
            >
              {t.nav.contact}
            </a>
            <button
              type="button"
              onClick={toggleLang}
              className={`text-sm font-black tracking-tight px-2 transition-colors duration-200 ${s.langClass}`}
              aria-label={
                lang === "en" ? "Switch language to Chinese" : "Switch language to English"
              }
            >
              {t.nav.langSwitch}
            </button>
            <a
              href="https://app.brandgo.global/"
              className={`px-4 xl:px-5 py-1.5 rounded-full text-sm font-black transition-colors duration-200 ${s.signinClass}`}
            >
              {t.nav.signin}
            </a>
          </div>

          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t.mobile.closeMenu : t.mobile.openMenu}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            className={`lg:hidden inline-flex items-center justify-center size-10 -mr-2 transition-colors duration-200 ${s.hamburgerClass}`}
          >
            <span aria-hidden="true" className="sr-only">
              {mobileOpen ? t.mobile.closeMenu : t.mobile.openMenu}
            </span>
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              >
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="13" x2="21" y2="13" />
                <line x1="3" y1="19" x2="21" y2="19" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer — always black regardless of section theme (spec) */}
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label={t.mobile.openMenu}
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label={t.mobile.closeMenu}
          onClick={closeMobile}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Panel */}
        <nav
          aria-label="Mobile primary"
          className={`absolute right-0 left-0 bg-[#0A0A0A] border-b border-white/10 transition-transform duration-300 ${
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ top: `${HEADER_HEIGHT_PX}px` }}
        >
          <ul className="flex flex-col py-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.key;
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={handleNavClick(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block px-6 py-4 text-base font-bold tracking-tight border-l-4 transition-colors ${
                      isActive
                        ? "border-[#E5FF00] text-[#E5FF00] bg-white/5"
                        : "border-transparent text-white hover:text-[#E5FF00] hover:bg-white/5"
                    }`}
                  >
                    {t.nav[item.key]}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="#contact"
                onClick={handleNavClick("#contact")}
                className="block px-6 py-4 text-base font-black tracking-tight text-[#E5FF00] border-l-4 border-transparent hover:bg-white/5"
              >
                {t.nav.contact}
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  toggleLang();
                }}
                className="w-full text-left px-6 py-4 text-base font-bold tracking-tight text-white border-l-4 border-transparent hover:text-[#E5FF00] hover:bg-white/5"
              >
                {t.nav.langSwitch}
              </button>
            </li>
            <li className="px-6 pt-4 pb-2">
              <a
                href="https://app.brandgo.global/"
                onClick={closeMobile}
                className="block w-full text-center bg-[#E5FF00] text-black py-3 rounded-full font-black tracking-tight hover:bg-white transition-colors"
              >
                {t.nav.signin}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
