import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import styles from './AuthForm.module.css';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = (): boolean => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      showError('Please fill in all fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      showError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      showSuccess('Registration successful! Welcome to Bootcamp Scheduler');
      navigate('/');
    } catch {
      showError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Create Account</h2>
        <p className={styles.authSubtitle}>
          Join the Bootcamp Scheduler community
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor='name'>Full Name</label>
            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your full name'
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Create a password (min. 6 characters)'
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              required
            />
          </div>

          <button
            type='submit'
            className={styles.authButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className={styles.authFooter}>
          Already have an account?{' '}
          <Link to='/login' className={styles.authLink}>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
