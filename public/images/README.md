# Bilder for Pizzavera Nettside

## 📸 Erstatt placeholder-bildene

Nettsiden bruker for øyeblikket **midlertidige bilder fra Unsplash**. 
For beste resultat, erstatt disse med dine egne restaurantbilder.

## 🖼️ Hvordan legge til egne bilder:

### Alternativ 1: Lagre bilder direkte (Anbefalt)
1. Last ned eller ta bilder av maten og restauranten din
2. Gi bildene følgende navn:
   - `pizza.jpg`
   - `kebab.jpg`
   - `burger.jpg`
   - `salad.jpg`
   - `restaurant.jpg`
3. Kopier bildene til denne mappen: `F:\Scripts\pizzavera\public\images\`
4. Oppdater HTML til å bruke lokale bilder (se under)

### Alternativ 2: Oppdater HTML til lokale bilder
Når du har lagt til bildene, endre i `index.html`:

**Fra:**
```html
<img src="https://images.unsplash.com/..." alt="Pizza">
```

**Til:**
```html
<img src="/images/pizza.jpg" alt="Pizza">
```

## 📐 Anbefalte bildedimensjoner:

1. **pizza.jpg** - Bilde av pizza (American Pan pizza)
2. **kebab.jpg** - Bilde av kebab
3. **burger.jpg** - Bilde av burger/fastfood
4. **salad.jpg** - Bilde av salat
5. **restaurant.jpg** - Bilde av restauranten (utside/inside)

### Anbefalte dimensjoner:
- **Bredde**: 800-1200px
- **Høyde**: 600-900px
- **Aspect ratio**: 4:3 eller 16:12
- **Format**: JPG eller PNG (JPG anbefales for mindre filstørrelse)
- **Filstørrelse**: Under 500KB per bilde (komprimer hvis nødvendig)

## 🎨 Tips for gode bilder:

- ✅ Bruk høy oppløsning (men ikke for store filer)
- ✅ God belysning
- ✅ Appetittvekkende farger
- ✅ Profesjonelt utseende
- ✅ Konsistent stil på alle bilder

## 📦 Ekstra bilder (valgfritt):

Du kan også legge til:
- **logo.png** - Pizzavera logo
- **hero-bg.jpg** - Bakgrunnsbilde for hero-seksjonen
- **restaurant.jpg** - Bilde av restauranten

## 🔗 Hvordan bruke bildene:

Bildene brukes automatisk når de ligger i denne mappen. 
I HTML refereres de som: `/images/bildnavn.jpg`

Eksempel:
```html
<img src="/images/pizza.jpg" alt="Pizza">
```

## 🌐 Placeholder-bilder:

Hvis du ikke har egne bilder ennå, kan du:
1. Laste ned gratis bilder fra:
   - https://unsplash.com/s/photos/pizza
   - https://pexels.com/search/pizza/
   - https://pixabay.com/images/search/pizza/

2. Eller bruke AI-genererte bilder fra:
   - Midjourney
   - DALL-E
   - Stable Diffusion

## ⚠️ Viktig:

- Sørg for at du har rettigheter til å bruke bildene
- Komprimer bilder for bedre laste-hastighet
- Bruk beskrivende filnavn
- Test at bildene ser bra ut på både desktop og mobil
