const SUPABASE_URL = "https://kyxxylixgxjxrweumwhh.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5eHh5bGl4Z3hqeHJ3ZXVtd2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTAwNjYsImV4cCI6MjA5NDA4NjA2Nn0.-ZaZiW2euz2F9CAEo0fKPfVUjScP9Dk8LuNdmgOL25U";

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
