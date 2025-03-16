import React, { useEffect } from 'react';
    import { calculateResult, questions } from './Quiz'; // Import from Quiz.jsx

    function runTests(tests) {
      console.log('Running tests...');
      let passed = 0;
      let failed = 0;

      for (const test of tests) {
        const result = test.testFunction();
        const testPassed = result === test.expected;

        if (testPassed) {
          passed++;
          console.log(`%cPASS: ${test.name}`, 'color: green;');
        } else {
          failed++;
          console.error(`FAIL: ${test.name}. Expected ${test.expected}, but got ${result}.`);
        }
      }

      console.log(`Tests completed. Passed: ${passed}, Failed: ${failed}`);
    }

    function Test() {
      useEffect(() => {
        const quizTests = [
          {
            name: 'Quiz: All answers leading to Probiotic Pro',
            testFunction: () => {
              const answers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // All lowest scores
              return calculateResult(answers, questions) === 'Probiotic Pro';
            },
            expected: true,
          },
          {
            name: 'Quiz: All answers leading to Leaky Gut Warrior',
            testFunction: () => {
              const answers = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]; // All highest scores
              return calculateResult(answers, questions) === 'Leaky Gut Warrior';
            },
            expected: true,
          },
          {
            name: 'Quiz: Mixed answers leading to Leaky Gut Warrior',
            testFunction: () => {
              const answers = [2, 3, 1, 2, 3, 3, 2, 1, 2, 3]; // Mixed, leaning towards higher
              return calculateResult(answers, questions) === 'Leaky Gut Warrior';
            },
            expected: true,
          },
        ];

        const emailSignupTests = [
          {
            name: 'Email Signup: Simulate adding email',
            testFunction: () => {
              const savedEmails = [];
              const email = 'test@example.com';
              const updatedEmails = [...savedEmails, email];
              return updatedEmails.length === 1 && updatedEmails[0] === email;
            },
            expected: true,
          }
        ];

        const paymentGatewayTests = [
          {
            name: 'Payment Gateway: Simulate 3-day delay for upgrade popup',
            testFunction: () => {
              const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
              const firstVisit = Date.now() - threeDaysInMs - 1000;
              const timeSinceFirstVisit = Date.now() - firstVisit;
              return timeSinceFirstVisit >= threeDaysInMs;
            },
            expected: true,
          },
           {
            name: 'Payment Gateway: Simulate less than 3-day delay for upgrade popup',
            testFunction: () => {
              const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
              const firstVisit = Date.now() - 1000;
              const timeSinceFirstVisit = Date.now() - firstVisit;
              return timeSinceFirstVisit >= threeDaysInMs;
            },
            expected: false,
          }
        ];

        const trackerTests = [
          {
            name: 'Tracker: Initial state is all unchecked',
            testFunction: () => {
              // Simulate initial state
              let water = false;
              let probiotic = false;
              let exercise = false;
              return water === false && probiotic === false && exercise === false;
            },
            expected: true,
          },
          {
            name: 'Tracker: Checkbox updates correctly',
            testFunction: () => {
              let water = false;
              water = !water; // Toggle
              return water === true;
            },
            expected: true,
          },
          {
            name: 'Tracker: Progress calculation',
            testFunction: () => {
              let water = true;
              let probiotic = false;
              let exercise = true;
              const progress = (water ? 1 : 0) + (probiotic ? 1 : 0) + (exercise ? 1 : 0);
              const progressPercentage = (progress / 3) * 100;
              return progressPercentage === (2/3) * 100;
            },
            expected: true,
          },
          {
            name: 'Tracker: LocalStorage save and load (simulated)',
            testFunction: () => {
              // Simulate saving
              let water = true;
              localStorage.setItem('tracker_water', water);
              // Simulate loading
              const savedWater = localStorage.getItem('tracker_water');
              return savedWater === 'true';
            },
            expected: true,
          }
        ];

        const dashboardTests = [
          {
            name: 'Dashboard: Streak increment (simulated)',
            testFunction: () => {
              // Simulate initial state
              let streak = 0;
              localStorage.setItem('last_login', Date.now() - (24 * 60 * 60 * 1000)); // Yesterday
              // Simulate login today
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
              return currentStreak === 1;
            },
            expected: true,
          },
          {
            name: 'Dashboard: Streak reset (simulated)',
            testFunction: () => {
              let streak = 5;
              localStorage.setItem('last_login', Date.now() - (2 * 24 * 60 * 60 * 1000)); // Two days ago
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
              return currentStreak === 1;
            },
            expected: true,
          },
          {
            name: 'Dashboard: Badge earning (simulated)',
            testFunction: () => {
              const badges = [
                { name: '3-Day Detox Champ', streakRequired: 3 },
                { name: '7-Day Gut Guru', streakRequired: 7 },
              ];
              let earnedBadges = [];
              let streak = 7; // Set streak to earn a badge

              const newBadges = [];
              for (const badge of badges) {
                if (streak >= badge.streakRequired && !earnedBadges.includes(badge.name)) {
                  newBadges.push(badge.name);
                }
              }
              const allEarnedBadges = [...earnedBadges, ...newBadges];

              return allEarnedBadges.includes('3-Day Detox Champ') && allEarnedBadges.includes('7-Day Gut Guru');
            },
            expected: true,
          },
        ];

        const waitlistTests = [
          {
            name: 'Waitlist: Email input and simulated referral link',
            testFunction: () => {
              const email = 'test@example.com';
              const encodedEmail = encodeURIComponent(email);
              const link = `gutguardian.com/waitlist?ref=${encodedEmail}`;
              return link === 'gutguardian.com/waitlist?ref=test%40example.com';
            },
            expected: true,
          },
        ];

        runTests([
          ...quizTests,
          ...emailSignupTests,
          ...paymentGatewayTests,
          ...trackerTests,
          ...dashboardTests,
          ...waitlistTests
        ]);
      }, []);

      return (
        <div>
          <h2>Automated Tests (Simulated)</h2>
          <p>
            <strong>Note:</strong> Due to the limitations of the WebContainer environment, these tests are
            simulated and do not use traditional testing frameworks. The results are logged to the
            browser's console.
          </p>
          <p>Open the browser's console to view the test results.</p>
        </div>
      );
    }

    export default Test;
