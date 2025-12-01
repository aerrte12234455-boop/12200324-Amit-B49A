// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Film, Popcorn, Clapperboard } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginStyles } from '../../assets/dummyStyles';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // show loader initially (keeps original behaviour)
    setIsLoading(true);

    // Validation: minimum 6 characters for password
    if (!formData.password || formData.password.length < 6) {
      setIsLoading(false);
      toast.error('⚠️ Password must be at least 6 characters long.');
      console.warn('Login blocked - password too short:', formData);
      return;
    }

    // Log submitted data to console
    console.log('Login submitted:', formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // Persist auth to localStorage so Navbar detects logged-in state
      try {
        const authObj = { isLoggedIn: true, email: formData.email };
        localStorage.setItem('cine_auth', JSON.stringify(authObj));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email || '');
        localStorage.setItem('cine_user_email', formData.email || '');
        console.log('Auth saved to localStorage:', authObj);
      } catch (err) {
        console.error('Failed to save auth to localStorage', err);
      }

      toast.success('🎬 Login successful! Redirecting to your cinema...');

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        // In a real app, you would use react-router's navigate function
        window.location.href = '/'; // Simulate redirect
      }, 2000);
    }, 1500);
  };

  const goBack = () => {
    // In a real app, you would use react-router's navigate function
    window.history.back();
  };

  return (
    <div className={loginStyles.pageContainer}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="relative w-full max-w-md z-10">
        {/* Back Button */}
        {/* Small screens: place above card and inside layout (static). md+ screens: move it visually above/left of card (absolute) */}
        <div className={loginStyles.backButtonContainer}>
          <button
            onClick={goBack}
            className={loginStyles.backButton}
            aria-label="Back to Home"
          >
            <ArrowLeft size={20} className={loginStyles.backButtonIcon} />
            <span className={loginStyles.backButtonText}>Back to Home</span>
          </button>
        </div>

        {/* Animated Card */}
        <div className={loginStyles.cardContainer}>
          {/* Card Header with Icon */}
          <div className={loginStyles.cardHeader}></div>

          <div className={loginStyles.cardContent}>
            <div className={loginStyles.headerContainer}>
              <div className={loginStyles.headerIconContainer}>
                <Film className={loginStyles.headerIcon} size={28} />
                <h2 className={loginStyles.headerTitle}>CINEMA ACCESS</h2>
              </div>
              <p className={loginStyles.headerSubtitle}>Enter your credentials to continue the experience</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={loginStyles.inputGroup}>
                <label htmlFor="email" className={loginStyles.label}>
                  EMAIL ADDRESS
                </label>
                <div className={loginStyles.inputContainer}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={loginStyles.input}
                    placeholder="Enter your email"
                    aria-label="Email address"
                  />
                  <div className={loginStyles.inputIcon}>
                    <Clapperboard size={16} className="text-red-400" />
                  </div>
                </div>
              </div>

              <div className={loginStyles.inputGroup}>
                <label htmlFor="password" className={loginStyles.label}>
                  PASSWORD
                </label>
                <div className={loginStyles.inputContainer}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={loginStyles.inputWithIcon}
                    placeholder="Enter your password"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    className={loginStyles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className={loginStyles.passwordToggleIcon} />
                    ) : (
                      <Eye size={18} className={loginStyles.passwordToggleIcon} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`${loginStyles.submitButton} ${isLoading ? loginStyles.submitButtonDisabled : ''}`}
                aria-disabled={isLoading}
              >
                {isLoading ? (
                  <div className={loginStyles.buttonContent}>
                    <div className={loginStyles.loadingSpinner} />
                    <span className={loginStyles.buttonText}>SIGNING IN...</span>
                  </div>
                ) : (
                  <div className={loginStyles.buttonContent}>
                    <Popcorn size={18} className={loginStyles.buttonIcon} />
                    <span className={loginStyles.buttonText}>ACCESS YOUR ACCOUNT</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className={loginStyles.footerContainer}>
          <p className={loginStyles.footerText}>
            Don't have an account?{' '}
            <a href="/signup" className={loginStyles.footerLink}>
              Create one now
            </a>
          </p>
        </div>
      </div>

      {/* Responsive Styles & Font */}
      <style>{loginStyles.customCSS}</style>
    </div>
  );
};

export default LoginPage;