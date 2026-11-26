export type BoardKind = 'national' | 'international' | 'state';

export interface SchoolBoard {
  id: string;
  name: string;
  short: string;
  kind: BoardKind;
  region: string;
  /** Which classes the board (or board-linked authority) examines or governs, in plain words. */
  stages: string;
}

const SEC = 'Secondary (Class 10) exam';
const BOTH = 'Class 10 and Class 12 board exams';

export const SCHOOL_BOARDS: SchoolBoard[] = [
  // ---- National ----
  { id: 'cbse', name: 'Central Board of Secondary Education', short: 'CBSE', kind: 'national', region: 'All India', stages: `${BOTH}; schools follow NCERT books from Class 1` },
  { id: 'cisce', name: 'Council for the Indian School Certificate Examinations (ICSE / ISC)', short: 'CISCE', kind: 'national', region: 'All India', stages: 'ICSE (Class 10) and ISC (Class 12)' },
  { id: 'nios', name: 'National Institute of Open Schooling', short: 'NIOS', kind: 'national', region: 'All India', stages: 'Open schooling: Open Basic Education levels A, B and C (roughly Classes 3, 5 and 8), then Secondary and Senior Secondary' },
  // ---- International boards offered in India ----
  { id: 'cambridge', name: 'Cambridge Assessment International Education (IGCSE / AS & A Level)', short: 'Cambridge', kind: 'international', region: 'International schools in India', stages: 'Primary, Lower Secondary, IGCSE (Classes 9–10), AS/A Level (Classes 11–12)' },
  { id: 'ib', name: 'International Baccalaureate (PYP / MYP / DP)', short: 'IB', kind: 'international', region: 'International schools in India', stages: 'PYP (to about Class 5), MYP (Classes 6–10), Diploma Programme (Classes 11–12)' },
  // ---- States and Union Territories ----
  { id: 'up', name: 'Uttar Pradesh Madhyamik Shiksha Parishad (UP Board)', short: 'UP Board', kind: 'state', region: 'Uttar Pradesh', stages: BOTH },
  { id: 'bihar', name: 'Bihar School Examination Board', short: 'BSEB', kind: 'state', region: 'Bihar', stages: BOTH },
  { id: 'rajasthan', name: 'Board of Secondary Education Rajasthan', short: 'RBSE', kind: 'state', region: 'Rajasthan', stages: BOTH },
  { id: 'mp', name: 'Madhya Pradesh Board of Secondary Education', short: 'MPBSE', kind: 'state', region: 'Madhya Pradesh', stages: BOTH },
  { id: 'chhattisgarh', name: 'Chhattisgarh Board of Secondary Education', short: 'CGBSE', kind: 'state', region: 'Chhattisgarh', stages: BOTH },
  { id: 'jharkhand', name: 'Jharkhand Academic Council', short: 'JAC', kind: 'state', region: 'Jharkhand', stages: BOTH },
  { id: 'uttarakhand', name: 'Uttarakhand Board of School Education', short: 'UBSE', kind: 'state', region: 'Uttarakhand', stages: BOTH },
  { id: 'haryana', name: 'Board of School Education Haryana', short: 'BSEH', kind: 'state', region: 'Haryana', stages: BOTH },
  { id: 'himachal', name: 'Himachal Pradesh Board of School Education', short: 'HPBOSE', kind: 'state', region: 'Himachal Pradesh', stages: BOTH },
  { id: 'punjab', name: 'Punjab School Education Board', short: 'PSEB', kind: 'state', region: 'Punjab', stages: BOTH },
  { id: 'jk', name: 'Jammu and Kashmir Board of School Education', short: 'JKBOSE', kind: 'state', region: 'Jammu & Kashmir and Ladakh', stages: BOTH },
  { id: 'gujarat', name: 'Gujarat Secondary and Higher Secondary Education Board', short: 'GSEB', kind: 'state', region: 'Gujarat', stages: BOTH },
  { id: 'maharashtra', name: 'Maharashtra State Board of Secondary and Higher Secondary Education', short: 'Maharashtra Board', kind: 'state', region: 'Maharashtra', stages: 'SSC (Class 10) and HSC (Class 12)' },
  { id: 'goa', name: 'Goa Board of Secondary and Higher Secondary Education', short: 'GBSHSE', kind: 'state', region: 'Goa', stages: BOTH },
  { id: 'karnataka', name: 'Karnataka School Examination and Assessment Board / Dept. of Pre-University Education', short: 'Karnataka Board', kind: 'state', region: 'Karnataka', stages: 'SSLC (Class 10) under KSEAB; II PU (Class 12) under the Pre-University department' },
  { id: 'kerala', name: 'Kerala State Board (General Education and Higher Secondary)', short: 'Kerala Board', kind: 'state', region: 'Kerala', stages: 'SSLC (Class 10); Higher Secondary (Classes 11–12)' },
  { id: 'tn', name: 'Tamil Nadu State Board (Directorate of Government Examinations)', short: 'TN State Board', kind: 'state', region: 'Tamil Nadu and Puducherry (partly)', stages: 'SSLC (Class 10); Higher Secondary (Classes 11–12)' },
  { id: 'ap', name: 'Board of Secondary Education / Board of Intermediate Education, Andhra Pradesh', short: 'AP Board', kind: 'state', region: 'Andhra Pradesh', stages: 'SSC (Class 10); Intermediate (Classes 11–12)' },
  { id: 'telangana', name: 'Telangana State Board of Secondary Education / Board of Intermediate Education', short: 'Telangana Board', kind: 'state', region: 'Telangana', stages: 'SSC (Class 10); Intermediate (Classes 11–12)' },
  { id: 'wb', name: 'West Bengal Board of Secondary Education / Council for Higher Secondary Education', short: 'WBBSE / WBCHSE', kind: 'state', region: 'West Bengal', stages: 'Madhyamik (Class 10); Higher Secondary (Class 12)' },
  { id: 'odisha', name: 'Board of Secondary Education Odisha / Council of Higher Secondary Education', short: 'Odisha Board', kind: 'state', region: 'Odisha', stages: 'HSC (Class 10); +2 under CHSE (Classes 11–12)' },
  { id: 'assam', name: 'Board of Secondary Education Assam (SEBA) / Assam Higher Secondary Education Council (AHSEC)', short: 'SEBA / AHSEC', kind: 'state', region: 'Assam', stages: 'HSLC (Class 10); HS (Class 12)' },
  { id: 'meghalaya', name: 'Meghalaya Board of School Education', short: 'MBOSE', kind: 'state', region: 'Meghalaya', stages: BOTH },
  { id: 'manipur', name: 'Board of Secondary Education Manipur / Council of Higher Secondary Education Manipur', short: 'BSEM / COHSEM', kind: 'state', region: 'Manipur', stages: BOTH },
  { id: 'mizoram', name: 'Mizoram Board of School Education', short: 'MBSE', kind: 'state', region: 'Mizoram', stages: BOTH },
  { id: 'nagaland', name: 'Nagaland Board of School Education', short: 'NBSE', kind: 'state', region: 'Nagaland', stages: BOTH },
  { id: 'tripura', name: 'Tripura Board of Secondary Education', short: 'TBSE', kind: 'state', region: 'Tripura', stages: BOTH },
  { id: 'other-ut', name: 'States and Union Territories that follow CBSE or a neighbouring board (Delhi, Chandigarh, Arunachal Pradesh, Sikkim, Andaman & Nicobar, Lakshadweep, Dadra & Nagar Haveli and Daman & Diu, Puducherry)', short: 'CBSE-affiliated regions', kind: 'state', region: 'Delhi, Chandigarh, Arunachal Pradesh, Sikkim and other UTs', stages: 'Mostly CBSE or a state department; confirm with your school' },
  { id: 'madrasa', name: 'State Madrasa Education Boards (for example West Bengal, Uttar Pradesh, Bihar, Assam)', short: 'Madrasa boards', kind: 'state', region: 'Several states', stages: 'Modern subjects (Maths, Science, Social Science, English) follow the common structure here; religious studies are not covered' },
];

