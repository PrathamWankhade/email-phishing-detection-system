# Frontend — React Phishing Detection UI

React 19 SPA built with Vite, Tailwind CSS (CDN), and Recharts. Features lazy-loaded pages, scroll-reveal animations, and an inline SVG icon system — zero external icon or animation libraries.

## Directory Layout

```
frontend/
└── src/
    ├── components/            # 12 reusable UI components
    │   ├── Navbar.jsx         # Sticky nav with live notification dropdown
    │   ├── Footer.jsx         # Site footer with social links
    │   ├── EmailInput.jsx     # Text area + file upload input
    │   ├── PredictionCard.jsx # Scan result display with risk badge
    │   ├── UploadEmail.jsx    # Drag-and-drop .txt/.eml uploader
    │   ├── Icon.jsx           # 30 inline Material-style SVG icons
    │   ├── ConfidenceScore.jsx # Circular ring confidence meter
    │   ├── RiskMeter.jsx      # Vertical risk level gauge
    │   ├── ThreatReasons.jsx  # AI explanation bullet list
    │   ├── Skeleton.jsx       # Loading placeholder
    │   ├── Loader.jsx         # Spinner overlay
    │   └── ScrollToTop.jsx    # Scrolls to top on route change
    ├── pages/                 # 5 lazy-loaded route pages
    │   ├── Home.jsx           # Landing page (hero, features, stats)
    │   ├── Scanner.jsx        # Dedicated email scanner
    │   ├── Dashboard.jsx      # Analytics + scan history table
    │   ├── Analytics.jsx      # Detailed trend visualization
    │   └── Contact.jsx        # Contact form + FAQ accordion
    ├── hooks/
    │   ├── useScrollReveal.js # IntersectionObserver-based reveal
    │   └── useCountUp.js      # Animated number counter
    ├── services/
    │   └── api.js             # API client with local fallback logic
    └── styles/
        ├── global.css         # Base styles, fonts, selection colors
        └── animations.css     # 40+ keyframes + animation utility classes
```

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, feature grid, workflow, stats |
| `/scanner` | Scanner | Paste/upload email for scanning |
| `/dashboard` | Dashboard | Analytics cards, charts, scan history table |
| `/analytics` | Analytics | Detailed trend charts with filtering |
| `/contact` | Contact | Contact form, info cards, FAQ accordion |

Routing uses `HashRouter`. All pages are lazy-loaded via `React.lazy()`.

## Styling

- **Tailwind CSS** loaded via CDN (`cdn.tailwindcss.com`) with a custom config in `index.html`
- Custom color palette: `primary`, `safe`, `suspicious`, `danger`, `surface`, `text`
- Custom shadows: `shadow-card`, `shadow-card-hover`, `shadow-elevated`, `shadow-elevated-lg`
- 40+ `@keyframes` in `animations.css` — fade, slide, scale, float, pulse, shimmer, ripple
- Hardware-accelerated transitions via `will-change` and `transform`/`opacity`-only animations

## Development

```bash
npm run dev          # Dev server on port 3000
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

## Build Output

- 6 JS chunks (5 pages + shared), ~262 kB initial, ~81 kB gzipped
- Single CSS file with all animation keyframes
- No external font/icon CDN dependencies in production
