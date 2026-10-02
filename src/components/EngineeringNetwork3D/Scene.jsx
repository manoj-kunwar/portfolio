import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

// 1. Engineering System Nodes
const ENGINEERING_NODES = [
  { id: "react", name: "React 19", role: "Frontend UI", color: "#61DAFB", basePos: [-2.1, 1.0, 0.2], size: 0.22, project: "careos", desc: "Interactive frontend state, WebRTC UI, responsive components." },
  { id: "node", name: "Node.js", role: "Backend Runtime", color: "#339933", basePos: [-0.6, -0.5, 0.4], size: 0.22, project: "careos", desc: "Non-blocking event loop, media streaming, REST controllers." },
  { id: "express", name: "Express", role: "API Gateway", color: "#94A3B8", basePos: [0.6, 0.7, -0.2], size: 0.2, project: "wanderlust", desc: "Routing, rate limiting, and RBAC authorization route guards." },
  { id: "mongo", name: "MongoDB", role: "Data Store", color: "#47A248", basePos: [-1.2, -1.4, -0.4], size: 0.22, project: "wanderlust", desc: "Compound B-Tree and 2dsphere geospatial indexing." },
  { id: "webrtc", name: "WebRTC", role: "Real-Time Media", color: "#A855F7", basePos: [-0.4, 1.8, 0.3], size: 0.2, project: "careos", desc: "DTLS-SRTP video stream delivery and SFU mesh networking." },
  { id: "docker", name: "Docker", role: "Containers", color: "#2496ED", basePos: [1.8, -0.5, 0.3], size: 0.2, project: "careos", desc: "Isolated micro-environments and reproducible service deployments." },
  { id: "aws", name: "AWS", role: "Cloud Infra", color: "#FF9900", basePos: [2.1, 1.2, -0.3], size: 0.22, project: "wanderlust", desc: "Cloud infrastructure, S3 object persistence, and IAM policies." },
  { id: "git", name: "Git", role: "VCS & CI/CD", color: "#F05032", basePos: [0.9, -1.6, -0.3], size: 0.19, project: "portfolio", desc: "Version control, automated GitHub Actions test pipelines." },
];

const ENGINEERING_EDGES = [
  [0, 1], [0, 2], [0, 4], [1, 2], [1, 3], [1, 4], [2, 5], [5, 6], [1, 7], [5, 7]
];

// 2. Community Ecosystem Nodes
const COMMUNITY_NODES = [
  { id: "community", name: "Community Core", role: "Gulariya Krishnapur", color: "#EF4444", basePos: [0, 0, 0.3], size: 0.27, project: "high-school-youth-club", desc: "Grassroots youth hub in Krishnapur-5 uniting civic and cultural action." },
  { id: "youth", name: "Youth Leadership", role: "Empowerment", color: "#F59E0B", basePos: [-1.8, 1.1, -0.1], size: 0.22, project: "high-school-youth-club", desc: "Public speaking forums, career mentorship, and leadership workshops." },
  { id: "events", name: "Community Events", role: "Active Programs", color: "#3B82F6", basePos: [1.7, 1.1, 0.2], size: 0.22, project: "high-school-youth-club", desc: "Organized sports tournaments, blood donation drives, and cultural celebrations." },
  { id: "programs", name: "Core Initiatives", role: "Education & Skills", color: "#10B981", basePos: [0.2, 1.8, -0.2], size: 0.21, project: "high-school-youth-club", desc: "Academic tutoring, environmental drives, and digital literacy workshops." },
  { id: "volunteers", name: "Volunteer Network", role: "Civic Action", color: "#8B5CF6", basePos: [1.8, -0.8, -0.2], size: 0.22, project: "high-school-youth-club", desc: "Dedicated youth volunteers mobilized across Krishnapur municipal wards." },
  { id: "culture", name: "Cultural Respect", role: "Preservation", color: "#EC4899", basePos: [-1.9, -0.8, 0.2], size: 0.21, project: "high-school-youth-club", desc: "Preserving folk heritage, seasonal festivals, and indigenous art forms." },
  { id: "sports", name: "Athletics & Sports", role: "Cricket & Football", color: "#06B6D4", basePos: [-0.9, -1.6, -0.1], size: 0.22, project: "high-school-youth-club", desc: "Annual inter-ward football and cricket championships building teamwork." },
  { id: "environment", name: "Environment", role: "Stewardship", color: "#14B8A6", basePos: [0.9, -1.6, 0.2], size: 0.21, project: "high-school-youth-club", desc: "Tree plantation campaigns, waste segregation, and clean drinking water." },
];

