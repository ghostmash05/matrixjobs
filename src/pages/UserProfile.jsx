import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
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
  flex: 2;
`;

const Sidebar = styled.div`
  flex: 1;
`;

const Card = styled.div`
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

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1861bf;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1861bf;
  }
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
  margin-top: 1rem;

  &:hover {
    background-color: ${props => props.primary ? '#114a8f' : 'rgba(24, 97, 191, 0.1)'};
  }
`;

const StatsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const StatLabel = styled.div`
  font-weight: 500;
  color: #555;
`;

const StatValue = styled.div`
  font-weight: 600;
  color: #1861bf;
  font-size: 1.1rem;
`;

const ActionLink = styled(Link)`
  display: block;
  text-align: center;
  background-color: ${props => props.primary ? '#1861bf' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#1861bf'};
  border: ${props => props.primary ? 'none' : '1px solid #1861bf'};
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  margin-top: 1rem;

  &:hover {
    background-color: ${props => props.primary ? '#114a8f' : 'rgba(24, 97, 191, 0.1)'};
  }
`;

const UserProfile = () => {
  const { currentUser } = useAppContext();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    location: currentUser?.location || '',
    title: currentUser?.title || '',
    resume: currentUser?.resume || ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, we would make an API call to update the user profile
    // For this demo, we'll just show a success message
    
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Header />
      <ProfileContainer>
        <PageHeader>
          <Title>Profile Settings</Title>
          <Subtitle>Manage your account and preferences</Subtitle>
        </PageHeader>
        
        <Content>
          <Main>
            <Card>
              <SectionTitle>Personal Information</SectionTitle>
              {successMessage && (
                <div style={{ backgroundColor: '#e7f7ee', color: '#0f9d58', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                  {successMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="E.g., Frontend Developer"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="resume">Resume / Bio</Label>
                  <TextArea
                    id="resume"
                    name="resume"
                    value={formData.resume}
                    onChange={handleInputChange}
                    placeholder="A brief description of your skills and experience"
                  />
                </FormGroup>
                
                <ActionButton primary type="submit">Save Changes</ActionButton>
              </form>
            </Card>
          </Main>
          
          <Sidebar>
            <Card>
              <SectionTitle>Account Activity</SectionTitle>
              <StatsCard>
                <StatItem>
                  <StatLabel>Saved Jobs</StatLabel>
                  <StatValue>{currentUser.savedJobs.length}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Job Applications</StatLabel>
                  <StatValue>{currentUser.appliedJobs.length}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Job Alerts</StatLabel>
                  <StatValue>{currentUser.alerts.length}</StatValue>
                </StatItem>
              </StatsCard>
              
              <ActionLink to="/saved-jobs">View Saved Jobs</ActionLink>
              <ActionLink to="/alerts">Manage Alerts</ActionLink>
            </Card>
          </Sidebar>
        </Content>
      </ProfileContainer>
      <Footer />
    </div>
  );
};

export default UserProfile; 