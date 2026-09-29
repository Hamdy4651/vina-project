import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, X, CircleArrowOutUpRight } from 'lucide-react'
import vinaLogo from './imports/454545454545-removebg-preview.png'

// ── Image bank ───────────────────────────────────────────────────────────────
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=88&auto=format&fit=crop`

const HERO_IMGS = [
  { src: U('1556742049-0cfed4f6a45d', 1920), project: 'CONCEPT STORE', city: 'Berlin', cat: 'Retail' },
  { src: U('1517248135467-4c7edcad34c4', 1920), project: 'CAFÉ & BISTRO', city: 'Hamburg', cat: 'Gastronomie' },
  { src: U('1555396273-367ea4eb4db5', 1920), project: 'RESTAURANT MITTE', city: 'Berlin', cat: 'Gastronomie' },
  { src: U('1567521464027-f127ff144326', 1920), project: 'BÄCKEREI ZENTRUM', city: 'München', cat: 'Bäckerei' },
  { src: U('1524758631624-e2822e304c36', 1920), project: 'SHOWROOM DESIGN', city: 'Frankfurt', cat: 'Retail' },
]

// ── Projects data model (NEW) ─────────────────────────────────────────────────
type Project = {
  number: string          // '01', '02' ...
  title: string
  location: string
  type: string             // e.g. 'Retail · Visualisierung'
  layout: 'full' | 'card' | 'cinematic'
  images: string[]          // images[0] = main card image, images[1] = inset image, rest = extra lightbox slides
  description?: string
  material?: string
  area?: string
  status?: string
}

const PROJECTS: Project[] = [
  {
    number: '01', title: 'TODO_CLIENT_DATA', location: 'Berlin', type: 'Retail · Visualisierung', layout: 'full',
    images: [U('1604335399105-a0c585fd81a1'), U('1441986300917-64674bd600d8', 900)],
    description: 'Designstudie für eine hochwertige Boutique-Inszenierung mit Fokus auf Materialität, Lichtführung und Markenpräsentation.',
    material: 'Eichenholz · Cortenstahl · Sichtbeton', area: '280 m²', status: 'Realisiert',
  },
  {
    number: '02', title: 'TODO_CLIENT_DATA', location: 'Hamburg', type: 'Gastronomie · Umsetzung', layout: 'card',
    images: [U('1555396273-367ea4eb4db5'), U('1414235077428-338989a2e8c0', 900)],
    description: 'Intimität durch warme Holzoberflächen und indirektes Lichtdesign.',
    material: 'Nussbaum · Messing · Naturstein', area: '160 m²', status: 'Realisiert',
  },
  {
    number: '03', title: 'TODO_CLIENT_DATA', location: 'München', type: 'Bäckerei · Umsetzung', layout: 'card',
    images: [U('1567521464027-f127ff144326'), U('1509440159596-0249088772ff', 900)],
    description: 'Verkaufstheke als Mittelpunkt — Materialien, die Handwerk zeigen.',
    material: 'Weißer Marmor · Fichtenholz · Keramikfliesen', area: '120 m²', status: 'Realisiert',
  },
  {
    number: '04', title: 'TODO_CLIENT_DATA', location: 'Frankfurt', type: 'Retail · Umsetzung', layout: 'cinematic',
    images: [U('1556742049-0cfed4f6a45d', 1200), U('1524758631624-e2822e304c36', 900), U('1586023492125-27b2c045efd7', 900)],
    description: 'Modulares Regalsystem — anpassbar für wechselnde Kollektionen.',
    material: 'Stahl geschwärzt · Ahorn hell · Glas satiniert', area: '210 m²', status: 'Realisiert',
  },
  {
    number: '05', title: 'TODO_CLIENT_DATA', location: 'Berlin', type: 'Supermarkt · Umsetzung', layout: 'card',
    images: [U('1590846406792-0adc7f938f1d'), U('1551632436-cbf8dd35adfa', 900)],
    description: 'Klare Wegeführung, maximale Flächeneffizienz und starke Eigenmarken-Präsenz.',
    material: 'Aluminium · Laminat · Hochglanzacryl', area: '480 m²', status: 'Realisiert',
  },
  {
    number: '06', title: 'TODO_CLIENT_DATA', location: 'Köln', type: 'Gastronomie · Visualisierung', layout: 'card',
    images: [U('1517248135467-4c7edcad34c4'), U('1600607687939-ce8a6c25118c', 900)],
    description: 'Premium-Ambiente durch Schichtung von Texturen und Lichtquellen.',
    material: 'Travertin · Samtvelours · Messing patiniert', area: '190 m²', status: 'Realisiert',
  },
]

const CLIENTS = [
  'REWE', 'BACK-FACTORY', 'SPAR', 'NETTO', 'EDEKA',
  'BACK-FACTORY', 'ROSSMANN', 'PENNY', 'dm', 'TODO_CLIENT',
]

const REVIEWS = [
  {
    quote: '„VINA hat unseren Verkaufsraum in einen echten Erlebnisraum verwandelt. Die Kombination aus Funktionalität und Ästhetik war genau das, was wir gesucht haben."',
    name: 'TODO_CLIENT_DATA', project: 'Retail · Berlin',
  },
  {
    quote: '„Vom ersten Gespräch bis zur finalen Übergabe — absolut professionell, termintreu und mit echtem Gespür für das Besondere."',
    name: 'TODO_CLIENT_DATA', project: 'Gastronomie · Hamburg',
  },
  {
    quote: '„Unser neues Ladenkonzept ist zum Aushängeschild der Filiale geworden. Die Kunden kommen wegen des Designs zurück."',
    name: 'TODO_CLIENT_DATA', project: 'Bäckerei · München',
  },
]

const FAQS = [
  { q: 'Wie läuft ein Projekt bei VINA ab?', a: 'Jedes Projekt beginnt mit einem kostenlosen Erstgespräch, in dem wir Ihre Ziele, das Budget und den Zeitrahmen besprechen. Danach folgen Planung, Musterung und die Umsetzung durch unser Netzwerk aus Handwerkern und Lieferanten.' },
  { q: 'In welchen Regionen arbeitet VINA?', a: 'VINA hat seinen Sitz in Berlin und realisiert Projekte bundesweit. Für größere Projekte sind wir auch europaweit tätig.' },
  { q: 'Welche Leistungen übernimmt VINA?', a: 'Wir übernehmen das gesamte Spektrum: individuelle Konzeption, Lösungsplanung, Expertenberatung bei Materialien und Ausstattung sowie die komplette Umsetzung inklusive Koordination aller Gewerke.' },
  { q: 'Wie früh sollte man VINA kontaktieren?', a: 'Je früher, desto besser. Idealerweise 3–6 Monate vor dem geplanten Eröffnungstermin, damit ausreichend Zeit für Planung, Bestellung und Umsetzung bleibt.' },
  { q: 'Wie lange dauert ein Ladenbauprojekt?', a: 'Das hängt stark von Umfang und Komplexität ab. Kleinere Projekte (< 150 m²) sind oft in 6–10 Wochen realisierbar. Größere Vorhaben können 4–6 Monate in Anspruch nehmen.' },
  { q: 'Was kostet ein Ladenbauprojekt?', a: 'Die Kosten sind stark abhängig von Fläche, Ausstattungsniveau und Objektart. Als Orientierung: einfache Ladenausbauten beginnen ab ca. 500–800 €/m², hochwertige Konzepte liegen deutlich darüber.' },
]

const BASE_RATES: Record<string, [number, number]> = {
  Laden: [800, 1200], Restaurant: [1000, 1800], Bäckerei: [900, 1500],
  Supermarkt: [600, 1000], Büro: [500, 900], Sonstiges: [700, 1200],
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

function Reveal({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const { ref, vis } = useInView(0.1)
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: `opacity 0.9s var(--ease) ${delay}ms, transform 0.9s var(--ease) ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const dur = 2000, start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(ease * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{val}{suffix}</span>
}

