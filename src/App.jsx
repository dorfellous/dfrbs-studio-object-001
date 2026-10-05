import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Pause, Play, Plus, SpeakerHigh, SpeakerSlash, X } from "@phosphor-icons/react";
import { asset, OBJECTS, PAGES, objectFromLocation } from "./catalog.js";
import { BagPanel } from "./BagPanel.jsx";
import { StudioPage } from "./StudioPage.jsx";
import { useDialogAccessibility } from "./useDialogAccessibility.js";
import { StudioWebsite } from "./StudioWebsite.jsx";

const pageUrl = (key) => key === "landing" ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}?object=${PAGES[key].code}`;
const motionAllowed = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function RouteLink({ page, onChange, children, ...props }) {
  return <a href={pageUrl(page)} {...props} onClick={(event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onChange(page);
  }}>{children}</a>;
}

function ProductImage({ objectKey, color, ...props }) {
  const item = OBJECTS[objectKey].colorways[color];
  return <img src={item.product} alt={`${item.label} Object ${OBJECTS[objectKey].code} ${OBJECTS[objectKey].name}`} {...props} onError={(event) => {
    if (item.fallback && !event.currentTarget.dataset.fallback) {
      event.currentTarget.dataset.fallback = "true";
      event.currentTarget.src = item.fallback;
    }
  }} />;
}

function Colorways({ objectKey, active, onChange }) {
  const colorways = OBJECTS[objectKey].colorways;
  const keys = Object.keys(colorways);
  return <fieldset className="colorways">
    <legend>COLORWAY <span>{colorways[active].number} / 03</span></legend>
    <div role="radiogroup" aria-label="Choose colorway" className="colorway-choices" onKeyDown={(event) => {
      const index = keys.indexOf(active);
      let next;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = keys[(index + 1) % keys.length];
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = keys[(index + keys.length - 1) % keys.length];
      if (event.key === "Home") next = keys[0];
      if (event.key === "End") next = keys[keys.length - 1];
      if (!next) return;
      event.preventDefault();
      onChange(next);
      event.currentTarget.querySelector(`[data-color="${next}"]`)?.focus();
    }}>
      {keys.map((key) => <button type="button" role="radio" aria-label={colorways[key].label} aria-checked={active === key} tabIndex={active === key ? 0 : -1} data-color={key} key={key} className={active === key ? "selected" : ""} onClick={() => onChange(key)}>
        <span className="colorway-thumb"><ProductImage objectKey={objectKey} color={key} alt="" aria-hidden="true" loading="eager" /></span>
        <span className="colorway-name">{colorways[key].label}{active === key && <Check size={12} aria-hidden="true" />}</span>
      </button>)}
    </div>
  </fieldset>;
}

function DetailViewer({ open, onClose, objectKey, color, view }) {
  const dialogRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  useDialogAccessibility(open, onClose, dialogRef);
  useEffect(() => { if (!open) setZoomed(false); }, [open]);
  if (!open) return null;
  const object = OBJECTS[objectKey];
  const selected = object.colorways[color];
  return <div className="detail-layer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className={`detail-panel ${zoomed ? "zoomed" : ""} detail-${objectKey}`} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="detail-title" tabIndex={-1}>
      <header><h2 id="detail-title">OBJECT {object.code} / {selected.label}</h2><button type="button" data-dialog-close onClick={onClose} aria-label="Close detail view"><X size={24} weight="light" /></button></header>
      <button className="detail-image" type="button" aria-label={zoomed ? "Fit image to view" : "Enlarge image"} aria-pressed={zoomed} onClick={() => setZoomed((value) => !value)}>
        {view === "form" ? <ProductImage objectKey={objectKey} color={color} /> : <img src={selected.campaign} alt={`${selected.label} ${object.name} in the campaign`} />}
      </button>
      <footer><span>{object.productType}</span><button type="button" onClick={() => setZoomed((value) => !value)}>{zoomed ? "FIT TO VIEW" : "ENLARGE"}<Plus size={15} /></button></footer>
    </section>
  </div>;
}

function Inspector({ objectKey, color, onColor, onAdd, added }) {
  const object = OBJECTS[objectKey];
  const selected = object.colorways[color];
  const [view, setView] = useState("form");
  const [detailOpen, setDetailOpen] = useState(false);
  useEffect(() => {
    if (!detailOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [detailOpen]);
  return <>
    <section className={`object-drawer drawer-${objectKey} view-${view}`} aria-labelledby="object-title" id="object">
      <div className="inspection-plate">
        <span className="ghost-code" aria-hidden="true">{object.code}</span>
        <div className="inspection-caption"><span>DFRBS STUDIO</span><span>AN EXPERIMENT IN FORM</span></div>
        <div className="inspection-image" id="inspection-pane" role="tabpanel" aria-labelledby={`view-${view}`} tabIndex={0} key={`${view}-${color}`}>
          {view === "form" ? <ProductImage objectKey={objectKey} color={color} className="specimen-image" loading="eager" fetchPriority="high" /> : <img className="worn-image" src={selected.campaign} alt={`${selected.label} ${object.name} in the DFRBS campaign`} fetchPriority="high" />}
        </div>
        <div className="inspection-toolbar">
          <div className="view-tabs" role="tablist" aria-label="Object view" onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const next = event.key === "Home" ? "form" : event.key === "End" ? "worn" : view === "form" ? "worn" : "form";
            setView(next);
            event.currentTarget.querySelector(`#view-${next}`)?.focus();
          }}>
            <button type="button" role="tab" id="view-form" aria-selected={view === "form"} aria-controls="inspection-pane" tabIndex={view === "form" ? 0 : -1} onClick={() => setView("form")}>FORM</button>
            <button type="button" role="tab" id="view-worn" aria-selected={view === "worn"} aria-controls="inspection-pane" tabIndex={view === "worn" ? 0 : -1} onClick={() => setView("worn")}>{objectKey === "eyewear" ? "WORN" : "IN HAND"}</button>
          </div>
          <button className="view-detail" type="button" onClick={() => setDetailOpen(true)}><Plus size={15} weight="light" /><span>VIEW DETAIL</span></button>
        </div>
      </div>
      <div className="order-slip">
        <div className="order-photograph"><img src={object.hero} alt={object.heroAlt} loading="eager" /><span>CAMPAIGN / {object.code}</span></div>
        <div className="order-content">
          <h1 id="object-title" tabIndex={-1}>{object.subtitle}</h1>
          <p className="object-identification">OBJECT {object.code} <span>/</span> {object.navLabel}</p>
          <p className="object-description">{object.productType}<br />{selected.description}</p>
          <Colorways objectKey={objectKey} active={color} onChange={onColor} />
          <div className="order-price"><strong>{object.price}</strong><span>{selected.label} / {selected.number}</span></div>
          <button className={`purchase-button ${added ? "added" : ""}`} type="button" onClick={onAdd}>
            <span>{added ? "ADDED TO BAG" : "ADD TO BAG"}</span>{added ? <Check size={23} weight="light" /> : <ArrowRight size={24} weight="light" />}
          </button>
          <span className="purchase-status" role="status" aria-live="polite">{added ? `${selected.label} Object ${object.code} added to your bag.` : ""}</span>
        </div>
      </div>
    </section>
    <DetailViewer open={detailOpen} onClose={() => setDetailOpen(false)} objectKey={objectKey} color={color} view={view} />
  </>;
}

