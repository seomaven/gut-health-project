// src/components/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { supabase } from '../supabaseClient'; // Import the Supabase client

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Registered successfully! Check your email to confirm.');
      navigate('/'); // Redirect to dashboard
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      navigate('/'); // Redirect to dashboard
    }
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setMessage(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });
    if (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up / Login</h2>
      <p>
        <strong>Important:</strong> This authentication is now using Supabase.
      </p>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button className="social-button google" onClick={handleGoogleLogin}>Login with Google</button>
        <button className="social-button facebook" onClick={handleFacebookLogin}>Login with Facebook</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Auth;
