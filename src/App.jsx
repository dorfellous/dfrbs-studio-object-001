import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bag,
  CheckCircle,
  Cube,
  GlobeHemisphereEast,
  List,
  Stack,
  X,
} from "@phosphor-icons/react";

const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const COLORWAYS = {
  black: {
    label: "BLACK",
    number: "01",
    product: asset("product-black-four-lens-v3.png"),
    fallback: asset("black-product-original.jpg"),
    card: asset("product-black-four-lens-v3.png"),
    campaign: asset("campaign-mirror-black.jpg"),
    description: "Gloss black. Dense, reflective and deliberately severe.",
  },
  pearl: {
    label: "PEARL",
    number: "02",
    product: asset("product-pearl-four-lens-v3.png"),
    fallback: asset("product-pearl-white.jpg"),
    card: asset("product-pearl-four-lens-v3.png"),
    campaign: asset("campaign-pearl.jpg"),
    description: "A translucent pearl finish that reveals the printed topology.",
  },
  heat: {
    label: "HEAT",
    number: "03",
    product: asset("product-heat-four-lens-v3.png"),
    fallback: asset("product-heat-white.jpg"),
    card: asset("product-heat-four-lens-v3.png"),
    campaign: asset("campaign-heat.jpg"),
    description: "Safety orange shifting into saturated hot pink.",
  },
};

function ProductImage({ color, className = "", alt, loading = "lazy" }) {
  const colorway = COLORWAYS[color];
  return (
    <img
      className={className}
      src={colorway.product}
      alt={alt || `${colorway.label.toLowerCase()} Object 001 eyewear`}
      loading={loading}
      onError={(event) => {
        if (event.currentTarget.src.endsWith(colorway.fallback)) return;
        event.currentTarget.src = colorway.fallback;
      }}
    />
  );
}

