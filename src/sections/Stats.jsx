import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "../data/achievements.js";
import { fadeIn, staggerContainer } from "../animations/variants.js";
import GsapMagnetic from "../components/GsapMagnetic.jsx";
import {
  Code2,
  Trophy,
  Flame,
  Activity,
  Award,
  CheckCircle2,
} from "lucide-react";

function Counter({ value, duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || start === end) {
      setCount(end || 0);
      return;
    }

    const totalSteps = 45;
    const increment = Math.ceil(end / totalSteps);
    const stepTime = Math.max(16, Math.floor((duration * 1000) / totalSteps));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const iconMap = {
    Code2: <Code2 size={20} className="text-indigo-400" />,
    Trophy: <Trophy size={20} className="text-amber-400" />,
    Flame: <Flame size={20} className="text-cyan-400" />,
    Activity: <Activity size={20} className="text-rose-400" />,
    Award: <Award size={20} className="text-purple-400" />,
    CheckCircle2: <CheckCircle2 size={20} className="text-emerald-400" />,
  };

  const metrics = achievements.metrics;

  return (
    <section className="py-12 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-28 bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer(0.08, 0.04)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {metrics.map((stat, idx) => (
            <motion.div key={stat.id || idx} variants={fadeIn("up", 0.05 * idx)}>
              <GsapMagnetic className="w-full h-full">
                <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-indigo-500/60 flex flex-col items-center text-center shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden h-full justify-between">
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 mb-2 group-hover:scale-110 transition-transform">
                    {iconMap[stat.icon] || <CheckCircle2 size={20} className="text-cyan-400" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white">
                      <Counter value={stat.value} />
                      <span className="text-cyan-400">{stat.suffix}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-semibold tracking-tight">
                      {stat.label}
                    </p>
                    <p className="text-[9px] font-mono text-slate-500">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              </GsapMagnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
