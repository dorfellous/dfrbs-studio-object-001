import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Pause, Play, X } from "@phosphor-icons/react";
import { asset } from "./catalog.js";
import { PROJECTS, FOUNDERS } from "./studioProjects.js";
import { SERVICES } from "./studioServices.js";
import { ServicesPage } from "./ServicesPage.jsx";
import { InquiryPage } from "./InquiryPage.jsx";

function readRoute() {
  const params = new URLSearchParams(window.location.search);
  return { page: params.get("project") ? "project" : params.get("page") || "home", project: params.get("project"), service: params.get("service") || "all" };
}
function studioUrl(page, options = {}) {
  const params = new URLSearchParams();
  if (page !== "home" && page !== "project") params.set("page", page);
  if (options.project) params.set("project", options.project);
  if (options.service && options.service !== "all") params.set("service", options.service);
  return `${import.meta.env.BASE_URL}${params.size ? `?${params}` : ""}`;
}

function StudioLink({ to, options, onNavigate, children, ...props }) {
  return <a href={studioUrl(to, options)} {...props} onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(to, options);
  }}>{children}</a>;
}
function WorkTile({ project, onNavigate, featured = false }) {
  return <StudioLink to="project" options={{ project: project.id }} onNavigate={onNavigate} className={`studio-work-tile ${featured ? "featured" : ""}`}>
    <div className={`studio-work-image ${project.type === "object" ? "is-object" : ""}`}><img src={asset(project.image)} alt={project.title} loading="lazy" /><span className="studio-work-open"><ArrowUpRight size={30} weight="light" aria-hidden="true" /></span></div>
    <div className="studio-work-meta"><div><h3>{project.title}</h3><p>{project.founder} <span>/</span> {project.category}</p></div><span>{project.year || "SELECTED WORK"}</span></div>
  </StudioLink>;
}