function CabinetRows({ active, onChange }) {
  const order = active === "studio" ? ["eyewear", "lighter"] : [active === "eyewear" ? "lighter" : "eyewear", "studio"];
  return <nav className="cabinet-rows" aria-label="Explore the studio objects">
    {order.map((key) => <RouteLink page={key} onChange={onChange} className={`cabinet-row cabinet-${key}`} key={key}>
      <span className="cabinet-code">{PAGES[key].code}</span>
      <span className="cabinet-name">{PAGES[key].navLabel}<small>{key === "studio" ? "2026—2040 / RIGHT NOW" : OBJECTS[key].subtitle}</small></span>
      <span className="cabinet-art">{key === "studio" ? <img src={asset("studio-office-v1.png")} alt="" /> : <ProductImage objectKey={key} color="black" alt="" loading="lazy" />}</span>
      <span className="cabinet-note">{key === "studio" ? "FORM, MATERIAL\nAND PRESENCE." : "AN OBJECT\nIN THREE COLORWAYS."}</span>
      <ArrowRight className="cabinet-arrow" size={36} weight="thin" aria-hidden="true" />
    </RouteLink>)}
  </nav>;
}

function FilmChapter() {
  const filmRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playError, setPlayError] = useState(false);
  const [motionReduced, setMotionReduced] = useState(() => !motionAllowed());
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => { setMotionReduced(preference.matches); if (preference.matches) filmRef.current?.pause(); };
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, []);
  const toggle = () => {
    const film = filmRef.current;
    if (film.paused) film.play().then(() => setPlayError(false)).catch(() => { setPaused(true); setPlayError(true); });
    else film.pause();
  };
  return <section className="film-chapter" aria-labelledby="film-title" id="campaign">
    <div className="film-statement"><h2 id="film-title">WEAR THE<br /><span>MUTATION.</span></h2><div className="film-statement-foot"><p>AN EXPERIMENT IN FORM,<br />MATERIAL AND PRESENCE.</p><span>OBJECT 001<br />CAMPAIGN FILM</span></div></div>
    <div className="film-plate"><video ref={filmRef} src={asset("object-001-campaign-film.mp4")} poster={asset("object-001-campaign-film-poster.webp")} autoPlay={!motionReduced} loop muted={muted} playsInline preload="metadata" aria-label="Object 001 campaign film" onPause={() => setPaused(true)} onPlay={() => setPaused(false)} onLoadedMetadata={() => setPaused(Boolean(filmRef.current?.paused))} />
      <div className="film-toolbar"><button type="button" onClick={toggle} aria-label={paused ? "Play campaign film" : "Pause campaign film"}>{paused ? <Play size={17} weight="fill" /> : <Pause size={17} weight="fill" />}<span>{paused ? "PLAY" : "PAUSE"}</span></button><button type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Turn campaign film sound on" : "Mute campaign film"} aria-pressed={!muted}>{muted ? <SpeakerSlash size={18} /> : <SpeakerHigh size={18} />}<span>SOUND {muted ? "OFF" : "ON"}</span></button></div>
      {playError && <p className="film-error" role="status">Playback paused. Press play to try again.</p>}
    </div>
  </section>;
}

