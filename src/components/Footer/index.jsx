import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #fafbfc;
  border-top: 1px solid #e0e0e0;
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const FooterSection = styled.div``;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  color: #1da1b8;
  background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
  display: inline-block;
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #555;
  
  &:hover {
    background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
    border-color: transparent;
    color: white;
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.25rem;
  font-family: 'Poppins', sans-serif;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: #666;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s;
    display: inline-flex;
    align-items: center;
    
    &:hover {
      color: #1da1b8;
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  a {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
    
    &:hover {
      color: #1da1b8;
    }
  }
`;

// SVG component for footer decorative graphics
const FooterGraphic = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 180px;
  height: 180px;
  opacity: 0.2;
  z-index: 0;
  overflow: hidden;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo to="/">MatrixJobs</Logo>
          <FooterDescription>
            Connecting talented professionals with their dream careers. 
            Discover opportunities that align with your skills and ambitions.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>For Job Seekers</FooterTitle>
          <FooterLinks>
            <FooterLink><Link to="/">Browse Jobs</Link></FooterLink>
            <FooterLink><Link to="/companies">Browse Companies</Link></FooterLink>
            <FooterLink><Link to="/salaries">Salary Information</Link></FooterLink>
            <FooterLink><Link to="/community">Career Community</Link></FooterLink>
            <FooterLink><Link to="/saved-jobs">Saved Jobs</Link></FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>For Employers</FooterTitle>
          <FooterLinks>
            <FooterLink><a href="#">Post a Job</a></FooterLink>
            <FooterLink><a href="#">Employer Resources</a></FooterLink>
            <FooterLink><a href="#">Recruitment Solutions</a></FooterLink>
            <FooterLink><a href="#">Pricing Plans</a></FooterLink>
            <FooterLink><a href="#">Partner with Us</a></FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLinks>
            <FooterLink><a href="#">Contact Us</a></FooterLink>
            <FooterLink><a href="#">FAQ</a></FooterLink>
            <FooterLink><a href="#">Privacy Policy</a></FooterLink>
            <FooterLink><a href="#">Terms of Service</a></FooterLink>
            <FooterLink><a href="#">About Us</a></FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>© {new Date().getFullYear()} MatrixJobs. All rights reserved.</Copyright>
        <BottomLinks>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies Policy</a>
          <a href="#">Accessibility</a>
        </BottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 