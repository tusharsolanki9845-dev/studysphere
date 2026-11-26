export interface OfficialAcademicSource {
  id: string;
  name: string;
  category: string;
  coverage: string;
  url: string;
  licenseNote: string;
}

/**
 * Authorized official external references.
 * StudySphere links directly to official sources and never redistributes
 * third-party copyrighted PDFs or documents without explicit licence or permission.
 */
export const OFFICIAL_FREE_SOURCES: OfficialAcademicSource[] = [
  {
    id: 'src-aktu',
    name: 'AKTU Official Website',
    category: 'Official University',
    coverage: 'Datesheets, official syllabus circulars, academic calendar, and exam notices.',
    url: 'https://aktu.ac.in',
    licenseNote: 'External link to official university portal (not mirrored).',
  },
  {
    id: 'src-nptel',
    name: 'NPTEL',
    category: 'Open Engineering Lectures',
    coverage: 'Free IIT/IISc engineering video lectures, lecture transcripts, and course modules.',
    url: 'https://nptel.ac.in',
    licenseNote: 'Free open educational lectures hosted directly on NPTEL.',
  },
  {
    id: 'src-swayam',
    name: 'SWAYAM',
    category: 'National Learning Platform',
    coverage: 'Government of India free online courses, credit-transfer MOOCs, and open study resources.',
    url: 'https://swayam.gov.in',
    licenseNote: 'Official MoE learning portal; linked directly.',
  },
  {
    id: 'src-ncert',
    name: 'NCERT',
    category: 'Official School Curriculum',
    coverage: 'Official Class 11–12 textbooks, exemplar problems, and national curriculum frameworks.',
    url: 'https://ncert.nic.in',
    licenseNote: 'Official NCERT digital resources linked directly.',
  },
];
