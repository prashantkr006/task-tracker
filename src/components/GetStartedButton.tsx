import React, { useState } from 'react';
import { Button } from '@mui/material';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const GetStartedButton: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div>
      <Button onClick={handleSignInClick} variant="contained" color="primary">
        Get Started
      </Button>
      <SignInForm open={showSignIn} onClose={handleClose} onSignUpClick={handleSignUpClick} />
      <SignUpForm open={showSignUp} onClose={handleClose} onSignInClick={handleSignInClick} />
    </div>
  );
};

export default GetStartedButton;
