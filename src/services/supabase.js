import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://atwtsiuqwfowznqmkvqd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0d3RzaXVxd2Zvd3pucW1rdnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMTE2MTQsImV4cCI6MjA0Mzg4NzYxNH0.g2tnvQQ0D5-adJUn1Fr488VBmGmKtIBb_slB30nkF7c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
