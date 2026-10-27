export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CourseModule {
  id: string;
  title: string;
  provider: 'Coursera' | 'YouTube' | 'MIT OpenCourseWare' | 'freeCodeCamp' | 'Official Docs' | 'Harvard CS50' | 'Stanford Online' | 'Udemy';
  duration: string;
  type: 'video' | 'interactive' | 'article' | 'book';
  url: string;
  completed?: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'project' | 'challenge' | 'system';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  completed?: boolean;
  solutionHint?: string;
  codeSnippet?: string;
}

export interface CheckpointQuiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  userAnswer?: number;
  isCompleted?: boolean;
}

export interface Milestone {
  id: string;
  phaseNumber: number;
  title: string;
  tagline: string;
  durationWeeks: number;
  difficulty: DifficultyLevel;
  overview: string;
  modules: CourseModule[];
  exercises: Exercise[];
  checkpointQuiz?: CheckpointQuiz;
  deliverable: string;
  skillsAcquired: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  targetGoal: string;
  level: DifficultyLevel;
  weeklyHours: number;
  totalWeeks: number;
  totalHours: number;
  badge: string;
  color: string;
  summary: string;
  milestones: Milestone[];
  createdAt: string;
}

export interface UserStats {
  completedModulesCount: number;
  totalModulesCount: number;
  completedExercisesCount: number;
  totalExercisesCount: number;
  totalPoints: number;
  streakDays: number;
  progressPercent: number;
}
