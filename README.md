# 🧭 PathFinder AI — Enterprise 3D Learning Path Generator

> **Autonomous AI-Powered Learning Path Generator that transforms learner goals into personalized, milestone-driven roadmaps with real-time database synchronization, enterprise 3D WebGL neural visualization, and JWT authentication.**

[![GitHub Repository](https://img.shields.io/badge/GitHub-aroramukti1477--svg%2FPathfinder-amber)](https://github.com/aroramukti1477-svg/Pathfinder)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-v20%2B-green.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-Prisma%20%7C%20SQLite-indigo.svg)](https://prisma.io/)

---

## ⚡ Tech Stack & Architecture

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **3D & WebGL Engine:** Three.js + `@react-three/fiber` + `@react-three/drei`
- **Animations & Physics:** Framer Motion (Restrained springs, 4° tilt, cursor spotlight sheens)
- **Icons:** `lucide-react`
- **Backend API:** Express 5 Serverless / REST Microservices
- **Database ORM:** Prisma (`User`, `LearningPath`, `Phase`, `Milestone` models)
- **Authentication:** Native PBKDF2 salt hashing + HMAC-SHA256 JWT sessions
- **Acoustic Feedback:** Web Audio API Tactical Synthesizer

---

## 🎨 Design System: Obsidian & Smoked Quartz

- **Base Canvas:** Deep Carbon Obsidian (`#030712` to `#090D16`) with an architectural 1px micro-grid (`rgba(30, 41, 59, 0.22)`).
- **Glassmorphism:** Smoked quartz panels (`bg-slate-900/60`, `backdrop-blur-2xl`), crisp specular 1px borders (`border-white/[0.08]`), inner top-edge highlights (`inset 0 1px 0 0 rgba(255,255,255,0.1)`).
- **Interactive 3D Scene:** Ascending isometric 3D Fiber-Optic Spline & Constellation Node Graph with traveling light pulses and 3 floating smoked-glass HUD telemetry cards.
- **Typography:** `Inter` for headers, `JetBrains Mono` for live metrics, velocity, and completion percentages.

---

## 🔐 Pre-Seeded Demo Credentials

The database auto-seeds on first boot with pre-configured curricula:
- **Email:** `demo@pathfinder.ai`
- **Password:** `Password123!`
- *Or use the "⚡ Quick Fill Seeded Demo User" button in the Sign In modal.*

---

## 🛣️ API Routes & Database Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Registers new user with PBKDF2 hash & returns JWT |
| `POST` | `/api/auth/login` | Authenticates user & returns JWT |
| `GET` | `/api/auth/me` | Validates JWT & retrieves user profile + paths |
| `GET` | `/api/paths` | Retrieves all roadmaps (public or user-scoped) |
| `GET` | `/api/paths/:id` | Retrieves full roadmap with phases & milestones |
| `POST` | `/api/paths/generate` | Synthesizes a new customized curriculum into DB |
| `PATCH` | `/api/milestones/:id/toggle` | Toggles milestone completion & recalculates `overallProgress` |
| `POST` | `/api/paths/:id/claim` | Associates guest-generated path with logged-in user |

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/aroramukti1477-svg/Pathfinder.git
cd Pathfinder
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
# Starts both frontend client and Express backend concurrently
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📄 License
MIT License. Crafted with precision for ambitious learners.
