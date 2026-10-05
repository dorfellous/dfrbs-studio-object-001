import { ArrowRight, ArrowUpRight, Plus } from "@phosphor-icons/react";
import { SERVICES } from "./studioServices.js";

export function ServicesPage({ onNavigate, initialService = "all" }) {
  return (
    <div className="services-page">
      <section className="services-intro" aria-labelledby="services-title">
        <h1 id="services-title" tabIndex={-1}>WHAT WE<br /><span>CAN MAKE.</span></h1>
        <div className="services-intro-copy">
          <p>Films, digital fashion, websites, production workflows and experiences for brands, artists and cultural organisations.</p>
          <p>Bring a brief, a reference or a question. We shape a scope around the work.</p>
          <button className="services-intro-action" type="button" onClick={() => onNavigate("contact")}>
            <span>START A CONVERSATION</span>
            <ArrowRight size={23} weight="light" aria-hidden="true" />
          </button>
        </div>
      </section>

      <div className="services-drawers">
        {SERVICES.map((service, index) => (
          <details className="services-drawer" name="dfrbs-services" key={service.key} open={initialService === "all" ? index === 0 : initialService === service.key}>
            <summary className="services-summary">
              <span className="services-number" aria-hidden="true">{service.number}</span>
              <h2 id={`services-${service.key}-title`}>{service.title}</h2>
              <span className="services-summary-copy">{service.summary}</span>
              <Plus className="services-toggle" size={29} weight="light" aria-hidden="true" />
            </summary>
            <div className="services-drawer-content" aria-labelledby={`services-${service.key}-title`}>
              <div className="services-main-scope">
                <p className="services-description">{service.description}</p>
                <div className="services-scope">
                  <h3>THE SCOPE</h3>
                  <ul>{service.scope.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="services-proof">
                  <h3>RELATED WORK BY THE FOUNDERS</h3>
                  <div>
                    {service.proofLinks.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                        <span>{link.label}</span>
                        <ArrowUpRight size={17} weight="light" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="services-delivery">
                <div>
                  <h3>WHAT YOU RECEIVE</h3>
                  <ul>{service.outputs.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3>A GOOD FIT FOR</h3>
                  <p>{service.fit}</p>
                </div>
                <div>
                  <h3>TO GET STARTED</h3>
                  <p>{service.inputs}</p>
                </div>
              </div>
              <div className="services-drawer-actions">
                <button className="services-project-action" type="button" onClick={() => onNavigate("contact", { service: service.key })}>
                  <span>START A PROJECT</span>
                  <ArrowRight size={24} weight="light" aria-hidden="true" />
                </button>
                <button className="services-work-action" type="button" onClick={() => onNavigate("work", { service: service.key })}>
                  <span>EXPLORE RELATED WORK</span>
                  <ArrowRight size={23} weight="light" aria-hidden="true" />
                </button>
              </div>
            </div>
          </details>
        ))}
      </div>

      <section className="services-close" aria-label="Discuss a project">
        <p>Not sure where your idea fits?<br /><span>That is a good place to begin.</span></p>
        <button type="button" onClick={() => onNavigate("contact")}>
          <span>LET’S TALK</span>
          <ArrowRight size={37} weight="light" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