// Adds `.visible` to any element with class "reveal" once it scrolls into view
// (used by the new Projects section below).
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

// ── Grain Overlay ─────────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none', opacity: 0.038,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}

// ── Global styles for the new Projects section + Lightbox (embedded, no separate CSS file needed) ──
function ProjectStyles() {
  return (
    <style>{`
      .section-pad { padding: 0 48px; max-width: 1440px; margin: 0 auto; }
      .eyebrow {
        font-family: 'Inter Tight', sans-serif; font-size: 11px; font-weight: 500;
        letter-spacing: 0.3em; text-transform: uppercase; color: var(--bordeaux);
        margin-bottom: 12px;
      }
      .section-marker {
        display: flex; align-items: center; gap: 10px; margin-bottom: 24px;
        font-family: 'Inter Tight', sans-serif; font-size: 11px; letter-spacing: 0.2em;
        color: rgba(244,240,234,0.4); text-transform: uppercase;
      }
      .section-marker span:first-child { color: var(--bordeaux); font-weight: 700; }
      .reveal { opacity: 0; transform: translateY(28px); transition: opacity .9s var(--ease), transform .9s var(--ease); }
      .reveal.visible { opacity: 1; transform: translateY(0); }

      .projects-section { padding: 0 0 120px; }
      .projects-intro { padding-top: 0; padding-bottom: 80px; }
      .projects-intro h2 {
        font-family: 'Inter Tight', sans-serif; font-weight: 800; letter-spacing: -0.03em;
        line-height: 0.92; font-size: clamp(2.4rem, 6vw, 7rem); color: var(--off-white); margin: 0;
      }
      .projects-intro h2 em { font-style: italic; font-weight: 300; color: rgba(244,240,234,0.3); }

      .project-list { display: grid; grid-template-columns: 1fr; gap: 4px; padding: 0 4px; }
      @media (min-width: 900px) { .project-list { grid-template-columns: repeat(2, 1fr); } }

      .project-feature { position: relative; cursor: pointer; overflow: hidden; }
      .project-feature.layout-full,
      .project-feature.layout-cinematic { aspect-ratio: 21 / 9; grid-column: 1 / -1; }
      .project-feature.layout-card { aspect-ratio: 4 / 3; }

      .project-image-wrap { position: absolute; inset: 0; }
      .project-image-wrap > img {
        width: 100%; height: 100%; object-fit: cover; display: block;
        filter: brightness(0.68); transition: transform .9s var(--ease), filter .5s var(--ease);
      }
      .project-feature:hover .project-image-wrap > img { transform: scale(1.045); filter: brightness(0.8); }

      .project-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(12,9,8,0.9) 0%, rgba(12,9,8,0.15) 55%, transparent 100%);
      }

      .project-image-secondary {
        position: absolute; top: 24px; right: 24px;
        width: 38%; max-width: 380px; aspect-ratio: 4/3;
        border-radius: 14px; overflow: hidden;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        border: 1px solid rgba(244,240,234,0.12);
        transform: translateY(0); transition: transform .6s var(--ease);
      }
      .project-feature:hover .project-image-secondary { transform: translateY(-6px); }
      .project-image-secondary img { width: 100%; height: 100%; object-fit: cover; }

      .project-label {
        position: absolute; left: 0; right: 0; bottom: 0;
        display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
        padding: 28px 32px;
      }
      .project-number {
        font-family: 'Inter Tight', sans-serif; font-size: 12px; font-weight: 700;
        letter-spacing: 0.2em; color: var(--bordeaux); align-self: flex-start; margin-top: 4px;
      }
      .project-info .eyebrow { margin-bottom: 8px; }
      .project-info h3 {
        font-family: 'Inter Tight', sans-serif; font-weight: 700; letter-spacing: -0.01em;
        font-size: clamp(1.4rem, 2.4vw, 2.2rem); color: var(--off-white); margin: 0 0 6px;
      }
      .project-info p { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(244,240,234,0.55); margin: 0; }

      .project-open {
        display: flex; align-items: center; justify-content: center;
        width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
        background: rgba(244,240,234,0.06); border: 1px solid rgba(244,240,234,0.2);
        color: var(--cream); transition: all .35s var(--ease);
      }
      .project-feature:hover .project-open {
        background: var(--bordeaux); border-color: var(--bordeaux); color: var(--off-white);
        transform: rotate(45deg);
      }

      .project-footnote {
        display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
        padding-top: 48px; margin-top: 48px; border-top: 1px solid rgba(244,240,234,0.08);
        font-family: 'Inter Tight', sans-serif; font-size: 11px; letter-spacing: 0.15em;
        text-transform: uppercase; color: rgba(244,240,234,0.35);
      }
      .project-footnote p { font-family: 'Inter', sans-serif; font-size: 13px; text-transform: none; letter-spacing: normal; color: rgba(244,240,234,0.5); margin: 0; }
      .project-footnote button {
        background: none; border: none; cursor: pointer; color: var(--bordeaux); font-weight: 600;
        display: inline-flex; align-items: center; gap: 6px; font-family: inherit; font-size: inherit;
      }

      .lightbox {
        position: fixed; inset: 0; z-index: 200; background: var(--black);
        display: grid; grid-template-columns: 1fr 420px;
        animation: vina-fade-in .4s ease;
      }
      @media (max-width: 900px) {
        .lightbox { grid-template-columns: 1fr; grid-template-rows: 55vh 1fr; }
      }

      .lightbox-media { position: relative; overflow: hidden; background: var(--dark2); }
      .lightbox-img {
        position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
        opacity: 0; transition: opacity .5s ease;
      }
      .lightbox-img.active { opacity: 1; }

      .lightbox-nav {
        position: absolute; top: 50%; transform: translateY(-50%);
        width: 44px; height: 44px; border-radius: 50%;
        background: rgba(12,9,8,0.5); backdrop-filter: blur(6px);
        border: 1px solid rgba(244,240,234,0.25); color: var(--cream);
        display: flex; align-items: center; justify-content: center; cursor: pointer;
        transition: background .25s;
      }
      .lightbox-nav:hover { background: var(--bordeaux); border-color: var(--bordeaux); }
      .lightbox-nav.prev { left: 20px; }
      .lightbox-nav.next { right: 20px; }

      .lightbox-dots { position: absolute; bottom: 20px; left: 20px; display: flex; gap: 6px; }
      .lightbox-dots span {
        width: 8px; height: 8px; border-radius: 50%; background: rgba(244,240,234,0.35);
        cursor: pointer; transition: all .3s;
      }
      .lightbox-dots span.active { background: var(--bordeaux); width: 22px; border-radius: 4px; }

      .lightbox-close {
        position: absolute; top: 24px; right: 24px; z-index: 5;
        width: 44px; height: 44px; border-radius: 50%;
        background: rgba(12,9,8,0.55); border: 1px solid rgba(244,240,234,0.2);
        color: var(--cream); display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all .25s;
      }
      .lightbox-close:hover { background: var(--bordeaux); border-color: var(--bordeaux); }

      .lightbox-panel {
        padding: 72px 48px; display: flex; flex-direction: column; justify-content: center;
        background: var(--black); overflow-y: auto;
      }
      .lightbox-index {
        font-family: 'Inter Tight', sans-serif; font-size: 12px; font-weight: 700;
        letter-spacing: 0.2em; color: var(--bordeaux); margin-bottom: 24px;
      }
      .lightbox-panel h2 {
        font-family: 'Inter Tight', sans-serif; font-weight: 800; letter-spacing: -0.02em;
        font-size: clamp(2rem, 3vw, 3rem); line-height: 1.05; color: var(--off-white); margin: 0 0 16px;
      }
      .lightbox-location { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(244,240,234,0.5); margin: 0 0 32px; }
      .lightbox-divider { display: block; width: 100%; height: 1px; background: rgba(244,240,234,0.1); margin-bottom: 32px; }
      .lightbox-desc { font-family: 'Inter', sans-serif; font-weight: 300; font-size: 16px; line-height: 1.8; color: rgba(244,240,234,0.65); margin: 0 0 40px; }
      .lightbox-cta {
        align-self: flex-start; background: none; border: none; cursor: pointer;
        font-family: 'Inter Tight', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.1em;
        text-transform: uppercase; color: var(--cream); display: inline-flex; align-items: center; gap: 10px;
        padding-bottom: 6px; border-bottom: 1px solid var(--bordeaux); transition: gap .3s;
      }
      .lightbox-cta:hover { gap: 16px; }

      @keyframes vina-fade-in { from { opacity: 0 } to { opacity: 1 } }
    `}</style>
  )
}