/** Plain-language structural notes for boards where the structure is well established. */
export const BOARD_NOTES: Record<string, string[]> = {
  cbse: [
    'Textbooks are NCERT-based. NCERT has replaced its books for Classes 1–9 (for example Ganita Prakash, Curiosity, Poorvi), while Classes 10–12 still use the older books. Chapter titles for Classes 6–8 on this page were checked against the new books.',
    'Classes 9–10 have Science, Social Science, Mathematics, languages and a skill subject; Classes 11–12 are split into streams.',
    'Check the latest CBSE circulars for the exact exam scheme, as it changes between sessions.',
  ],
  cisce: [
    'ICSE (Classes 9–10) teaches Physics, Chemistry and Biology as separate subjects, and History & Civics and Geography as separate subjects. The page shows these instead of the combined Science and Social Science.',
    'Computer Applications (Java) is offered in Classes 9–10. English is taught as Language and Literature.',
    'ISC (Classes 11–12) uses the same subject names as other boards, but chapter content differs, so use the lists as a guide to topics, not as the ISC syllabus.',
  ],
  nios: [
    'Open Basic Education has three levels (A, B, C), roughly matching Classes 3, 5 and 8. Secondary and Senior Secondary match Classes 10 and 12.',
    'Subjects are chosen flexibly, and exams are available on demand, so you may not take every subject listed for a class.',
  ],
  cambridge: [
    'Primary and Lower Secondary stages end with Checkpoint tests. IGCSE is taken around Classes 9–10, and AS/A Level around Classes 11–12.',
    'Students choose a set of subjects rather than a fixed class-wise list, so treat the chapter lists as a topic guide only.',
  ],
  ib: [
    'PYP covers the primary years, MYP covers roughly Classes 6–10 and the Diploma Programme covers Classes 11–12.',
    'The Diploma has six subject groups plus Theory of Knowledge, the Extended Essay and CAS. The lists here are a topic guide, not the IB syllabus.',
  ],
  karnataka: ['Classes 11–12 are run by the Pre-University department and use fixed subject combinations such as PCMB or commerce groups.'],
  tn: ['Classes 11–12 use a group system (for example Maths-Science, Biology-Science, Commerce, Arts).'],
  kerala: ['Higher Secondary (Classes 11–12) uses Science, Humanities and Commerce groups with fixed combinations.'],
  ap: ['Intermediate (Classes 11–12) uses groups such as MPC, BiPC, CEC and HEC. Choose the matching stream on this page.'],
  telangana: ['Intermediate (Classes 11–12) uses groups such as MPC, BiPC, CEC and HEC. Choose the matching stream on this page.'],
  maharashtra: ['HSC (Classes 11–12) has Science, Commerce and Arts streams, and Marathi is a standard language subject.'],
};
