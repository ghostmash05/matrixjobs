import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroGraphics from '../components/HeroGraphics';

const SalariesContainer = styled.div`
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

const SalaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SalaryCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CompanyLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 0.75rem;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #666;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CompanyName = styled.p`
  font-weight: 500;
  color: #666;
`;

const SalaryRange = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e9c64;
  margin-bottom: 0.75rem;
`;

const LocationAndExp = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 2px solid #e0e0e0;
  color: #333;
  font-weight: 600;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #f0f7ff;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const SalaryCell = styled(TableCell)`
  font-weight: 600;
  color: #1e9c64;
`;

// Mock job roles data with actual company logos
const popularJobRoles = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Google',
    logo: 'https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw',
    salary: '$120,000 - $180,000',
    location: 'San Francisco, CA',
    experience: '3-5 years'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png',
    salary: '$130,000 - $190,000',
    location: 'Cupertino, CA',
    experience: '4-6 years'
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png',
    salary: '$125,000 - $175,000',
    location: 'Los Gatos, CA',
    experience: '3-5 years'
  },
  {
    id: 4,
    title: 'UX Designer',
    company: 'Airbnb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png',
    salary: '$110,000 - $160,000',
    location: 'San Francisco, CA',
    experience: '3-5 years'
  },
  {
    id: 5,
    title: 'Frontend Developer',
    company: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/1200px-F_icon.svg.png',
    salary: '$115,000 - $170,000',
    location: 'Menlo Park, CA',
    experience: '2-4 years'
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    salary: '$125,000 - $185,000',
    location: 'Seattle, WA',
    experience: '3-6 years'
  }
];

// Mock company salaries data with actual logos
const topCompanies = [
  { company: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png', avgSalary: '$145,000', medianSalary: '$135,000', highestPaid: 'Engineering Director', salaryRange: '$95,000 - $350,000' },
  { company: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png', avgSalary: '$138,000', medianSalary: '$130,000', highestPaid: 'Principal Engineer', salaryRange: '$90,000 - $320,000' },
  { company: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png', avgSalary: '$142,000', medianSalary: '$132,000', highestPaid: 'Software Architect', salaryRange: '$92,000 - $340,000' },
  { company: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png', avgSalary: '$136,000', medianSalary: '$128,000', highestPaid: 'Principal SDE', salaryRange: '$88,000 - $310,000' },
  { company: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/F_icon.svg/1200px-F_icon.svg.png', avgSalary: '$152,000', medianSalary: '$140,000', highestPaid: 'Engineering Manager', salaryRange: '$98,000 - $360,000' }
];

const Salaries = () => {
  return (
    <div>
      <Header />
      <Hero>
        <HeroGraphics />
        <HeroTitle>Explore Salaries</HeroTitle>
        <HeroSubtitle>Research and compare salaries across companies, roles, and locations</HeroSubtitle>
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search by job title, company, or location..." 
          />
        </SearchContainer>
      </Hero>
      
      <SalariesContainer>
        <SectionTitle>Popular Job Roles</SectionTitle>
        <SalaryGrid>
          {popularJobRoles.map(job => (
            <SalaryCard key={job.id}>
              <JobTitle>{job.title}</JobTitle>
              <CompanyInfo>
                <CompanyLogo>
                  <img src={job.logo} alt={`${job.company} logo`} />
                </CompanyLogo>
                <CompanyName>{job.company}</CompanyName>
              </CompanyInfo>
              <SalaryRange>{job.salary}</SalaryRange>
              <LocationAndExp>{job.location} • {job.experience}</LocationAndExp>
            </SalaryCard>
          ))}
        </SalaryGrid>
        
        <SectionTitle>Top Paying Companies</SectionTitle>
        <Table>
          <thead>
            <tr>
              <TableHeader>Company</TableHeader>
              <TableHeader>Average Salary</TableHeader>
              <TableHeader>Median Salary</TableHeader>
              <TableHeader>Highest Paid Role</TableHeader>
              <TableHeader>Salary Range</TableHeader>
            </tr>
          </thead>
          <tbody>
            {topCompanies.map((company, index) => (
              <TableRow key={index}>
                <TableCell>
                  <CompanyInfo style={{ margin: 0 }}>
                    <CompanyLogo style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>
                      <img src={company.logo} alt={`${company.company} logo`} />
                    </CompanyLogo>
                    <CompanyName>{company.company}</CompanyName>
                  </CompanyInfo>
                </TableCell>
                <SalaryCell>{company.avgSalary}</SalaryCell>
                <TableCell>{company.medianSalary}</TableCell>
                <TableCell>{company.highestPaid}</TableCell>
                <TableCell>{company.salaryRange}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </SalariesContainer>
      <Footer />
    </div>
  );
};

export default Salaries; 