// ── Progress Rail ─────────────────────────────────────────────────────────────
const RAIL_SECTIONS = [
  { id: 'projekte', num: '01' }, { id: 'leistungen', num: '02' },
  { id: 'prozess', num: '03' }, { id: 'kunden', num: '04' },
  { id: 'kontakt', num: '05' },
]

function ProgressRail({ active }: { active: string }) {
  return (
    <nav className="progress-rail hidden lg:flex">
      {RAIL_SECTIONS.map(s => (
        <button
          key={s.id}
          className={`rail-item ${active === s.id ? 'active' : ''}`}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="rail-label">{s.num}</span>
          <span className="rail-dot" />
        </button>
      ))}
    </nav>
  )
}

// ── Logo (original icon image + real HTML text — text stays crisp at any size) ─
function Logo({ height = 52, light = true }: { height?: number; light?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src={vinaLogo} alt="" style={{ height, width: 'auto', display: 'block', flexShrink: 0 }} />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span style={{
          fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '0.04em',
          fontSize: height * 0.44, color: light ? 'var(--off-white)' : 'var(--black)',
        }}>VINA</span>
        <span style={{
          fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, letterSpacing: '0.26em',
          fontSize: height * 0.2, color: 'rgba(244,240,234,0.5)', textTransform: 'uppercase',
        }}>Ladenbau</span>
      </span>
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const NAV = [
    { id: 'projekte', label: 'PROJEKTE' },
    { id: 'leistungen', label: 'LEISTUNGEN' },
    { id: 'prozess', label: 'PROZESS' },
    { id: 'ueber', label: 'ÜBER UNS' },
    { id: 'kunden', label: 'KUNDEN' },
    { id: 'kontakt', label: 'KONTAKT' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(12,9,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(244,240,234,0.06)' : 'none',
      padding: scrolled ? '14px 0' : '24px 0',
      transition: 'all 0.5s var(--ease)',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Logo height={52} />
        </button>

        <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: 32 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => go(n.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(244,240,234,0.6)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,240,234,0.6)')}
            >{n.label}</button>
          ))}
          <button onClick={() => go('kontakt')} className="clip-facet-sm" style={{
            padding: '10px 20px', background: 'var(--bordeaux)', color: 'var(--off-white)',
            border: 'none', cursor: 'pointer', fontFamily: 'Inter Tight, sans-serif',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bord-light)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--bordeaux)')}
          >PROJEKT ANFRAGEN</button>
        </nav>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cream)' }}>
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--black)', zIndex: -1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px' }}>
          {NAV.map((n, i) => (
            <button key={n.id} onClick={() => go(n.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 700,
              letterSpacing: '-0.02em', color: 'var(--cream)', padding: '12px 0',
              borderBottom: '1px solid rgba(244,240,234,0.06)',
              opacity: 0, animation: `slide-up 0.6s var(--ease) ${i * 80}ms forwards`,
            }}>{n.label}</button>
          ))}
          <button onClick={() => go('kontakt')} style={{
            marginTop: 32, padding: '16px 0', background: 'var(--bordeaux)',
            color: 'var(--off-white)', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter Tight, sans-serif', fontSize: 14, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
            opacity: 0, animation: `slide-up 0.6s var(--ease) ${NAV.length * 80}ms forwards`,
          }}>PROJEKT ANFRAGEN →</button>
        </div>
      )}
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_IMGS.length), 6000)
    return () => clearInterval(t)
  }, [])

  const cur = HERO_IMGS[idx]

  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', minHeight: 600, overflow: 'hidden', background: 'var(--black)' }}>
      {HERO_IMGS.map((img, i) => (
        <div key={img.src} style={{ position: 'absolute', inset: 0, transition: 'opacity 1.8s var(--ease)', opacity: i === idx ? 1 : 0 }}>
          <img
            src={img.src} alt="" loading={i === 0 ? 'eager' : 'lazy'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: i === idx ? 'scale(1)' : 'scale(1.04)', transition: 'transform 8s linear' }}
          />
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,9,8,0.95) 0%, rgba(12,9,8,0.4) 50%, rgba(12,9,8,0.2) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, var(--black), transparent)' }} />
      <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, background: 'linear-gradient(to bottom, transparent, var(--bordeaux), transparent)', opacity: 0.6 }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 64px', maxWidth: 1440, margin: '0 auto', left: 0, right: 0 }}>
        <div style={{ overflow: 'hidden', marginBottom: 32 }}>
          <span style={{
            display: 'block', fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(244,240,234,0.5)',
            animation: loaded ? 'line-up 0.8s var(--ease) 0.2s both' : 'none',
          }}>VINA LADENBAU · BERLIN</span>
        </div>

        <h1 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: 40, color: 'var(--off-white)', fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}>
          {['RAUM.', 'KONZEPT.', 'UMSETZUNG.'].map((w, i) => (
            <span key={w} className="line-mask" style={{ display: 'block' }}>
              <span style={{ display: 'block', animation: loaded ? `line-up 1s var(--ease) ${0.4 + i * 0.14}s both` : 'none' }}>
                {w}
              </span>
            </span>
          ))}
        </h1>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          animation: loaded ? 'slide-up 0.8s var(--ease) 0.9s both' : 'none',
        }}>
          <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--bordeaux)', textTransform: 'uppercase' }}>{`0${idx + 1}`}</span>
          <div style={{ width: 40, height: 1, background: 'var(--bordeaux)', opacity: 0.7 }} />
          <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: 'rgba(244,240,234,0.65)', textTransform: 'uppercase' }}>{cur.project}</span>
          <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: 'rgba(244,240,234,0.4)', textTransform: 'uppercase' }}>{cur.city}</span>
          <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: 'rgba(244,240,234,0.4)', textTransform: 'uppercase' }}>{cur.cat}</span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 32 }}>
          {HERO_IMGS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 28 : 6, height: 2, background: i === idx ? 'var(--bordeaux)' : 'rgba(244,240,234,0.25)',
              border: 'none', cursor: 'pointer', borderRadius: 1, transition: 'all 0.4s var(--ease)',
            }} />
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 40, right: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0.4, animation: loaded ? 'slide-up 0.8s var(--ease) 1.4s both' : 'none' }}>
        <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cream)', writingMode: 'vertical-rl' }}>SCROLL TO EXPLORE</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--cream), transparent)' }} />
      </div>
    </section>
  )
}

