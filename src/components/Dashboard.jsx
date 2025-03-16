// src/components/Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const badges = [
  {
    name: '3-Day Detox Champ',
    streakRequired: 3,
    generateImage: (canvas) => {
      const ctx = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 200;
      ctx.fillStyle = '#f0fff0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#2e8b57';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('Gut Guardian', 20, 40);
      ctx.fillStyle = '#333';
      ctx.font = '20px sans-serif';
      ctx.fillText('3-Day Detox Champ!', 20, 80);
      ctx.fillStyle = '#66cdaa';
      ctx.font = '16px sans-serif';
      ctx.fillText('Badge Earned!', 20, 120);
    },
  },
  {
    name: '7-Day Gut Guru',
    streakRequired: 7,
    generateImage: (canvas) => {
      const ctx = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 200;
      ctx.fillStyle = '#f0fff0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#2e8b57';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('Gut Guardian', 20, 40);
      ctx.fillStyle = '#333';
      ctx.font = '20px sans-serif';
      ctx.fillText('7-Day Gut Guru!', 20, 80);
      ctx.fillStyle = '#66cdaa';
      ctx.font = '16px sans-serif';
      ctx.fillText('Badge Earned!', 20, 120);
    },
  },
  {
    name: '14-Day Probiotic Pro',
    streakRequired: 14,
    generateImage: (canvas) => {
      const ctx = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 200;
      ctx.fillStyle = '#f0fff0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#2e8b57';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('Gut Guardian', 20, 40);
      ctx.fillStyle = '#333';
      ctx.font = '20px sans-serif';
      ctx.fillText('14-Day Probiotic Pro!', 20, 80);
      ctx.fillStyle = '#66cdaa';
      ctx.font = '16px sans-serif';
      ctx.fillText('Badge Earned!', 20, 120);
    },
  },
];

const tips = [
  'Eat a diverse range of foods to promote a healthy gut microbiome.',
  'Include fermented foods like yogurt and kimchi in your diet.',
  'Manage stress levels, as stress can negatively impact gut health.',
  'Stay hydrated by drinking plenty of water throughout the day.',
  'Get enough sleep, as sleep deprivation can disrupt gut bacteria.',
  'Limit processed foods and added sugars.',
  'Consider taking a probiotic supplement after consulting with a healthcare professional.',
];

const products = [
  {
    name: 'Probiotic Supplement',
    description: 'A high-quality probiotic to support gut health and digestion.',
    imageUrl: 'https://via.placeholder.com/150',
    affiliateLink:
      'https://example.com/probiotics?utm_source=gutguardianapp&utm_medium=referral&utm_campaign=product_page&utm_content=probiotics',
  },
  {
    name: 'Detox Teas',
    description: 'Blend of natural herbs to help cleanse and detoxify your body.',
    imageUrl: 'https://via.placeholder.com/150',
    affiliateLink:
      'https://example.com/detox-teas?utm_source=gutguardianapp&utm_medium=referral&utm_campaign=product_page&utm_content=detox_teas',
  },
  {
    name: 'Recipe Books',
    description: 'Collection of gut-friendly recipes to inspire healthy eating.',
    imageUrl: 'https://via.placeholder.com/150',
    affiliateLink:
      'https://example.com/recipe-books?utm_source=gutguardianapp&utm_medium=referral&utm_campaign=product_page&utm_content=recipe_books',
  },
];

// Simulated Google Analytics integration
const simulateGoogleAnalyticsEvent = (eventName, eventParams) => {
  console.log(
    `Simulated Google Analytics event: ${eventName}`,
    eventParams
  );
};

function Dashboard() {
  const [streak, setStreak] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [shareImage, setShareImage] = useState(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const canvasRef = useRef(null);
  const chartCanvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStreakAndBadges = async () => {
      const { data: streakData, error: streakError } = await supabase
        .rpc('get_streak'); // Assuming you have a Supabase function
      if (streakError) {
        console.error("Error fetching streak:", streakError);
      } else if (streakData) {
        setStreak(streakData);
      }

      const { data: badgeData, error: badgeError } = await supabase
        .from('badges')
        .select('badge_name')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (badgeError) {
        console.error("Error fetching badges:", badgeError);
      } else {
        const badgeNames = badgeData.map(badge => badge.badge_name);
        setEarnedBadges(badgeNames);
      }
    };

    fetchStreakAndBadges();
  }, []);

  const handleShareBadge = (badgeName) => {
    const badge = badges.find((b) => b.name === badgeName);
    if (badge && canvasRef.current) {
      badge.generateImage(canvasRef.current);
      const dataURL = canvasRef.current.toDataURL('image/png');
      setShareImage(dataURL);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePreviousTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
  };

  const handleNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 200;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const habits = ['water', 'probiotic', 'exercise'];
    const barWidth = 20;
    const spacing = 10;
    const startX = 50;
    const startY = 180;

    const pastWeekData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString();

      let dayData = { date: dateString };
      habits.forEach(habit => {
        const storedValue = localStorage.getItem(`${habit}_${dateString}`);
        dayData[habit] = storedValue === 'true' ? 1 : 0;
      });
      pastWeekData.push(dayData);
    }

    ctx.fillStyle = '#333';
    ctx.font = '12px sans-serif';
    pastWeekData.forEach((dayData, index) => {
      ctx.fillText(dayData.date, startX + index * (barWidth * habits.length + spacing), startY + 20);
    });

    habits.forEach((habit, habitIndex) => {
      pastWeekData.forEach((dayData, dayIndex) => {
        const x = startX + dayIndex * (barWidth * habits.length + spacing) + habitIndex * barWidth;
        const barHeight = dayData[habit] * 100;
        const y = startY - barHeight;

        if (habit === 'water') ctx.fillStyle = 'blue';
        if (habit === 'probiotic') ctx.fillStyle = 'green';
        if (habit === 'exercise') ctx.fillStyle = 'orange';

        ctx.fillRect(x, y, barWidth, barHeight);
      });
    });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Current Login Streak: {streak}</p>

      <h3>Weekly Habit Progress</h3>
      <canvas ref={chartCanvasRef} className="habit-chart" />

      <h3>Gut Health Tips</h3>
      <div className="tips-carousel">
        <button onClick={handlePreviousTip}>&lt;</button>
        <p>{tips[currentTipIndex]}</p>
        <button onClick={handleNextTip}>&gt;</button>
      </div>

      <h3>Recommended Products (Affiliate Links)</h3>
      <p>
        <strong>Note:</strong> These are placeholder affiliate links.
      </p>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product">
            <img src={product.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
              Learn More (Placeholder)
            </a>
          </div>
        ))}
      </div>

      <h3>Earned Badges:</h3>
      <ul>
        {earnedBadges.map((badgeName) => (
          <li key={badgeName}>
            {badgeName}
            <button onClick={() => handleShareBadge(badgeName)}>Share Badge</button>
          </li>
        ))}
      </ul>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {shareImage && (
        <div>
          <h4>Shareable Badge (Simulated)</h4>
          <img src={shareImage} alt="Badge" style={{ border: '1px solid #ddd' }} />
          <p>Right-click and save this image to share.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
