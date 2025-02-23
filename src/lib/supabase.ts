
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wozfaoomttttvfhbystp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvemZhb29tdHR0dHZmaGJ5c3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjU1MzYsImV4cCI6MjA1NTc0MTUzNn0.QGnL9CZw2JJqy3sacM6p5s9cIRaSGAcm7_6MDvZSITY";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Anon Key. Please connect your Supabase project first.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
