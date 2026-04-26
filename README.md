# Astro Explorer

An interactive, free, open-source birth-chart playground. Drag a timeline through the years and watch planets glide across both a **Western circular wheel** and a **South Indian Kundli** — synced, side by side.

Built as a free experimentation tool for an astrologer's website. The depth lives with the astrologer; this tool is the hook.

## What it does

- Renders a birth chart in two languages at once: Western circular wheel + South Indian Kundli
- Date / time / location input with a curated list of global cities
- Toggle between **Tropical** (Western) and **Sidereal / Lahiri** (Vedic) zodiac
- A timeline scrubber with play / pause and speed controls (Day · Month · Year · Decade per second)
- Snap buttons: jump to **birth**, **today**, **+1 year**, **±10 years**
- Tap any planet — get its sign, house, degree, and a short interpretation
- Whole-sign houses, the same system used in classical Vedic astrology

## Run locally

It's a single HTML file. No build step.

```bash
# from the project folder
open index.html
```

That's it. It loads [astronomy-engine](https://github.com/cosinekitty/astronomy) (MIT) from a CDN and runs entirely in your browser.

## Deploy on GitHub Pages

After pushing to GitHub:

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, choose **Deploy from a branch** → `main` → `/ (root)`
3. Save. In ~30 seconds the live URL appears at the top of the page.

Or via CLI: `gh repo edit --enable-pages --pages-branch main`

## Tech notes

- **Pure static**: one HTML file, no build, no backend. Drop it on any host.
- **Astronomy library**: [astronomy-engine](https://github.com/cosinekitty/astronomy) v2 — pure JavaScript, no native dependencies, accurate to within an arc-minute for the visible planets.
- **Ascendant calculation**: standard horoscopic formula using local sidereal time and geographic latitude.
- **Houses**: whole-sign system. Each house spans one sign, starting from the rising sign.
- **Sidereal mode**: subtracts the Lahiri ayanamsa (anchored at 23.85° on J2000, drifting ~50.27"/year).

## Limits

- Rahu / Ketu (lunar nodes) are not yet drawn — easy to add via the mean-node formula
- Outer planets (Uranus, Neptune, Pluto) omitted for chart legibility — not used in classical Vedic anyway
- City list is curated, not exhaustive — extend the `CITIES` array in `index.html`
- Aspects, dignities, and divisional charts (D-9 etc.) intentionally left out of v1 — this is a *play* tool, not a professional reading

## License

MIT. See `LICENSE`.

## Credits

- [astronomy-engine](https://github.com/cosinekitty/astronomy) by Don Cross — MIT
- Astrology interpretations are intentionally short and non-prescriptive. For a real reading, see a real astrologer.
