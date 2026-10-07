# Canonical bärly assets

This folder is the ONLY allowed visual source for final bärly product and character design.

## Strict rule

- Production code may use only files listed in `manifest.json > canonical.production`.
- Reference boards under `references/` are design guides only and must never be displayed, cropped, or sampled into public website imagery.
- The approved production files from the asset package are `assets/products/<id>-front.webp` and `assets/characters/<id>.webp` (see `manifest.json`). They replaced the earlier generated images with the same names. `assets/products/*-wrap.webp` and `assets/campaign/crew-hero.webp` must not be used.
- If a canonical asset is missing, do not recreate it from CSS, SVG, canvas, packs.js, mascots.js, AI, or crops. Keep the component ready and report the missing file.
- Allowed transformations of canonical production assets: position, scale, crop/mask within layout, opacity, parallax, CSS filters limited to neutral lighting/shadow, transform/rotation, transitions.
- Forbidden: changing label text, jar colors, logo, metallic pattern, character anatomy, fur color, signature items, facial design or proportions.

## Upload names (references; production files see manifest.json)

Packaging reference boards:
- references/packaging/glow-packaging-board.png
- references/packaging/flex-packaging-board.png
- references/packaging/snoozy-packaging-board.png
- references/packaging/daily-packaging-board.png

Character bibles:
- references/characters/glow-character-bible.png
- references/characters/flex-character-bible.png
- references/characters/snoozy-character-bible.png
- references/characters/daily-character-bible.png

Production front jars:
- products/glow-front.png
- products/flex-front.png
- products/snoozy-front.png
- products/daily-front.png

Production characters:
- characters/glow.png
- characters/flex.png
- characters/snoozy.png
- characters/daily.png
