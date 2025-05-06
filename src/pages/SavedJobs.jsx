import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import JobCard from '../components/JobCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SavedJobsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled(Link)`
  display: inline-block;
  background-color: #1861bf;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #114a8f;
  }
`;

const SavedJobs = () => {
  const { currentUser, jobs } = useAppContext();
  const [savedJobs, setSavedJobs] = useState([]);
  
  useEffect(() => {
    if (currentUser && currentUser.savedJobs) {
      // Get saved jobs from the jobs array
      const userSavedJobs = jobs.filter(job => 
        currentUser.savedJobs.includes(job.id)
      );
      setSavedJobs(userSavedJobs);
    }
  }, [currentUser, jobs]);
  
  return (
    <div>
      <Header />
      <SavedJobsContainer>
        <PageHeader>
          <Title>Saved Jobs</Title>
          <Subtitle>Keep track of the jobs you're interested in</Subtitle>
        </PageHeader>
        
        {savedJobs.length > 0 ? (
          savedJobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <EmptyState>
            <EmptyStateTitle>No saved jobs yet</EmptyStateTitle>
            <EmptyStateText>
              Save jobs you're interested in to view them later and keep track of opportunities.
            </EmptyStateText>
            <ActionButton to="/">Search for Jobs</ActionButton>
          </EmptyState>
        )}
      </SavedJobsContainer>
      <Footer />
    </div>
  );
};

export default SavedJobs; 