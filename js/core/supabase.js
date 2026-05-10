const SUPABASE_URL =
"https://gihybzpefojxiyyxheks.supabase.co";

const SUPABASE_KEY =
"ТВОЙ_SUPABASE_KEY";

window.supabaseClient =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
