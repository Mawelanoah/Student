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
  }

  window.smRegister = async function (form) {
    var msg = document.getElementById("auth-message");
    var client = window.getSmClient && window.getSmClient();
    if (!client) {
      showMsg(
        msg,
        "Supabase is not connected. Add your Project URL and anon key in js/supabase-client.js",
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
        options: { data: { full_name: fullName } }
      });
      if (result.error) throw result.error;
      // Profile row is created by the database trigger handle_new_user
      showMsg(
        msg,
        "Account created. Check your email to confirm if required, then log in.",
        false
      );
      form.reset();
      setTimeout(function () {
        window.location.href = "login.html";
      }, 2000);
    } catch (err) {
      showMsg(msg, err.message || "Registration failed.", true);
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
        "Supabase is not connected. Add your Project URL and anon key in js/supabase-client.js",
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
      showMsg(msg, err.message || "Login failed.", true);
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
