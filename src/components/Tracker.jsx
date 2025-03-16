// src/components/Tracker.jsx
import React, { useState, useEffect } from 'react';
import './Tracker.css';
import TrackerSkeleton from './TrackerSkeleton';
import { supabase } from '../supabaseClient';

function Tracker() {
  const [water, setWater] = useState(false);
  const [probiotic, setProbiotic] = useState(false);
  const [exercise, setExercise] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrackerData = async () => {
      const { data, error } = await supabase
        .from('tracker_data')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .eq('date', new Date().toLocaleDateString())
        .single();

      if (error) {
        console.error("Error fetching tracker data:", error);
        // Handle the error (e.g., show an error message to the user)
      } else if (data) {
        setWater(data.water);
        setProbiotic(data.probiotic);
        setExercise(data.exercise);
      }
      setIsLoading(false);
    };

    fetchTrackerData();
  }, []);

  useEffect(() => {
    const updateTrackerData = async () => {
      const { data, error } = await supabase
        .from('tracker_data')
        .upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          date: new Date().toLocaleDateString(),
          water,
          probiotic,
          exercise,
        }, { onConflict: ['user_id', 'date'] });

      if (error) {
        console.error("Error updating tracker data:", error);
        // Handle the error
      }
    };
    updateTrackerData();
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
