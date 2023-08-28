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
  validateUsername,
  validatePassword,
  validateForm,
} from "../utils/formValidator";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

interface SignInFormProps {
  open: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  open,
  onClose,
  onSignUpClick,
}) => {
  const navigate = useNavigate();
  // Reset formData state when the form is closed
  useEffect(() => {
    if (!open) {
      setFormData({
        username: "",
        password: "",
      });
      setFormErrors({
        username: "",
        password: "",
        backend: "",
      });
    }
  }, [open]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    backend: "",
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    let error = "";
    switch (fieldName) {
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

  const handleCreateAccount = () => {
    onSignUpClick();
  };

  const handleSignIn = async () => {
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

    try {
      const response = await loginUser(formData); // Call the API function
      console.log("User logged in:", response);
      navigate("/tasks");
      onClose();
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
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your credentials to sign in.
        </DialogContentText>
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
      {formErrors.backend && (
        <div className=" text-red-600 text-center">{formErrors.backend}</div>
      )}

      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          className="mr-2 border-secondary hover:bg-white hover:text-secondary transition-colors"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSignIn}
          color="primary"
          className="hover:bg-white hover:text-primary border border-primary transition-colors"
        >
          Sign In
        </Button>
      </DialogActions>

      <div className="text-center my-2">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={handleCreateAccount}
        >
          Create Account
        </span>
      </div>
    </Dialog>
  );
};

export default SignInForm;
