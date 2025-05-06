import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Styled components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const CommunityHeader = styled.div`
  background: ${props => props.bgColor || 'linear-gradient(135deg, #1da1b8 0%, #1e9c64 100%)'};
  color: white;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: white;
  opacity: 0.9;
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-weight: 500;
  
  &:hover {
    opacity: 1;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const CommunityIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const CommunityTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
`;

const CommunityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  opacity: 0.9;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.primary ? props.bgColor || '#1da1b8' : 'white'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background: ${props => props.primary ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div`
  @media (max-width: 900px) {
    order: -1;
  }
`;

const CreatePostBox = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const PostTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  min-height: 120px;
  resize: none;
  margin-bottom: 1rem;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #1da1b8;
  }
`;

const PostButton = styled.button`
  background: linear-gradient(90deg, #1da1b8 0%, #1e9c64 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: linear-gradient(90deg, #1893a8 0%, #1a8c57 100%);
  }
`;

const AboutBox = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const AboutTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const AboutDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const RulesList = styled.ul`
  padding-left: 1.5rem;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const PostsContainer = styled.div``;

const Post = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

const PostAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #f0f0f0;
  margin-right: 1rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostUserInfo = styled.div`
  flex: 1;
`;

const PostUserName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #333;
`;

const PostTime = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

const PostBody = styled.div`
  padding: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
`;

const PostImage = styled.div`
  width: 100%;
  
  img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
  }
