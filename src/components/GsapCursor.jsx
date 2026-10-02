import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GsapCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const labelRef = useRef(null);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch/coarse devices or reduced-motion preferences
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) {
      setIsActive(false);
      return;
    }

    setIsActive(true);

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX - 3);
      setDotY(mouseY - 3);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Smooth trailing ring loop
    let animId;
    const render = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      gsap.set(ring, {
        x: ringX - 16,
        y: ringY - 16,
      });

      if (label) {
        gsap.set(label, {
          x: ringX + 18,
          y: ringY - 10,
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Contextual hover inspector
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const communityLink = target.closest("a[href*='youth-club'], [data-cursor='community']");
      const joinBtn = target.closest("[data-cursor='join']");
      const architectureTarget = target.closest("[data-cursor='architecture']");
      const projectCard = target.closest("[data-cursor='project'], .project-card");
      const githubLink = target.closest("a[href*='github.com']");
      const linkedinLink = target.closest("a[href*='linkedin.com']");
      const externalLink = target.closest("a[target='_blank']");
      const clickable = target.closest("button, a, input, select, textarea, [role='button'], [data-cursor='clickable']");
      const customLabel = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");

      if (customLabel) {
        setCursorLabel(customLabel);
        gsap.to(ring, {
          scale: 1.6,
          borderColor: "rgba(56, 189, 248, 0.8)",
          backgroundColor: "rgba(56, 189, 248, 0.12)",
          duration: 0.2,
        });
      } else if (communityLink) {
        setCursorLabel("COMMUNITY");
        gsap.to(ring, {
          scale: 1.7,
          borderColor: "rgba(245, 158, 11, 0.9)",
          backgroundColor: "rgba(245, 158, 11, 0.15)",
          duration: 0.2,
        });
      } else if (joinBtn) {
        setCursorLabel("JOIN");
        gsap.to(ring, {
          scale: 1.5,
          borderColor: "rgba(239, 68, 68, 0.9)",
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          duration: 0.2,
        });
      } else if (architectureTarget) {
        setCursorLabel("ARCHITECTURE");
        gsap.to(ring, {
          scale: 1.7,
          borderColor: "rgba(6, 182, 212, 0.9)",
          backgroundColor: "rgba(6, 182, 212, 0.15)",
          duration: 0.2,
        });
      } else if (projectCard) {
        setCursorLabel("CASE STUDY");
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "rgba(99, 102, 241, 0.9)",
          backgroundColor: "rgba(99, 102, 241, 0.15)",
          duration: 0.2,
        });
      } else if (githubLink) {
        setCursorLabel("GITHUB");
        gsap.to(ring, {
          scale: 1.5,
          borderColor: "rgba(240, 80, 50, 0.9)",
          backgroundColor: "rgba(240, 80, 50, 0.1)",
          duration: 0.2,
        });
      } else if (linkedinLink) {
        setCursorLabel("LINKEDIN");
        gsap.to(ring, {
          scale: 1.5,
          borderColor: "rgba(10, 102, 194, 0.9)",
          backgroundColor: "rgba(10, 102, 194, 0.1)",
          duration: 0.2,
        });
      } else if (externalLink) {
        setCursorLabel("LIVE");
        gsap.to(ring, {
          scale: 1.4,
          borderColor: "rgba(6, 182, 212, 0.8)",
          backgroundColor: "rgba(6, 182, 212, 0.1)",
          duration: 0.2,
        });
      } else if (clickable) {
        setCursorLabel("");
        gsap.to(ring, {
          scale: 1.25,
          borderColor: "rgba(56, 189, 248, 0.8)",
          backgroundColor: "rgba(56, 189, 248, 0.08)",
          duration: 0.2,
        });
        gsap.to(dot, {
          scale: 0.7,
          backgroundColor: "#38bdf8",
          duration: 0.15,
        });
      } else {
        setCursorLabel("");
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(56, 189, 248, 0.35)",
          backgroundColor: "transparent",
          duration: 0.2,
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#38bdf8",
          duration: 0.15,
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isActive) return null;

  return (
    <>
      {/* Precision inner center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[99999] hidden lg:block shadow-[0_0_8px_#38bdf8]"
        style={{ willChange: "transform" }}
      />

      {/* Outer interactive ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/40 pointer-events-none z-[99998] hidden lg:block"
        style={{ willChange: "transform" }}
      />

      {/* Floating contextual tag */}
      {cursorLabel && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-[99999] hidden lg:flex items-center px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-slate-950/90 text-cyan-300 border border-cyan-500/40 shadow-lg backdrop-blur-md whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {cursorLabel}
        </div>
      )}
    </>
  );
}
