import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroGraphics from '../components/HeroGraphics';

const CompaniesContainer = styled.div`
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

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 100px;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
  position: relative;
  margin-bottom: 1.5rem;
  
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

const CompaniesGrid = styled.div`
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

const CompanyCard = styled(Link)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  display: block;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const CompanyHeader = styled.div`
  position: relative;
  padding: 1.5rem;
  display: flex;
  align-items: center;
`;

const CompanyLogo = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #333;
  font-size: 1.6rem;
  margin-right: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const CompanyIndustry = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const CompanyLocation = styled.div`
  font-size: 0.85rem;
  color: #777;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
    color: #888;
  }
`;

const CompanyStats = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-weight: 600;
  color: #1da1b8;
  font-size: 1.1rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #777;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #f5b400;
`;

const Companies = () => {
  const { companies } = useAppContext();

  return (
    <div>
      <Header />
      <Hero>
        <HeroGraphics />
        <HeroTitle>Find Top Companies</HeroTitle>
        <HeroSubtitle>Discover great places to work and build your career</HeroSubtitle>
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search by company name, industry, or location..." 
          />
        </SearchContainer>
      </Hero>
      
      <CompaniesContainer>
        <SectionTitle>Popular Companies</SectionTitle>
        
        <CompaniesGrid>
          {companies.map(company => (
            <CompanyCard key={company.id} to={`/companies/${company.id}`}>
              <CompanyHeader>
                <CompanyLogo>
                  <img src={company.logoUrl} alt={`${company.name} logo`} />
                </CompanyLogo>
                <CompanyInfo>
                  <CompanyName>{company.name}</CompanyName>
                  <CompanyIndustry>{company.industry}</CompanyIndustry>
                  <CompanyLocation>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C12 22 20 16 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 16 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {company.headquarters}
                  </CompanyLocation>
                </CompanyInfo>
              </CompanyHeader>
              
              <CompanyStats>
                <StatItem>
                  <StatValue>
                    <Rating>
                      {company.avgRating.toFixed(1)}
                      <span style={{ marginLeft: '4px' }}>★</span>
                    </Rating>
                  </StatValue>
                  <StatLabel>Rating</StatLabel>
                </StatItem>
                
                <StatItem>
                  <StatValue>{company.reviewCount}</StatValue>
                  <StatLabel>Reviews</StatLabel>
                </StatItem>
                
                <StatItem>
                  <StatValue>{company.ceoApproval}%</StatValue>
                  <StatLabel>CEO Approval</StatLabel>
                </StatItem>
              </CompanyStats>
            </CompanyCard>
          ))}
        </CompaniesGrid>
      </CompaniesContainer>
      <Footer />
    </div>
  );
};

export default Companies; 