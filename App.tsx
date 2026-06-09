
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AcademicProvider } from './context/AcademicContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import AccreditationStrip from './components/Layout/AccreditationStrip';
import ChatBot from './components/ChatBot';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Faculty from './pages/Faculty';
import FacultyDetail from './pages/FacultyDetail';
import Academic from './pages/Academic';
import Contact from './pages/Contact';
import Auth from './pages/Auth';

// Student Portal Imports
import StudentLayout from './components/Layout/StudentLayout';
import StudentDashboard from './pages/student/Dashboard';
import TestPortal from './pages/student/TestPortal';
import Achievements from './pages/student/Achievements';
import Notifications from './pages/student/Notifications';
import TestResults from './pages/student/TestResults';
import Attendance from './pages/student/Attendance';
import AcademicPlanner from './pages/student/AcademicPlanner';
import LearningResources from './pages/student/LearningResources';
import Support from './pages/student/Support';

// Faculty Portal Imports
import FacultyLayout from './components/Layout/FacultyLayout';
import FacultyDashboard from './pages/faculty/Dashboard';
import TestManager from './pages/faculty/TestManager';
import StudentPerformance from './pages/faculty/StudentPerformance';
import Proctoring from './pages/faculty/Proctoring';
import Approvals from './pages/faculty/Approvals';
import Communication from './pages/faculty/Communication';

// Admin Portal Imports
import AdminLayout from './components/Layout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import TestOversight from './pages/admin/TestOversight';
import AntiCheating from './pages/admin/AntiCheating';
import AttendanceAdmin from './pages/admin/AttendanceAdmin';
import CommunicationAdmin from './pages/admin/CommunicationAdmin';
import CalendarAdmin from './pages/admin/CalendarAdmin';
import ReportsAdmin from './pages/admin/ReportsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import TimetableManager from './pages/admin/TimetableManager';

const { HashRouter: Router, Routes, Route, Navigate, useLocation } = ReactRouterDOM;

// Layout Wrapper to conditionally render correct layout based on path
const LayoutWrapper: React.FC = () => {
  const location = useLocation();
  
  // Student portal check
  const isStudentPortal = location.pathname.startsWith('/student');
  
  // Faculty portal moved to /staff to avoid collision with public /faculty directory
  const isFacultyPortal = location.pathname.startsWith('/staff');

  // Admin Portal check
  const isAdminPortal = location.pathname.startsWith('/admin');

  if (isStudentPortal) {
    return (
      <StudentLayout>
        <Routes>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="tests" element={<TestPortal />} />
          <Route path="results" element={<TestResults />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="planner" element={<AcademicPlanner />} />
          <Route path="resources" element={<LearningResources />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
        </Routes>
      </StudentLayout>
    );
  }

  if (isFacultyPortal) {
    return (
      <FacultyLayout>
        <Routes>
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="tests" element={<TestManager />} />
          <Route path="timetable" element={<TimetableManager />} />
          <Route path="performance" element={<StudentPerformance />} />
          <Route path="proctoring" element={<Proctoring />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="communication" element={<Communication />} />
          <Route path="*" element={<Navigate to="/staff/dashboard" replace />} />
        </Routes>
      </FacultyLayout>
    );
  }

  if (isAdminPortal) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="tests" element={<TestOversight />} />
          <Route path="security" element={<AntiCheating />} />
          <Route path="attendance" element={<AttendanceAdmin />} />
          <Route path="communication" element={<CommunicationAdmin />} />
          <Route path="calendar" element={<CalendarAdmin />} />
          <Route path="timetable" element={<TimetableManager />} />
          <Route path="reports" element={<ReportsAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      <AccreditationStrip />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/:id" element={<FacultyDetail />} />
          <Route path="/academics" element={<Academic />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth/:type" element={<Auth />} />
          <Route path="/auth/:type/:mode" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AcademicProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/student/*" element={<LayoutWrapper />} />
            <Route path="/staff/*" element={<LayoutWrapper />} />
            <Route path="/admin/*" element={<LayoutWrapper />} />
            <Route path="/*" element={<LayoutWrapper />} />
          </Routes>
        </Router>
      </AcademicProvider>
    </ThemeProvider>
  );
};

export default App;
