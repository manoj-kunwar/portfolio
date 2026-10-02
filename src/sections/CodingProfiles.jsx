import { motion } from "framer-motion";
import { achievements } from "../data/achievements.js";
import { certifications } from "../data/certifications.js";
import { fadeIn, staggerContainer } from "../animations/variants.js";
import GsapMagnetic from "../components/GsapMagnetic.jsx";
import { ExternalLink, Trophy, Award } from "lucide-react";

export default function CodingProfiles() {
  const profiles = achievements.profiles;

  return (
    <section id="achievements" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />

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
            <Trophy size={14} className="text-amber-400" />
            <span>Algorithmic Rigor & Verified Records</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Coding Profiles & <span className="text-gradient-primary">Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Verified competitive programming ratings, 1025+ DSA problem submissions, continuous streak milestones, and industry certifications.
          </p>
        </motion.div>

        {/* Profiles Grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {profiles.map((item, idx) => (
            <motion.div
              key={item.name}
              variants={fadeIn("up", 0.06 * idx)}
              className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-3.5">
                {/* Header with Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img
                      src={item.iconUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 text-cyan-300 border border-indigo-800/40">
                    {item.highlight}
                  </span>
                </div>

                {/* Profile Name & Handle */}
                <div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono mt-0.5">
                    {item.handle}
                  </p>
                </div>

                {/* Stats Detail */}
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <GsapMagnetic className="w-full">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 text-slate-300 hover:text-white text-xs font-mono font-semibold border border-slate-800 hover:border-transparent transition-all shadow-sm"
                  >
                    <span>View Profile</span>
                    <ExternalLink size={12} />
                  </a>
                </GsapMagnetic>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Sub-Section */}
        <div className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="flex items-center gap-2 mb-6">
            <Award size={18} className="text-cyan-400" />
            <h3 className="text-xl font-heading font-bold text-white">
              Verified Professional Certifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl glass-card border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    {cert.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {cert.year}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-sm text-white">
                  {cert.title}
                </h4>
                <p className="text-xs font-mono text-indigo-400">
                  {cert.issuer}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
