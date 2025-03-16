import supabase from '../supabaseClient';
import React, { useState, useEffect } from 'react';
    import './Tracker.css';
    import TrackerSkeleton from './TrackerSkeleton';

    function Tracker() {
      const [water, setWater] = useState(false);
      const [probiotic, setProbiotic] = useState(false);
      const [exercise, setExercise] = useState(false);
      const [isLoading, setIsLoading] = useState(true); // Loading state

      useEffect(() => {
        const savedWater = localStorage.getItem('tracker_water');
        const savedProbiotic = localStorage.getItem('tracker_probiotic');
        const savedExercise = localStorage.getItem('tracker_exercise');

        if (savedWater !== null) setWater(savedWater === 'true');
        if (savedProbiotic !== null) setProbiotic(savedProbiotic === 'true');
        if (savedExercise !== null) setExercise(savedExercise === 'true');

        // Simulate loading delay
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500); // 1.5 seconds

        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        localStorage.setItem('tracker_water', water);
        localStorage.setItem('tracker_probiotic', probiotic);
        localStorage.setItem('tracker_exercise', exercise);
      }, [water, probiotic, exercise]);

      const progress = (water ? 1 : 0) + (probiotic ? 1 : 0) + (exercise ? 1 : 0);
      const progressPercentage = (progress / 3) * 100;

      if (isLoading) {
        return <TrackerSkeleton />;
      }

      return (
        <div>
          <h2>Daily Tracker</h2>
          <p>
            <strong>Note:</strong> In a real application, this tracker would automatically reset daily.
          </p>
          <div className="tracker-item">
            <label>
              <input
                type="checkbox"
                checked={water}
                onChange={() => setWater(!water)}
              />
              Water Intake (8 glasses)
            </label>
          </div>
          <div className="tracker-item">
            <label>
              <input
                type="checkbox"
                checked={probiotic}
                onChange={() => setProbiotic(!probiotic)}
              />
              Probiotic Meal
            </label>
          </div>
          <div className="tracker-item">
            <label>
              <input
                type="checkbox"
                checked={exercise}
                onChange={() => setExercise(!exercise)}
              />
              Exercise (30 minutes)
            </label>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <p>Progress: {progressPercentage.toFixed(0)}%</p>
        </div>
      );
    }

    export default Tracker;
