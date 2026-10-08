# bärly Launch-Fahrplan: 9.10. bis Montag 12.10.2026

Stand: 8.10.2026, abends. Dieses Dokument ist die Übersicht über alle Baustellen. Die Details stehen jeweils im Branch, PR oder Thread der Baustelle. Wer etwas erledigt hat, hakt es hier ab.

**Ziel:** Montag, 12.10., verkaufen. Danach nur noch Creator anschreiben und Kooperationen für Black Friday (27.11.) festmachen.

---

## 1. Ist Montag realistisch?

**Ja, als Vorverkauf. Nein, als Verkauf ab Lager.**

Montag schaffen wir: Shop online, Vorbestellung bzw. Founders-Club-Anmeldung läuft, Accounts sind angelegt, die ersten Videos sind hochgeladen, die ersten Creator sind angeschrieben.

Was Montag noch nicht geht, und warum:

| Bremse | Warum | Was wir tun |
| --- | --- | --- |
| Keine Ware | Supplier wird erst morgen angeschrieben. Samples (ca. 7 Tage Versand), Freigabe, Produktion, Versand nach DE. Frühestens Ende Oktober / Anfang November ist echte Ware da. | Montag mit **Vorbestellung** starten (siehe Vorbestell-Plan) oder nur mit **Founders-Club-Warteliste**. Kein Geld vorstrecken, Ware erst bestellen, wenn Vorbestellungen sie decken. |
| Shopify Payments | Die Prüfung von Konto, Ausweis und Bank dauert oft ein paar Tage. | Shopify-Konto **morgen früh** anlegen, damit die Prüfung über das Wochenende läuft. |
| Pflichten als Lebensmittel-Händler | Nahrungsergänzungsmittel müssen vor dem ersten Verkauf beim BVL angezeigt werden, dazu Gewerbe und Registrierung beim Lebensmittelamt. Das macht meist der Inverkehrbringer, also wir, nicht der Supplier. | Morgen klären, was davon schon erledigt ist. Wenn nicht: Anzeige vorbereiten, sobald die finale Rezeptur vom Supplier feststeht. |
| GLOW und SNOOZY | 450 µg Biotin (GLOW) und Melatonin (SNOOZY) sind noch offen, siehe README „Vor dem Launch prüfen“. | Mit dem neuen Supplier die Rezeptur gleich passend festlegen. Bis dahin DAILY und FLEX zuerst (Vorschlag aus dem Vorbestell-Plan). |

**Empfehlung:** Montag mit Founders Club plus Vorbestellung für DAILY und FLEX live gehen, GLOW und SNOOZY als „bald“ zeigen, bis der Supplier die Rezeptur bestätigt. So verdienen die Videos ab Tag 1 Anmeldungen bzw. Vorbestellungen, und nichts muss vorfinanziert werden.

---

## 2. Was es schon gibt und was fehlt

### Schon da (Default-Branch `claude/charming-maxwell-fmxgdw`)

- Startseite mit Hero, Sets, Bären-Finder, Abo, Founders Club, FAQ (`index.html`)
- Produktseiten für GLOW, FLEX, SNOOZY, DAILY mit Abo und Einmalkauf
- Warenkorb im Browser (noch ohne Kasse)
- Freigegebene Bilder: 4 Packshots, 4 Charaktere (`assets/ASSETS.md`)
- Content-Plan (`content.html`) und Verpackungsentwürfe (`verpackung.html`), beide intern
- Character Bible und Texte pro Bär (`brand.js`, `PDP`)

### Fehlt noch

