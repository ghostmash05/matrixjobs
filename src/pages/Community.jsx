import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroGraphics from '../components/HeroGraphics';
import { Link } from 'react-router-dom';

const CommunityContainer = styled.div`
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

const BowlCard = styled(Link)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  display: block;
  color: inherit;
  
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
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    opacity: ${props => props.primary ? '0.9' : '1'};
    background: ${props => props.primary ? 'linear-gradient(90deg, #1a96ac 0%, #1b8f5a 100%)' : 'rgba(29, 161, 184, 0.05)'};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
  position: relative;
  margin-bottom: 2rem;
  
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

// Mock community data
const communityBowls = [
  {
    id: 1,
    title: 'Tech Career Advice',
    description: 'Get tips on advancing your tech career, share experiences, and network with industry professionals',
    members: '14.2k',
    icon: '💻',
    bgColor: 'linear-gradient(135deg, #614385 0%, #516395 100%)'
  },
  {
    id: 2,
    title: 'Job Search Strategies',
    description: 'Effective strategies for job searching, resume tips, and interview preparation',
    members: '8.7k',
    icon: '🔍',
    bgColor: 'linear-gradient(135deg, #02AABB 0%, #00CDAC 100%)'
  },
  {
    id: 3,
    title: 'Remote Work Hub',
    description: 'Resources and discussions for remote workers and digital nomads',
    members: '11.3k',
    icon: '🌐',
    bgColor: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
  },
  {
    id: 4,
    title: 'Salary Negotiations',
    description: 'Learn how to negotiate your worth and get paid what you deserve',
    members: '9.5k',
    icon: '💰',
    bgColor: 'linear-gradient(135deg, #F37335 0%, #FDC830 100%)'
  },
  {
    id: 5,
    title: 'Career Changers',
    description: 'Support and advice for those making a career transition to a new field',
    members: '12.8k',
    icon: '🔄',
    bgColor: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)'
  },
  {
    id: 6,
    title: 'Startup Life',
    description: "What it's like working at startups: the good, the bad, and the crazy",
    members: '7.4k',
    icon: '🚀',
    bgColor: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)'
  },
  {
    id: 7,
    title: 'Tech Interview Prep',
    description: 'Practice technical interviews, coding challenges, and system design questions',
    members: '16.2k',
    icon: '📝',
    bgColor: 'linear-gradient(135deg, #4568DC 0%, #B06AB3 100%)'
  },
  {
    id: 8,
    title: 'Women in Tech',
    description: 'Support network for women and non-binary individuals in technology fields',
    members: '13.9k',
    icon: '👩‍💻',
    bgColor: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)'
  },
  {
    id: 9,
    title: 'Developer Resources',
    description: 'Helpful resources, tools, and learning materials for software developers',
    members: '18.3k',
    icon: '⚙️',
    bgColor: 'linear-gradient(135deg, #396afc 0%, #2948ff 100%)'
  }
];

const Community = () => {
  return (
    <div>
      <Header />
      <Hero>
        <HeroGraphics />
        <HeroTitle>Join Our Community</HeroTitle>
        <HeroSubtitle>Connect with professionals, share insights, and grow your network</HeroSubtitle>
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search communities..." 
          />
        </SearchContainer>
      </Hero>
      
      <CommunityContainer>
        <SectionTitle>Popular Community Bowls</SectionTitle>
        
        <BowlGrid>
          {communityBowls.map(bowl => (
            <BowlCard key={bowl.id} to={`/community/${bowl.id}`}>
              <BowlHeader>
                <BowlIcon bgColor={bowl.bgColor}>
                  {bowl.icon}
                </BowlIcon>
                <BowlInfo>
                  <BowlTitle>{bowl.title}</BowlTitle>
                  <BowlDescription>{bowl.description}</BowlDescription>
                </BowlInfo>
              </BowlHeader>
              <BowlStats>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 20.9999V18.9999C22.9993 18.1136 22.7044 17.2527 22.1614 16.5522C21.6184 15.8517 20.8581 15.3515 20 15.1299" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {bowl.members} members
              </BowlStats>
              <BowlFooter>
                <BowlButton as="span" primary>Join</BowlButton>
              </BowlFooter>
            </BowlCard>
          ))}
        </BowlGrid>
      </CommunityContainer>
      <Footer />
    </div>
  );
};

export default Community; 