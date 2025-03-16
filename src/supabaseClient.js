// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://snmmllyhqtdorygcrsop.supabase.co'; // Replace with your Project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNubW1sbHlocXRkb3J5Z2Nyc29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNTg2NTMsImV4cCI6MjA1NzYzNDY1M30.SDunrGYIEYBY-R6byu8WUUhk5U9-Z-OJnLBZQv3pxAA'; // Replace with your anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
