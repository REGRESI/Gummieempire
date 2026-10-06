# bärly Asset Library — Canonical Rules

This branch is the single source of truth for approved bärly visual assets.

## 1. Production vs. Reference

- `assets/` = production-ready assets that may be used on the public website.
- `references/` = design bibles, packaging boards, moodboards and storyboards.
- Files inside `references/` must NEVER be used directly as public website imagery.

## 2. Canonical packaging rule — DO NOT REDESIGN

The four adult launch jars have locked packaging systems:

- GLOW — pink / blush / metallic rose accents / crown icon
- FLEX — light blue / metallic royal-blue accents / biceps icon
- SNOOZY — lavender / metallic purple accents / moon icon
- DAILY — warm yellow-gold / metallic gold accents / sun icon

The approved packaging boards define:
- exact front-label hierarchy
- side character panel
- back-label structure
- jar body and lid colors
- metallic/matte material language
- iconography
- product naming
- overall proportions

Claude Code or any future tool MAY:
- scale
- translate
- rotate
- mask
- parallax
- animate
- add realistic shadow/reflection
- animate lid opening/closing
- use the approved front/side/back/3-quarter assets in 2D/3D-like compositions

Claude Code or any future tool MUST NOT:
- redraw labels
- change typography hierarchy
- change product name spelling
- change colors
- invent packaging
- replace icons
- modify metallic patterns
- change jar proportions
- crop a packaging board and pretend it is a production product image

If a required jar view is missing, the implementation must wait for that approved asset.

## 3. Canonical character rule — DO NOT REDESIGN

Character appearance is locked to the approved Character Bibles.

GLOW:
- pink plush bear
- gold crown with pink jewel
- heart sunglasses
- feminine, confident
- canonical proportions from Character Bible

FLEX:
- blue plush bear
- athletic/muscular canonical body
- black sport sunglasses
- canonical proportions from Character Bible

SNOOZY:
- purple soft/round bear
- moon-and-stars sleep cap
- cream pillow
- canonical proportions from Character Bible

DAILY:
- yellow/gold bear
- cream hoodie
- black crossbody bag
- organizer aesthetic
- canonical proportions from Character Bible

Allowed:
- pose/expression variations that remain fully on-model
- subtle interaction animations
- parallax
- hover reactions
- light movement

Not allowed:
- new anatomy
- changed fur colors
- changed signature items
- random clothing
- redesigning facial features
- making adult characters look more childlike

## 4. Master asset hierarchy

Every product will eventually have these approved master views:

```
assets/products/{product}/
  {product}-pack-front-master.webp
  {product}-pack-3q-front-master.webp
  {product}-pack-side-master.webp
  {product}-pack-back-master.webp
  {product}-pack-detail-metallic.webp
```

The four camera views must use the SAME:
- jar scale
- focal length / perspective language
- camera height
- neutral studio lighting
- crop ratio
- background family

This is critical so product transitions on the homepage and PDP feel physically consistent.

## 5. Homepage hero system

The adult homepage hero is modular, not one flattened campaign JPEG.

Layers:
1. abstract premium background
2. canonical jar master asset
3. canonical character cutout
4. subtle accent objects
5. HTML copy and CTA

Jar position/size must remain consistent between GLOW, FLEX, SNOOZY and DAILY slides.

Characters add life but stay secondary to premium packaging.

## 6. Folder structure

```
assets/
  asset-manifest.json
  homepage/
    hero/
      backgrounds/
      characters/
      accents/
    lifestyle/
    crew/
    subscription/
    founders/
  products/
    glow/
    flex/
    snoozy/
    daily/
  characters/
    glow/
    flex/
    snoozy/
    daily/
  pdp/
    glow/
    flex/
    snoozy/
    daily/

references/
  packaging/
    glow/
    flex/
    snoozy/
    daily/
  character-bible/
    glow/
    flex/
    snoozy/
    daily/
  moodboards/
  storyboards/
```

## 7. Naming

Use lowercase kebab-case. Never use generation-history filenames.

Good:
- `glow-pack-front-master.webp`
- `glow-pack-side-master.webp`
- `flex-character-hero.webp`

Bad:
- `final-v8-new.png`
- `imagegen-3.png`
- `crop-from-board.webp`

## 8. Claude Code implementation rule

Before implementing or changing any visual:
1. Read `ASSET_RULES.md`.
2. Read `assets/asset-manifest.json`.
3. Use only paths marked `approved`.
4. Do not invent fallback product art.
5. Do not use references as production visuals.
6. If an asset is missing, keep the layout ready for it and report the missing asset instead of hallucinating one.
