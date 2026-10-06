# bärly Asset Library

This branch is the single source of truth for approved visual assets used by the bärly website and future brand work.

## Hard rules

1. **Production assets live only under `assets/`.**
2. **Reference material lives only under `references/` and must never be used directly on the public website.**
3. Before adding any image to a page, read `assets/asset-manifest.json` and use the exact approved path.
4. If an approved asset exists, **do not generate, crop, synthesize, or substitute another image**.
5. Do not crop frames out of moodboards, character bibles, storyboards, or packaging boards.
6. If the required production asset is missing, leave a clearly designed asset slot or ask for the asset. Do not invent a visual.
7. Product names and characters are canonical:
   - GLOW — pink — crown + heart sunglasses
   - FLEX — blue — black sport sunglasses
   - SNOOZY — purple — sleep cap + pillow
   - DAILY — yellow/gold — hoodie / organizer
8. Website visuals must feel premium, adult, clean, and editorial. Character use should add life without making the brand childish.
9. Approved images are immutable unless a new version is explicitly approved. New versions should use a descriptive suffix or replace the manifest path deliberately.
10. Do not alter product packaging text inside approved renders.

## Directory model

```
assets/
  homepage/
    hero/
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
  moodboards/
  character-bible/
  storyboards/
```

## Naming

Use lowercase kebab-case and describe the role, not the generation history.

Good:
- `glow-pdp-hero.webp`
- `flex-pack-front.webp`
- `snoozy-character-card.webp`

Bad:
- `final-new-v7.png`
- `imagegen.png`
- `cropped-moodboard-2.webp`
