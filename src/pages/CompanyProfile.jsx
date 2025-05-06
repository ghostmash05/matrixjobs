import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';

const ProfileContainer = styled.div`
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

const CompanyHeader = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const CompanyLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  margin-right: 1.5rem;
  object-fit: contain;
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CompanyMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.95rem;
`;

const CompanySection = styled.div`
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

const RatingSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const RatingItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RatingValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1861bf;
  margin-bottom: 0.5rem;
`;

const RatingLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
  color: #f5b400;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ReviewCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid ${props => {
    if (props.rating >= 4) return '#0f9d58';
    if (props.rating >= 3) return '#f5b400';
    return '#e03131';
  }};
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ReviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  color: #f5b400;
  font-size: 0.9rem;
`;

const ReviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #888;
`;

const ReviewerRole = styled.span``;

const ReviewDate = styled.span``;

const ReviewBody = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProsCons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ProsConsSection = styled.div`
  flex: 1;
`;

const ProsConsTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.type === 'pros' ? '#0f9d58' : '#e03131'};
  margin-bottom: 0.5rem;
`;

const ProConsList = styled.ul`
  padding-left: 1.25rem;
  margin: 0;
`;

const ProsConsItem = styled.li`
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const SalarySection = styled.div`
  margin-top: 2rem;
`;

const SalaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SalaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const JobTitle = styled.div`
  font-weight: 500;
  color: #333;
`;

const SalaryRange = styled.div`
  color: #0f9d58;
  font-weight: 500;
`;

const SalaryAverage = styled.div`
  color: #1861bf;
  font-weight: 600;
`;

const JobsSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 1.5rem;
`;

const JobsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const JobItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const BenefitsSection = styled.div`
  margin-top: 1.5rem;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const BenefitTag = styled.div`
  background-color: #f0f7ff;
  color: #1861bf;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.9rem;
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

  &:hover {
    background-color: ${props => props.primary ? '#114a8f' : 'rgba(24, 97, 191, 0.1)'};
  }
`;