function Home({ onNavigate }) {
  const [view, setView] = useState("fashion");
  const filmRef = useRef(null);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const featured = ["ran-bring-your-love", "dor-digital-fashion", "ran-ltx", "ran-neon-dojo"].map((id) => PROJECTS.find((project) => project.id === id)).filter(Boolean);
  const toggleFilm = () => {
    if (filmRef.current?.paused) filmRef.current.play().catch(() => setPaused(true));
    else filmRef.current?.pause();
  };
  return <>
    <section className={`studio-opening opening-${view}`} aria-labelledby="studio-main-title">
      <div className="studio-opening-plate">
        <div className="studio-opening-media" key={view}>
          {view === "fashion" ? <video ref={filmRef} src={asset("studio/dor-fashion-02.mp4")} poster={asset("studio/dor-fashion-02.jpeg")} autoPlay={!reduced} muted loop playsInline preload="metadata" onPlay={() => setPaused(false)} onPause={() => setPaused(true)} aria-label="Digital fashion moving image by Dor Fellous" /> : view === "film" ? <img src={asset("studio/ran-bring-your-love.webp")} alt="Magenta veiled figures from Ran Bensimon's Bring Your Love show film" fetchPriority="high" /> : <img className="studio-opening-object" src={asset("product-heat-four-lens-v3.png")} alt="Dor Fellous's Object 001 sculptural four-lens eyewear in HEAT" />}
        </div>
        <div className="studio-opening-label"><span>{view === "fashion" ? "DOR FELLOUS / DIGITAL FASHION" : view === "film" ? "RAN BENSIMON / BRING YOUR LOVE" : "DOR FELLOUS / OBJECT 001"}</span>{view === "fashion" && <button type="button" onClick={toggleFilm} aria-label={paused ? "Play studio preview" : "Pause studio preview"}>{paused ? <Play size={15} weight="fill" /> : <Pause size={15} weight="fill" />}</button>}</div>
        <div className="studio-opening-tabs" role="group" aria-label="Explore our practice"><button type="button" aria-pressed={view === "fashion"} onClick={() => setView("fashion")}>FASHION</button><button type="button" aria-pressed={view === "film"} onClick={() => setView("film")}>FILM</button><button type="button" aria-pressed={view === "object"} onClick={() => setView("object")}>OBJECTS</button><span>SELECTED WORK BY THE FOUNDERS</span></div>
      </div>
      <div className="studio-opening-note">
        <div className="studio-intro-copy"><h1 id="studio-main-title" tabIndex={-1}>Wicked taste.<br />Serious craft.</h1><p>A creative studio by<br /><strong>Ran Bensimon & Dor Fellous.</strong></p><p>Films, digital fashion, art and creative tools. A point of view, and the skills to build it.</p></div>
        <div className="studio-intro-close"><span>FOR BRANDS, ARTISTS<br />& CULTURAL ORGANISATIONS</span><StudioLink to="contact" onNavigate={onNavigate} className="studio-primary-link">START A PROJECT <ArrowRight size={24} weight="light" /></StudioLink><StudioLink to="work" onNavigate={onNavigate} className="studio-text-link">EXPLORE THE WORK <ArrowUpRight size={18} /></StudioLink></div>
      </div>
    </section>
    <section className="studio-practice-index" aria-label="Explore studio services">{[{key:"film",title:"FILMS",description:"Campaigns, music, moving image."},{key:"3d",title:"WORLDS",description:"3D, digital fashion, art & experiences."},{key:"web",title:"TOOLS",description:"Websites, AI workflows, creative systems."}].map((entry) => <StudioLink to="services" options={{service:entry.key}} onNavigate={onNavigate} key={entry.key}><span>{entry.title}</span><p>{entry.description}</p><ArrowUpRight size={26} weight="light" /></StudioLink>)}</section>
    <section className="studio-selected" aria-labelledby="selected-title"><div className="studio-section-heading"><h2 id="selected-title">A point of view.<br />The skills to back it.</h2><StudioLink to="work" onNavigate={onNavigate} className="studio-text-link">ALL SELECTED WORK <ArrowUpRight size={20} /></StudioLink></div><p className="studio-credit-note">A selection from our individual practices, brought together as DFRBS Studio.</p><div className="studio-work-grid">{featured.map((project) => <WorkTile project={project} onNavigate={onNavigate} key={project.id} />)}</div></section>
    <section className="studio-service-index" aria-labelledby="service-index-title"><div className="studio-section-heading"><h2 id="service-index-title">Bring us a brief.<br />Or the beginning of one.</h2><p>From a single visual to a complete production system, we shape the scope around what you need to make.</p></div><div>{SERVICES.map((service) => <StudioLink to="services" options={{service:service.key}} onNavigate={onNavigate} className="studio-service-row" key={service.key}><h3>{service.title}</h3><ArrowUpRight size={26} weight="light" /></StudioLink>)}</div></section>
    <section className="studio-shared-practice"><h2>High taste.<br />Low ceremony.</h2><div><p>Dor’s work moves through AI films, digital fashion and wearable art. Ran’s practice connects real-time 3D, generative AI and interactive systems.</p><p>We care about the image and everything it takes to make it: the direction, the pipeline, the edit, the code. We get specific, test the idea and see it through.</p><StudioLink to="studio" onNavigate={onNavigate} className="studio-text-link">MEET THE STUDIO <ArrowUpRight size={20} /></StudioLink></div></section>
    <ProjectClose onNavigate={onNavigate} />
  </>;
}

