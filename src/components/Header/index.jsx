import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

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
  z-index: 101;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  margin-right: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNavLinks = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 99;
`;

const MobileNavLink = styled(Link)`
  color: #333;
  font-weight: 600;
  text-decoration: none;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  position: relative;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  ${props => props.active && `
    color: #1da1b8;
  `}

  &:hover {
    color: #1da1b8;
    transform: translateY(-2px);
  }
`;

const NavLink = styled(Link)`
  color: #333;
  font-weight: 500;
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.5rem 0;
  position: relative;
  font-size: 0.95rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
    transition: width 0.3s;
  }

  ${props => props.active && `
    color: #1da1b8;
    &:after {
      width: 100%;
    }
  `}

  &:hover:after {
    width: 100%;
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1.2rem;
  color: #666;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    color: #1da1b8;
    transform: translateY(-2px);
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1da1b8 0%, #1e9c64 100%);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-left: 1.2rem;
  box-shadow: 0 2px 8px rgba(29, 161, 184, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(29, 161, 184, 0.5);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #1da1b8;
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  span:nth-child(1) {
    top: ${props => props.isOpen ? '9px' : '3px'};
    transform: ${props => props.isOpen ? 'rotate(135deg)' : 'rotate(0)'};
  }

  span:nth-child(2) {
    top: 9px;
    opacity: ${props => props.isOpen ? '0' : '1'};
    left: ${props => props.isOpen ? '-60px' : '0'};
  }

  span:nth-child(3) {
    top: ${props => props.isOpen ? '9px' : '15px'};
    transform: ${props => props.isOpen ? 'rotate(-135deg)' : 'rotate(0)'};
  }
`;

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  return (
    <HeaderContainer style={{ 
      boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <Logo to="/">MatrixJobs</Logo>
      
      <NavSection>
        <NavLinks>
          <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
            Jobs
          </NavLink>
          <NavLink to="/companies" active={location.pathname.includes('/companies') ? 1 : 0}>
            Companies
          </NavLink>
          <NavLink to="/salaries" active={location.pathname.includes('/salaries') ? 1 : 0}>
            Salaries
          </NavLink>
          <NavLink to="/community" active={location.pathname.includes('/community') ? 1 : 0}>
            Community
          </NavLink>
        </NavLinks>
        
        <IconGroup>
          <IconButton aria-label="Search">
            <i className="fas fa-search"></i>
          </IconButton>
          <IconButton aria-label="Notifications">
            <i className="fas fa-bell"></i>
          </IconButton>
          <ProfileButton>M</ProfileButton>

          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
            <MenuIcon isOpen={isMobileMenuOpen}>
              <span></span>
              <span></span>
              <span></span>
            </MenuIcon>
          </MobileMenuButton>
        </IconGroup>
      </NavSection>

      {/* Mobile Menu */}
      <MobileNavLinks isOpen={isMobileMenuOpen}>
        <MobileNavLink to="/" active={location.pathname === '/' ? 1 : 0}>
          Jobs
        </MobileNavLink>
        <MobileNavLink to="/companies" active={location.pathname.includes('/companies') ? 1 : 0}>
          Companies
        </MobileNavLink>
        <MobileNavLink to="/salaries" active={location.pathname.includes('/salaries') ? 1 : 0}>
          Salaries
        </MobileNavLink>
        <MobileNavLink to="/community" active={location.pathname.includes('/community') ? 1 : 0}>
          Community
        </MobileNavLink>
      </MobileNavLinks>
    </HeaderContainer>
  );
};

export default Header; 