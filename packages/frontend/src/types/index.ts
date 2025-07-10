// User and Authentication types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country?: string;
  language?: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country?: string;
  language?: string;
  familyName?: string;
}

// Student types
export interface Student {
  id: string;
  name: string;
  birthDate: Date;
  grade?: number;
  currentTheta: number;
  targetPercentile: number;
  totalExercisesCompleted: number;
  totalTimeSpentMinutes: number;
  averageAccuracy: number;
  lastActivityAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Exercise types
export interface Exercise {
  id: string;
  itemId: string;
  domain: string;
  subdomain: string;
  difficulty: number;
  internationalPercentile: number;
  type: 'multiple_choice' | 'word_problem' | 'drag_drop' | 'drawing';
  statement: string;
  options?: string[];
  hints: string[];
  solution: string;
  solutionSteps?: string[];
  expectedTimeSeconds: number;
  language: string;
}

export interface ExerciseSet {
  id: string;
  weekNumber: number;
  year: number;
  status: 'active' | 'completed' | 'archived';
  completedExercises: number;
  totalExercises: number;
  exercises: Exercise[];
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Response types
export interface ResponseData {
  answer: string | number | string[];
  selectedOption?: string;
  steps?: string[];
  workShown?: string;
}

export interface Response {
  id: string;
  responseData: ResponseData;
  isCorrect: boolean;
  timeSpentSeconds: number;
  hintsUsed: number;
  thetaBefore: number;
  thetaAfter: number;
  feedback?: string;
  needsReview: boolean;
  createdAt: Date;
}

// Progress types
export interface DomainBreakdown {
  [subdomain: string]: {
    accuracy: number;
    exercisesCompleted: number;
    masteryLevel: number;
  };
}

export interface WeeklyStats {
  week: number;
  year: number;
  exercisesCompleted: number;
  averageAccuracy: number;
  timeSpent: number;
  thetaGrowth: number;
}

export interface Progress {
  id: string;
  domain: string;
  thetaScore: number;
  internationalPercentile: number;
  exercisesCompleted: number;
  accuracy: number;
  timeSpentMinutes: number;
  masteryLevel: number;
  domainBreakdown: DomainBreakdown;
  weeklyStats: WeeklyStats;
  measurementPeriod: 'daily' | 'weekly' | 'monthly';
  recordedAt: Date;
}

// API Response types
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface MutationResponse {
  success: boolean;
  message?: string;
  errors?: ApiError[];
}