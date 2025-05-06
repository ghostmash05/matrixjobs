import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0.75rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 1rem;
  }
`;

const SearchInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: ${props => props.focused ? '#f8f9fa' : 'transparent'};

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 60%;
    width: 1px;
    background-color: #e0e0e0;
    display: ${props => props.withDivider ? 'block' : 'none'};
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 0;
  }
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
  font-family: 'Poppins', sans-serif;
  transition: color 0.3s ease;
  transform: translateY(0);
  opacity: 1;
  padding-left: 3rem;
  padding-top: 0.75rem;
`;

const Input = styled.input`
  padding: 0.9rem 1rem 0.9rem 3rem;
  border: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: transparent;
  color: #333;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #aaa;
    font-weight: 300;
    transition: opacity 0.3s ease;
  }

  ${props => props.focused && `
    &::placeholder {
      opacity: 0.6;
    }
  `}
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.focused ? '#1da1b8' : '#aaa'};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 1;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  align-self: flex-end;
  box-shadow: 0 4px 14px rgba(29, 161, 184, 0.3);
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(29, 161, 184, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (min-width: 768px) {
    align-self: center;
    margin-left: 1rem;
  }
`;

const SearchBar = ({ 
  onSearchSubmit, 
  onJobSearchChange, 
  onLocationChange, 
  jobValue = '',
  locationValue = ''
}) => {
  const [localJobSearch, setLocalJobSearch] = useState(jobValue);
  const [localLocationSearch, setLocalLocationSearch] = useState(locationValue);
  const [jobInputFocused, setJobInputFocused] = useState(false);
  const [locationInputFocused, setLocationInputFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setLocalJobSearch(jobValue);
  }, [jobValue]);

  useEffect(() => {
    setLocalLocationSearch(locationValue);
  }, [locationValue]);

  const handleJobSearchChange = (e) => {
    setLocalJobSearch(e.target.value);
    if (onJobSearchChange) {
      onJobSearchChange(e.target.value);
    }
  };

  const handleLocationSearchChange = (e) => {
    setLocalLocationSearch(e.target.value);
    if (onLocationChange) {
      onLocationChange(e.target.value);
    }
  };

  const handleSearch = () => {
    // Animate button click
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchBarContainer>
      <SearchInputGroup withDivider focused={jobInputFocused}>
        <Label htmlFor="jobSearch" style={{ color: jobInputFocused ? '#1da1b8' : '#555' }}>What</Label>
        <InputContainer>
          <IconWrapper focused={jobInputFocused}>
            <i className="fas fa-search"></i>
          </IconWrapper>
          <Input
            id="jobSearch"
            type="text"
            placeholder="Job title, keywords, or company"
            value={localJobSearch}
            onChange={handleJobSearchChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setJobInputFocused(true)}
            onBlur={() => setJobInputFocused(false)}
            focused={jobInputFocused}
          />
        </InputContainer>
      </SearchInputGroup>
      
      <SearchInputGroup focused={locationInputFocused}>
        <Label htmlFor="locationSearch" style={{ color: locationInputFocused ? '#1da1b8' : '#555' }}>Where</Label>
        <InputContainer>
          <IconWrapper focused={locationInputFocused}>
            <i className="fas fa-map-marker-alt"></i>
          </IconWrapper>
          <Input
            id="locationSearch"
            type="text"
            placeholder="City, state, or 'Remote'"
            value={localLocationSearch}
            onChange={handleLocationSearchChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setLocationInputFocused(true)}
            onBlur={() => setLocationInputFocused(false)}
            focused={locationInputFocused}
          />
        </InputContainer>
      </SearchInputGroup>
      
      <Button 
        onClick={handleSearch}
        style={{ 
          transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        Search
      </Button>
    </SearchBarContainer>
  );
};

export default SearchBar; 