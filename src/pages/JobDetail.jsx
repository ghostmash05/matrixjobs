import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #1861bf;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Main = styled.div`
  flex: 1;
`;

const Sidebar = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 320px;
  }
`;

const JobHeader = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 1.5rem;
`;

const JobTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CompanyName = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #1861bf;
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const JobLocation = styled.div`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetaLabel = styled.span`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0.25rem;
`;

const MetaValue = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const JobSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Description = styled.div`
  color: #555;
  line-height: 1.6;
  
  p {
    margin-bottom: 1rem;
  }
`;

const RequirementsList = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const RequirementItem = styled.li`
  color: #555;
  line-height: 1.6;
  margin-bottom: 0.75rem;
`;

const ApplyCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 1.5rem;
`;

const ApplyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const SalaryInfo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f9d58;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#1861bf' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#1861bf'};
  border: ${props => props.primary ? 'none' : '1px solid #1861bf'};
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    background-color: ${props => props.primary ? '#114a8f' : 'rgba(24, 97, 191, 0.1)'};
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    border: none;
  }
`;

const CompanyCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 1.5rem;
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CompanyLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 1rem;
  object-fit: contain;
`;

const CompanyInfo = styled.div``;

const CompanyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const CompanyRating = styled.div`
  display: flex;
  align-items: center;
  color: #f5b400;
  font-size: 0.9rem;

  span {
    margin-left: 0.5rem;
    color: #666;
  }
`;

const CompanyDescription = styled.p`
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const NotFoundTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const NotFoundText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { 
    jobs, 
    getCompanyById, 
    saveJob, 
    unsaveJob, 
    isJobSaved,
    applyForJob,
    hasAppliedToJob 
  } = useAppContext();
  
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
    // Find job by ID
    const foundJob = jobs.find(j => j.id === Number(jobId));
    
    if (foundJob) {
      setJob(foundJob);
      
      // Get company info
      const companyInfo = getCompanyById(foundJob.companyId);
      setCompany(companyInfo);
      
      // Check if job is saved
      setSaved(isJobSaved(foundJob.id));
      
      // Check if user has applied
      setHasApplied(hasAppliedToJob(foundJob.id));
    }
  }, [jobId, jobs]);
  
  const handleSaveToggle = () => {
    if (saved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
    setSaved(!saved);
  };
  
  const handleApply = async () => {
    setIsApplying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const success = applyForJob(job.id);
      
      if (success) {
        setHasApplied(true);
      }
      
      setIsApplying(false);
    }, 1500);
  };
  
  // If job not found
  if (!job || !company) {
    return (
      <div>
        <Header />
        <DetailContainer>
          <NotFound>
            <NotFoundTitle>Job Not Found</NotFoundTitle>
            <NotFoundText>The job you're looking for doesn't exist or has been removed.</NotFoundText>
            <ActionButton primary onClick={() => navigate('/')}>
              Back to Job Search
            </ActionButton>
          </NotFound>
        </DetailContainer>
        <Footer />
      </div>
    );
  }
  
  return (
    <div>
      <Header />
      <DetailContainer>
        <BackLink to="/">← Back to search results</BackLink>
        
        <Content>
          <Main>
            <JobHeader>
              <JobTitle>{job.title}</JobTitle>
              <CompanyName to={`/companies/${company.id}`}>{company.name}</CompanyName>
              <JobLocation>{job.location}</JobLocation>
              
              <JobMeta>
                <MetaItem>
                  <MetaLabel>Salary Range</MetaLabel>
                  <MetaValue>{job.salaryRange}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Posted</MetaLabel>
                  <MetaValue>{new Date(job.postedDate).toLocaleDateString()}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Job Type</MetaLabel>
                  <MetaValue>Full-time</MetaValue>
                </MetaItem>
              </JobMeta>
            </JobHeader>
            
            <JobSection>
              <SectionTitle>Job Description</SectionTitle>
              <Description>
                <p>{job.description}</p>
              </Description>
            </JobSection>
            
            <JobSection>
              <SectionTitle>Requirements</SectionTitle>
              <RequirementsList>
                {job.requirements.map((req, index) => (
                  <RequirementItem key={index}>{req}</RequirementItem>
                ))}
              </RequirementsList>
            </JobSection>
          </Main>
          
          <Sidebar>
            <ApplyCard>
              <ApplyTitle>Apply for this position</ApplyTitle>
              <SalaryInfo>{job.salaryRange}</SalaryInfo>
              <ActionButton 
                primary 
                onClick={handleApply} 
                disabled={hasApplied || isApplying}
              >
                {isApplying ? 'Applying...' : hasApplied ? 'Applied' : 'Apply Now'}
              </ActionButton>
              <ActionButton onClick={handleSaveToggle}>
                {saved ? 'Unsave Job' : 'Save Job'}
              </ActionButton>
            </ApplyCard>
            
            <CompanyCard>
              <CompanyHeader>
                <CompanyLogo src={company.logoUrl} alt={company.name} />
                <CompanyInfo>
                  <CompanyTitle>{company.name}</CompanyTitle>
                  <CompanyRating>
                    {Array(5).fill().map((_, i) => (
                      <span key={i} style={{ color: i < Math.floor(company.avgRating) ? '#f5b400' : '#ddd' }}>★</span>
                    ))}
                    <span>{company.avgRating.toFixed(1)} ({company.reviewCount} reviews)</span>
                  </CompanyRating>
                </CompanyInfo>
              </CompanyHeader>
              <CompanyDescription>{company.about.substring(0, 150)}...</CompanyDescription>
              <Link to={`/companies/${company.id}`} style={{ textDecoration: 'none' }}>
                <ActionButton>View Company Profile</ActionButton>
              </Link>
            </CompanyCard>
          </Sidebar>
        </Content>
      </DetailContainer>
      <Footer />
    </div>
  );
};

export default JobDetail; 