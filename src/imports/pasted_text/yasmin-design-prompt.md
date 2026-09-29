# YASMIN Pizza und Fastfood — Kompletter Design-Prompt

Baue eine vollständige, premium Restaurant- und Bestell-Website für **YASMIN Pizza und Fastfood**, Kirchstraße 10, 04552 Borna.

Nutze als **einzige Quelle der Wahrheit** für Logo, Namen, Farben, Adresse, Telefon, WhatsApp, Öffnungszeiten, Kategorien, Produkte, Preise, Angebote und Bestellinformationen ausschließlich YASMINs echtes Logo/Menü/Backend. **Nichts erfinden oder abändern.**

Bestehende Backend-APIs, Auth, Warenkorb-Logik, Checkout-Flow, Bestelllogik und Zahlungsanbindung bleiben **unverändert** — nur das Frontend wird neu gebaut.

---

## 1. Referenzen

- **Struktur & Funktionalität:** https://hakuna-patata.de/en und https://hakuna-patata.de/en/categories — gleiche Seitenarchitektur, gleiche Interaktionsmuster (siehe Abschnitte 5–9 unten).
- **Cinematic Scroll-Erlebnis:** https://cinematic-website-two.vercel.app/en — für den signature Scroll-Build-Moment (Abschnitt 4).
- Branding, Farben, Texte und Produktdaten von Hakuna Patata werden **nicht** übernommen — nur die UX-Muster.

---

## 2. Bilder — nicht verhandelbar

- **Ausschließlich echte, hochauflösende Food-Fotografien.** Keine Emojis, keine Icon-Fonts, keine Illustrationen als Ersatz für Produkt- oder Kategoriebilder.
- Jedes Produktbild muss tatsächlich zum jeweiligen Gericht passen (kein generisches Zufallsbild für einen spezifischen Produktnamen).
- Solange keine echten YASMIN-Fotos vorliegen: hochwertige, passende Stock-Fotos (z. B. Unsplash) als Platzhalter — an genau der Stelle, an der später das echte Foto 1:1 eingesetzt wird.
- Konsistenter Bildstil über alle Karten hinweg (ähnlicher Winkel, ähnliche Beleuchtung, freigestellt oder neutraler Hintergrund).

---

## 3. Design-System

**Farben (YASMIN-Identität):**
- Primär (Rot): `#D42626`
- Sekundär (Orange): `#E8820C`
- Akzent (Gold): `#F5C518`
- Hintergrund (Warmweiß): `#FAFAF8`
- Kontrast (Anthrazit): `#1A1A1A`
- Dunkler Verlauf für Hero/Cinematic-Sektion: `#2D1010`

**Typografie:**
- Überschriften: Barlow Condensed (fett, kraftvoll)
- Fließtext/UI/Preise: Plus Jakarta Sans oder Manrope

**Look & Feel:** warm, appetitanregend, premium — große Food-Fotografie, abgerundete Karten (16–24px), weiche Schatten, dezente Glasmorphism-Akzente (Header beim Scrollen, Badges), rot-orange-goldene Verläufe für Highlights. Nie wie ein generischer Online-Shop.

---

## 4. Animation — überall spürbar, nie übertrieben

- **Seiten-/Sektionseintritt:** `opacity 0→1` + `translateY(16–32px→0)` + leichtes `scale(0.96–0.98→1)`, gestaffelt pro Kind-Element (~60–100ms Versatz).
- **Karten-Hover:** Anheben (`translateY(-4px)`), Bildzoom (`scale(1.04–1.08)`), stärkerer Schatten.
- **Header:** wird beim Scrollen kompakter, bekommt Blur-Hintergrund.
- **Buttons:** kleiner Scale-Bounce beim Klick; primärer CTA mit Shine-Sweep-Effekt beim Hover.
- **Preise/Zähler:** zählen hoch/runter (Count-up) statt hart zu springen.
- **Cinematic Build-Sektion (siehe unten):** eigene, scroll-progress-gesteuerte Animation — kein reines Zeit-basiertes Keyframe.
- `prefers-reduced-motion` wird überall respektiert: Bewegungen auf einfache Opacity-Fades reduzieren, Scroll-Jacking deaktivieren.

---

## 5. Header + Hero

