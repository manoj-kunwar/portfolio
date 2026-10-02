import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";

export default function DynamicImage({ src, alt, className = "", priority = false }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    const glare = glareRef.current;

    if (!container || !img) return;

    // GSAP 60fps quickTo setters for 3D tilt
    const xTo = gsap.quickTo(container, "rotateY", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(container, "rotateX", { duration: 0.4, ease: "power2.out" });
    const scaleTo = gsap.quickTo(container, "scale", { duration: 0.4, ease: "power2.out" });
    const imgXTo = gsap.quickTo(img, "x", { duration: 0.5, ease: "power2.out" });
    const imgYTo = gsap.quickTo(img, "y", { duration: 0.5, ease: "power2.out" });

    const glareXTo = glare ? gsap.quickTo(glare, "x", { duration: 0.3, ease: "power1.out" }) : null;
    const glareYTo = glare ? gsap.quickTo(glare, "y", { duration: 0.3, ease: "power1.out" }) : null;
    const glareOpacityTo = glare ? gsap.quickTo(glare, "opacity", { duration: 0.3, ease: "power1.out" }) : null;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const px = mouseX / rect.width - 0.5;
      const py = mouseY / rect.height - 0.5;

      xTo(px * 18);
      yTo(-py * 18);
      scaleTo(1.02);

      imgXTo(px * 10);
      imgYTo(py * 10);

      if (glareXTo && glareYTo && glareOpacityTo) {
        glareXTo(mouseX - 100);
        glareYTo(mouseY - 100);
        glareOpacityTo(0.5);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
      imgXTo(0);
      imgYTo(0);

      if (glareOpacityTo) {
        glareOpacityTo(0);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={`dynamic-image group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
        style={{ perspective: "900px", transformStyle: "preserve-3d" }}
      >
        <div className="dynamic-image__glow" />

        {/* GSAP Glare Effect */}
        <div
          ref={glareRef}
          className="absolute w-48 h-48 rounded-full bg-radial from-cyan-400/30 via-white/10 to-transparent blur-xl pointer-events-none z-20 opacity-0"
          style={{ transform: "translate(-50%, -50%)" }}
        />

        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="dynamic-image__media w-full h-full object-cover object-center transition-filter duration-300"
        />

        <div className="dynamic-image__shade" />
        <div className="dynamic-image__scan" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label={`Expand ${alt}`}
          className="dynamic-image__expand z-30"
        >
          <Expand size={16} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/85 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 18 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[88vh] max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl"
            >
              <img src={src} alt={alt} className="max-h-[88vh] w-full object-contain" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close image preview"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-slate-950/70 text-white backdrop-blur transition hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