| Was | Wo es gelöst wird |
| --- | --- |
| Echte Kasse (Shopify) | Vorbestell-Plan-Thread, nach Shopify-Konto und Connector |
| Founders-Club-Formular speichert nichts | PR #2, wartet auf Brevo-Adresse |
| Black-Week-Angebot | PR #3 |
| Produktseiten für die Sets | Shop-Thread |
| Gummibär fliegt in den Warenkorb statt Text „Hinzugefügt“ | Shop-Thread |
| GLOW heißt „The Main Character“, neuer Rollenname | Shop-Thread |
| Mobile Schwachstellen | Shop-Thread |
| Lifestyle- und Produktbilder (Box, Gummies, Bären mit Produkt) | Bild-Prompts-Thread, Bilder macht Nico mit ChatGPT Image |
| Supplier mit eigenem Packaging, Samples | Supplier-Thread |
| Skincare-Sortiment ohne Rotlichtmasken, Koop mit bärly | Skincare-Thread |
| KI-Influencer und Skripte | KI-Influencer-Thread |
| Social Accounts, Content, Uploads | Nico, mit Prompts und Skripten aus den Threads |
| Creator-Outreach | TikTok-Shop- und Creator-Thread |

---

## 3. Alle Baustellen

Links zu den Threads öffnen sie direkt im Projekt. „Claude“ heißt: läuft schon, Nico muss nur prüfen oder freigeben.