function CampaignChapter({ objectKey, color }) {
  const object = OBJECTS[objectKey];
  return <section className="campaign-chapter" aria-labelledby="campaign-title" id={objectKey === "lighter" ? "campaign" : undefined}>
    <div className="campaign-copy"><h2 id="campaign-title">{object.mutation.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{object.story.split("\n").map((line) => <span key={line}>{line}</span>)}</p><a href="#object" className="inline-link">BACK TO THE OBJECT <ArrowUpRight size={20} /></a></div>
    <figure className="campaign-photo"><img src={objectKey === "eyewear" ? asset("campaign-duo.jpg") : object.colorways[color].campaign} alt={objectKey === "eyewear" ? "Two models wearing DFRBS biomorphic eyewear" : `${color} Clipper sleeve held in the campaign`} loading="lazy" /><figcaption>DFRBS STUDIO <span>OBJECT {object.code} / CAMPAIGN</span></figcaption></figure>
  </section>;
}

export function App() {
  const [page, setPage] = useState(objectFromLocation);
  const objectKey = page === "landing" ? "eyewear" : page;
  const isStudio = page === "studio";
  const [colors, setColors] = useState({ eyewear: "heat", lighter: "black" });
  const [items, setItems] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [navigationIntent, setNavigationIntent] = useState(0);
  const bagCount = items.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    const onPop = () => { setPage(objectFromLocation()); setAdded(false); setBagOpen(false); setNavigationIntent((value) => value + 1); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    if (page !== "landing") document.title = isStudio ? "DFRBS Studio — Our studio" : `DFRBS Studio — Object ${OBJECTS[objectKey].code}`;
    if (navigationIntent) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.querySelector("main h1")?.focus({ preventScroll: true });
    }
  }, [page, navigationIntent, isStudio, objectKey]);
  useEffect(() => {
    if (!bagOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [bagOpen]);
  const changePage = (next) => {
    if (next !== page) window.history.pushState({}, "", pageUrl(next));
    setPage(next);
    setAdded(false);
    setBagOpen(false);
    setNavigationIntent((value) => value + 1);
  };
  const chooseColor = (color) => { setColors((value) => ({ ...value, [objectKey]: color })); setAdded(false); };
  const add = () => {
    const color = colors[objectKey];
    setItems((previous) => {
      const found = previous.some((item) => item.objectKey === objectKey && item.color === color);
      return found ? previous.map((item) => item.objectKey === objectKey && item.color === color ? { ...item, quantity: item.quantity + 1 } : item) : [...previous, { objectKey, color, quantity: 1 }];
    });
    setAdded(true);
  };
  if (page === "landing") return <StudioWebsite onOpenObject={changePage} />;
  return <div className={`site atelier page-${objectKey} color-${colors[objectKey] || "black"}`}>
    <a className="skip-link" href="#main">SKIP TO CONTENT</a>
    <header className="atelier-header">
      <RouteLink page="landing" onChange={changePage} className="atelier-brand" aria-label="DFRBS Studio opening page"><img src={asset("wordmark-white.png")} alt="DFRBS Studio" /></RouteLink>
      <nav className="atelier-nav" aria-label="Primary navigation">{Object.entries(PAGES).map(([key, item]) => <RouteLink page={key} onChange={changePage} key={key} aria-current={objectKey === key ? "page" : undefined}><span>{item.code}</span>{key === "studio" ? "STUDIO" : item.navLabel}</RouteLink>)}</nav>
      <button className="atelier-bag-trigger" type="button" onClick={() => setBagOpen(true)} aria-label={`Open bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`}><span>BAG</span> ({String(bagCount).padStart(2, "0")})</button>
    </header>
    <main id="main" tabIndex={-1}>
      {isStudio ? <StudioPage onChange={changePage} /> : <Inspector key={objectKey} objectKey={objectKey} color={colors[objectKey]} onColor={chooseColor} onAdd={add} added={added} />}
      <CabinetRows active={objectKey} onChange={changePage} />
      {!isStudio && <><div className="chapter-seam"><span>THE OBJECT IN THE WORLD</span><a href="#campaign" aria-label="Explore the campaign"><ArrowDown size={20} weight="light" /></a></div>{objectKey === "eyewear" && <FilmChapter />}<CampaignChapter objectKey={objectKey} color={colors[objectKey]} /></>}
    </main>
    <footer className="atelier-footer"><img src={asset("wordmark-white.png")} alt="DFRBS Studio" /><span>2026—2040 / RIGHT NOW</span><RouteLink page="studio" onChange={changePage}>OUR STUDIO <ArrowUpRight size={18} /></RouteLink><small>© DFRBS STUDIO</small></footer>
    <BagPanel open={bagOpen} onClose={() => setBagOpen(false)} items={items} onQuantityChange={(key, color, quantity) => setItems((previous) => previous.map((item) => item.objectKey === key && item.color === color ? { ...item, quantity: Math.max(1, quantity) } : item))} onRemove={(key, color) => setItems((previous) => previous.filter((item) => item.objectKey !== key || item.color !== color))} />
  </div>;
}
