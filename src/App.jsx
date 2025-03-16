import React, { useState, useEffect } from 'react';
    import {
      Routes,
      Route,
      NavLink,
      useNavigate,
      useLocation,
    } from 'react-router-dom';
    import Quiz from './components/Quiz';
    import Tracker from './components/Tracker';
    import Dashboard from './components/Dashboard';
    import Auth from './components/Auth';
    import Shop from './components/Shop';
    import Waitlist from './components/Waitlist';
    import Test from './components/Test';
    import './App.css';

    function App() {
      const [streak, setStreak] = useState(0);
      const [showUpgradePopup, setShowUpgradePopup] = useState(false);
      const navigate = useNavigate();
      const location = useLocation();

      const updateStreak = (newStreak) => {
        setStreak(newStreak);
      };

      const [touchStartX, setTouchStartX] = useState(null);

      const handleTouchStart = (e) => {
        setTouchStartX(e.touches ? e.touches[0].clientX : e.clientX);
      };

      const handleTouchMove = (e) => {
        if (touchStartX === null) return;

        const touchEndX = e.touches ? e.touches[0].clientX : e.clientX;
        const diffX = touchStartX - touchEndX;

        if (Math.abs(diffX) > 50) {
          const routes = ['/', '/quiz', '/tracker', '/auth', '/shop', '/waitlist', '/test'];
          const currentIndex = routes.indexOf(location.pathname);

          if (diffX > 0 && currentIndex < routes.length - 1) {
            navigate(routes[currentIndex + 1]);
          } else if (diffX < 0 && currentIndex > 0) {
            navigate(routes[currentIndex - 1]);
          }

          setTouchStartX(null);
        }
      };

      const handleTouchEnd = () => {
        setTouchStartX(null);
      };

      useEffect(() => {
        const firstVisit = localStorage.getItem('firstVisit');
        const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

        if (!firstVisit) {
          localStorage.setItem('firstVisit', Date.now());
        } else {
          const timeSinceFirstVisit = Date.now() - parseInt(firstVisit, 10);
          if (timeSinceFirstVisit >= threeDaysInMs) {
            setShowUpgradePopup(true);
          }
        }
      }, []);

      const closeUpgradePopup = () => {
        setShowUpgradePopup(false);
      };

      return (
        <div
          className="app"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
        >
          <nav>
            <ul>
              <li>
                <NavLink to="/" end>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/quiz">Quiz</NavLink>
              </li>
              <li>
                <NavLink to="/tracker">Tracker</NavLink>
              </li>
              <li>
                <NavLink to="/auth">Sign Up/Login</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/waitlist">Waitlist</NavLink>
              </li>
              <li>
                <NavLink to="/test">Test</NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/auth" element={<Auth updateStreak={updateStreak} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/test" element={<Test />} />
          </Routes>

          {showUpgradePopup && (
            <div className="popup">
              <h3>Unlock Advanced Features</h3>
              <p>Personalized Meal Plans</p>
              <p>$9.99/mo</p>
              <button onClick={() => {}}>Upgrade Now (Simulated)</button>
              <button onClick={closeUpgradePopup}>Close</button>
              <p>
                <strong>Note:</strong> This is a simulated upgrade offer.
              </p>
            </div>
          )}
        </div>
      );
    }

    export default App;
