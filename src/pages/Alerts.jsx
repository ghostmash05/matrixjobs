import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AlertsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderContent = styled.div``;

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

  &:hover {
    background-color: ${props => props.primary ? '#114a8f' : 'rgba(24, 97, 191, 0.1)'};
  }
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AlertCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const AlertTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const AlertControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled.button`
  background-color: transparent;
  color: ${props => props.delete ? '#e03131' : '#1861bf'};
  border: none;
  font-size: 0.9rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const AlertDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.95rem;
`;

const FrequencyBadge = styled.span`
  display: inline-block;
  background-color: #f0f7ff;
  color: #1861bf;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const ActionLink = styled(Link)`
  display: inline-block;
  background-color: #1861bf;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #114a8f;
  }
`;

// Create alert modal components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: #1861bf;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Alerts = () => {
  const { currentUser, createAlert, deleteAlert } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    query: '',
    location: '',
    frequency: 'daily'
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setNewAlert({
      title: '',
      query: '',
      location: '',
      frequency: 'daily'
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlert({
      ...newAlert,
      [name]: value
    });
  };
  
  const handleCreateAlert = () => {
    // Validate form
    if (!newAlert.title || !newAlert.query) {
      alert('Please fill out all required fields');
      return;
    }
    
    // Create the alert
    const createdAlert = createAlert(newAlert);
    
    if (createdAlert) {
      setSuccessMessage('Alert created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        closeModal();
      }, 2000);
    }
  };
  
  const handleDeleteAlert = (alertId) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      deleteAlert(alertId);
    }
  };
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Header />
      <AlertsContainer>
        <PageHeader>
          <HeaderContent>
            <Title>Job Alerts</Title>
            <Subtitle>Get notified about new job opportunities</Subtitle>
          </HeaderContent>
          <ActionButton primary onClick={openModal}>Create New Alert</ActionButton>
        </PageHeader>
        
        {currentUser.alerts && currentUser.alerts.length > 0 ? (
          <AlertsList>
            {currentUser.alerts.map(alert => (
              <AlertCard key={alert.id}>
                <AlertHeader>
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertControls>
                    <ControlButton delete onClick={() => handleDeleteAlert(alert.id)}>
                      Delete
                    </ControlButton>
                  </AlertControls>
                </AlertHeader>
                
                <AlertDetails>
                  <DetailItem>
                    <strong style={{ marginRight: '0.5rem' }}>Search:</strong> {alert.query}
                  </DetailItem>
                  <DetailItem>
                    <strong style={{ marginRight: '0.5rem' }}>Location:</strong> {alert.location || 'Any'}
                  </DetailItem>
                </AlertDetails>
                
                <FrequencyBadge>
                  {alert.frequency === 'daily' ? 'Daily Alerts' : 'Weekly Alerts'}
                </FrequencyBadge>
              </AlertCard>
            ))}
          </AlertsList>
        ) : (
          <EmptyState>
            <EmptyStateTitle>No job alerts yet</EmptyStateTitle>
            <EmptyStateText>
              Create job alerts to get notified about new job postings that match your search criteria.
            </EmptyStateText>
            <ActionButton primary onClick={openModal}>Create Your First Alert</ActionButton>
          </EmptyState>
        )}
        
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Create Job Alert</ModalTitle>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
              </ModalHeader>
              
              {successMessage ? (
                <div style={{ textAlign: 'center', color: '#0f9d58', marginBottom: '1rem' }}>
                  {successMessage}
                </div>
              ) : (
                <>
                  <FormGroup>
                    <Label htmlFor="title">Alert Name*</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newAlert.title}
                      onChange={handleInputChange}
                      placeholder="E.g., Frontend Developer jobs in San Francisco"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="query">Job Title/Keywords*</Label>
                    <Input
                      id="query"
                      name="query"
                      value={newAlert.query}
                      onChange={handleInputChange}
                      placeholder="E.g., Frontend Developer"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newAlert.location}
                      onChange={handleInputChange}
                      placeholder="E.g., San Francisco, CA or Remote"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="frequency">Alert Frequency</Label>
                    <Select
                      id="frequency"
                      name="frequency"
                      value={newAlert.frequency}
                      onChange={handleInputChange}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </Select>
                  </FormGroup>
                  
                  <ModalFooter>
                    <ActionButton onClick={closeModal}>Cancel</ActionButton>
                    <ActionButton primary onClick={handleCreateAlert}>Create Alert</ActionButton>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AlertsContainer>
      <Footer />
    </div>
  );
};

export default Alerts; 