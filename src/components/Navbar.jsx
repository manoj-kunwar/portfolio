import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, profile } from "../data/index.js";
import { Menu, X, Sun, Moon, FileText, ArrowUpRight, Search, Command } from "lucide-react";
import GsapMagnetic from "./GsapMagnetic.jsx";

export default function Navbar({ theme, toggleTheme, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trap escape key for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("toggle-command-palette"));
  };

  const scrollToSection = useCallback((id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-2.5 text-left focus:outline-none shrink-0"
            aria-label="Scroll to top of portfolio"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-500 to-purple-500 p-0.5 shadow-glowPrimary transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0B1120] rounded-[10px] flex items-center justify-center font-heading font-extrabold text-base text-white">
                MK
              </div>
            </div>
            <div>
              <span className="font-heading font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-cyan-400 transition-colors block leading-tight">
                {profile.name}
              </span>
              <span className="block text-[10px] text-cyan-400 font-mono tracking-wider uppercase">
                Full-Stack Engineer
              </span>
            </div>
          </button>

          {/* Inline Command Palette Trigger (Desktop) */}
          <button
            onClick={triggerCommandPalette}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-slate-700/80 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all text-xs font-mono group shrink-0"
            title="Open Command Palette (Cmd/Ctrl + K)"
            aria-label="Open command palette"
          >
            <Search size={14} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="truncate max-w-[130px]">Search stack...</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
              <Command size={10} /> K
            </kbd>
          </button>

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-1 glass-card px-3 py-1.5 rounded-full border border-slate-700/60"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 rounded-full shadow-glowPrimary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header CTAs */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Command Search Button (Medium screens) */}
            <button
              onClick={triggerCommandPalette}
              aria-label="Open command search"
              className="xl:hidden p-2 rounded-xl glass-card text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              title="Search (Ctrl + K)"
            >
              <Search size={17} className="text-cyan-400" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="p-2 rounded-xl glass-card text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all"
            >
              {theme === "dark" ? (
                <Sun size={17} className="text-amber-400" />
              ) : (
                <Moon size={17} className="text-indigo-400" />
              )}
            </button>

            {/* Resume Button */}
            <GsapMagnetic>
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all shadow-sm"
              >
                <FileText size={14} className="text-cyan-400" />
                <span>Resume</span>
              </button>
            </GsapMagnetic>

            {/* Contact CTA */}
            <GsapMagnetic>
              <button
                onClick={() => scrollToSection("contact")}
                className="group flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 rounded-xl shadow-glowPrimary hover:opacity-95 transition-all"
              >
                <span>Hire Me</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </GsapMagnetic>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={triggerCommandPalette}
              className="p-2 rounded-lg glass-card text-cyan-400"
              aria-label="Open search palette"
            >
              <Search size={18} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass-card text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg glass-card text-slate-200 hover:text-white"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-5 space-y-4 backdrop-blur-xl"
          >
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-indigo-600/30 text-cyan-300 border border-cyan-500/40"
                        : "text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] font-mono text-slate-500">#{link.id}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-white"
              >
                <FileText size={15} className="text-cyan-400" />
                <span>Download / View Resume</span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 text-xs font-bold font-mono text-white text-center shadow-glowPrimary"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
