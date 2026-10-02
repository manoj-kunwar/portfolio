import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "../data/projects.js";
import { fadeIn, staggerContainer } from "../animations/variants.js";
import ProjectTiltCard from "../components/ProjectTiltCard.jsx";
import { FolderCode } from "lucide-react";

export default function Projects({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter(
          (p) =>
            p.category === activeCategory ||
            p.categories?.includes(activeCategory)
        );

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-indigo-600/10 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />

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
            <FolderCode size={14} />
            <span>Systems & Platforms Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From low-latency telemedicine architectures to grassroots community platforms—engineered with clean boundaries, high performance, and real human utility.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          variants={fadeIn("up", 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-14"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 ${
                  isSelected
                    ? "text-white shadow-md border border-cyan-400/40 bg-slate-800/90"
                    : "text-slate-400 hover:text-slate-200 border border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/50"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="projectActiveCategoryPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Animated Project Grid */}
        <motion.div
          layout
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                variants={fadeIn("up", 0.1)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectTiltCard
                  project={project}
                  onSelect={onSelectProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
