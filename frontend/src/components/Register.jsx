import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import videoSource from '../components/bct2.mp4';

const Body = styled.div`
  position: relative;
  width: 100%;
  height: 90vh; /* Adjusted height */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoBackground = styled.video`
  position: fixed; /* Adjusted position */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Container = styled.div`
  text-align: center;
  color: #fff;
`;

const Heading = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const SubHeading = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const WelcomePage = () => {
  const bodyRef = useRef(null);

  const handleLogin = () => {
    // Logic for handling login
    console.log('Login clicked');
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      bodyRef.current.requestFullscreen();
    }
  };

  return (
    <Body ref={bodyRef}>
      <VideoBackground autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Heading>Welcome to TrustLine</Heading>
          <SubHeading>Modern Supply Chain Management with Blockchain Technology</SubHeading>
          <Text>
            TrustLine leverages blockchain technology to revolutionize supply chain management, providing transparency, security, and efficiency.
          </Text>
          <Link to="/login">
            <Button>Proceed</Button>
          </Link>
        </motion.div>
      </Container>
    </Body>
  );
};

export default WelcomePage;