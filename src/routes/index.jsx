import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import pages
import Home from '../pages/Home';
import JobDetail from '../pages/JobDetail';
import CompanyProfile from '../pages/CompanyProfile';
import SavedJobs from '../pages/SavedJobs';
import Alerts from '../pages/Alerts';
import UserProfile from '../pages/UserProfile';
import Community from '../pages/Community';
import CommunityDetail from '../pages/CommunityDetail';
import Salaries from '../pages/Salaries';
import Companies from '../pages/Companies';

// Route wrapper for Home component to force state reset
const HomeWithKey = () => {
  const location = useLocation();
  return <Home key="home-component" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeWithKey />} />
        <Route path="/jobs/:jobId" element={<JobDetail />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companyId" element={<CompanyProfile />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/salaries" element={<Salaries />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 