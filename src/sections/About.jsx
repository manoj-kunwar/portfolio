import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile.js";
import { fadeIn } from "../animations/variants.js";
import DynamicImage from "../components/DynamicImage.jsx";
import { MapPin, User } from "lucide-react";

export default function About() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress indicator attached to the About section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Track milestone activations sequentially
  const [activeStep, setActiveStep] = useState(shouldReduceMotion ? 6 : 0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (shouldReduceMotion) {
      if (activeStep !== 6) setActiveStep(6);
      return;
    }
    if (latest >= 0.82) setActiveStep(6);
    else if (latest >= 0.70) setActiveStep(5);
    else if (latest >= 0.55) setActiveStep(4);
    else if (latest >= 0.38) setActiveStep(3);
    else if (latest >= 0.22) setActiveStep(2);
    else if (latest >= 0.06) setActiveStep(1);
    else setActiveStep(0);
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Manoj Kunwar"
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-indigo-500/30 text-xs font-mono text-cyan-400 shadow-sm">
            <User size={14} />
            <span>Engineer Background & Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            About <span className="text-gradient-primary">Manoj Kunwar</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Full-Stack Engineer and Computer Science undergraduate bridging system architecture, low-latency APIs, and algorithmic rigor.
          </p>
        </motion.div>

        {/* Two-Column Layout: Left Profile Image (Unchanged) | Right Engineering System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Existing Developer Workspace Image (Strictly Preserved) */}
          <motion.div
            variants={fadeIn("right", 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl p-2 glass-card border border-slate-800 shadow-2xl">
              <DynamicImage
                src={profile.aboutImage}
                alt="Manoj Kunwar - Full Stack Developer at Work"
                className="h-80 sm:h-[430px] w-full rounded-2xl"
              />
              <div className="p-3.5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <MapPin size={13} />
                  <span>{profile.location}</span>
                </span>
                <span className="text-[11px] text-slate-500">B.Tech CSE &apos;27</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: New Kinetic Engineering Profile System */}
          <motion.div
            variants={fadeIn("left", 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* 1. Header: ENGINEERING PROFILE / 001 */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                  ENGINEERING PROFILE / 001
                </span>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                  Operating Philosophy
                </span>
              </div>
              <div className="h-[1px] w-full bg-gradient-to-r from-cyan-500/40 via-slate-800 to-transparent" />
            </div>

            {/* 2. Kinetic Engineering Path: BUILD -> THINK -> SHIP -> ITERATE */}
            {/* DESKTOP VIEW (lg:block): Alternating architectural path with exact copy */}
            <div className="hidden lg:block relative h-[385px] w-full">
              {/* SVG Continuous Kinetic Path */}
              <svg
                viewBox="0 0 540 380"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="kineticCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>

                {/* Base subtle continuous path */}
                <path
                  d="M 24 30 L 290 120 L 24 210 L 290 300 L 200 345 L 200 375"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />

                {/* Animated scroll-driven path drawing */}
                <motion.path
                  d="M 24 30 L 290 120 L 24 210 L 290 300 L 200 345 L 200 375"
                  fill="none"
                  stroke="url(#kineticCyanGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    pathLength: shouldReduceMotion ? 1 : smoothProgress,
                  }}
                />

                {/* Downward terminating arrow at center */}
                <polygon
                  points="196,370 204,370 200,378"
                  fill={activeStep >= 5 || shouldReduceMotion ? "#22d3ee" : "#334155"}
                  className="transition-colors duration-300"
                />

                {/* Horizontal Ticks and Nodes */}
                {/* Node 1: BUILD */}
                <circle
                  cx="24"
                  cy="30"
                  r={activeStep >= 1 || shouldReduceMotion ? 5 : 3.5}
                  className={`transition-all duration-300 ${
                    activeStep >= 1 || shouldReduceMotion
                      ? "fill-cyan-400 stroke-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "fill-slate-900 stroke-slate-700"
                  }`}
                  strokeWidth="1.5"
                />
                <line
                  x1="24"
                  y1="30"
                  x2="54"
                  y2="30"
                  className={`transition-colors duration-300 ${
                    activeStep >= 1 || shouldReduceMotion ? "stroke-cyan-400/80" : "stroke-slate-800"
                  }`}
                  strokeWidth="1.5"
                />

                {/* Node 2: THINK */}
                <circle
                  cx="290"
                  cy="120"
                  r={activeStep >= 2 || shouldReduceMotion ? 5 : 3.5}
                  className={`transition-all duration-300 ${
                    activeStep >= 2 || shouldReduceMotion
                      ? "fill-cyan-400 stroke-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "fill-slate-900 stroke-slate-700"
                  }`}
                  strokeWidth="1.5"
                />
                <line
                  x1="290"
                  y1="120"
                  x2="320"
                  y2="120"
                  className={`transition-colors duration-300 ${
                    activeStep >= 2 || shouldReduceMotion ? "stroke-cyan-400/80" : "stroke-slate-800"
                  }`}
                  strokeWidth="1.5"
                />

                {/* Node 3: SHIP */}
                <circle
                  cx="24"
                  cy="210"
                  r={activeStep >= 3 || shouldReduceMotion ? 5 : 3.5}
                  className={`transition-all duration-300 ${
                    activeStep >= 3 || shouldReduceMotion
                      ? "fill-cyan-400 stroke-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "fill-slate-900 stroke-slate-700"
                  }`}
                  strokeWidth="1.5"
                />
                <line
                  x1="24"
                  y1="210"
                  x2="54"
                  y2="210"
                  className={`transition-colors duration-300 ${
                    activeStep >= 3 || shouldReduceMotion ? "stroke-cyan-400/80" : "stroke-slate-800"
                  }`}
                  strokeWidth="1.5"
                />

                {/* Node 4: ITERATE */}
                <circle
                  cx="290"
                  cy="300"
                  r={activeStep >= 4 || shouldReduceMotion ? 5 : 3.5}
                  className={`transition-all duration-300 ${
                    activeStep >= 4 || shouldReduceMotion
                      ? "fill-cyan-400 stroke-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      : "fill-slate-900 stroke-slate-700"
                  }`}
                  strokeWidth="1.5"
                />
                <line
                  x1="290"
                  y1="300"
                  x2="320"
                  y2="300"
                  className={`transition-colors duration-300 ${
                    activeStep >= 4 || shouldReduceMotion ? "stroke-cyan-400/80" : "stroke-slate-800"
                  }`}
                  strokeWidth="1.5"
                />
              </svg>

              {/* Milestone HTML Labels with Restrained Motion (blur-to-sharp & 0.98 -> 1) */}
              {/* Milestone 1: BUILD */}
              <motion.div
                style={{ top: "16px", left: "64px", maxWidth: "230px" }}
                className="absolute"
                animate={
                  activeStep >= 1 || shouldReduceMotion
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0.35, scale: 0.98, filter: "blur(0.5px)" }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h4 className={`font-heading font-extrabold text-sm tracking-wider transition-colors duration-300 ${
                  activeStep >= 1 || shouldReduceMotion ? "text-white" : "text-slate-500"
                }`}>
                  BUILD
                </h4>
                <motion.p
                  animate={
                    activeStep >= 1 || shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.2, y: 3 }
                  }
                  transition={{ duration: 0.35 }}
                  className={`font-mono text-xs leading-relaxed mt-0.5 ${
                    activeStep >= 1 || shouldReduceMotion ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Turn ideas into structured, maintainable products.
                </motion.p>
              </motion.div>

              {/* Milestone 2: THINK */}
              <motion.div
                style={{ top: "106px", left: "330px", maxWidth: "230px" }}
                className="absolute"
                animate={
                  activeStep >= 2 || shouldReduceMotion
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0.35, scale: 0.98, filter: "blur(0.5px)" }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h4 className={`font-heading font-extrabold text-sm tracking-wider transition-colors duration-300 ${
                  activeStep >= 2 || shouldReduceMotion ? "text-white" : "text-slate-500"
                }`}>
                  THINK
                </h4>
                <motion.p
                  animate={
                    activeStep >= 2 || shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.2, y: 3 }
                  }
                  transition={{ duration: 0.35 }}
                  className={`font-mono text-xs leading-relaxed mt-0.5 ${
                    activeStep >= 2 || shouldReduceMotion ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Break complex problems into clear systems and efficient solutions.
                </motion.p>
              </motion.div>

              {/* Milestone 3: SHIP */}
              <motion.div
                style={{ top: "196px", left: "64px", maxWidth: "230px" }}
                className="absolute"
                animate={
                  activeStep >= 3 || shouldReduceMotion
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0.35, scale: 0.98, filter: "blur(0.5px)" }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h4 className={`font-heading font-extrabold text-sm tracking-wider transition-colors duration-300 ${
                  activeStep >= 3 || shouldReduceMotion ? "text-white" : "text-slate-500"
                }`}>
                  SHIP
                </h4>
                <motion.p
                  animate={
                    activeStep >= 3 || shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.2, y: 3 }
                  }
                  transition={{ duration: 0.35 }}
                  className={`font-mono text-xs leading-relaxed mt-0.5 ${
                    activeStep >= 3 || shouldReduceMotion ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Build reliable experiences across the frontend, backend, and data layer.
                </motion.p>
              </motion.div>

              {/* Milestone 4: ITERATE */}
              <motion.div
                style={{ top: "286px", left: "330px", maxWidth: "230px" }}
                className="absolute"
                animate={
                  activeStep >= 4 || shouldReduceMotion
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0.35, scale: 0.98, filter: "blur(0.5px)" }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h4 className={`font-heading font-extrabold text-sm tracking-wider transition-colors duration-300 ${
                  activeStep >= 4 || shouldReduceMotion ? "text-white" : "text-slate-500"
                }`}>
                  ITERATE
                </h4>
                <motion.p
                  animate={
                    activeStep >= 4 || shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.2, y: 3 }
                  }
                  transition={{ duration: 0.35 }}
                  className={`font-mono text-xs leading-relaxed mt-0.5 ${
                    activeStep >= 4 || shouldReduceMotion ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Measure, refine, optimize, and keep improving the system.
                </motion.p>
              </motion.div>
            </div>

            {/* MOBILE VIEW (< lg): Linear left-aligned path with exact copy */}
            <div className="block lg:hidden relative pl-8 py-2 space-y-7">
              {/* Left vertical path */}
              <div className="absolute left-2.5 top-2 bottom-2 w-[2px]">
                <div className="absolute inset-0 bg-slate-800/80 rounded-full" />
                <motion.div
                  className="absolute inset-x-0 top-0 bg-gradient-to-b from-indigo-500 via-cyan-400 to-purple-400 origin-top rounded-full"
                  style={{
                    height: "100%",
                    scaleY: shouldReduceMotion ? 1 : Math.min(1, activeStep / 4),
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {[
                { id: 1, name: "BUILD", desc: "Turn ideas into structured, maintainable products." },
                { id: 2, name: "THINK", desc: "Break complex problems into clear systems and efficient solutions." },
                { id: 3, name: "SHIP", desc: "Build reliable experiences across the frontend, backend, and data layer." },
                { id: 4, name: "ITERATE", desc: "Measure, refine, optimize, and keep improving the system." },
              ].map((m) => {
                const isActive = activeStep >= m.id || shouldReduceMotion;
                return (
                  <motion.div
                    key={m.name}
                    animate={
                      isActive
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0.35, x: shouldReduceMotion ? 0 : -4 }
                    }
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div
                      className={`absolute -left-[1.95rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        isActive
                          ? "bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)] scale-110"
                          : "bg-slate-900 border-slate-700"
                      }`}
                    />
                    <div className="space-y-1">
                      <span
                        className={`font-heading font-extrabold text-sm tracking-wider transition-colors ${
                          isActive ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {m.name}
                      </span>
                      <p
                        className={`font-mono text-xs leading-relaxed transition-colors ${
                          isActive ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {m.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 3. Editorial Block: ENGINEERING DNA */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span>ENGINEERING DNA</span>
                </h3>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                  Core Architectural Tenets
                </span>
              </div>

              {/* 6 Principles in Clean Editorial Layout with Exact User Copy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-1">
                {[
                  { name: "Performance", desc: "Build with efficiency in mind." },
                  { name: "Modularity", desc: "Keep systems understandable and adaptable." },
                  { name: "Security", desc: "Treat trust and data protection as architectural concerns." },
                  { name: "Scalability", desc: "Design beyond the immediate use case." },
                  { name: "UX", desc: "Make technical complexity feel simple to the user." },
                  { name: "Reliability", desc: "Build systems that behave predictably." },
                ].map((item, pIdx) => {
                  const isRevealed = activeStep >= 5 || shouldReduceMotion;
                  return (
                    <motion.div
                      key={item.name}
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 4 }}
                      animate={
                        isRevealed
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0.35, y: shouldReduceMotion ? 0 : 4 }
                      }
                      transition={{
                        duration: 0.3,
                        delay: shouldReduceMotion ? 0 : pIdx * 0.05,
                        ease: "easeOut",
                      }}
                      className="group cursor-default py-0.5"
                    >
                      <div className="text-xs font-mono leading-relaxed">
                        <strong className="font-heading font-extrabold text-xs sm:text-sm tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </strong>
                        <span className="text-cyan-400/80 mx-2 font-mono">—</span>
                        <span className="text-slate-300">{item.desc}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Connecting Vertical Track between DNA and Academic Foundation */}
            <div className="flex flex-col items-center justify-center my-1" aria-hidden="true">
              <div className="w-[1.5px] h-5 bg-gradient-to-b from-cyan-500/50 to-cyan-400" />
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-cyan-400">
                <path d="M1 1L5 6L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 4. Academic Foundation: Degree & Animated Horizontal Timeline */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span>ACADEMIC FOUNDATION</span>
                </h3>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                  Degree Foundation
                </span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                  B.Tech • Computer Science & Engineering
                </h4>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Systems Architecture, Operating Systems & Algorithmic Design
                </p>
              </div>

              {/* 2023 ●────────────────● 2027 Horizontal Timeline */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span className="font-bold">2023</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold">2027</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </span>
                </div>

                <div className="relative h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-400 origin-left"
                    initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                    animate={{
                      scaleX: activeStep >= 6 || shouldReduceMotion ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
                  <span className="text-slate-200 font-semibold">Parul University</span>
                  <span className="text-slate-500">Vadodara, Gujarat • 7.64 CGPA</span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
