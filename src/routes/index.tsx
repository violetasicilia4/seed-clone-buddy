import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Play, Menu, X, Gift, LogIn, CalendarHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hero, duo, routine, unboxing, capsule, microbiome, story1, story2, alice, community1, community2, community3, labsBg, gutBg, labs, awaken } from '@/assets/images';
import { GiftIcon, SiteIcon, RsvpIcon } from '@/components/feature-icons';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Weda • Organizá tu casamiento en un solo lugar' },
    { name: 'description', content: 'Creá tu lista de regalos, gestioná invitados y compartí toda la información de tu evento. Weda, la plataforma para organizar casamientos.' },
    { property: 'og:title', content: 'Weda • Organizá tu casamiento en un solo lugar' },
    { property: 'og:description', content: 'Creá tu lista de regalos, gestioná invitados y compartí toda la información de tu evento.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: hero.url },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: hero.url },
  ] }),
  component: Index,
});
const seed = (path: string) => `https://seed.com${path}`;
const features = [
  { title: 'Lista de regalos', note: 'Regalos simbólicos y fondos para los proyectos que sueñan compartir.', icon: <GiftIcon />, link: 'Descubrir', path: '/daily-synbiotic', primary: true },
  { title: 'Micrositio', note: 'Su historia, los detalles del gran día y todo lo que quieren compartir.', icon: <SiteIcon />, link: 'Ver ejemplo', path: '/energy-focus', primary: false },
  { title: 'Confirmación de asistencia', note: 'Invitaciones y respuestas para compartir el día con quienes más quieren.', icon: <RsvpIcon />, link: 'Conocer más', path: '/daily-multivitamin', primary: false },
];
function SeedLogo() { return <a href="/" className="seed-logo" aria-label="Weda home">Weda<i aria-hidden="true" /></a>; }
function SeedLink({href,children,pill=false}: {href:string;children:React.ReactNode;pill?:boolean}) {
  return <Button variant={pill?'seed':'seedLink'} asChild><a href={href}>{pill?children:<><span>{children}</span><ArrowRight size={15}/></>}</a></Button>;
}
function FloatNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  // Una sola barra, como en Seed: sube con la página hasta pegarse arriba y sus píldoras se van "rellenando" (--p de 0 a 1).
  useEffect(() => {
    const onScroll = () => ref.current?.style.setProperty('--p', String(Math.min(1, Math.max(0, window.scrollY / 56))));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    // El panel arranca justo debajo de la barra y ocupa el resto de la pantalla.
    const bar = ref.current?.querySelector('.float-bar');
    if (bar && panelRef.current) panelRef.current.style.top = `${Math.round(bar.getBoundingClientRect().bottom + 8)}px`;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);
  const close = () => setOpen(false);
  return (
    <header className="float-nav" ref={ref}>
      <nav className="float-bar" aria-label="Principal">
        <div className="float-pill float-left">
          <a href="#top" className="seed-logo" aria-label="Weda, volver arriba">Weda<i aria-hidden="true" /></a>
        </div>
        <div className="float-pill float-right">
          <a className="float-link float-desktop" href="#">Hacé un regalo</a>
          <a className="float-link float-desktop" href={seed('/account/home')}>Ingresar</a>
          <a className="float-cta" href={seed('/products')}>Crear mi evento</a>
          <button type="button" className="float-burger" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="float-menu" onClick={() => setOpen(o => !o)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
      <div id="float-menu" ref={panelRef} className="float-menu" hidden={!open}>
        <a className="menu-row" href="#" onClick={close}><span className="menu-tile"><Gift size={30} strokeWidth={1.4} /></span><span><small>Para invitados</small><strong>Hacé un regalo</strong></span></a>
        <a className="menu-row" href={seed('/account/home')} onClick={close}><span className="menu-tile"><LogIn size={30} strokeWidth={1.4} /></span><span><small>Tu cuenta</small><strong>Ingresar</strong></span></a>
        <a className="menu-row" href={seed('/products')} onClick={close}><span className="menu-tile"><CalendarHeart size={30} strokeWidth={1.4} /></span><span><small>Para novios</small><strong>Crear mi evento</strong></span></a>
      </div>
    </header>
  );
}
function Index() {
  const heroVideo = useRef<HTMLVideoElement>(null);
  // Respeta prefers-reduced-motion: el video de fondo queda en pausa.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { const v = heroVideo.current; if (!v) return; if (mq.matches) v.pause(); else v.play().catch(() => {}); };
    sync(); mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const footer: {title: string; links: [string, string][]}[] = [
    {title:'Products',links:[['Shop All','/products']]},
    {title:'About',links:[['Science','/approach'],['Sustainability','/sustainability'],['SeedLabs','/seedlabs']]},
    {title:'Inquire',links:[['Superfiliate','https://seed.superfiliate.com/portal/sign-up'],['Partner','https://app.impact.com/campaign-promo-signup/Seed-Health-Inc.brand'],['Practitioners','/practitioners'],['Press','/press'],['Careers','/join-us']]},
    {title:'Help',links:[['Help','https://help.seed.com/'],['Contact','https://help.seed.com/en-US/contact'],['My Account','/account/home'],['International','/entire-world']]},
    {title:'Social',links:[['Instagram','https://www.instagram.com/seed'],['Twitter','https://twitter.com/seedhealth'],['LinkedIn','https://www.linkedin.com/company/seedhealth'],['Refer','/account/refer']]},
    {title:'Legal',links:[['Terms + Conditions','/terms-conditions'],['Privacy Policy','/privacy-policy'],['Accessibility','/accessibility'],['Consent Preferences','/#']]},
  ];
  return <>
    <a className="skip-link" href="#main">Ir al contenido</a>
    <a className="announcement" href={seed('/find-your-routine')}>¿Invitado? Encontrá una lista de regalos <ArrowRight size={11} className="ml-1"/></a>
    <FloatNav/>
    <section className="seed-hero" id="top">
      <video className="hero-image" src="/hero.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" ref={heroVideo}/>
      <main id="main" className="hero-inner"><div className="hero-copy"><h1>Organizá tu casamiento en un solo lugar.</h1><p>Creá tu lista de regalos, gestioná invitados y compartí toda la información de tu evento.</p><div className="hero-actions"><SeedLink href={seed('/find-your-routine')} pill>Crear mi evento</SeedLink><SeedLink href={seed('/products')}>Ver ejemplo</SeedLink></div></div></main>
    </section>
    <section className="products-section" id="products"><div className="section-inner">
      <div className="feat-head"><h2>Todo lo que hace especial a tu casamiento.</h2><p>Una lista de regalos para sus próximos sueños, un sitio para compartir su historia y una forma simple de confirmar quiénes los acompañan.</p></div>
      <div className="feat-grid">{features.map(f=><a className={`feat-card${f.primary?' feat-primary':''}`} key={f.title} href={seed(f.path)}><span className="feat-icon">{f.icon}</span><h3>{f.title}</h3><p>{f.note}</p><span className="feat-link">{f.link}<ArrowRight size={15} aria-hidden="true"/></span></a>)}</div>
      <div className="products-cta"><SeedLink href={seed('/daily-essentials-duo')}>Creá tu lista de regalos</SeedLink></div>
    </div></section>
    <section className="duo-section" id="regalos"><div className="section-inner duo-layout"><div className="duo-copy"><p className="eyebrow">Regalos</p><h2>Creá una lista de regalos simbólica que se adapte a ustedes</h2><p>Recibí aportes para cualquier objetivo, desde la luna de miel hasta la remodelación de tu hogar. Tus invitados eligen cuánto regalar y vos recibís el dinero directamente.</p><SeedLink href={seed('/daily-essentials-duo')} pill>Crear mi lista de regalos</SeedLink></div><div className="duo-media"><img className="duo-main" src={duo.url} alt="Ollas y cacerolas esmaltadas de una lista de regalos" loading="lazy"/><div className="duo-thumbnails">{[routine,unboxing].map((im,i)=><img key={im.url} src={im.url} alt={['Mesa de madera de una lista de regalos','Lámpara de mesa de una lista de regalos'][i]} loading="lazy"/>)}</div></div></div></section>
    <section className="viacap-section" id="science"><div className="section-inner"><p className="eyebrow">● ViaCap® Technology</p><div className="viacap-title"><h2>Most probiotics don't survive digestion—DS-01® does.</h2><div className="stat">Increases healthy bacteria°<strong>↑13x</strong><small>°Lactobacillus</small></div></div><div className="capsule-layout"><div><h3>OUTER CAPSULE</h3><p>Shields probiotics from stomach acid in the digestive tract, while delivering prebiotics to stimulate the growth of beneficial bacteria.</p></div><img src={capsule.url} alt="Weda capsule-in-capsule ViaCap technology" loading="lazy"/><div><h3>INNER CAPSULE</h3><p>Delivers 24 live strains of probiotics to the colon, where they're needed most.</p></div></div></div></section>
    <section className="stories-section"><div className="section-inner"><h2>Over 1 million health transformations (and counting).</h2><p>See how real people are changing their health with Weda.</p><div className="story-grid">{[story1,story2,alice].map((im,i)=><a href={seed('/daily-synbiotic')} className="story" key={im.url}><img src={im.url} alt={`Weda member story ${i+1}`} loading="lazy"/><span>{i===2?'Alice':<Play size={26}/>}</span></a>)}</div><h3 className="community-title">Stories from scientists, innovators, and members like you.</h3><div className="community-grid">{[community1,community2,community3].map((im,i)=><img key={im.url} src={im.url} alt={`Weda community daily routine ${i+1}`} loading="lazy"/>)}</div></div></section>
    <section className="section-inner bookends"><div className="bookend"><img className="bookend-bg" src={labsBg.url} alt="Lipari and Panarea, Italy" loading="lazy"/><span className="location">● Lipari, Panarea — Italy</span><div className="bookend-content"><h2>SeedLabs</h2><p>Because health is not just human.</p><SeedLink href={seed('/seedlabs')} pill>Read More</SeedLink></div></div><div className="bookend"><img className="bookend-bg" src={gutBg.url} alt="Weda's world of microbiome science" loading="lazy"/><div className="bookend-content"><img className="bookend-product" src={labs.url} alt="Weda Daily Synbiotic" loading="lazy"/><h2>Change your gut health for good.*</h2><p>Feel lasting relief in one week with DS-01®*</p><SeedLink href={seed('/daily-synbiotic')} pill>Shop Now</SeedLink></div></div></section>
    <footer className="seed-footer"><div className="section-inner"><div className="footer-top"><div><SeedLogo/><p className="footer-mission">Pioneering microbiome science [R+D] for human and planetary health since 2016.</p></div><div><p className="newsletter">Science with Weda—nerdy reads for your inbox.</p><a className="newsletter-link" href={seed('/#footer')}>Your email address <ArrowRight size={20}/></a><small>By signing up you consent to receive Weda emails.</small></div></div><div className="footer-links">{footer.map(group=><div key={group.title}><h3>{group.title}</h3>{group.links.map(([name,path])=><a key={name} href={path.startsWith('https:')?path:seed(path)}>{name}</a>)}</div>)}</div><p className="footer-disclaimer">*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</p><img className="awaken-image" src={awaken.url} alt="Awaken Within" loading="lazy"/><div className="footer-bottom"><a href={seed('/entire-world')}>USD / United States</a><span>© 2026 Weda (Weda Health, Inc.)</span></div></div></footer>
  </>;
}
