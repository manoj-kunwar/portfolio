import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  FileText,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Printer,
  Award,
} from "lucide-react";
import { profile } from "../data/profile.js";
import { experiences } from "../data/experience.js";
import { certifications } from "../data/certifications.js";

export default function ResumeModal({ open, onClose }) {
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      previouslyFocusedElementRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
        if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === "function") {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden bg-slate-900/95 dark:bg-[#0B1120]/95 text-slate-200 space-y-6"
        >
          {/* Top Gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close resume modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 pr-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
                <FileText size={24} />
              </div>
              <div>
                <h3 id="resume-modal-title" className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  {profile.name} — Curriculum Vitae
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  {profile.role} • {profile.education.institution}
                </p>
              </div>
            </div>

            {/* Quick Actions Header */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={profile.resumePdf}
                download="Manoj_Kunwar_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-indigo-600 via-cyan-600 to-purple-600 shadow-glowPrimary hover:opacity-90 transition-opacity"
              >
                <Download size={14} />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={profile.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-slate-300 glass-card border border-slate-700 hover:text-white hover:border-cyan-400 transition-colors"
              >
                <span>View PDF</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Resume Content Body */}
          <div className="space-y-6 max-h-[62vh] overflow-y-auto pr-2 custom-scrollbar text-slate-300 text-sm">
            
            {/* Education Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <div className="flex items-center gap-2 text-indigo-400 font-heading font-bold text-sm">
                  <GraduationCap size={18} />
                  <span>Education</span>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  {profile.education.duration} • CGPA: {profile.education.gpa}
                </span>
              </div>
              <p className="font-heading font-bold text-white text-base">
                {profile.education.degree}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                {profile.education.institution}, {profile.education.campus}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {profile.education.focus.map((f, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Engineering Experiences */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-heading font-bold text-sm">
                <Briefcase size={18} />
                <span>Production Engineering Experience</span>
              </div>

              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="font-heading font-bold text-sm text-white">
                      {exp.role} — <span className="text-cyan-400">{exp.company}</span>
                    </h4>
                    <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {exp.responsibilities.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-1 text-[11px] font-mono text-emerald-400">
                    Impact: {exp.impact}
                  </div>
                </div>
              ))}
            </div>

            {/* Verified Certifications */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-heading font-bold text-sm">
                <Award size={18} />
                <span>Industry Certifications</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{cert.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{cert.year}</span>
                    </div>
                    <p className="text-[11px] font-mono text-indigo-400">{cert.issuer}</p>
                    <p className="text-[11px] text-slate-400">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-4">
              <a
                href={profile.resumeHtml}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                title="Print or save as PDF via browser print view"
              >
                <Printer size={14} />
                <span>Print / Save Resume as PDF (HTML View)</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={profile.resumePdf}
                download="Manoj_Kunwar_Resume.pdf"
                className="px-4 py-2 rounded-xl text-xs font-bold font-mono text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>Download Resume</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
