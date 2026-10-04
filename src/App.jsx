import { useEffect, useMemo, useRef, useState } from "react";
import { useDialogAccessibility } from "./useDialogAccessibility.js";
import {
  ArrowRight,
  ArrowDown,
  Bag,
  CheckCircle,
  Cube,
  GlobeHemisphereEast,
  List,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
  Stack,
  X,
} from "@phosphor-icons/react";

const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const EYEWEAR_COLORWAYS = {
  black: {
    label: "BLACK",
    number: "01",
    product: asset("product-black-four-lens-v3.png"),
    fallback: asset("black-product-original.jpg"),
    campaign: asset("campaign-mirror-black.jpg"),
    description: "Gloss black. Dense, reflective and deliberately severe.",
  },
  pearl: {
    label: "PEARL",
    number: "02",
    product: asset("product-pearl-four-lens-v3.png"),
    fallback: asset("product-pearl-white.jpg"),
    campaign: asset("campaign-pearl.jpg"),
    description: "A translucent pearl finish that reveals the printed topology.",
  },
  heat: {
    label: "HEAT",
    number: "03",
    product: asset("product-heat-four-lens-v3.png"),
    fallback: asset("product-heat-white.jpg"),
    campaign: asset("campaign-heat.jpg"),
    description: "Safety orange shifting into saturated hot pink.",
  },
};

const LIGHTER_COLORWAYS = {
  black: {
    label: "BLACK",
    number: "01",
    product: asset("lighter-black.webp"),
    campaign: asset("lighter-campaign-black.webp"),
    description: "Smoke-black PETG with four polished organic lenses.",
  },
  pearl: {
    label: "PEARL",
    number: "02",
    product: asset("lighter-pearl.webp"),
    campaign: asset("lighter-campaign-pearl.webp"),
    description: "Icy translucent PETG with pale blue convex lenses.",
  },
  heat: {
    label: "HEAT",
    number: "03",
    product: asset("lighter-heat.webp"),
    campaign: asset("lighter-campaign-heat.webp"),
    description: "Orange dissolving into hot pink around four warm lenses.",
  },
};

const OBJECTS = {
  eyewear: {
    code: "001",
    navLabel: "EYEWEAR",
    title: "OBJECT 001",
    eyebrow: "LIQUID MONOLITH",
    hero: asset("campaign-mirror-black.jpg"),
    heroAlt: "Model wearing black Object 001 eyewear beside a chrome mirror",
    intro: "BIOMORPHIC EYEWEAR 3D PRINTED IN LIMITED NUMBERS.",
    subintro: "AN EXPERIMENT IN FORM, MATERIAL AND PRESENCE.",
    mutation: "WEAR THE\nMUTATION",
    story: "OBJECT 001 — A BIOMORPHIC SHIFT\nFOR THOSE WHO MOVE DIFFERENT.",
    productType: "3D-PRINTED 4-LENS ORGANIC EYEWEAR.",
    price: "$1,500",
    colorways: EYEWEAR_COLORWAYS,
  },
  lighter: {
    code: "002",
    navLabel: "CLIPPER SLEEVE",
    title: "OBJECT 002",
    eyebrow: "LIQUID IGNITION",
    hero: asset("lighter-hero-mirror.webp"),
    heroMobile: asset("lighter-hero-mobile.webp"),
    heroAlt: "Black, pearl and heat Object 002 Clipper sleeves on a liquid chrome mirror",
    intro: "3D-PRINTED ORGANIC SLEEVE FOR THE ICONIC CLIPPER LIGHTER.",
    subintro: "A POCKET-SCALE EXPERIMENT IN FORM, GRIP AND COLOR.",
    mutation: "HOLD THE\nMUTATION",
    story: "OBJECT 002 — A BIOMORPHIC CLIPPER SLEEVE\nFOR OBJECTS THAT MOVE WITH YOU.",
    productType: "3D PRINTED LIGHTER CASE.",
    price: "$420",
    colorways: LIGHTER_COLORWAYS,
  },
};

const PAGES = {
  studio: { code: "000", navLabel: "OUR STUDIO" },
  eyewear: OBJECTS.eyewear,
  lighter: OBJECTS.lighter,
};

function objectFromLocation() {
  const code = new URLSearchParams(window.location.search).get("object");
  if (code === "000") return "studio";
  if (code === "001") return "eyewear";
  if (code === "002") return "lighter";
  return "landing";
}

