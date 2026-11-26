export type InstitutionType =
  | 'technical-university'
  | 'state-university'
  | 'central-university'
  | 'education-board';

export type InstitutionStatus = 'active' | 'planned';

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  type: InstitutionType;
  state: string;
  city: string;
  status: InstitutionStatus;
  description: string;
  officialDomain?: string;
}

export interface Course {
  id: string;
  slug: string;
  universityId: string;
  name: string;
  shortName: string;
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Secondary';
  durationYears: number;
  totalSemesters: number;
  description: string;
}

export interface Branch {
  id: string;
  slug: string;
  courseId: string;
  code: string;
  name: string;
  description: string;
}

export interface Topic {
  id: string;
  title: string;
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  topics: Topic[];
}

export type SubjectCategory =
  | 'Core'
  | 'Basic Science'
  | 'Engineering Science'
  | 'Elective'
  | 'Humanities';

export interface Subject {
  id: string;
  code: string;
  name: string;
  universityId: string;
  courseId: string;
  branchIds: string[];
  semester: number;
  credits: number;
  category: SubjectCategory;
  summary: string;
  units: Unit[];
}

export interface StudyNote {
  id: string;
  title: string;
  subjectCode: string;
  unitNumber?: number;
  authorName: string;
  license: 'Original StudySphere' | 'CC BY-SA 4.0' | 'CC BY 4.0';
  summary: string;
  contentMarkdown: string;
  resourceUrl?: string;
  featured: boolean;
  publishedAt: string;
}

export interface PyqQuestion {
  number: string;
  text: string;
  marks: number;
  unitNumber?: number;
}

export interface PyqSection {
  name: string;
  instruction: string;
  questions: PyqQuestion[];
}

export interface PyqPaper {
  id: string;
  title: string;
  subjectCode: string;
  examYear: number;
  examSession: 'Odd Semester' | 'Even Semester';
  paperType: 'End Semester' | 'Carry Over' | 'Original Practice Blueprint';
  authorNote: string;
  durationMinutes?: number;
  maxMarks?: number;
  sections?: PyqSection[];
  resourceUrl?: string;
  featured: boolean;
  publishedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Platform' | 'Curriculum' | 'Academic Calendar' | 'Policy';
  summary: string;
  publishedAt: string;
  pinned: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  category:
    | 'Resource Request'
    | 'Original Contribution'
    | 'Syllabus Correction'
    | 'Copyright Notice'
    | 'General';
  subjectContext?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed';
}

export interface PlatformSettings {
  adsEnabled: boolean;
  adNetworkSlotPrefix: string;
  platformNotice: string;
}

export interface CatalogData {
  universities: University[];
  courses: Course[];
  branches: Branch[];
  subjects: Subject[];
  notes: StudyNote[];
  pyqs: PyqPaper[];
  announcements: Announcement[];
  settings: PlatformSettings;
}

export interface SearchResultItem {
  type: 'university' | 'course' | 'branch' | 'subject' | 'topic' | 'note' | 'pyq';
  id: string;
  title: string;
  subtitle: string;
  route: string;
  meta: string;
}
