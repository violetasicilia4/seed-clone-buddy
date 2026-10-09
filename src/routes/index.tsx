import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Play, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hero, duo, routine, unboxing, capsule, microbiome, story1, story2, alice, community1, community2, community3, labsBg, gutBg, labs, awaken } from '@/assets/images';
import { GiftMock, GuestsMock, SiteMock, PanelMock } from '@/components/feature-mocks';

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
const products = [
  {title:'Recibí aportes para lo que viene',note:'Fondos para tu luna de miel o cualquier proyecto.',mock:<GiftMock/>,path:'/daily-synbiotic'},
  {title:'Todas las respuestas en un solo lugar',note:'Confirmaciones, grupos y acompañantes, siempre al día.',mock:<GuestsMock/>,path:'/daily-multivitamin'},
  {title:'Compartí todo sin repetir información',note:'Tu sitio con fecha, lugar y confirmación de asistencia.',mock:<SiteMock/>,path:'/energy-focus'},
  {title:'Seguí cada detalle de un vistazo',note:'Invitados, regalos y avances en un solo panel.',mock:<PanelMock/>,path:'/sleep-restore'},
];
function SeedLogo() { return <a href="/" className="seed-logo" aria-label="Weda home">Weda<i aria-hidden="true" /></a>; }
function SeedLink({href,children,pill=false}: {href:string;children:React.ReactNode;pill?:boolean}) {
  return <Button variant={pill?'seed':'seedLink'} asChild><a href={href}>{pill?children:<><span>{children}</span><ArrowRight size={15}/></>}</a></Button>;
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
    <section className="seed-hero">
      <video className="hero-image" src="/hero.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" ref={heroVideo}/>
      <header className="seed-nav">
        <div className="nav-inner"><SeedLogo/>
          <div className="nav-right"><Button asChild variant="seedNav"><a href="#">Hacé un regalo</a></Button><Button asChild variant="seedNav"><a href={seed('/account/home')}>Ingresar</a></Button><SeedLink href={seed('/products')} pill>Crear mi evento</SeedLink></div>
        </div>
      </header>
      <main id="main" className="hero-inner"><div className="hero-copy"><h1>Organizá tu casamiento en un solo lugar.</h1><p>Creá tu lista de regalos, gestioná invitados y compartí toda la información de tu evento.</p><div className="hero-actions"><SeedLink href={seed('/find-your-routine')} pill>Crear mi evento</SeedLink><SeedLink href={seed('/products')}>Ver ejemplo</SeedLink></div></div></main>
    </section>
    <section className="products-section" id="products"><div className="section-inner"><div className="section-heading"><h2>Tu casamiento, sin planillas ni mensajes perdidos.</h2><div><p>Regalos, invitados, sitio web y seguimiento, todo conectado.</p></div></div><div className="product-grid">{products.map(p=><a className="product-card" key={p.title} href={seed(p.path)}>{p.mock}<div className="product-info"><h3>{p.title}</h3><small>{p.note}</small><div className="shop-line"><span>Explorar</span><ArrowUpRight size={16}/></div></div></a>)}</div><div className="products-cta"><SeedLink href={seed('/products')}>Crear mi evento</SeedLink></div></div></section>
    <section className="duo-section"><div className="section-inner duo-layout"><div className="duo-copy"><p className="eyebrow">Regalos</p><h2>Creá una lista de regalos simbólica que se adapte a ustedes</h2><p>Recibí aportes para cualquier objetivo, desde la luna de miel hasta la remodelación de tu hogar. Tus invitados eligen cuánto regalar y vos recibís el dinero directamente.</p><SeedLink href={seed('/daily-essentials-duo')} pill>Crear mi lista de regalos</SeedLink></div><div className="duo-media"><img className="duo-main" src={duo.url} alt="Ollas y cacerolas esmaltadas de una lista de regalos" loading="lazy"/><div className="duo-thumbnails">{[routine,unboxing].map((im,i)=><img key={im.url} src={im.url} alt={['Mesa de madera de una lista de regalos','Lámpara de mesa de una lista de regalos'][i]} loading="lazy"/>)}</div></div></div></section>
    <section className="viacap-section" id="science"><div className="section-inner"><p className="eyebrow">● ViaCap® Technology</p><div className="viacap-title"><h2>Most probiotics don't survive digestion—DS-01® does.</h2><div className="stat">Increases healthy bacteria°<strong>↑13x</strong><small>°Lactobacillus</small></div></div><div className="capsule-layout"><div><h3>OUTER CAPSULE</h3><p>Shields probiotics from stomach acid in the digestive tract, while delivering prebiotics to stimulate the growth of beneficial bacteria.</p></div><img src={capsule.url} alt="Weda capsule-in-capsule ViaCap technology" loading="lazy"/><div><h3>INNER CAPSULE</h3><p>Delivers 24 live strains of probiotics to the colon, where they're needed most.</p></div></div></div></section>
    <section className="science-section"><div className="section-inner"><p className="eyebrow">Weda【  】</p><div className="science-heading"><h2>You are more than human.</h2><div><p>Your body isn't yours alone—it's home to 38 trillion microbes that power your digestion, immunity and more. Take a few minutes to learn how their health impacts your health—and how to maximize both.</p><SeedLink href={seed('/approach')}>Discover</SeedLink></div></div><a className="science-media" href={seed('/approach')}><img src={microbiome.url} alt="The microscopic world of the human microbiome" loading="lazy"/><span className="media-label">SCIENCE / Microbiome 101</span><Play className="media-play" size={30}/></a></div></section>
    <section className="stories-section"><div className="section-inner"><h2>Over 1 million health transformations (and counting).</h2><p>See how real people are changing their health with Weda.</p><div className="story-grid">{[story1,story2,alice].map((im,i)=><a href={seed('/daily-synbiotic')} className="story" key={im.url}><img src={im.url} alt={`Weda member story ${i+1}`} loading="lazy"/><span>{i===2?'Alice':<Play size={26}/>}</span></a>)}</div><h3 className="community-title">Stories from scientists, innovators, and members like you.</h3><div className="community-grid">{[community1,community2,community3].map((im,i)=><img key={im.url} src={im.url} alt={`Weda community daily routine ${i+1}`} loading="lazy"/>)}</div></div></section>
    <section className="section-inner bookends"><div className="bookend"><img className="bookend-bg" src={labsBg.url} alt="Lipari and Panarea, Italy" loading="lazy"/><span className="location">● Lipari, Panarea — Italy</span><div className="bookend-content"><h2>SeedLabs</h2><p>Because health is not just human.</p><SeedLink href={seed('/seedlabs')} pill>Read More</SeedLink></div></div><div className="bookend"><img className="bookend-bg" src={gutBg.url} alt="Weda's world of microbiome science" loading="lazy"/><div className="bookend-content"><img className="bookend-product" src={labs.url} alt="Weda Daily Synbiotic" loading="lazy"/><h2>Change your gut health for good.*</h2><p>Feel lasting relief in one week with DS-01®*</p><SeedLink href={seed('/daily-synbiotic')} pill>Shop Now</SeedLink></div></div></section>
    <footer className="seed-footer"><div className="section-inner"><div className="footer-top"><div><SeedLogo/><p className="footer-mission">Pioneering microbiome science [R+D] for human and planetary health since 2016.</p></div><div><p className="newsletter">Science with Weda—nerdy reads for your inbox.</p><a className="newsletter-link" href={seed('/#footer')}>Your email address <ArrowRight size={20}/></a><small>By signing up you consent to receive Weda emails.</small></div></div><div className="footer-links">{footer.map(group=><div key={group.title}><h3>{group.title}</h3>{group.links.map(([name,path])=><a key={name} href={path.startsWith('https:')?path:seed(path)}>{name}</a>)}</div>)}</div><p className="footer-disclaimer">*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</p><img className="awaken-image" src={awaken.url} alt="Awaken Within" loading="lazy"/><div className="footer-bottom"><a href={seed('/entire-world')}>USD / United States</a><span>© 2026 Weda (Weda Health, Inc.)</span></div></div></footer>
  </>;
}
