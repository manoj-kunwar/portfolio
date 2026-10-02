import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  Code2,
  FileText,
  Sparkles,
  Mail,
  Sun,
  Moon,
  X,
  Terminal,
  ArrowRight,
  Briefcase,
  Trophy,
  Check,
  Copy,
  FolderCode,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons.jsx";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { skills } from "../data/skills.js";

export default function CommandPalette({
  open,
  onClose,
  toggleTheme,
  theme,
  onOpenResume,
  onSelectProject,
  onSelectSkill,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  // Store previously focused element to restore upon closing
  useEffect(() => {
    if (open) {
      previouslyFocusedElementRef.current = document.activeElement;
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === "function") {
        previouslyFocusedElementRef.current.focus();
      }
    }
  }, [open]);

  // Global Keyboard listener: Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent("toggle-command-palette"));
        }
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [open, onClose]);

  const scrollToSection = useCallback((id) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [onClose]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 900);
  }, [onClose]);

  // Unified items list
  const allItems = useMemo(() => {
    const items = [];

    // 1. Navigation Commands
    items.push(
      {
        id: "nav-home",
        type: "navigation",
        category: "Navigation",
        title: "Go to Home",
        subtitle: "Hero section, headline & introduction",
        icon: Sparkles,
        action: () => scrollToSection("hero"),
        keywords: ["home", "hero", "intro", "start", "top"],
      },
      {
        id: "nav-about",
        type: "navigation",
        category: "Navigation",
        title: "Go to About",
        subtitle: "Engineering background, education & summary",
        icon: Sparkles,
        action: () => scrollToSection("about"),
        keywords: ["about", "bio", "education", "parul university", "background"],
      },
      {
        id: "nav-skills",
        type: "navigation",
        category: "Navigation",
        title: "Go to Skills",
        subtitle: "Frontend, Backend, Database, Cloud & Tools",
        icon: Wrench,
        action: () => scrollToSection("skills"),
        keywords: ["skills", "stack", "technologies", "tools", "react", "node", "mongo", "redis"],
      },
      {
        id: "nav-projects",
        type: "navigation",
        category: "Navigation",
        title: "Go to Projects",
        subtitle: "CareOS, Wanderlust, Rozgar Nepal & Case Studies",
        icon: FolderCode,
        action: () => scrollToSection("projects"),
        keywords: ["projects", "portfolio", "work", "applications", "careos", "wanderlust", "rozgar"],
      },
      {
        id: "nav-experience",
        type: "navigation",
        category: "Navigation",
        title: "Go to Experience",
        subtitle: "Engineering timeline, production systems & roles",
        icon: Briefcase,
        action: () => scrollToSection("experience"),
        keywords: ["experience", "timeline", "work history", "jobs", "roles"],
      },
      {
        id: "nav-achievements",
        type: "navigation",
        category: "Navigation",
        title: "Go to Achievements",
        subtitle: "1025+ DSA problems, LeetCode 1668 rating & coding streak",
        icon: Trophy,
        action: () => scrollToSection("achievements"),
        keywords: ["achievements", "dsa", "leetcode", "codechef", "interviewbit", "stats", "ratings", "metrics"],
      },
      {
        id: "nav-contact",
        type: "navigation",
        category: "Navigation",
        title: "Go to Contact",
        subtitle: "Direct message, email & WhatsApp inquiry",
        icon: Mail,
        action: () => scrollToSection("contact"),
        keywords: ["contact", "email", "hire", "message", "whatsapp", "reach out"],
      }
    );

    // 2. System Commands
    items.push(
      {
        id: "cmd-resume",
        type: "action",
        category: "Quick Actions",
        title: "Open Resume PDF",
        subtitle: "View & download official CV (PDF)",
        icon: FileText,
        action: () => {
          onClose();
          onOpenResume();
        },
        keywords: ["resume", "cv", "curriculum vitae", "pdf", "download resume", "bio"],
      },
      {
        id: "cmd-theme",
        type: "action",
        category: "Quick Actions",
        title: `Toggle Theme (${theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"})`,
        subtitle: "Change portfolio visual theme",
        icon: theme === "dark" ? Sun : Moon,
        action: () => {
          toggleTheme();
        },
        keywords: ["theme", "dark", "light", "mode", "toggle", "color"],
      },
      {
        id: "cmd-copy-email",
        type: "action",
        category: "Quick Actions",
        title: copied ? "Email Copied to Clipboard!" : "Copy Email Address",
        subtitle: profile.email,
        icon: copied ? Check : Copy,
        action: handleCopyEmail,
        keywords: ["email", "copy", "address", "contact", "gmail", "inquiry"],
      },
      {
        id: "cmd-github",
        type: "external",
        category: "External Links",
        title: "Open GitHub Profile",
        subtitle: "github.com/manoj-kunwar (15+ repositories)",
        icon: GithubIcon,
        action: () => {
          onClose();
          window.open("https://github.com/manoj-kunwar", "_blank", "noopener,noreferrer");
        },
        keywords: ["github", "code", "repos", "repositories", "open source"],
      },
      {
        id: "cmd-linkedin",
        type: "external",
        category: "External Links",
        title: "Open LinkedIn Profile",
        subtitle: "linkedin.com/in/manoj-kunwar56",
        icon: LinkedinIcon,
        action: () => {
          onClose();
          window.open("https://www.linkedin.com/in/manoj-kunwar56", "_blank", "noopener,noreferrer");
        },
        keywords: ["linkedin", "network", "connect", "social", "professional"],
      },
      {
        id: "cmd-interviewbit",
        type: "external",
        category: "External Links",
        title: "Open InterviewBit Profile",
        subtitle: "interviewbit.com/profile/manoj-kunwar_589",
        icon: Code2,
        action: () => {
          onClose();
          window.open("https://www.interviewbit.com/profile/manoj-kunwar_589/", "_blank", "noopener,noreferrer");
        },
        keywords: ["interviewbit", "interview", "dsa", "coding", "algorithm", "problem solving"],
      }
    );

    // 3. Project Items (Searchable by title, subtitle, category, AND technologies / techStack)
    projects.forEach((proj) => {
      const techList = proj.technologies || proj.techStack || [];
      items.push({
        id: `proj-${proj.id}`,
        type: "project",
        category: "Projects & Case Studies",
        title: proj.title,
        subtitle: `${proj.subtitle} • [${techList.slice(0, 4).join(", ")}]`,
        icon: Code2,
        action: () => {
          onClose();
          onSelectProject(proj);
        },
        keywords: [
          proj.title.toLowerCase(),
          proj.subtitle.toLowerCase(),
          proj.category.toLowerCase(),
          proj.categoryLabel?.toLowerCase() || "",
          proj.domain?.toLowerCase() || "",
          proj.location?.toLowerCase() || "",
          ...(proj.categories || []).map((c) => c.toLowerCase()),
          ...(proj.civicModules || []).map((m) => m.toLowerCase()),
          ...techList.map((t) => t.toLowerCase()),
          proj.id === "careos" ? "health" : "",
          proj.id === "careos" ? "telemedicine" : "",
          proj.id === "high-school-youth-club" ? "community" : "",
          proj.id === "high-school-youth-club" ? "youth club" : "",
          proj.id === "high-school-youth-club" ? "nepal" : "",
          proj.id === "high-school-youth-club" ? "krishnapur" : "",
          proj.id === "high-school-youth-club" ? "civic" : "",
          proj.id === "wanderlust" ? "travel" : "",
          proj.id === "wanderlust" ? "rental" : "",
          proj.id === "rozgarnepal" ? "employment" : "",
          proj.id === "rozgarnepal" ? "jobs" : "",
          proj.id === "rozgarnepal" ? "recruitment" : "",
          "case study",
          "live demo",
        ].filter(Boolean),
        badge: "View Case Study",
      });
    });

    // 4. Skills Quick Items
    skills.forEach((skill) => {
      items.push({
        id: `skill-${skill.id}`,
        type: "skill",
        category: "Technologies & Skills",
        title: `${skill.name} (${skill.categoryLabel})`,
        subtitle: `Used in: ${skill.whereUsed}`,
        icon: Terminal,
        action: () => {
          scrollToSection("skills");
          if (onSelectSkill) onSelectSkill(skill);
        },
        keywords: [
          skill.name.toLowerCase(),
          skill.category.toLowerCase(),
          skill.categoryLabel.toLowerCase(),
          skill.whereUsed.toLowerCase(),
          "skill",
          "tech",
        ],
        badge: `${skill.level}% Proficiency`,
      });
    });

    return items;
  }, [
    scrollToSection,
    onClose,
    onOpenResume,
    theme,
    toggleTheme,
    copied,
    handleCopyEmail,
    onSelectProject,
    onSelectSkill,
  ]);

  // Filtered Items based on user query
  const filteredItems = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      // Default: show all quick actions, navigation, and projects
      return allItems.filter((i) => i.type !== "skill");
    }

    return allItems.filter((item) => {
      const inTitle = item.title.toLowerCase().includes(cleanQuery);
      const inSubtitle = item.subtitle.toLowerCase().includes(cleanQuery);
      const inCategory = item.category.toLowerCase().includes(cleanQuery);
      const inKeywords = item.keywords?.some((k) => k.includes(cleanQuery));
      return inTitle || inSubtitle || inCategory || inKeywords;
    });
  }, [allItems, query]);

  // Adjust selected index if it exceeds filtered bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within the input: ArrowUp, ArrowDown, Enter
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl && typeof activeEl.scrollIntoView === "function") {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden bg-slate-900/95 dark:bg-[#0B1120]/95 backdrop-blur-xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
            <Search size={18} className="text-cyan-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search projects, technologies (e.g. 'React', 'MongoDB'), sections, or actions..."
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none font-mono"
              aria-label="Search portfolio"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs font-mono text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded"
                title="Clear input"
              >
                Clear
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
              <Command size={10} /> K
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Close command palette"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results Container */}
          <div
            ref={listRef}
            className="max-h-[60vh] overflow-y-auto p-3 space-y-1 divide-y divide-slate-800/40 custom-scrollbar"
            role="listbox"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const IconComponent = item.icon;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={item.id}
                    data-index={index}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all group ${
                      isSelected
                        ? "bg-indigo-600/20 text-white border border-indigo-500/50 shadow-sm"
                        : "text-slate-300 hover:bg-slate-800/60 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div
                        className={`p-2 rounded-lg shrink-0 transition-colors ${
                          isSelected
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-slate-800/80 text-slate-400 group-hover:text-cyan-400"
                        }`}
                      >
                        <IconComponent size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold truncate group-hover:text-white">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline">
                            • {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate font-mono">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
                            isSelected
                              ? "bg-cyan-950 text-cyan-300 border-cyan-800"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight
                        size={14}
                        className={`transition-transform ${
                          isSelected
                            ? "text-cyan-400 translate-x-0.5"
                            : "text-slate-600 opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-10 text-center space-y-2">
                <Terminal size={32} className="text-slate-600 mx-auto" />
                <p className="text-xs text-slate-300 font-mono">
                  No matching results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  Try searching for &quot;React&quot;, &quot;Node&quot;, &quot;MongoDB&quot;, &quot;CareOS&quot;, &quot;Resume&quot;, or &quot;Contact&quot;.
                </p>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span>
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">↑</kbd>{" "}
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">↓</kbd> to navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Enter</kbd> to select
              </span>
            </div>
            <span>
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Esc</kbd> to close
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
