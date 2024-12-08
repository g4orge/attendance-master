import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Add CSS for styling

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Replace with your API URL
      const response = await fetch('https://your-api-url.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        onLogin(data.token); // Pass the token to set authentication state
        navigate('/home'); // Redirect to the home page
      } else {
        // Handle errors from the API
        if (data.message === 'Invalid username') {
          setError('Invalid username.');
        } else if (data.message === 'Invalid password') {
          setError('Invalid password.');
        } else {
          setError('Login failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {/* Username Field */}
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </label>
        </div>

        {/* Password Field */}
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Forgot Password Link */}
      <p className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
  );
};

export default Login;
