import { profile } from "../data/profile.js";
import { projects, projectCategories } from "../data/projects.js";
import { skills, skillCategories } from "../data/skills.js";
import { experiences } from "../data/experience.js";
import { achievements } from "../data/achievements.js";
import { certifications } from "../data/certifications.js";
import { navLinks } from "../data/index.js";

// Re-exports for centralized data
export {
  profile,
  projects,
  projectCategories,
  skills,
  skillCategories,
  experiences,
  achievements,
  certifications,
  navLinks,
};

// Backwards-compatible aliases for legacy imports
export const projectsData = projects;
export const skillsData = skills;
export const codingProfilesData = achievements.profiles;
export const statsData = achievements.metrics;

export const aboutData = {
  summary: profile.bio,
  highlights: [
    {
      title: "Full Stack Mastery",
      description: "Proficient in end-to-end web architecture from reactive single-page React interfaces to scalable Node.js & Express REST APIs.",
    },
    {
      title: "DSA & Algorithmic Rigor",
      description: "1025+ algorithmic problems solved across LeetCode, CodeChef, and HackerRank with a 1668 Peak LeetCode rating.",
    },
    {
      title: "Production Systems",
      description: "Proven record designing and launching production platforms (CareOS, Wanderlust, Rozgar Nepal) with sub-200ms latency budgets.",
    },
    {
      title: "Modern UI/UX & Interaction",
      description: "Committed to fluid visual aesthetics, strict accessibility, responsive design, and purposeful micro-interactions.",
    },
  ],
  interests: ["System Design", "Cloud Architecture", "UI/UX Engineering", "WebRTC & Real-Time Media", "Competitive Programming"],
};

export const timelineData = experiences.map((exp) => ({
  type: exp.type,
  title: exp.role,
  organization: exp.company,
  duration: exp.period,
  description: exp.responsibilities ? exp.responsibilities[0] : "",
  bullets: exp.responsibilities || [],
  icon: exp.type === "education" ? "GraduationCap" : "Briefcase",
  badge: exp.badge,
}));