function ColorwayControl({ active, onChange, compact = false }) {
  return (
    <div className={`colorway-control ${compact ? "is-compact" : ""}`}>
      {!compact && <span className="eyebrow">CHOOSE COLORWAY</span>}
      <div className="colorway-options" role="radiogroup" aria-label="Choose colorway">
        {Object.entries(COLORWAYS).map(([key, item]) => (
          <button
            key={key}
            className={active === key ? "is-active" : ""}
            type="button"
            role="radio"
            aria-checked={active === key}
            onClick={() => onChange(key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function App() {
  const [activeColor, setActiveColor] = useState("heat");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [bagCount, setBagCount] = useState(0);
  const [added, setAdded] = useState(false);

  const selected = useMemo(() => COLORWAYS[activeColor], [activeColor]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, mobileNavOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNavOpen(false);
  };

  const chooseColor = (color, shouldScroll = false) => {
    setActiveColor(color);
    setAdded(false);
    if (shouldScroll) requestAnimationFrame(() => scrollTo("object"));
  };

  const addToBag = () => {
    setBagCount((count) => count + 1);
    setAdded(true);
  };

  return (
    <main className={`site color-${activeColor}`}>
      <header className="topbar">
        <button className="brand-button" type="button" onClick={() => scrollTo("top")} aria-label="Back to top">
          <img src={asset("wordmark-white.png")} alt="DFRBS Studio" />
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => scrollTo("collection")}>COLLECTION</button>
          <button type="button" onClick={() => scrollTo("campaign")}>CAMPAIGN</button>
          <button type="button" onClick={() => scrollTo("about")}>ABOUT</button>
        </nav>

        <button className="bag-button" type="button" onClick={() => setDrawerOpen(true)} aria-label={`Open bag, ${bagCount} items`}>
          <Bag size={24} weight="light" />
          {bagCount > 0 && <span>{bagCount}</span>}
        </button>

        <button className="menu-button" type="button" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
          <List size={27} weight="light" />
        </button>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src={asset("campaign-mirror-black.jpg")} alt="Model wearing black Object 001 eyewear beside a chrome mirror" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow">LIQUID MONOLITH</span>
          <h1 id="hero-title">OBJECT 001</h1>
          <p>BIOMORPHIC EYEWEAR 3D PRINTED IN LIMITED NUMBERS.<br />AN EXPERIMENT IN FORM, MATERIAL AND PRESENCE.</p>
          <button className="outline-cta" type="button" onClick={() => scrollTo("object")}>
            <span>EXPLORE THE OBJECT</span>
            <ArrowRight size={19} weight="light" />
          </button>
        </div>
        <ColorwayControl active={activeColor} onChange={chooseColor} />
      </section>

      <section id="campaign" className="campaign-stage" aria-label={`${selected.label} campaign`}>
        <div className="campaign-frame">
          <img src={selected.campaign} alt={`Object 001 ${selected.label.toLowerCase()} campaign`} />
        </div>
        <ProductImage color={activeColor} className="giant-product" loading="eager" />
      </section>

      <section id="object" className="object-section" aria-labelledby="object-title">
        <div className="object-copy">
          <span className="eyebrow accent-copy">{selected.label}</span>
          <h2 id="object-title">WEAR THE<br />MUTATION</h2>
          <p>OBJECT 001 — A BIOMORPHIC SHIFT<br />FOR THOSE WHO MOVE DIFFERENT.</p>
          <button className="text-link" type="button" onClick={() => setDrawerOpen(true)}>
            <span>SHOP NOW</span>
            <ArrowRight size={18} weight="light" />
          </button>
        </div>

        <div className="object-product-wrap">
          <ProductImage color={activeColor} className="object-product" />
        </div>

        <div className="object-facts" id="about">
          <span className="eyebrow">OBJECT 001 — {selected.label}</span>
          <p>{selected.description}<br />Engineered for presence and performance.</p>
          <ul>
            <li>
              <GlobeHemisphereEast size={31} weight="thin" />
              <span><strong>3D PRINTED</strong><small>BIOMORPHIC DESIGN</small></span>
            </li>
            <li>
              <Stack size={31} weight="thin" />
              <span><strong>HAND FINISHED</strong><small>TACTILE SURFACE</small></span>
            </li>
            <li>
              <Cube size={31} weight="thin" />
              <span><strong>LIMITED RUN</strong><small>MADE IN SMALL NUMBERS</small></span>
            </li>
          </ul>
        </div>
      </section>

      <section id="collection" className="collection" aria-label="Object 001 color collection">
        {Object.entries(COLORWAYS).map(([key, item]) => (
          <button
            key={key}
            className={`collection-card colorway-${key} ${activeColor === key ? "is-active" : ""}`}
            type="button"
            onClick={() => chooseColor(key, true)}
          >
            <img src={item.card} alt={`${item.label.toLowerCase()} Object 001 eyewear`} />
            <span className="collection-card-meta">
              <span>{item.label}</span>
              <ArrowRight size={18} weight="light" />
            </span>
          </button>
        ))}
      </section>

      <footer className="footer">
        <img src={asset("wordmark-white.png")} alt="DFRBS Studio" />
        <nav aria-label="Footer navigation">
          <button type="button" onClick={() => scrollTo("top")}>STUDIO</button>
          <button type="button" onClick={() => scrollTo("object")}>MATERIALS</button>
          <button type="button" onClick={() => scrollTo("about")}>CARE</button>
          <a href="mailto:studio@dfrbs.com">CONTACT</a>
        </nav>
        <span>© DFRBS STUDIO, ALL RIGHTS RESERVED.</span>
      </footer>

      {mobileNavOpen && (
        <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button className="close-button" type="button" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
            <X size={28} weight="light" />
          </button>
          <img src={asset("wordmark-white.png")} alt="DFRBS Studio" />
          <nav>
            <button type="button" onClick={() => scrollTo("collection")}>COLLECTION</button>
            <button type="button" onClick={() => scrollTo("campaign")}>CAMPAIGN</button>
            <button type="button" onClick={() => scrollTo("about")}>ABOUT</button>
          </nav>
        </div>
      )}

      {drawerOpen && (
        <div className="drawer-layer" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setDrawerOpen(false);
        }}>
          <aside className="product-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
            <button className="close-button" type="button" onClick={() => setDrawerOpen(false)} aria-label="Close product panel">
              <X size={27} weight="light" />
            </button>
            <span className="eyebrow">OBJECT 001 / {selected.number}</span>
            <h2 id="drawer-title">{selected.label}</h2>
            <div className="drawer-product">
              <ProductImage color={activeColor} />
            </div>
            <ColorwayControl active={activeColor} onChange={chooseColor} compact />
            <p>{selected.description}</p>
            <div className="availability">
              <span>LIMITED RELEASE</span>
              <span>PRICE ON REQUEST</span>
            </div>
            <button className={`add-button ${added ? "is-added" : ""}`} type="button" onClick={addToBag}>
              {added ? <><CheckCircle size={20} weight="fill" /> ADDED TO BAG</> : <>ADD TO BAG <ArrowRight size={19} /></>}
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
