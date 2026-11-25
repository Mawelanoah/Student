/**
 * Supabase client for Student Marketplace
 *
 * 1. Supabase Dashboard → Project Settings → API
 * 2. Copy Project URL and anon public key below
 * 3. Never put the service_role key here
 */
(function () {
  // ========== PASTE YOUR VALUES HERE ==========
  const SUPABASE_URL = "YOUR_SUPABASE_URL";
  const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
  // ============================================

  window.SM_CONFIG = {
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    configured:
      SUPABASE_URL &&
      SUPABASE_ANON_KEY &&
      SUPABASE_URL.indexOf("YOUR_") === -1 &&
      SUPABASE_ANON_KEY.indexOf("YOUR_") === -1
  };

  /**
 * Returns the Supabase client, or null if not configured / CDN not loaded.
 * Loads client once and reuses window.smClient.
 */
  window.getSmClient = function () {
    if (!window.SM_CONFIG.configured) return null;
    if (window.smClient) return window.smClient;
    if (!window.supabase || !window.supabase.createClient) {
      console.error("Load @supabase/supabase-js before getSmClient()");
      return null;
    }
    window.smClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
    return window.smClient;
  };

  // Backwards compatible name
  window.initSupabase = window.getSmClient;
})();
