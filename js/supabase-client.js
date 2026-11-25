/**
 * Supabase client for Student Marketplace
 *
 * Use ONLY the Project URL + anon / publishable key.
 * NEVER put the service_role or sb_secret key in this file.
 */
(function () {
  // ========== PASTE YOUR VALUES HERE ==========
  // Project URL looks like: https://abcdefghijklmnop.supabase.co
  const SUPABASE_URL = sb_publishable_mSMP2mgZRbAtTo5zU9GMEA_ORSvW4qU;

  // Use the anon key (eyJ...) OR the publishable key (sb_publishable_...)
  // Do NOT use sb_secret_ or service_role here
  const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
  // ============================================

  window.SM_CONFIG = {
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    configured:
      !!SUPABASE_URL &&
      !!SUPABASE_ANON_KEY &&
      SUPABASE_URL.indexOf("YOUR_") === -1 &&
      SUPABASE_ANON_KEY.indexOf("YOUR_") === -1 &&
      SUPABASE_URL.indexOf("https://") === 0
  };

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

  window.initSupabase = window.getSmClient;
})();
