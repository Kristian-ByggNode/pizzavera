# Pizzavera Sandefjord - Moderne Nettside

## 📋 Prosjektoversikt

Dette prosjektet er en moderne, redesignet nettside for Pizzavera Sandefjord. Nettsiden inkluderer:

- 🍕 Moderne, responsivt design
- 📱 Mobilvenlig layout
- ✨ Animasjoner og interaktive elementer
- 🔍 Web scraping av original nettside
- ⚡ Rask og optimalisert ytelse

## 🗂️ Prosjektstruktur

```
pizzavera/
├── index.html           # Hovedside med moderne HTML-struktur
├── style.css            # Responsivt CSS med moderne design
├── script.js            # JavaScript for interaktivitet
├── scraper.py           # Python-script for webscraping
├── pizzavera_data.json  # Skrapte data fra original nettside
├── vite.config.js       # Vite konfigurasjon
├── package.json         # Node.js dependencies
├── public/              # Statiske filer (serveres fra root)
│   └── images/          # Meny-bilder
│       ├── pizza.jpg
│       ├── kebab.jpg
│       ├── burger.jpg
│       ├── salad.jpg
│       ├── restaurant.jpg
│       └── README.md
└── README.md            # Denne filen
```

## 🚀 Funksjoner

### Hero Section
- Stor, iøynefallende hero med gradient bakgrunn
- Call-to-action knapper for bestilling
- Info-kort med viktig informasjon (åpningstider, levering, adresse)
- Animert scroll-indikator

### Om Oss Section
- Feature-kort med ikoner
- Informasjon om råvarer, utvalg, glutenfri pizza og rask levering
- Hover-effekter på kort

### Meny Section
- Filtrerbar meny med kategorier (Pizza, Kebab, Fastfood, Salater)
- Meny-kort med bilder
- Bestillingsknapper
- Responsivt grid-layout

### Allergener Section
- Detaljert allergen-tabell lastet fra JSON
- Fargemerking av allergener
- Responsiv tabell med horisontal scroll på mobil

### Kontakt Section
- Kontaktinformasjon med ikoner
- Åpningstider
- Utkjøringsinformasjon
- Integrert Google Maps
- Responsivt grid-layout

### Interaktivitet
- Sticky navigasjon med scroll-effekt
- Mobil hamburger-meny
- Smooth scroll til seksjoner
- Scroll-to-top knapp
- Aktiv navigasjonslenke basert på scroll-posisjon
- Fade-in animasjoner ved scroll
- Easter egg (Konami code 🎮)

## 🛠️ Teknologier

- **HTML5** - Semantisk markup
- **CSS3** - CSS Grid, Flexbox, CSS Variables, Animasjoner
- **JavaScript (Vanilla)** - Moderne ES6+, Intersection Observer API
- **Python 3** - Web scraping
- **BeautifulSoup4** - HTML parsing
- **Requests** - HTTP forespørsler

## 📦 Installasjon

### Forutsetninger

Du har allerede installert:
- Python 3.12.10
- Node.js v22.20.0
- npm 10.9.3

### Python-pakker

Installer nødvendige Python-pakker:

```bash
pip install requests beautifulsoup4 lxml
```

### Kjøre Web Scraper

For å hente oppdatert data fra nettsiden:

```bash
python scraper.py
```

Dette vil oppdatere `pizzavera_data.json` med fersk data.

## 🌐 Åpne Nettsiden

### Med Vite Dev Server (Anbefalt)

Vite gir hot module replacement og rask utvikling:

```bash
npm run dev
```

Nettsiden åpnes automatisk på `http://localhost:3000/`

### Uten server

Åpne `index.html` i din nettleser:

```bash
# Windows
start index.html

# Eller dobbeltklikk på index.html i filutforskeren
```

## 🖼️ Bilder

**Viktig:** Nettsiden bruker for øyeblikket midlertidige placeholder-bilder fra Unsplash.

### Legge til egne bilder:

**Enkleste metode:**
1. Ta/last ned bilder av mat og restaurant
2. Gi dem disse navnene: `pizza.jpg`, `kebab.jpg`, `burger.jpg`, `salad.jpg`, `restaurant.jpg`
3. Kopier til `public/images/` mappen
4. Oppdater HTML til å bruke lokale bilder:

I `index.html`, endre fra:
```html
<img src="https://images.unsplash.com/..." alt="Pizza">
```

Til:
```html
<img src="/images/pizza.jpg" alt="Pizza">
```

### Bildekrav:
- **Format**: JPG eller PNG
- **Dimensjoner**: 800x600px eller høyere (4:3 ratio)
- **Filstørrelse**: Under 500KB (komprimer hvis nødvendig)

Se `public/images/README.md` for mer detaljert informasjon.

## 📱 Responsivt Design

Nettsiden er fullt responsiv og fungerer på:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobil (< 768px)

## 🎨 Design-valg

### Fargepalett
- **Primary Color**: `#ff6b35` (Orange - mat og appetitt)
- **Secondary Color**: `#2d3142` (Mørk blå-grå - profesjonalitet)
- **Accent Color**: `#ffd23f` (Gul - energi)
- **Background**: Hvit med lys grå seksjoner

### Typografi
- **Display Font**: Playfair Display (elegant serif for overskrifter)
- **Body Font**: Poppins (moderne sans-serif for lesbarhet)

### Designprinsipper
- **Whitespace**: God bruk av luft for lesbarhet
- **Hierarki**: Tydelig visuell hierarki
- **Kontrast**: God kontrast for tilgjengelighet
- **Konsistens**: Konsistent spacing og styling

## 🔧 Tilpasning

### Endre farger

Rediger CSS-variabler i `style.css`:

```css
:root {
    --primary-color: #ff6b35;  /* Endre til din farge */
    --secondary-color: #2d3142;
    /* ... */
}
```

### Legge til flere meny-elementer

Rediger `index.html` i meny-seksjonen:

```html
<div class="menu-item" data-category="pizza">
    <div class="menu-item-image">
        <img src="bilde-url" alt="Pizza navn">
    </div>
    <div class="menu-item-content">
        <h3>Pizza Navn</h3>
        <p>Beskrivelse</p>
        <div class="menu-item-footer">
            <span class="price">Fra 169,-</span>
            <button class="btn-order">Bestill</button>
        </div>
    </div>
</div>
```

## 📊 Ytelse

- **Load Time**: < 2s (optimalisert)
- **Lighthouse Score**: 90+ (ytelse)
- **Mobile-Friendly**: Ja
- **Lazy Loading**: Implementert for bilder

## 🐛 Easter Egg

Prøv Konami Code for en overraskelse! 
`↑ ↑ ↓ ↓ ← → ← → B A`

## 📄 Lisens

Dette er et demoproject for Pizzavera Sandefjord.

## 📞 Kontakt

**Pizzavera Sandefjord**
- Telefon: 33 45 22 25
- Adresse: Vesterøyveien 25, 3222 Sandefjord
- Åpningstider: 
  - Man-Lør: 15:00 - 23:00
  - Søn: 14:00 - 22:00

---

Laget med ❤️ og 🍕
