/**
 * WhatsApp helpers for Student Marketplace Phase 1 ordering
 * Does NOT create fake orders or payments.
 */
(function (w) {
  function digitsOnly(phone) {
    return String(phone || "").replace(/\D/g, "");
  }

  /** Normalize SA numbers to international without + */
  function toWaNumber(phone) {
    var d = digitsOnly(phone);
    if (!d) return "";
    if (d.indexOf("27") === 0 && d.length >= 11) return d;
    if (d.charAt(0) === "0" && d.length === 10) return "27" + d.slice(1);
    if (d.length === 9) return "27" + d;
    return d;
  }

  function isValidWa(phone) {
    var n = toWaNumber(phone);
    return n.length >= 11 && n.length <= 15;
  }

  function buildLink(phone, message) {
    var n = toWaNumber(phone);
    if (!n) return "";
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(message || "");
  }

  function productMessage(opts) {
    opts = opts || {};
    var lines = [
      "Hello, I am interested in purchasing *" + (opts.name || "this item") + "* listed on Student Marketplace.",
      "",
      "Price: R" + (opts.price != null ? opts.price : "—"),
      "Campus: " + (opts.campus || "—"),
      "",
      "Is this product still available?"
    ];
    if (opts.link) {
      lines.push("");
      lines.push("Listing: " + opts.link);
    }
    lines.push("");
    lines.push("(Sent via Student Marketplace — payment & collection arranged directly with the seller.)");
    return lines.join("\n");
  }

  function serviceMessage(opts) {
    opts = opts || {};
    var lines = [
      "Hello, I would like to book *" + (opts.name || "your service") + "* listed on Student Marketplace.",
      "",
      "Price: R" + (opts.price != null ? opts.price : "—"),
      "Campus / location: " + (opts.campus || "—"),
      "",
      "When are you available?"
    ];
    if (opts.link) {
      lines.push("");
      lines.push("Listing: " + opts.link);
    }
    lines.push("");
    lines.push("(Sent via Student Marketplace — booking & payment arranged directly.)");
    return lines.join("\n");
  }

  w.SMWhatsApp = {
    digitsOnly: digitsOnly,
    toWaNumber: toWaNumber,
    isValidWa: isValidWa,
    buildLink: buildLink,
    productMessage: productMessage,
    serviceMessage: serviceMessage
  };
})(window);
