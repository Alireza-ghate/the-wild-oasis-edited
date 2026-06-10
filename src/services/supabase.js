import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fadonparwjtqaoblodcl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZG9ucGFyd2p0cWFvYmxvZGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3ODY0MTMsImV4cCI6MjA5NjM2MjQxM30.pqG9_Xv214OLHXxAlkZTrqDTXphLKd6F_ALwr3HuG0c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
