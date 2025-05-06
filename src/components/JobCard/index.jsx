import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import companyLogos from '../../utils/companyLogos';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const CompanyLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 1.25rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const JobTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.35rem;
  font-family: 'Poppins', sans-serif;
`;

const CompanyName = styled(Link)`
  text-decoration: none;
  color: #1da1b8;
  font-weight: 500;
  margin-bottom: 0.35rem;
  display: block;
  font-size: 1.05rem;

  &:hover {
    text-decoration: underline;
  }
`;

const JobLocation = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
    color: #888;
  }
`;

const JobDescription = styled.p`
  margin: 1rem 0;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const SalaryInfo = styled.div`
  font-weight: 600;
  color: #1e9c64;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
  }
`;

const PostDate = styled.div`
  color: #888;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #f5b400;
  font-size: 0.9rem;
  margin-top: 0.5rem;

  span {
    margin-left: 0.5rem;
    color: #666;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? 'linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%)' : 'white'};
  background: ${props => props.primary ? 'linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#1da1b8'};
  border: ${props => props.primary ? 'none' : '1px solid #1da1b8'};
  border-radius: 8px;
  padding: 0.7rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.primary ? '0 4px 12px rgba(29, 161, 184, 0.2)' : 'none'};

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(90deg, #1a96ac 0%, #1b8f5a 100%)' : 'rgba(29, 161, 184, 0.05)'};
    transform: ${props => props.primary ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.primary ? '0 6px 16px rgba(29, 161, 184, 0.3)' : 'none'};
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${props => props.saved ? '#e03131' : '#666'};
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    margin-right: ${props => props.saved ? '6px' : '4px'};
    font-size: ${props => props.saved ? '1rem' : '0.9rem'};
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const Tag = styled.span`
  background-color: #f0f7ff;
  color: #1da1b8;
  padding: 0.35rem 0.75rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const JobCard = ({ job }) => {
  const { 
    getCompanyById, 
    saveJob, 
    unsaveJob, 
    isJobSaved 
  } = useAppContext();

  const company = getCompanyById(job.companyId);
  const saved = isJobSaved(job.id);

  const handleSaveToggle = () => {
    if (saved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  // Calculate days ago from postedDate
  const getPostedDays = () => {
    const postedDate = new Date(job.postedDate);
    const today = new Date();
    const diffTime = Math.abs(today - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Mock job tags
  const jobTags = ["Full-time", "Remote Option", "Benefits"];

  // Get company logo SVG
  const logoSvg = companyLogos[company.id];

  return (
    <CardContainer>
      <CardHeader>
        <CompanyLogo dangerouslySetInnerHTML={{ __html: logoSvg }} />
        <div>
          <JobTitle>{job.title}</JobTitle>
          <CompanyName to={`/companies/${company.id}`}>{company.name}</CompanyName>
          <JobLocation>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {job.location}
          </JobLocation>
          <Rating>
            {Array(5).fill().map((_, i) => (
              <span key={i} style={{ color: i < Math.floor(job.rating) ? '#f5b400' : '#ddd' }}>★</span>
            ))}
            <span>{job.rating.toFixed(1)}</span>
          </Rating>
          <Tags>
            {jobTags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
        </div>
      </CardHeader>

      <JobDescription>{job.description}</JobDescription>

      <CardFooter>
        <div>
          <SalaryInfo>
            {job.salaryRange}
          </SalaryInfo>
        </div>
        <PostDate>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.05078 11C3.27246 7.60761 4.71504 4.49711 7.07173 2.5C9.42842 0.502889 12.4948 -0.250413 15.4632 0.381755C18.4315 1.01392 20.9871 2.97801 22.3771 5.81761C23.7671 8.65721 23.842 12.0596 22.5846 15.0061C21.3273 17.9526 18.8385 20.063 15.7589 20.8431C12.6792 21.6232 9.45445 21.0001 6.99881 19.1504C4.54317 17.3007 3.14764 14.4581 3.18751 11.4987" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {getPostedDays()} days ago
        </PostDate>
      </CardFooter>

      <CardActions>
        <Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none', flex: 1 }}>
          <ActionButton primary>View Details</ActionButton>
        </Link>
        <SaveButton saved={saved} onClick={handleSaveToggle}>
          {saved ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Saved
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Save
            </>
          )}
        </SaveButton>
      </CardActions>
    </CardContainer>
  );
};

export default JobCard; 