/* RSVP → Supabase.
   Sends the guest's message to the ahmed_engy_wedding_responses table. The SQL
   and the page that reads the messages live in the Arabic repo
   (ahmed-engy-wedding: supabase/setup.sql, ahmed-engy-wedding-responses.html).
   The anon key is public by design: the table only accepts new rows from it
   and can't be read without the passcode function. */
(function () {
    var SUPABASE_URL = "https://jcuqwcwkowtjxcykstlf.supabase.co";
    var SUPABASE_ANON_KEY = "sb_publishable_BFtrH3u_sv9zat6B9SALyw_nS7Pajaa";
    var TABLE = "ahmed_engy_wedding_responses";

    var isAr = (document.documentElement.getAttribute("lang") || "").indexOf("ar") === 0;
    var TEXT = isAr
        ? { sending: "جارٍ الإرسال…", empty: "اكتب رسالتك أولاً", failed: "تعذّر الإرسال، حاول مرة أخرى" }
        : { sending: "Sending…", empty: "Please write a message first", failed: "Couldn't send — please try again" };

    // Capture phase on document runs before the template's own submit
    // handler, which only fakes a successful send.
    document.addEventListener("submit", function (e) {
        var form = e.target;
        if (!form || !form.matches || !form.matches("[data-rsvp-form]")) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        send(form);
    }, true);

    function send(form) {
        var btn = form.querySelector('button[type="submit"]');
        var field = form.querySelector('textarea[name="message"]');
        var trap = form.querySelector('input[name="website"]');
        var message = field ? field.value.trim() : "";

        if (form.dataset.sending === "1" || form.dataset.sent === "1") return;
        if (!message) { showMessage(form, TEXT.empty, false); if (field) field.focus(); return; }
        if (trap && trap.value) { markSent(form, btn); return; } // bot filled the hidden field

        form.dataset.sending = "1";
        var oldLabel = btn ? btn.textContent : "";
        if (btn) { btn.disabled = true; btn.textContent = TEXT.sending; }

        fetch(SUPABASE_URL + "/rest/v1/" + TABLE, {
            method: "POST",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": "Bearer " + SUPABASE_ANON_KEY,
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            },
            body: JSON.stringify({ site: isAr ? "ar" : "en", message: message.slice(0, 600) })
        }).then(function (res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            markSent(form, btn);
        }).catch(function () {
            if (btn) { btn.disabled = false; btn.textContent = oldLabel; }
            showMessage(form, TEXT.failed, false);
        }).then(function () {
            form.dataset.sending = "";
        });
    }

    function markSent(form, btn) {
        form.dataset.sent = "1";
        if (btn) btn.textContent = btn.dataset.sentLabel || btn.textContent;
        form.querySelectorAll("input, textarea, button").forEach(function (el) { el.disabled = true; });
        showMessage(form, "", true);
    }

    function showMessage(form, text, success) {
        var msg = form.querySelector("[data-rsvp-msg]");
        if (!msg) return;
        if (!msg.dataset.successText) msg.dataset.successText = msg.textContent;
        msg.textContent = success ? msg.dataset.successText : text;
        msg.hidden = false;
        msg.classList.toggle("is-error", !success);
    }
})();
