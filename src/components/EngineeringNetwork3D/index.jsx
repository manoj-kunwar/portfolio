import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ErrorBoundary from "../ErrorBoundary.jsx";
import StaticFallback from "./StaticFallback.jsx";
import { X, ArrowRight } from "lucide-react";

// Lazy-load Three.js Canvas
const EngineeringNetworkCanvas = lazy(() => import("./Scene.jsx"));

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function EngineeringNetwork3D({ onNodeSelect, onOpenProject }) {
  const containerRef = useRef(null);
  const [canRender3D, setCanRender3D] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);

    const isDesktop = window.innerWidth >= 768;
    const hasWebGL = isWebGLAvailable();
    setCanRender3D(isDesktop && hasWebGL);

    let observer;
    if (containerRef.current && window.IntersectionObserver) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      motionQuery.removeEventListener("change", motionHandler);
      if (observer) observer.disconnect();
    };
  }, []);

  const handleNodeClick = (node) => {
    setActiveNode(node);
    if (onNodeSelect) onNodeSelect(node);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Scene or 2D Accessible Fallback */}
      <div className="w-full h-full relative">
        <ErrorBoundary
          fallbackTitle="Interactive visualization unavailable"
          fallback={<StaticFallback mode="engineering" onNodeSelect={handleNodeClick} />}
        >
          {canRender3D && isVisible && !reducedMotion ? (
            <Suspense fallback={<StaticFallback mode="engineering" onNodeSelect={handleNodeClick} />}>
              <EngineeringNetworkCanvas
                mode="engineering"
                onNodeSelect={handleNodeClick}
                reducedMotion={reducedMotion}
              />
            </Suspense>
          ) : (
            <StaticFallback mode="engineering" onNodeSelect={handleNodeClick} />
          )}
        </ErrorBoundary>
      </div>

      {/* Interactive Node Detail Floating Panel */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 p-4 rounded-2xl glass-card border border-slate-700 bg-slate-950/95 backdrop-blur-xl shadow-2xl z-30 space-y-2 text-left"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: activeNode.color }}
                />
                <div>
                  <h4 className="text-sm font-bold font-heading text-white">
                    {activeNode.name}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">{activeNode.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveNode(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close details"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeNode.desc || "Architectural component in active production stack."}
            </p>

            {activeNode.project && onOpenProject && (
              <button
                type="button"
                onClick={() => onOpenProject(activeNode.project)}
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors group"
              >
                <span>View Related Project</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
