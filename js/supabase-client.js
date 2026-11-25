/**
 * Supabase client – replace with your project values.
 * Never put the service_role key in frontend code.
 */
(function () {
  const SUPABASE_URL = "YOUR_SUPABASE_URL";
  const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
  window.SM_CONFIG = {
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    configured: SUPABASE_URL.indexOf("YOUR_") === -1 && SUPABASE_ANON_KEY.indexOf("YOUR_") === -1
  };
  window.initSupabase = function () {
    if (!window.SM_CONFIG.configured) {
      console.warn("Supabase not configured. See SETUP.md");
      return null;
    }
    if (window.supabase && window.supabase.createClient) {
      window.smClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return window.smClient;
    }
    return null;
  };
})();
