Design-Brief — HABIBI, Straubing (v2)

Gestalte eine vollständige Restaurant-Website für HABIBI — eine kraftvolle, energiegeladene arabische Street-Food-Marke in Straubing. Ziel: kein generisches Foodtruck-Template, sondern eine Marke mit echtem Charakter — laut, selbstbewusst, appetitanregend, mit dem "Straße trifft Streetstyle"-Gefühl von @habibi.straubing, aber handwerklich sauber umgesetzt wie ein Premium-Produkt.

Leitidee — "Die Flamme." Ein wiederkehrendes visuelles Signal zieht sich durch die Seite: eine feine goldene Flammen-/Grill-Linie, die Übergänge markiert, den aktiven Bestellschritt unterstreicht und beim Hover an Produktkarten aufflackert. Kein Standard-Glow — sie soll wirken wie echte Hitze, nicht wie ein UI-Effekt.

---

Marken-Charakter — "Der Habibi-Typ"

Die Marke hat ein Gesicht: eine echte, comedy-artige Persönlichkeit (siehe Referenz-Posts wie das "Syrisches Frühstück"-Poster) — direkt in die Kamera zeigend, übertriebene Mimik, Text in Großbuchstaben mit Ausrufezeichen, Community-Ansprache ("SCHREIBT ES IN DIE KOMMENTARE!"). Das muss sich auf der Website widerspiegeln, nicht nur auf Social Media:

- Ton der Microcopy darf frech und übertrieben sein, nicht nur appetitanregend — z. B. Badge-Texte wie „ENDLICH DA 🔥" oder „PROBIER'S, HABIBI" statt neutraler Standardformulierungen.
- Ein Foto/Cutout des Charakters (freigestellt, auf ihn zeigend) kann in der Hero- oder Über-uns-Sektion als wiederkehrendes Element auftauchen — z. B. als Ausrufe-Element neben einem CTA ("DAS musst du probieren").
- Bestseller-Badges und Ansagen dürfen comic-artig übertrieben sein (große Schrift, leicht schräg gestellt, wie ein handgeschriebener Ausruf) statt steril und clean.
- Optional: ein wiederkehrendes Sticker-Element (wie ein Zeigefinger-Icon oder Sprechblase) als running Gag über die Seite verteilt.

---

Farb- & Typografie-System

| Token | Wert |
|---|---|
| Hintergrund | `#0D0D0D` |
| Karten | `#1A1A1A` |
| Karten (erhöht/hover) | `#232323` |
| Gold-Akzent | `#FFB800` |
| Gold-Akzent (gedämpft) | `#B8860B` |
| Text Primär | `#FFFFFF` |
| Text Sekundär | `#AAAAAA` |
| Erfolg | `#22C55E` |
| Fehler | `#EF4444` |

- Überschriften: Bebas Neue — groß, fett, mit Luft dazwischen (Letter-Spacing), nie eng gequetscht.
- Fließtext / UI: Inter oder DM Sans.
- Preise & Zahlen: leicht abgesetzt (Tabular Figures), damit die Speisekarte wie eine echte Karte wirkt, nicht wie eine Liste.
- Rastersystem: 8px-Spacing-Grid. Eckenradius 12px (Karten), 8px (Buttons). Schatten: dunkler Basis-Schatten + goldenes Leuchten bei Hover — sparsam einsetzen, nicht auf jedem Element.

---

1. Navigationsleiste
Logo links (goldbetont), Links mittig: Speisekarte · Über uns · Kontakt. Rechts: Sprachwechsler (DE/EN) + Warenkorb-Icon mit Artikelzähler (goldener Badge). Sticky, dunkler Hintergrund mit leichtem Blur beim Scrollen — nicht abrupt, sondern weich einblendend.

---

2. Hero-Bereich — muss lebendig sein UND Sound haben

Vollbild, cinematisch, mit spürbarer Bewegung — das soll sich anfühlen, als stünde man direkt am Grill, nicht wie ein stilles Werbebild:

