import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../animations/variants.js";
import { projects } from "../data/projects.js";
import {
  Activity,
  Users,
  Compass,
  Briefcase,
  Cpu,
  ArrowRight,
  ExternalLink,
  Zap,
} from "lucide-react";

const DOMAINS = [
  {
    id: "careos",
    name: "HEALTHCARE",
    label: "Telemedicine & Clinical Workflows",
    projectTitle: "CareOS",
    color: "#61DAFB",
    accentColor: "rgba(97, 218, 251, 0.2)",
    icon: Activity,
    pos: { top: "12%", left: "18%" },
    tech: "WebRTC • React • Express • MongoDB",
    metric: "< 180ms latency • DTLS-SRTP encryption",
    summary: "Browser-native video consultations and conflict-free booking for remote patient care.",
  },
  {
    id: "high-school-youth-club",
    name: "COMMUNITY",
    label: "Civic Youth Ecosystem",
    projectTitle: "High School Youth Club",
    color: "#F59E0B",
    accentColor: "rgba(245, 158, 11, 0.2)",
    icon: Users,
    pos: { top: "12%", right: "18%" },
    tech: "Next.js • TypeScript • Tailwind • Zod",
    metric: "Verified active in Krishnapur-5 • Bilingual",
    summary: "Connecting youth with athletic tournaments, blood donation drives, and official bulletins.",
  },
  {
    id: "wanderlust",
    name: "TRAVEL",
    label: "Hospitality & Marketplace",
    projectTitle: "Wanderlust",
    color: "#10B981",
    accentColor: "rgba(16, 185, 129, 0.2)",
    icon: Compass,
    pos: { bottom: "12%", left: "18%" },
    tech: "MongoDB 2dsphere • Express • Mapbox",
    metric: "~40% faster queries • Cloudinary CDN",
    summary: "Geospatial radius property discovery with responsive map coordinate navigation.",
  },
  {
    id: "rozgarnepal",
    name: "EMPLOYMENT",
    label: "Job & Candidate Matching",
    projectTitle: "Rozgar Nepal",
    color: "#A855F7",
    accentColor: "rgba(168, 85, 247, 0.2)",
    icon: Briefcase,
    pos: { bottom: "12%", right: "18%" },
    tech: "React • Express • MongoDB • JWT",
    metric: "< 200ms API response • Role isolation",
    summary: "Structured recruiter portals and candidate application queues across Nepal.",
  },
];

