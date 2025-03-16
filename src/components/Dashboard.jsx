// src/components/Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { questions } from './Quiz'; // Import questions from Quiz.jsx
