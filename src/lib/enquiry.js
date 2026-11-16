// Builds the text the contact form hands to WhatsApp or email. Nothing is sent from the page.
export function buildEnquiry({ firstName = '', lastName = '', email = '', message = '' } = {}) {
  const name = [firstName, lastName].map((s) => s.trim()).filter(Boolean).join(' ');
  const body = message.trim();
  const parts = [];
  if (name) parts.push(`Hello Infyta, this is ${name}.`);
  parts.push(body);
  if (email.trim()) parts.push(`Email: ${email.trim()}`);
  return {
    ok: body.length > 0,
    subject: name ? `Website enquiry from ${name}` : 'Website enquiry',
    text: parts.join('\n\n'),
  };
}

export function whatsappUrl(e164, text) {
  return `https://wa.me/${e164.replace(/^\+/, '')}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(to, subject, text) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}
