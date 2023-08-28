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
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import UserRegisteredSuccess from "./userRegisteredSuccess";

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
  const navigate = useNavigate();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  // Reset formData state when the form is closed
  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
      });
      setFormErrors({
        name: "",
        email: "",
        username: "",
        password: "",
      });
    }
  }, [open]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
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

  const handleSignUp = async () => {
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

    try {
      const response = await registerUser(formData); // Call the API function
      console.log("User registered:", response);
      onClose();
      // Show the success dialog
      setIsSuccessDialogOpen(true);

      // Close the success dialog after 3 seconds
      setTimeout(() => {
        setIsSuccessDialogOpen(false);
      }, 3000);
      navigate("/");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the backend error message to the user
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          backend: error.response.data.message,
        }));
      } else {
        console.error("An error occurred:", error);
      }
    }

    // Close the form only on successful sign-in
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className="bg-primary text-white">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the required information to sign up.
          </DialogContentText>
          <TextField
            label="Full name"
            type="name"
            margin="normal"
            fullWidth
            onChange={(e) => handleFieldChange("name", e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
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
      <UserRegisteredSuccess
        open={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
      />
    </div>
  );
};

export default SignUpForm;
