import { useEffect, useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, ArrowLeft, Check, Menu, X, Gift, LogIn, CalendarHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hero, duo, routine, unboxing, capsule, microbiome } from '@/assets/images';
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
const plans = [
  { name: 'Regalos', sub: 'Para empezar con lo esencial.', items: ['Lista de regalos'] },
  { name: 'Completo', sub: 'Para organizar todo con tus invitados.', items: ['Lista de regalos', 'Confirmación de asistencia', 'Sitio de casamiento'] },
  { name: 'Premium', sub: 'La experiencia completa de tu casamiento.', items: ['Todo lo del plan Completo', 'Sitio de casamiento premium'] },
];
const features = [
  { title: 'Lista de regalos', note: 'Regalos simbólicos y fondos para los sueños que quieren compartir.', icon: <GiftIcon /> },
  { title: 'Sitio del casamiento', note: 'Su historia, los detalles del gran día y toda la información para compartir con sus invitados.', icon: <SiteIcon /> },
  { title: 'Confirmación de asistencia', note: 'Invitaciones y confirmaciones para saber quiénes van a compartir ese día con ustedes.', icon: <RsvpIcon /> },
];
function SeedLogo() { return <a href="/" className="seed-logo" aria-label="Weda home">Weda<i aria-hidden="true" /></a>; }
// Botones sin destino por ahora (pendiente de implementación): son <a> sin href, así que no navegan.
function SeedLink({children,pill=false}: {children:React.ReactNode;pill?:boolean}) {
  return <Button variant={pill?'seed':'seedLink'} asChild><a aria-disabled="true">{pill?children:<><span>{children}</span><ArrowRight size={15}/></>}</a></Button>;
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
          <a className="float-link float-desktop" aria-disabled="true">Hacé un regalo</a>
          <a className="float-link float-desktop">Ingresar</a>
          <a className="float-cta">Crear mi evento</a>
          <button type="button" className="float-burger" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="float-menu" onClick={() => setOpen(o => !o)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
      <div id="float-menu" ref={panelRef} className="float-menu" hidden={!open}>
        <a className="menu-row" onClick={close}><span className="menu-tile"><Gift size={30} strokeWidth={1.4} /></span><span><small>Para invitados</small><strong>Hacé un regalo</strong></span></a>
        <a className="menu-row" onClick={close}><span className="menu-tile"><LogIn size={30} strokeWidth={1.4} /></span><span><small>Tu cuenta</small><strong>Ingresar</strong></span></a>
        <a className="menu-row" onClick={close}><span className="menu-tile"><CalendarHeart size={30} strokeWidth={1.4} /></span><span><small>Para novios</small><strong>Crear mi evento</strong></span></a>
      </div>
    </header>
  );
}
// TESTIMONIOS DE EJEMPLO: textos y nombres provisorios para maquetar el carrusel. Reemplazarlos por testimonios reales antes de publicar.
const testimonials = [
  { quote: 'Armamos la lista de regalos en una tarde y nuestros invitados pudieron aportar a la luna de miel sin complicaciones.', who: 'Camila y Lucas' },
  { quote: 'Dejamos de perseguir confirmaciones por mensaje: todas las respuestas llegaban en un solo lugar.', who: 'Valentina y Mariano' },
  { quote: 'El sitio con nuestra historia hizo que todos llegaran sabiendo exactamente dónde y cuándo.', who: 'Julieta y Franco' },
  { quote: 'Recibir el dinero directamente nos permitió empezar la casa que soñábamos.', who: 'Sofía y Tomás' },
];
function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const go = (n: number) => {
    const el = track.current; if (!el) return;
    const t = (n + testimonials.length) % testimonials.length;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: t * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  };
  return (
    <div className="tm" role="region" aria-roledescription="carrusel" aria-label="Testimonios">
      <p className="eyebrow">● Testimonios</p>
      <div className="tm-track" ref={track} onScroll={e => { const el = e.currentTarget; setI(Math.round(el.scrollLeft / el.clientWidth)); }} tabIndex={0} aria-live="off">
        {testimonials.map((t, n) => (
          <figure className="tm-slide" key={t.who} role="group" aria-roledescription="diapositiva" aria-label={`${n + 1} de ${testimonials.length}`}>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>{t.who}</figcaption>
          </figure>
        ))}
      </div>
      <div className="tm-controls">
        <div className="tm-dots" role="group" aria-label="Elegir testimonio">
          {testimonials.map((t, n) => <button type="button" key={t.who} className={n === i ? 'on' : ''} aria-label={`Ir al testimonio ${n + 1}`} aria-current={n === i} onClick={() => go(n)} />)}
        </div>
        <div className="tm-arrows">
          <button type="button" aria-label="Testimonio anterior" onClick={() => go(i - 1)}><ArrowLeft size={20} /></button>
          <button type="button" aria-label="Testimonio siguiente" onClick={() => go(i + 1)}><ArrowRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}