function Work({ route, onNavigate }) {
  const filter = route.service;
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((project) => project.services.includes(filter));
  const filters = [{key:"all",title:"All work"},{key:"film",title:"Films"},{key:"3d",title:"3D & fashion"},{key:"web",title:"Interactive"},{key:"pipeline",title:"AI systems"},{key:"art",title:"Art"}];
  return <><section className="studio-page-intro"><h1 tabIndex={-1}>Selected<br />work.</h1><div><p>Films, forms, experiments and systems from the practices of Ran Bensimon and Dor Fellous.</p><p className="studio-credit-note">Earlier commissions retain their original individual credits.</p></div></section><nav className="studio-work-filters" aria-label="Filter selected work">{filters.map((entry) => <StudioLink to="work" options={{service:entry.key}} onNavigate={onNavigate} key={entry.key} aria-current={filter === entry.key ? "true" : undefined}>{entry.title}</StudioLink>)}<span>{String(filtered.length).padStart(2,"0")} WORKS</span></nav><section className="studio-work-list" aria-label="Selected projects">{filtered.length ? <div className="studio-work-grid">{filtered.map((project) => <WorkTile project={project} key={project.id} onNavigate={onNavigate} />)}</div> : <div className="studio-empty-work"><h2>A workshop starts with your team.</h2><p>Tell us what you want to learn and what you already make.</p><StudioLink to="contact" options={{service:"workshop"}} onNavigate={onNavigate} className="studio-text-link">PLAN A WORKSHOP <ArrowRight size={20} /></StudioLink></div>}</section><ProjectClose onNavigate={onNavigate} /></>;
}

function Project({ project, onNavigate, onOpenObject }) {
  const [playing, setPlaying] = useState(false);
  const watchRef = useRef(null);
  const closeRef = useRef(null);
  const hasPlayed = useRef(false);
  useEffect(() => {
    if (playing) { hasPlayed.current = true; closeRef.current?.focus(); }
    else if (hasPlayed.current) watchRef.current?.focus();
  }, [playing]);
  if (!project) return <section className="studio-page-intro studio-not-found"><h1 tabIndex={-1}>Work not found.</h1><StudioLink to="work" onNavigate={onNavigate} className="studio-text-link">BACK TO SELECTED WORK <ArrowRight size={20} /></StudioLink></section>;
  return <><section className="studio-project-heading"><StudioLink to="work" onNavigate={onNavigate} className="studio-text-link">ALL WORK <ArrowUpRight size={18} /></StudioLink><h1 tabIndex={-1}>{project.title}</h1><div><span>{project.founder} / {project.category}</span><span>{project.year || "SELECTED WORK"}</span></div></section><section className={`studio-project-media ${project.type === "object" ? "is-object" : ""}`} aria-label="Project media">{playing && project.embedId ? <div className="studio-project-player"><iframe src={`https://www.youtube-nocookie.com/embed/${project.embedId}?autoplay=1`} title={project.title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /><button ref={closeRef} type="button" onClick={() => setPlaying(false)} aria-label="Close film"><X size={22} /></button></div> : project.video ? <video controls playsInline preload="metadata" poster={asset(project.image)} src={asset(project.video)} aria-label={project.title} /> : <><img src={asset(project.image)} alt={project.title} />{project.embedId && <button ref={watchRef} className="studio-project-watch" type="button" onClick={() => setPlaying(true)}><Play size={20} weight="fill" />WATCH FILM</button>}</>}</section><section className="studio-project-dossier"><div><h2>The work.</h2><p>{project.summary}</p>{project.note && <p className="studio-credit-note">{project.note}</p>}<a className="studio-text-link" href={project.source} target="_blank" rel="noopener noreferrer">ORIGINAL PROJECT & CREDITS <ArrowUpRight size={20} /></a>{project.watchUrl && <a className="studio-text-link" href={project.watchUrl} target="_blank" rel="noopener noreferrer">{project.type === "interactive" ? "OPEN EXPERIENCE" : "VIEW ORIGINAL WORK"}<ArrowUpRight size={20} /></a>}{project.playUrl && <a className="studio-text-link" href={project.playUrl} target="_blank" rel="noopener noreferrer">OPEN EXPERIENCE <ArrowUpRight size={20} /></a>}{project.repository && <a className="studio-text-link" href={project.repository} target="_blank" rel="noopener noreferrer">EXPLORE THE SOURCE <ArrowUpRight size={20} /></a>}{project.type === "object" && <a href={`${import.meta.env.BASE_URL}?object=001`} className="studio-text-link" onClick={(event) => { if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey) { event.preventDefault(); onOpenObject("eyewear"); } }}>EXPLORE OBJECT 001 <ArrowRight size={20} /></a>}</div><dl><dt>PRACTICE</dt><dd>{project.founder}</dd><dt>ROLE</dt><dd>{project.role}</dd><dt>OUTPUT</dt><dd>{project.outputs.join(" · ")}</dd>{project.collaborators && <><dt>COLLABORATORS</dt><dd>{project.collaborators}</dd></>}{project.stack.length > 0 && <><dt>TOOLS & METHODS</dt><dd>{project.stack.join(" · ")}</dd></>}</dl></section><section className="studio-related-services"><h2>Have a related brief?</h2>{project.services.map((key) => { const service = SERVICES.find((entry) => entry.key === key); return service && <StudioLink to="contact" options={{service:key}} onNavigate={onNavigate} className="studio-text-link" key={key}>{service.title}<ArrowRight size={18} /></StudioLink>; })}</section></>;
}

