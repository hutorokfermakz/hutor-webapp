const SUPABASE_URL =
"https://gihybzpefojxiyyxheks.supabase.co";

const SUPABASE_KEY =
"sb_publishable_epzMrCasnlXMmAENesXgTw_dkRzwBag";

window.supabaseClient =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