export default function SystemsInMotion({ onSelectProject }) {
  const [activeDomainId, setActiveDomainId] = useState("careos");
  const selectedDomain = DOMAINS.find((d) => d.id === activeDomainId) || DOMAINS[0];
  const relatedProject = projects.find((p) => p.id === selectedDomain.id);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/60">
      {/* Dynamic Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none transition-colors duration-700 opacity-20"
        style={{ backgroundColor: selectedDomain.color }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-slate-700 text-xs font-mono text-cyan-400 shadow-sm">
            <Zap size={14} className="text-amber-400" />
            <span>Systems in Motion</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Built for <span className="text-gradient-primary">Real People</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Different products, different problems, one engineering mindset.
          </p>
        </motion.div>

        {/* Central Interactive Topology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left/Main: Visual Radial Network */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-3xl glass-card border border-slate-800/90 bg-slate-950/80 p-6 flex items-center justify-center overflow-hidden">
            {/* Ambient Grid Background */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:28px_28px] pointer-events-none" />

            {/* Connecting SVG lines from center core to the 4 satellites */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="coreLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor={selectedDomain.color} stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {/* Lines to 4 corners */}
              <line x1="50" y1="50" x2="25" y2="24" stroke="url(#coreLineGradient)" strokeWidth={activeDomainId === "careos" ? "0.8" : "0.3"} strokeDasharray={activeDomainId === "careos" ? "none" : "2 2"} />
              <line x1="50" y1="50" x2="75" y2="24" stroke="url(#coreLineGradient)" strokeWidth={activeDomainId === "high-school-youth-club" ? "0.8" : "0.3"} strokeDasharray={activeDomainId === "high-school-youth-club" ? "none" : "2 2"} />
              <line x1="50" y1="50" x2="25" y2="76" stroke="url(#coreLineGradient)" strokeWidth={activeDomainId === "wanderlust" ? "0.8" : "0.3"} strokeDasharray={activeDomainId === "wanderlust" ? "none" : "2 2"} />
              <line x1="50" y1="50" x2="75" y2="76" stroke="url(#coreLineGradient)" strokeWidth={activeDomainId === "rozgarnepal" ? "0.8" : "0.3"} strokeDasharray={activeDomainId === "rozgarnepal" ? "none" : "2 2"} />
            </svg>

            {/* Center Core: Engineering Mindset */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                boxShadow: [
                  "0 0 25px rgba(56, 189, 248, 0.2)",
                  "0 0 45px rgba(56, 189, 248, 0.4)",
                  "0 0 25px rgba(56, 189, 248, 0.2)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full glass-card border border-cyan-400/50 bg-slate-900/90 flex flex-col items-center justify-center text-center p-2 shadow-2xl backdrop-blur-md"
            >
              <Cpu size={26} className="text-cyan-400 mb-1" />
              <span className="text-[10px] sm:text-xs font-mono font-black text-white tracking-widest uppercase">
                ENGINEERING
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-cyan-300">
                CORE
              </span>
            </motion.div>

            {/* Satellite 1: HEALTHCARE (Top Left) */}
            <button
              type="button"
              onClick={() => setActiveDomainId("careos")}
              className={`absolute top-6 left-6 sm:top-10 sm:left-12 p-3 sm:p-4 rounded-2xl glass-card border transition-all text-left group z-20 ${
                activeDomainId === "careos"
                  ? "border-cyan-400 bg-slate-900/95 shadow-glowPrimary scale-105"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-white tracking-wider">HEALTHCARE</p>
                  <p className="text-[10px] font-mono text-slate-400">CareOS</p>
                </div>
              </div>
            </button>

            {/* Satellite 2: COMMUNITY (Top Right) */}
            <button
              type="button"
              onClick={() => setActiveDomainId("high-school-youth-club")}
              className={`absolute top-6 right-6 sm:top-10 sm:right-12 p-3 sm:p-4 rounded-2xl glass-card border transition-all text-left group z-20 ${
                activeDomainId === "high-school-youth-club"
                  ? "border-amber-400 bg-slate-900/95 shadow-glowPrimary scale-105"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-white tracking-wider">COMMUNITY</p>
                  <p className="text-[10px] font-mono text-slate-400">Youth Club</p>
                </div>
              </div>
            </button>

            {/* Satellite 3: TRAVEL (Bottom Left) */}
            <button
              type="button"
              onClick={() => setActiveDomainId("wanderlust")}
              className={`absolute bottom-6 left-6 sm:bottom-10 sm:left-12 p-3 sm:p-4 rounded-2xl glass-card border transition-all text-left group z-20 ${
                activeDomainId === "wanderlust"
                  ? "border-emerald-400 bg-slate-900/95 shadow-glowPrimary scale-105"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Compass size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-white tracking-wider">TRAVEL</p>
                  <p className="text-[10px] font-mono text-slate-400">Wanderlust</p>
                </div>
              </div>
            </button>

            {/* Satellite 4: EMPLOYMENT (Bottom Right) */}
            <button
              type="button"
              onClick={() => setActiveDomainId("rozgarnepal")}
              className={`absolute bottom-6 right-6 sm:bottom-10 sm:right-12 p-3 sm:p-4 rounded-2xl glass-card border transition-all text-left group z-20 ${
                activeDomainId === "rozgarnepal"
                  ? "border-purple-400 bg-slate-900/95 shadow-glowPrimary scale-105"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-white tracking-wider">EMPLOYMENT</p>
                  <p className="text-[10px] font-mono text-slate-400">Rozgar Nepal</p>
                </div>
              </div>
            </button>
          </div>

          {/* Right: Domain Deep-Dive Inspector */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDomain.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl glass-card border border-slate-800 bg-slate-900/70 space-y-6 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="p-3 rounded-2xl shadow-sm"
                    style={{ backgroundColor: selectedDomain.accentColor, color: selectedDomain.color }}
                  >
                    <selectedDomain.icon size={24} />
                  </span>
                  <div>
                    <span className="text-xs font-mono font-extrabold uppercase tracking-widest" style={{ color: selectedDomain.color }}>
                      {selectedDomain.name} DOMAIN
                    </span>
                    <h3 className="text-2xl font-heading font-extrabold text-white">
                      {selectedDomain.projectTitle}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedDomain.summary}
                </p>

                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Core Technology:</span>
                    <span className="text-white font-medium">{selectedDomain.tech}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Key Result:</span>
                    <span className="text-cyan-300 font-medium">{selectedDomain.metric}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  {relatedProject && onSelectProject && (
                    <button
                      type="button"
                      onClick={() => onSelectProject(relatedProject)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all shadow-md group"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}

                  {relatedProject?.liveUrl && (
                    <a
                      href={relatedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shadow-md"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
