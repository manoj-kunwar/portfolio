# Manoj Kunwar — Engineering Portfolio & Interactive Showcase

A production-grade developer portfolio and interactive systems showcase built with **React 19**, **Vite 8**, **Tailwind CSS**, **Framer Motion**, and **Three.js / React Three Fiber**. 

Designed to demonstrate end-to-end full-stack software architecture, real-time communications, and human-centered community platforms with zero synthetic metrics.

---

## 🌟 Key Architecture & Highlights

- **Dual-Mode 3D Network (`src/components/EngineeringNetwork3D/`):**
  - **Systems Architecture Mode:** Low-poly 3D nodes (React, Node.js, Express, MongoDB, WebRTC, Docker, AWS, Git) with dynamic line topology, floating physics, and mouse parallax.
  - **Community Ecosystem Mode:** Civic network nodes (Community Core, Youth Leadership, Events, Programs, Volunteers, Culture, Sports, Environment).
  - **Adaptive Rendering:** DPR capped at 1.5; pauses render loop when off-screen; gracefully falls back to an interactive 2D SVG canvas on mobile screens (`<768px`) or when `prefers-reduced-motion` is enabled.
  - **Safety:** Protected by an isolated React `ErrorBoundary`.

- **"Built for Real People" — Systems in Motion (`src/sections/SystemsInMotion.jsx`):**
  - Conceptual centerpiece visualizing four production domains orbiting a central engineering core:
    1. **Healthcare:** CareOS (Telemedicine, Low-Latency WebRTC, Stateless RBAC)
    2. **Community:** High School Youth Club (Civic Technology, Event Discovery, Bilingual Platform)
    3. **Travel:** Wanderlust (Geospatial 2dsphere Indexing, Cloud Media Pipeline)
    4. **Employment:** Rozgar Nepal (Job Matching, Candidate Tracking)

- **Featured Production Platforms (`src/data/projects.js`):**
  - **CareOS:** Low-latency WebRTC video consultations with DTLS-SRTP encryption, aggregation pipeline query optimization, and stateless JWT authorization.
  - **High School Youth Club:** Production civic platform for Gulariya, Krishnapur-5, Kanchanpur, Nepal. Features bilingual English/नेपाली UI, tournament calendars, official bulletins, and volunteer onboarding.
  - **Wanderlust:** Server-rendered MVC marketplace featuring MongoDB 2dsphere geospatial radius search, Mapbox GL geocoding, and Cloudinary media processing.
  - **Rozgar Nepal:** Decoupled MERN recruitment portal with candidate resume intake pipelines and recruiter dashboards.

- **3D Card Depth & Mini Browser Preview (`src/components/ProjectTiltCard.jsx`):**
  - Hardware-accelerated Framer Motion 3D tilt (`rotateX`, `rotateY` bounded to $\pm5.5^\circ$) with spring physics, cursor glow followers, and a live mini browser preview for High School Youth Club.

- **Accessible Command Palette (`Cmd + K` / `Ctrl + K`):**
  - Fuzzy search across project titles, categories, technologies, and civic domains (`"community"`, `"health"`, `"travel"`, `"employment"`).
  - Keyboard navigation (`↑` / `↓` / `Enter` / `Escape`), focus trapping, and clipboard actions.

- **Contextual GSAP Cursor (`src/components/GsapCursor.jsx`):**
  - Desktop-only reactive cursor providing contextual labels: `CASE STUDY`, `COMMUNITY`, `JOIN`, `ARCHITECTURE`, `GITHUB`, `LIVE`. Automatically disabled on touch devices and reduced-motion preferences.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Core** | React 19, Vite 8, TypeScript / JavaScript ES6+ |
| **Styling** | Tailwind CSS 3, Custom Glass Surfaces, Design Tokens |
| **Motion** | Framer Motion 12, GSAP 3 |
| **3D & WebGL** | Three.js, @react-three/fiber, @react-three/drei |
| **Icons** | Lucide React, Custom SVG Brand Icons |
| **Testing** | Vitest, React Testing Library, Playwright E2E |
| **Linter** | Oxlint (0 errors, 0 warnings) |
| **CI/CD** | GitHub Actions (`.github/workflows/ci.yml`) |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
# Server ready at http://localhost:5173
```

### 3. Run Linter
```bash
npm run lint
# Fast audit using oxlint
```

### 4. Run Test Suite
```bash
npm run test
# Executes Vitest unit & component integration tests
```

### 5. Run End-to-End Tests
```bash
# Requires Playwright browsers: npx playwright install --with-deps
npm run test:e2e
```

### 6. Build for Production
```bash
npm run build
# Outputs optimized, chunk-split assets to dist/
```

---

## 📁 Repository Structure

```text
├── .github/workflows/ci.yml      # Automated CI workflow
├── e2e/portfolio.spec.js          # Playwright end-to-end tests
├── public/
│   ├── assets/                   # Optimized WebP assets & screenshots
│   ├── resume.pdf                # Authentic downloadable PDF resume
│   ├── robots.txt                # Search engine crawler directives
│   └── sitemap.xml               # XML sitemap
├── src/
│   ├── animations/variants.js    # Reusable Framer Motion primitives
│   ├── components/
│   │   ├── EngineeringNetwork3D/ # Dual-mode 3D WebGL Canvas & 2D fallback
│   │   ├── ArchitectureDiagram.jsx # Layer-by-layer architectural inspector
│   │   ├── CommandPalette.jsx    # Keyboard navigation palette
│   │   ├── GsapCursor.jsx        # Contextual desktop cursor
│   │   ├── ProjectCaseStudyModal.jsx # Full-screen case study deep-dive
│   │   ├── ProjectTiltCard.jsx   # 3D spring tilt project card
│   │   └── ResumeModal.jsx       # Real PDF viewer & download modal
│   ├── data/                     # Single source of truth
│   │   ├── profile.js            # Personal info & verified handles
│   │   ├── projects.js           # Specifications for 4 featured platforms
│   │   ├── skills.js             # Categorized stack with usage mapping
│   │   ├── experience.js         # Engineering timeline
│   │   ├── achievements.js       # 1025+ DSA, LeetCode & CodeChef peaks
│   │   └── certifications.js     # AWS, IBM, Smart Interviews
│   ├── sections/
│   │   ├── Hero.jsx              # Signature typography & 3D network
│   │   ├── SystemsInMotion.jsx   # 4 domains around engineering core
│   │   ├── Projects.jsx          # Filterable project grid
│   │   ├── Skills.jsx            # Interactive skill cards & case study links
│   │   ├── About.jsx             # Systems pillars & background
│   │   ├── Experience.jsx        # Vertical timeline
│   │   ├── CodingProfiles.jsx    # Competitive programming metrics
│   │   └── Contact.jsx           # Validated contact form & direct channels
│   ├── test/                     # Vitest test setup and suites
│   ├── App.jsx                   # Root layout, code splitting & ErrorBoundary
│   ├── index.css                 # Global CSS design tokens
│   └── main.jsx                  # Application entry point
├── playwright.config.js          # Playwright E2E configuration
├── tailwind.config.js            # Tailwind theme tokens & extensions
└── vite.config.js                # Vite build, manual chunking & test config
```

---

## 📄 License
MIT © Manoj Kunwar
