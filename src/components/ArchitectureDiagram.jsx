import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Zap } from "lucide-react";

export default function ArchitectureDiagram({ project }) {
  const [activeNode, setActiveNode] = useState(0);

  if (!project || !project.architecture) {
    return (
      <div className="p-8 text-center text-slate-400 font-mono text-xs">
        No architecture diagram defined for this project.
      </div>
    );
  }

  const nodes = project.architecture.nodes || [];
  const selectedNode = nodes[activeNode] || nodes[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <Layers size={16} className="text-cyan-400" />
            <span>{project.architecture.type || "System Architecture & Data Flow"}</span>
          </h4>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Click any architectural layer to inspect its responsibilities, security guards, and data flow.
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60">
          Interactive Topology
        </span>
      </div>

      {/* Interactive Step-by-Step Flow Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((node, index) => {
          const isActive = index === activeNode;
          return (
            <motion.button
              key={node.id || index}
              type="button"
              onClick={() => setActiveNode(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl text-left transition-all border relative overflow-hidden ${
                isActive
                  ? "bg-slate-900 border-cyan-400/80 shadow-glowPrimary"
                  : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              {/* Active top line */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500" />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Layer {index + 1}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-cyan-400 animate-ping" : "bg-slate-600"
                  }`}
                />
              </div>

              <div className="font-heading font-bold text-sm text-white line-clamp-1">
                {node.name}
              </div>
              <div className="text-[11px] font-mono text-indigo-400 mt-0.5">
                {node.role}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Panel */}
      {selectedNode && (
        <motion.div
          key={selectedNode.id || activeNode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 rounded-2xl glass-card border border-indigo-500/30 bg-slate-950/80 space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                Inspecting Layer {activeNode + 1}
              </span>
              <h5 className="text-base sm:text-lg font-heading font-bold text-white">
                {selectedNode.name} — {selectedNode.role}
              </h5>
            </div>
            <div className="px-3 py-1 rounded-lg text-xs font-mono bg-indigo-950/80 text-cyan-300 border border-indigo-800">
              Stack: {selectedNode.tech}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedNode.desc}
          </p>

          <div className="pt-2 text-[11px] font-mono text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
            <Zap size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">System Flow: </strong>
              <span>{project.architecture.flowDescription}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