| # | Baustelle | Status | Was zu tun ist | Wer | Branch / PR / Thread |
| --- | --- | --- | --- | --- | --- |
| 1 | Supplier und Verpackung | läuft | Nachricht an den China-Supplier (Samples, Kleinmenge, Preise, Lieferzeit, Zertifikate, Rezeptur GLOW/SNOOZY). Plan B: Supplify plus größere Außenbox. | Claude schreibt, **Nico schickt ab** | [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeHFtVc6qgxxVfQoSFmr1iBVb) |
| 2 | Shop fertigstellen und mobil polieren | läuft | Set-Produktseiten, Flug-Animation in den Warenkorb, neuer Rollenname für GLOW, Mobile-Fixes | Claude, Nico prüft den Draft-PR | [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeH6sYr6PvMjAEkg63qgbe8Ss) |
| 3 | Black-Week-Angebot (Crew-Bundle) | Draft-PR offen, wird ausgebaut | Crew-Abo erste Lieferung 59,90 €, Banner, Countdown; Koop-Set GLOW × Skincare | Claude, **Nico entscheidet SNOOZY-Frage** | [PR #3](https://github.com/REGRESI/Gummieempire/pull/3), Branch `claude/project-thread-gu1t1d`, [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeHEwDBUM4SC8meH3X7P2MdrB) |
| 4 | Founders-Club-Anmeldungen | fertig gebaut, wartet | Brevo-Formularadresse eintragen, Willkommens-Mail mit 25-%-Code | **Nico** (Brevo-Konto, ca. 10 Min.), dann Claude | [PR #2](https://github.com/REGRESI/Gummieempire/pull/2), Branch `claude/project-thread-8xke6z`, [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeHTJ61fAR4znxCqEeqHwQ2Y2) |
| 5 | Vorbestellung und Shopify | Plan fertig, wartet | 5 offene Entscheidungen im Plan; Shopify-Konto, Connector, Produkte anlegen, Warenkorb an Kasse | **Nico** (Konto, Payments, Rechtstexte, Connector), dann Claude | [Vorbestell-Plan](https://claude.ai/code/artifact/d0a79459-5c7b-4de0-bb55-1685c33d6724), [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeHY5NvRr1p86T6eQv2LMgS2K) |
| 6 | Skincare-Sortiment und Produktresearch | läuft | Rotlicht-Aufsteller statt Masken, Seren, Cremes, Öle; Koop-Produkte für Black Friday | Claude recherchiert, Nico wählt | [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeHL8fMwdEn769Brx2HAcFD9K) |
| 7 | KI-Influencer und Video-Skripte | läuft | Avatar-Profile, Skripte für Higgsfield / Seedance pro Produkt und Plattform | Claude schreibt, Nico generiert | [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeHGYzeoewYQtbVPui46tUjBp) |
| 8 | Bild-Prompts für Produkte und Ads | läuft | Master-Prompts pro Bär, Box, Gummies, Lifestyle, Ads; Nico lädt Referenzbilder dazu hoch | Claude schreibt, Nico generiert | [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeHK536YogsaLDEfzMJGUMxbV) |
| 9 | TikTok-Shop und Creator | läuft | Creator-Liste, Anschreiben, Konditionen ohne Vorabkosten (Provision, Gratisprodukt) | Claude bereitet vor, Nico schreibt an | [Thread](https://claude.ai/code/project/chan_016FpAZYk5dhb7PuFrbTCCeH?thread=cmsg_016FpAZYk5dhb7PuFrbTCCeH81p87EXkn2KKhbjLbC2sdT) |
| 10 | Social Accounts | offen | Siehe Abschnitt 5 | **Nico** | – |
| 11 | Pflichten als Händler | offen | Gewerbe, Registrierung Lebensmittelamt, BVL-Anzeige, Impressum, AGB, Widerruf, Datenschutz | **Nico** | README „Vor dem Launch prüfen“ |
| 12 | Dieser Fahrplan | fertig | Übersicht aktuell halten | Claude | Branch `claude/launch-fahrplan-nl45jo` |

Die Branches der Threads 1, 2 und 6 bis 9 entstehen gerade. Jeder Thread verlinkt seinen Branch bzw. PR in seiner Antwort.

---

## 4. Wartet jetzt schon auf Nico

1. **Brevo-Formularadresse** für den Founders Club ([PR #2](https://github.com/REGRESI/Gummieempire/pull/2)). Ohne sie gehen Anmeldungen ab Montag verloren.
2. **Crew-Bundle und SNOOZY:** Bleibt „Die ganze Crew“ mit SNOOZY das Black-Week-Angebot, oder ein Set ohne SNOOZY? ([PR #3](https://github.com/REGRESI/Gummieempire/pull/3) vs. Vorbestell-Plan)
3. **5 offene Entscheidungen** am Ende des [Vorbestell-Plans](https://claude.ai/code/artifact/d0a79459-5c7b-4de0-bb55-1685c33d6724), vor allem: Warenkorb-Anbindung an Shopify als PR bauen?
4. **Shopify-Konto** anlegen und Shopify-Connector verbinden.
5. **Supplier-Nachricht** abschicken, sobald der Entwurf im Supplier-Thread steht.
6. **Merge-Freigabe** für die Draft-PRs, sobald sie dir passen. Gemergt wird nur auf dein Wort.

---

## 5. Social Accounts: Vorschlag für zwei Handys

Pro Handy zwei Identitäten, jeweils auf Instagram, Facebook (Seite) und TikTok:

| Handy | Account 1 (Marke) | Account 2 (KI-Avatar) |
| --- | --- | --- |
| Handy 1 | **bärly** | Beauty-/Wellness-Avatar, spricht vor allem über GLOW und DAILY |
| Handy 2 | **Skincare-Marke** | Fitness-/Lifestyle-Avatar, spricht über FLEX und Skincare |

- Jeden Account mit eigener E-Mail anlegen, Handle gleich auf allen drei Plattformen.
- Avatar-Accounts: KI-Kennzeichnung in der Bio und beim Posten das Plattform-Label „KI-generiert“ setzen.
- Bio-Link mit Quelle, z. B. `bärly.de/?utm_source=tiktok`, damit PR #2 mitzählt, woher Anmeldungen kommen.
- Erste 1 bis 2 Tage ganz normal nutzen (scrollen, liken, Profil vollständig), dann posten. Neue Accounts, die sofort viel hochladen, bekommen oft wenig Reichweite.

---

## 6. Tagesplan

### Freitag, 9.10. (Fundament)

| Zeit | Nico | Claude |
| --- | --- | --- |
| Morgens | Supplier-Nachricht abschicken (China ist 6 Std. voraus, also früh senden, dann kommt die Antwort noch am selben Tag). | Supplier-Entwurf fertig im Thread |
| Vormittag | Brevo-Konto + Formular → Adresse in PR #2. Shopify-Konto anlegen, Payments-Prüfung starten, Connector verbinden. | Shop-Thread: Set-Seiten, Warenkorb-Animation, Mobile im Draft-PR |
| Mittag | Entscheidungen aus Abschnitt 4 treffen. Klären, ob Gewerbe / Lebensmittelamt / BVL-Anzeige schon erledigt sind. | Bild-Prompts und Skripte fertig in ihren Threads |
| Nachmittag | Social Accounts auf beiden Handys anlegen, Profile, Bios, Profilbilder. Noch nicht posten. | Shopify-Produkte über den Connector anlegen (wenn verbunden) |
| Abends | Draft-PRs im Browser ansehen (Handy + Desktop), Feedback in die Threads | Feedback umsetzen |

### Samstag, 10.10. (Bilder und Avatare)

| Nico | Claude |
| --- | --- |
| Produktbilder mit ChatGPT Image nach den Prompts: Box, Gummies, Bär mit Dose, Lifestyle. Referenzbilder jeweils mit hochladen. | Fertige Bilder in den Shop einbauen (Lifestyle, Set-Seiten) |
| KI-Avatare in Higgsfield anlegen, je einen festen Look speichern | Skripte an die Avatare anpassen |
| Supplier-Antwort lesen → Supplier-Thread | Bei Ja: Packaging-Briefing; bei Nein: Plan B Supplify + Außenbox |
| Shopify: Rechtstexte, Versand, Steuern; Testbestellung | Warenkorb an Shopify-Kasse (wenn freigegeben) |

### Sonntag, 11.10. (Content vorproduzieren)

| Nico | Claude |
| --- | --- |
| Content für die erste Woche: Ziel ca. 3 Videos pro Account und Tag, also gut 80 Clips für 4 Accounts. Realistisch heute: 30 bis 40, Rest unter der Woche. | Captions, Hashtags, Hooks pro Video |
| PRs final ansehen, Merge freigeben | Mergen, Live-Check auf Handy und Desktop |
| Creator-Liste prüfen (aus Creator-Thread) | Anschreiben-Vorlagen fertig |
| Accounts weiter normal nutzen | – |

### Montag, 12.10. (Start)

| Nico | Claude |
| --- | --- |
| Morgens: Shop live schalten (Vorbestellung DAILY + FLEX, Founders Club), selbst eine Testbestellung | Live-Check, Fehler sofort fixen |
| Erste Uploads auf allen Accounts, über den Tag verteilt | Zahlen aus Brevo / Shopify zusammenfassen |
| Erste 20 Creator anschreiben | Antworten mit dir durchgehen |

### Danach (ab 13.10.)

- Täglich posten und Creator anschreiben, Ziel: Kooperationen für Black Friday fest bis Anfang November.
- Supplier-Samples prüfen, sobald da. Erste Produktion erst, wenn Vorbestellungen sie decken.
- GLOW und SNOOZY freischalten, sobald die Rezeptur geklärt ist.
- 9.11. Founders-Vorverkauf, 23.–30.11. Black Week, 27.11. Black Friday (PR #3, Vorbestell-Plan).

---

## 7. Branches im Repo

| Branch | Inhalt |
| --- | --- |
| `claude/charming-maxwell-fmxgdw` | Default, fertige Website. Neue Arbeit immer von hier abzweigen. |
| `claude/project-thread-8xke6z` | PR #2 Founders Club → Brevo |
| `claude/project-thread-gu1t1d` | PR #3 Black Week / Crew-Bundle |
| `claude/launch-fahrplan-nl45jo` | Dieser Fahrplan (`docs/LAUNCH-FAHRPLAN.md`) |
| `baerly/premium-launch-redesign`, `baerly/asset-library` | Alt, PR #1 geschlossen. Nicht mehr verwenden. |