function LandingPage({ onChange }) {
  return (
    <main className="landing" aria-label="DFRBS Studio opening page">
      <video
        className="landing-film"
        src={asset("object-001-campaign-film.mp4")}
        poster={asset("object-001-campaign-film-poster.webp")}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="DFRBS Studio campaign film"
      />
      <div className="landing-shade" aria-hidden="true" />
      <div className="landing-logo">
        <img src={asset("wordmark-white.png")} alt="DFRBS Studio" />
      </div>
      <nav className="landing-nav" aria-label="Enter DFRBS Studio">
        {Object.entries(PAGES).map(([key, page], index) => (
          <button key={key} type="button" style={{ "--delay": `${1.05 + index * 0.18}s` }} onClick={() => onChange(key)}>
            <span>{page.code}</span> {page.navLabel}
          </button>
        ))}
      </nav>
      <span className="landing-year">2026—2040 / RIGHT NOW</span>
    </main>
  );
}

function ProductImage({ objectKey, color, className = "", alt, loading = "lazy" }) {
  const colorway = OBJECTS[objectKey].colorways[color];
  return (
    <img
      className={className}
      src={colorway.product}
      alt={alt || `${colorway.label.toLowerCase()} ${OBJECTS[objectKey].title}`}
      loading={loading}
      onError={(event) => {
        if (!colorway.fallback || event.currentTarget.src.endsWith(colorway.fallback)) return;
        event.currentTarget.src = colorway.fallback;
      }}
    />
  );
}