**Header (sticky, transparent → kompakt beim Scrollen):**
YASMIN-Logo · Nav (Startseite, Kategorien, Über uns, Kontakt, FAQ) · Suche · Favoriten · Warenkorb mit Zähler-Badge · Konto.
Direkt darunter: horizontal scrollbare Kategorie-Leiste mit echten Foto-Icons pro Kategorie (siehe Abschnitt 8 für das Scroll-Spy-Verhalten dieser Leiste auf der Kategorien-Seite).

**Hero (cinematic, volle Bildschirmhöhe):**
Dunkler Anthrazit/Rot-Verlauf-Hintergrund, großes Food-Foto mit sanftem Ken-Burns-Zoom, Ember-/Steam-Partikel, cursorgetriebene Parallax auf Glow-Elementen. Überschrift z. B. „PIZZA. DÖNER. LIEBE." mit der mittleren Zeile in animiertem Rot-Orange-Gold-Verlauf. Trust-Badge oben („5.000+ zufriedene Kunden"), Stats-Zeile unten (Lieferzeit, frisch, Abholrabatt). Zwei CTAs: **„Jetzt bestellen"** (primär) / **„Speisekarte entdecken"** (outline).

---

## 6. Cinematic Build-Sektion — „Der Döner entsteht"

Direkt nach dem Hero, vor den Angeboten. Scroll-jacked, gepinnte Sektion (3–4 Viewport-Höhen), Mechanik wie bei cinematic-website-two.vercel.app: Der Nutzer scrollt, und ein Döner/Wrap setzt sich Schicht für Schicht zusammen — jede Bewegung ist eine direkte Funktion des Scroll-Fortschritts (Framer Motion `useScroll`/`useTransform` oder gleichwertig), kein Autoplay.

Beats (an das echte Rezept/Menü anpassen):
- Intro: „Nichts hier wird im Voraus zusammengebaut. Scroll — und sieh zu, wie er entsteht."
- `01 Das Brot` — Fladenbrot wird aufgeschnitten/angewärmt.
- `02 Das Fleisch` — frisch vom Spieß geschnitten.
- `03 Das Gemüse` — Salat, Tomate, Zwiebel, Rotkohl (nur echte Zutaten).
- `04 Die Soße` — nach YASMIN-Rezept.
- Abschluss: Wrap schließt sich, „Jetzt bestellen"-CTA faded ein.
- Scroll-Hinweis: „Scroll zum Zusammenbauen"

Bei `prefers-reduced-motion`: fertig zusammengebautes Bild + die vier Beats als statische Liste darunter, kein Scroll-Jacking.

---

## 7. Startseite — weitere Sektionen

**Angebote/Kombi-Deals:** Label „Angebote" + Überschrift „Zeitlich begrenzte Kombi-Deals!" — Karte mit zwei Produktbildern + „+", Gesamtpreis, Warenkorb-Button; daneben kurzer Anreiz-Text. Nur echte YASMIN-Kombi-Angebote.

**Bestseller:** Label „Bestseller" + Überschrift „Unsere beliebtesten Gerichte" + „Mehr anzeigen". Kompakte Karten (5/Reihe Desktop): Bewertungs-Badge, Bild, Name, Preis, Aufrufe, Mengen-Stepper, Warenkorb-Button.

**Kategorie-Übersicht:** Label „Unsere Kategorien" + „Entdecke unsere Auswahl" + „Mehr anzeigen". Großformatige Bildkarten (2×4), Name unten links, Pfeil-Button unten rechts. Führt zur eigenen Kategorien-Seite (Abschnitt 8).

**Über YASMIN:** editoriale Sektion — Geschichte, Küchen-/Ofenbilder, Team, Statistiken (Jahre geöffnet, Bestellungen, Ø Lieferzeit).

**Bewertungen:** Kundenfotos, Sterne, moderner Slider.

**Galerie:** Masonry-Layout mit Food-/Küchen-/Team-Fotos.

**Newsletter:** dunkle Sektion, warmes Küchen-Ambiente-Hintergrundfoto, E-Mail-Anmeldung + Vorteilsversprechen.

---

## 8. Eigene Kategorien-Seite `/kategorien`

Eine **einzige durchgehende Seite** mit allen Kategorien als Sektionen untereinander — keine separate Ansicht pro Klick.