const COMMUNITY_EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 3], [2, 6], [4, 2], [5, 1], [7, 4]
];

function NodeMesh({ node, isHovered, onHover, onClick, reducedMotion }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.25;
    meshRef.current.rotation.y = t * 0.35;
  });

  return (
    <group position={node.basePos}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick(node);
        }}
        scale={isHovered ? 1.35 : 1}
      >
        <octahedronGeometry args={[node.size, 0]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 0.95 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer subtle wireframe halo */}
      <mesh scale={isHovered ? 1.6 : 1.25}>
        <octahedronGeometry args={[node.size, 0]} />
        <meshBasicMaterial
          color={node.color}
          wireframe
          transparent
          opacity={isHovered ? 0.65 : 0.22}
        />
      </mesh>

      {/* Floating Tooltip Label */}
      {isHovered && (
        <Html distanceFactor={10} position={[0, node.size + 0.24, 0]} center pointerEvents="none">
          <div className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold bg-slate-950/95 text-white border border-slate-700 shadow-xl flex items-center gap-2 whitespace-nowrap backdrop-blur-md">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: node.color }} />
            <span>{node.name}</span>
            <span className="text-[10px] text-slate-400 font-normal">({node.role})</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function ConnectionLines({ nodes, edges, activeNodeId, mode }) {
  const lineGeometry = useMemo(() => {
    const points = [];
    edges.forEach(([i, j]) => {
      if (nodes[i] && nodes[j]) {
        const p1 = new THREE.Vector3(...nodes[i].basePos);
        const p2 = new THREE.Vector3(...nodes[j].basePos);
        points.push(p1, p2);
      }
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes, edges]);

  const lineColor = mode === "community" ? "#f59e0b" : "#38bdf8";

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial
        color={lineColor}
        transparent
        opacity={activeNodeId ? 0.45 : 0.2}
        linewidth={1}
      />
    </lineSegments>
  );
}

function NetworkGroup({ mode, onNodeSelect, reducedMotion }) {
  const groupRef = useRef();
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const nodes = mode === "community" ? COMMUNITY_NODES : ENGINEERING_NODES;
  const edges = mode === "community" ? COMMUNITY_EDGES : ENGINEERING_EDGES;

  // Gentle mouse parallax damping
  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.18, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.12, 0.04);
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.2}
      rotationIntensity={reducedMotion ? 0 : 0.15}
      floatIntensity={reducedMotion ? 0 : 0.25}
    >
      <group ref={groupRef}>
        <ConnectionLines nodes={nodes} edges={edges} activeNodeId={hoveredNodeId} mode={mode} />
        {nodes.map((node) => (
          <NodeMesh
            key={node.id}
            node={node}
            isHovered={hoveredNodeId === node.id}
            onHover={setHoveredNodeId}
            onClick={onNodeSelect}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </Float>
  );
}

export default function EngineeringNetworkCanvas({
  mode = "engineering",
  onNodeSelect,
  reducedMotion = false,
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 1.5]} // Performance safeguard: max 1.5 dpr prevents GPU drain
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="w-full h-full pointer-events-auto"
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -3, 2]} intensity={0.8} color={mode === "community" ? "#ef4444" : "#6366f1"} />
      <pointLight position={[4, 3, -2]} intensity={0.8} color={mode === "community" ? "#f59e0b" : "#06b6d4"} />
      <NetworkGroup mode={mode} onNodeSelect={onNodeSelect} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