function Index() {
  const footer: {title: string; links: [string, string][]}[] = [
    {title:'Products',links:[['Shop All','/products']]},
    {title:'About',links:[['Science','/approach'],['Sustainability','/sustainability'],['SeedLabs','/seedlabs']]},
    {title:'Inquire',links:[['Superfiliate','https://seed.superfiliate.com/portal/sign-up'],['Partner','https://app.impact.com/campaign-promo-signup/Seed-Health-Inc.brand'],['Practitioners','/practitioners'],['Press','/press'],['Careers','/join-us']]},
    {title:'Help',links:[['Help','https://help.seed.com/'],['Contact','https://help.seed.com/en-US/contact'],['My Account','/account/home'],['International','/entire-world']]},
    {title:'Social',links:[['Instagram','https://www.instagram.com/seed'],['Twitter','https://twitter.com/seedhealth'],['LinkedIn','https://www.linkedin.com/company/seedhealth'],['Refer','/account/refer']]},
    {title:'Legal',links:[['Terms + Conditions','/terms-conditions'],['Privacy Policy','/privacy-policy'],['Accessibility','/accessibility'],['Consent Preferences','/#']]},
  ];
  const heroVideo = useRef<HTMLVideoElement>(null);
  // Respeta prefers-reduced-motion: el video de fondo queda en pausa.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { const v = heroVideo.current; if (!v) return; if (mq.matches) v.pause(); else v.play().catch(() => {}); };
    sync(); mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return <>
    <a className="skip-link" href="#main">Ir al contenido</a>
    <a className="announcement">¿Invitado? Encontrá una lista de regalos <ArrowRight size={11} className="ml-1"/></a>
    <FloatNav/>
    <section className="seed-hero" id="top">
      <video className="hero-image" src="/hero.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" ref={heroVideo}/>
      <main id="main" className="hero-inner"><div className="hero-copy"><h1>Organizá tu casamiento en un solo lugar.</h1><p>Creá tu lista de regalos, gestioná invitados y compartí toda la información de tu evento.</p><div className="hero-actions"><SeedLink pill>Crear mi evento</SeedLink><SeedLink>Ver ejemplo</SeedLink></div></div></main>
    </section>
    <section className="products-section" id="products"><div className="section-inner">
      <div className="feat-head"><h2>Todo para su gran día.</h2><div className="feat-head-side"><p>Una lista de regalos para sus próximos sueños, un sitio para compartir su historia y una forma simple de organizar a quienes los acompañan.</p><div className="feat-cta"><SeedLink>Crear mi evento</SeedLink></div></div></div>
      <div className="feat-grid">{features.map((f)=><div className="feat-card" key={f.title}><h3>{f.title}</h3><p>{f.note}</p><span className="feat-stage" aria-hidden="true">{f.icon}</span></div>)}</div>
    </div></section>
    <section className="duo-section" id="regalos"><div className="section-inner duo-layout"><div className="duo-copy"><p className="eyebrow">Regalos</p><h2>Creá una lista de regalos simbólica que se adapte a ustedes</h2><p>Tus invitados eligen qué regalar y vos recibís el dinero directamente.</p><SeedLink pill>Crear mi lista de regalos</SeedLink></div><div className="duo-media"><img className="duo-main" src={duo.url} alt="Ollas y cacerolas esmaltadas de una lista de regalos" loading="lazy"/><div className="duo-thumbnails">{[routine,unboxing].map((im,i)=><img key={im.url} src={im.url} alt={['Mesa de madera de una lista de regalos','Lámpara de mesa de una lista de regalos'][i]} loading="lazy"/>)}</div></div></div></section>
    <section className="viacap-section" id="testimonios"><div className="section-inner"><Testimonials/></div></section>
    <section className="plans-section" id="planes"><div className="section-inner">
      <div className="plans-head"><h2>Elegí el plan para tu casamiento.</h2><p>Pago único, pagás solo al publicar.</p></div>
      <div className="plans-grid">{plans.map(pl=><article className="plan-card" key={pl.name}><h3>{pl.name}</h3><p className="plan-sub">{pl.sub}</p><ul>{pl.items.map(it=><li key={it}><Check size={18} strokeWidth={1.6} aria-hidden="true"/><span>{it}</span></li>)}</ul><SeedLink pill>Elegir experiencia</SeedLink></article>)}</div>
    </div></section>
    <footer className="seed-footer"><div className="section-inner"><div className="footer-top"><div><SeedLogo/><p className="footer-mission">Tu historia, a tu manera.</p></div><div><a className="newsletter-link" aria-disabled="true">Your email address <ArrowRight size={20}/></a><small>By signing up you consent to receive Weda emails.</small></div></div><div className="footer-links">{footer.map(group=><div key={group.title}><h3>{group.title}</h3>{group.links.map(([name,path])=><a key={name} aria-disabled="true">{name}</a>)}</div>)}</div><div className="footer-bottom"><span>© 2026 Weda (Weda Health, Inc.)</span></div></div></footer>
  </>;
}