- Sticky horizontale Icon-Leiste (echte Fotos) direkt unter dem Header.
- Jede Kategorie-Sektion: Überschrift, „X Gerichte verfügbar", Produktgrid (5/Reihe Desktop, animierte Karten wie Abschnitt 4).
- **Bidirektionaler Scroll-Spy, exakt wie hakuna-patata.de/en/categories:**
  - Klick auf ein Kategorie-Icon → sanftes Scrollen zur passenden Sektion, Icon wird sofort aktiv (rot gefüllt).
  - Manuelles Scrollen → per `IntersectionObserver` wird automatisch erkannt, welche Sektion gerade im Viewport ist, und das passende Icon wird oben hervorgehoben — ohne Klick.
  - Kurzer Lock (~600–800ms) nach einem Klick, damit der Observer den programmatischen Scroll nicht sofort überschreibt.
  - Die Icon-Leiste scrollt selbst horizontal mit (`scrollIntoView({ inline: 'center' })`), damit die aktive Kategorie immer sichtbar bleibt.

---

## 9. Warenkorb & Checkout

**Warenkorb:** große Produktbilder, Name, Preis, Mengen-Stepper, Entfernen. Rechte Box: Gutscheincode + Anwenden, „Verfügbare Gutscheine ansehen", Zwischensumme, MwSt. je Steuerkategorie, Gesamtsumme, großer CTA **„Weiter zur Kasse"**, Zahlungs-Icon-Leiste (nur tatsächlich unterstützte Anbieter). Darunter „Passende Produkte für Sie".

**Checkout:** Umschalter „Abholung" / „Lieferung". Bei Abholung: Karte mit YASMINs echtem Standort, Adresse als Text, „So schnell wie möglich (ASAP)" oder Datum/Uhrzeit wählen. Zahlungsart: Toggle „Nach dem Essen bezahlen" (falls unterstützt), Radiobuttons für Karte/PayPal/Apple Pay/Google Pay (nur konfigurierte Methoden), Checkbox Datenschutz/AGB, großer CTA **„Bestellung bestätigen"**. Rechts durchgehend dieselbe Bestellübersicht-Box wie im Warenkorb.

**Bestellbestätigung:** „Danke für Ihre Bestellung", Bestellnummer, geschätzte Zubereitungszeit, aktueller Status, Buttons „Bestellung verfolgen" / „Zur Startseite".

---

## 10. Footer

Logo, Kontakt (Kirchstraße 10, 04552 Borna, echte Telefon-/WhatsApp-Nummer, E-Mail), Öffnungszeiten, Social Links, Datenschutz/AGB, Zahlungsmethoden-Icons.

---

## 11. Technischer Stack

Frontend: React, TypeScript, Tailwind CSS, Framer Motion (Pflicht für Cinematic-Sektion + Scroll-Spy).
Backend: unverändert, bestehende APIs/Business-Logik/Zahlungsanbindung 1:1 weiterverwenden.
Komponentenstruktur: Header · Hero · DoenerBuildSequence · SpecialOffer · BestsellerGrid · CategoryGrid · CategoryPage (mit Scroll-Spy) · MenuCard · Cart · Checkout · Order · Payment · AboutUs · Reviews · Gallery · Newsletter · Footer · FloatingActions.

---

## 12. Sprache

Website komplett auf Deutsch. Kein Englisch, keine gemischt-sprachigen Reste (kein „View more", „Add to cart" etc.). Beispiele für UI-Begriffe: Startseite · Speisekarte · Kategorien · Über uns · Kontakt · Jetzt bestellen · Warenkorb · Zur Kasse · Bestellung überprüfen · Lieferung · Abholung · Zahlungsart · Bestellung abschließen · Bestellung erfolgreich · Bestellnummer · Gesamtbetrag.

---

## 13. Ziel

Eine produktionsreife, deutschsprachige Website für YASMIN Pizza und Fastfood, die sich wie eine premium Restaurant-Marke anfühlt statt wie ein generischer Online-Shop — mit echter Food-Fotografie, durchgängiger, spürbarer Animation, einem cinematic Signature-Moment und exakt der bewährten Struktur/UX von Hakuna Patata, komplett in YASMINs eigener Identität (Rot/Orange/Gold/Anthrazit) und mit YASMINs echten Daten.