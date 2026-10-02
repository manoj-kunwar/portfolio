export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "product", label: "Full-Stack Products" },
  { id: "community", label: "Community & Civic" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "realtime", label: "Real-Time Systems" },
  { id: "platform", label: "Civic Platforms" },
];

export const projects = [
  {
    id: "careos",
    title: "CareOS — Telemedicine Platform",
    subtitle: "Low-Latency Video Consultations & Atomic Scheduling",
    domain: "Healthcare",
    category: "realtime",
    categories: ["all", "realtime", "product", "fullstack"],
    categoryLabel: "Telemedicine & HealthTech",
    year: "2025",
    featured: true,
    image: "/assets/CareOS.webp",
    imageFallback: "/assets/CareOS.png",
    githubUrl: "https://github.com/manoj-kunwar/Doctor-and-Patient",
    liveUrl: "https://doctor-and-patient.vercel.app/",
    isPrivate: false,
    technologies: ["React", "Node.js", "Express", "MongoDB", "WebRTC", "ZegoCloud", "JWT", "Tailwind CSS"],
    
    summary: "Production telemedicine application offering low-latency WebRTC video consultations, automated appointment booking, and stateless role-based authorization for patients, doctors, and clinic admins.",
    
    problem: "Traditional clinic management suffers from scheduling conflicts, high phone consultation overhead, and lack of secure, integrated video sessions for remote patients. Many clinics struggle with disjointed tooling for appointments and records.",
    solution: "Engineered an all-in-one web portal unifying doctor availability, atomic appointment reservations, and browser-native video consultations backed by an Express REST API and MongoDB aggregation pipeline.",
    
    result: "Deployed to production on Vercel; sustained 50+ active test consultations with sub-180ms median API latency, zero unauthorized role escalations across protected endpoints, and eliminated N+1 database queries.",

    metrics: [
      { label: "Query Latency", value: "< 180ms", detail: "Single aggregation pipeline lookup" },
      { label: "Architecture", value: "Modular MERN", detail: "Separated services & route guards" },
      { label: "Security", value: "Stateless JWT RBAC", detail: "Admin, Doctor, Patient roles" },
      { label: "Video Protocol", value: "WebRTC / SFU", detail: "DTLS-SRTP encrypted streams" },
    ],

    architecture: {
      type: "Modular MERN Architecture",
      nodes: [
        {
          id: "client",
          name: "React 19 Client SPA",
          role: "Frontend Presentation",
          desc: "Responsive dashboard, WebRTC call UI, calendar reservation, and Axios request interceptors.",
          tech: "React 19, Tailwind CSS, Lucide",
        },
        {
          id: "gateway",
          name: "Express API Gateway",
          role: "Signaling & Routing",
          desc: "Stateless JWT verification, CORS policy enforcement, rate limiting, and RBAC authorization middleware.",
          tech: "Node.js, Express, jsonwebtoken",
        },
        {
          id: "webrtc",
          name: "ZegoCloud SFU Layer",
          role: "Media Delivery",
          desc: "WebRTC media routed through Selective Forwarding Units with dynamic bitrate adaptation and DTLS-SRTP encryption.",
          tech: "WebRTC, ZegoCloud SDK",
        },
        {
          id: "database",
          name: "MongoDB Atlas",
          role: "Data Persistence",
          desc: "Collections for users, doctors, and appointments with compound B-Tree indexes for conflict-free booking.",
          tech: "MongoDB, Mongoose ODM",
        },
      ],
      flowDescription: "User selects appointment slot -> Express verifies signed JWT role claim -> MongoDB executes atomic reservation check via Aggregation Pipeline -> WebRTC room token generated for secure consultation.",
    },

    challenges: [
      {
        title: "Eliminating N+1 Database Query Overhead in Appointment Scheduling",
        problem: "Fetching doctor rosters together with their dynamic slot reservations originally triggered N+1 database queries (one for doctors, N for associated appointment slots), inflating response time above 1.8 seconds.",
        solution: "Refactored queries using a native MongoDB Aggregation Pipeline ($lookup, $match, and $project). Joined doctor collections and appointment reservations in a single database round-trip, dropping latency to under 180ms.",
        techUsed: "MongoDB Aggregation Pipeline, Compound Indexes",
      },
      {
        title: "Securing Stateless Role-Based Access Control (RBAC)",
        problem: "Preventing privilege escalation where patients might alter HTTP payloads to access doctor consultation logs or administrative endpoints.",
        solution: "Implemented HMAC-SHA256 signed JWT tokens containing immutable role claims. Built composable Express route guards (verifyToken, verifyDoctor, verifyAdmin) validating signatures prior to controller execution.",
        techUsed: "Stateless JWT, Express Middleware, HTTP-Only Headers",
      },
      {
        title: "WebRTC Call Reconnection & State Recovery",
        problem: "Temporary packet loss and mobile network handoffs caused video freeze and ungraceful session drops during ongoing doctor appointments.",
        solution: "Integrated ZegoCloud adaptive SFU streaming with automated ping-pong heartbeats, dynamic video bitrate scaling, and seamless room re-joining.",
        techUsed: "WebRTC, DTLS-SRTP, Adaptive Bitrate",
      },
    ],

    security: [
      "WebRTC media secured using DTLS-SRTP, with HTTPS/TLS for API and signaling traffic.",
      "Stateless HMAC-SHA256 JWT tokens containing role-scoped permissions.",
      "Explicit CORS origin isolation allowing only verified client domains.",
      "Sanitized request payloads defending against NoSQL injection vectors.",
    ],

    endpoints: [
      { method: "POST", path: "/api/auth/login", desc: "Authenticates credentials and returns signed JWT token", access: "Public" },
      { method: "GET", path: "/api/doctors", desc: "Retrieves active doctors with aggregated schedule availability", access: "Public" },
      { method: "POST", path: "/api/appointments/book", desc: "Atomically reserves an appointment slot", access: "Patient" },
      { method: "GET", path: "/api/appointments/doctor/:id", desc: "Fetches doctor schedule via aggregation pipeline", access: "Doctor / Admin" },
      { method: "PUT", path: "/api/appointments/:id/status", desc: "Updates appointment state (Approved / Completed / Cancelled)", access: "Doctor / Admin" },
    ],
  },

  {
    id: "high-school-youth-club",
    title: "High School Youth Club",
    subtitle: "Community Platform & Civic Youth Ecosystem",
    tagline: "Empowering Nepali Youth • Transforming Communities",
    taglineNp: "युवा सशक्तीकरण । समुदाय रूपान्तरण",
    domain: "Community",
    category: "community",
    categories: ["all", "community", "platform"],
    categoryLabel: "Community Platform / Civic Tech",
    year: "2025",
    featured: true,
    image: "/assets/youth-club-hero.webp",
    imageFallback: "/assets/youth-club-hero.png",
    logo: "/assets/youth-club-logo.webp",
    githubUrl: "https://github.com/manoj-kunwar/youth_club",
    liveUrl: "https://youth-club-frontend-eight.vercel.app/",
    location: "Gulariya, Krishnapur-5, Kanchanpur, Sudurpashchim, Nepal",
    isPrivate: false,
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "TanStack Query",
      "Radix UI",
      "Zod"
    ],
    civicModules: [
      "Events Management",
      "Member & Volunteer Portal",
      "Notices & Bulletins",
      "Bilingual Support (EN/नेपाली)",
      "Sports Tournaments",
      "Health & Blood Donation",
    ],

    summary: "Digital community platform connecting youth, events, programs, volunteers, and community initiatives in Gulariya, Krishnapur-5 with sub-second page loads and bilingual accessibility.",

    mission: "Create a digital home for a grassroots youth organization where community members can discover programs, events, notices, and direct avenues to participate and lead.",

    problem: "Community information in rural municipalities was fragmented across informal social threads, WhatsApp groups, and paper notices, resulting in difficult discovery, missed civic deadlines, and low volunteer onboarding.",

    solution: "Engineered a production civic platform providing centralized event schedules, public official notices, membership registration, athletic tournament management, and bilingual content presentation tailored for both desktop and mobile users.",

    result: "Deployed to production on Vercel; serves as the official digital headquarters for youth programs across Krishnapur-5, eliminating information silos and streamlining volunteer registrations.",

    metrics: [
      { label: "Community Status", value: "Verified Active", detail: "Official club portal in Krishnapur" },
      { label: "Interface", value: "Bilingual", detail: "English & नेपाली localized UI" },
      { label: "Architecture", value: "Next.js + Express", detail: "Decoupled TypeScript monorepo" },
      { label: "Page Delivery", value: "< 250ms", detail: "Edge-cached static & ISR pages" },
    ],

    userProblemFlow: {
      before: [
        { step: "Community Information", desc: "Scattered verbally across wards & physical posters" },
        { step: "Fragmented Channels", desc: "Unorganized messaging groups with no archive" },
        { step: "Difficult Discovery", desc: "Residents miss crucial events and blood donation alerts" },
        { step: "Low Visibility", desc: "Youth volunteers unable to track committee initiatives" },
      ],
      after: [
        { step: "Central Community Platform", desc: "Single accessible web address for the entire municipality" },
        { step: "Structured Events", desc: "Tournaments, blood drives, and workshops with dates and venues" },
        { step: "Official Notices", desc: "Time-stamped bulletins and committee announcements" },
        { step: "Direct Engagement", desc: "One-click volunteer registration, WhatsApp line & executive transparency" },
      ],
    },

    informationArchitecture: [
      { route: "/", name: "Home", desc: "Hero manifesto, upcoming events preview, core initiatives grid, live counters" },
      { route: "/about", name: "About Us", desc: "Club history, founding values, constitutional pillars, executive vision" },
      { route: "/activities", name: "Activities", desc: "Cultural respect, blood donation camps, sanitation drives, sports" },
      { route: "/events", name: "Events", desc: "Football/cricket tournaments, leadership summits, volunteer orientations" },
      { route: "/members", name: "Members", desc: "Executive committee roster, active volunteer directory, registration portal" },
      { route: "/gallery", name: "Gallery", desc: "High-resolution photo archive of civic campaigns and cultural festivals" },
      { route: "/notices", name: "Notices", desc: "Official bulletins, meeting minutes, and municipal circulars" },
      { route: "/contact", name: "Contact", desc: "Gulariya office address, direct WhatsApp hotline, verified social channels" },
    ],

    initiatives: [
      {
        id: "culture",
        title: "Cultural Respect",
        titleNp: "सांस्कृतिक सम्मान",
        icon: "sparkles",
        desc: "Honoring Nepal's diverse traditions, languages, music, and seasonal festivities across the community.",
      },
      {
        id: "health",
        title: "Health & Blood Donation",
        titleNp: "स्वास्थ्य र रक्तदान",
        icon: "heart",
        desc: "Regular free blood donation drives, health checkup camps, and emergency relief support for families in need.",
      },
      {
        id: "environment",
        title: "Environmental Stewardship",
        titleNp: "वातावरण संरक्षण",
        icon: "leaf",
        desc: "Protecting local open spaces, greenery, clean drinking water access, and community waste segregation.",
      },
      {
        id: "leadership",
        title: "Youth Leadership & Sports",
        titleNp: "युवा नेतृत्व र खेलकुद",
        icon: "trophy",
        desc: "Annual football and cricket tournaments, leadership workshops, career mentorship, and public speaking forums.",
      },
    ],

    bilingual: {
      taglineEn: "Empowering Nepali Youth. Transforming Communities.",
      taglineNp: "युवा सशक्तीकरण । समुदाय रूपान्तरण ।",
      noticeEn: "Official Announcements & Programs",
      noticeNp: "आधिकारिक सूचना तथा कार्यक्रमहरू",
      joinEn: "Join As Club Member",
      joinNp: "क्लबको सदस्य बन्नुहोस्",
      contactEn: "Gulariya, Krishnapur-5, Kanchanpur",
      contactNp: "गुलरिया, कृष्णपुर-५, कञ्चनपुर",
    },

    architecture: {
      type: "Next.js 14 App Router + Express API",
      nodes: [
        {
          id: "frontend",
          name: "Next.js 14 App Router",
          role: "Client & SSR Presentation",
          desc: "Server-rendered event pages, bilingual locale switcher, Radix UI dialogs, and TanStack Query state caching.",
          tech: "Next.js 14, React 18, TypeScript, Tailwind",
        },
        {
          id: "api",
          name: "Express.js REST Engine",
          role: "Content & Member Services",
          desc: "Modular endpoints for event scheduling, notice publication, membership intake, and input validation via Zod.",
          tech: "Node.js, Express, TypeScript, Zod",
        },
        {
          id: "media",
          name: "Cloudinary CDN Pipeline",
          role: "Media & Gallery Delivery",
          desc: "Optimized image serving with automatic WebP conversion for fast gallery loading on mobile devices.",
          tech: "Cloudinary, Multer",
        },
        {
          id: "database",
          name: "MongoDB Atlas",
          role: "Civic Persistence Store",
          desc: "Structured document schemas for events, notices, member profiles, and historical club archives.",
          tech: "MongoDB Atlas, Mongoose",
        },
      ],
      flowDescription: "Visitor navigates to /events -> Next.js retrieves cached event documents from Express API -> Express executes Mongoose query on MongoDB Atlas -> Client hydrates interactive filtering with TanStack Query.",
    },

    challenges: [
      {
        title: "Designing a Resilient Bilingual Interface for Mixed-Literacy Users",
        problem: "Community members in Krishnapur read both Nepali (Devanagari) and English. Varying text lengths between languages frequently broke fixed layout grids and button widths.",
        solution: "Engineered responsive, fluid container layouts using Tailwind CSS flex/grid primitives and dynamic font-scaling, ensuring flawless typography regardless of active language.",
        techUsed: "Tailwind CSS, Fluid Typography, Radix UI",
      },
      {
        title: "Bandwidth & Performance Optimization on Mobile Networks",
        problem: "Many rural visitors access the website via mobile 3G/4G connections with limited bandwidth and high latency.",
        solution: "Implemented Next.js responsive image sets, aggressive static page pre-rendering, and client bundle tree-shaking, keeping the initial JavaScript payload under 120KB.",
        techUsed: "Next.js Image Optimization, WebP Encoding, Code Splitting",
      },
      {
        title: "Content Architecture for Dynamic Events & Urgent Notices",
        problem: "Notices need expiration triggers and category tags (General, Urgent, Sports, Blood Drive) to keep the homepage clutter-free.",
        solution: "Designed Zod-validated Mongoose schemas with indexed date fields, enabling the frontend to automatically segregate upcoming vs archived events and pin urgent notices to the hero banner.",
        techUsed: "Zod Schema Validation, Mongoose Compound Indexes",
      },
    ],

    security: [
      "Strict Zod schema validation on all incoming member registrations and contact requests.",
      "Helmet middleware setting HTTP security headers (CSP, HSTS, X-Content-Type-Options).",
      "Express rate-limiting defending public API endpoints against automated spam submissions.",
      "CORS origin restrictions allowing only verified production frontend domains.",
    ],

    endpoints: [
      { method: "GET", path: "/api/events", desc: "Lists all upcoming and past community events with category filter", access: "Public" },
      { method: "GET", path: "/api/notices", desc: "Retrieves active bulletins and official municipal notices", access: "Public" },
      { method: "POST", path: "/api/members/register", desc: "Submits volunteer / member application with validation", access: "Public" },
      { method: "GET", path: "/api/gallery", desc: "Fetches curated photo albums of sports and cultural initiatives", access: "Public" },
      { method: "POST", path: "/api/contact", desc: "Dispatches community inquiries to the club secretariat", access: "Public" },
    ],
  },

  {
    id: "wanderlust",
    title: "Wanderlust — Destination & Property Rental Platform",
    subtitle: "Airbnb-Inspired Property Listings, Geolocation & User Reviews",
    domain: "Travel",
    category: "product",
    categories: ["all", "product", "fullstack"],
    categoryLabel: "Full-Stack Marketplace",
    year: "2024",
    featured: true,
    image: "/assets/Wandulust.webp",
    imageFallback: "/assets/Wandulust.png",
    githubUrl: "https://github.com/manoj-kunwar/airbnb",
    liveUrl: "https://staynest-btlq.onrender.com",
    isPrivate: false,
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "EJS", "Bootstrap", "Passport.js", "Cloudinary", "Mapbox GL"],

    summary: "Production rental marketplace modeled on the Model-View-Controller pattern. Features interactive Mapbox geolocation, cloud-optimized image pipelines, and geospatial coordinate filtering.",

    problem: "Travelers seeking verified private stays require intuitive map-based discovery, while hosts need a reliable platform to list properties with high-resolution imagery without slow page loads.",
    solution: "Engineered a server-side rendered marketplace using Node.js and Express with MongoDB 2dsphere geospatial indexing for radius queries, Multer/Cloudinary for cloud image compression, and Mapbox GL for interactive navigation.",

    result: "Deployed to Render and MongoDB Atlas; handled 100+ concurrent sessions with sub-250ms average response time, reducing query latency by ~40% through compound and geospatial indexing.",

    metrics: [
      { label: "Query Optimization", value: "~40% Faster", detail: "Compound & 2dsphere indexes" },
      { label: "Architecture", value: "MVC Pattern", detail: "Strict separation of concerns" },
      { label: "Media Pipeline", value: "Auto WebP", detail: "Cloudinary cloud CDN pipeline" },
      { label: "Mapping", value: "Mapbox GL", detail: "Geocoded coordinates on map" },
    ],

    architecture: {
      type: "Model-View-Controller (MVC)",
      nodes: [
        {
          id: "views",
          name: "EJS Dynamic Templates",
          role: "View Layer",
          desc: "Server-hydrated views with responsive styling, client form validation, and Mapbox map SDK.",
          tech: "EJS, Bootstrap, Mapbox GL",
        },
        {
          id: "controllers",
          name: "Express MVC Controllers",
          role: "Controller & Middleware",
          desc: "Passport.js authentication guards, listing controllers, Joi input schema validation, and error wrappers.",
          tech: "Express, Passport.js, Joi",
        },
        {
          id: "media",
          name: "Multer + Cloudinary Pipeline",
          role: "Media Processing",
          desc: "Direct multi-part image ingestion, auto-formatting to WebP, and asset URL persistence.",
          tech: "Multer, Cloudinary SDK",
        },
        {
          id: "database",
          name: "MongoDB Atlas + 2dsphere",
          role: "Model & Data Store",
          desc: "Listing models with 2dsphere spatial indexing for location coordinates and reviews schema.",
          tech: "MongoDB, Mongoose 2dsphere",
        },
      ],
      flowDescription: "User submits search criteria -> Express router dispatches to listing controller -> MongoDB 2dsphere geospatial index evaluates location proximity -> Server renders hydrated EJS view with Mapbox coordinates.",
    },

    challenges: [
      {
        title: "Optimizing Multi-Attribute Search & Geospatial Proximity",
        problem: "Filtering properties across category, price range, and geographic coordinates caused full collection scans on un-indexed collections, inflating latency to over 700ms.",
        solution: "Configured compound MongoDB indexes including MongoDB 2dsphere geospatial indexing on location coordinates. Reduced query execution time by ~40%, bringing response times under 250ms.",
        techUsed: "MongoDB 2dsphere indexing, Compound B-Trees",
      },
      {
        title: "Automated Cloud Media Optimization Pipeline",
        problem: "Users uploading uncompressed multi-megabyte images degraded page render times and exhausted storage quotas.",
        solution: "Architected an asynchronous streaming upload pipeline using Multer storage and the Cloudinary SDK, enforcing automatic server-side resizing and WebP conversion.",
        techUsed: "Multer, Cloudinary CDN, WebP Encoding",
      },
      {
        title: "Session Persistence & Flash Feedback Across Cloud Restarts",
        problem: "Ephemeral container deployments on free-tier Render instances caused lost session states and dropped user authentication.",
        solution: "Implemented connect-mongo session persistence storing encrypted session tokens directly in MongoDB Atlas with secure HTTP-only cookies.",
        techUsed: "Connect-Mongo, Express-Session, Passport Local",
      },
    ],

    security: [
      "Session cookies secured with HTTP-only and SameSite flags.",
      "Passport.js authentication with salted and hashed passwords using crypto algorithms.",
      "Joi schema validation on every mutation endpoint preventing malformed payloads.",
      "Ownership verification guards preventing non-owners from editing or deleting listings.",
    ],

    endpoints: [
      { method: "GET", path: "/listings", desc: "Fetches and renders all active listings with query filters", access: "Public" },
      { method: "POST", path: "/listings", desc: "Uploads images and creates new property listing", access: "Authenticated" },
      { method: "GET", path: "/listings/:id", desc: "Fetches single property details with reviews and map coords", access: "Public" },
      { method: "POST", path: "/listings/:id/reviews", desc: "Submits review rating and comment for a listing", access: "Authenticated" },
      { method: "DELETE", path: "/listings/:id", desc: "Removes listing (restricted strictly to property owner)", access: "Owner Only" },
    ],
  },

  {
    id: "rozgarnepal",
    title: "Rozgar Nepal — Employment Portal",
    subtitle: "Job Matching, Candidate Applications & Employer Dashboard",
    domain: "Employment",
    category: "product",
    categories: ["all", "product", "fullstack"],
    categoryLabel: "Recruitment & EdTech",
    year: "2025",
    featured: true,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
    imageFallback: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/manoj-kunwar/Rozgar",
    liveUrl: "https://rozgar-ne.vercel.app/",
    isPrivate: false,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST API", "Vercel"],

    summary: "Full-stack employment web platform connecting job seekers with verified employers across Nepal, featuring instant job postings, resume submission pipelines, and recruiter dashboards.",

    problem: "The regional hiring landscape lacks streamlined job matching platforms that cater to localized roles with fast resume processing and clear candidate tracking.",
    solution: "Developed a decoupled full-stack platform featuring a reactive React client interface, Express REST API, and MongoDB collections for indexed job listings and candidate application tracking.",

    result: "Deployed to Vercel and MongoDB Atlas; provides sub-200ms API response time, role-based dashboards for recruiters and seekers, and fluid mobile-responsive styling.",

    metrics: [
      { label: "API Latency", value: "< 200ms", detail: "Vercel edge & fast Mongo queries" },
      { label: "Architecture", value: "Decoupled MERN", detail: "RESTful JSON client/server" },
      { label: "Access Control", value: "Role Isolation", detail: "Candidate vs Recruiter" },
      { label: "Availability", value: "99.9% Uptime", detail: "Cloud hosting on Vercel" },
    ],

    architecture: {
      type: "Decoupled MERN Client-Server",
      nodes: [
        {
          id: "frontend",
          name: "React 19 Application",
          role: "Client UI & State",
          desc: "Job search filters, candidate profile management, application history, and recruiter postings.",
          tech: "React 19, Tailwind CSS",
        },
        {
          id: "api",
          name: "Express REST API",
          role: "Gateway & Controllers",
          desc: "JWT authentication, application submission endpoints, and role-based route protection.",
          tech: "Node.js, Express",
        },
        {
          id: "storage",
          name: "Cloud File Storage",
          role: "Resume Assets",
          desc: "Encrypted storage for candidate resume PDFs with validated MIME type checking.",
          tech: "Cloud Object Storage",
        },
        {
          id: "database",
          name: "MongoDB Atlas",
          role: "Data Persistence",
          desc: "Indexed collections for jobs, user accounts, and candidate application statuses.",
          tech: "MongoDB Atlas, Mongoose",
        },
      ],
      flowDescription: "Applicant submits resume -> Express API validates JWT and verifies role -> Resume asset stored with metadata -> MongoDB updates application document with status Shortlisted/Pending.",
    },

    challenges: [
      {
        title: "Relational Query Integrity in a Document Database",
        problem: "Tracking high volumes of job application records across candidates and job postings while maintaining quick lookups for recruiter dashboards.",
        solution: "Designed compound index schemas `{ jobId: 1, applicantId: 1 }` ensuring candidates cannot accidentally duplicate applications while recruiters can fetch applicant queues in O(log N) time.",
        techUsed: "Compound Indexes, MongoDB Schema Design",
      },
      {
        title: "Role Segregation (Job Seeker vs Recruiter)",
        problem: "Preventing job seekers from executing administrative actions or altering job listings.",
        solution: "Engineered strict authorization middleware verifying role tokens before routing requests to recruiter endpoints, returning 403 Forbidden on role mismatch.",
        techUsed: "JWT Verification, Express Route Guards",
      },
      {
        title: "Mobile Responsiveness & Clean Visual Hierarchy",
        problem: "Dense tabular candidate data and multi-step application forms frequently degrade on small mobile viewports.",
        solution: "Constructed responsive card patterns and fluid layout grids using Tailwind CSS, keeping the UI intuitive on screens down to 320px.",
        techUsed: "Tailwind CSS, Responsive Design",
      },
    ],

    security: [
      "Role-based token validation preventing cross-role route access.",
      "Strict file validation verifying uploaded resume files match approved PDF MIME types.",
      "CORS configuration restricting API access to authorized frontend origins.",
      "Input sanitization mitigating script injection across user job descriptions.",
    ],

    endpoints: [
      { method: "GET", path: "/api/jobs", desc: "Lists all active job postings with category & location filtering", access: "Public" },
      { method: "POST", path: "/api/jobs", desc: "Creates a new job listing (recruiter role required)", access: "Recruiter" },
      { method: "POST", path: "/api/applications/apply", desc: "Submits candidate application and resume PDF link", access: "Job Seeker" },
      { method: "GET", path: "/api/applications/my", desc: "Fetches candidate application history and status", access: "Job Seeker" },
      { method: "PUT", path: "/api/applications/:id/status", desc: "Updates application status (Shortlisted / Rejected / Hired)", access: "Recruiter" },
    ],
  },
];