// ── Manifesto ─────────────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section style={{ padding: '120px 48px', maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }} className="grid-cols-1 lg:grid-cols-2">
        <Reveal>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 32 }}>BERLIN · LADENBAU · INNENARCHITEKTUR</p>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: 'var(--off-white)', fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}>
            RÄUME, DIE<br />FUNKTIONIEREN.<br />
            <span style={{ color: 'rgba(244,240,234,0.3)', fontWeight: 300, fontStyle: 'italic' }}>UND IM GEDÄCHTNIS</span><br />
            <span style={{ color: 'rgba(244,240,234,0.3)', fontWeight: 300, fontStyle: 'italic' }}>BLEIBEN.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 16, lineHeight: 1.9, color: 'rgba(244,240,234,0.6)', marginBottom: 48, maxWidth: 480 }}>
            VINA entwickelt individuelle Ladenbau- und Designkonzepte für Einzelhandel, Gastronomie und Bäckereien. Vom ersten Konzept bis zur finalen Übergabe — aus einer Hand, in höchster Qualität.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[['Projekte', 200, '+'], ['Jahre', 10, '+'], ['Standorte', 1, '']].map(([l, v, s]) => (
              <div key={l as string}>
                <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--off-white)' }}>
                  <CountUp to={v as number} suffix={s as string} />
                </p>
                <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(244,240,234,0.4)', marginTop: 6 }}>{l as string}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Projects (NEW: card grid + lightbox matching the reference screenshots) ──
function ProjectShowcase({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <section className="projects-section" id="projekte">
      <div className="section-pad projects-intro">
        <div className="section-marker reveal"><span>02</span><span>Portfolio</span></div>
        <div className="reveal">
          <p className="eyebrow">Ausgewählte Arbeiten</p>
          <h2>Aus Ideen<br /><em>werden Räume.</em></h2>
        </div>
      </div>

      <div className="project-list">
        {PROJECTS.map((project, index) => (
          <article
            className={`project-feature project-${index + 1} layout-${project.layout} reveal`}
            key={project.number}
            onClick={() => onSelect(project)}
          >
            <div className="project-image-wrap">
              <img
                src={project.images[0]}
                alt={`${project.title} — ${project.type}`}
                loading={index < 2 ? 'eager' : 'lazy'}
              />
              <div className="project-overlay" />
              {project.images.length > 1 && (
                <div className="project-image-secondary">
                  <img src={project.images[1]} alt={`${project.title} Detail`} loading="lazy" />
                </div>
              )}
            </div>
            <div className="project-label">
              <span className="project-number">{project.number}</span>
              <div className="project-info">
                <p className="eyebrow">{project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.location}</p>
              </div>
              <span className="project-open"><CircleArrowOutUpRight size={26} /></span>
            </div>
          </article>
        ))}
      </div>

      <div className="project-footnote section-pad">
        <span>Weitere Referenzen</span>
        <p>
          Die vorhandenen Projekt- und Kundenvisuals bilden die Grundlage für diesen kuratierten Einblick.{' '}
          <button onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}>
            Projekt besprechen <ArrowRight size={15} />
          </button>
        </p>
      </div>
    </section>
  )
}

// ── Project Lightbox (replaces the old ProjectDetail overlay) ────────────────
function ProjectLightbox({
  project, onClose, onNext, onPrev,
}: { project: Project; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => { setImgIdx(0) }, [project])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, onNext, onPrev])

  const images = project.images
  const total = PROJECTS.length
  const globalIdx = PROJECTS.findIndex(p => p.number === project.number) + 1

  return (
    <div className="lightbox" role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose} aria-label="Schließen"><X size={20} /></button>

      <div className="lightbox-media">
        {images.map((src, i) => (
          <img key={src} src={src} alt={project.title} className={`lightbox-img ${i === imgIdx ? 'active' : ''}`} />
        ))}

        {images.length > 1 && (
          <>
            <button className="lightbox-nav prev" onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)} aria-label="Vorheriges Bild">
              <ChevronLeft size={20} />
            </button>
            <button className="lightbox-nav next" onClick={() => setImgIdx(i => (i + 1) % images.length)} aria-label="Nächstes Bild">
              <ChevronRight size={20} />
            </button>
            <div className="lightbox-dots">
              {images.map((_, i) => (
                <span key={i} className={i === imgIdx ? 'active' : ''} onClick={() => setImgIdx(i)} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="lightbox-panel">
        <span className="lightbox-index">{String(globalIdx).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <p className="eyebrow">{project.type}</p>
        <h2>{project.title}</h2>
        <p className="lightbox-location">{project.location}</p>
        <span className="lightbox-divider" />
        {project.description && <p className="lightbox-desc">{project.description}</p>}
        <button className="lightbox-cta" onClick={onNext}>
          Ähnliches Projekt anfragen <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}


// ── Process ───────────────────────────────────────────────────────────────────
function Process() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  const STEPS = [
    { num: 'I', title: 'BERATUNG', desc: 'Im ersten Gespräch klären wir Ihre Vision, das Budget und den Zeitplan. Wir hören zu — und stellen die richtigen Fragen.' },
    { num: 'II', title: 'PLANUNG', desc: 'Auf Basis der Beratung erarbeiten wir Grundriss, Raumaufteilung, Möblierungsplanung und eine detaillierte Kostenaufstellung.' },
    { num: 'III', title: '3D VISUALISIERUNG', desc: 'Wir zeigen Ihnen Ihren zukünftigen Raum als realistische 3D-Visualisierung — Materialien, Licht und Möblierung zum Anfassen nah.' },
    { num: 'IV', title: 'FERTIGUNG', desc: 'Nach Ihrer Freigabe gehen die Ausführungspläne in die Fertigung — präzise abgestimmt auf jedes Detail des Konzepts.' },
    { num: 'V', title: 'MONTAGE', desc: 'VINA koordiniert alle Gewerke, übernimmt die Montage vor Ort und übergibt Ihnen einen fertigen Raum — termingerecht.' },
  ]

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = refs.current.indexOf(e.target as HTMLDivElement)
          if (i !== -1) setActive(i)
        }
      })
    }, { threshold: 0.6 })
    refs.current.forEach(r => r && obs.observe(r))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="prozess" style={{ padding: '120px 0', background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
      <img src={U('1586023492125-27b2c045efd7', 1200)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <Reveal style={{ marginBottom: 96 }}>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>PROZESS</p>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, fontSize: 'clamp(2rem, 5vw, 5.5rem)', color: 'var(--off-white)' }}>
            VON DER IDEE<br /><span style={{ color: 'rgba(244,240,234,0.25)' }}>BIS ZUM FERTIGEN RAUM.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              ref={el => { refs.current[i] = el }}
              style={{
                padding: '48px 32px',
                background: active === i ? 'rgba(107,17,8,0.15)' : 'rgba(244,240,234,0.02)',
                borderTop: `2px solid ${active === i ? 'var(--bordeaux)' : 'rgba(244,240,234,0.08)'}`,
                transition: 'all 0.5s var(--ease)',
              }}
            >
              <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: active === i ? 'var(--bordeaux)' : 'rgba(244,240,234,0.1)', display: 'block', marginBottom: 24, transition: 'color 0.5s' }}>{s.num}</span>
              <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase', color: active === i ? 'var(--off-white)' : 'rgba(244,240,234,0.5)', marginBottom: 16, transition: 'color 0.5s' }}>{s.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: 'rgba(244,240,234,0.45)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Warum wir ─────────────────────────────────────────────────────────────────
