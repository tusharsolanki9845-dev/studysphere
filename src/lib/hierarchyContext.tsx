import React, { createContext, useCallback, useContext, useState } from 'react';

export interface AcademicTrailState {
  universityId: string;
  courseId: string;
  branchCode: string | null;
  semester: number | null;
  subjectCode: string | null;
}

interface HierarchyContextValue {
  trail: AcademicTrailState;
  updateTrail: (patch: Partial<AcademicTrailState>) => void;
  resetTrail: () => void;
}

const DEFAULT_TRAIL: AcademicTrailState = {
  universityId: 'uni-aktu',
  courseId: 'course-aktu-btech',
  branchCode: null,
  semester: null,
  subjectCode: null,
};

const HierarchyContext = createContext<HierarchyContextValue | null>(null);

export function HierarchyProvider({ children }: { children: React.ReactNode }) {
  const [trail, setTrail] = useState<AcademicTrailState>(DEFAULT_TRAIL);

  const updateTrail = useCallback((patch: Partial<AcademicTrailState>) => {
    setTrail((prev) => {
      const next: AcademicTrailState = { ...prev, ...patch };
      if (
        next.universityId === prev.universityId &&
        next.courseId === prev.courseId &&
        next.branchCode === prev.branchCode &&
        next.semester === prev.semester &&
        next.subjectCode === prev.subjectCode
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  const resetTrail = useCallback(() => {
    setTrail(DEFAULT_TRAIL);
  }, []);

  return (
    <HierarchyContext.Provider value={{ trail, updateTrail, resetTrail }}>
      {children}
    </HierarchyContext.Provider>
  );
}

export function useHierarchy(): HierarchyContextValue {
  const ctx = useContext(HierarchyContext);
  if (!ctx) {
    throw new Error('useHierarchy must be used inside HierarchyProvider');
  }
  return ctx;
}
