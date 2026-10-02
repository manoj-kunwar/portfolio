import { motion } from "framer-motion";

const ENGINEERING_NODES = [
  { id: "react", name: "React 19", role: "UI / SPA", color: "#61DAFB", x: 20, y: 30, project: "careos", desc: "Interactive frontend state, WebRTC UI, responsive components." },
  { id: "node", name: "Node.js", role: "Runtime", color: "#339933", x: 42, y: 55, project: "careos", desc: "Non-blocking event loop, media streaming, REST controllers." },
  { id: "express", name: "Express", role: "Gateway", color: "#94A3B8", x: 60, y: 32, project: "wanderlust", desc: "Routing, rate limiting, and RBAC authorization route guards." },
  { id: "mongo", name: "MongoDB", role: "Database", color: "#47A248", x: 30, y: 78, project: "wanderlust", desc: "Compound B-Tree and 2dsphere geospatial indexing." },
  { id: "webrtc", name: "WebRTC", role: "Streaming", color: "#A855F7", x: 45, y: 15, project: "careos", desc: "DTLS-SRTP video stream delivery and SFU mesh networking." },
  { id: "docker", name: "Docker", role: "Containers", color: "#2496ED", x: 75, y: 62, project: "careos", desc: "Isolated micro-environments and reproducible service deployments." },
  { id: "aws", name: "AWS", role: "Cloud Services", color: "#FF9900", x: 84, y: 28, project: "wanderlust", desc: "Cloud infrastructure, S3 object persistence, and IAM policies." },
  { id: "git", name: "Git", role: "CI/CD & VCS", color: "#F05032", x: 65, y: 82, project: "portfolio", desc: "Version control, automated GitHub Actions test pipelines." },
];

const ENGINEERING_EDGES = [
  ["react", "node"],
  ["react", "express"],
  ["react", "webrtc"],
  ["node", "express"],
  ["node", "mongo"],
  ["node", "webrtc"],
  ["express", "docker"],
  ["docker", "aws"],
  ["node", "git"],
  ["docker", "git"],
];

const COMMUNITY_NODES = [
  { id: "community", name: "Community Core", role: "Krishnapur Hub", color: "#EF4444", x: 50, y: 48, project: "high-school-youth-club", desc: "Grassroots youth hub in Krishnapur-5 uniting civic and cultural action." },
  { id: "youth", name: "Youth Leadership", role: "Empowerment", color: "#F59E0B", x: 26, y: 25, project: "high-school-youth-club", desc: "Public speaking forums, career mentorship, and leadership workshops." },
  { id: "events", name: "Events", role: "Tournaments", color: "#3B82F6", x: 76, y: 25, project: "high-school-youth-club", desc: "Organized sports tournaments, blood donation drives, and cultural celebrations." },
  { id: "programs", name: "Programs", role: "Education", color: "#10B981", x: 50, y: 16, project: "high-school-youth-club", desc: "Academic tutoring, environmental drives, and digital literacy workshops." },
  { id: "volunteers", name: "Volunteers", role: "Civic Action", color: "#8B5CF6", x: 78, y: 72, project: "high-school-youth-club", desc: "Dedicated youth volunteers mobilized across Krishnapur municipal wards." },
  { id: "culture", name: "Culture", role: "Preservation", color: "#EC4899", x: 22, y: 72, project: "high-school-youth-club", desc: "Preserving folk heritage, seasonal festivals, and indigenous art forms." },
  { id: "sports", name: "Sports", role: "Athletics", color: "#06B6D4", x: 34, y: 84, project: "high-school-youth-club", desc: "Annual inter-ward football and cricket championships building teamwork." },
  { id: "environment", name: "Environment", role: "Green Action", color: "#14B8A6", x: 66, y: 84, project: "high-school-youth-club", desc: "Tree plantation campaigns, waste segregation, and clean drinking water." },
];

const COMMUNITY_EDGES = [
  ["community", "youth"],
  ["community", "events"],
  ["community", "programs"],
  ["community", "volunteers"],
  ["community", "culture"],
  ["community", "sports"],
  ["community", "environment"],
  ["youth", "programs"],
  ["events", "sports"],
  ["volunteers", "events"],
  ["culture", "youth"],
  ["environment", "volunteers"],
];

export default function StaticFallback({ mode = "engineering", onNodeSelect }) {
  const nodes = mode === "community" ? COMMUNITY_NODES : ENGINEERING_NODES;
  const edges = mode === "community" ? COMMUNITY_EDGES : ENGINEERING_EDGES;
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-4">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="staticEdgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={mode === "community" ? "#ef4444" : "#38bdf8"} stopOpacity="0.35" />
            <stop offset="100%" stopColor={mode === "community" ? "#f59e0b" : "#818cf8"} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {edges.map(([src, dst], idx) => {
          const n1 = nodeMap[src];
          const n2 = nodeMap[dst];
          if (!n1 || !n2) return null;
          return (
            <line
              key={idx}
              x1={`${n1.x}%`}
              y1={`${n1.y}%`}
              x2={`${n2.x}%`}
              y2={`${n2.y}%`}
              stroke="url(#staticEdgeGradient)"
              strokeWidth="0.4"
              strokeDasharray="1.5 1.5"
            />
          );
        })}
      </svg>

      {/* Interactive 2D Fallback Nodes */}
      {nodes.map((node) => (
        <motion.button
          key={node.id}
          type="button"
          onClick={() => onNodeSelect && onNodeSelect(node)}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          whileHover={{ scale: 1.15 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl glass-card border border-slate-700/80 hover:border-cyan-400/80 transition-all text-left shadow-lg group backdrop-blur-md z-10"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: node.color }}
            />
            <span className="text-[11px] font-mono font-bold text-white group-hover:text-cyan-400 transition-colors">
              {node.name}
            </span>
          </div>
          <p className="text-[9px] text-slate-400 font-mono mt-0.5">{node.role}</p>
        </motion.button>
      ))}
    </div>
  );
}
