/**
 * Session + role helpers for Student Marketplace
 * Requires: @supabase/supabase-js + js/supabase-client.js
 */
(function () {
  function showPageMessage(text, isError) {
    var el = document.getElementById("auth-message");
    if (!el) return;
    el.style.display = "block";
    el.style.padding = "0.75rem 1rem";
    el.style.borderRadius = "8px";
    el.style.marginBottom = "1rem";
    el.style.fontSize = "0.875rem";
    el.style.lineHeight = "1.45";
    el.style.background = isError ? "#FEF2F2" : "#ECFDF5";
    el.style.color = isError ? "#DC2626" : "#059669";
    el.style.border = "1px solid " + (isError ? "#FECACA" : "#A7F3D0");
    el.textContent = text;
  }

  window.smShowMsg = showPageMessage;

  window.smGetClient = function () {
    return window.getSmClient ? window.getSmClient() : null;
  };

  /** Current auth user or null */
  window.smGetUser = async function () {
    var client = window.smGetClient();
    if (!client) return null;
    var res = await client.auth.getUser();
    if (res.error) return null;
    return res.data && res.data.user ? res.data.user : null;
  };

  /** Profile row for current user */
  window.smGetProfile = async function () {
    var client = window.smGetClient();
    if (!client) return null;
    var userRes = await client.auth.getUser();
    if (userRes.error || !userRes.data.user) return null;
    var uid = userRes.data.user.id;
    var prof = await client.from("profiles").select("*").eq("id", uid).maybeSingle();
    if (prof.error) {
      console.error("Profile load error", prof.error);
      return null;
    }
    return prof.data;
  };

  /**
   * Require a logged-in user with one of the allowed roles.
   * On failure redirects to loginPath.
   * @returns {Promise<{user, profile}|null>}
   */
  window.smRequireRole = async function (allowedRoles, loginPath) {
    var client = window.smGetClient();
    if (!client) {
      window.location.href = loginPath || "login.html";
      return null;
    }
    var userRes = await client.auth.getUser();
    if (userRes.error || !userRes.data.user) {
      window.location.href = loginPath || "login.html";
      return null;
    }
    var user = userRes.data.user;
    var prof = await client.from("profiles").select("*").eq("id", user.id).maybeSingle();
    if (prof.error || !prof.data) {
      alert("Profile not found. Contact support or re-register.");
      window.location.href = loginPath || "login.html";
      return null;
    }
    var profile = prof.data;
    if (profile.is_suspended === true) {
      await client.auth.signOut();
      alert("This account is suspended.");
      window.location.href = loginPath || "../login.html";
      return null;
    }
    var role = (profile.role || "customer").toLowerCase();
    var allowed = (allowedRoles || []).map(function (r) {
      return String(r).toLowerCase();
    });
    if (allowed.length && allowed.indexOf(role) === -1) {
      alert("You do not have access to this area (role: " + role + ").");
      if (role === "admin") window.location.href = "../admin/dashboard.html";
      else if (role === "seller") window.location.href = "../seller/dashboard.html";
      else window.location.href = "../index.html";
      return null;
    }
    return { user: user, profile: profile };
  };

  window.smLogout = async function (redirectTo) {
    var client = window.smGetClient();
    if (client) await client.auth.signOut();
    window.location.href = redirectTo || "../index.html";
  };

  window.smFriendlyAuthError = function (err) {
    if (!err) return "Something went wrong.";
    var m = (err.message || err.msg || String(err)).toLowerCase();
    if (m.indexOf("email not confirmed") !== -1) {
      return "Email not confirmed. Check your inbox or disable Confirm email in Supabase while testing.";
    }
    if (m.indexOf("invalid login") !== -1 || m.indexOf("invalid credentials") !== -1) {
      return "Wrong email or password.";
    }
    if (m.indexOf("rate") !== -1 || m.indexOf("too many") !== -1) {
      return "Too many attempts. Wait a few minutes and try once.";
    }
    if (m.indexOf("already registered") !== -1) {
      return "This email is already registered. Log in instead.";
    }
    return err.message || err.msg || "Request failed.";
  };
})();