function StudioAttitude() {
  return <section className="studio-attitude" aria-labelledby="studio-attitude-title">
    <figure className="studio-attitude-image"><img src={asset("studio/studio-daydream.webp")} alt="Imagined black and chrome studio with pink fur carpets and extravagant pink manicures" loading="lazy" /><figcaption>STUDIO DAYDREAM / CONCEPT IMAGE</figcaption></figure>
    <div className="studio-attitude-copy"><h2 id="studio-attitude-title">Black room.<br />Pink fur.<br />Sharp minds.</h2><p>We half-joked about an all-black office, pink fur underfoot and impossibly long pink manicures. That is the mood: unapologetic taste, playful excess and a serious grasp of the tools.</p><p>We like making a statement. We care just as much about the decisions, the tests and the finishing that make it work.</p></div>
  </section>;
}

function About({ onNavigate }) {
  return <><section className="studio-page-intro"><h1 tabIndex={-1}>A studio<br />with nerve.</h1><div><p>DFRBS Studio brings together Ran Bensimon and Dor Fellous to create across moving image, physical form and creative technology.</p><p>We like an image with nerve, a form with presence and a tool that actually works. That’s where our practices meet.</p></div></section><StudioAttitude /><section className="studio-founders" aria-label="Meet the founders">{FOUNDERS.map((founder) => <article className="studio-founder" key={founder.name}><div className="studio-founder-image"><img src={asset(founder.name.startsWith("Ran") ? "studio/ran-bring-your-love.webp" : "studio/dor-fashion-07.jpeg")} alt={`Selected work by ${founder.name}`} loading="lazy" /></div><h2>{founder.name}</h2><p className="studio-founder-practice">{founder.role}</p><p>{founder.description}</p><a className="studio-text-link" href={founder.source} target="_blank" rel="noopener noreferrer">INDIVIDUAL PORTFOLIO <ArrowUpRight size={20} /></a></article>)}</section><section className="studio-how" aria-labelledby="how-title"><h2 id="how-title">The idea sets<br />the medium.</h2><div>{[{title:"Find the point.",body:"We start with the audience, the intention and the context. What needs to happen, and what should it feel like?"},{title:"Make the language.",body:"We develop visual directions and test the important unknowns early — through frames, prototypes, material studies or a technical pilot."},{title:"Build it properly.",body:"The agreed scope becomes a production plan. We bring direction, 3D, AI, coding and finishing together where the project needs them."},{title:"Leave something useful.",body:"We agree on the final formats and handover from the start: finished media, working code, documented workflows or assets your team can continue using."}].map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section><section className="studio-principles"><p>LONG NAILS.<br />HIGH STANDARDS.</p><span>TASTE / TECHNIQUE / FOLLOW-THROUGH</span></section><ProjectClose onNavigate={onNavigate} /></>;
}

function ProjectClose({ onNavigate }) {
  return <section className="studio-project-close"><h2>Bring the brief.<br />Bring the obsession.</h2><div><p>Tell us what you’re after.<br />We’ll be clear about what it takes.</p><StudioLink to="contact" onNavigate={onNavigate} className="studio-primary-link">LET’S MAKE IT <ArrowRight size={26} weight="light" /></StudioLink></div></section>;
}

export function StudioWebsite({ onOpenObject }) {
  const [route, setRoute] = useState(readRoute);
  const [navIntent, setNavIntent] = useState(0);
  useEffect(() => {
    const pop = () => { setRoute(readRoute()); setNavIntent((value) => value + 1); };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    const titles = {home:"Creative studio",work:"Selected work",services:"Services",studio:"Ran Bensimon & Dor Fellous",contact:"Start a project",project:PROJECTS.find((project) => project.id === route.project)?.title || "Selected work"};
    document.title = `DFRBS Studio — ${titles[route.page] || "Creative studio"}`;
    if (navIntent) { window.scrollTo({ top: 0, behavior: "instant" }); document.querySelector(".studio-website main h1")?.focus({ preventScroll: true }); }
  }, [route, navIntent]);
  const navigate = (page, options = {}) => {
    const url = studioUrl(page, options);
    if (`${window.location.pathname}${window.location.search}` !== url) window.history.pushState({}, "", url);
    setRoute(readRoute());
    setNavIntent((value) => value + 1);
  };
  const activePage = ["home","work","services","studio","contact","project"].includes(route.page) ? route.page : "home";
  return <div className={`site studio-website studio-route-${activePage}`}>
    <a href="#studio-main" className="skip-link">SKIP TO CONTENT</a>
    <header className="studio-site-header"><StudioLink to="home" onNavigate={navigate} className="studio-site-brand" aria-label="DFRBS Studio home"><img src={asset("wordmark-white.png")} alt="DFRBS Studio" /></StudioLink><nav aria-label="Primary navigation">{[{key:"work",title:"WORK"},{key:"services",title:"SERVICES"},{key:"studio",title:"STUDIO"}].map((entry) => <StudioLink to={entry.key} onNavigate={navigate} key={entry.key} aria-current={activePage === entry.key || (activePage === "project" && entry.key === "work") ? "page" : undefined}>{entry.title}</StudioLink>)}</nav><StudioLink to="contact" onNavigate={navigate} className="studio-header-contact" aria-current={activePage === "contact" ? "page" : undefined}>LET’S TALK <ArrowUpRight size={17} /></StudioLink></header>
    <main id="studio-main" tabIndex={-1}>{activePage === "home" ? <Home onNavigate={navigate} /> : activePage === "work" ? <Work route={route} onNavigate={navigate} /> : activePage === "services" ? <ServicesPage key={route.service} initialService={route.service} onNavigate={navigate} /> : activePage === "studio" ? <About onNavigate={navigate} /> : activePage === "contact" ? <InquiryPage key={route.service} initialService={route.service === "all" ? "not-sure" : route.service} /> : <Project key={route.project} project={PROJECTS.find((project) => project.id === route.project)} onNavigate={navigate} onOpenObject={onOpenObject} />}</main>
    <footer className="studio-site-footer"><div className="studio-footer-main"><StudioLink to="home" onNavigate={navigate}><img src={asset("wordmark-white.png")} alt="DFRBS Studio" /></StudioLink><a href="mailto:info@ranbensimon.com">info@ranbensimon.com <ArrowUpRight size={18} /></a></div><div className="studio-footer-bottom"><span>RAN BENSIMON × DOR FELLOUS</span><nav aria-label="Footer navigation"><StudioLink to="work" onNavigate={navigate}>WORK</StudioLink><StudioLink to="services" onNavigate={navigate}>SERVICES</StudioLink><StudioLink to="studio" onNavigate={navigate}>STUDIO</StudioLink><StudioLink to="contact" onNavigate={navigate}>START A PROJECT</StudioLink><a href={`${import.meta.env.BASE_URL}?object=000`} onClick={(event) => { if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onOpenObject("studio"); } }}>OBJECT ARCHIVE</a></nav><small>© {new Date().getFullYear()} DFRBS STUDIO</small></div></footer>
  </div>;
}
