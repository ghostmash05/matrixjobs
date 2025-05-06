import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from '../components/JobCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroGraphics from '../components/HeroGraphics';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #1da1b8 0%, #1e9c64 100%);
  color: white;
  padding: 3rem 1rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(29, 161, 184, 0.2);
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  font-weight: 300;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 280px;
    position: sticky;
    top: 5rem;
  }
`;

const Main = styled.div`
  flex: 1;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ResultsCount = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const SortSelect = styled.select`
  padding: 0.75rem 1.25rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #555;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  
  &:focus {
    outline: none;
    border-color: #1da1b8;
  }
`;

const JobsList = styled.div``;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NoResultsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const NoResultsText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

// Community section styled components
const CommunitySection = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
  }
`;

const ViewAllLink = styled.a`
  color: #1da1b8;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-left: 6px;
  }
`;

const BowlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BowlCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const BowlHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
`;

const BowlIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${props => props.bgColor || 'linear-gradient(135deg, #1da1b8 0%, #1e9c64 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BowlInfo = styled.div`
  flex: 1;
`;

const BowlTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const BowlDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const BowlStats = styled.div`
  padding: 0.75rem 1.5rem;
  font-size: 0.85rem;
  color: #888;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #999;
  }
`;

const BowlFooter = styled.div`
  display: flex;
  border-top: 1px solid #f0f0f0;