- Bewegtbild-Hero mit Ton: kurzes Loop-Video (Shawarma-Spieß dreht sich, Flammen lodern, Fleisch wird geschnitten, Messer schabt am Spieß) — mit echtem Ambiente-Sound: das Zischen des Grills, das Schaben des Messers, im Hintergrund gedämpfte Straßen-/Marktgeräusche aus der Region, und optional ein kurzer, warmer Zuruf „Habibi!" als Signature-Sound-Moment beim Laden der Seite.
- Da Browser Autoplay mit Ton i. d. R. blocken: Video startet stummgeschaltet mit einem auffälligen, goldenen Sound-Icon/Button („🔊 Ton an") — animiert (leichtes Pulsieren), damit Besucher aktiv einschalten. Sobald aktiviert, bleibt die Einstellung für die Sitzung erhalten.
- Falls kein Video verfügbar: animierter Hero mit Ken-Burns-Effekt (langsames Zoomen/Schwenken über mehrere Food-Bilder im Wechsel) plus Partikel-Funken, die aufsteigen, und eine subtile Hitzeflimmer-Verzerrung am unteren Bildrand — plus optionalem kurzen Ambient-Loop im Hintergrund (Grillzischen), ebenfalls mit Sound-Toggle.
- Beim Scrollen: Parallax auf Hero-Bild/Video (leicht verlangsamt), Titel faded langsam aus, ein Gewürz-/Funken-Partikeleffekt löst sich auf. Ton blendet beim Verlassen des Hero-Bereichs sanft aus.

Titel (groß, fett, Bebas Neue):
> HABIBI — ARABISCHE SHAWARMA

Untertitel:
> Frisch vom Spieß, mit Feuer serviert. Straubings authentischster Shawarma-Geschmack — jetzt in wenigen Klicks bei dir.

Buttons:
- Jetzt Bestellen (gold, gefüllt, mit leichtem Magnet-Effekt zum Cursor)
- Zur Speisekarte (transparent, goldener Rand)

---

3. Bestellart-Auswahl
Drei gleich große dunkle Karten: Abholung | Lieferung | Vor Ort essen — je mit Icon, Titel, kurzer Beschreibung. Aktiver/Hover-Zustand: goldener Rand + feines Flammen-Glimmen am Kartenrand statt generischem Schatten.

---

4. Menü — mit echten Kategorien, kompakte Karten

Horizontal scrollbare Kategorie-Tabs oben, aktiver Tab golden unterstrichen:

Shawarma · Brosted Chicken · Burger & Wraps · Beilagen · Salate · Soßen · Getränke · Desserts

Darunter Produktraster mit kleinen, kompakten Karten (nicht die großen, breiten Karten aus v1) — mehr Produkte gleichzeitig sichtbar, dichteres Grid (z. B. 4–5 pro Reihe auf Desktop statt 3): kleineres Foto oben (quadratisch oder 4:3, satte Farben, dampfend/frisch), Name + sehr kurze Beschreibung (max. 1 Zeile) + Preis, kompakter „In den Warenkorb"-Button (gold, klein). Karten: 12px Radius, goldenes Aufflackern bei Hover statt reinem Schattenwurf.

Hinweis: Der interaktive „Baue deinen Teller"-Konfigurator aus der ersten Version entfällt — kein Fleisch/Soße/Extra-Builder. Stattdessen bleibt es bei klassischen, klar definierten Menüpunkten mit festen Preisen.

---

5. Bestseller / Highlights
Kompaktes Raster der Top-Produkte (gleiche kleine Kartengröße wie im Menü, nicht großformatig). Fette Badges oben links: „BESTSELLER 🔥" oder „NEU" — Badge in Gold mit dunklem Text für maximalen Kontrast.

---

6. So funktioniert's
3 Schritte horizontal, große goldene Nummern, kurzer Text, minimalistisches Icon:
1. Gericht auswählen
2. Online bestellen
3. Abholen oder liefern lassen

---

7. Über uns
Zweigeteiltes Layout: links großes dramatisches Bild (Team beim Grillen / Spieß in Aktion, gerne auch der „Habibi-Typ" selbst, ausdrucksstark posierend), rechts Markenstory. Ton — persönlich, nicht werblich:

> „Seit Jahren servieren wir dir die authentischste Shawarma in Straubing — mit Liebe, Qualität und dem gewissen HABIBI-Feeling. Jeder Spieß, jede Soße, jedes Brot: gemacht, um dich zurückzuholen."

---

8. Kundenbewertungen
Dunkle Karten, goldene Sternebewertung, Kundenname, kurzes Zitat — Google-Reviews-Stil. 3 Karten nebeneinander auf Desktop, horizontal scrollbar auf Mobile.

---

9. Footer
Logo + Instagram-Link prominent (goldenes Icon, größer als die anderen), weitere Social-Media-Icons. Adresse, Telefonnummer, Öffnungszeiten. Rechtliche Links: Impressum · Datenschutz · AGB. Dunkler Hintergrund, goldene Akzente, feine Trennlinien statt Kästen.

---

Warenkorb & Bestellablauf

Warenkorb (Slide-in-Panel von rechts):
Artikelliste mit Bild, Name, Mengensteuerung (– / +), Einzelpreis. Trennlinie. Gutschein-Code-Feld. Liefergebühr-Zeile (nur bei Lieferung). Gesamtbetrag fett in Gold. Großer goldener Button unten: „Zur Kasse".

Checkout-Seite:
Fortschrittsanzeige oben: Warenkorb → Daten → Zahlung → Bestätigung. Bestellart-Auswahl oben. Formular: Vorname, Nachname, E-Mail, Telefon, Straße + Hausnummer, PLZ, Stadt (bei Lieferung), Tischnummer (nur bei Vor-Ort). Zahlungsmethoden als auswählbare Karten: Kreditkarte | Klarna | PayPal | Bar bei Lieferung. Rechte Seite sticky: Bestellübersicht + Gesamtbetrag. Großer Button unten: „Jetzt bezahlen".

Bestätigungsseite:
Großes goldenes Checkmark-Icon mit kurzer Flammen-Partikelanimation. Text: „Danke, Habibi! Deine Bestellung ist eingegangen." Bestellnummer + geschätzte Wartezeit. Button: „Zurück zur Startseite".

---

Mikro-Interaktionen & Bewegung
- Magnetische Buttons (leichte Anziehung zum Cursor bei den primären CTAs).
- Fade-up-Reveal beim Scrollen, gestaffelt pro Sektion.
- Kartenskalierung + goldenes Kantenleuchten bei Hover.
- Animierte Zähler (z. B. Anzahl zufriedener Kunden) beim Einscrollen.
- Sanftes Scrollverhalten überall; „prefers-reduced-motion" respektieren (inkl. Auto-Stopp von Sound/Video-Loop).

---

Responsive / Mobile
Mobile-First. Sticky goldener „Jetzt Bestellen"-Button am unteren Bildschirmrand. Hamburger-Menü oben rechts. Einspaltige oder zweispaltige kompakte Produktkarten (klein, nicht großformatig). Wischbare Kategorie-Tabs. Checkout als vollständige Seite (kein Split-Layout auf Mobile). Hero-Video/Animation bleibt aktiv, Sound-Toggle gut sichtbar und leicht antippbar, Overlay wird dunkler für bessere Lesbarkeit auf kleinen Screens.

---

Ton der Texte
Direkt, hungrig-machend, stolz auf die eigene Herkunft, mit einer Prise frecher Comedy — wie ein Freund, der dir lautstark sagt „das MUSST du probieren, Habibi!", nicht wie eine Speisekarten-PDF. Vermeide Floskeln wie „höchste Qualität" oder „seit Generationen" ohne Substanz — jede Zeile soll Lust auf das Essen machen und den frechen Markencharakter transportieren.