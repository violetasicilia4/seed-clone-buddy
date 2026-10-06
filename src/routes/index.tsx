import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, Menu, X, Play, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero from '@/assets/hero.asset.json';
import ds from '@/assets/product-0.asset.json';
import dm from '@/assets/product-1.asset.json';
import am from '@/assets/product-2.asset.json';
import pm from '@/assets/product-3.asset.json';
import duo from '@/assets/duo.asset.json';
import routine from '@/assets/routine.asset.json';
import unboxing from '@/assets/unboxing.asset.json';
import duoPlant from '@/assets/duo-plant.asset.json';
import capsule from '@/assets/capsule.asset.json';
import microbiome from '@/assets/microbiome.asset.json';
import story1 from '@/assets/story-1.asset.json';
import story2 from '@/assets/story-2.asset.json';
import alice from '@/assets/alice.asset.json';
import community1 from '@/assets/community-1.asset.json';
import community2 from '@/assets/community-2.asset.json';
import community3 from '@/assets/community-3.asset.json';
import labsBg from '@/assets/labs-background.asset.json';
import gutBg from '@/assets/gut-background.asset.json';
import labs from '@/assets/labs.asset.json';
import awaken from '@/assets/awaken.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Weda • A life-changing health routine, built for your microbiome' },
    { name: 'description', content: 'Transform your gut health, energy, sleep, and nutrition with formulations designed for real results. Discover Weda.' },
    { property: 'og:title', content: 'Weda • A life-changing health routine' },
    { property: 'og:description', content: 'Whole body health starts in the gut. Discover scientifically studied formulations from Weda.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: hero.url },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: hero.url },
  ] }),
  component: Index,
});
const seed = (path: string) => `https://seed.com${path}`;
const products = [
  {code:'DS–01®',name:'Daily Synbiotic',price:'49.99',badge:'Bestseller',image:ds.url,path:'/daily-synbiotic'},
  {code:'DM–02™',name:'Daily Multivitamin',price:'39.99',badge:'New',image:dm.url,path:'/daily-multivitamin'},
  {code:'AM–02™',name:'Energy + Focus',price:'34.99',badge:'New',image:am.url,path:'/energy-focus'},
  {code:'PM–02™',name:'Sleep + Restore',price:'34.99',badge:'New',image:pm.url,path:'/sleep-restore'},
];
function SeedLogo() { return <a href="/" className="seed-logo" aria-label="Weda home">Weda<i aria-hidden="true" /></a>; }
function SeedLink({href,children,pill=false}: {href:string;children:React.ReactNode;pill?:boolean}) {
  return <Button variant={pill?'seed':'seedLink'} asChild><a href={href}>{pill?children:<><span>{children}</span><ArrowRight size={15}/></>}</a></Button>;
}
function Index() {
  const [menu,setMenu] = useState<string|null>(null);
  const menus: Record<string,{label:string;href:string}[]> = {
    Shop: [{label:'Shop All',href:'/products'},...products.map(p=>({label:`${p.code} ${p.name}`,href:p.path})),{label:'Daily Essentials Duo',href:'/daily-essentials-duo'}],
    Science: [{label:'Our Approach',href:'/approach'},{label:'Microbiome 101',href:'/microbiome'},{label:'SeedLabs',href:'/seedlabs'},{label:'Sustainability',href:'/sustainability'}],
    Learn: [{label:'Learn with Weda',href:'/cultured'},{label:'Find your routine',href:'/find-your-routine'},{label:'Help + FAQs',href:'https://help.seed.com/'}],
  };
  const footer: {title: string; links: [string, string][]}[] = [
    {title:'Products',links:[['Shop All','/products']]},
    {title:'About',links:[['Science','/approach'],['Sustainability','/sustainability'],['SeedLabs','/seedlabs']]},
    {title:'Inquire',links:[['Superfiliate','https://seed.superfiliate.com/portal/sign-up'],['Partner','https://app.impact.com/campaign-promo-signup/Seed-Health-Inc.brand'],['Practitioners','/practitioners'],['Press','/press'],['Careers','/join-us']]},
    {title:'Help',links:[['Help','https://help.seed.com/'],['Contact','https://help.seed.com/en-US/contact'],['My Account','/account/home'],['International','/entire-world']]},
    {title:'Social',links:[['Instagram','https://www.instagram.com/seed'],['Twitter','https://twitter.com/seedhealth'],['LinkedIn','https://www.linkedin.com/company/seedhealth'],['Refer','/account/refer']]},
    {title:'Legal',links:[['Terms + Conditions','/terms-conditions'],['Privacy Policy','/privacy-policy'],['Accessibility','/accessibility'],['Consent Preferences','/#']]},
  ];
  return <>
    <a className="announcement" href={seed('/find-your-routine')}>Find the right products for you <ArrowRight size={11} className="ml-1"/></a>
    <section className="seed-hero">
      <img className="hero-image" src={hero.url} alt="Four jars of Weda products on a table" fetchPriority="high"/>
      <header className="seed-nav" onMouseLeave={()=>setMenu(null)}>
        <div className="nav-inner"><SeedLogo/>
          <nav className="nav-left" aria-label="Main navigation">{Object.keys(menus).map(name=><Button key={name} variant="seedNav" aria-expanded={menu===name} onMouseEnter={()=>setMenu(name)} onClick={()=>setMenu(menu===name?null:name)}>{name}</Button>)}</nav>
          <div className="nav-right"><Button asChild variant="seedNav"><a href={seed('/account/home')}>Sign in</a></Button><SeedLink href={seed('/products')} pill>Get Started</SeedLink><Button className="mobile-menu" variant="seedNav" size="icon" aria-label={menu==='mobile'?'Close menu':'Open menu'} aria-expanded={menu==='mobile'} onClick={()=>setMenu(menu==='mobile'?null:'mobile')}>{menu==='mobile'?<X/>:<Menu/>}</Button></div>
        </div>
        {menu&&<nav className="nav-panel" aria-label={`${menu} menu`}>{(menu==='mobile'?Object.entries(menus):[[menu,menus[menu]]]).map(([name,links])=><div key={String(name)}><div className="nav-panel-label">{String(name)}</div>{(links as {label:string;href:string}[]).map(l=><a key={l.label} href={l.href.startsWith('https:')?l.href:seed(l.href)}>{l.label}</a>)}</div>)}</nav>}
      </header>
      <main id="main" className="hero-inner"><div className="hero-copy"><h1>A life-changing<br/>health routine, built<br/>for your microbiome.</h1><p>Transform your gut health, energy, sleep, and nutrition with formulations designed for real results.</p><div className="hero-actions"><SeedLink href={seed('/find-your-routine')} pill>Take the Quiz</SeedLink><SeedLink href={seed('/products')}>Shop Now</SeedLink></div></div></main>
    </section>
    <section className="products-section" id="products"><div className="section-inner"><div className="section-heading"><h2>Whole body health starts<br/>in the gut.</h2><div><p>Formulations that provide sustained support using key scientifically and clinically studied ingredients</p><SeedLink href={seed('/products')}>Shop all</SeedLink></div></div><div className="product-grid">{products.map(p=><a className="product-card" key={p.code} href={seed(p.path)}><span className="product-badge">{p.badge}</span><img src={p.image} alt={`${p.code} ${p.name}`} loading="lazy"/><div className="product-info"><h3>{p.code}</h3><p>{p.name}</p><div className="shop-line"><span>Shop Now</span><ArrowUpRight size={16}/></div><small>Starting at ${p.price} per month</small></div></a>)}</div></div></section>
    <section className="duo-section"><div className="section-inner duo-layout"><div className="duo-copy"><p className="eyebrow">Bundle + Save 25%</p><h2>Daily essentials for nutrition and digestive health.</h2><p>Our clinically studied daily synbiotic paired with a daily multivitamin reduces bloating, promotes healthy regularity and helps cover nutrient gaps.</p><SeedLink href={seed('/daily-essentials-duo')} pill>Shop Daily Essentials Duo</SeedLink></div><div><img className="duo-main" src={duo.url} alt="Daily Synbiotic and Daily Multivitamin" loading="lazy"/><div className="duo-thumbnails">{[routine,unboxing,duoPlant].map((im,i)=><img key={im.url} src={im.url} alt={['A daily multivitamin routine','Unboxing Weda products','Weda daily essentials'][i]} loading="lazy"/>)}</div></div></div></section>
    <section className="viacap-section" id="science"><div className="section-inner"><p className="eyebrow">● ViaCap® Technology</p><div className="viacap-title"><h2>Most probiotics don't survive digestion—DS-01® does.</h2><div className="stat">Increases healthy bacteria°<strong>↑13x</strong><small>°Lactobacillus</small></div></div><div className="capsule-layout"><div><h3>OUTER CAPSULE</h3><p>Shields probiotics from stomach acid in the digestive tract, while delivering prebiotics to stimulate the growth of beneficial bacteria.</p></div><img src={capsule.url} alt="Weda capsule-in-capsule ViaCap technology" loading="lazy"/><div><h3>INNER CAPSULE</h3><p>Delivers 24 live strains of probiotics to the colon, where they're needed most.</p></div></div></div></section>
    <section className="science-section"><div className="section-inner"><p className="eyebrow">Weda【  】</p><div className="science-heading"><h2>You are more than human.</h2><div><p>Your body isn't yours alone—it's home to 38 trillion microbes that power your digestion, immunity and more. Take a few minutes to learn how their health impacts your health—and how to maximize both.</p><SeedLink href={seed('/approach')}>Discover</SeedLink></div></div><a className="science-media" href={seed('/approach')}><img src={microbiome.url} alt="The microscopic world of the human microbiome" loading="lazy"/><span className="media-label">SCIENCE / Microbiome 101</span><Play className="media-play" size={30}/></a></div></section>
    <section className="stories-section"><div className="section-inner"><h2>Over 1 million health transformations (and counting).</h2><p>See how real people are changing their health with Weda.</p><div className="story-grid">{[story1,story2,alice].map((im,i)=><a href={seed('/daily-synbiotic')} className="story" key={im.url}><img src={im.url} alt={`Weda member story ${i+1}`} loading="lazy"/><span>{i===2?'Alice':<Play size={26}/>}</span></a>)}</div><h3 className="community-title">Stories from scientists, innovators, and members like you.</h3><div className="community-grid">{[community1,community2,community3].map((im,i)=><img key={im.url} src={im.url} alt={`Weda community daily routine ${i+1}`} loading="lazy"/>)}</div></div></section>
    <section className="section-inner bookends"><div className="bookend"><img className="bookend-bg" src={labsBg.url} alt="Lipari and Panarea, Italy" loading="lazy"/><span className="location">● Lipari, Panarea — Italy</span><div className="bookend-content"><h2>SeedLabs</h2><p>Because health is not just human.</p><SeedLink href={seed('/seedlabs')} pill>Read More</SeedLink></div></div><div className="bookend"><img className="bookend-bg" src={gutBg.url} alt="Weda's world of microbiome science" loading="lazy"/><div className="bookend-content"><img className="bookend-product" src={labs.url} alt="Weda Daily Synbiotic" loading="lazy"/><h2>Change your gut health for good.*</h2><p>Feel lasting relief in one week with DS-01®*</p><SeedLink href={seed('/daily-synbiotic')} pill>Shop Now</SeedLink></div></div></section>
    <footer className="seed-footer"><div className="section-inner"><div className="footer-top"><div><SeedLogo/><p className="footer-mission">Pioneering microbiome science [R+D] for human and planetary health since 2016.</p></div><div><p className="newsletter">Science with Weda—nerdy reads for your inbox.</p><a className="newsletter-link" href={seed('/#footer')}>Your email address <ArrowRight size={20}/></a><small>By signing up you consent to receive Weda emails.</small></div></div><div className="footer-links">{footer.map(group=><div key={group.title}><h3>{group.title}</h3>{group.links.map(([name,path])=><a key={name} href={path.startsWith('https:')?path:seed(path)}>{name}</a>)}</div>)}</div><p className="footer-disclaimer">*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.</p><img className="awaken-image" src={awaken.url} alt="Awaken Within" loading="lazy"/><div className="footer-bottom"><a href={seed('/entire-world')}>USD / United States</a><span>© 2026 Weda (Weda Health, Inc.)</span></div></div></footer>
  </>;
}
