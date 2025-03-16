// src/components/Waitlist.jsx
import React, { useState } from 'react';
import './Waitlist.css';
import { supabase } from '../supabaseClient';

function Waitlist() {
  const [email, setEmail] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [joined, setJoined] = useState(false);

  const generateReferralCode = () => {
    // Replace with a more robust code generation in a real app
    return Math.random().toString(36).substring(2, 8);
  };

  const handleJoinWaitlist = async () => {
    if (email) {
      const referralCode = generateReferralCode();
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ email: email, referral_code: referralCode }]);

      if (error) {
        setMessage(error.message);
      } else {
        setJoined(true);
      }
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
