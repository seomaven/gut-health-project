import supabase from '../supabaseClient';
import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import './Auth.css';

    function Auth({ updateStreak }) {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [message, setMessage] = useState('');
      const navigate = useNavigate();

      // Function to simulate sending a push notification
      const sendPushNotification = () => {
        if ('Notification' in window && Notification.permission === 'granted') {
          // In a real app, you'd use a service worker for background notifications.
          // Here, we just show an alert-like message.
          alert("Don't break your streak! Log your habits today. (Simulated Push Notification)");
        } else if ('Notification' in window && Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              alert("Don't break your streak! Log your habits today. (Simulated Push Notification)");
            } else {
              console.log('Push notification permission denied.');
            }
          });
        } else {
          console.log('Push notifications not supported or permission blocked.');
        }
      };

      // Function to simulate sending an email reminder
      const sendEmailReminder = () => {
        // In a real app, you would use a backend service (e.g., SendGrid, Mailgun) to send emails.
        console.log(`Simulated email sent to ${email}: Don't break your streak! Log your habits today.`);
      };

      useEffect(() => {
        if (message.includes("Logged in successfully!")) {
          // Simulate sending reminders after login (with a delay)
          setTimeout(() => {
            sendPushNotification();
            sendEmailReminder();
          }, 5000); // 5 seconds delay
        }
      }, [message]);

      const handleRegister = () => {
        if (!email || !password) {
          setMessage('Please enter both email and password.');
          return;
        }
        localStorage.setItem('user', JSON.stringify({ email, password }));
        setMessage('Registered successfully! (Simulated)');
        handleLogin(); // Auto-login after registration
      };

      const handleLogin = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
          if (email === storedEmail && password === storedPassword) {
            setMessage('Logged in successfully! (Simulated)');

            const savedLastLogin = localStorage.getItem('last_login');
            let currentStreak = parseInt(localStorage.getItem('login_streak') || '0', 10);

            if (savedLastLogin) {
              const lastLoginDate = new Date(parseInt(savedLastLogin, 10));
              const today = new Date();
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);

              if (
                lastLoginDate.getDate() === yesterday.getDate() &&
                lastLoginDate.getMonth() === yesterday.getMonth() &&
                lastLoginDate.getFullYear() === yesterday.getFullYear()
              ) {
                currentStreak += 1;
              } else if (
                lastLoginDate.getDate() !== today.getDate() ||
                lastLoginDate.getMonth() !== today.getMonth() ||
                lastLoginDate.getFullYear() !== today.getFullYear()
              ) {
                currentStreak = 1;
              }
            } else {
              currentStreak = 1;
            }

            updateStreak(currentStreak);
            navigate('/');
            return;
          }
        }
        setMessage('Invalid credentials. (Simulated)');
      };

      const handleGoogleLogin = () => {
        localStorage.setItem('user', JSON.stringify({ email: 'google_user@example.com', token: 'mock_google_token' }));
        setMessage('Logged in with Google! (Simulated)');
        updateStreak(1);
        navigate('/');
      };

      const handleFacebookLogin = () => {
        localStorage.setItem('user', JSON.stringify({ email: 'facebook_user@example.com', token: 'mock_facebook_token' }));
        setMessage('Logged in with Facebook! (Simulated)');
        updateStreak(1);
        navigate('/');
      };

      return (
        <div>
          <h2>Sign Up / Login</h2>
          <p>
            <strong>Important:</strong> This authentication is simulated.  Push notifications and email reminders are also simulated.
            Real-world implementations require server-side components and user consent.
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
            <button className="social-button google" onClick={handleGoogleLogin}>Login with Google (Simulated)</button>
            <button className="social-button facebook" onClick={handleFacebookLogin}>Login with Facebook (Simulated)</button>
          </div>
          <p>{message}</p>
        </div>
      );
    }

    export default Auth;
