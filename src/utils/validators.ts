// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Vietnam)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)[0-9]{9}$/;
  return phoneRegex.test(phone);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Required field
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Min/Max length
export const isMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const isMaxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

// Number validation
export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