const CompanyProfile = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { 
    companies, 
    getReviewsByCompanyId, 
    getSalariesByCompanyId,
    jobs
  } = useAppContext();
  
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  
  useEffect(() => {
    // Find company by ID
    const foundCompany = companies.find(c => c.id === Number(companyId));
    
    if (foundCompany) {
      setCompany(foundCompany);
      
      // Get company reviews
      const companyReviews = getReviewsByCompanyId(foundCompany.id);
      setReviews(companyReviews);
      
      // Get company salaries
      const companySalaries = getSalariesByCompanyId(foundCompany.id);
      setSalaries(companySalaries);
      
      // Get jobs from this company
      const foundJobs = jobs.filter(job => job.companyId === foundCompany.id);
      setCompanyJobs(foundJobs);
    }
  }, [companyId, companies, jobs]);
  
  // If company not found
  if (!company) {
    return (
      <ProfileContainer>
        <NotFound>
          <NotFoundTitle>Company Not Found</NotFoundTitle>
          <NotFoundText>The company you're looking for doesn't exist or has been removed.</NotFoundText>
          <ActionButton primary onClick={() => navigate('/')}>
            Back to Job Search
          </ActionButton>
        </NotFound>
      </ProfileContainer>
    );
  }
  
  return (
    <ProfileContainer>
      <BackLink to="/">← Back to job search</BackLink>
      
      <CompanyHeader>
        <CompanyLogo src={company.logoUrl} alt={company.name} />
        <CompanyInfo>
          <CompanyName>{company.name}</CompanyName>
          <CompanyMeta>
            <MetaItem>
              <span style={{ marginRight: '0.5rem' }}>★</span> 
              {company.avgRating.toFixed(1)} ({company.reviewCount} reviews)
            </MetaItem>
            <MetaItem>
              {company.headquarters}
            </MetaItem>
            <MetaItem>
              {company.size}
            </MetaItem>
            <MetaItem>
              {company.industry}
            </MetaItem>
          </CompanyMeta>
        </CompanyInfo>
      </CompanyHeader>
      
      <Content>
        <Main>
          <CompanySection>
            <SectionTitle>About {company.name}</SectionTitle>
            <Description>
              <p>{company.about}</p>
            </Description>
          </CompanySection>
          
          <CompanySection>
            <SectionTitle>Employee Reviews</SectionTitle>
            
            <RatingSection>
              <RatingItem>
                <RatingStars>
                  {Array(5).fill().map((_, i) => (
                    <span key={i} style={{ color: i < Math.floor(company.avgRating) ? '#f5b400' : '#ddd' }}>★</span>
                  ))}
                </RatingStars>
                <RatingValue>{company.avgRating.toFixed(1)}</RatingValue>
                <RatingLabel>Overall Rating</RatingLabel>
              </RatingItem>
              <RatingItem>
                <RatingValue>{company.ceoApproval}%</RatingValue>
                <RatingLabel>CEO Approval</RatingLabel>
              </RatingItem>
            </RatingSection>
            
            <ReviewList>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <ReviewCard key={review.id} rating={review.rating}>
                    <ReviewHeader>
                      <ReviewTitle>{review.title}</ReviewTitle>
                      <ReviewRating>
                        {Array(5).fill().map((_, i) => (
                          <span key={i} style={{ color: i < review.rating ? '#f5b400' : '#ddd' }}>★</span>
                        ))}
                      </ReviewRating>
                    </ReviewHeader>
                    <ReviewMeta>
                      <ReviewerRole>{review.reviewerRole}</ReviewerRole>
                      <ReviewDate>{new Date(review.date).toLocaleDateString()}</ReviewDate>
                    </ReviewMeta>
                    <ReviewBody>{review.body}</ReviewBody>
                    
                    <ProsCons>
                      <ProsConsSection>
                        <ProsConsTitle type="pros">Pros</ProsConsTitle>
                        <ProConsList>
                          {review.pros.map((pro, index) => (
                            <ProsConsItem key={index}>{pro}</ProsConsItem>
                          ))}
                        </ProConsList>
                      </ProsConsSection>
                      <ProsConsSection>
                        <ProsConsTitle type="cons">Cons</ProsConsTitle>
                        <ProConsList>
                          {review.cons.map((con, index) => (
                            <ProsConsItem key={index}>{con}</ProsConsItem>
                          ))}
                        </ProConsList>
                      </ProsConsSection>
                    </ProsCons>
                  </ReviewCard>
                ))
              ) : (
                <p>No reviews available for this company.</p>
              )}
            </ReviewList>
          </CompanySection>
          
          <CompanySection>
            <SectionTitle>Salary Insights</SectionTitle>
            
            <SalarySection>
              {salaries.length > 0 ? (
                <SalaryList>
                  {salaries.map(salary => (
                    <SalaryItem key={salary.id}>
                      <JobTitle>{salary.jobTitle}</JobTitle>
                      <SalaryRange>${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}</SalaryRange>
                      <SalaryAverage>Avg: ${salary.avg.toLocaleString()}</SalaryAverage>
                    </SalaryItem>
                  ))}
                </SalaryList>
              ) : (
                <p>No salary information available for this company.</p>
              )}
            </SalarySection>
          </CompanySection>
        </Main>
        
        <Sidebar>
          <CompanySection>
            <SectionTitle>Company Information</SectionTitle>
            <Description>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Headquarters:</strong> {company.headquarters}</p>
              <p><strong>Company Size:</strong> {company.size}</p>
              <p><strong>Founded:</strong> {company.founded}</p>
            </Description>
            
            <BenefitsSection>
              <SectionTitle>Benefits & Perks</SectionTitle>
              <BenefitsList>
                {company.benefits.map((benefit, index) => (
                  <BenefitTag key={index}>{benefit}</BenefitTag>
                ))}
              </BenefitsList>
            </BenefitsSection>
          </CompanySection>
          
          <JobsSection>
            <SectionTitle>Open Positions</SectionTitle>
            {companyJobs.length > 0 ? (
              <JobsList>
                {companyJobs.map(job => (
                  <JobItem key={job.id} to={`/jobs/${job.id}`}>
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{job.title}</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>{job.location}</div>
                    </div>
                    <div style={{ color: '#0f9d58' }}>{job.salaryRange}</div>
                  </JobItem>
                ))}
              </JobsList>
            ) : (
              <p>No open positions at this time.</p>
            )}
          </JobsSection>
        </Sidebar>
      </Content>
    </ProfileContainer>
  );
};

export default CompanyProfile; 