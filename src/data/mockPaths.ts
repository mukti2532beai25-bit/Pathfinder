import { LearningPath, DifficultyLevel } from '../types';

export const PRESET_TOPICS = [
  { label: 'Java & DSA Mastery', icon: '☕', level: 'Beginner' as DifficultyLevel, hours: 15 },
  { label: 'Full-Stack Web Dev', icon: '⚡', level: 'Intermediate' as DifficultyLevel, hours: 20 },
  { label: 'AI/ML Engineering', icon: '🧠', level: 'Intermediate' as DifficultyLevel, hours: 18 },
  { label: 'System Design', icon: '🏗️', level: 'Advanced' as DifficultyLevel, hours: 12 },
  { label: 'Cloud & DevOps', icon: '☁️', level: 'Intermediate' as DifficultyLevel, hours: 14 },
  { label: 'Cybersecurity', icon: '🛡️', level: 'Beginner' as DifficultyLevel, hours: 10 }
];

export const PREBUILT_PATHS: Record<string, LearningPath> = {
  'java-dsa': {
    id: 'java-dsa',
    title: 'Java & Data Structures & Algorithms Mastery',
    targetGoal: 'Java & DSA Mastery',
    level: 'Beginner',
    weeklyHours: 15,
    totalWeeks: 12,
    totalHours: 180,
    badge: 'Elite Problem Solver',
    color: 'from-amber-400 to-amber-600',
    summary: 'From Java fundamentals and OOP principles to complex graph algorithms and top 150 LeetCode patterns.',
    createdAt: '2026-10-27',
    milestones: [
      {
        id: 'jd-m1',
        phaseNumber: 1,
        title: 'Java Core & Modern OOP Architecture',
        tagline: 'Master JVM memory, generics, collections, and streams',
        durationWeeks: 3,
        difficulty: 'Beginner',
        overview: 'Deep dive into object-oriented design, JVM internals, memory management (Stack vs Heap), and the modern Java 21+ Collections Framework.',
        skillsAcquired: ['Java 21 Syntax', 'Encapsulation & Polymorphism', 'JVM Memory Model', 'Generics & Wildcards', 'Stream API & Lambdas'],
        deliverable: 'CLI-based Banking Transaction Engine with concurrency-safe accounts and stream filtering',
        modules: [
          {
            id: 'mod-101',
            title: 'Java Programming Masterclass: OOP & Memory Deep Dive',
            provider: 'Coursera',
            duration: '14 hrs',
            type: 'video',
            url: 'https://www.coursera.org',
            completed: true
          },
          {
            id: 'mod-102',
            title: 'Deep Understanding of Java Collections & Generics',
            provider: 'YouTube',
            duration: '6 hrs',
            type: 'video',
            url: 'https://youtube.com',
            completed: false
          },
          {
            id: 'mod-103',
            title: 'Oracle Java 21 Official Language Specifications',
            provider: 'Official Docs',
            duration: '4 hrs',
            type: 'article',
            url: 'https://docs.oracle.com',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'ex-101',
            title: 'Custom Generic ArrayList & HashMap Implementation',
            description: 'Write your own auto-resizing array list and separate-chaining hash map without using java.util containers.',
            type: 'coding',
            difficulty: 'Medium',
            estimatedMinutes: 90,
            completed: true,
            solutionHint: 'Use an Object[] backing array and implement rehashing when load factor exceeds 0.75.'
          },
          {
            id: 'ex-102',
            title: 'Stream Pipeline for Log File Aggregation',
            description: 'Parse 100k raw access logs and calculate 99th percentile response time and top 5 status codes using parallel streams.',
            type: 'challenge',
            difficulty: 'Medium',
            estimatedMinutes: 60,
            completed: false
          }
        ],
        checkpointQuiz: {
          id: 'quiz-101',
          question: 'What happens when two distinct Java objects produce the exact same hashCode in a standard HashMap?',
          options: [
            'A runtime CollisionException is thrown',
            'The second object overwrites the first completely',
            'They are stored in the same bucket and compared with equals()',
            'The JVM dynamically expands the heap'
          ],
          correctAnswer: 2,
          explanation: 'Hash collisions place entries into the same bucket chain (linked list or red-black tree in Java 8+). Retrieval distinguishes them by calling equals().'
        }
      },
      {
        id: 'jd-m2',
        phaseNumber: 2,
        title: 'Linear Data Structures & Time Complexity Mastery',
        tagline: 'Master Two Pointers, Sliding Window, Linked Lists, and Stacks',
        durationWeeks: 4,
        difficulty: 'Intermediate',
        overview: 'Master amortized asymptotic analysis (Big-O), recursion trees, fast & slow pointers, monotonic stacks, and circular queues.',
        skillsAcquired: ['Big-O Analysis', 'Fast & Slow Pointers', 'Sliding Window Patterns', 'Monotonic Stack / Queue', 'In-Place List Reversal'],
        deliverable: 'Interactive Browser History & Undo/Redo Engine built using doubly linked lists and stacks',
        modules: [
          {
            id: 'mod-201',
            title: 'MIT 6.006: Introduction to Algorithms (Data Structures)',
            provider: 'MIT OpenCourseWare',
            duration: '18 hrs',
            type: 'video',
            url: 'https://ocw.mit.edu',
            completed: false
          },
          {
            id: 'mod-202',
            title: 'Sliding Window & Two Pointer Master Patterns',
            provider: 'freeCodeCamp',
            duration: '5 hrs',
            type: 'interactive',
            url: 'https://freecodecamp.org',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'ex-201',
            title: 'Trapping Rain Water & Daily Temperatures',
            description: 'Implement O(N) monotonic stack solutions for classical hard interview problems.',
            type: 'coding',
            difficulty: 'Hard',
            estimatedMinutes: 75,
            completed: false,
            solutionHint: 'Maintain a decreasing stack of indices to compute bounded water heights.'
          },
          {
            id: 'ex-202',
            title: 'LRU Cache Design with O(1) Get and Put',
            description: 'Design a Least Recently Used cache using a hash map combined with a doubly linked list.',
            type: 'project',
            difficulty: 'Medium',
            estimatedMinutes: 80,
            completed: false
          }
        ],
        checkpointQuiz: {
          id: 'quiz-201',
          question: 'What is the optimal space complexity to reverse a singly linked list in-place?',
          options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
          correctAnswer: 1,
          explanation: 'An iterative three-pointer traversal (prev, curr, next) reverses the pointers with O(1) auxiliary space.'
        }
      },
      {
        id: 'jd-m3',
        phaseNumber: 3,
        title: 'Non-Linear Structures: Trees, Tries & Heap Heuristics',
        tagline: 'Binary Search Trees, AVL balance, Priority Queues, and Prefix Trees',
        durationWeeks: 3,
        difficulty: 'Intermediate',
        overview: 'Traverse and manipulate hierarchical structures with DFS/BFS, topological sweeps, max/min heaps, and Trie autocomplete engines.',
        skillsAcquired: ['Binary Tree Traversals', 'Lowest Common Ancestor', 'Min/Max Heap Mechanics', 'Trie Dictionary Indexing', 'Graph Representation'],
        deliverable: 'High-Throughput Autocomplete Search Engine with Prefix Ranking',
        modules: [
          {
            id: 'mod-301',
            title: 'Stanford CS106B: Tree Structures & Heaps',
            provider: 'Stanford Online',
            duration: '12 hrs',
            type: 'video',
            url: 'https://online.stanford.edu',
            completed: false
          },
          {
            id: 'mod-302',
            title: 'Trie Data Structure & Top-K Frequent Elements',
            provider: 'YouTube',
            duration: '4 hrs',
            type: 'video',
            url: 'https://youtube.com',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'ex-301',
            title: 'Serialize and Deserialize Binary Tree',
            description: 'Design an algorithm to encode a binary tree to a string and decode that string back to the original tree structure.',
            type: 'coding',
            difficulty: 'Hard',
            estimatedMinutes: 60,
            completed: false
          },
          {
            id: 'ex-302',
            title: 'Median Finder in a Data Stream',
            description: 'Maintain the running median of numbers arriving in real time using dual balancing heaps.',
            type: 'coding',
            difficulty: 'Hard',
            estimatedMinutes: 60,
            completed: false
          }
        ]
      },
      {
        id: 'jd-m4',
        phaseNumber: 4,
        title: 'Graphs, Dynamic Programming & Interview Simulation',
        tagline: 'Dijkstra, Bellman-Ford, Knapsack variants, and FAANG Mock Drills',
        durationWeeks: 2,
        difficulty: 'Advanced',
        overview: 'Conquer multi-source BFS, union-find disjoint sets, 1D/2D memoization tables, bitmask DP, and behavioral coding walkthroughs.',
        skillsAcquired: ['Dijkstra & A* Pathfinding', 'Disjoint Set Union (DSU)', '0/1 Knapsack & Unbounded DP', 'Longest Common Subsequence', 'Interview Communication'],
        deliverable: 'GPS Route Planner & Flight Network Optimization Suite',
        modules: [
          {
            id: 'mod-401',
            title: 'Dynamic Programming Masterclass: From Memoization to Tabulation',
            provider: 'freeCodeCamp',
            duration: '8 hrs',
            type: 'video',
            url: 'https://freecodecamp.org',
            completed: false
          },
          {
            id: 'mod-402',
            title: 'Advanced Graph Algorithms & Network Flow',
            provider: 'MIT OpenCourseWare',
            duration: '10 hrs',
            type: 'interactive',
            url: 'https://ocw.mit.edu',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'ex-401',
            title: 'Word Ladder II (Shortest Transformation Sequences)',
            description: 'Find all shortest transformation sequences from beginWord to endWord using bidirectional BFS and DFS backtracking.',
            type: 'challenge',
            difficulty: 'Hard',
            estimatedMinutes: 90,
            completed: false
          },
          {
            id: 'ex-402',
            title: 'Burst Balloons (Matrix Chain DP)',
            description: 'Compute max coins collectible by bursting balloons in optimal order with sub-interval DP.',
            type: 'coding',
            difficulty: 'Hard',
            estimatedMinutes: 70,
            completed: false
          }
        ]
      }
    ]
  },
  'fullstack': {
    id: 'fullstack',
    title: 'Modern Full-Stack Web Development (React & Node)',
    targetGoal: 'Full-Stack Web Dev',
    level: 'Intermediate',
    weeklyHours: 20,
    totalWeeks: 10,
    totalHours: 200,
    badge: 'Full-Stack Architect',
    color: 'from-amber-400 to-sky-500',
    summary: 'Build production-grade web applications from responsive modern UI with Tailwind to scalable REST & GraphQL microservices and PostgreSQL.',
    createdAt: '2026-10-27',
    milestones: [
      {
        id: 'fs-m1',
        phaseNumber: 1,
        title: 'Modern Frontend Architecture & State Machines',
        tagline: 'React 19, TypeScript, Tailwind CSS & Server Components',
        durationWeeks: 3,
        difficulty: 'Intermediate',
        overview: 'Master client vs server component boundaries, custom hooks, optimistic UI updates, and accessible component design.',
        skillsAcquired: ['React 19 Compiler', 'Custom Hooks & State', 'Tailwind CSS', 'TypeScript Generics', 'Performance Profiling'],
        deliverable: 'Collaborative Kanban Board with drag-and-drop and local offline persistence',
        modules: [
          {
            id: 'fs-101',
            title: 'React 19 Deep Dive & Server Actions',
            provider: 'freeCodeCamp',
            duration: '10 hrs',
            type: 'video',
            url: 'https://freecodecamp.org',
            completed: true
          },
          {
            id: 'fs-102',
            title: 'TypeScript for Advanced React Applications',
            provider: 'YouTube',
            duration: '5 hrs',
            type: 'interactive',
            url: 'https://youtube.com',
            completed: true
          }
        ],
        exercises: [
          {
            id: 'fse-101',
            title: 'Virtual List Scroller for 100,000 DOM Nodes',
            description: 'Build a high-performance windowed virtualization container without third-party libraries.',
            type: 'coding',
            difficulty: 'Medium',
            estimatedMinutes: 90,
            completed: false
          }
        ]
      },
      {
        id: 'fs-m2',
        phaseNumber: 2,
        title: 'Backend Services, APIs & Relational Schemas',
        tagline: 'Node.js, Express, PostgreSQL, Prisma ORM, and JWT Auth',
        durationWeeks: 3,
        difficulty: 'Intermediate',
        overview: 'Architect modular backend APIs, ACID-compliant database migrations, indexing strategies, and secure OAuth2/JWT session flows.',
        skillsAcquired: ['RESTful API Design', 'PostgreSQL Indexing', 'Prisma ORM', 'JWT & Refresh Tokens', 'Rate Limiting'],
        deliverable: 'Multi-tenant SaaS API with role-based access control and Stripe billing integration',
        modules: [
          {
            id: 'fs-201',
            title: 'Node.js Production Microservices & Clean Architecture',
            provider: 'Coursera',
            duration: '15 hrs',
            type: 'video',
            url: 'https://coursera.org',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'fse-201',
            title: 'Database Connection Pool & Query Optimization',
            description: 'Analyze slow queries with EXPLAIN ANALYZE and implement composite B-Tree indexes.',
            type: 'project',
            difficulty: 'Medium',
            estimatedMinutes: 75,
            completed: false
          }
        ]
      },
      {
        id: 'fs-m3',
        phaseNumber: 3,
        title: 'Real-Time WebSockets & Cloud Deployment CI/CD',
        tagline: 'Socket.io, Docker containers, Redis caching, and AWS ECS',
        durationWeeks: 4,
        difficulty: 'Advanced',
        overview: 'Scale full-stack systems using Redis pub/sub channels, Docker multi-stage builds, automated GitHub Actions pipelines, and cloud monitoring.',
        skillsAcquired: ['WebSockets & Event Streams', 'Redis Caching & PubSub', 'Docker Multi-Stage', 'GitHub Actions CI/CD', 'AWS Cloud Deployments'],
        deliverable: 'Real-Time Multiplayer Collaborative Whiteboard deployed on AWS',
        modules: [
          {
            id: 'fs-301',
            title: 'Docker & Kubernetes for Full Stack Engineers',
            provider: 'YouTube',
            duration: '12 hrs',
            type: 'video',
            url: 'https://youtube.com',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'fse-301',
            title: 'Zero-Downtime Rolling Deployment Pipeline',
            description: 'Configure automated test runs, Docker image builds, and automated push to AWS ECS.',
            type: 'project',
            difficulty: 'Hard',
            estimatedMinutes: 120,
            completed: false
          }
        ]
      }
    ]
  },
  'ai-ml': {
    id: 'ai-ml',
    title: 'AI & Machine Learning Engineering Roadmap',
    targetGoal: 'AI/ML Engineering',
    level: 'Intermediate',
    weeklyHours: 18,
    totalWeeks: 12,
    totalHours: 216,
    badge: 'Neural Network Engineer',
    color: 'from-amber-400 to-emerald-500',
    summary: 'Master the math, deep learning architectures, Transformer models, LLM fine-tuning, and production RAG systems.',
    createdAt: '2026-10-27',
    milestones: [
      {
        id: 'ai-m1',
        phaseNumber: 1,
        title: 'Mathematical Foundations & Python for Data Science',
        tagline: 'Linear Algebra, Calculus, NumPy, Pandas, and Scikit-Learn',
        durationWeeks: 3,
        difficulty: 'Intermediate',
        overview: 'Vector spaces, matrix decomposition (SVD, PCA), gradient descent derivations, data normalization, and supervised regression/classification.',
        skillsAcquired: ['Vector Calculus', 'NumPy Vectorization', 'Feature Engineering', 'Scikit-Learn Pipelines', 'Cross-Validation'],
        deliverable: 'Algorithmic Trading & Stock Trend Predictor with Backtesting Framework',
        modules: [
          {
            id: 'aim-101',
            title: 'Mathematics for Machine Learning Specialization',
            provider: 'Coursera',
            duration: '16 hrs',
            type: 'video',
            url: 'https://coursera.org',
            completed: true
          }
        ],
        exercises: [
          {
            id: 'aie-101',
            title: 'Vectorized Gradient Descent from Scratch in Pure NumPy',
            description: 'Implement multi-variable linear regression and logistic regression with L1/L2 regularization without Scikit-Learn.',
            type: 'coding',
            difficulty: 'Medium',
            estimatedMinutes: 90,
            completed: false
          }
        ]
      },
      {
        id: 'ai-m2',
        phaseNumber: 2,
        title: 'Deep Learning & PyTorch Neural Networks',
        tagline: 'Backpropagation, CNNs, RNNs, and Attention Mechanics',
        durationWeeks: 4,
        difficulty: 'Advanced',
        overview: 'Build neural networks from scratch, implement custom PyTorch autograd functions, Convolutional networks for vision, and self-attention heads.',
        skillsAcquired: ['PyTorch Tensors & CUDA', 'Backpropagation Calculus', 'Vision Transformers (ViT)', 'Optimization (AdamW, Cosine Annealing)', 'Transfer Learning'],
        deliverable: 'Medical Imaging Anomaly Classifier with Grad-CAM Explainability',
        modules: [
          {
            id: 'aim-201',
            title: 'Deep Learning Specialization by Andrew Ng',
            provider: 'Coursera',
            duration: '22 hrs',
            type: 'video',
            url: 'https://coursera.org',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'aie-201',
            title: 'Multi-Head Attention from Scratch in PyTorch',
            description: 'Write the scaled dot-product attention calculation with causal masking.',
            type: 'coding',
            difficulty: 'Hard',
            estimatedMinutes: 80,
            completed: false
          }
        ]
      },
      {
        id: 'ai-m3',
        phaseNumber: 3,
        title: 'Generative AI, LLMs & Production RAG Systems',
        tagline: 'LangChain, Vector DBs (Pinecone/Milvus), LoRA Fine-Tuning, and Agentic Workflows',
        durationWeeks: 5,
        difficulty: 'Advanced',
        overview: 'Fine-tune open weights models (Llama 3, Mistral) with PEFT/LoRA, construct hybrid semantic vector retrieval pipelines, and build tool-calling agents.',
        skillsAcquired: ['Vector Embeddings & Cosine Distance', 'Hybrid RAG & Re-ranking', 'LoRA / QLoRA Fine-Tuning', 'Agentic Reason-and-Act (ReAct)', 'vLLM Serving'],
        deliverable: 'Autonomous Research Assistant with Hybrid Document RAG and Code Sandbox Tool Execution',
        modules: [
          {
            id: 'aim-301',
            title: 'Full Stack LLM Boot Camp & Production Engineering',
            provider: 'YouTube',
            duration: '14 hrs',
            type: 'video',
            url: 'https://youtube.com',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'aie-301',
            title: 'Custom Reciprocal Rank Fusion (RRF) Hybrid Retriever',
            description: 'Combine BM25 keyword matching with dense OpenAI/BGE embeddings using custom reciprocal rank fusion.',
            type: 'coding',
            difficulty: 'Hard',
            estimatedMinutes: 100,
            completed: false
          }
        ]
      }
    ]
  },
  'system-design': {
    id: 'system-design',
    title: 'High-Scale Distributed System Design',
    targetGoal: 'System Design',
    level: 'Advanced',
    weeklyHours: 12,
    totalWeeks: 8,
    totalHours: 96,
    badge: 'Principal Architect',
    color: 'from-amber-400 to-indigo-500',
    summary: 'Design global resilient platforms handling 100M+ requests/sec: CAP theorem, distributed consensus, Kafka, and sharding.',
    createdAt: '2026-10-27',
    milestones: [
      {
        id: 'sd-m1',
        phaseNumber: 1,
        title: 'Distributed Foundations & High-Availability Primitives',
        tagline: 'CAP Theorem, PACELC, Load Balancing & Consistent Hashing',
        durationWeeks: 3,
        difficulty: 'Advanced',
        overview: 'Deep dive into trade-offs between consistency and availability, dynamic load balancing algorithms (least connections, round robin), and consistent hashing rings.',
        skillsAcquired: ['Consistent Hashing Rings', 'CAP & PACELC Trade-offs', 'L4 vs L7 Load Balancers', 'Reverse Proxies & Rate Limiting'],
        deliverable: 'Consistent Hashing Virtual Node Simulator with zero downtime re-balancing',
        modules: [
          {
            id: 'sd-101',
            title: 'MIT 6.824: Distributed Systems',
            provider: 'MIT OpenCourseWare',
            duration: '20 hrs',
            type: 'video',
            url: 'https://ocw.mit.edu',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'sde-101',
            title: 'Consistent Hashing Ring with Virtual Nodes in Java/TypeScript',
            description: 'Implement node addition/removal with minimal key redistribution across 1,000 servers.',
            type: 'coding',
            difficulty: 'Hard',
            estimatedMinutes: 80,
            completed: false
          }
        ]
      },
      {
        id: 'sd-m2',
        phaseNumber: 2,
        title: 'Event Streaming, Consensus & Real-World Blueprints',
        tagline: 'Kafka Partitioning, Raft Consensus, Distributed Caching, and Microservices',
        durationWeeks: 5,
        difficulty: 'Advanced',
        overview: 'Architect real-world enterprise architectures: Netflix Video Streaming, Uber Geospatial Dispatch, Twitter Feed Fanout, and YouTube Upload Pipeline.',
        skillsAcquired: ['Apache Kafka Event Sourcing', 'Raft & Paxos Consensus', 'Geospatial Hashing (Uber H3/S2)', 'Database Sharding & Replication'],
        deliverable: 'Global Distributed Rate Limiter & Token Bucket Cluster with Redis',
        modules: [
          {
            id: 'sd-201',
            title: 'Designing Data-Intensive Applications (DDIA) Masterclass',
            provider: 'freeCodeCamp',
            duration: '16 hrs',
            type: 'article',
            url: 'https://freecodecamp.org',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'sde-201',
            title: 'Distributed Token Bucket Rate Limiter with Redis Lua Scripts',
            description: 'Build an atomic rate limiter that handles concurrent burst traffic across multiple regions.',
            type: 'project',
            difficulty: 'Hard',
            estimatedMinutes: 90,
            completed: false
          }
        ]
      }
    ]
  }
};

