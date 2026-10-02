import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile.js";
import EngineeringNetwork3D from "../components/EngineeringNetwork3D/index.jsx";
import GsapMagnetic from "../components/GsapMagnetic.jsx";
import {
  ArrowRight,
  FileText,
  Terminal,
  Database,
  Layers,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { projects } from "../data/projects.js";
import { GithubIcon, LinkedinIcon } from "../components/Icons.jsx";

export default function Hero({ onOpenResume, onSelectProject }) {
  const [selectedNodeInfo, setSelectedNodeInfo] = useState(null);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNodeInfo(node);
  }, []);

  const handleOpenProjectById = useCallback((projectId) => {
    const found = projects.find((p) => p.id === projectId);
    if (found && onSelectProject) {
      onSelectProject(found);
    }
  }, [onSelectProject]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Atmospheric Lighting */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Signature Typography & Engineering Positioning */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Availability & Location Chip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-indigo-500/30 text-xs font-mono text-cyan-300 shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-300 font-semibold">{profile.availability}</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline flex items-center gap-1">
                <MapPin size={11} className="text-cyan-400 inline" />
                {profile.location}
              </span>
            </motion.div>

            {/* Display Typography */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span className="text-xs sm:text-sm font-mono tracking-widest text-indigo-400 uppercase font-bold block mb-1">
                  {profile.name} — Full-Stack Engineer
                </span>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.08]">
                  I BUILD <br />
                  <span className="text-gradient-primary">
                    DIGITAL SYSTEMS.
                  </span>
                </h1>
              </motion.div>

              {/* Supporting Statement */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal"
              >
                {profile.supportingStatement}
              </motion.p>
            </div>

            {/* Key Proof Points */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"
            >
              <div className="p-3 rounded-xl glass-card border border-slate-800/80 space-y-0.5">
                <div className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-1.5">
                  <Layers size={16} className="text-indigo-400" />
                  <span>3 Systems</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Production MERN Apps
                </div>
              </div>

              <div className="p-3 rounded-xl glass-card border border-slate-800/80 space-y-0.5">
                <div className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-1.5">
                  <Terminal size={16} className="text-cyan-400" />
                  <span>1025+ DSA</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Solved • 1668 Peak Rating
                </div>
              </div>

              <div className="p-3 rounded-xl glass-card border border-slate-800/80 space-y-0.5">
                <div className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-1.5">
                  <Database size={16} className="text-emerald-400" />
                  <span>&lt; 200ms</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Target API Latency
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <GsapMagnetic>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 shadow-glowPrimary hover:opacity-95 transition-all flex items-center gap-2 group"
                >
                  <span>Explore Engineered Projects</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </GsapMagnetic>

              <GsapMagnetic>
                <button
                  onClick={onOpenResume}
                  className="px-5 py-3.5 rounded-xl font-heading font-semibold text-sm text-slate-200 glass-card border border-slate-700 hover:border-cyan-400/60 hover:text-white transition-all flex items-center gap-2"
                >
                  <FileText size={16} className="text-cyan-400" />
                  <span>View Resume</span>
                </button>
              </GsapMagnetic>

              <GsapMagnetic>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-4 py-3.5 rounded-xl font-heading font-medium text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Get In Touch →
                </button>
              </GsapMagnetic>
            </motion.div>

            {/* Social Handles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 pt-2 text-slate-400 text-xs font-mono"
            >
              <a
                href="https://github.com/manoj-kunwar"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <GithubIcon size={16} />
                <span>github/manoj-kunwar</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href="https://www.linkedin.com/in/manoj-kunwar56"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <LinkedinIcon size={16} />
                <span>linkedin/manoj-kunwar56</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Engineering Network */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* 3D Scene Wrapper with Glow Halo */}
            <div className="relative w-full aspect-square max-w-[480px] lg:max-w-none rounded-3xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Top Bar Indicator */}
              <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    Architecture Network
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  Interactive 3D
                </span>
              </div>

              {/* The Three.js 3D Scene */}
              <EngineeringNetwork3D
                onNodeSelect={handleNodeSelect}
                onOpenProject={handleOpenProjectById}
              />

              {/* Bottom Interactive Prompt / Node Inspector */}
              <div className="absolute bottom-3 left-4 right-4 z-20">
                {selectedNodeInfo ? (
                  <div className="p-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: selectedNodeInfo.color }}
                      />
                      <span className="font-bold text-white">{selectedNodeInfo.name}</span>
                      <span className="text-slate-400">({selectedNodeInfo.role})</span>
                    </div>
                    <button
                      onClick={() => scrollToSection("skills")}
                      className="text-cyan-400 hover:text-white underline text-[11px]"
                    >
                      View in Skills →
                    </button>
                  </div>
                ) : (
                  <div className="text-[10px] font-mono text-slate-400 text-center bg-slate-900/60 py-1.5 px-3 rounded-lg border border-slate-800/60 backdrop-blur-sm">
                    Hover or drag nodes to inspect core stack architecture
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-slate-500 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
