/**
 * Auth helpers – register, login, logout, session
 * Requires: supabase-js CDN + js/supabase-client.js with keys set
 */
(function () {
  function showMsg(el, text, isError) {
    if (!el) return;
    el.textContent = text;
    el.style.display = "block";
    el.style.background = isError ? "#FEF2F2" : "#ECFDF5";
    el.style.color = isError ? "#DC2626" : "#059669";
    el.style.border = "1px solid " + (isError ? "#FECACA" : "#A7F3D0");
    el.style.padding = "0.75rem 1rem";
    el.style.borderRadius = "8px";
    el.style.marginBottom = "1rem";
    el.style.fontSize = "0.875rem";
    el.style.lineHeight = "1.45";
  }

  function friendlyAuthError(err) {
    if (!err) return "Something went wrong. Try again.";
    var m = (err.message || err.msg || String(err)).toLowerCase();
    var code = err.error_code || err.code || "";
    if (m.indexOf("email not confirmed") !== -1 || code === "email_not_confirmed") {
      return "Email not confirmed. Open the confirmation link in your inbox, or disable Confirm email in Supabase (Authentication → Providers → Email) while testing.";
    }
    if (m.indexOf("user already registered") !== -1 || m.indexOf("already been registered") !== -1) {
      return "This email is already registered. Try logging in instead.";
    }
    if (m.indexOf("invalid login") !== -1 || m.indexOf("invalid credentials") !== -1) {
      return "Wrong email or password.";
    }
    if (m.indexOf("password") !== -1 && m.indexOf("6") !== -1) {
      return "Password must be at least 6 characters.";
    }
    if (m.indexOf("email address") !== -1 && m.indexOf("invalid") !== -1) {
      return "Use a real email address (e.g. Gmail). Some test domains are blocked.";
    }
    if (m.indexOf("rate") !== -1) {
      return "Too many attempts. Wait a minute and try again.";
    }
    return err.message || err.msg || "Request failed. Check your connection and try again.";
  }

  window.smRegister = async function (form) {
    var msg = document.getElementById("auth-message");
    var client = window.getSmClient && window.getSmClient();
    if (!client) {
      showMsg(
        msg,
        "Supabase is not connected. Check js/supabase-client.js has your Project URL and publishable/anon key.",
        true
      );
      return;
    }
    var fullName = (form.full_name && form.full_name.value) || "";
    var email = form.email.value.trim();
    var password = form.password.value;
    if (!email || !password) {
      showMsg(msg, "Email and password are required.", true);
      return;
    }
    if (password.length < 6) {
      showMsg(msg, "Password must be at least 6 characters.", true);
      return;
    }
    var btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Creating account…";
    }
    try {
      var result = await client.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: "https://mawelanoah.github.io/Student/login.html"
        }
      });
      if (result.error) throw result.error;

      var session = result.data && result.data.session;
      var user = result.data && result.data.user;

      if (user && !session) {
        // Email confirmation is ON in Supabase
        showMsg(
          msg,
          "Account created. Check your email for a confirmation link, then log in. If no email arrives, in Supabase go to Authentication → Providers → Email and turn OFF Confirm email while testing.",
          false
        );
        return;
      }

      showMsg(msg, "Account created. You are logged in — redirecting…", false);
      form.reset();
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1200);
    } catch (err) {
      console.error("Register error", err);
      showMsg(msg, friendlyAuthError(err), true);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Create account";
      }
    }
  };

  window.smLogin = async function (form) {
    var msg = document.getElementById("auth-message");
    var client = window.getSmClient && window.getSmClient();
    if (!client) {
      showMsg(
        msg,
        "Supabase is not connected. Check js/supabase-client.js has your Project URL and publishable/anon key.",
        true
      );
      return;
    }
    var email = form.email.value.trim();
    var password = form.password.value;
    if (!email || !password) {
      showMsg(msg, "Email and password are required.", true);
      return;
    }
    var btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Logging in…";
    }
    try {
      var result = await client.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (result.error) throw result.error;
      showMsg(msg, "Logged in. Redirecting…", false);
      setTimeout(function () {
        window.location.href = "index.html";
      }, 800);
    } catch (err) {
      console.error("Login error", err);
      showMsg(msg, friendlyAuthError(err), true);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Log in";
      }
    }
  };

  window.smLogout = async function () {
    var client = window.getSmClient && window.getSmClient();
    if (client) await client.auth.signOut();
    window.location.href = "index.html";
  };

  window.smGetSession = async function () {
    var client = window.getSmClient && window.getSmClient();
    if (!client) return null;
    var res = await client.auth.getSession();
    return res.data && res.data.session ? res.data.session : null;
  };
})();
