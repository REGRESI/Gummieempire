# bärly Bild-Prompts

Fertige Prompts für ChatGPT Image (funktionieren auch in Higgsfield, Midjourney oder Flux). Du suchst dir unten aus, was du brauchst, lädst die markierten Referenzbilder hoch, kopierst den Prompt und ersetzt nur die Felder in `{geschweiften Klammern}`.

Die Prompts sind auf Englisch, weil Bildmodelle damit am stabilsten arbeiten. Texte, die **im Bild** stehen sollen (Headlines, Preise), sind auf Deutsch.

## Schnellfinder

| Ich brauche … | Datei | Prompt-IDs |
| --- | --- | --- |
| Einen Bären in neuer Pose oder Szene | [01-charaktere.md](01-charaktere.md) | `C-GLOW-…`, `C-FLEX-…`, `C-SNOOZY-…`, `C-DAILY-…`, `C-CREW-…` |
| Charakterkarte für die Box | [01-charaktere.md](01-charaktere.md) | `C-*-05` |
| Packshot aus anderem Winkel, offene Dose, Gummies in Nahaufnahme | [02-produktbilder.md](02-produktbilder.md) | `P-01` bis `P-06` |
| Lifestyle-Foto für die Website (Slot „Ein Tag mit der Crew“) | [02-produktbilder.md](02-produktbilder.md) | `P-07` |
| Bilder für die Bundle-Produktseiten (Crew, Morgen & Abend) | [02-produktbilder.md](02-produktbilder.md) | `P-10`, `P-11` |
| Crew-Box, Unboxing, Nachfüller, Konzeptbilder für Supplier oder Boxenhersteller | [03-box-und-verpackung.md](03-box-und-verpackung.md) | `B-01` bis `B-09` |
| Image Ads für Meta, TikTok, Pinterest | [04-ads.md](04-ads.md) | `A-01` bis `A-18` |
| Black-Week-Motive | [04-ads.md](04-ads.md) | `A-13` bis `A-15` |
| KI-Avatar erstellen (Lina, Kian, Mila, Jule) | [05-avatare.md](05-avatare.md) | `AV-00` (in Higgsfield: `ki-content/01-avatare.md`) |
| KI-Avatar: Profilbild, Video-Startbild, Unboxing, Duo, Black Week | [05-avatare.md](05-avatare.md) | `AV-01` bis `AV-07` |
| KI-Avatar mit Dose (Feed-Fotos) | `ki-content/04-bild-prompts.md` (Branch `claude/ki-influencer-skripte-g70x6l`) | Teil A |
| Einzelne Bausteine zum Selbstbauen | [00-bausteine.md](00-bausteine.md) | `[STIL-…]`, `[BÄR-…]`, `[DOSE-…]`, `[GUMMI]` |

## Referenzbilder: was du hochlädst

Jeder Prompt beginnt mit einer Zeile **Hochladen:**. Die Kürzel bedeuten:

| Kürzel | Datei | Woher |
| --- | --- | --- |
| `R-DOSE-GLOW` · `R-DOSE-FLEX` · `R-DOSE-SNOOZY` · `R-DOSE-DAILY` | `assets/products/<sorte>-front.webp` | Repo (freigegebene Packshots) |
| `R-BÄR-GLOW` · `R-BÄR-FLEX` · `R-BÄR-SNOOZY` · `R-BÄR-DAILY` | `assets/characters/<sorte>.webp` | Repo (freigegebene Charaktere) |
| `R-BIBLE-<SORTE>` | Character-Bible-Board der Sorte (Turnaround, Mimik) | Dein Asset-Paket. Im Repo ist nur der Platz dafür reserviert (`assets/canonical/references/characters/`). Wenn du es hast: zusätzlich hochladen, dann trifft das Modell Seiten- und Rückansichten besser. |
| `R-GUMMI-<SORTE>` | Dein Foto der echten Gummies dieser Sorte | Supplier-Sample oder Supplier-Foto. Form und Farbe der Gummies kommen immer von hier, nie aus dem Prompt. |
| `R-BOX` | Foto oder Entwurf der Außenbox | Sobald es eine gibt (oder ein Ergebnis aus `B-01`, das du freigegeben hast) |
| `R-NACHFÜLLER` | Foto des Nachfüllbeutels | Sobald es einen gibt |
| `R-AVATAR-<NAME>` | Das freigegebene Gesichtsbild des Avatars | Character Sheet aus Higgsfield oder Ergebnis aus `AV-00`, einmal erzeugen und dann immer wieder hochladen |
| `R-SKINCARE` | Produktfoto des Skincare-Partnerprodukts | Kommt aus dem Skincare-Thread |