`;

const PostFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const PostAction = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: #f5f5f5;
    color: #333;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// Mock community data
const communityDetails = {
  1: {
    id: 1,
    title: 'Tech Career Advice',
    description: 'Get tips on advancing your tech career, share experiences, and network with industry professionals',
    members: '14.2k',
    icon: '💻',
    bgColor: 'linear-gradient(135deg, #614385 0%, #516395 100%)',
    about: 'A supportive community for tech professionals to exchange career advice, discuss industry trends, and help each other advance in the tech world.',
    rules: [
      'Be respectful and supportive of others',
      'No self-promotion or spam',
      'Keep discussions relevant to tech careers',
      'Respect privacy and confidentiality',
      'No discriminatory language or behavior'
    ]
  },
  2: {
    id: 2,
    title: 'Job Search Strategies',
    description: 'Effective strategies for job searching, resume tips, and interview preparation',
    members: '8.7k',
    icon: '🔍',
    bgColor: 'linear-gradient(135deg, #02AABB 0%, #00CDAC 100%)',
    about: 'A dedicated space to discuss effective job search strategies, share resume tips, and prepare for interviews. We help each other find meaningful employment.',
    rules: [
      'Be honest and constructive in feedback',
      'No recruiting or headhunting without permission',
      'Share success stories to inspire others',
      'Respect others\' job seeking journey',
      'No self-promotion without adding value'
    ]
  },
  3: {
    id: 3,
    title: 'Remote Work Hub',
    description: 'Resources and discussions for remote workers and digital nomads',
    members: '11.3k',
    icon: '🌐',
    bgColor: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    about: 'A community for remote workers and digital nomads to share resources, discuss challenges, and connect with fellow remote professionals.',
    rules: [
      'Share valuable resources and tips',
      'No spam or excessive self-promotion',
      'Respect different work styles and preferences',
      'Be mindful of timezone differences',
      'Keep discussions constructive and positive'
    ]
  }
};

// Mock posts data
const mockPosts = [
  {
    id: 1,
    communityId: 1,
    userName: 'Emily Chen',
    userAvatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    timeAgo: '2 hours ago',
    content: 'Just aced my technical interview at a FAANG company! The System Design portion was challenging but the preparation resources from this community were incredibly helpful. Thank you all for your support!',
    likes: 48,
    comments: 15,
    hasImage: false
  },
  {
    id: 2,
    communityId: 1,
    userName: 'Michael Rodriguez',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    timeAgo: '4 hours ago',
    content: 'After 5 years as a software engineer, I\'m considering transitioning to a product management role. Has anyone here made a similar move? What skills should I focus on developing? Any recommended resources or certifications that would be valuable?',
    likes: 23,
    comments: 31,
    hasImage: false
  },
  {
    id: 3,
    communityId: 1,
    userName: 'Sarah Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    timeAgo: '8 hours ago',
    content: 'Sharing my career growth framework that helped me advance from junior to senior engineer in 3 years. Hope this helps others on their journey!',
    likes: 112,
    comments: 27,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 4,
    communityId: 2,
    userName: 'David Kim',
    userAvatar: 'https://randomuser.me/api/portraits/men/64.jpg',
    timeAgo: '1 day ago',
    content: 'Resume tip that landed me 5 interviews last month: Quantify your achievements! Instead of saying "Improved system performance," say "Reduced page load time by 40% and increased user retention by 15%." Numbers catch recruiters\' attention!',
    likes: 89,
    comments: 22,
    hasImage: false
  },
  {
    id: 5,
    communityId: 2,
    userName: 'Priya Patel',
    userAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    timeAgo: '2 days ago',
    content: 'I created this interview preparation checklist after going through 20+ interviews in the last 3 months. It covers technical preparation, behavioral questions, and research strategies. Feel free to customize it for your own needs!',
    likes: 156,
    comments: 42,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 6,
    communityId: 3,
    userName: 'Alex Morgan',
    userAvatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    timeAgo: '3 days ago',
    content: 'My productivity skyrocketed after implementing a "deep work" schedule while working remotely. I block 3-hour chunks of uninterrupted time in the morning, turn off all notifications, and use the Pomodoro technique. Anyone else have productivity hacks to share?',
    likes: 78,
    comments: 35,
    hasImage: false
  },
  {
    id: 7,
    communityId: 3,
    userName: 'Sophia Zhang',
    userAvatar: 'https://randomuser.me/api/portraits/women/91.jpg',
    timeAgo: '4 days ago',
    content: 'Working from Bali this month! Here\'s my setup that allows me to stay connected with my team while enjoying the digital nomad lifestyle. The coworking space "Outpost" has been amazing for networking with other remote professionals.',
    likes: 132,
    comments: 47,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1536748325858-53bbc68e724c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const CommunityDetail = () => {
  const { id } = useParams();
  const communityId = parseInt(id, 10);
  const community = communityDetails[communityId];
  const [postContent, setPostContent] = useState('');
  
  // Filter posts for this community
  const communityPosts = mockPosts.filter(post => post.communityId === communityId);
  
  // Handle post submission
  const handlePostSubmit = () => {
    if (postContent.trim()) {
      alert('Post submitted (mock functionality)');
      setPostContent('');
    }
  };

  if (!community) {
    return <div>Community not found</div>;
  }

  return (
    <div>
      <Header />
      <CommunityHeader bgColor={community.bgColor}>
        <BackLink to="/community">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Communities
        </BackLink>
        
        <CommunityIcon>{community.icon}</CommunityIcon>
        <CommunityTitle>{community.title}</CommunityTitle>
        
        <CommunityInfo>
          <InfoItem>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 20.9999V18.9999C22.9993 18.1136 22.7044 17.2527 22.1614 16.5522C21.6184 15.8517 20.8581 15.3515 20 15.1299" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {community.members} members
          </InfoItem>
          <InfoItem>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Created 2 years ago
          </InfoItem>
        </CommunityInfo>
        
        <div>
          <ActionButton primary bgColor={community.bgColor.split(' ')[4]}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 7L17 3L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Join Community
          </ActionButton>
          <ActionButton>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.59009 13.51L15.4201 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.4101 6.51001L8.59009 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Share
          </ActionButton>
        </div>
      </CommunityHeader>
      
      <PageContainer>
        <ContentContainer>
          <MainContent>
            <CreatePostBox>
              <PostTextarea 
                placeholder="Share something with the community..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <PostButton onClick={handlePostSubmit}>Post</PostButton>
            </CreatePostBox>
            
            <PostsContainer>
              {communityPosts.map(post => (
                <Post key={post.id}>
                  <PostHeader>
                    <PostAvatar>
                      <img src={post.userAvatar} alt={post.userName} />
                    </PostAvatar>
                    <PostUserInfo>
                      <PostUserName>{post.userName}</PostUserName>
                      <PostTime>{post.timeAgo}</PostTime>
                    </PostUserInfo>
                  </PostHeader>
                  
                  <PostBody>{post.content}</PostBody>
                  
                  {post.hasImage && (
                    <PostImage>
                      <img src={post.imageUrl} alt="Post attachment" />
                    </PostImage>
                  )}
                  
                  <PostFooter>
                    <PostAction>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {post.likes}
                    </PostAction>
                    
                    <PostAction>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {post.comments}
                    </PostAction>
                    
                    <PostAction>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Share
                    </PostAction>
                  </PostFooter>
                </Post>
              ))}
            </PostsContainer>
          </MainContent>
          
          <Sidebar>
            <AboutBox>
              <AboutTitle>About This Community</AboutTitle>
              <AboutDescription>{community.about}</AboutDescription>
              
              <AboutTitle>Community Rules</AboutTitle>
              <RulesList>
                {community.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </RulesList>
            </AboutBox>
          </Sidebar>
        </ContentContainer>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default CommunityDetail; 