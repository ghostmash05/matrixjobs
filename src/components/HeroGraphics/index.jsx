import React from 'react';
import styled from 'styled-components';

const GraphicsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.6;
  pointer-events: none;
  
  @media (max-width: 768px) {
    opacity: 0.4;
  }
`;

const CirclePattern = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  right: -200px;
  top: -150px;
  
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    right: -150px;
    top: -100px;
  }
`;

const WavePattern = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  left: 10%;
  bottom: -120px;
  transform: rotate(10deg);
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    left: -50px;
    bottom: -80px;
  }
`;

const GridPattern = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  right: 30%;
  bottom: -50px;
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    right: 10%;
    bottom: -50px;
  }
`;

const HeroGraphics = () => {
  return (
    <GraphicsContainer>
      <CirclePattern>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" stroke="url(#circleGradient)" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="url(#circleGradient)" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="url(#circleGradient)" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="20" stroke="url(#circleGradient)" strokeWidth="2" fill="none" />
        </svg>
      </CirclePattern>
      
      <WavePattern>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path 
            d="M0,100 C40,80 60,140 100,120 C140,100 160,160 200,140" 
            stroke="url(#waveGradient)" 
            strokeWidth="2"
            fill="none"
          />
          <path 
            d="M0,80 C40,60 60,120 100,100 C140,80 160,140 200,120" 
            stroke="url(#waveGradient)" 
            strokeWidth="2"
            fill="none"
          />
          <path 
            d="M0,60 C40,40 60,100 100,80 C140,60 160,120 200,100" 
            stroke="url(#waveGradient)" 
            strokeWidth="2"
            fill="none"
          />
          <path 
            d="M0,40 C40,20 60,80 100,60 C140,40 160,100 200,80" 
            stroke="url(#waveGradient)" 
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </WavePattern>
      
      <GridPattern>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <g stroke="url(#gridGradient)" strokeWidth="1" fill="none">
            <rect x="10" y="10" width="80" height="80" />
            <line x1="10" y1="30" x2="90" y2="30" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="10" y1="70" x2="90" y2="70" />
            <line x1="30" y1="10" x2="30" y2="90" />
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="70" y1="10" x2="70" y2="90" />
          </g>
        </svg>
      </GridPattern>
    </GraphicsContainer>
  );
};

export default HeroGraphics; 