import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import { AppProvider } from './contexts/AppContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { JobDetailsPage } from './components/JobDetailsPage';
import { BrowseJobsPage } from './components/BrowseJobsPage';
import { DashboardSeekerPage } from './components/DashboardSeekerPage';
import { DashboardProviderPage } from './components/DashboardProviderPage';
import { PostJobPage } from './components/PostJobPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PricingPage } from './components/PricingPage';
import { MessagesPage } from './components/MessagesPage';
import { SettingsPage } from './components/SettingsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { NotificationsPage } from './components/NotificationsPage';
import { NotFoundPage } from './components/NotFoundPage';
import { CompanyProfilePage } from './components/CompanyProfilePage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
          <Route path="/browse-jobs" element={<BrowseJobsPage />} />
          <Route
            path="/dashboard-seeker"
            element={<ProtectedRoute role="seeker"><DashboardSeekerPage /></ProtectedRoute>}
          />
          <Route
            path="/dashboard-provider"
            element={<ProtectedRoute role="employer"><DashboardProviderPage /></ProtectedRoute>}
          />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/company/:id" element={<CompanyProfilePage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </Router>
    </AppProvider>
  );
}