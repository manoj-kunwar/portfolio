import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1120] text-white"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated Brand Pulse */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-cyan-500 to-purple-500 animate-pulse p-0.5 shadow-glowPrimary">
            <div className="w-full h-full bg-[#0B1120] rounded-[14px] flex items-center justify-center font-heading font-extrabold text-2xl text-white">
              MK
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-1 text-xs font-mono text-slate-400 tracking-widest uppercase">
          <span>Loading portfolio</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-100">.</span>
          <span className="animate-bounce delay-200">.</span>
        </div>
      </div>
    </motion.div>
  );
}
