import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, TextField, Typography, Container, Box } from '@material-ui/core';
import styled from 'styled-components';

// Reuse the same styled components from Login.js
import { GradientBackground, FormContainer, FormHeader, FormContent, StyledInput, ButtonContainer, StyledButton } from './Login';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <GradientBackground>
      <FormContainer>
        <FormHeader>
          <Typography variant="h5" style={{ 
            background: 'linear-gradient(25deg, #FFBE0B, #FB5607, #FF006E, #8338EC, #3A86FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 900,
            textTransform: 'uppercase'
          }}>
            Register New Account
          </Typography>
        </FormHeader>
        
        <FormContent>
          <form onSubmit={handleSubmit}>
            <StyledInput
              label="Full Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <StyledInput
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <StyledInput
              label="Password"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {error && <Typography color="error">{error}</Typography>}
            
            <ButtonContainer>
              <StyledButton onClick={() => navigate('/login')}>Login</StyledButton>
              <StyledButton type="submit">Register</StyledButton>
            </ButtonContainer>
          </form>
        </FormContent>
      </FormContainer>
    </GradientBackground>
  );
};

export default Register;
