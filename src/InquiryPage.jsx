import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Copy } from "@phosphor-icons/react";
import "./inquiry.css";

import { CONTACT_EMAIL, SERVICES, serviceFromValue, prepareInquiry } from "./inquiry.js";

export function InquiryPage({ initialService = "not-sure" }) {
  const [values, setValues] = useState({ name: "", email: "", service: serviceFromValue(initialService).value, idea: "", timing: "", budget: "", context: "" });
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null);
  const [copying, setCopying] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const formRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    setValues((current) => ({ ...current, service: serviceFromValue(initialService).value }));
    setPrepared(null);
    setCopyMessage("");
  }, [initialService]);

  useEffect(() => {
    if (prepared) resultRef.current?.focus();
  }, [prepared]);

  const changeField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setPrepared(null);
    setCopyMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = prepareInquiry(values);
    setErrors(result.errors);
    setCopyMessage("");
    if (Object.keys(result.errors).length) {
      setPrepared(null);
      formRef.current?.elements.namedItem(Object.keys(result.errors)[0])?.focus();
      return;
    }
    setPrepared(result);
  };

  const copyBrief = async () => {
    if (!prepared || copying) return;
    setCopying(true);
    setCopyMessage("");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(prepared.brief);
      setCopyMessage("Brief copied. Paste it into an email to send.");
    } catch {
      setCopyMessage("Copy is unavailable here. Select the brief below and copy it, or open the email draft.");
    } finally {
      setCopying(false);
    }
  };

  const errorProps = (name) => ({
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `inquiry-${name}-error` : undefined,
  });

  return (
    <section className="inquiry-page" aria-labelledby="inquiry-title">
      <header className="inquiry-intro">
        <h1 className="inquiry-title" id="inquiry-title" tabIndex={-1}>Start a<span>project.</span></h1>
        <div className="inquiry-intro-copy">
          <p>A campaign, a digital experience, an artwork. Tell us what you have in mind.</p>
          <p className="inquiry-intro-note">For brands, artists and cultural organisations.</p>
        </div>
      </header>

      <div className="inquiry-layout">
        <aside className="inquiry-aside" aria-label="About your project brief">
          <h2>A starting point.</h2>
          <p>Share what you want to make, where it will live and what you already have. An early idea is enough.</p>
          <p>You’ll review your brief here, then open an email draft to send it.</p>
          <div className="inquiry-direct">
            <span>Prefer to write directly?</span>
            <a className="inquiry-email-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="inquiry-profile-link" href="https://ranbensimon.com/" target="_blank" rel="noopener noreferrer">Ran Bensimon’s profile<ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </aside>

        <div className="inquiry-form-column">
          <form className="inquiry-form" ref={formRef} noValidate onSubmit={handleSubmit}>
            <p className="inquiry-form-note">Name, email and project idea are required.</p>
            {Object.keys(errors).length > 0 && (
              <div className="inquiry-error-summary" role="alert">Check the highlighted fields before preparing your brief.</div>
            )}

            <div className="inquiry-row inquiry-pair">
              <div className="inquiry-field">
                <label htmlFor="inquiry-name">Your name<span className="inquiry-required">Required</span></label>
                <input id="inquiry-name" name="name" type="text" autoComplete="name" maxLength={120} required value={values.name} onChange={changeField} {...errorProps("name")} />
                {errors.name && <p className="inquiry-field-error" id="inquiry-name-error">{errors.name}</p>}
              </div>
              <div className="inquiry-field">
                <label htmlFor="inquiry-email">Email address<span className="inquiry-required">Required</span></label>
                <input id="inquiry-email" name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} required value={values.email} onChange={changeField} {...errorProps("email")} />
                {errors.email && <p className="inquiry-field-error" id="inquiry-email-error">{errors.email}</p>}
              </div>
            </div>

            <div className="inquiry-row inquiry-field">
              <label htmlFor="inquiry-service">What would you like to make?</label>
              <select id="inquiry-service" name="service" value={values.service} onChange={changeField}>
                {SERVICES.map((service) => <option key={service.value} value={service.value}>{service.label}</option>)}
              </select>
            </div>

            <div className="inquiry-row inquiry-field">
              <label htmlFor="inquiry-idea">The project idea<span className="inquiry-required">Required</span></label>
              <p className="inquiry-field-hint" id="inquiry-idea-hint">What are you imagining? Who is it for, and what should it do?</p>
              <textarea id="inquiry-idea" name="idea" rows={5} maxLength={3000} required value={values.idea} onChange={changeField} {...errorProps("idea")} aria-describedby={errors.idea ? "inquiry-idea-hint inquiry-idea-error" : "inquiry-idea-hint"} />
              {errors.idea && <p className="inquiry-field-error" id="inquiry-idea-error">{errors.idea}</p>}
            </div>

            <div className="inquiry-row inquiry-pair">
              <div className="inquiry-field">
                <label htmlFor="inquiry-timing">Timing<span className="inquiry-optional">Optional</span></label>
                <input id="inquiry-timing" name="timing" type="text" maxLength={160} placeholder="A date, a season, or still open" value={values.timing} onChange={changeField} />
              </div>
              <div className="inquiry-field">
                <label htmlFor="inquiry-budget">Budget<span className="inquiry-optional">Optional</span></label>
                <input id="inquiry-budget" name="budget" type="text" maxLength={160} placeholder="A range, or let’s discuss" value={values.budget} onChange={changeField} />
              </div>
            </div>

            <div className="inquiry-row inquiry-field">
              <label htmlFor="inquiry-context">Links & context<span className="inquiry-optional">Optional</span></label>
              <p className="inquiry-field-hint" id="inquiry-context-hint">References, a website, existing material, or anything else we should know.</p>
              <textarea id="inquiry-context" name="context" rows={3} maxLength={1500} aria-describedby="inquiry-context-hint" value={values.context} onChange={changeField} />
            </div>

            <div className="inquiry-submit-row">
              <p>Prepare a brief to review before sending.</p>
              <button className="inquiry-prepare-button" type="submit">Prepare brief<ArrowRight size={20} aria-hidden="true" /></button>
            </div>
          </form>

          {prepared && (
            <section className="inquiry-result" aria-labelledby="inquiry-result-title">
              <div className="inquiry-result-heading">
                <h2 id="inquiry-result-title" ref={resultRef} tabIndex={-1}>Review your brief.</h2>
                <button className="inquiry-edit-button" type="button" onClick={() => { setPrepared(null); setCopyMessage(""); formRef.current?.elements.namedItem("name")?.focus(); }}>Edit brief</button>
              </div>
              <p className="inquiry-result-instruction">Open an email draft to send your brief.</p>
              <p className="inquiry-result-recipient">Addressed to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
              <div className="inquiry-result-actions">
                <a className="inquiry-draft-link" href={prepared.mailto}>Open email draft<ArrowUpRight size={20} aria-hidden="true" /></a>
                <button className="inquiry-copy-button" type="button" onClick={copyBrief} disabled={copying} aria-busy={copying}>{copying ? "Copying brief…" : "Copy brief"}<Copy size={18} aria-hidden="true" /></button>
              </div>
              <p className="inquiry-copy-status" role="status" aria-live="polite">{copyMessage}</p>
              <pre className="inquiry-brief" tabIndex={0} aria-label="Your prepared project brief">{prepared.brief}</pre>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
