import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "./Icons.jsx";
import ArchitectureDiagram from "./ArchitectureDiagram.jsx";
import {
  X,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Activity,
  Lock,
  AlertCircle,
  MapPin,
  Languages,
  Network,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function ProjectCaseStudyModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [bilingualLang, setBilingualLang] = useState("en"); // "en" | "np"
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const modalRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  // Store previously focused element and trap focus
  useEffect(() => {
    previouslyFocusedElementRef.current = document.activeElement;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === "function") {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [onClose]);

  if (!project) return null;

  const isCommunity = project.id === "high-school-youth-club";
  const techList = project.technologies || [];
  const challenges = project.challenges || [];
  const metrics = project.metrics || [];
  const securityItems = project.security || [];
  const endpoints = project.endpoints || [];

  const tabs = isCommunity
    ? [
        { id: "overview", label: "Mission & Experience", icon: Compass },
        { id: "ia", label: "Information Architecture", icon: Network },
        { id: "initiatives", label: "Civic Programs & Bilingual UI", icon: Users },
        { id: "architecture", label: "System Architecture", icon: Layers },
        { id: "challenges", label: "Engineering Challenges", icon: Zap },
        { id: "api-specs", label: "API Contracts", icon: Terminal },
      ]
    : [
        { id: "overview", label: "Overview & Impact", icon: Cpu },
        { id: "architecture", label: "Interactive Architecture", icon: Layers },
        { id: "challenges", label: "Engineering Challenges", icon: Zap },
        { id: "security-perf", label: "Security & Performance", icon: ShieldCheck },
        { id: "api-specs", label: "API Contracts", icon: Terminal },
      ];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={onClose}
      >
        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl border border-slate-700/80 shadow-2xl overflow-y-auto bg-slate-900/95 dark:bg-[#0B1120]/95 p-5 sm:p-8 space-y-6 z-10 text-slate-200 custom-scrollbar"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-cyan-400">
                <Code2 size={14} />
                <span>{project.categoryLabel} • {project.year}</span>
              </div>
              <h2 id="case-study-title" className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                {project.subtitle}
              </p>
              {project.location && (
                <p className="text-xs font-mono text-amber-400/90 flex items-center gap-1.5 pt-0.5">
                  <MapPin size={13} className="text-amber-400 shrink-0" />
                  <span>{project.location}</span>
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl glass-card text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Close case study"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none"
            role="tablist"
            aria-label="Case study sections"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-indigo-600/30 text-cyan-300 border border-cyan-500/50 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW & MISSION */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Measurable Performance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {metrics.map((m, idx) => (
                  <div key={idx} className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <div className="text-lg sm:text-xl font-bold font-heading text-white">
                      {m.value}
                    </div>
                    <p className="text-[10px] font-mono text-cyan-400/90 leading-tight">
                      {m.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Part 5: Before vs After Animated User Flow */}
              {project.userProblemFlow ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                    <Zap size={14} className="text-amber-400" />
                    <span>The User Problem: Architectural Transition</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Before */}
                    <div className="glass-card rounded-2xl p-5 border border-red-500/20 bg-red-950/10 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                        <AlertCircle size={15} />
                        <span>Before: Fragmented Channels</span>
                      </div>
                      <div className="space-y-2">
                        {project.userProblemFlow.before.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-300 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-white">{step.step}</p>
                              <p className="text-[11px] text-slate-400">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* After */}
                    <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-emerald-950/10 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 size={15} />
                        <span>After: Central Civic Platform</span>
                      </div>
                      <div className="space-y-2">
                        {project.userProblemFlow.after.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                              ✓
                            </span>
                            <div>
                              <p className="font-semibold text-white">{step.step}</p>
                              <p className="text-[11px] text-slate-400">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Problem vs Solution */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-5 border border-amber-500/20 bg-amber-950/10 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <AlertCircle size={15} />
                      <span>The Problem</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 bg-cyan-950/10 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 size={15} />
                      <span>The Engineered Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>
              )}

              {/* Verified Production Outcome */}
              <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/15 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Activity size={15} />
                  <span>Verified Production Outcome</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                  {project.result}
                </p>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techList.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-slate-800/80 text-cyan-300 border border-slate-700/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: INFORMATION ARCHITECTURE (Part 13 for High School Youth Club) */}
          {activeTab === "ia" && project.informationArchitecture && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
                  <Network size={14} />
                  <span>Interactive Route & Content Architecture</span>
                </div>
                <h3 className="text-lg font-bold font-heading text-white">
                  Civic Portal Navigation Hierarchy
                </h3>
                <p className="text-xs text-slate-400">
                  Hover or tap any route node to inspect its content purpose and civic user journey.
                </p>
              </div>

              {/* Tree Topology Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {project.informationArchitecture.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onMouseEnter={() => setHoveredRoute(item)}
                      onClick={() => setHoveredRoute(item)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all font-mono text-xs ${
                        hoveredRoute?.route === item.route
                          ? "border-amber-400 bg-slate-800/90 text-white shadow-md translate-x-1"
                          : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-amber-400 font-bold">{item.route}</span>
                        <span className="text-slate-400 font-sans font-medium text-xs">({item.name})</span>
                      </div>
                      <ArrowRight size={13} className="text-slate-500" />
                    </button>
                  ))}
                </div>

                {/* Route Detail Preview */}
                <div className="p-6 rounded-2xl glass-card border border-amber-500/30 bg-slate-950/80 flex flex-col justify-center space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Compass size={16} />
                    <span>Route Purpose & Experience</span>
                  </div>
                  <h4 className="text-xl font-heading font-extrabold text-white">
                    {hoveredRoute ? hoveredRoute.name : "Select a Route"}
                  </h4>
                  <p className="text-xs font-mono text-cyan-300">
                    {hoveredRoute ? hoveredRoute.route : "Hover any route on the left"}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hoveredRoute
                      ? hoveredRoute.desc
                      : "Information architecture is organized around zero-friction civic discovery: date-stamped events, emergency blood notices, verified committee rosters, and direct volunteer intake."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: CIVIC INITIATIVES & BILINGUAL UI (Part 14, 15, 17) */}
          {activeTab === "initiatives" && project.initiatives && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Bilingual Switcher Showcase */}
              <div className="p-5 rounded-2xl glass-card border border-slate-700 bg-slate-950/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    <Languages size={15} />
                    <span>Bilingual Experience • द्विभाषिक अनुभव</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setBilingualLang("en")}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        bilingualLang === "en"
                          ? "bg-amber-500 text-slate-950 shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => setBilingualLang("np")}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        bilingualLang === "np"
                          ? "bg-red-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      नेपाली
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
                  <p className="text-lg sm:text-2xl font-heading font-extrabold text-white">
                    {bilingualLang === "en"
                      ? project.bilingual?.taglineEn
                      : project.bilingual?.taglineNp}
                  </p>
                  <p className="text-xs font-mono text-slate-400">
                    {bilingualLang === "en"
                      ? project.bilingual?.noticeEn
                      : project.bilingual?.noticeNp}
                  </p>
                </div>
              </div>

              {/* Core Programs Grid (Part 17: Real World Impact) */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Core Community Initiatives & Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.initiatives.map((init) => (
                    <div
                      key={init.id}
                      className="p-5 rounded-2xl glass-card border border-slate-800 bg-slate-900/60 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-heading font-bold text-sm text-white">
                          {init.title}
                        </h5>
                        <span className="text-[11px] font-mono text-amber-400 font-medium">
                          {init.titleNp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {init.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: ARCHITECTURE DIAGRAM */}
          {activeTab === "architecture" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <ArchitectureDiagram project={project} />
            </motion.div>
          )}

          {/* TAB: ENGINEERING CHALLENGES */}
          {activeTab === "challenges" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="text-xs text-slate-400 font-mono">
                Technical hurdles encountered during development and the architectural solutions applied to overcome them.
              </div>

              {challenges.map((c, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400 font-heading font-bold text-sm sm:text-base">
                    <Zap size={16} className="text-cyan-400" />
                    <span>Challenge #{idx + 1}: {c.title}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                        Bottleneck
                      </span>
                      <p className="text-slate-400">{c.problem}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/20 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                        Resolution & Implementation
                      </span>
                      <p className="text-slate-300">{c.solution}</p>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-cyan-400/90 pt-1">
                    Mechanisms: {c.techUsed}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB: SECURITY & PERFORMANCE */}
          {activeTab === "security-perf" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={16} />
                  <span>Security & Protection Specifications</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {securityItems.map((sec, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-relaxed">{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: API CONTRACTS */}
          {activeTab === "api-specs" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="text-xs text-slate-400 font-mono">
                Verified API route definitions, authentication guards, and controller contracts.
              </div>

              <div className="space-y-2.5">
                {endpoints.map((ep, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl glass-card border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          ep.method === "GET"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : ep.method === "POST"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : ep.method === "PUT"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="text-slate-200 font-semibold">{ep.path}</span>
                    </div>
                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <span className="text-slate-400 text-[11px] font-sans">{ep.desc}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700 text-slate-300 whitespace-nowrap">
                        {ep.access}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer Bar Links */}
          <div className="pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors shadow-sm"
                >
                  <GithubIcon size={15} />
                  <span>GitHub Repository</span>
                </a>
              ) : project.isPrivate ? (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-500 bg-slate-800/40 border border-slate-800">
                  <Lock size={14} />
                  <span>Private Repository</span>
                </span>
              ) : null}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shadow-md"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Close [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
