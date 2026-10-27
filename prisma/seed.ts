import { prisma } from '../server/db';
import { hashPassword } from '../server/auth';

export async function seedDatabase() {
  console.log('🌱 Seeding Pathfinder AI Database...');

  // Create demo user
  const demoEmail = 'demo@pathfinder.ai';
  let demoUser = await prisma.user.findUnique({ where: { email: demoEmail } });
  if (!demoUser) {
    demoUser = await prisma.user.create({
      data: {
        name: 'Alex Rivera',
        email: demoEmail,
        passwordHash: hashPassword('Password123!'),
        skillLevel: 'Intermediate',
      },
    });
    console.log('  ✓ Created Demo User: demo@pathfinder.ai (Password: Password123!)');
  }

  // Pre-seed Java & DSA Mastery
  const existingPaths = await prisma.learningPath.findMany();
  const javaExists = existingPaths.some((p) => p.goalTitle.includes('Java'));

  if (!javaExists) {
    await prisma.learningPath.create({
      data: {
        userId: demoUser.id,
        goalTitle: 'Java & Data Structures & Algorithms Mastery',
        skillLevel: 'Beginner',
        weeklyHours: 15,
        learningStyle: 'Balanced',
        overallProgress: 18.0,
        phases: {
          create: [
            {
              phaseOrder: 1,
              title: 'Java Core & Modern OOP Architecture',
              duration: '3 Weeks',
              summary: 'Deep dive into object-oriented design, JVM internals, memory management (Stack vs Heap), and modern Java Collections Framework.',
              milestones: {
                create: [
                  {
                    title: 'Java Programming Masterclass: OOP & Memory Deep Dive',
                    category: 'COURSE',
                    details: 'Coursera course covering OOP principles, JVM Stack vs Heap memory model, and Generics.',
                    resourceUrl: 'https://coursera.org',
                    estimatedHours: 14,
                    isCompleted: true,
                    completedAt: new Date().toISOString(),
                  },
                  {
                    title: 'Implement Custom Generic ArrayList & HashMap',
                    category: 'EXERCISE',
                    details: 'Write an auto-resizing array and separate-chaining hash map without using java.util containers.',
                    resourceUrl: 'https://leetcode.com',
                    estimatedHours: 6,
                    isCompleted: true,
                    completedAt: new Date().toISOString(),
                  },
                  {
                    title: 'Stream Pipeline for Log File Aggregation',
                    category: 'NEXT_STEP',
                    details: 'Parse raw access logs and calculate 99th percentile response time using parallel streams.',
                    resourceUrl: 'https://docs.oracle.com',
                    estimatedHours: 4,
                    isCompleted: false,
                  },
                ],
              },
            },
            {
              phaseOrder: 2,
              title: 'Linear Data Structures & Time Complexity Mastery',
              duration: '4 Weeks',
              summary: 'Master amortized asymptotic analysis (Big-O), recursion trees, fast & slow pointers, monotonic stacks, and circular queues.',
              milestones: {
                create: [
                  {
                    title: 'MIT 6.006: Introduction to Algorithms (Data Structures)',
                    category: 'COURSE',
                    details: 'MIT OpenCourseWare video series and problem sets on asymptotic analysis and hashing.',
                    resourceUrl: 'https://ocw.mit.edu',
                    estimatedHours: 18,
                    isCompleted: false,
                  },
                  {
                    title: 'Trapping Rain Water & Daily Temperatures',
                    category: 'EXERCISE',
                    details: 'Implement O(N) monotonic stack solutions for classical hard interview problems.',
                    resourceUrl: 'https://leetcode.com',
                    estimatedHours: 8,
                    isCompleted: false,
                  },
                  {
                    title: 'Design LRU Cache with O(1) Get and Put',
                    category: 'NEXT_STEP',
                    details: 'Design an LRU Cache using a hash map combined with a doubly linked list.',
                    resourceUrl: 'https://github.com',
                    estimatedHours: 6,
                    isCompleted: false,
                  },
                ],
              },
            },
            {
              phaseOrder: 3,
              title: 'Non-Linear Structures: Trees, Tries & Heaps',
              duration: '3 Weeks',
              summary: 'Traverse and manipulate hierarchical structures with DFS/BFS, topological sweeps, max/min heaps, and Trie autocomplete engines.',
              milestones: {
                create: [
                  {
                    title: 'Stanford CS106B: Tree Structures & Heaps',
                    category: 'COURSE',
                    details: 'Stanford Online lecture series covering BST balance, priority queues, and heaps.',
                    resourceUrl: 'https://online.stanford.edu',
                    estimatedHours: 12,
                    isCompleted: false,
                  },
                  {
                    title: 'Serialize and Deserialize Binary Tree',
                    category: 'EXERCISE',
                    details: 'Design an algorithm to encode a binary tree to string and decode back.',
                    resourceUrl: 'https://leetcode.com',
                    estimatedHours: 6,
                    isCompleted: false,
                  },
                ],
              },
            },
            {
              phaseOrder: 4,
              title: 'Graphs, Dynamic Programming & FAANG Interview Drills',
              duration: '2 Weeks',
              summary: 'Conquer multi-source BFS, union-find disjoint sets, 1D/2D memoization tables, bitmask DP, and mock drills.',
              milestones: {
                create: [
                  {
                    title: 'Dynamic Programming Masterclass: From Memoization to Tabulation',
                    category: 'COURSE',
                    details: 'Master knapsack variants and shortest path graph algorithms.',
                    resourceUrl: 'https://freecodecamp.org',
                    estimatedHours: 10,
                    isCompleted: false,
                  },
                  {
                    title: 'GPS Route Planner & Network Flow Capstone',
                    category: 'NEXT_STEP',
                    details: 'Implement Dijkstra and A* pathfinding on real road network coordinates.',
                    resourceUrl: 'https://github.com',
                    estimatedHours: 12,
                    isCompleted: false,
                  },
                ],
              },
            },
          ],
        },
      },
    });
    console.log('  ✓ Seeded Path: Java & Data Structures & Algorithms Mastery');
  }

  // Pre-seed Full-Stack Web Dev
  const fsExists = existingPaths.some((p) => p.goalTitle.includes('Full-Stack'));
  if (!fsExists) {
    await prisma.learningPath.create({
      data: {
        userId: demoUser.id,
        goalTitle: 'Modern Full-Stack Web Development',
        skillLevel: 'Intermediate',
        weeklyHours: 20,
        learningStyle: 'Hands-On',
        overallProgress: 0.0,
        phases: {
          create: [
            {
              phaseOrder: 1,
              title: 'Modern Frontend Architecture & State Machines',
              duration: '3 Weeks',
              summary: 'React 19 Server Components, custom hooks, Tailwind CSS, TypeScript generics, and optimistic UI updates.',
              milestones: {
                create: [
                  {
                    title: 'React 19 Deep Dive & Server Actions',
                    category: 'COURSE',
                    details: 'freeCodeCamp comprehensive guide to React 19 compiler and server actions.',
                    resourceUrl: 'https://freecodecamp.org',
                    estimatedHours: 10,
                    isCompleted: false,
                  },
                  {
                    title: 'Build Virtual Windowed Scroller for 100k DOM Nodes',
                    category: 'EXERCISE',
                    details: 'Implement high-performance windowed virtualization container without third-party libraries.',
                    resourceUrl: 'https://github.com',
                    estimatedHours: 8,
                    isCompleted: false,
                  },
                ],
              },
            },
            {
              phaseOrder: 2,
              title: 'Backend Services, APIs & Relational Schemas',
              duration: '3 Weeks',
              summary: 'Node.js, Express, PostgreSQL, Prisma ORM, and secure OAuth2/JWT session flows.',
              milestones: {
                create: [
                  {
                    title: 'Production Microservices with Node.js & Clean Architecture',
                    category: 'COURSE',
                    details: 'Coursera specialization covering domain-driven design in Node.js.',
                    resourceUrl: 'https://coursera.org',
                    estimatedHours: 15,
                    isCompleted: false,
                  },
                  {
                    title: 'Multi-Tenant SaaS API with RBAC & Stripe Billing',
                    category: 'NEXT_STEP',
                    details: 'Deliver an enterprise backend with role-based access control and webhooks.',
                    resourceUrl: 'https://github.com',
                    estimatedHours: 12,
                    isCompleted: false,
                  },
                ],
              },
            },
          ],
        },
      },
    });
    console.log('  ✓ Seeded Path: Modern Full-Stack Web Development');
  }

  console.log('✅ Database Seeding Complete.');
}

if (process.argv[1]?.includes('seed')) {
  seedDatabase().catch(console.error);
}
