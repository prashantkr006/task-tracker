// formValidator.ts

interface ValidationErrors {
    [key: string]: string;
  }
  
  export const validateEmail = (email: string): string => {
    if (!email) {
      return 'Email is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      return 'Invalid email address';
    }
    
    return '';
  };
  
  export const validateNumber = (number: string): string => {
    if (!number) {
      return 'Number is required';
    }
    
    const numberRegex = /^\d{10}$/;
    if (!number.match(numberRegex)) {
      return 'Number must be 10 digits';
    }
    
    return '';
  };
  
  export const validateUsername = (username: string): string => {
    if (!username) {
      return 'Username is required';
    }
  
    if (username.length < 6) {
      return 'Username must be 6 characters or more';
    }
  
    return '';
  };
  
  
  export const validatePassword = (password: string): string => {
    if (!password) {
      return 'Password is required';
    }
    
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    if (!password.match(passwordRegex)) {
      return 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    
    return '';
  };
  
  export const validateForm = (formData: Record<string, string>): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    for (const key in formData) {
      switch (key) {
        case 'email':
          const emailError = validateEmail(formData[key]);
          if (emailError) {
            errors[key] = emailError;
          }
          break;
        case 'number':
          const numberError = validateNumber(formData[key]);
          if (numberError) {
            errors[key] = numberError;
          }
          break;
        case 'username':
          const usernameError = validateUsername(formData[key]);
          if (usernameError) {
            errors[key] = usernameError;
          }
          break;
        case 'password':
          const passwordError = validatePassword(formData[key]);
          if (passwordError) {
            errors[key] = passwordError;
          }
          break;
        default:
          break;
      }
    }
  
    return errors;
  };
  