"use client";

import { useState } from "react";
import { buildEnquiry, mailtoUrl, whatsappUrl } from "@/lib/enquiry";
import { useHydrated } from "@/lib/use-hydrated";
import { WhatsAppIcon } from "@/components/Icons";

// Hands the enquiry to WhatsApp or the mail app. Nothing is sent from the page, so it never says "sent".
export default function ContactForm({ phoneE164, email }) {
  const [error, setError] = useState(false);
  // Until the script runs, a click would reload /contact with the message in the URL: the buttons wait for it.
  const live = useHydrated();

  function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const read = (name) => String(new FormData(form).get(name) ?? "");
    const enquiry = buildEnquiry({
      firstName: read("firstName"),
      lastName: read("lastName"),
      email: read("email"),
      message: read("message"),
    });
    if (!enquiry.ok) {
      setError(true);
      form.elements.message.focus();
      return;
    }
    setError(false);
    if (event.nativeEvent.submitter?.value === "email") {
      window.location.href = mailtoUrl(email, enquiry.subject, enquiry.text);
    } else {
      window.open(whatsappUrl(phoneE164, enquiry.text), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <div className="cform__row">
        <div className="cform__field">
          <label htmlFor="cf-first">First Name</label>
          <input id="cf-first" name="firstName" type="text" autoComplete="given-name" />
        </div>
        <div className="cform__field">
          <label htmlFor="cf-last">Last Name</label>
          <input id="cf-last" name="lastName" type="text" autoComplete="family-name" />
        </div>
      </div>
      <div className="cform__field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="your@email.com" />
      </div>
      <div className="cform__field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="Tell us about your project..."
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? "cf-error" : undefined}
          onChange={(e) => { if (error && e.target.value.trim()) setError(false); }}
        />
        {error && <p id="cf-error" className="cform__error" role="alert">Write a message first.</p>}
      </div>
      <div className="cform__actions">
        <button className="btn btn--icon" type="submit" value="whatsapp" disabled={!live}><WhatsAppIcon />Send on WhatsApp</button>
        <button className="btn btn--ghost" type="submit" value="email" disabled={!live}>Send by email</button>
      </div>
    </form>
  );
}
