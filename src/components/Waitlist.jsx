import supabase from '../supabaseClient';
import React, { useState } from 'react';
    import './Waitlist.css';

    function Waitlist() {
      const [email, setEmail] = useState('');
      const [referralLink, setReferralLink] = useState('');
      const [joined, setJoined] = useState(false);

      const handleJoinWaitlist = () => {
        if (email) {
          // Simulate adding to waitlist (store in localStorage)
          localStorage.setItem('waitlist_email', email);

          // Generate a simulated referral link
          const encodedEmail = encodeURIComponent(email);
          const link = `gutguardian.com/waitlist?ref=${encodedEmail}`; // Simplified referral link
          setReferralLink(link);
          setJoined(true)
        }
      };

      return (
        <div className='waitlist-container'>
          <h2>Join the Gut Guardian Waitlist</h2>
          <p>
            Get early access to the app, exclusive content, and a free gut health guide!
          </p>
          {!joined &&
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleJoinWaitlist}>Join Waitlist</button>
            </>
          }

          {joined &&
            <>
              <p>You're on the waitlist! 🎉</p>
              <h3>Referral Incentive</h3>
              <p>Invite 3 friends for early access and a free gut health guide!</p>
              <p>
                <strong>Your Referral Link (Simulated):</strong>
                <br />
                <a href={referralLink} target="_blank" rel="noopener noreferrer">
                  {referralLink}
                </a>
              </p>
              <p>
                <strong>Note:</strong> This referral link is for demonstration purposes only. In a real
                application, this link would be unique to you and would be used to track referrals. When
                three friends sign up using your link, you would automatically gain early access and
                receive the free guide.
              </p>
            </>
          }
        </div>
      );
    }

    export default Waitlist;