function WhyUs() {
  const REASONS = [
    { num: '01', title: 'PLANUNG AUS EINER HAND', desc: 'Ein Ansprechpartner von der ersten Beratung bis zur Übergabe — ich begleite Ihr Projekt persönlich durch jede Phase.' },
    { num: '02', title: 'INDIVIDUELLE LÖSUNGEN', desc: 'Kein Konzept von der Stange: Jeder Raum bekommt eine Lösung, die genau auf Ihre Anforderungen und Ihr Budget zugeschnitten ist.' },
    { num: '03', title: 'TERMINTREUE UMSETZUNG', desc: 'Klare Zeitpläne, verlässliche Kommunikation — Sie wissen jederzeit, wann welcher Schritt ansteht.' },
    { num: '04', title: 'QUALITÄT & PRÄZISION', desc: 'Hochwertige Materialien und eine präzise, sorgfältige Ausführung bis ins letzte Detail.' },
  ]
  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid rgba(244,240,234,0.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <Reveal style={{ marginBottom: 80 }}>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>WARUM WIR</p>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, fontSize: 'clamp(2rem, 5vw, 5.5rem)', color: 'var(--off-white)' }}>
            VERTRAUEN, DAS<br /><span style={{ color: 'rgba(244,240,234,0.25)' }}>SICH AUSZAHLT.</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.num} delay={i * 100}>
              <div style={{ padding: '40px 32px', background: 'rgba(244,240,234,0.02)', borderTop: '2px solid rgba(244,240,234,0.08)', height: '100%' }}>
                <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--bordeaux)', display: 'block', marginBottom: 20 }}>{r.num}</span>
                <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--off-white)', marginBottom: 14 }}>{r.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: 'rgba(244,240,234,0.5)' }}>{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Clients ───────────────────────────────────────────────────────────────────
function Clients() {
  const doubled = [...CLIENTS, ...CLIENTS]
  return (
    <section id="kunden" style={{ padding: '120px 0', borderTop: '1px solid rgba(244,240,234,0.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px 80px' }}>
        <Reveal>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>KUNDEN</p>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, fontSize: 'clamp(2rem, 5vw, 5rem)', color: 'var(--off-white)' }}>
            VERTRAUEN ENTSTEHT<br /><span style={{ color: 'rgba(244,240,234,0.25)' }}>DURCH GEMEINSAME PROJEKTE.</span>
          </h2>
        </Reveal>
      </div>

      <div style={{ overflow: 'hidden', padding: '0 0 16px', borderTop: '1px solid rgba(244,240,234,0.06)', borderBottom: '1px solid rgba(244,240,234,0.06)' }}>
        <div style={{ display: 'flex', animation: 'marquee 24s linear infinite', width: 'max-content' }}>
          {doubled.map((c, i) => (
            <span key={i} style={{
              fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              letterSpacing: '-0.02em', color: 'rgba(244,240,234,0.2)', padding: '24px 48px',
              transition: 'color 0.3s', cursor: 'default', display: 'inline-block',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,240,234,0.2)')}
            >{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Reviews ───────────────────────────────────────────────────────────────────
function Reviews() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % REVIEWS.length), 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ padding: '120px 48px', background: 'var(--dark)', borderTop: '1px solid rgba(244,240,234,0.06)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 64 }}>STIMMEN</p>
        <div style={{ position: 'relative', minHeight: 220 }}>
          {REVIEWS.map((rev, i) => (
            <div key={i} style={{
              position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0,
              opacity: i === idx ? 1 : 0, transform: i === idx ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 1s var(--ease), transform 1s var(--ease)', pointerEvents: i === idx ? 'auto' : 'none',
            }}>
              <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 300, fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', lineHeight: 1.5, color: 'rgba(244,240,234,0.8)', marginBottom: 40, fontStyle: 'italic', letterSpacing: '-0.01em' }}>{rev.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 24, height: 1, background: 'var(--bordeaux)' }} />
                <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--cream)', letterSpacing: '0.05em' }}>{rev.name}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(244,240,234,0.4)' }}>{rev.project}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 48 }}>
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 32 : 8, height: 2, background: i === idx ? 'var(--bordeaux)' : 'rgba(244,240,234,0.2)', border: 'none', cursor: 'pointer', borderRadius: 1, transition: 'all 0.4s' }} />
          ))}
        </div>
      </div>
    </section>
  )
}



// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="ueber" style={{ padding: '120px 0', background: 'var(--dark)', borderTop: '1px solid rgba(244,240,234,0.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="grid-cols-1 lg:grid-cols-2">
          <Reveal>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }} className="clip-facet">
              <img src={U('1600607687939-ce8a6c25118c', 1200)} alt="VINA Atelier" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              <div style={{ position: 'absolute', bottom: 32, left: 32, padding: '20px 24px', background: 'rgba(12,9,8,0.88)', backdropFilter: 'blur(12px)' }}>
                <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bordeaux)' }}>SEIT 2014 · BERLIN</span>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>ÜBER VINA</p>
              <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, fontSize: 'clamp(2rem, 4vw, 4.5rem)', color: 'var(--off-white)', marginBottom: 40 }}>
                HINTER JEDEM RAUM<br /><span style={{ color: 'rgba(244,240,234,0.25)' }}>STEHT EIN KONZEPT.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 16, lineHeight: 1.9, color: 'rgba(244,240,234,0.55)', marginBottom: 24 }}>
                VINA LADENBAU ist ein Berliner Studio für Ladenbau, Innenarchitektur und Retail Design. Wir entwickeln individuelle Raumkonzepte für Einzelhandel, Gastronomie und Bäckereien — von der ersten Idee bis zur schlüsselfertigen Übergabe.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 16, lineHeight: 1.9, color: 'rgba(244,240,234,0.55)', marginBottom: 32 }}>
                Unser Ansatz: Jeder Raum erzählt eine Geschichte. Wir sorgen dafür, dass es die richtige ist — funktional, ästhetisch, nachhaltig und auf Ihre Marke zugeschnitten.
              </p>
              <div style={{ padding: '28px 32px', background: 'rgba(244,240,234,0.03)', borderLeft: '2px solid var(--bordeaux)', marginBottom: 48 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 15, lineHeight: 1.85, color: 'rgba(244,240,234,0.6)' }}>
                  Geleitet wird VINA von einem Innenarchitekten mit über <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>26 Jahren Erfahrung</strong> in Innenarchitektur und Ausbau, promoviert im Bereich Architektur an der <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>TU Berlin</strong>. Jedes Projekt wird persönlich betreut — vom ersten Gespräch bis zur Übergabe.
                </p>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 32, height: 1, background: 'var(--bordeaux)' }} />
                <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,240,234,0.4)' }}>Colditzstraße 27–29 · 12099 Berlin</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid rgba(244,240,234,0.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }} className="grid-cols-1 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>FAQ</p>
            <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', color: 'var(--off-white)' }}>HÄUFIGE<br />FRAGEN.</h2>
          </Reveal>
          <Reveal delay={100}>
            <div>
              {FAQS.map((f, i) => (
                <div key={f.q} style={{ borderTop: '1px solid rgba(244,240,234,0.08)' }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
                      padding: '28px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em', color: open === i ? 'var(--off-white)' : 'rgba(244,240,234,0.65)', transition: 'color 0.3s' }}>{f.q}</span>
                    <span style={{ color: 'var(--bordeaux)', fontSize: 20, flexShrink: 0, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                  </button>
                  <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.45s var(--ease)' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: 'rgba(244,240,234,0.5)', paddingBottom: 28 }}>{f.a}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(244,240,234,0.08)' }} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  const FIELD: React.CSSProperties = {
    width: '100%', padding: '16px 20px', background: 'rgba(244,240,234,0.04)',
    border: '1px solid rgba(244,240,234,0.1)', color: 'var(--cream)',
    fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="kontakt" style={{ padding: '120px 0', background: 'var(--dark)', borderTop: '1px solid rgba(244,240,234,0.06)', position: 'relative', overflow: 'hidden' }}>
      <img src={U('1524758631624-e2822e304c36', 1600)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, transparent, var(--bordeaux), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <Reveal style={{ marginBottom: 96 }}>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>KONTAKT</p>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, fontSize: 'clamp(2.4rem, 6vw, 7rem)', color: 'var(--off-white)' }}>
            LASSEN SIE UNS<br /><span style={{ color: 'rgba(244,240,234,0.25)' }}>IHREN RAUM PLANEN.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }} className="grid-cols-1 lg:grid-cols-2">
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              {[
                { label: 'E-MAIL', val: 'info@vinaladenbau.de', href: 'mailto:info@vinaladenbau.de' },
                { label: 'TELEFON', val: '+49 (0) 176 422 09 522', href: 'tel:+491764220952' },
                { label: 'ADRESSE', val: 'Colditzstraße 27–29\n12099 Berlin', href: undefined },
              ].map(c => (
                <div key={c.label}>
                  <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 12 }}>{c.label}</p>
                  {c.href ? (
                    <a href={c.href} style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: 18, color: 'var(--off-white)', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(244,240,234,0.5)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--off-white)')}
                    >{c.val}</a>
                  ) : (
                    <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: 18, color: 'var(--off-white)', letterSpacing: '-0.01em', whiteSpace: 'pre-line' }}>{c.val}</p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 20, textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--bordeaux)' }} className="clip-facet-sm">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--bordeaux)" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: 24, color: 'var(--off-white)' }}>Vielen Dank.</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(244,240,234,0.4)' }}>Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ihr Name" style={FIELD}
                    onFocus={e => (e.target.style.borderColor = 'var(--bordeaux)')} onBlur={e => (e.target.style.borderColor = 'rgba(244,240,234,0.1)')} />
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="E-Mail" style={FIELD}
                    onFocus={e => (e.target.style.borderColor = 'var(--bordeaux)')} onBlur={e => (e.target.style.borderColor = 'rgba(244,240,234,0.1)')} />
                </div>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Telefon (optional)" style={FIELD}
                  onFocus={e => (e.target.style.borderColor = 'var(--bordeaux)')} onBlur={e => (e.target.style.borderColor = 'rgba(244,240,234,0.1)')} />
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ ...FIELD, color: form.type ? 'var(--cream)' : 'rgba(244,240,234,0.35)' }}>
                  <option value="">Projekttyp auswählen</option>
                  {['Laden', 'Restaurant', 'Bäckerei', 'Supermarkt', 'Büro', 'Sonstiges'].map(t => (
                    <option key={t} style={{ background: 'var(--dark)' }}>{t}</option>
                  ))}
                </select>
                <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Ihr Projekt — kurze Beschreibung" rows={5} style={{ ...FIELD, resize: 'none' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--bordeaux)')} onBlur={e => (e.target.style.borderColor = 'rgba(244,240,234,0.1)')} />
                <button type="submit" className="clip-facet-sm" style={{
                  padding: '20px', background: 'var(--bordeaux)', color: 'var(--off-white)', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter Tight, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bord-light)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bordeaux)')}
                >PROJEKT STARTEN →</button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '64px 48px 40px', borderTop: '1px solid rgba(244,240,234,0.06)', background: 'var(--black)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap', marginBottom: 64 }}>
          <div>
            <div style={{ marginBottom: 20 }}><Logo height={46} /></div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 13, color: 'rgba(244,240,234,0.35)', maxWidth: 280, lineHeight: 1.7 }}>
              Studio für Ladenbau, Innenarchitektur und Retail Design. Berlin.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 80 }}>
            {[
              { head: 'LEISTUNGEN', links: ['Ladenbau', 'Innenarchitektur', 'Retail Design', 'Gastronomie', 'Bäckereien'] },
              { head: 'UNTERNEHMEN', links: ['Über uns', 'Portfolio', 'Prozess', 'Kontakt'] },
              { head: 'KONTAKT', links: ['info@vinaladenbau.de', '+49 176 422 09 522', 'Colditzstraße 27–29', '12099 Berlin'] },
            ].map(col => (
              <div key={col.head}>
                <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>{col.head}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => <li key={l} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 300, color: 'rgba(244,240,234,0.35)' }}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid rgba(244,240,234,0.06)' }}>
          <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, color: 'rgba(244,240,234,0.25)', letterSpacing: '0.08em' }}>© 2024 VINA LADENBAU. Alle Rechte vorbehalten.</span>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Impressum', 'Datenschutz', 'AGB'].map(l => (
              <span key={l} style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, color: 'rgba(244,240,234,0.25)', cursor: 'pointer', letterSpacing: '0.08em', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(244,240,234,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,240,234,0.25)')}
              >{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  useScrollReveal()

  const handleSelect = useCallback((p: Project) => {
    const idx = PROJECTS.findIndex(x => x.number === p.number)
    setActiveProjectIdx(idx)
    setActiveProject(p)
  }, [])

  const handleNext = useCallback(() => {
    const next = (activeProjectIdx + 1) % PROJECTS.length
    setActiveProjectIdx(next)
    setActiveProject(PROJECTS[next])
  }, [activeProjectIdx])

  const handlePrev = useCallback(() => {
    const prev = (activeProjectIdx - 1 + PROJECTS.length) % PROJECTS.length
    setActiveProjectIdx(prev)
    setActiveProject(PROJECTS[prev])
  }, [activeProjectIdx])

  useEffect(() => {
    const sectionIds = RAIL_SECTIONS.map(s => s.id)
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { threshold: 0.3 }
    )
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])




  // استبدل Services و CostCalculator و PLANUNG_RATES في App.tsx بالكود ده.
