import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateForm,
} from "../utils/formValidator";
import { Navigate } from "react-router-dom";

interface SignUpFormProps {
  open: boolean;
  onClose: () => void;
  onSignInClick: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  open,
  onClose,
  onSignInClick,
}) => {
  // Reset formData state when the form is closed
  useEffect(() => {
    if (!open) {
      setFormData({
        fullName: "",
        email: "",
        username: "",
        password: "",
      });
      setFormErrors({
        fullName: "",
        email: "",
        username: "",
        password: "",
      });
    }
  }, [open]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    let error = "";
    switch (fieldName) {
      case "email":
        error = validateEmail(value);
        break;
      case "username":
        error = validateUsername(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error || "",
    }));
  };

  const handleAlreadyAccount = () => {
    onSignInClick();
  };

  const handleSignUp = () => {
    setFormSubmitted(true); // Indicate that the form has been submitted
    const newFormErrors = validateForm(formData);

    // Update the form errors state
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ...newFormErrors,
    }));

    // Check if there are any errors in the form
    const hasErrors = Object.values(newFormErrors).some(
      (error) => error !== ""
    );
    if (hasErrors || !formData.username || !formData.password) {
      return; // Don't close the form if there are errors or empty fields
    }

    // Perform sign-Up logic
    // ...
    console.log(formData);

    // Close the form only on successful sign-in
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="bg-primary text-white">Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the required information to sign up.
        </DialogContentText>
        <TextField
          label="Full name"
          type="fullName"
          margin="normal"
          fullWidth
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          error={!!formErrors.fullName}
          helperText={formErrors.fullName}
        />
        <TextField
          label="Email"
          type="email"
          margin="normal"
          fullWidth
          onChange={(e) => handleFieldChange("email", e.target.value)}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          label="Username"
          margin="normal"
          fullWidth
          onChange={(e) => handleFieldChange("username", e.target.value)}
          error={!!formErrors.username}
          helperText={formErrors.username}
        />
        <TextField
          label="Password"
          type="password"
          margin="normal"
          fullWidth
          onChange={(e) => handleFieldChange("password", e.target.value)}
          error={!!formErrors.password}
          helperText={formErrors.password}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          className="mr-2 border-secondary hover:bg-white hover:text-secondary transition-colors"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSignUp}
          color="primary"
          className="hover:bg-white hover:text-primary border border-primary transition-colors"
        >
          Sign Up
        </Button>
      </DialogActions>
      <div className="text-center my-2">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={handleAlreadyAccount}
        >
          Sign In
        </span>
      </div>
    </Dialog>
  );
};

export default SignUpForm;
