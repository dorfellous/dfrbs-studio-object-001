import { ArrowRight } from "@phosphor-icons/react";
import { asset } from "./catalog.js";

const DISCIPLINES = [
  "MUSIC",
  "PERFORMANCE",
  "ENTERTAINMENT",
  "MANUFACTURING",
  "ART",
  "FASHION",
  "AI",
];

export function StudioPage({ onChange }) {
  return (
    <div className="studio-page">
      <section id="top" className="studio-dossier" aria-labelledby="studio-title">
        <div className="studio-statement">
          <span className="studio-ghost" aria-hidden="true">000</span>
          <div className="studio-title-block">
            <h1 id="studio-title">OUR STUDIO</h1>
            <p className="studio-time">2026—2040 / RIGHT NOW</p>
          </div>
          <div id="about" className="studio-manifesto">
            <h2>
              DFRBS STUDIO IS<br />
              HERE TO REALIZE THE FULL POTENTIAL OF 2026–2040 — <em>RIGHT NOW.</em>
            </h2>
            <p className="studio-manifesto-values">
              THE NEWEST. THE RAREST.<br />
              THE QUEEREST.<br />
              THE MOST CURRENT.
            </p>
          </div>
        </div>
        <figure className="studio-office-plate">
          <img
            src={asset("studio-office-v1.png")}
            alt="DFRBS Studio team working in the black and hot-pink production studio"
            fetchPriority="high"
          />
          <figcaption>
            <span>DFRBS STUDIO</span>
            <span>000 / RIGHT NOW</span>
          </figcaption>
        </figure>
      </section>

      <section id="campaign" className="studio-boardroom-chapter" aria-labelledby="studio-boardroom-title">
        <figure className="studio-boardroom-plate">
          <img
            src={asset("studio-boardroom-v1.png")}
            alt="Alien-forward DFRBS Studio team in a creative production meeting"
            loading="lazy"
          />
          <figcaption>2026—2040 / RIGHT NOW</figcaption>
        </figure>
        <div className="studio-boardroom-copy">
          <h2 id="studio-boardroom-title">A SHARP STUDIO CAPABLE OF EVERYTHING.</h2>
          <p>
            AT THE CUTTING EDGE OF MUSIC,<br />
            PERFORMANCE, ENTERTAINMENT,<br />
            MANUFACTURING, ART, FASHION AND AI.
          </p>
          <span className="studio-boardroom-mark" aria-hidden="true">DFRBS</span>
        </div>
      </section>

      <section className="studio-disciplines" aria-labelledby="studio-disciplines-title">
        <h2 id="studio-disciplines-title">DISCIPLINES</h2>
        <ul>
          {DISCIPLINES.map((discipline, index) => (
            <li key={discipline}>
              {discipline}
              {index < DISCIPLINES.length - 1 && <span aria-hidden="true"> / </span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="studio-close" aria-label="Explore DFRBS objects">
        <p>OPEN THE OBJECT DRAWERS</p>
        <div className="studio-object-links">
          <button className="studio-object-link" type="button" onClick={() => onChange("eyewear")}>
            <span><small>001</small>EYEWEAR</span>
            <ArrowRight size={27} weight="light" aria-hidden="true" />
          </button>
          <button className="studio-object-link" type="button" onClick={() => onChange("lighter")}>
            <span><small>002</small>CLIPPER SLEEVE</span>
            <ArrowRight size={27} weight="light" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