// يستخدم نفس الـ helpers الموجودة عندك: U, Reveal, BASE_RATES

// ── Services ──────────────────────────────────────────────────────────────────
function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  const SVCS = [
    { num: '01', title: 'LADENBAU', desc: 'Individuelle Geschäftsräume für Einzelhandel, Gastronomie und Bäckereien — abgestimmt auf Marke, Sortiment und Standort.', img: U('1604335399105-a0c585fd81a1', 800) },
    { num: '02', title: 'INNENBAU', desc: 'Innenausbau und Raumgestaltung aus einer Hand — Materialkonzept, Oberflächen und hochwertige Ausführung.', img: U('1524758631624-e2822e304c36', 800) },
    { num: '03', title: 'MÖBELBAU', desc: 'Maßgefertigte Möbel, Theken und Regalsysteme — passgenau für Ihren Raum und Ihr Konzept.', img: U('1586023492125-27b2c045efd7', 800) },
    { num: '04', title: 'PLANUNG & KONZEPTION', desc: 'Grundriss, Raumaufteilung, Möblierungs- und Ausführungsplanung — die fundierte Basis jedes Projekts.', img: U('1555396273-367ea4eb4db5', 800) },
    { num: '05', title: '3D-VISUALISIERUNG', desc: 'Realistische 3D-Perspektiven, damit Sie Ihren Raum sehen, bevor er entsteht.', img: U('1600607687939-ce8a6c25118c', 800) },
    { num: '06', title: 'MONTAGE', desc: 'Fachgerechte Montage vor Ort durch erfahrene Handwerker — präzise und termingerecht.', img: U('1567521464027-f127ff144326', 800) },
    { num: '07', title: 'PROJEKTKOORDINATION', desc: 'Koordination aller Gewerke und Lieferanten — wir behalten Zeitplan, Qualität und Budget im Blick.', img: U('1556742049-0cfed4f6a45d', 800) },
  ]

  return (
    <section id="leistungen" style={{ padding: '120px 0', borderTop: '1px solid rgba(244,240,234,0.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <Reveal style={{ marginBottom: 80 }}>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>LEISTUNGEN</p>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, fontSize: 'clamp(2rem, 5vw, 5.5rem)', color: 'var(--off-white)', marginBottom: 32 }}>
            LADENBAU &<br /><span style={{ color: 'rgba(244,240,234,0.25)' }}>INNENAUSBAU BERLIN.</span>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 16, lineHeight: 1.9, color: 'rgba(244,240,234,0.6)', maxWidth: 560 }}>
            Wir planen und realisieren individuelle Geschäftsräume von der ersten Idee bis zur schlüsselfertigen Umsetzung.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, alignItems: 'start' }} className="grid-cols-1 lg:grid-cols-[1fr_360px]">
          <div>
            {SVCS.map((s, i) => (
              <div
                key={s.num}
                className="service-row"
                style={{ padding: '28px 0', cursor: 'default', position: 'relative' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
                  <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: hovered === i ? 'var(--bordeaux)' : 'rgba(244,240,234,0.3)', minWidth: 28, transition: 'color 0.3s' }}>{s.num}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: 'clamp(1rem, 2vw, 1.5rem)', letterSpacing: '-0.01em', color: 'var(--off-white)', margin: 0 }}>{s.title}</h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: 'rgba(244,240,234,0.5)', marginTop: 12, maxWidth: 560, opacity: hovered === i ? 1 : 0, maxHeight: hovered === i ? 100 : 0, overflow: 'hidden', transform: hovered === i ? 'translateY(0)' : 'translateY(6px)', transition: 'all 0.4s var(--ease)' }}>{s.desc}</p>
                  </div>
                  <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 12, color: 'var(--bordeaux)', opacity: hovered === i ? 1 : 0, transition: 'opacity 0.3s' }}>→</span>
                </div>
                <span className="bord-line" style={{ marginTop: 16 }} />
              </div>
            ))}
          </div>

          <div className="hidden lg:block" style={{ position: 'sticky', top: 120 }}>
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }} className="clip-facet">
              {SVCS.map((s, i) => (
                <img key={s.num} src={s.img} alt="" loading="lazy" style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                  opacity: hovered === i ? 1 : 0, transform: hovered === i ? 'scale(1)' : 'scale(1.04)',
                  transition: 'opacity 0.6s var(--ease), transform 0.6s var(--ease)',
                }} />
              ))}
              {hovered === null && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark2)' }}>
                  <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(244,240,234,0.2)' }}>HOVER</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Cost Calculator ───────────────────────────────────────────────────────────
// استبدل CostCalculator و PLANUNG_RATES القديمين بالكود ده (خارج App، فوق // ── About).
// وممكن تمسح BASE_RATES لأنه مش مستخدم بعد كده.

// ── Cost Calculator (2D Planung & 3D Visualisierung) ─────────────────────────
const PLANUNG_LEVELS = {
  Basic: {
    rate: 15,
    title: 'Grundriss & Raumaufteilung',
    desc: 'Grundriss, Raumaufteilung und Möblierungsplanung.',
  },
  Standard: {
    rate: 25,
    title: 'Detaillierte 2D-Planung + Ausführungsplanung',
    desc: 'Grundriss, Möblierung, Ansichten und wichtige Details + detaillierte Planung für die Umsetzung inklusive Ansichten und Detailplanung.',
  },
} as const
type PlanLevel = keyof typeof PLANUNG_LEVELS | 'Keine'

const PERSPECTIVE_PRICE = 350
const VIZ_OPTIONS = [
  { id: 'none', label: 'Keine 3D-Visualisierung', n: 0 },
  { id: '2', label: '2 Perspektiven', n: 2 },
  { id: '3', label: '3 Perspektiven', n: 3 },
  { id: '5', label: '5 Perspektiven', n: 5 },
  { id: 'custom', label: 'Individuell', n: -1 },
]

