import { Layout } from './components/Layout';
import { EmptyState } from './components/EmptyState';
import { CatalogProvider } from './lib/catalogContext';
import { FocusProvider } from './lib/focusContext';
import { HierarchyProvider } from './lib/hierarchyContext';
import { RouterProvider, useRouter } from './lib/router';
import { ThemeProvider } from './lib/themeContext';
import { AboutPage } from './pages/AboutPage';
import { AktuPage } from './pages/AktuPage';
import { ContactPage } from './pages/ContactPage';
import { CourseHubPage } from './pages/CourseHubPage';
import { CoursesPage } from './pages/CoursesPage';
import { ExplorePage } from './pages/ExplorePage';
import { HomePage } from './pages/HomePage';
import { CopyrightPolicyPage, PrivacyPolicyPage, TermsPage } from './pages/LegalPages';
import { MyStudyPage } from './pages/MyStudyPage';
import { NotesPage } from './pages/NotesPage';
import { PyqPage } from './pages/PyqPage';
import { SchoolPage } from './pages/SchoolPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { SyllabusPage } from './pages/SyllabusPage';
import { ToolsPage } from './pages/ToolsPage';
import { UniversitiesPage } from './pages/UniversitiesPage';

function AppRoutes() {
  const { pathname } = useRouter();

  if (pathname === '/') return <HomePage />;
  if (pathname === '/explore') return <ExplorePage />;
  if (pathname === '/universities') return <UniversitiesPage />;
  if (pathname === '/aktu') return <AktuPage />;
  if (pathname === '/courses') return <CoursesPage />;
  if (pathname.startsWith('/courses/')) {
    const courseId = decodeURIComponent(pathname.slice('/courses/'.length));
    return <CourseHubPage courseId={courseId} />;
  }
  if (pathname === '/subjects') return <SubjectsPage />;
  if (pathname.startsWith('/subjects/')) {
    const code = pathname.slice('/subjects/'.length);
    return <SubjectDetailPage subjectCode={code} />;
  }
  if (pathname === '/notes') return <NotesPage />;
  if (pathname === '/pyq') return <PyqPage />;
  if (pathname === '/syllabus') return <SyllabusPage />;
  if (pathname === '/tools') return <ToolsPage />;
  if (pathname === '/my-study') return <MyStudyPage />;
  if (pathname === '/school') return <SchoolPage />;
  if (pathname === '/about') return <AboutPage />;
  if (pathname === '/contact') return <ContactPage />;
  if (pathname === '/privacy-policy') return <PrivacyPolicyPage />;
  if (pathname === '/terms') return <TermsPage />;
  if (pathname === '/copyright-policy') return <CopyrightPolicyPage />;

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <EmptyState
        contextLabel="404 · Page Not Found"
        title="This StudySphere route does not exist"
        description="Use the navigation bar or return home to browse AKTU B.Tech syllabi, subjects, notes, PYQs, and study tools."
        primaryAction={{ label: 'Return Home', to: '/' }}
        secondaryAction={{ label: 'Explore Hierarchy', to: '/explore' }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FocusProvider>
        <RouterProvider>
          <CatalogProvider>
            <HierarchyProvider>
              <Layout>
                <AppRoutes />
              </Layout>
            </HierarchyProvider>
          </CatalogProvider>
        </RouterProvider>
      </FocusProvider>
    </ThemeProvider>
  );
}
