import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, skillCategories } from "../data/skills.js";
import { fadeIn, staggerContainer } from "../animations/variants.js";
import {
  Code,
  Atom,
  FileCode2,
  Palette,
  Sparkles,
  Server,
  Cpu,
  Globe,
  Database,
  Cloud,
  GitBranch,
  Send,
  Wrench,
  CheckCircle2,
  X,
  ArrowRight,
  Activity,
} from "lucide-react";
import { DockerIcon, RedisIcon } from "../components/Icons.jsx";

export default function Skills({ onOpenProjectCaseStudy }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const iconMap = {
    Atom: <Atom size={22} className="text-cyan-400" />,
    FileCode2: <FileCode2 size={22} className="text-amber-400" />,
    Palette: <Palette size={22} className="text-sky-400" />,
    Code: <Code size={22} className="text-orange-400" />,
    Sparkles: <Sparkles size={22} className="text-pink-400" />,
    Server: <Server size={22} className="text-emerald-400" />,
    Cpu: <Cpu size={22} className="text-slate-300" />,
    Globe: <Globe size={22} className="text-indigo-400" />,
    Database: <Database size={22} className="text-emerald-400" />,
    Redis: <RedisIcon size={22} className="text-red-500" />,
    Cloud: <Cloud size={22} className="text-amber-500" />,
    Docker: <DockerIcon size={22} className="text-sky-400" />,
    GitBranch: <GitBranch size={22} className="text-red-400" />,
    Activity: <Activity size={22} className="text-cyan-400" />,
    Send: <Send size={22} className="text-purple-400" />,
    CheckCircle2: <CheckCircle2 size={22} className="text-teal-400" />,
  };

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-indigo-500/30 text-xs font-mono text-cyan-400 shadow-sm">
            <Wrench size={14} />
            <span>Interactive Engineering Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient-primary">Architectural Stack</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Click any technology to examine where it was deployed, the related production application, and the exact features built with it.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          variants={fadeIn("up", 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? "text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 shadow-glowPrimary border border-indigo-400/50"
                    : "text-slate-400 glass-card hover:text-white hover:bg-slate-800/80 border border-slate-700/60"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Interactive Skills Grid */}
        <motion.div
          layout
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.id === skill.id;

              return (
                <motion.button
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 sm:p-5 rounded-2xl text-left glass-card border transition-all flex flex-col justify-between group relative overflow-hidden shadow-lg ${
                    isSelected
                      ? "border-cyan-400 bg-slate-900/90 shadow-glowPrimary scale-[1.02]"
                      : "border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="space-y-3 w-full">
                    {/* Top Row: Icon & Proficiency */}
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 group-hover:scale-110 transition-transform">
                        {iconMap[skill.icon] || <Cpu size={22} className="text-cyan-400" />}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Skill Name & Category */}
                    <div>
                      <h3 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {skill.categoryLabel}
                      </span>
                    </div>

                    {/* Quick Where-Used Footnote */}
                    <p className="text-[11px] font-mono text-slate-400 line-clamp-1">
                      {skill.whereUsed}
                    </p>
                  </div>

                  {/* Bottom Tap Indicator */}
                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-indigo-400 group-hover:text-cyan-300 transition-colors w-full">
                    <span>Inspect Stack Use</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Selected Skill Modal / Detail Inspector */}
        <AnimatePresence>
          {selectedSkill && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-detail-title"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 14 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-2xl glass-card border border-indigo-500/40 bg-slate-900/95 dark:bg-[#0B1120]/95 p-6 space-y-5 shadow-2xl text-slate-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-cyan-400">
                      {iconMap[selectedSkill.icon] || <Cpu size={24} />}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                        {selectedSkill.categoryLabel} Stack
                      </span>
                      <h4 id="skill-detail-title" className="text-xl font-heading font-extrabold text-white">
                        {selectedSkill.name}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="Close skill details"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="space-y-3.5 text-xs">
                  {/* Where I Used It */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <strong className="text-cyan-400 font-mono uppercase text-[10px] tracking-wider block">
                      Where I Used It
                    </strong>
                    <p className="text-slate-300 font-mono text-xs">{selectedSkill.whereUsed}</p>
                  </div>

                  {/* What I Built With It */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 font-mono uppercase text-[10px] tracking-wider block">
                      What I Built With It
                    </strong>
                    <p className="text-slate-300 leading-relaxed text-xs">{selectedSkill.whatIBuilt}</p>
                  </div>

                  {/* Related Production Project */}
                  {selectedSkill.relatedProjectTitle && (
                    <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-indigo-400 block uppercase">
                          Related Project
                        </span>
                        <span className="font-heading font-bold text-white text-xs">
                          {selectedSkill.relatedProjectTitle}
                        </span>
                      </div>
                      {selectedSkill.relatedProjectId && onOpenProjectCaseStudy && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSkill(null);
                            onOpenProjectCaseStudy(selectedSkill.relatedProjectId);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1 transition-colors"
                        >
                          <span>Case Study</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
