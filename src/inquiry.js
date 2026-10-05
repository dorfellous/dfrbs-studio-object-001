export const CONTACT_EMAIL = "info@ranbensimon.com";
export const SERVICES = [
  { value: "not-sure", label: "Not sure yet" },
  { value: "film", label: "Films & campaigns" },
  { value: "3d", label: "3D imagery & digital fashion" },
  { value: "web", label: "Websites & creative tools" },
  { value: "pipeline", label: "AI production workflows" },
  { value: "art", label: "Art commissions & experiences" },
  { value: "workshop", label: "Workshops & team training" },
];

export const serviceFromValue = (value) => SERVICES.find((service) => service.value === value) || SERVICES[0];
const cleanText = (value) => String(value || "").trim();
const singleLine = (value) => cleanText(value).replace(/[\r\n]+/g, " ");

export function prepareInquiry(values = {}) {
  const name = singleLine(values.name);
  const email = singleLine(values.email);
  const idea = cleanText(values.idea);
  const service = serviceFromValue(values.service);
  const timing = singleLine(values.timing);
  const budget = singleLine(values.budget);
  const context = cleanText(values.context);
  const errors = {};

  if (!name) errors.name = "Add your name so we know who to reply to.";
  if (!email) errors.email = "Add an email address for our reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Check your email address, for example name@studio.com.";
  if (!idea) errors.idea = "Tell us a little about the project you have in mind.";
  if (Object.keys(errors).length) return { errors };

  const lines = [
    "DFRBS Studio — Project brief",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service.label}`,
    "",
    "Project idea",
    idea,
  ];
  if (timing || budget) lines.push("");
  if (timing) lines.push(`Timing: ${timing}`);
  if (budget) lines.push(`Budget: ${budget}`);
  if (context) lines.push("", "Links & context", context);

  const brief = lines.join("\n");
  const subject = `DFRBS Studio / ${service.label} / ${name}`;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
  return { errors, brief, subject, mailto };
}
