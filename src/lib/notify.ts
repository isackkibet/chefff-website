// Build a wa.me deep link to message a customer directly from the admin panel.
export function waMeLink(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