function ColorwayControl({ colorways, active, onChange, compact = false }) {
  const keys = Object.keys(colorways);
  const handleKeyDown = (event) => {
    const index = keys.indexOf(active);
    let next;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = keys[(index + 1) % keys.length];
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = keys[(index - 1 + keys.length) % keys.length];
    else if (event.key === "Home") next = keys[0];
    else if (event.key === "End") next = keys[keys.length - 1];
    if (!next) return;
    event.preventDefault();
    onChange(next);
    event.currentTarget.querySelector(`[data-color="${next}"]`)?.focus();
  };
  return (
    <div className={`colorway-control ${compact ? "is-compact" : ""}`}>
      {!compact && <span className="eyebrow">CHOOSE COLORWAY</span>}
      <div className="colorway-options" role="radiogroup" aria-label="Choose colorway" onKeyDown={handleKeyDown}>
        {Object.entries(colorways).map(([key, item]) => (
          <button
            key={key}
            className={active === key ? "is-active" : ""}
            type="button"
            role="radio"
            aria-label={item.label}
            aria-checked={active === key}
            tabIndex={active === key ? 0 : -1}
            data-color={key}
            onClick={() => onChange(key)}
          >
            <span className={`color-swatch swatch-${key}`} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ObjectSwitcher({ activeObject, onChange, mobile = false }) {
  return (
    <div className={`object-switcher ${mobile ? "is-mobile" : ""}`} aria-label="Choose object">
      {Object.entries(PAGES).map(([key, item]) => (
        <button
          key={key}
          type="button"
          className={activeObject === key ? "is-active" : ""}
          aria-current={activeObject === key ? "page" : undefined}
          onClick={() => onChange(key)}
        >
          <span>{item.code}</span> {item.navLabel}
        </button>
      ))}
    </div>
  );
}

function ObjectIndex({ activeObject, onChange }) {
  return (
    <section id="objects" className="object-index" aria-labelledby="object-index-title">
      <span id="object-index-title" className="eyebrow">OBJECT INDEX</span>
      <div className="object-index-grid">
        <button
          type="button"
          className={`object-index-card eyewear-index ${activeObject === "eyewear" ? "is-active" : ""}`}
          onClick={() => onChange("eyewear")}
        >
          <img src={asset("product-black-four-lens-v3.png")} alt="Object 001 black four-lens eyewear" />
          <span className="index-copy"><small>OBJECT 001</small><strong>EYEWEAR</strong></span>
          <ArrowRight size={22} weight="light" />
        </button>
        <button
          type="button"
          className={`object-index-card lighter-index ${activeObject === "lighter" ? "is-active" : ""}`}
          onClick={() => onChange("lighter")}
        >
          <img src={asset("lighter-hero-mirror.webp")} alt="Object 002 black, pearl and heat Clipper sleeves" />
          <span className="index-copy"><small>OBJECT 002</small><strong>CLIPPER SLEEVE</strong></span>
          <ArrowRight size={22} weight="light" />
        </button>
        <button
          type="button"
          className={`object-index-card studio-index ${activeObject === "studio" ? "is-active" : ""}`}
          onClick={() => onChange("studio")}
        >
          <img src={asset("studio-office-v1.png")} alt="DFRBS Studio workspace" />
          <span className="index-copy"><small>OBJECT 000</small><strong>OUR STUDIO</strong></span>
          <ArrowRight size={22} weight="light" />
        </button>
      </div>
    </section>
  );
}

function StudioPage({ activeObject, onChange }) {
  const disciplines = ["MUSIC", "PERFORMANCE", "ENTERTAINMENT", "MANUFACTURING", "ART", "FASHION", "AI"];

  return (
    <>
      <section id="top" className="studio-hero" aria-labelledby="studio-title">
        <img src={asset("studio-office-v1.png")} alt="DFRBS Studio team working in the black and hot-pink production studio" />
        <div className="studio-hero-shade" aria-hidden="true" />
        <div className="studio-hero-copy">
          <h1 id="studio-title"><span>OUR</span><span>STUDIO</span></h1>
          <p>2026—2040 / RIGHT NOW</p>
        </div>
      </section>

      <section id="about" className="studio-manifesto" aria-labelledby="manifesto-title">
        <span className="eyebrow">DFRBS STUDIO IS</span>
        <h2 id="manifesto-title">HERE TO REALIZE THE FULL POTENTIAL<br />OF 2026–2040 — <em>RIGHT NOW.</em></h2>
        <div className="manifesto-grid">
          <p>THE NEWEST. THE RAREST.<br />THE QUEEREST.<br />THE MOST CURRENT.</p>
          <p>AT THE CUTTING EDGE OF MUSIC,<br />PERFORMANCE, ENTERTAINMENT,<br />MANUFACTURING, ART, FASHION AND AI.</p>
          <p>A SHARP STUDIO<br />CAPABLE OF EVERYTHING.</p>
        </div>
      </section>

      <section id="campaign" className="studio-boardroom" aria-label="DFRBS Studio creative production meeting">
        <img src={asset("studio-boardroom-v1.png")} alt="Alien-forward DFRBS Studio team in a creative production meeting" />
      </section>

      <section className="studio-disciplines" aria-labelledby="disciplines-title">
        <span id="disciplines-title" className="eyebrow">DISCIPLINES</span>
        <div>{disciplines.map((item, index) => <span key={item}>{item}{index < disciplines.length - 1 && <i>/</i>}</span>)}</div>
      </section>

      <ObjectIndex activeObject={activeObject} onChange={onChange} />
    </>
  );
}

export function App() {
  const [activeObject, setActiveObject] = useState(objectFromLocation);
  const [activeColors, setActiveColors] = useState({ eyewear: "heat", lighter: "heat" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [bagCount, setBagCount] = useState(0);
  const [added, setAdded] = useState(false);
  const [filmMuted, setFilmMuted] = useState(true);
  const [filmPaused, setFilmPaused] = useState(false);
  const drawerRef = useRef(null);
  const menuRef = useRef(null);
  const filmRef = useRef(null);

  useDialogAccessibility(drawerOpen, () => setDrawerOpen(false), drawerRef);
  useDialogAccessibility(mobileNavOpen, () => setMobileNavOpen(false), menuRef);

  const isLanding = activeObject === "landing";
  const isStudio = activeObject === "studio";
  const object = isLanding || isStudio ? null : OBJECTS[activeObject];
  const activeColor = isLanding ? "landing" : isStudio ? "studio" : activeColors[activeObject];
  const selected = useMemo(() => object?.colorways[activeColor] || null, [object, activeColor]);
  const isRequest = object?.price === "PRICE ON REQUEST";

  useEffect(() => {
    const handlePopState = () => {
      setActiveObject(objectFromLocation());
      setDrawerOpen(false);
      setMobileNavOpen(false);
      setAdded(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || mobileNavOpen ? "hidden" : "";
    document.title = isLanding ? "DFRBS STUDIO" : isStudio ? "OUR STUDIO — DFRBS STUDIO" : `${object.title} — DFRBS STUDIO`;
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, mobileNavOpen, isLanding, isStudio, object?.title]);

  useEffect(() => {
    setFilmPaused(false);
  }, [activeObject]);

  const scrollBehavior = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    setMobileNavOpen(false);
  };

  const changeObject = (nextObject) => {
    if (nextObject === activeObject) {
      scrollTo("top");
      return;
    }
    const url = new URL(window.location.href);
    if (nextObject === "landing") url.searchParams.delete("object");
    else if (nextObject === "studio") url.searchParams.set("object", "000");
    else if (nextObject === "eyewear") url.searchParams.set("object", "001");
    else if (nextObject === "lighter") url.searchParams.set("object", "002");
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setActiveObject(nextObject);
    setAdded(false);
    setDrawerOpen(false);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const chooseColor = (color, shouldScroll = false) => {
    setActiveColors((colors) => ({ ...colors, [activeObject]: color }));
    setAdded(false);
    if (shouldScroll) requestAnimationFrame(() => scrollTo("object"));
  };

  const addToBag = () => {
    setBagCount((count) => count + 1);
    setAdded(true);
  };

  const toggleFilm = () => {
    const film = filmRef.current;
    if (!film) return;
    if (film.paused) film.play().catch(() => setFilmPaused(true));
    else film.pause();
  };

  if (isLanding) return <LandingPage onChange={changeObject} />;

  return (
    <main className={`site object-${activeObject} color-${activeColor}`}>
      <a className="skip-link" href={isStudio ? "#about" : "#object"}>SKIP TO {isStudio ? "STUDIO" : "OBJECT"}</a>
      <header className="topbar">
        <button className="brand-button" type="button" onClick={() => changeObject("landing")} aria-label="Back to opening page">
          <img src={asset("wordmark-white.png")} alt="DFRBS Studio" />
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => scrollTo("objects")}>OBJECTS</button>
          <button type="button" onClick={() => scrollTo("campaign")}>CAMPAIGN</button>
          <button type="button" onClick={() => scrollTo("about")}>ABOUT</button>
        </nav>

        <button className="bag-button" type="button" onClick={() => !isStudio && setDrawerOpen(true)} aria-label={`Open bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`}>
          <Bag size={24} weight="light" />
          {bagCount > 0 && <span>{bagCount}</span>}
        </button>

        <button className="menu-button" type="button" onClick={() => setMobileNavOpen(true)} aria-label="Open menu" aria-expanded={mobileNavOpen} aria-controls="navigation-menu">
          <List size={27} weight="light" />
        </button>

        <ObjectSwitcher activeObject={activeObject} onChange={changeObject} />
      </header>

      {isStudio ? <StudioPage activeObject={activeObject} onChange={changeObject} /> : <>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src={object.hero} alt={object.heroAlt} fetchPriority="high" />
        {object.heroMobile && <img className="hero-image lighter-mobile-hero" src={object.heroMobile} alt="" aria-hidden="true" />}
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <h1 id="hero-title">OBJECT <span>{object.code}</span></h1>
          <span className="hero-concept">{object.eyebrow}</span>
          <p>{object.intro}<br />{object.subintro}</p>
          <button className="outline-cta" type="button" onClick={() => scrollTo("campaign")}>
            <span>EXPLORE THE OBJECT</span>
            <ArrowRight size={19} weight="light" />
          </button>
        </div>
        <div className="hero-dock">
          <ColorwayControl colorways={object.colorways} active={activeColor} onChange={chooseColor} />
          <button className="hero-scroll" type="button" onClick={() => scrollTo("campaign")} aria-label="Scroll to campaign">
            <span>SCROLL TO EXPLORE</span><ArrowDown size={20} weight="light" />
          </button>
        </div>
      </section>

      {activeObject === "eyewear" ? (
        <>
          <section id="campaign" className="campaign-stage" aria-label={`${selected.label} eyewear campaign`}>
            <div className="campaign-heading">
              <h2>{selected.label}</h2>
              <span>{selected.number} / 03 COLORWAYS</span>
            </div>
            <div className="campaign-frame" key={`campaign-${activeColor}`}>
              <img src={selected.campaign} alt={`Object 001 ${selected.label.toLowerCase()} campaign`} loading="lazy" />
            </div>
            <ProductImage key={`specimen-${activeColor}`} objectKey="eyewear" color={activeColor} className="giant-product" loading="eager" />
            <div className="campaign-caption">
              <div className="campaign-colorways">
                <ColorwayControl colorways={object.colorways} active={activeColor} onChange={chooseColor} compact />
                <p>{selected.description}</p>
              </div>
              <button className="text-link" type="button" onClick={() => scrollTo("object")}><span>DISCOVER THE FORM</span><ArrowRight size={18} weight="light" /></button>
            </div>
          </section>
          <section className="eyewear-film" aria-labelledby="film-title">
            <div className="eyewear-film-copy">
              <h2 id="film-title"><span>FORM</span><span>IN</span><span>MOTION</span></h2>
              <span className="film-caption">CAMPAIGN FILM / 001</span>
            </div>
            <div className="eyewear-film-player">
              <video
                ref={filmRef}
                src={asset("object-001-campaign-film.mp4")}
                poster={asset("object-001-campaign-film-poster.webp")}
                autoPlay
                loop
                muted={filmMuted}
                playsInline
                preload="metadata"
                aria-label="OBJECT 001 campaign film"
                onPause={() => setFilmPaused(true)}
                onPlay={() => setFilmPaused(false)}
              />
              <div className="film-controls">
              <button className="film-play" type="button" onClick={toggleFilm} aria-label={filmPaused ? "Play campaign film" : "Pause campaign film"}>
                {filmPaused ? <Play size={18} weight="light" /> : <Pause size={18} weight="light" />}
              </button>
              <button className="film-sound" type="button" onClick={() => setFilmMuted((muted) => !muted)} aria-label={filmMuted ? "Turn campaign film sound on" : "Mute campaign film"} aria-pressed={!filmMuted}>
                {filmMuted ? <SpeakerSlash size={18} weight="light" /> : <SpeakerHigh size={18} weight="light" />}
                <span>{filmMuted ? "SOUND OFF" : "SOUND ON"}</span>
              </button>
              </div>
            </div>
            <div className="eyewear-film-meta">
              <span>OBJECT 001</span>
              <p>WORN AS A SECOND SURFACE.<br />A STUDY IN FORM, BODY AND REFLECTION.</p>
              <small>00:30 / CAMPAIGN 2026</small>
            </div>
          </section>
        </>
      ) : (
        <section id="campaign" className="lighter-campaign" aria-label={`${selected.label} Clipper sleeve campaign`}>
          <div className="lighter-campaign-copy">
            <span className="eyebrow accent-copy">{selected.label}</span>
            <h2>{object.mutation.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
            <p>{object.story.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
            <button className="text-link" type="button" onClick={() => setDrawerOpen(true)}>
              <span>SHOP NOW</span>
              <ArrowRight size={18} weight="light" />
            </button>
          </div>
          <div className="lighter-campaign-frame">
            <img src={selected.campaign} alt={`Hands presenting the ${selected.label.toLowerCase()} Object 002 Clipper sleeve`} />
          </div>
          <ProductImage objectKey="lighter" color={activeColor} className="lighter-campaign-product" loading="eager" />
        </section>
      )}

      <section id="object" className={`object-section ${activeObject === "lighter" ? "lighter-object-section" : ""}`} aria-labelledby="object-title">
        <div className="object-copy">
          <h2 id="object-title">{object.mutation.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <span className="object-color-label">{selected.label} / {selected.number}</span>
          <p>{object.story.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
          <button className="text-link" type="button" onClick={() => setDrawerOpen(true)}>
            <span>SHOP NOW</span>
            <ArrowRight size={18} weight="light" />
          </button>
        </div>

        <div className="object-product-wrap">
          <ProductImage objectKey={activeObject} color={activeColor} className="object-product" />
        </div>

        <div className="object-facts" id="about">
          <span className="eyebrow">{object.title} — {selected.label}</span>
          <p>{selected.description}<br />Engineered for presence and performance.</p>
          <ul>
            <li>
              <GlobeHemisphereEast size={31} weight="thin" />
              <span><strong>3D PRINTED</strong><small>{activeObject === "lighter" ? "ORGANIC PETG SHELL" : "BIOMORPHIC DESIGN"}</small></span>
            </li>
            <li>
              <Stack size={31} weight="thin" />
              <span><strong>{activeObject === "lighter" ? "CLIPPER FIT" : "HAND FINISHED"}</strong><small>{activeObject === "lighter" ? "REMOVABLE SLEEVE" : "TACTILE SURFACE"}</small></span>
            </li>
            <li>
              <Cube size={31} weight="thin" />
              <span><strong>HAND FINISHED</strong><small>MADE IN SMALL NUMBERS</small></span>
            </li>
          </ul>
        </div>
      </section>

      <section id="collection" className="collection" aria-label={`${object.title} color collection`}>
        {Object.entries(object.colorways).map(([key, item]) => (
          <button
            key={key}
            className={`collection-card colorway-${key} ${activeColor === key ? "is-active" : ""}`}
            type="button"
            aria-pressed={activeColor === key}
            onClick={() => chooseColor(key, true)}
          >
            <img src={item.product} alt={`${item.label.toLowerCase()} ${object.title}`} />
            <span className="collection-card-meta">
              <span><small>{item.number}</small>{item.label}</span>
              {activeColor === key && <span className="collection-selected">SELECTED</span>}
              <ArrowRight size={18} weight="light" />
            </span>
          </button>
        ))}
      </section>

      <ObjectIndex activeObject={activeObject} onChange={changeObject} />
      </>}

      <footer className="footer">
        <img src={asset("wordmark-white.png")} alt="DFRBS Studio" />
        <nav aria-label="Footer navigation">
          <button type="button" onClick={() => scrollTo("top")}>STUDIO</button>
          <button type="button" onClick={() => scrollTo(isStudio ? "campaign" : "object")}>{isStudio ? "WORK" : "MATERIALS"}</button>
          <button type="button" onClick={() => scrollTo("about")}>CARE</button>
          <a href="mailto:studio@dfrbs.com">CONTACT</a>
        </nav>
        <span>© DFRBS STUDIO, ALL RIGHTS RESERVED.</span>
      </footer>

      {mobileNavOpen && (
        <div ref={menuRef} id="navigation-menu" className="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation menu" tabIndex={-1}>
          <button className="close-button" type="button" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
            <X size={28} weight="light" />
          </button>
          <img src={asset("wordmark-white.png")} alt="DFRBS Studio" />
          <ObjectSwitcher activeObject={activeObject} onChange={changeObject} mobile />
          <nav>
            <button type="button" onClick={() => scrollTo("campaign")}>CAMPAIGN</button>
            <button type="button" onClick={() => scrollTo("about")}>ABOUT</button>
          </nav>
        </div>
      )}

      {drawerOpen && object && selected && (
        <div className="drawer-layer" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setDrawerOpen(false);
        }}>
          <aside ref={drawerRef} className="product-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabIndex={-1}>
            <button className="close-button" type="button" onClick={() => setDrawerOpen(false)} aria-label="Close product panel">
              <X size={27} weight="light" />
            </button>
            <span className="eyebrow">{object.title} / {selected.number}</span>
            <h2 id="drawer-title">{selected.label}</h2>
            <div className={`drawer-product ${activeObject === "lighter" ? "is-lighter" : ""}`}>
              <ProductImage objectKey={activeObject} color={activeColor} />
            </div>
            <ColorwayControl colorways={object.colorways} active={activeColor} onChange={chooseColor} compact />
            <p className="drawer-description">
              <strong>{object.productType}</strong>
              <span>{selected.description}</span>
            </p>
            <div className="availability">
              <span>LIMITED RELEASE</span>
              <span className={`product-price ${isRequest ? "is-request" : ""}`}>{object.price}</span>
            </div>
            <button className={`add-button ${added ? "is-added" : ""}`} type="button" onClick={addToBag}>
              {added ? <><CheckCircle size={20} weight="fill" /> {isRequest ? "REQUEST SAVED" : "ADDED TO BAG"}</> : <>{isRequest ? "REQUEST AVAILABILITY" : "ADD TO BAG"} <ArrowRight size={19} /></>}
            </button>
            <span className="bag-feedback" role="status" aria-live="polite">{added ? `${selected.label} ${object.title} added. ${bagCount} ${bagCount === 1 ? "item" : "items"} in your bag.` : ""}</span>
          </aside>
        </div>
      )}
    </main>
  );
}
