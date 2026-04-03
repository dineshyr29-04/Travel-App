/**
 * Validation Utilities
 * Reusable validation functions for common use cases
 */

import { VALIDATION, ERROR_MESSAGES } from '../constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return ERROR_MESSAGES.WEAK_PASSWORD;
  }
  return null;
};

export const validatePhoneNumber = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone.replace(/\s/g, ''));
};

export const validatePasswordStrength = (
  password: string
): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) {
    score++;
  } else {
    feedback.push('At least 8 characters');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push('At least one uppercase letter');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push('At least one lowercase letter');
  }

  // Number check
  if (/\d/.test(password)) {
    score++;
  } else {
    feedback.push('At least one number');
  }

  // Special character check
  if (/[!@#$%^&*]/.test(password)) {
    score++;
  } else {
    feedback.push('At least one special character (!@#$%^&*)');
  }

  return { score, feedback };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidDateRange = (
  startDate: string,
  endDate: string
): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
};
