import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, BookOpen, Lock, Globe } from "lucide-react";
import { GithubIcon } from "./Icons.jsx";
import DynamicImage from "./DynamicImage.jsx";

export default function ProjectTiltCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    setIsTouchDevice(isTouch);
  }, []);

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for 3D rotation (max 6 degrees)
  const springConfig = { stiffness: 260, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5.5, -5.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5.5, 5.5]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const isCommunityProject = project.id === "high-school-youth-club";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl overflow-hidden glass-card border transition-colors flex flex-col h-full group ${
        isCommunityProject
          ? "border-amber-500/30 hover:border-amber-400/80 bg-slate-900/60"
          : "border-slate-800/80 hover:border-cyan-500/60 bg-slate-900/50"
      }`}
    >
      {/* Subtle border shine follower */}
      {!isTouchDevice && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isCommunityProject
              ? "radial-gradient(400px circle at center, rgba(245, 158, 11, 0.12), transparent 70%)"
              : "radial-gradient(400px circle at center, rgba(56, 189, 248, 0.12), transparent 70%)",
          }}
        />
      )}

      {/* Media Preview Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950/80 cursor-pointer" onClick={() => onSelect(project)}>
        <motion.div
          style={{
            x: isTouchDevice ? 0 : imageX,
            y: isTouchDevice ? 0 : imageY,
            scale: isHovered ? 1.05 : 1,
            transition: "scale 0.4s ease-out",
          }}
          className="w-full h-full"
        >
          <DynamicImage
            src={project.image}
            fallbackSrc={project.imageFallback}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide backdrop-blur-md shadow-md ${
              isCommunityProject
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-slate-950/80 text-cyan-400 border border-slate-700/80"
            }`}
          >
            {project.categoryLabel}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-slate-950/80 border border-slate-800 backdrop-blur-md">
            {project.year}
          </span>
        </div>

        {/* Part 11: Premium Mini Browser Preview for High School Youth Club */}
        {isCommunityProject && isHovered && !isTouchDevice && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-3 bottom-3 p-3 rounded-2xl bg-slate-950/95 border border-amber-500/40 backdrop-blur-xl shadow-2xl z-20 space-y-2 pointer-events-none"
          >
            <div className="flex items-center gap-1.5 pb-1 border-b border-slate-800">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
              <span className="text-[10px] font-mono text-slate-400 pl-1 truncate">
                youth-club-frontend-eight.vercel.app
              </span>
            </div>
            <div className="text-left space-y-0.5">
              <p className="text-xs font-bold text-white tracking-wide">
                HIGH SCHOOL YOUTH CLUB
              </p>
              <p className="text-[11px] text-amber-300/90 font-medium">
                Empowering Nepali Youth • Transforming Communities
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                Events • Programs • Members • Notices
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div>
            <h3
              onClick={() => onSelect(project)}
              className="text-xl font-heading font-extrabold text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {project.title}
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">
              {project.subtitle}
            </p>
            {project.location && (
              <p className="text-[11px] font-mono text-amber-400/90 flex items-center gap-1 mt-1">
                <Globe size={11} />
                <span>{project.location}</span>
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
            {project.summary}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400 bg-slate-800/40">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/90 hover:border-cyan-400/50 transition-all shadow-sm group/btn"
          >
            <BookOpen size={13} className="text-cyan-400 group-hover/btn:scale-110 transition-transform" />
            <span>Case Study</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} GitHub Repository`}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors"
              >
                <GithubIcon size={16} />
              </a>
            ) : project.isPrivate ? (
              <span
                title="Private Repository"
                className="p-2 rounded-xl text-slate-500 bg-slate-800/30 border border-slate-800 cursor-not-allowed"
              >
                <Lock size={15} />
              </span>
            ) : null}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} Live Website`}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                  isCommunityProject
                    ? "bg-amber-600 hover:bg-amber-500 shadow-amber-900/30"
                    : "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/30"
                }`}
              >
                <span>Live Site</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
