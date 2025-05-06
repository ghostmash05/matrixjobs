import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const SidebarContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SidebarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: #1da1b8;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #1da1b8;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.75rem;
  cursor: pointer;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #d0d0d0;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
  
  &:checked {
    background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
    border-color: transparent;
  }
  
  &:checked:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 6px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #1da1b8;
  }
`;

const Radio = styled.input`
  margin-right: 0.75rem;
  cursor: pointer;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #d0d0d0;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:checked {
    border: 5px solid #1da1b8;
  }
`;

const RangeContainer = styled.div`
  margin: 1rem 0;
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const RangeLabel = styled.span`
  font-size: 0.85rem;
  color: #666;
`;

const RangeInput = styled.input`
  width: 100%;
  margin: 0.75rem 0;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(29, 161, 184, 0.3);
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(29, 161, 184, 0.3);
  }
`;

const RangeValue = styled.div`
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
  margin-top: 0.75rem;
  text-align: center;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: #f0f7ff;
  color: #1da1b8;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#1da1b8'};
  border: ${props => props.primary ? 'none' : '1px solid #1da1b8'};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  margin-top: 0.75rem;
  box-shadow: ${props => props.primary ? '0 4px 12px rgba(29, 161, 184, 0.2)' : 'none'};

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(90deg, #1a96ac 0%, #1b8f5a 100%)' : 'rgba(29, 161, 184, 0.05)'};
    transform: ${props => props.primary ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.primary ? '0 6px 16px rgba(29, 161, 184, 0.3)' : 'none'};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const FilterSidebar = () => {
  const { 
    filters, 
    updateFilters, 
    searchJobs, 
    resetFilters 
  } = useAppContext();
  
  const [localFilters, setLocalFilters] = useState(filters);
  
  const handleJobTypeChange = (e) => {
    const { value, checked } = e.target;
    let jobType;
    
    if (checked) {
      jobType = [...localFilters.jobType, value];
    } else {
      jobType = localFilters.jobType.filter(type => type !== value);
    }
    
    setLocalFilters({
      ...localFilters,
      jobType
    });
  };
  
  const handleExperienceChange = (e) => {
    const { value, checked } = e.target;
    let experience;
    
    if (checked) {
      experience = [...localFilters.experience, value];
    } else {
      experience = localFilters.experience.filter(exp => exp !== value);
    }
    
    setLocalFilters({
      ...localFilters,
      experience
    });
  };
  
  const handleIndustryChange = (e) => {
    const { value, checked } = e.target;
    let industry;
    
    if (checked) {
      industry = [...localFilters.industry, value];
    } else {
      industry = localFilters.industry.filter(ind => ind !== value);
    }
    
    setLocalFilters({
      ...localFilters,
      industry
    });
  };
  
  const handleRatingChange = (e) => {
    setLocalFilters({
      ...localFilters,
      rating: Number(e.target.value)
    });
  };
  
  const handleSalaryChange = (e) => {
    setLocalFilters({
      ...localFilters,
      salaryRange: [0, Number(e.target.value) * 1000]
    });
  };
  
  const handleApplyFilters = () => {
    updateFilters(localFilters);
    searchJobs();
  };
  
  const handleResetFilters = () => {
    resetFilters();
    setLocalFilters({
      jobType: [],
      salaryRange: [0, 200000],
      rating: 0,
      experience: [],
      industry: []
    });
  };
  
  return (
    <SidebarContainer>
      <SidebarTitle>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Filter Jobs
      </SidebarTitle>
      
      <FilterSection>
        <SectionTitle>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Job Type
        </SectionTitle>
        <CheckboxGroup>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Full-time" 
              checked={localFilters.jobType.includes('Full-time')}
              onChange={handleJobTypeChange}
            />
            Full-time
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Part-time" 
              checked={localFilters.jobType.includes('Part-time')}
              onChange={handleJobTypeChange}
            />
            Part-time
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Contract" 
              checked={localFilters.jobType.includes('Contract')}
              onChange={handleJobTypeChange}
            />
            Contract
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Remote" 
              checked={localFilters.jobType.includes('Remote')}
              onChange={handleJobTypeChange}
            />
            Remote
          </CheckboxLabel>
        </CheckboxGroup>
      </FilterSection>
      
      <FilterSection>
        <SectionTitle>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Experience Level
        </SectionTitle>
        <CheckboxGroup>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Entry level" 
              checked={localFilters.experience.includes('Entry level')}
              onChange={handleExperienceChange}
            />
            Entry level
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Mid level" 
              checked={localFilters.experience.includes('Mid level')}
              onChange={handleExperienceChange}
            />
            Mid level
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Senior level" 
              checked={localFilters.experience.includes('Senior level')}
              onChange={handleExperienceChange}
            />
            Senior level
          </CheckboxLabel>
        </CheckboxGroup>
      </FilterSection>
      
      <FilterSection>
        <SectionTitle>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Industry
        </SectionTitle>
        <CheckboxGroup>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Technology" 
              checked={localFilters.industry.includes('Technology')}
              onChange={handleIndustryChange}
            />
            Technology
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Finance" 
              checked={localFilters.industry.includes('Finance')}
              onChange={handleIndustryChange}
            />
            Finance
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Healthcare" 
              checked={localFilters.industry.includes('Healthcare')}
              onChange={handleIndustryChange}
            />
            Healthcare
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              value="Education" 
              checked={localFilters.industry.includes('Education')}
              onChange={handleIndustryChange}
            />
            Education
          </CheckboxLabel>
        </CheckboxGroup>
      </FilterSection>
      
      <FilterSection>
        <SectionTitle>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Company Rating
        </SectionTitle>
        <RadioGroup>
          <RadioLabel>
            <Radio 
              type="radio" 
              name="rating" 
              value="0" 
              checked={localFilters.rating === 0}
              onChange={handleRatingChange}
            />
            Any Rating
          </RadioLabel>
          <RadioLabel>
            <Radio 
              type="radio" 
              name="rating" 
              value="3" 
              checked={localFilters.rating === 3}
              onChange={handleRatingChange}
            />
            3+ Stars
          </RadioLabel>
          <RadioLabel>
            <Radio 
              type="radio" 
              name="rating" 
              value="4" 
              checked={localFilters.rating === 4}
              onChange={handleRatingChange}
            />
            4+ Stars
          </RadioLabel>
          <RadioLabel>
            <Radio 
              type="radio" 
              name="rating" 
              value="4.5" 
              checked={localFilters.rating === 4.5}
              onChange={handleRatingChange}
            />
            4.5+ Stars
          </RadioLabel>
        </RadioGroup>
      </FilterSection>
      
      <FilterSection>
        <SectionTitle>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Salary Range
        </SectionTitle>
        <RangeContainer>
          <RangeLabels>
            <RangeLabel>$0</RangeLabel>
            <RangeLabel>$200k+</RangeLabel>
          </RangeLabels>
          <RangeInput 
            type="range" 
            min="0" 
            max="200" 
            value={localFilters.salaryRange[1] / 1000}
            onChange={handleSalaryChange}
          />
          <RangeValue>Up to ${(localFilters.salaryRange[1] / 1000).toFixed(0)}k</RangeValue>
        </RangeContainer>
      </FilterSection>
      
      <ActionButton primary onClick={handleApplyFilters}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Apply Filters
      </ActionButton>
      <ActionButton onClick={handleResetFilters}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 3V9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Reset Filters
      </ActionButton>
    </SidebarContainer>
  );
};

export default FilterSidebar; 