// Dynamic Generator Function that creates fully customized learning paths based on any input
export function generateDynamicPath(
  goal: string,
  level: DifficultyLevel,
  weeklyHours: number
): LearningPath {
  const normalized = goal.toLowerCase().trim();

  // If matches prebuilt, customize with user's specific pace
  if (normalized.includes('java') || normalized.includes('dsa') || normalized.includes('data structure')) {
    const base = JSON.parse(JSON.stringify(PREBUILT_PATHS['java-dsa']));
    base.level = level;
    base.weeklyHours = weeklyHours;
    base.totalWeeks = Math.max(6, Math.round(base.totalHours / weeklyHours));
    return base;
  }
  if (normalized.includes('web') || normalized.includes('frontend') || normalized.includes('fullstack') || normalized.includes('full-stack') || normalized.includes('react')) {
    const base = JSON.parse(JSON.stringify(PREBUILT_PATHS['fullstack']));
    base.level = level;
    base.weeklyHours = weeklyHours;
    base.totalWeeks = Math.max(6, Math.round(base.totalHours / weeklyHours));
    return base;
  }
  if (normalized.includes('ai') || normalized.includes('machine learning') || normalized.includes('ml') || normalized.includes('deep learning')) {
    const base = JSON.parse(JSON.stringify(PREBUILT_PATHS['ai-ml']));
    base.level = level;
    base.weeklyHours = weeklyHours;
    base.totalWeeks = Math.max(6, Math.round(base.totalHours / weeklyHours));
    return base;
  }
  if (normalized.includes('system') || normalized.includes('design') || normalized.includes('distributed') || normalized.includes('architect')) {
    const base = JSON.parse(JSON.stringify(PREBUILT_PATHS['system-design']));
    base.level = level;
    base.weeklyHours = weeklyHours;
    base.totalWeeks = Math.max(6, Math.round(base.totalHours / weeklyHours));
    return base;
  }

  // Generate dynamic custom path for custom user topic
  const totalWeeks = Math.max(6, Math.round(140 / weeklyHours));
  const totalHours = totalWeeks * weeklyHours;

  return {
    id: `custom-${Date.now()}`,
    title: `${goal} Accelerated Mastery Path`,
    targetGoal: goal,
    level,
    weeklyHours,
    totalWeeks,
    totalHours,
    badge: 'Custom Trailblazer',
    color: 'from-amber-400 via-amber-500 to-sky-500',
    summary: `Personalised ${totalWeeks}-week curriculum tailored for ${level.toLowerCase()} level at ${weeklyHours} hours/week, focusing on core foundations, hands-on projects, and real-world execution.`,
    createdAt: new Date().toISOString().split('T')[0],
    milestones: [
      {
        id: 'cust-m1',
        phaseNumber: 1,
        title: `Phase 1: ${goal} Core Foundations & Tooling`,
        tagline: 'Master foundational syntax, principles, mental models, and local setup',
        durationWeeks: Math.max(2, Math.round(totalWeeks * 0.25)),
        difficulty: level,
        overview: `Establish rock-solid understanding of fundamental concepts in ${goal}, environment configuration, best practices, and standard conventions.`,
        skillsAcquired: [`${goal} Fundamentals`, 'Architecture Basics', 'Tooling & Debugging', 'Standard Workflows', 'Problem Solving'],
        deliverable: `Working baseline project demonstrating key principles of ${goal}`,
        modules: [
          {
            id: 'cmod-1',
            title: `${goal} Comprehensive Starter & Theory Guide`,
            provider: 'Coursera',
            duration: '10 hrs',
            type: 'video',
            url: 'https://coursera.org',
            completed: false
          },
          {
            id: 'cmod-2',
            title: `Practical Hands-On Walkthrough: ${goal}`,
            provider: 'freeCodeCamp',
            duration: '6 hrs',
            type: 'interactive',
            url: 'https://freecodecamp.org',
            completed: false
          },
          {
            id: 'cmod-3',
            title: `Official Documentation & Best Practices Guide`,
            provider: 'Official Docs',
            duration: '4 hrs',
            type: 'article',
            url: 'https://docs.google.com',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'cex-1',
            title: 'Diagnostic Coding Lab & Baseline Exercise',
            description: `Build a clean, documented module implementing core logic for ${goal}.`,
            type: 'coding',
            difficulty: 'Easy',
            estimatedMinutes: 45,
            completed: false,
            solutionHint: 'Focus on modular separation of concerns and clear variable naming.'
          },
          {
            id: 'cex-2',
            title: 'Interactive Code Walkthrough & Refactoring Drill',
            description: `Refactor an imperative implementation into clean, idiomatic patterns.`,
            type: 'challenge',
            difficulty: 'Medium',
            estimatedMinutes: 60,
            completed: false
          }
        ],
        checkpointQuiz: {
          id: 'cquiz-1',
          question: `What is the most critical first step before optimizing an implementation in ${goal}?`,
          options: [
            'Immediate micro-benchmarking of CPU cycles',
            'Profiling to identify empirical bottlenecks and measuring baseline metrics',
            'Switching to a lower-level language',
            'Doubling memory allocations'
          ],
          correctAnswer: 1,
          explanation: 'Premature optimization without profiling leads to increased complexity with negligible actual speed gains.'
        }
      },
      {
        id: 'cust-m2',
        phaseNumber: 2,
        title: `Phase 2: Intermediate Techniques & Architecture`,
        tagline: 'Scale complexity, design patterns, testing, and error handling',
        durationWeeks: Math.max(2, Math.round(totalWeeks * 0.35)),
        difficulty: level === 'Beginner' ? 'Intermediate' : level,
        overview: `Advance beyond the basics into intermediate design patterns, concurrency or async patterns, testing strategies, and efficient data handling in ${goal}.`,
        skillsAcquired: ['Design Patterns', 'Defensive Programming', 'Unit & Integration Testing', 'Performance Optimization'],
        deliverable: `Production-ready service or application with automated test coverage`,
        modules: [
          {
            id: 'cmod-4',
            title: `Intermediate Architecture Patterns in ${goal}`,
            provider: 'YouTube',
            duration: '12 hrs',
            type: 'video',
            url: 'https://youtube.com',
            completed: false
          },
          {
            id: 'cmod-5',
            title: 'Advanced Testing & Continuous Verification',
            provider: 'MIT OpenCourseWare',
            duration: '8 hrs',
            type: 'interactive',
            url: 'https://ocw.mit.edu',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'cex-3',
            title: 'Test-Driven Development (TDD) Sprint',
            description: `Write comprehensive unit and integration tests covering edge cases for ${goal}.`,
            type: 'coding',
            difficulty: 'Medium',
            estimatedMinutes: 75,
            completed: false
          },
          {
            id: 'cex-4',
            title: 'End-to-End Milestone Mini-Project',
            description: `Deliver an end-to-end working component with persistence and error boundaries.`,
            type: 'project',
            difficulty: 'Medium',
            estimatedMinutes: 90,
            completed: false
          }
        ]
      },
      {
        id: 'cust-m3',
        phaseNumber: 3,
        title: `Phase 3: Real-World Capstone & Professional Mastery`,
        tagline: 'Production deployment, performance tuning, and portfolio showcase',
        durationWeeks: Math.max(2, Math.round(totalWeeks * 0.4)),
        difficulty: 'Advanced',
        overview: `Synthesize everything learned into a flagship portfolio capstone project that proves your deep competence in ${goal}.`,
        skillsAcquired: ['Production Deployment', 'System Architecture', 'Security & Hardening', 'Monitoring & Metrics', 'Portfolio Presentation'],
        deliverable: `Complete, deployed flagship capstone project with public demo and documentation`,
        modules: [
          {
            id: 'cmod-6',
            title: `Enterprise Production Engineering for ${goal}`,
            provider: 'Stanford Online',
            duration: '15 hrs',
            type: 'video',
            url: 'https://online.stanford.edu',
            completed: false
          }
        ],
        exercises: [
          {
            id: 'cex-5',
            title: 'Flagship Capstone Project Build',
            description: `Construct a complete, real-world application solving a tangible problem in ${goal}.`,
            type: 'project',
            difficulty: 'Hard',
            estimatedMinutes: 180,
            completed: false
          }
        ]
      }
    ]
  };
}