`;

const BowlButton = styled.button`
  flex: 1;
  background: ${props => props.primary ? 'linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#1da1b8'};
  border: none;
  padding: 0.9rem 0;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    opacity: ${props => props.primary ? '0.9' : '1'};
    background: ${props => props.primary ? 'linear-gradient(90deg, #1a96ac 0%, #1b8f5a 100%)' : 'rgba(29, 161, 184, 0.05)'};
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 3rem;
  color: #1da1b8;
  
  svg {
    animation: spin 1s linear infinite;
    width: 40px;
    height: 40px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Home = () => {
  const { 
    filteredJobs, 
    searchJobs, 
    updateJobSearch, 
    updateLocationSearch, 
    updateFilters, 
    resetFilters,
    jobSearch,
    locationSearch,
    filters,
    jobs
  } = useAppContext();
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (jobs.length === 0) {
      setIsLoading(true);
      searchJobs();
    } else if (filteredJobs.length === 0 && !jobSearch && !locationSearch && 
               filters.jobType.length === 0 && filters.experience.length === 0 && 
               filters.industry.length === 0 && filters.rating === 0 &&
               filters.salaryRange[0] === 0 && filters.salaryRange[1] === 200000) {
      searchJobs();
    }
    
    if (filteredJobs.length > 0) {
      setIsLoading(false);
    }
    
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [jobs, filteredJobs, jobSearch, locationSearch, filters, searchJobs, isLoading]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <div>
      <Header />
      <Hero>
        <HeroGraphics />
        <HeroTitle>Find Your Dream Job</HeroTitle>
        <HeroSubtitle>Discover opportunities at top-rated companies</HeroSubtitle>
        <SearchBar 
          onSearchSubmit={searchJobs}
          onJobSearchChange={updateJobSearch}
          onLocationChange={updateLocationSearch}
          jobValue={jobSearch}
          locationValue={locationSearch}
        />
      </Hero>
      
      <HomeContainer>
        <Content>
          <Sidebar className={showSidebar ? 'active' : ''}>
            <FilterSidebar 
              filters={filters}
              updateFilters={updateFilters}
              resetFilters={resetFilters}
              onClose={toggleSidebar}
            />
          </Sidebar>
          
          <Main>
            <ResultsHeader>
              <ResultsCount>{isLoading ? 'Loading...' : `${filteredJobs.length} Jobs Found`}</ResultsCount>
              <SortSelect>
                <option value="relevance">Sort by Relevance</option>
                <option value="date">Sort by Date</option>
                <option value="salary">Sort by Salary</option>
                <option value="rating">Sort by Rating</option>
              </SortSelect>
            </ResultsHeader>
            
            <JobsList>
              {isLoading ? (
                <LoadingIndicator>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60 15"/>
                  </svg>
                  <p>Loading jobs...</p>
                </LoadingIndicator>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <NoResults>
                  <NoResultsTitle>No Jobs Found</NoResultsTitle>
                  <NoResultsText>Try adjusting your search or filters to find what you're looking for.</NoResultsText>
                  {(jobSearch || locationSearch || filters.rating > 0 || filters.jobType.length > 0 || 
                    filters.experience.length > 0 || filters.industry.length > 0 || 
                    filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000) && (
                    <button onClick={resetFilters}>Reset Filters</button>
                  )}
                </NoResults>
              )}
            </JobsList>
          </Main>
        </Content>
        
        <CommunitySection>
          <SectionHeader>
            <SectionTitle>Explore Salary Bowls</SectionTitle>
            <ViewAllLink href="/community">
              View All 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ViewAllLink>
          </SectionHeader>
          
          <BowlGrid>
            <BowlCard>
              <BowlHeader>
                <BowlIcon bgColor="linear-gradient(135deg, #ff6b6b 0%, #f06595 100%)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 9H9V15H15V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </BowlIcon>
                <BowlInfo>
                  <BowlTitle>Software Engineer Salaries</BowlTitle>
                  <BowlDescription>Explore salary data for software engineering roles across different companies and locations.</BowlDescription>
                </BowlInfo>
              </BowlHeader>
              <BowlStats>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9986 17.1771 21.7418 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C17.7428 3.58399 19.0002 5.17606 19.0002 7.00005C19.0002 8.82404 17.7428 10.4161 16 10.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                247 Contributors
              </BowlStats>
              <BowlFooter>
                {/* Footer content */}
              </BowlFooter>
            </BowlCard>
            
            <BowlCard>
              <BowlHeader>
                <BowlIcon bgColor="linear-gradient(135deg, #4dabf7 0%, #3b5bdb 100%)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.6 9H20.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.6 15H20.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.5 3C9.36841 6.86771 8.25 11.2333 8.25 15.6C8.25 17.4 8.36841 19.2 8.6 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.4 3C17.5316 6.86771 18.65 11.2333 18.65 15.6C18.65 17.4 18.5316 19.2 18.3 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </BowlIcon>
                <BowlInfo>
                  <BowlTitle>Senior Data Scientist Salaries</BowlTitle>
                  <BowlDescription>Compare data scientist compensation across industries, experience levels, and regions.</BowlDescription>
                </BowlInfo>
              </BowlHeader>
              <BowlStats>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9986 17.1771 21.7418 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C17.7428 3.58399 19.0002 5.17606 19.0002 7.00005C19.0002 8.82404 17.7428 10.4161 16 10.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                189 Contributors
              </BowlStats>
              <BowlFooter>
                {/* Footer content */}
              </BowlFooter>
            </BowlCard>
            
            <BowlCard>
              <BowlHeader>
                <BowlIcon bgColor="linear-gradient(135deg, #51cf66 0%, #2b8a3e 100%)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 12V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 12V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </BowlIcon>
                <BowlInfo>
                  <BowlTitle>Mid-Level Product Manager Salaries</BowlTitle>
                  <BowlDescription>Discover what product managers earn at different companies and experience levels.</BowlDescription>
                </BowlInfo>
              </BowlHeader>
              <BowlStats>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9986 17.1771 21.7418 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C17.7428 3.58399 19.0002 5.17606 19.0002 7.00005C19.0002 8.82404 17.7428 10.4161 16 10.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                162 Contributors
              </BowlStats>
              <BowlFooter>
                {/* Footer content */}
              </BowlFooter>
            </BowlCard>
          </BowlGrid>
        </CommunitySection>
      </HomeContainer>
      <Footer />
    </div>
  );
};

export default Home; 