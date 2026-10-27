import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { prisma } from './db';
import { hashPassword, verifyPassword, signToken, verifyToken, JWTPayload } from './auth';
import { seedDatabase } from '../prisma/seed';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Auth Middleware
interface AuthRequest extends Request {
  user?: JWTPayload;
}

const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }

  req.user = payload;
  next();
};

// ----------------- AUTH ROUTES -----------------
// POST /api/auth/signup
app.post('/api/auth/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, skillLevel } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
        skillLevel: skillLevel || 'Beginner',
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        skillLevel: user.skillLevel,
      },
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        skillLevel: user.skillLevel,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userPaths = await prisma.learningPath.findMany({
      where: { userId: user.id },
    });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        skillLevel: user.skillLevel,
      },
      paths: userPaths,
    });
  } catch (err: any) {
    console.error('Me error:', err);
    return res.status(500).json({ error: 'Internal server error fetching user' });
  }
});

// ----------------- PATH & MILESTONE ROUTES -----------------
// GET /api/paths
app.get('/api/paths', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    let userId: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const payload = verifyToken(authHeader.split(' ')[1]);
      if (payload) userId = payload.userId;
    }

    // Return paths for user if logged in, or all prebuilt/public paths
    const paths = await prisma.learningPath.findMany(
      userId ? { where: { userId } } : undefined
    );
    return res.json(paths);
  } catch (err: any) {
    console.error('Fetch paths error:', err);
    return res.status(500).json({ error: 'Failed to fetch paths' });
  }
});

// GET /api/paths/:id
app.get('/api/paths/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pathItem = await prisma.learningPath.findUnique({ where: { id } });
    if (!pathItem) {
      return res.status(404).json({ error: 'Learning path not found' });
    }
    return res.json(pathItem);
  } catch (err: any) {
    console.error('Get path error:', err);
    return res.status(500).json({ error: 'Failed to retrieve path' });
  }
});

