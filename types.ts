
export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  joiningDate: string;
  email: string;
  image?: string;
  isHod?: boolean;
  // Enhanced Fields
  specialization: string[];
  subjects: string[];
  experience: number; // Years
  researchInterests: string[];
  publications?: number;
  bio: string;
  socialLinks?: {
    linkedin?: string;
    googleScholar?: string;
    website?: string;
  };
}

export interface NavItem {
  label: string;
  path: string;
  subItems?: NavItem[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  category: 'Workshop' | 'Seminar' | 'Competition' | 'Industrial Visit';
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// --- Test Management Types ---

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface TestConfiguration {
  durationMinutes: number;
  totalMarks: number;
  marksPerQuestion: number;
  negativeMarking: boolean;
  negativeMarkValue: number; // e.g., 0.25
  shuffleQuestions: boolean;
  allowBackNavigation: boolean;
}

export interface SecuritySettings {
  fullScreenEnforced: boolean;
  tabSwitchLimit: number;
  blockCopyPaste: boolean;
  cameraRequired: boolean;
}

export interface TestDraft {
  id?: string;
  title: string;
  subject: string;
  batch: string;
  type: 'Internal' | 'Practice' | 'Surprise';
  instructions: string;
  config: TestConfiguration;
  questions: Question[];
  security: SecuritySettings;
  schedule: {
    startDate: string;
    endDate: string;
    publishResults: 'Immediate' | 'Manual';
  };
  status: 'Draft' | 'Published' | 'Archived';
}

// --- Achievement Types ---

export type AchievementCategory = 'Academic' | 'Technical' | 'Research' | 'Competition' | 'Extracurricular';
export type AchievementStatus = 'Verified' | 'Pending' | 'Rejected';

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  date: string; // ISO or human readable
  issuer: string;
  description: string;
  status: AchievementStatus;
  proofUrl?: string; // Mock URL
  feedback?: string; // Reason for rejection or faculty note
}

// --- Academic Schedule Types (DB Friendly) ---

export interface TimeSlot {
  id: string;
  label: string; // e.g., "10:10 - 11:05"
}

export interface ScheduleEntry {
  day: string;
  subjects: string[]; // Array of strings matching TimeSlots length
}

export interface ClassSchedule {
  id: string;
  semester: string;
  section?: string;
  title: string;
  updated: string;
  color: string;
  bg: string;
  text: string;
  entries: ScheduleEntry[];
  facultyMap?: { name: string; subject: string }[];
  abbreviations?: { code: string; subject: string }[];
}
