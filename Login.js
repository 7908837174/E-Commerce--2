import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, TextField, Typography, Container, Box } from '@material-ui/core';
import styled from 'styled-components';

const GradientBackground = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(25deg, #FFBE0B, #FB5607, #FF006E, #8338EC, #3A86FF);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 30%;
  min-width: 350px;
  background-color: #370617;
  box-shadow: 0 0 50px -20px #000;
  border-radius: 8px;
  overflow: hidden;
`;

const FormHeader = styled.div`
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(25deg, #FFBE0B, #FB5607, #FF006E, #8338EC, #3A86FF) 1;
  background: #000;
`;

const FormContent = styled.div`
  padding: 30px;
`;

const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
  & .MuiInputBase-root {
    color: white;
    background: #000;
  }
  & .MuiInput-underline:before {
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(25deg, #FFBE0B, #FB5607, #FF006E, #8338EC, #3A86FF) 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  background: linear-gradient(80deg, #FFBE0B, #FB5607 50%, #FF006E 50%, #8338EC);
`;

const StyledButton = styled(Button)`
  flex: 1;
  color: white !important;
  font-weight: 900 !important;
  padding: 10px !important;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      // Here you would typically send the token to your backend for verification
      // For demo, we'll just redirect to home
      navigate('/');
    } catch (err) {
      setError('Google login failed');
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
            Login + Firebase Database
          </Typography>
        </FormHeader>
        
        <FormContent>
          <form onSubmit={handleSubmit}>
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
              <StyledButton onClick={() => navigate('/register')}>Register</StyledButton>
              <StyledButton type="submit">Login</StyledButton>
            </ButtonContainer>
          </form>
          
          <Box mt={3} textAlign="center">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google login failed')}
                text="signin_with"
                shape="pill"
              />
            </GoogleOAuthProvider>
          </Box>
        </FormContent>
      </FormContainer>
    </GradientBackground>
  );
};

export default Login;