// POST /api/paths/generate
app.post('/api/paths/generate', async (req: Request, res: Response) => {
  try {
    const { goalTitle, skillLevel = 'Beginner', weeklyHours = 15, learningStyle = 'Balanced', userId } = req.body;
    if (!goalTitle) {
      return res.status(400).json({ error: 'Target goalTitle is required' });
    }

    const totalWeeks = Math.max(6, Math.round(180 / weeklyHours));

    // Dynamic AI curriculum synthesis
    const phasesData = [
      {
        phaseOrder: 1,
        title: `Phase 01: ${goalTitle} Core Foundations`,
        duration: `${Math.max(2, Math.round(totalWeeks * 0.3))} Weeks`,
        summary: `Establish the foundational architecture, language syntax, toolchains, and mental models for ${goalTitle}.`,
        milestones: {
          create: [
            {
              title: `${goalTitle} In-Depth Specification & Architecture Guide`,
              category: 'COURSE' as const,
              details: 'Comprehensive conceptual walkthrough covering language fundamentals, memory, and core paradigms.',
              resourceUrl: 'https://ocw.mit.edu',
              estimatedHours: Math.round(weeklyHours * 0.6),
              isCompleted: false,
            },
            {
              title: `Hands-On Diagnostic Coding Lab: ${goalTitle}`,
              category: 'EXERCISE' as const,
              details: 'Build and document a modular component solving foundational edge-cases.',
              resourceUrl: 'https://leetcode.com',
              estimatedHours: Math.round(weeklyHours * 0.4),
              isCompleted: false,
            },
            {
              title: 'Automated CI/CD Test Pipeline & Verification',
              category: 'NEXT_STEP' as const,
              details: 'Configure unit testing and linting rules in your GitHub repository.',
              resourceUrl: 'https://docs.github.com',
              estimatedHours: 4,
              isCompleted: false,
            },
          ],
        },
      },
      {
        phaseOrder: 2,
        title: `Phase 02: Intermediate System Design & Data Flow`,
        duration: `${Math.max(2, Math.round(totalWeeks * 0.4))} Weeks`,
        summary: `Scale complexity with design patterns, defensive concurrency, asynchronous streaming, and relational caching.`,
        milestones: {
          create: [
            {
              title: `Advanced Architectural Design Patterns in ${goalTitle}`,
              category: 'COURSE' as const,
              details: 'Stanford Online lecture curriculum on decoupled architecture and latency optimization.',
              resourceUrl: 'https://online.stanford.edu',
              estimatedHours: Math.round(weeklyHours * 0.5),
              isCompleted: false,
            },
            {
              title: 'High-Throughput Concurrent Processing Challenge',
              category: 'EXERCISE' as const,
              details: 'Implement thread-safe queues and benchmark performance against baseline metrics.',
              resourceUrl: 'https://github.com',
              estimatedHours: Math.round(weeklyHours * 0.5),
              isCompleted: false,
            },
          ],
        },
      },
      {
        phaseOrder: 3,
        title: `Phase 03: Production Capstone & Enterprise Hardening`,
        duration: `${Math.max(2, Math.round(totalWeeks * 0.3))} Weeks`,
        summary: `Deploy a production-grade portfolio capstone showcasing your enterprise readiness in ${goalTitle}.`,
        milestones: {
          create: [
            {
              title: `Enterprise Production Engineering for ${goalTitle}`,
              category: 'COURSE' as const,
              details: 'Deep dive into fault tolerance, zero-downtime deployments, and telemetry monitoring.',
              resourceUrl: 'https://coursera.org',
              estimatedHours: Math.round(weeklyHours * 0.4),
              isCompleted: false,
            },
            {
              title: 'Flagship Production Capstone Project Build',
              category: 'NEXT_STEP' as const,
              details: 'Deliver an end-to-end working system with public demo, documentation, and architecture diagrams.',
              resourceUrl: 'https://github.com',
              estimatedHours: Math.round(weeklyHours * 0.6),
              isCompleted: false,
            },
          ],
        },
      },
    ];

    const newPath = await prisma.learningPath.create({
      data: {
        userId: userId || null,
        goalTitle,
        skillLevel,
        weeklyHours,
        learningStyle,
        overallProgress: 0.0,
        phases: {
          create: phasesData,
        },
      },
    });

    return res.status(201).json(newPath);
  } catch (err: any) {
    console.error('Generate path error:', err);
    return res.status(500).json({ error: 'Failed to generate path' });
  }
});

// PATCH /api/milestones/:id/toggle
app.patch('/api/milestones/:id/toggle', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const milestone = await prisma.milestone.findUnique({ where: { id } });
    if (!milestone) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    const newStatus = !milestone.isCompleted;
    const updated = await prisma.milestone.update({
      where: { id },
      data: {
        isCompleted: newStatus,
        completedAt: newStatus ? new Date().toISOString() : null,
      },
    });

    // Retrieve updated parent path with overall progress
    const allPaths = await prisma.learningPath.findMany();
    const parentPath = allPaths.find((p) =>
      p.phases?.some((ph) => ph.milestones?.some((m) => m.id === id))
    );

    return res.json({
      milestone: updated,
      overallProgress: parentPath ? parentPath.overallProgress : 0,
    });
  } catch (err: any) {
    console.error('Toggle milestone error:', err);
    return res.status(500).json({ error: 'Failed to toggle milestone' });
  }
});

// POST /api/paths/:id/claim (Guest-to-User sync)
app.post('/api/paths/:id/claim', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await prisma.learningPath.update({
      where: { id },
      data: { userId: req.user!.userId },
    });
    return res.json(updated);
  } catch (err: any) {
    console.error('Claim path error:', err);
    return res.status(500).json({ error: 'Failed to associate path with user' });
  }
});

// ----------------- SERVE STATIC CLIENT IN PRODUCTION -----------------
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Auto seed on boot if empty
seedDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Pathfinder AI Full-Stack Server live on port ${PORT}`);
      console.log(`🔗 Local API: http://localhost:${PORT}/api/paths`);
    });
  })
  .catch((err) => {
    console.error('Fatal initialization error:', err);
  });