Herunterladen aus GitHub: Datei im Repo öffnen, dann oben rechts auf „Download raw file“. ChatGPT nimmt `.webp` direkt an.

## Ablauf in ChatGPT Image

1. Neuen Chat öffnen (alte Chats ziehen frühere Bilder als Stil mit).
2. Referenzbilder aus der Zeile **Hochladen** anhängen, in der angegebenen Reihenfolge.
3. Prompt einfügen, `{Felder}` ersetzen, senden.
4. Passt fast alles: im selben Chat nur die Korrektur schreiben, z. B. `Same image, keep everything identical, only make the lid 10 % lighter.` Nicht den ganzen Prompt neu schicken.
5. Etikett verschwommen oder Schrift falsch: siehe „Wenn das Etikett nicht stimmt“ unten.

## Formate

| Wofür | Seitenverhältnis | Im Prompt |
| --- | --- | --- |
| Instagram/Facebook Feed, Website-Lifestyle | 4:5 | `Format: vertical 4:5` |
| Stories, Reels, TikTok, Video-Startbild | 9:16 | `Format: vertical 9:16` |
| Feed quadratisch, Meta-Karussell | 1:1 | `Format: square 1:1` |
| Pinterest | 2:3 | `Format: vertical 2:3` |
| Website-Banner, YouTube | 16:9 | `Format: horizontal 16:9` |

## Regeln für alle Bilder

Die gleichen wie in `assets/ASSETS.md`, damit Content und Shop zusammenpassen:

- Produkt zuerst, Bär als zweite Ebene. Erwachsen, ruhig, hochwertig.
- Gummies nie als Snack in großen Mengen: höchstens die Tagesportion (2 Stück) plus ein paar Deko-Gummies, keine Haufen, keine Schüssel.
- Dose und Bär exakt wie in den Referenzen: Etikett, Farben, Logo, Krone, Brillen, Mütze, Hoodie bleiben, wie sie sind.
- GLOW nicht „Main Character“ nennen (der neue Rollenname kommt aus dem Shop-Thread).
- Texte im Bild: nur Aussagen, die auch im Shop stehen (`brand.js`, Feld `claim`/`cardClaim`). Keine Heilversprechen wie „heilt“, „garantiert“, „gegen“.

## Wenn das Etikett nicht stimmt

Bildmodelle schreiben Etiketten oft leicht falsch („bärly“ ohne Umlaut, verschobene Zutaten). Drei Wege, in dieser Reihenfolge:

1. Im selben Chat: `Keep the image, but copy the jar label exactly from the reference photo, letter by letter. The logo reads "bärly" with umlaut.`
2. Dose kleiner oder angeschnitten im Bild platzieren (`jar label partly turned away`), dann fällt es nicht auf.
3. Bild mit Dose erzeugen, danach in Canva oder Photoshop den echten Packshot (`assets/products/…`) über die Dose legen. Bei Ads, die laufen sollen, ist das der sicherste Weg.

## Was die Website nimmt

Die Website zeigt weiterhin nur die freigegebenen Dateien aus `assets/`. Generierte Bilder sind für Social, Ads, Creator-Briefings und die Supplier-Anfrage. Ausnahme: Lifestyle-Fotos aus `P-07` und Bundle-Bilder aus `P-10`/`P-11` kannst du nach deiner Freigabe in den Shop übernehmen (Ablage siehe dort).
