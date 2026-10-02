import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import useTheme from "./hooks/useTheme.js";
import Navbar from "./components/Navbar.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import BackToTop from "./components/BackToTop.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import GsapCursor from "./components/GsapCursor.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Sections
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Stats from "./sections/Stats.jsx";
import Skills from "./sections/Skills.jsx";
import Projects from "./sections/Projects.jsx";
import Experience from "./sections/Experience.jsx";
import CodingProfiles from "./sections/CodingProfiles.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import SystemsInMotion from "./sections/SystemsInMotion.jsx";
import { projects } from "./data/projects.js";

// Lazy-loaded heavy overlays
const CommandPalette = lazy(() => import("./components/CommandPalette.jsx"));
const ProjectCaseStudyModal = lazy(() => import("./components/ProjectCaseStudyModal.jsx"));
const ResumeModal = lazy(() => import("./components/ResumeModal.jsx"));

export default function App() {
  const { theme, toggle } = useTheme();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [caseStudyProject, setCaseStudyProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Splash screen timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    const handleToggleCommand = () => {
      setCommandPaletteOpen((prev) => !prev);
    };

    window.addEventListener("toggle-command-palette", handleToggleCommand);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("toggle-command-palette", handleToggleCommand);
    };
  }, []);

  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  const handleOpenCaseStudyById = useCallback((projectId) => {
    const found = projects.find((p) => p.id === projectId);
    if (found) setCaseStudyProject(found);
  }, []);

  return (
    <ErrorBoundary fallbackTitle="Portfolio Encountered an Unexpected Error">
      <div className={`min-h-screen relative overflow-x-hidden ${theme === "light" ? "light" : ""}`}>
        {/* Custom Contextual GSAP Cursor (Desktop Only) */}
        <GsapCursor />

        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>

        {/* Global Scroll Progress */}
        <ScrollProgress />

        {/* Sticky Header Navbar */}
        <Navbar theme={theme} toggleTheme={toggle} onOpenResume={openResume} />

        {/* Main Content Sections */}
        <main className="relative">
          <Hero
            onOpenResume={openResume}
            onSelectProject={(p) => setCaseStudyProject(p)}
          />
          <About />
          <Stats />
          <SystemsInMotion onSelectProject={(p) => setCaseStudyProject(p)} />
          <Projects onSelectProject={(p) => setCaseStudyProject(p)} />
          <Skills onOpenProjectCaseStudy={handleOpenCaseStudyById} />
          <Experience />
          <CodingProfiles />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Back To Top */}
        <BackToTop />

        {/* Lazy Loaded Keyboard Command Palette */}
        <Suspense fallback={null}>
          {commandPaletteOpen && (
            <CommandPalette
              open={commandPaletteOpen}
              onClose={() => setCommandPaletteOpen(false)}
              toggleTheme={toggle}
              theme={theme}
              onOpenResume={openResume}
              onSelectProject={(p) => setCaseStudyProject(p)}
            />
          )}
        </Suspense>

        {/* Lazy Loaded Detailed Case Study Modal */}
        <Suspense fallback={null}>
          {caseStudyProject && (
            <ProjectCaseStudyModal
              project={caseStudyProject}
              onClose={() => setCaseStudyProject(null)}
            />
          )}
        </Suspense>

        {/* Lazy Loaded Resume Modal */}
        <Suspense fallback={null}>
          {resumeOpen && (
            <ResumeModal open={resumeOpen} onClose={closeResume} />
          )}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
