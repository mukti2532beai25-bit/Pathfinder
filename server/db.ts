import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface DBUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  skillLevel: string;
  createdAt: string;
}

export interface DBMilestone {
  id: string;
  phaseId: string;
  title: string;
  category: 'COURSE' | 'EXERCISE' | 'NEXT_STEP';
  details: string;
  resourceUrl?: string | null;
  estimatedHours: number;
  isCompleted: boolean;
  completedAt?: string | null;
}

export interface DBPhase {
  id: string;
  pathId: string;
  phaseOrder: number;
  title: string;
  duration: string;
  summary: string;
  milestones?: DBMilestone[];
}

export interface DBLearningPath {
  id: string;
  userId?: string | null;
  goalTitle: string;
  skillLevel: string;
  weeklyHours: number;
  learningStyle: string;
  overallProgress: number;
  createdAt: string;
  phases?: DBPhase[];
}

interface DatabaseSchema {
  users: DBUser[];
  learningPaths: DBLearningPath[];
  phases: DBPhase[];
  milestones: DBMilestone[];
}

const DB_PATH = path.resolve(process.cwd(), 'prisma', 'dev.db');

class PersistentDatabase {
  private data: DatabaseSchema = {
    users: [],
    learningPaths: [],
    phases: [],
    milestones: [],
  };

  constructor() {
    this.init();
  }

  private init() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(DB_PATH)) {
      try {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        this.data = JSON.parse(raw);
      } catch {
        this.save();
      }
    } else {
      this.save();
    }
  }

  private save() {
    try {
      const tempPath = `${DB_PATH}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_PATH);
    } catch (e) {
      console.error('Failed to save database:', e);
    }
  }

  // --- USER OPERATIONS ---
  public user = {
    create: async ({ data }: { data: Omit<DBUser, 'id' | 'createdAt'> }) => {
      const newUser: DBUser = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      this.data.users.push(newUser);
      this.save();
      return newUser;
    },
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email) {
        return this.data.users.find((u) => u.email.toLowerCase() === where.email?.toLowerCase()) || null;
      }
      if (where.id) {
        return this.data.users.find((u) => u.id === where.id) || null;
      }
      return null;
    },
    findMany: async () => {
      return this.data.users;
    },
  };

  // --- LEARNING PATH OPERATIONS ---
  public learningPath = {
    create: async ({
      data,
    }: {
      data: Omit<DBLearningPath, 'id' | 'createdAt'> & {
        phases?: {
          create: (Omit<DBPhase, 'id' | 'pathId'> & {
            milestones?: { create: Omit<DBMilestone, 'id' | 'phaseId'>[] };
          })[];
        };
      };
    }) => {
      const pathId = crypto.randomUUID();
      const newPath: DBLearningPath = {
        id: pathId,
        userId: data.userId || null,
        goalTitle: data.goalTitle,
        skillLevel: data.skillLevel,
        weeklyHours: data.weeklyHours,
        learningStyle: data.learningStyle || 'Balanced',
        overallProgress: data.overallProgress || 0.0,
        createdAt: new Date().toISOString(),
      };

      this.data.learningPaths.push(newPath);

      if (data.phases?.create) {
        for (const phaseInput of data.phases.create) {
          const phaseId = crypto.randomUUID();
          const newPhase: DBPhase = {
            id: phaseId,
            pathId,
            phaseOrder: phaseInput.phaseOrder,
            title: phaseInput.title,
            duration: phaseInput.duration,
            summary: phaseInput.summary,
          };
          this.data.phases.push(newPhase);

          if (phaseInput.milestones?.create) {
            for (const msInput of phaseInput.milestones.create) {
              const newMs: DBMilestone = {
                id: crypto.randomUUID(),
                phaseId,
                title: msInput.title,
                category: msInput.category,
                details: msInput.details,
                resourceUrl: msInput.resourceUrl || null,
                estimatedHours: msInput.estimatedHours || 4,
                isCompleted: msInput.isCompleted || false,
                completedAt: msInput.completedAt || null,
              };
              this.data.milestones.push(newMs);
            }
          }
        }
      }

      this.save();
      return this.learningPath.findUnique({ where: { id: pathId } });
    },

    findUnique: async ({ where }: { where: { id: string } }) => {
      const p = this.data.learningPaths.find((item) => item.id === where.id);
      if (!p) return null;

      const pathPhases = this.data.phases
        .filter((phase) => phase.pathId === p.id)
        .sort((a, b) => a.phaseOrder - b.phaseOrder)
        .map((phase) => ({
          ...phase,
          milestones: this.data.milestones.filter((m) => m.phaseId === phase.id),
        }));

      return {
        ...p,
        phases: pathPhases,
      };
    },

    findMany: async (args?: { where?: { userId?: string | null } }) => {
      let filtered = this.data.learningPaths;
      if (args?.where?.userId !== undefined) {
        filtered = filtered.filter((p) => p.userId === args.where?.userId);
      }
      return filtered.map((p) => {
        const pathPhases = this.data.phases
          .filter((phase) => phase.pathId === p.id)
          .sort((a, b) => a.phaseOrder - b.phaseOrder)
          .map((phase) => ({
            ...phase,
            milestones: this.data.milestones.filter((m) => m.phaseId === phase.id),
          }));
        return {
          ...p,
          phases: pathPhases,
        };
      });
    },

    update: async ({
      where,
      data,
    }: {
      where: { id: string };
      data: Partial<DBLearningPath>;
    }) => {
      const idx = this.data.learningPaths.findIndex((p) => p.id === where.id);
      if (idx === -1) return null;
      this.data.learningPaths[idx] = { ...this.data.learningPaths[idx], ...data };
      this.save();
      return this.learningPath.findUnique({ where });
    },
  };

  // --- MILESTONE OPERATIONS ---
  public milestone = {
    findUnique: async ({ where }: { where: { id: string } }) => {
      return this.data.milestones.find((m) => m.id === where.id) || null;
    },

    update: async ({
      where,
      data,
    }: {
      where: { id: string };
      data: Partial<DBMilestone>;
    }) => {
      const idx = this.data.milestones.findIndex((m) => m.id === where.id);
      if (idx === -1) return null;
      this.data.milestones[idx] = { ...this.data.milestones[idx], ...data };

      // Recalculate overall progress for the parent learning path
      const phase = this.data.phases.find((ph) => ph.id === this.data.milestones[idx].phaseId);
      if (phase) {
        const allPhaseIds = this.data.phases
          .filter((ph) => ph.pathId === phase.pathId)
          .map((ph) => ph.id);
        const pathMilestones = this.data.milestones.filter((m) => allPhaseIds.includes(m.phaseId));
        const total = pathMilestones.length;
        const completed = pathMilestones.filter((m) => m.isCompleted).length;
        const progress = total > 0 ? Math.round((completed / total) * 100 * 10) / 10 : 0;

        const pathIdx = this.data.learningPaths.findIndex((p) => p.id === phase.pathId);
        if (pathIdx !== -1) {
          this.data.learningPaths[pathIdx].overallProgress = progress;
        }
      }

      this.save();
      return this.data.milestones[idx];
    },
  };

  // --- SEED HELPER ---
  public clearAll() {
    this.data = { users: [], learningPaths: [], phases: [], milestones: [] };
    this.save();
  }
}

export const prisma = new PersistentDatabase();
