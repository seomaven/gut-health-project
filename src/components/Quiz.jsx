// src/components/Quiz.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import QuizSkeleton from './QuizSkeleton';
import { supabase } from '../supabaseClient'; // Import Supabase client
export const questions = [
  {
    text: 'How often do you experience bloating?',
    options: ['Rarely or Never', 'Sometimes', 'Often', 'Constantly'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'How often do you eat processed foods?',
    options: ['Rarely or Never', '1-2 times a week', '3-5 times a week', 'Daily'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'How often do you consume fermented foods (e.g., yogurt, kimchi)?',
    options: ['Daily', 'A few times a week', 'Rarely', 'Never'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'How often do you feel stressed?',
    options: ['Rarely', 'Sometimes', 'Often', 'Constantly'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'How many servings of fruits and vegetables do you eat per day?',
    options: ['5+', '3-4', '1-2', 'Less than 1'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'How often do you experience heartburn or acid reflux?',
    options: ['Rarely or Never', 'Sometimes', 'Often', 'Constantly'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'How regular are your bowel movements?',
    options: ['Very Regular', 'Mostly Regular', 'Irregular', 'Very Irregular'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'Do you take antibiotics frequently?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'How well do you sleep on average?',
    options: ['Very Well', 'Well', 'Poorly', 'Very Poorly'],
    scores: [0, 1, 2, 3],
  },
  {
    text: 'Do you have any known food sensitivities or allergies?',
    options: ['No', 'I suspect some', 'Yes, a few', 'Yes, many'],
    scores: [0, 1, 2, 3],
  },
];

// Export calculateResult
export function calculateResult(answers, questions) {
  let totalScore = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] !== null) {
      totalScore += questions[i].scores[answers[i]];
    }
  }

  if (totalScore <= 10) {
    return 'Probiotic Pro';
  } else {
    return 'Leaky Gut Warrior';
  }
}

function Quiz() {
  // ... (rest of your Quiz component code) ...
}

export default Quiz;
