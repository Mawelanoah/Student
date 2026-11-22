/**
 * Wishlist – localStorage only (Phase 1)
 */
(function () {
  const KEY = "sm_wishlist_v1";
  function getIds() {
    try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
  }
  function saveIds(ids) { localStorage.setItem(KEY, JSON.stringify(ids)); }
  window.Wishlist = {
    getAll: function () { return getIds(); },
    has: function (id) { return getIds().indexOf(id) !== -1; },
    add: function (id) { const ids = getIds(); if (ids.indexOf(id) === -1) { ids.push(id); saveIds(ids); } return ids; },
    remove: function (id) { const ids = getIds().filter(function (x) { return x !== id; }); saveIds(ids); return ids; },
    toggle: function (id) { if (this.has(id)) { this.remove(id); return false; } this.add(id); return true; },
    count: function () { return getIds().length; }
  };
})();
