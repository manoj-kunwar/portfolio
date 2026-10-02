import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { experiences } from "../data/experience.js";
import { fadeIn } from "../animations/variants.js";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  MapPin,
  TrendingUp,
  ArrowDown,
} from "lucide-react";

export default function Experience() {
  const [filter, setFilter] = useState("all");
  const shouldReduceMotion = useReducedMotion();

  const filteredExperiences =
    filter === "all"
      ? experiences
      : experiences.filter((e) => e.type === filter);

  // References for timeline scroll calculation
  const timelineRef = useRef(null);

  // Scroll Progress indicator attached to timeline section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Motion variants supporting prefers-reduced-motion
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const nodeVariants = {
    hidden: {
      scale: 1,
      borderColor: "rgba(51, 65, 85, 0.8)", // slate-700
      backgroundColor: "#030712", // slate-950
      boxShadow: "0 0 0px rgba(34, 211, 238, 0)",
    },
    show: {
      scale: shouldReduceMotion ? 1 : 1.15,
      borderColor: "rgba(34, 211, 238, 0.95)", // cyan-400
      backgroundColor: "#0f172a", // slate-900
      boxShadow: "0 0 16px rgba(34, 211, 238, 0.45)",
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="experience"
      aria-label="Experience & Education Timeline"
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Ambient Radial Lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

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
            <Briefcase size={14} />
            <span>Engineering Track & History</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Experience & <span className="text-gradient-primary">Education</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Production systems architecture, real-time streaming engines, and Computer Science academic foundations at Parul University.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          variants={fadeIn("up", 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center gap-2 mb-16 sm:mb-20"
          role="tablist"
          aria-label="Timeline Categories"
        >
          {[
            { id: "all", label: "All Milestones" },
            { id: "experience", label: "Engineering Systems" },
            { id: "education", label: "Education" },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? "text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 shadow-glowPrimary border border-indigo-400/50"
                    : "text-slate-400 glass-card hover:text-white hover:bg-slate-800/80 border border-slate-700/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* 3-Column Alternating Timeline Container */}
        {/* Layout: LEFT COLUMN | 100px CENTER TIMELINE | RIGHT COLUMN */}
        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          
          {/* Persistent Independent Center Spine Line */}
          {/* Mobile: left-6 / left-8 */}
          {/* Desktop: left: 50%; transform: translateX(-50%); */}
          <div
            className="timeline-spine absolute pointer-events-none z-10 w-[2px] -translate-x-1/2 left-6 sm:left-8 md:left-1/2 top-4 bottom-4 rounded-full overflow-hidden"
            aria-hidden="true"
          >
            {/* Base continuous subtle track */}
            <div className="absolute inset-0 bg-slate-800/80 rounded-full" />
            
            {/* Animated progress track with spring scroll */}
            <motion.div
              className="timeline-progress absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-indigo-500 via-cyan-400 to-purple-400 origin-top shadow-[0_0_12px_rgba(34,211,238,0.55)] rounded-full"
              style={{
                scaleY: shouldReduceMotion ? 1 : scaleY,
                opacity: shouldReduceMotion ? 0.6 : 1,
              }}
            />
          </div>

          {/* Scrolling Timeline Content: Sequential Alternating Rows */}
          <div
            className="timeline-content space-y-24 sm:space-y-28 md:space-y-36 lg:space-y-44 relative z-20"
            role="feed"
            aria-label="Career and education milestones"
          >
            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((item, idx) => {
                // Box 1 (idx 0): LEFT and higher
                // Box 2 (idx 1): RIGHT and lower
                // Box 3 (idx 2): LEFT and lower
                // Box 4 (idx 3): RIGHT and lower
                const isLeft = idx % 2 === 0;
                const isLast = idx === filteredExperiences.length - 1;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    className="timeline-item group relative md:grid md:grid-cols-[1fr_100px_1fr] items-start"
                  >
                    {/* Node Marker Attached to the Center Spine */}
                    {/* Mobile: left-6 / left-8 */}
                    {/* Desktop: left: 50%; transform: translateX(-50%); */}
                    <motion.div
                      variants={nodeVariants}
                      className="timeline-node absolute left-6 sm:left-8 md:left-1/2 top-7 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 bg-slate-950 flex items-center justify-center z-20"
                      aria-hidden="true"
                    >
                      {item.type === "education" ? (
                        <GraduationCap size={15} className="text-cyan-400" />
                      ) : (
                        <Briefcase size={15} className="text-cyan-400" />
                      )}
                    </motion.div>

                    {/* Small Downward Arrow on Center Line (between alternating cards) */}
                    {!isLast && (
                      <div
                        className="absolute -bottom-14 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 left-6 sm:left-8 md:left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950 border border-cyan-400/60 text-cyan-300 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.35)]">
                          <ArrowDown
                            size={12}
                            strokeWidth={2.5}
                            className={shouldReduceMotion ? "" : "animate-bounce"}
                          />
                        </div>
                      </div>
                    )}

                    {/* Left Column Spacer (used when card is on the right) */}
                    {!isLeft && (
                      <div className="hidden md:block md:col-start-1 md:col-end-2 h-full" aria-hidden="true" />
                    )}

                    {/* Center 100px Column Spacer */}
                    <div className="hidden md:block md:col-start-2 md:col-end-3 h-full" aria-hidden="true" />

                    {/* Experience Card */}
                    {/* Left boxes strictly in col 1; Right boxes strictly in col 3 */}
                    <div
                      className={`w-[calc(100%-3.5rem)] sm:w-[calc(100%-4.5rem)] ml-14 sm:ml-18 md:ml-0 md:w-full ${
                        isLeft ? "md:col-start-1 md:col-end-2" : "md:col-start-3 md:col-end-4"
                      }`}
                    >
                      <article className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-indigo-500/60 transition-all space-y-4 shadow-xl group">
                        
                        {/* Header: Role, Company & Period */}
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
                              {item.badge}
                            </span>
                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                              <Calendar size={12} className="text-cyan-400" />
                              <time>{item.period}</time>
                            </span>
                          </div>

                          <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors pt-1">
                            {item.role}
                          </h3>
                          <div className="text-xs font-mono text-indigo-400 flex items-center gap-1.5">
                            <span>{item.company}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400 flex items-center gap-0.5">
                              <MapPin size={11} />
                              <span>{item.location}</span>
                            </span>
                          </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="space-y-2 pt-2 border-t border-slate-800/80">
                          {item.responsibilities.map((resp, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                              <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>

                        {/* Measurable Impact */}
                        <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
                          <TrendingUp size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-mono uppercase text-[10px] block text-emerald-400 tracking-wider">
                              Impact & Outcome
                            </strong>
                            <p className="mt-0.5 leading-relaxed">{item.impact}</p>
                          </div>
                        </div>

                        {/* Technologies Used */}
                        <div className="flex flex-wrap gap-1.5 pt-1" aria-label="Technologies used">
                          {item.technology.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                      </article>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}


