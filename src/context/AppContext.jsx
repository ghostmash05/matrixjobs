import React, { createContext, useContext, useState, useEffect } from 'react';
import jobsData from '../mocks/jobs.json';
import additionalJobs from '../mocks/additionalJobs';
import companiesData from '../mocks/companies.json';
import reviewsData from '../mocks/reviews.json';
import salariesData from '../mocks/salaries.json';
import usersData from '../mocks/users.json';

// Create context
const AppContext = createContext();

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  // State for jobs
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobSearch, setJobSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  
  // State for companies
  const [companies, setCompanies] = useState([]);
  
  // State for reviews
  const [reviews, setReviews] = useState([]);
  
  // State for salaries
  const [salaries, setSalaries] = useState([]);
  
  // State for users (for demo purposes, we'll use the first user)
  const [currentUser, setCurrentUser] = useState(null);
  
  // State for filters
  const [filters, setFilters] = useState({
    jobType: [],
    salaryRange: [0, 200000],
    rating: 0,
    experience: [],
    industry: []
  });

  // Load mock data on component mount
  useEffect(() => {
    try {
      // Combine original jobs with additional jobs
      console.log("Loading mock data...");
      console.log("Jobs data length:", jobsData.length);
      console.log("Additional jobs length:", additionalJobs.length);
      
      const allJobs = [...jobsData, ...additionalJobs];
      console.log("All jobs length:", allJobs.length);
      
      setJobs(allJobs);
      setFilteredJobs(allJobs);
      setCompanies(companiesData);
      setReviews(reviewsData);
      setSalaries(salariesData);
      setCurrentUser(usersData[0]); // Set first user as current user for demo
      
      console.log("Mock data loaded successfully");
    } catch (error) {
      console.error("Error loading mock data:", error);
    }
  }, []);

  // Search jobs function
  const searchJobs = () => {
    // If there are no jobs loaded, initialize them from mock data
    if (jobs.length === 0) {
      console.log("No jobs available yet, initializing from mock data");
      // Try to set jobs from mock data directly
      const allJobs = [...jobsData, ...additionalJobs];
      setJobs(allJobs);
      setFilteredJobs(allJobs);
      return;
    }
    
    // Start with all jobs
    let results = [...jobs];
    
    // Filter by search term
    if (jobSearch) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.description.toLowerCase().includes(jobSearch.toLowerCase())
      );
    }
    
    // Filter by location
    if (locationSearch) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(locationSearch.toLowerCase())
      );
    }
    
    // Filter by job type
    if (filters.jobType.length > 0) {
      // In a real app, we'd have job type data
      // This is just a placeholder for demonstration
    }
    
    // Filter by salary range
    if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000) {
      results = results.filter(job => {
        // Convert salaryRange string to min/max numbers for comparison
        const salaryString = job.salaryRange;
        const minSalary = parseInt(salaryString.replace(/[^0-9]/g, '')) / 10;
        return minSalary >= filters.salaryRange[0] && minSalary <= filters.salaryRange[1];
      });
    }
    
    // Filter by rating
    if (filters.rating > 0) {
      results = results.filter(job => job.rating >= filters.rating);
    }
    
    // Update filtered jobs with the results
    setFilteredJobs(results);
    console.log("Filtered jobs updated:", results.length);
  };

  // Update search terms
  const updateJobSearch = (term) => {
    setJobSearch(term);
  };

  const updateLocationSearch = (location) => {
    setLocationSearch(location);
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      jobType: [],
      salaryRange: [0, 200000],
      rating: 0,
      experience: [],
      industry: []
    });
    setJobSearch('');
    setLocationSearch('');
    // Immediately set filtered jobs to all jobs without waiting for search
    setFilteredJobs([...jobs]);
  };

  // Save job
  const saveJob = (jobId) => {
    if (!currentUser) return;
    
    const savedJobs = [...currentUser.savedJobs];
    if (!savedJobs.includes(jobId)) {
      savedJobs.push(jobId);
    }
    
    setCurrentUser({
      ...currentUser,
      savedJobs
    });
  };

  // Unsave job
  const unsaveJob = (jobId) => {
    if (!currentUser) return;
    
    const savedJobs = currentUser.savedJobs.filter(id => id !== jobId);
    
    setCurrentUser({
      ...currentUser,
      savedJobs
    });
  };

  // Check if a job is saved
  const isJobSaved = (jobId) => {
    return currentUser?.savedJobs.includes(jobId) || false;
  };

  // Create alert
  const createAlert = (alert) => {
    if (!currentUser) return;
    
    const newAlert = {
      id: currentUser.alerts.length + 1,
      ...alert
    };
    
    const alerts = [...currentUser.alerts, newAlert];
    
    setCurrentUser({
      ...currentUser,
      alerts
    });

    return newAlert;
  };

  // Delete alert
  const deleteAlert = (alertId) => {
    if (!currentUser) return;
    
    const alerts = currentUser.alerts.filter(alert => alert.id !== alertId);
    
    setCurrentUser({
      ...currentUser,
      alerts
    });
  };

  // Get company by ID
  const getCompanyById = (companyId) => {
    return companies.find(company => company.id === companyId);
  };

  // Get reviews by company ID
  const getReviewsByCompanyId = (companyId) => {
    return reviews.filter(review => review.companyId === companyId);
  };

  // Get salaries by company ID
  const getSalariesByCompanyId = (companyId) => {
    return salaries.filter(salary => salary.companyId === companyId);
  };

  // Apply for job (mock function)
  const applyForJob = (jobId) => {
    if (!currentUser) return false;
    
    const appliedJobs = [...currentUser.appliedJobs];
    if (!appliedJobs.includes(jobId)) {
      appliedJobs.push(jobId);
    }
    
    setCurrentUser({
      ...currentUser,
      appliedJobs
    });
    
    return true;
  };

  // Check if user has applied to a job
  const hasAppliedToJob = (jobId) => {
    return currentUser?.appliedJobs.includes(jobId) || false;
  };

  // Value object to be provided to consumers
  const value = {
    jobs,
    filteredJobs,
    companies,
    reviews,
    salaries,
    currentUser,
    filters,
    jobSearch,
    locationSearch,
    searchJobs,
    updateJobSearch,
    updateLocationSearch,
    updateFilters,
    resetFilters,
    saveJob,
    unsaveJob,
    isJobSaved,
    createAlert,
    deleteAlert,
    getCompanyById,
    getReviewsByCompanyId,
    getSalariesByCompanyId,
    applyForJob,
    hasAppliedToJob
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext; 