function CostCalculator() {
  const [area, setArea] = useState(150)
  const [planLevel, setPlanLevel] = useState<PlanLevel>('Basic')
  const [viz, setViz] = useState('none')
  const [customN, setCustomN] = useState(4)
  const [empty, setEmpty] = useState(false)
  const [result, setResult] = useState<{ plan: number; viz: number; n: number; total: number; level: PlanLevel; area: number } | null>(null)

  const calculate = () => {
    const plan = planLevel === 'Keine' ? 0 : PLANUNG_LEVELS[planLevel].rate * area
    const opt = VIZ_OPTIONS.find(o => o.id === viz)!
    const n = opt.n === -1 ? Math.max(1, customN) : opt.n
    const vizCost = n * PERSPECTIVE_PRICE
    if (plan + vizCost === 0) { setResult(null); setEmpty(true); return }
    setEmpty(false)
    setResult({ plan, viz: vizCost, n, total: plan + vizCost, level: planLevel, area })
  }

  const fmt = (n: number) => new Intl.NumberFormat('de-DE').format(n)

  const INPUT_STYLE: React.CSSProperties = {
    width: '100%', padding: '14px 20px', background: 'rgba(244,240,234,0.04)',
    border: '1px solid rgba(244,240,234,0.12)', color: 'var(--cream)',
    fontFamily: 'Inter Tight, sans-serif', fontSize: 14, fontWeight: 500, outline: 'none',
  }
  const LABEL: React.CSSProperties = {
    fontFamily: 'Inter Tight, sans-serif', fontSize: 10, letterSpacing: '0.25em',
    textTransform: 'uppercase', color: 'rgba(244,240,234,0.45)', display: 'block', marginBottom: 12,
  }

  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid rgba(244,240,234,0.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>
        <Reveal style={{ marginBottom: 80 }}>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--bordeaux)', marginBottom: 20 }}>KOSTENKALKULATION</p>
          <h2 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.92, fontSize: 'clamp(2rem, 5vw, 5rem)', color: 'var(--off-white)' }}>
            WAS KÖNNTE IHR<br /><span style={{ color: 'rgba(244,240,234,0.25)' }}>PROJEKT KOSTEN?</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="grid-cols-1 lg:grid-cols-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <label style={LABEL}>FLÄCHE IN M²</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <input type="range" min={20} max={800} step={5} value={area} onChange={e => setArea(+e.target.value)} style={{ flex: 1, accentColor: 'var(--bordeaux)' }} />
                <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 22, fontWeight: 700, color: 'var(--cream)', minWidth: 80 }}>{area} m²</span>
              </div>
            </div>

            {/* 2D Planung */}
            <div>
              <label style={LABEL}>2D PLANUNG</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(Object.keys(PLANUNG_LEVELS) as (keyof typeof PLANUNG_LEVELS)[]).map(lv => {
                  const p = PLANUNG_LEVELS[lv]; const on = planLevel === lv
                  return (
                    <button key={lv} onClick={() => setPlanLevel(lv)} style={{
                      textAlign: 'left', padding: '16px 20px', cursor: 'pointer',
                      border: `1px solid ${on ? 'var(--bordeaux)' : 'rgba(244,240,234,0.1)'}`,
                      background: on ? 'rgba(107,17,8,0.12)' : 'rgba(244,240,234,0.02)', transition: 'all 0.25s',
                    }}>
                      <span style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter Tight, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: on ? 'var(--off-white)' : 'rgba(244,240,234,0.6)', marginBottom: 4 }}>
                        <span>{lv}</span><span>{p.rate} €/m²</span>
                      </span>
                      <span style={{ display: 'block', fontFamily: 'Inter Tight, sans-serif', fontSize: 12, color: 'var(--bordeaux)', marginBottom: 6 }}>{p.title}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(244,240,234,0.45)', lineHeight: 1.6 }}>{p.desc}</span>
                    </button>
                  )
                })}
                <button onClick={() => setPlanLevel('Keine')} style={{
                  textAlign: 'left', padding: '12px 20px', cursor: 'pointer',
                  border: `1px solid ${planLevel === 'Keine' ? 'var(--bordeaux)' : 'rgba(244,240,234,0.1)'}`,
                  background: planLevel === 'Keine' ? 'rgba(107,17,8,0.12)' : 'rgba(244,240,234,0.02)',
                  fontFamily: 'Inter Tight, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
                  color: planLevel === 'Keine' ? 'var(--off-white)' : 'rgba(244,240,234,0.5)',
                }}>Keine 2D-Planung</button>
              </div>
            </div>

            {/* 3D Visualisierung */}
            <div>
              <label style={LABEL}>3D VISUALISIERUNG — 1 PERSPEKTIVE = {PERSPECTIVE_PRICE} €</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {VIZ_OPTIONS.map(o => {
                  const on = viz === o.id
                  return (
                    <label key={o.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', cursor: 'pointer',
                      border: `1px solid ${on ? 'var(--bordeaux)' : 'rgba(244,240,234,0.1)'}`,
                      background: on ? 'rgba(107,17,8,0.12)' : 'rgba(244,240,234,0.02)',
                      fontFamily: 'Inter, sans-serif', fontSize: 14, color: on ? 'var(--off-white)' : 'rgba(244,240,234,0.6)',
                    }}>
                      <input type="radio" name="viz" checked={on} onChange={() => setViz(o.id)} style={{ accentColor: 'var(--bordeaux)' }} />
                      <span style={{ flex: 1 }}>{o.label}</span>
                      {o.n > 0 && <span style={{ fontSize: 12, color: 'rgba(244,240,234,0.4)' }}>{fmt(o.n * PERSPECTIVE_PRICE)} €</span>}
                    </label>
                  )
                })}
                {viz === 'custom' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 4 }}>
                    <input type="number" min={1} max={30} value={customN} onChange={e => setCustomN(+e.target.value)} style={{ ...INPUT_STYLE, width: 100 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(244,240,234,0.5)' }}>Perspektiven × {PERSPECTIVE_PRICE} €</span>
                  </div>
                )}
              </div>
            </div>

            <button onClick={calculate} className="clip-facet-sm" style={{
              padding: '18px', background: 'var(--bordeaux)', color: 'var(--off-white)', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter Tight, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>KOSTEN BERECHNEN →</button>
          </div>

          <div style={{ padding: '64px 48px', background: 'rgba(244,240,234,0.02)', border: '1px solid rgba(244,240,234,0.06)', minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {result ? (
              <>
                <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(244,240,234,0.4)', marginBottom: 24 }}>UNVERBINDLICHER RICHTWERT</p>
                <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', color: 'var(--off-white)', lineHeight: 1, marginBottom: 28 }}>
                  CA. {fmt(result.total)} €
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(244,240,234,0.6)' }}>
                  {result.level !== 'Keine' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                    <span>2D Planung {result.level} ({result.area} m² × {PLANUNG_LEVELS[result.level as keyof typeof PLANUNG_LEVELS].rate} €)</span>
                    <span>{fmt(result.plan)} €</span>
                  </div>
                  )}
                  {result.n > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                      <span>3D Visualisierung ({result.n} × {PERSPECTIVE_PRICE} €)</span>
                      <span>{fmt(result.viz)} €</span>
                    </div>
                  )}
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 13, color: 'rgba(244,240,234,0.4)', lineHeight: 1.7, marginBottom: 32 }}>
                  Alle Angaben ohne Gewähr — für ein genaues Angebot kontaktieren Sie uns.
                </p>
                <button onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })} style={{
                  display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontFamily: 'Inter Tight, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bordeaux)',
                }}>ANGEBOT ANFRAGEN <span>→</span></button>
              </>
            ) : (
              <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 300, fontSize: 18, color: 'rgba(244,240,234,0.2)' }}>{empty ? 'Bitte wählen Sie mindestens eine Leistung aus.' : 'Ihre Schätzung erscheint hier nach der Berechnung.'}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
  return (
    <div style={{ background: 'var(--black)', color: 'var(--cream)', minHeight: '100vh' }}>
      <ProjectStyles />
      <GrainOverlay />
      <ProgressRail active={activeSection} />
      <Navbar />
      <Hero />
      <Manifesto />
      <ProjectShowcase onSelect={handleSelect} />
      <Services />
      <Process />
      <WhyUs />
      <Clients />
      <Reviews />
      <CostCalculator />
      <About />
      <FAQ />
      <Contact />
      <Footer />

      {activeProject && (
        <ProjectLightbox
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  )
}